
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import re
# from flask_cors import CORS

# title_extractor_bp = Blueprint("title_extractor", __name__)
# CORS(title_extractor_bp)

# def extract_title_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             if not pdf.pages:
#                 print("No pages found in PDF")
#                 return "No pages found in PDF"

#             first_page = pdf.pages[0]
#             text = first_page.extract_text()
#             print(f"Raw text from first page: '{text}'")  # Log raw text

#             if not text:
#                 print("No text extracted from first page")
#                 return "No text found on first page"

#             # Split into lines and clean up
#             lines = [line.strip() for line in text.split('\n') if line.strip()]
#             print(f"Extracted lines: {lines}")

#             # Heuristic 1: Look for a title in the first few lines
#             for i, line in enumerate(lines[:5]):  # Check first 5 lines
#                 word_count = len(line.split())
#                 if (
#                     2 <= word_count <= 20  # Reasonable title length
#                     and (line[0].isupper() or line.isupper())  # Starts with capital or all caps
#                     and not re.search(r'[.!?]$', line)  # Not a full sentence
#                 ):
#                     print(f"Found potential title (heuristic 1): '{line}' at line {i}")
#                     return line

#             # Heuristic 2: Use font size if available
#             words = first_page.extract_words()
#             if words:
#                 # Group words by font size and position
#                 size_groups = {}
#                 for word in words:
#                     size = word.get('size', 0)
#                     if size not in size_groups:
#                         size_groups[size] = []
#                     size_groups[size].append(word)

#                 # Find the largest font size group
#                 largest_size = max(size_groups.keys())
#                 largest_words = sorted(size_groups[largest_size], key=lambda w: w['x0'])
#                 potential_title = " ".join(w['text'] for w in largest_words).strip()
#                 if 2 <= len(potential_title.split()) <= 20:
#                     print(f"Found potential title (heuristic 2 - font size): '{potential_title}'")
#                     return potential_title

#             print("No suitable title found in heuristics")
#             return "Title not found"

#     except Exception as e:
#         print(f"Error extracting title: {str(e)}")
#         return f"Error extracting title: {str(e)}"

# @title_extractor_bp.route('/extract-title', methods=['POST'])
# def extract_title():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)

#         title = extract_title_from_pdf(file_path)
#         print(f"Final extracted title for {file.filename}: '{title}'")
        
#         return jsonify({"title": title}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)





# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import re
# from flask_cors import CORS

# title_extractor_bp = Blueprint("title_extractor", __name__)
# CORS(title_extractor_bp)

# def extract_title_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             if not pdf.pages:
#                 print("No pages found in PDF")
#                 return "No pages found in PDF"

#             first_page = pdf.pages[0]
#             text = first_page.extract_text()
#             print(f"Raw text from first page: '{text}'")

#             if not text:
#                 print("No text extracted from first page")
#                 return "No text found on first page"

#             lines = [line.strip() for line in text.split("\n") if line.strip()]
#             print(f"Extracted lines: {lines}")

#             # Heuristic 1: First 10 lines, relaxed rules
#             for i, line in enumerate(lines[:10]):
#                 word_count = len(line.split())
#                 if 1 <= word_count <= 30:  # Broader range
#                     print(f"Found potential title (heuristic 1): '{line}' at line {i}")
#                     return line

#             # Heuristic 2: Largest font size near top
#             words = first_page.extract_words()
#             print(f"Extracted words: {words}")
#             if words:
#                 size_groups = {}
#                 for word in words:
#                     size = word.get("size", 0)
#                     if size not in size_groups:
#                         size_groups[size] = []
#                     size_groups[size].append(word)

#                 largest_size = max(size_groups.keys(), default=0)
#                 if largest_size:
#                     largest_words = [w for w in size_groups[largest_size] if w["top"] < 100]  # Near top
#                     if largest_words:
#                         largest_words = sorted(largest_words, key=lambda w: w["x0"])
#                         potential_title = " ".join(w["text"] for w in largest_words).strip()
#                         print(f"Found potential title (heuristic 2 - font size): '{potential_title}'")
#                         return potential_title

#             print("No suitable title found in heuristics")
#             return "Title not found"

#     except Exception as e:
#         print(f"Error extracting title: {str(e)}")
#         return f"Error extracting title: {str(e)}"


# @title_extractor_bp.route("/extract-title", methods=["POST"])
# def extract_title():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = os.path.join("uploads", file.filename)
#     os.makedirs("uploads", exist_ok=True)
#     file.save(file_path)

#     try:
#         title = extract_title_from_pdf(file_path)
#         print(f"Final extracted title for {file.filename}: '{title}'")
#         return jsonify({"title": title}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)






























# perfect code beofre integrating priti's keywords code
# 3/4/25
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# from flask_cors import CORS

# title_extractor_bp = Blueprint("title_extractor", __name__)
# # Align CORS with app.py
# CORS(title_extractor_bp, resources={r"/extract-title": {
#     "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
#     "methods": ["POST", "OPTIONS"],
#     "allow_headers": ["Content-Type"],
#     "supports_credentials": True
# }})

# def extract_title_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             if not pdf.pages:
#                 print("No pages found in PDF")
#                 return "No pages found in PDF"

#             first_page = pdf.pages[0]
#             text = first_page.extract_text()
#             print(f"Raw text from first page: '{text}'")

#             if not text:
#                 print("No text extracted from first page")
#                 return "No text found on first page"

#             lines = [line.strip() for line in text.split("\n") if line.strip()]
#             print(f"Extracted lines: {lines}")

#             # Heuristic 1: First 10 lines, relaxed rules
#             for i, line in enumerate(lines[:10]):
#                 word_count = len(line.split())
#                 if 1 <= word_count <= 30:
#                     print(f"Found potential title (heuristic 1): '{line}' at line {i}")
#                     return line

#             # Heuristic 2: Largest font size near top
#             words = first_page.extract_words()
#             print(f"Extracted words: {words}")
#             if words:
#                 size_groups = {}
#                 for word in words:
#                     size = word.get("size", 0)
#                     if size not in size_groups:
#                         size_groups[size] = []
#                     size_groups[size].append(word)

#                 largest_size = max(size_groups.keys(), default=0)
#                 if largest_size:
#                     largest_words = [w for w in size_groups[largest_size] if w["top"] < 100]
#                     if largest_words:
#                         largest_words = sorted(largest_words, key=lambda w: w["x0"])
#                         potential_title = " ".join(w["text"] for w in largest_words).strip()
#                         print(f"Found potential title (heuristic 2 - font size): '{potential_title}'")
#                         return potential_title

#             print("No suitable title found in heuristics")
#             return "Title not found"

#     except Exception as e:
#         print(f"Error extracting title: {str(e)}")
#         return f"Error extracting title: {str(e)}"

# @title_extractor_bp.route("/extract-title", methods=["POST"])
# def extract_title():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = os.path.join("uploads", file.filename)
#     os.makedirs("uploads", exist_ok=True)
#     file.save(file_path)

#     try:
#         title = extract_title_from_pdf(file_path)
#         print(f"Final extracted title for {file.filename}: '{title}'")
#         return jsonify({"title": title}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)








# $env:Path += ";C:\poppler\poppler-24.08.0\Library\bin"
# last wokring till 10/4/25
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# from flask_cors import CORS
# import re

# title_extractor_bp = Blueprint("title_extractor", __name__)
# CORS(title_extractor_bp, resources={r"/extract-title": {
#     "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
#     "methods": ["POST", "OPTIONS"],
#     "allow_headers": ["Content-Type"],
#     "supports_credentials": True
# }})

# def extract_title_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             if not pdf.pages:
#                 print("No pages found in PDF")
#                 return "No pages found in PDF"

#             first_page = pdf.pages[0]
#             text = first_page.extract_text()
#             print(f"Raw text from first page: '{text}'")

#             if not text:
#                 print("No text extracted from first page")
#                 return "No text found on first page"

#             lines = [line.strip() for line in text.split("\n") if line.strip()]
#             print(f"Extracted lines: {lines}")

#             # Heuristic 1: First 10 lines, relaxed rules
#             for i, line in enumerate(lines[:10]):
#                 word_count = len(line.split())
#                 if 1 <= word_count <= 30:
#                     # Clean the line by removing "Title:" prefix if present
#                     cleaned_line = re.sub(r"^\s*Title:\s*", "", line, flags=re.IGNORECASE).strip()
#                     print(f"Found potential title (heuristic 1): '{line}' cleaned to '{cleaned_line}' at line {i}")
#                     return cleaned_line

#             # Heuristic 2: Largest font size near top
#             words = first_page.extract_words()
#             print(f"Extracted words: {words}")
#             if words:
#                 size_groups = {}
#                 for word in words:
#                     size = word.get("size", 0)
#                     if size not in size_groups:
#                         size_groups[size] = []
#                     size_groups[size].append(word)

#                 largest_size = max(size_groups.keys(), default=0)
#                 if largest_size:
#                     largest_words = [w for w in size_groups[largest_size] if w["top"] < 100]
#                     if largest_words:
#                         largest_words = sorted(largest_words, key=lambda w: w["x0"])  # Corrected lambda syntax
#                         potential_title = " ".join(w["text"] for w in largest_words).strip()
#                         # Clean the potential title
#                         cleaned_title = re.sub(r"^\s*Title:\s*", "", potential_title, flags=re.IGNORECASE).strip()
#                         print(f"Found potential title (heuristic 2 - font size): '{potential_title}' cleaned to '{cleaned_title}'")
#                         return cleaned_title

#             print("No suitable title found in heuristics")
#             return "Title not found"

#     except Exception as e:
#         print(f"Error extracting title: {str(e)}")
#         return f"Error extracting title: {str(e)}"

# @title_extractor_bp.route("/extract-title", methods=["POST"])
# def extract_title():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     file_path = os.path.join("uploads", file.filename)
#     os.makedirs("uploads", exist_ok=True)
#     file.save(file_path)

#     try:
#         title = extract_title_from_pdf(file_path)
#         print(f"Final extracted title for {file.filename}: '{title}'")
#         return jsonify({"title": title}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)










# # integratig priti's code to extrct keywords
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import fitz  # PyMuPDF for metadata fallback
# from flask_cors import CORS
# import re

# title_extractor_bp = Blueprint("title_extractor", __name__)
# CORS(title_extractor_bp, resources={r"/extract-title": {
#     "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
#     "methods": ["POST", "OPTIONS"],
#     "allow_headers": ["Content-Type"],
#     "supports_credentials": True
# }})

# def extract_title_from_pdf(file_path, max_pages_to_scan=3):
#     """Extracts a research paper title using multiple heuristics for robustness."""
#     try:
#         # Step 1: Check metadata with PyMuPDF as a reliable fallback
#         with fitz.open(file_path) as doc:
#             metadata_title = doc.metadata.get("title", "").strip()
#             if metadata_title and len(metadata_title) > 5 and not re.search(r"(untitled|default)", metadata_title, re.I):
#                 print(f"Found metadata title: '{metadata_title}'")
#                 return metadata_title

#         # Step 2: Use pdfplumber for detailed text and layout analysis
#         with pdfplumber.open(file_path) as pdf:
#             if not pdf.pages:
#                 print("No pages found in PDF")
#                 return "No pages found in PDF"

#             # Analyze up to max_pages_to_scan pages
#             for page_num in range(min(max_pages_to_scan, len(pdf.pages))):
#                 page = pdf.pages[page_num]
#                 text = page.extract_text()
#                 print(f"Raw text from page {page_num + 1}: '{text}'")

#                 if not text:
#                     print(f"No text extracted from page {page_num + 1}")
#                     continue

#                 lines = [line.strip() for line in text.split("\n") if line.strip()]
#                 print(f"Extracted lines from page {page_num + 1}: {lines}")

#                 # Heuristic 1: First 10 lines, relaxed rules
#                 for i, line in enumerate(lines[:10]):
#                     word_count = len(line.split())
#                     # Filter out obvious non-titles (e.g., emails, very short/long lines)
#                     if (1 <= word_count <= 30 and
#                         not re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b", line) and
#                         not any(keyword in line.lower() for keyword in {"abstract", "keywords", "introduction"})):
#                         print(f"Found potential title (heuristic 1) on page {page_num + 1}: '{line}' at line {i}")
#                         return line

#                 # Heuristic 2: Largest font size near top, potentially multi-line
#                 words = page.extract_words()
#                 print(f"Extracted words from page {page_num + 1}: {words}")
#                 if words:
#                     size_groups = {}
#                     for word in words:
#                         size = round(word.get("size", 0), 1)  # Round to avoid floating-point noise
#                         if size not in size_groups:
#                             size_groups[size] = []
#                         size_groups[size].append(word)

#                     largest_size = max(size_groups.keys(), default=0)
#                     if largest_size > 0:
#                         # Get words with largest font size, within top 1/3 of page
#                         page_height = page.height
#                         top_threshold = page_height / 3
#                         largest_words = [w for w in size_groups[largest_size] if w["top"] < top_threshold]
#                         if largest_words:
#                             # Sort by x-position and group by vertical proximity for multi-line titles
#                             largest_words = sorted(largest_words, key=lambda w: (w["top"], w["x0"]))
#                             title_parts = []
#                             current_line = []
#                             last_top = None
#                             for word in largest_words:
#                                 if last_top is None or abs(word["top"] - last_top) < 10:  # 10-unit threshold for same line
#                                     current_line.append(word["text"])
#                                 else:
#                                     title_parts.append(" ".join(current_line))
#                                     current_line = [word["text"]]
#                                 last_top = word["top"]
#                             if current_line:
#                                 title_parts.append(" ".join(current_line))

#                             potential_title = " ".join(title_parts).strip()
#                             if 1 <= len(potential_title.split()) <= 30:
#                                 print(f"Found potential title (heuristic 2 - font size) on page {page_num + 1}: '{potential_title}'")
#                                 return potential_title

#                 # Heuristic 3: Centered text (common in title pages)
#                 if words:
#                     centered_words = [w for w in words if abs(w["x0"] - (page.width - w["x1"])) < page.width * 0.2]
#                     if centered_words:
#                         centered_words = sorted(centered_words, key=lambda w: w["top"])
#                         potential_title = " ".join(w["text"] for w in centered_words if w["top"] < page.height / 3).strip()
#                         if 1 <= len(potential_title.split()) <= 30:
#                             print(f"Found potential title (heuristic 3 - centered text) on page {page_num + 1}: '{potential_title}'")
#                             return potential_title

#             print("No suitable title found in heuristics across pages")
#             return "Title not found"

#     except Exception as e:
#         print(f"Error extracting title: {str(e)}")
#         return f"Error extracting title: {str(e)}"

# @title_extractor_bp.route("/extract-title", methods=["POST", "OPTIONS"])
# def extract_title():
#     if request.method == "OPTIONS":
#         return "", 200  # Handle CORS preflight

#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     if not file.filename.lower().endswith(".pdf"):
#         return jsonify({"error": "Only PDF files are supported"}), 400

#     file_path = os.path.join("uploads", file.filename)
#     os.makedirs("uploads", exist_ok=True)
#     file.save(file_path)

#     try:
#         title = extract_title_from_pdf(file_path)
#         print(f"Final extracted title for {file.filename}: '{title}'")
#         return jsonify({"title": title}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)










































# trying to fix it for edge cases
from flask import Blueprint, request, jsonify
import os
import pdfplumber
from flask_cors import CORS
import re

title_extractor_bp = Blueprint("title_extractor", __name__)
CORS(title_extractor_bp, resources={r"/extract-title": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
    "methods": ["POST", "OPTIONS"],
    "allow_headers": ["Content-Type"],
    "supports_credentials": True
}})

def is_conference_line(line):
    """Detect lines likely to be conference names."""
    line_lower = line.lower().strip()
    conference_indicators = [
        r"conference", r"ieee", r"international", r"workshop", r"symposium",
        r"proceedings", r"\b\d{4}\b.*conference", r"^\d+(th|st|nd|rd)",
        r"quantum computing", r"\b(qce|icml|neurips|iclr|aaai)\b"  # Common conference acronyms
    ]
    return any(re.search(pattern, line_lower) for pattern in conference_indicators)

def is_author_line(line):
    """Detect if a line contains author information."""
    # Check for common author indicators
    author_patterns = [
        r"\b[A-Z][a-z]+ [A-Z][a-z]+\b",  # Standard name format: "John Doe"
        r"\b[A-Z]\. [A-Z][a-z]+\b",      # Initial format: "J. Smith"
        r"\b[A-Z][a-z]+ [A-Z]\.\b",      # Name with initial: "John S."
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,7}",  # Email pattern
        r"university|institute|department|school|lab(oratory)?|corporation|inc\.|llc",  # Affiliations
        r"google|microsoft|amazon|facebook|meta|apple|ibm|intel|nvidia"  # Tech companies
    ]
    
    return any(re.search(pattern, line, re.IGNORECASE) for pattern in author_patterns)

def extract_title_from_pdf(file_path, pages_to_scan=2):
    """Extracts a research paper title (single-line or multi-line) while avoiding author names and conference names."""
    try:
        with pdfplumber.open(file_path) as pdf:
            if not pdf.pages:
                print("No pages found in PDF")
                return "Title could not be extracted."

            # Check metadata first - this is often the most reliable source
            metadata_title = pdf.metadata.get("Title", "").strip()
            if metadata_title and len(metadata_title) > 5 and not is_conference_line(metadata_title):
                print(f"Found title in metadata: '{metadata_title}'")
                return metadata_title

            text = ""
            # Extract text from the first few pages
            for page_num in range(min(pages_to_scan, len(pdf.pages))):
                page = pdf.pages[page_num]
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

            if not text:
                print("No text extracted from pages")
                return "Title could not be extracted."

            # Split text into lines and clean them
            lines = [line.strip() for line in text.split("\n") if line.strip()]
            
            # Look for explicit title markers
            for i, line in enumerate(lines[:10]):
                if re.match(r"^\s*title\s*:\s*", line, re.IGNORECASE):
                    # Found an explicit title marker - use the rest of the line or the next line
                    title_text = re.sub(r"^\s*title\s*:\s*", "", line, re.IGNORECASE).strip()
                    if not title_text and i+1 < len(lines):
                        # If title marker is on its own line, use the next line as the title
                        title_text = lines[i+1].strip()
                    if title_text:
                        return title_text

            # If no explicit title marker, try the structured approach
            title_lines = []
            i = 0
            
            # Skip header/conference info at the beginning
            while i < min(5, len(lines)) and (is_conference_line(lines[i]) or lines[i].isupper() or len(lines[i]) < 10):
                i += 1
            
            # Collect potential title lines
            start_idx = i
            while i < min(15, len(lines)):
                line = lines[i]
                
                # Stop if we hit author information
                if is_author_line(line):
                    break
                
                # Stop if line is too short (likely not part of title)
                if len(line) < 3:
                    break
                
                # Stop if we hit an abstract or other section
                if re.match(r"^\s*(abstract|introduction|keywords)\s*:?\s*$", line, re.IGNORECASE):
                    break
                
                # Add line to potential title
                title_lines.append(line)
                i += 1
                
                # If we've collected more than 3 lines, stop (titles rarely longer than 3 lines)
                if len(title_lines) >= 3:
                    break
            
            # If we didn't collect any title lines, revert to old approach - use the first substantial line
            if not title_lines and len(lines) > 0:
                # Find the first line that isn't a conference name and is substantial
                for line in lines[:10]:
                    if not is_conference_line(line) and len(line) > 10:
                        title_lines = [line]
                        break
            
            # Join collected title lines
            title = " ".join(title_lines).strip()
            
            # Clean up the title
            title = re.sub(r"^\s*title\s*:\s*", "", title, re.IGNORECASE).strip()
            
            # Additional checks for title quality
            if not title or len(title) < 5:
                print("No suitable title found")
                return "Title could not be extracted."
                
            print(f"Extracted title: '{title}'")
            return title

    except Exception as e:
        print(f"Error extracting title: {str(e)}")
        return f"Error extracting title: {str(e)}"

@title_extractor_bp.route("/extract-title", methods=["POST"])
def extract_title():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(file_path)

    try:
        title = extract_title_from_pdf(file_path)
        print(f"Final extracted title for {file.filename}: '{title}'")
        return jsonify({"title": title}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)