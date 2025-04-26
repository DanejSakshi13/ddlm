

# adding methology summary conclusion logic
from flask import Blueprint, request, jsonify
import pdfplumber
import re
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from database.user_service import get_user_recent_analyses

user_query_bp = Blueprint('user_query_bp', __name__)

def extract_text_from_pdf(pdf_file):
    """Extract text from a PDF file using pdfplumber."""
    try:
        pdf_file.seek(0)  # Reset file pointer
        with pdfplumber.open(pdf_file) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text() or ""
                # Normalize newlines to preserve paragraphs
                page_text = re.sub(r'\n\s*\n+', '\n\n', page_text)
                text += page_text + "\n\n"
        return text.strip()
    except Exception as e:
        return f"Error extracting text from PDF: {e}"

def split_text_into_paragraphs(text):
    """Split text into paragraphs and tag with section headers."""
    text = re.sub(r'\r\n|\r', '\n', text)
    paragraphs = [p.strip() for p in re.split(r'\n{2,}', text) if p.strip()]
    filtered_paragraphs = []
    section_map = {}
    current_section = "Unknown"

    # Section headers for "Attention Is All You Need"
    section_headers = [
        r'^(?:\d+\.\d*\s*)?(Introduction|Background|Related Work|Literature Review|Methodology|Methods|Model|Model Architecture|Approach|Experiment|Experiments|Result|Results|Discussion|Conclusion|Summary|Future Work|References|Appendix)\b',
        r'^\d+\.\s*[A-Z][a-zA-Z\s]+$',  # e.g., "6. Conclusion"
        r'^Conclusion[s]?\s*$',  # "Conclusion" or "Conclusions"
        r'^\d+\s*Conclusion[s]?\b',  # "6 Conclusion"
        r'^6\. Conclusion\s*$'  # Exact match for PDF
    ]

    for i, p in enumerate(paragraphs):
        # Check for section header
        is_section = False
        for header_pattern in section_headers:
            if re.match(header_pattern, p, re.I):
                current_section = p
                is_section = True
                break

        # Filter metadata
        if (not is_section and
            len(p) > 20 and
            not re.search(r'@.*\.(com|edu|org)|arXiv:\d+|Authorized licensed use', p, re.I) and
            not re.match(r'^(Attention Is All You Need|Ashish Vaswani.*|Noam Shazeer.*|Niki Parmar.*|Jakob Uszkoreit.*|.*Google.*|.*IEEE.*|DOI:.*|\d{4}\sIEEE.*)$', p, re.I)):
            filtered_paragraphs.append(p)
            section_map[len(filtered_paragraphs) - 1] = current_section

    print(f"Total paragraphs before filtering: {len(paragraphs)}, After filtering: {len(filtered_paragraphs)}")
    print(f"Detected sections: {set(section_map.values())}")
    return filtered_paragraphs, section_map

def split_into_sentences(text):
    """Split text into sentences."""
    return re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)

def preprocess_query(query):
    """Clean and normalize the query."""
    query = query.lower().strip()
    query = re.sub(r'[^\w\s]', '', query)
    return query

def limit_words(text, max_words=150):
    """Limit text to max_words, truncating at sentence boundaries."""
    sentences = split_into_sentences(text)
    if not sentences:
        return text.strip() if text.strip() else "No content available."

    limited_text, word_count = [], 0
    for sentence in sentences:
        words = sentence.split()
        if word_count + len(words) > max_words:
            break
        limited_text.append(sentence)
        word_count += len(words)

    result = " ".join(limited_text).strip()
    return result if result else "No meaningful content within word limit."

def find_relevant_section(query, paragraphs, section_map, max_words=150):
    """Find the most relevant paragraph, prioritizing section headers."""
    if not paragraphs:
        return "No content available to query."

    # Map query keywords to sections
    query_section_map = {
        "conclusion": ["Conclusion", "Results", "Discussion", "Summary"],
        "methodology": ["Methodology", "Methods", "Model", "Model Architecture", "Approach", "Experiment", "Experiments"],
        "results": ["Results", "Findings", "Discussion"],
        "introduction": ["Introduction", "Background"]
    }

    query = preprocess_query(query)
    target_sections = []
    for keyword, sections in query_section_map.items():
        if keyword in query:
            target_sections.extend(sections)

    # Section-based matching
    candidate_indices = []
    if target_sections:
        print(f"Query '{query}' mapped to sections: {target_sections}")
        for idx, section in section_map.items():
            if any(target_section.lower() in section.lower() for target_section in target_sections):
                candidate_indices.append(idx)
        if candidate_indices:
            print(f"Found matching sections: {[section_map[i] for i in candidate_indices]}")
        else:
            print("No matching sections found, falling back to TF-IDF")

    # TF-IDF matching
    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    try:
        vectors = vectorizer.fit_transform([query] + paragraphs)
        similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

        if candidate_indices:
            best_match_idx = max(candidate_indices, key=lambda idx: similarities[idx])
            best_similarity = similarities[best_match_idx]
        else:
            best_match_idx = similarities.argmax()
            best_similarity = similarities[best_match_idx]

        print(f"Query: {query}, Best match index: {best_match_idx}, Best similarity: {best_similarity:.4f}, Section: {section_map.get(best_match_idx, 'Unknown')}")

        # Accept section matches or high similarity
        if best_similarity >= 0.2 or candidate_indices:
            best_paragraph = paragraphs[best_match_idx]
            limited_result = limit_words(best_paragraph, max_words)
            print(f"Best paragraph (pre-limit): {best_paragraph[:200]}...")
            return limited_result

        # Fallback: raw text search
        print("Low similarity, attempting raw text search")
        for idx, p in enumerate(paragraphs):
            if any(keyword in p.lower() for keyword in ["conclusion", "results", "discussion", "summary"]):
                print(f"Fallback match found in paragraph {idx}: {p[:100]}...")
                return limit_words(p, max_words)
        return "No relevant section found."
    except ValueError as e:
        print(f"TF-IDF error: {e}")
        return "Unable to process query due to insufficient text data."

def summarize_text(text, max_words=150):
    """Generate a coherent summary within max_words."""
    sentences = split_into_sentences(text)
    if len(sentences) < 3:
        return limit_words(text, max_words)

    word_freq = Counter(re.findall(r'\w+', text.lower()))
    sentence_scores = {
        s: sum(word_freq.get(word, 0) for word in re.findall(r'\w+', s.lower())) / (len(s.split()) + 1)
        for s in sentences
    }

    filtered_sentences = [
        s for s in sentences
        if len(s.strip()) > 20 and not re.search(r'Figure|Table|Equation|\d{4}|DOI|http|\[.*\]|@.*\.(com|edu|org)', s, re.I)
    ]
    
    if not filtered_sentences:
        return "No meaningful content found for summary."

    ranked_sentences = sorted(filtered_sentences, key=lambda s: sentence_scores.get(s, 0), reverse=True)
    summary_sentences, word_count = [], 0
    for sentence in ranked_sentences:
        words = sentence.split()
        if word_count + len(words) > max_words:
            break
        summary_sentences.append(sentence)
        word_count += len(words)

    summary_sentences.sort(key=lambda s: sentences.index(s))
    result = " ".join(summary_sentences).strip()
    return result if result else "No meaningful summary within word limit."

@user_query_bp.route('/query', methods=['POST'])
def handle_query():
    """Handle user queries and return relevant sections or summaries."""
    try:
        if request.is_json:
            data = request.json
        else:
            data = request.form

        email = data.get('email')
        query = data.get('query')
        pdf_file = request.files.get('file')

        print(f"Received: email={email}, query={query}, file={pdf_file}")

        if not email or not query:
            print("Missing email or query")
            return jsonify({"error": "Email and query are required"}), 400

        if pdf_file:
            print("Processing uploaded PDF")
            pdf_text = extract_text_from_pdf(pdf_file)
            if "Error" in pdf_text:
                print(f"PDF error: {pdf_text}")
                return jsonify({"error": pdf_text}), 500
            print(f"Extracted text: {pdf_text[:200]}...")
        else:
            print("Fetching recent analysis")
            recent_analysis = get_user_recent_analyses(email)
            if not recent_analysis:
                print("No recent analysis found")
                return jsonify({"error": "No recent analysis found for this user"}), 404
            pdf_text = recent_analysis.get('summary', '')
            if not pdf_text:
                print("No summary available")
                return jsonify({"error": "No PDF text available to query"}), 400

        paragraphs, section_map = split_text_into_paragraphs(pdf_text)
        print(f"Paragraphs: {len(paragraphs)}, First paragraph: {paragraphs[0][:100] if paragraphs else 'None'}...")

        if not paragraphs:
            print("No paragraphs after filtering, using raw text")
            paragraphs = [p.strip() for p in pdf_text.split('\n\n') if len(p.strip()) > 20]
            section_map = {i: "Unknown" for i in range(len(paragraphs))}

        query = preprocess_query(query)
        if "summary" in query.lower():
            response = summarize_text(pdf_text, max_words=150)
            print("Generated summary")
        else:
            response = find_relevant_section(query, paragraphs, section_map, max_words=150)
            print("Found relevant section")

        if not response.strip():
            print("Empty response generated")
            return jsonify({"error": "No meaningful response generated"}), 500

        print(f"Response: {response} (Word count: {len(response.split())})")
        return jsonify({"response": response}), 200

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

























































































































