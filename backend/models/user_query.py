# #custom code (converted divya's code to flask, work but gives no relevant output)
# from flask import Blueprint, request, jsonify
# import PyPDF2
# import re
# from collections import Counter
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from database.user_service import get_user_recent_analyses

# user_query_bp = Blueprint('user_query_bp', __name__)

# def extract_text_from_pdf(pdf_file):
#     try:
#         reader = PyPDF2.PdfReader(pdf_file)
#         text = "\n".join(page.extract_text() or "" for page in reader.pages)
#         return text.strip()
#     except Exception as e:
#         return f"Error extracting text from PDF: {e}"

# def split_text_into_paragraphs(text):
#     paragraphs = text.split("\n\n")
#     return [p.strip() for p in paragraphs if len(p) > 50]

# def find_relevant_section(query, paragraphs):
#     vectorizer = TfidfVectorizer(stop_words="english")
#     vectors = vectorizer.fit_transform([query] + paragraphs)
#     similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
#     best_match_idx = similarities.argmax()
#     return paragraphs[best_match_idx] if similarities[best_match_idx] > 0.1 else "No relevant section found."

# def summarize_text(text, max_words=500):
#     sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
#     if len(sentences) < 5:
#         return text
#     word_freq = Counter(re.findall(r'\w+', text.lower()))
#     sentence_scores = {s: sum(word_freq.get(word, 0) for word in s.lower().split()) for s in sentences}
#     ranked_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)
#     filtered_sentences = [s for s in ranked_sentences if not re.search(r'Figure|Table|Equation|\d{4}|DOI|http', s, re.I)]
#     summary_sentences, word_count = [], 0
#     for sentence in filtered_sentences:
#         words = sentence.split()
#         if word_count + len(words) > max_words:
#             break
#         summary_sentences.append(sentence)
#         word_count += len(words)
#     summary_sentences.sort(key=lambda s: sentences.index(s))
#     return " ".join(summary_sentences) if summary_sentences else "No meaningful summary found."

# @user_query_bp.route('/query', methods=['POST'])
# def handle_query():
#     if request.is_json:
#         data = request.json
#     else:
#         data = request.form

#     email = data.get('email')
#     query = data.get('query')
#     pdf_file = request.files.get('file')

#     print(f"Received: email={email}, query={query}, file={pdf_file}")

#     if not email or not query:
#         print("Missing email or query")
#         return jsonify({"error": "Email and query are required"}), 400

#     if pdf_file:
#         print("Processing uploaded PDF")
#         pdf_text = extract_text_from_pdf(pdf_file)
#         if "Error" in pdf_text:
#             print(f"PDF error: {pdf_text}")
#             return jsonify({"error": pdf_text}), 500
#         print(f"Extracted text: {pdf_text[:200]}...")  # Log first 200 chars
#     else:
#         print("Fetching recent analysis")
#         recent_analysis = get_user_recent_analyses(email)
#         if not recent_analysis:
#             print("No recent analysis found")
#             return jsonify({"error": "No recent analysis found for this user"}), 404
#         pdf_text = recent_analysis.get('summary', '')
#         if not pdf_text:
#             print("No summary available")
#             return jsonify({"error": "No PDF text available to query"}), 400

#     paragraphs = split_text_into_paragraphs(pdf_text)
#     print(f"Paragraphs: {len(paragraphs)}, First paragraph: {paragraphs[0][:100] if paragraphs else 'None'}...")

#     if "summary" in query.lower():
#         response = summarize_text(pdf_text)
#         print("Generated summary")
#     else:
#         vectorizer = TfidfVectorizer(stop_words="english")
#         vectors = vectorizer.fit_transform([query] + paragraphs)
#         similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
#         best_match_idx = similarities.argmax()
#         print(f"Similarities: {similarities}, Best match: {best_match_idx}")
#         response = paragraphs[best_match_idx] if similarities[best_match_idx] > 0.1 else "No relevant section found."
#         print("Found relevant section")

#     print(f"Response: {response}")
#     return jsonify({"response": response}), 200





















#prints entire pdf for all queries
from flask import Blueprint, request, jsonify
import PyPDF2
import re
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from database.user_service import get_user_recent_analyses

user_query_bp = Blueprint('user_query_bp', __name__)

def extract_text_from_pdf(pdf_file):
    """Extract text from a PDF file."""
    try:
        reader = PyPDF2.PdfReader(pdf_file)
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
        return text.strip()
    except Exception as e:
        return f"Error extracting text from PDF: {e}"

def split_text_into_paragraphs(text):
    """Split text into paragraphs, filtering out metadata and ensuring proper segmentation."""
    # Normalize newlines and split on double newlines or section breaks
    text = re.sub(r'\r\n|\r', '\n', text)  # Standardize line endings
    paragraphs = re.split(r'\n{2,}', text)
    filtered_paragraphs = []
    for p in paragraphs:
        p = p.strip()
        # Keep paragraphs > 50 chars, exclude metadata and boilerplate
        if (len(p) > 50 and 
            not re.search(r'@.*\.(com|edu|org)', p) and  # No emails
            not re.match(r'^(Attention Is All You Need|Ashish Vaswani.*|.*Google.*|.*IEEE.*|DOI:.*|\d{4}\sIEEE.*)$', p) and  # No title/authors/copyright
            not re.search(r'Authorized licensed use limited to', p)):  # No footer
            filtered_paragraphs.append(p)
    print(f"Total paragraphs before filtering: {len(paragraphs)}, After filtering: {len(filtered_paragraphs)}")
    return filtered_paragraphs

def split_into_sentences(text):
    """Split text into sentences."""
    return re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)

def preprocess_query(query):
    """Clean and normalize the query for better matching."""
    query = query.lower().strip()
    query = re.sub(r'[^\w\s]', '', query)  # Remove punctuation
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

def find_relevant_section(query, paragraphs, max_words=150):
    """Find the most relevant paragraph using TF-IDF with a similarity threshold."""
    if not paragraphs:
        return "No content available to query."
    
    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    try:
        vectors = vectorizer.fit_transform([query] + paragraphs)
        similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
        best_match_idx = similarities.argmax()
        best_similarity = similarities[best_match_idx]
        print(f"Query: {query}, Similarities: {similarities}, Best match index: {best_match_idx}, Best similarity: {best_similarity:.4f}")

        if best_similarity < 0.1:  # Raised threshold for stricter relevance
            return "No relevant section found."
        
        best_paragraph = paragraphs[best_match_idx]
        limited_result = limit_words(best_paragraph, max_words)
        print(f"Best paragraph (pre-limit): {best_paragraph[:200]}...")  # Debug raw match
        return limited_result
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
    """Handle user queries and return relevant sections or summaries with word limit."""
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

        paragraphs = split_text_into_paragraphs(pdf_text)
        print(f"Paragraphs: {len(paragraphs)}, First paragraph: {paragraphs[0][:100] if paragraphs else 'None'}...")

        query = preprocess_query(query)
        if "summary" in query.lower():
            response = summarize_text(pdf_text, max_words=150)
            print("Generated summary")
        else:
            response = find_relevant_section(query, paragraphs, max_words=150)
            print("Found relevant section")

        if not response.strip():
            print("Empty response generated")
            return jsonify({"error": "No meaningful response generated"}), 500

        print(f"Response: {response} (Word count: {len(response.split())})")
        return jsonify({"response": response}), 200

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500













#integrating divya's models
# from flask import Blueprint, request, jsonify
# import PyPDF2
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# import pickle
# # from database.user_service import get_user_recent_analyses
# import os

# user_query_bp = Blueprint('user_query_bp', __name__)

# # Fix the paths to be relative to the current file
# # current_dir = os.path.dirname(os.path.abspath(__file__))
# # MODEL_PATH = os.path.join(current_dir, 'trained_models/v1user_query/seq2seq_model.keras')
# # INPUT_TOKEN_PATH = os.path.join(current_dir, 'trained_models/v1user_query/input_token_index.pkl')
# # TARGET_TOKEN_PATH = os.path.join(current_dir, 'trained_models/v1user_query/target_token_index.pkl')


# current_dir = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(current_dir, 'trained_models/v1user_query/seq2seq_model.keras')
# INPUT_TOKEN_PATH = os.path.join(current_dir, 'trained_models/v1user_query/input_token_index.pkl')
# TARGET_TOKEN_PATH = os.path.join(current_dir, 'trained_models/v1user_query/target_token_index.pkl')



# # Load the trained model and token indices at startup
# try:
#     if not os.path.exists(MODEL_PATH):
#         raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
#     if not os.path.exists(INPUT_TOKEN_PATH):
#         raise FileNotFoundError(f"Input token file not found at {INPUT_TOKEN_PATH}")
#     if not os.path.exists(TARGET_TOKEN_PATH):
#         raise FileNotFoundError(f"Target token file not found at {TARGET_TOKEN_PATH}")
        
#     model = tf.keras.models.load_model(MODEL_PATH)
#     print("✅ Model loaded successfully.")
#     model.summary()  # <-- Add this line to print the model architecture
#     with open(INPUT_TOKEN_PATH, 'rb') as f:
#         input_token_index = pickle.load(f)
#     with open(TARGET_TOKEN_PATH, 'rb') as f:
#         target_token_index = pickle.load(f)
#     print("✅ Token indices loaded successfully.")

# except Exception as e:
#     print(f"❌ Error loading model or indices: {str(e)}")
#     raise


# # Reverse mapping for decoding
# reverse_target_token_index = {i: char for char, i in target_token_index.items()}
# max_seq_length = 100  # Adjust if needed (check Colab training logs for max sequence length)

# def extract_text_from_pdf(pdf_file):
#     try:
#         reader = PyPDF2.PdfReader(pdf_file)
#         text = "\n".join(page.extract_text() or "" for page in reader.pages)
#         return text.strip()
#     except Exception as e:
#         return f"Error extracting text from PDF: {e}"

# def preprocess_query(query):
#     # Convert query to sequence of token indices
#     query_seq = [input_token_index.get(char, 0) for char in query]
#     query_seq = pad_sequences([query_seq], maxlen=max_seq_length, padding='post')
#     print(f"Preprocessed query sequence: {query_seq}")  # Debug print
#     return tf.keras.utils.to_categorical(query_seq, num_classes=len(input_token_index))

# def decode_sequence(input_seq):
#     # Initialize the decoder input as a zero matrix
#     target_seq = np.zeros((1, 1, len(target_token_index)))

#     # Start token initialization
#     target_seq[0, 0, target_token_index.get('\t', 0)] = 1.0  # Start token
#     print(f"Input sequence shape: {input_seq.shape}")
#     print(f"Target sequence shape: {target_seq.shape}")

#     # Pass both the encoder input and the initial decoder input to the model
#     prediction = model.predict([input_seq, target_seq], verbose=0)

#     print(f"Raw model prediction: {prediction}")  # Debug print

#     decoded_sentence = ''
#     for timestep in prediction[0]:
#         sampled_token_index = np.argmax(timestep)
#         sampled_char = reverse_target_token_index.get(sampled_token_index, '')
#         print(f"Sampled token index: {sampled_token_index}, Sampled char: '{sampled_char}'")  # Debug print

#         if sampled_char == '\n' or len(decoded_sentence) > max_seq_length:
#             break
#         decoded_sentence += sampled_char

#     print(f"Decoded sentence: {decoded_sentence}")  # Debug print
#     return decoded_sentence




# @user_query_bp.route('/query', methods=['POST'])
# def handle_query():
#     try:
#         if request.is_json:
#             data = request.get_json()
#         else:
#             data = request.form.to_dict()

#         email = data.get('email')
#         query = data.get('query')
#         pdf_file = request.files.get('file')

#         print(f"Received: email={email}, query={query}, file={pdf_file}")

#         if not email or not query:
#             return jsonify({"error": "Email and query are required"}), 400

#         # Get PDF text either from file or recent analysis
#         if pdf_file:
#             pdf_text = extract_text_from_pdf(pdf_file)
#             if isinstance(pdf_text, str) and pdf_text.startswith("Error"):
#                 return jsonify({"error": pdf_text}), 500
#         else:
#             recent_analysis = get_user_recent_analyses(email)
#             if not recent_analysis:
#                 return jsonify({"error": "No recent analysis found for this user"}), 404
#             pdf_text = recent_analysis.get('summary', '')
#             if not pdf_text:
#                 return jsonify({"error": "No PDF text available to query"}), 400

#         # Process query with the model
#         try:
#             input_seq = preprocess_query(query)
#             response = decode_sequence(input_seq)
#             print(f"Model response: {response}")  # Debug print
#             if not response.strip():
#                 return jsonify({"error": "Model generated empty response"}), 500
#             return jsonify({"response": response}), 200
#         except Exception as e:
#             print(f"Error processing query: {str(e)}")
#             return jsonify({"error": "Error processing query"}), 500

#     except Exception as e:
#         print(f"Unexpected error: {str(e)}")
#         return jsonify({"error": "Internal server error"}), 500



# # Temporary mock for database
# def get_user_recent_analyses(email):
#     return {"summary": "Mock summary for testing"}
# # from database.user_service import get_user_recent_analyses  # Comment this out

# if __name__ == "__main__":
#     from flask import Flask
#     app = Flask(__name__)
#     app.register_blueprint(user_query_bp)

#     app.run(host="0.0.0.0", port=5000, debug=True)
