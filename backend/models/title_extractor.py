
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
import fitz  # PyMuPDF
from flask_cors import CORS
import re
import tempfile
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

title_extractor_bp = Blueprint("title_extractor", __name__)
CORS(title_extractor_bp, resources={r"/extract-title": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
    "methods": ["POST", "OPTIONS"],
    "allow_headers": ["Content-Type"],
    "supports_credentials": True
}})

def extract_title_from_pdf(file_path, pages_to_scan=3):
    """Extracts a research paper title (single-line or multi-line) while avoiding author names."""
    try:
        doc = fitz.open(file_path)

        # Check metadata first - often reliable
        metadata_title = doc.metadata.get("title", "").strip()
        if metadata_title and len(metadata_title) > 5:  # Ensure it's meaningful
            logging.info(f"Found title in metadata: '{metadata_title}'")
            return metadata_title

        text = ""
        # Extract text from the first few pages
        for page_num in range(min(pages_to_scan, len(doc))):
            text += doc[page_num].get_text("text") + "\n"

        if not text:
            logging.warning("No text extracted from PDF")
            return "Title could not be extracted."

        # Split text into lines
        lines = text.split("\n")

        title_lines = []
        found_title = False  # Flag to track when title extraction starts

        # Keywords that indicate author names or affiliations
        stop_words = {
            "google", "university", "institute", "research", "department", 
            "lab", "school", "corporation", "inc.", "llc", "microsoft", 
            "amazon", "facebook", "meta", "apple", "ibm", "intel", "nvidia"
        }
        author_name_pattern = re.compile(r"\b[A-Z][a-z]+ [A-Z][a-z]+\b")  # Detects names like "John Doe"

        for line in lines:
            clean_line = line.strip()

            # Skip empty lines before title starts
            if not clean_line and not found_title:
                continue

            # Remove special characters and ordinals (e.g., 1st, 2nd, *, †, ‡)
            clean_line = re.sub(r"[*†‡]|\b\d{1,2}(st|nd|rd|th)?\b", "", clean_line).strip()

            # Skip lines that are just numbers (e.g., page numbers)
            if clean_line.isdigit():
                continue

            # Stop at email addresses (common after author names)
            if re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b", clean_line):
                break

            # Stop if a typical author-related keyword is found
            if any(word in clean_line.lower() for word in stop_words):
                break

            # Stop if an author name pattern (e.g., "Yucheng Shi") is detected
            if author_name_pattern.search(clean_line):
                break

            # Allow uppercase titles (some papers use ALL CAPS)
            if clean_line and (not clean_line.isupper() or len(clean_line) > 10):
                title_lines.append(clean_line)
                found_title = True

            # Stop after an empty line once title is found
            if found_title and not clean_line:
                break

        # Join extracted lines to form the final title
        title = " ".join(title_lines).strip()

        # Additional checks for title quality
        if not title or len(title) < 5:
            logging.warning("No suitable title found")
            return "Title could not be extracted."

        logging.info(f"Extracted title: '{title}'")
        return title

    except Exception as e:
        logging.error(f"Error extracting title: {str(e)}")
        return f"Error extracting title: {str(e)}"
    finally:
        if 'doc' in locals():
            doc.close()

@title_extractor_bp.route("/extract-title", methods=["POST"])
def extract_title():
    """Endpoint to extract title from a PDF."""
    if "file" not in request.files:
        logging.error("No file uploaded")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        logging.error("No selected file")
        return jsonify({"error": "No selected file"}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            file.save(tmp.name)
            file_path = tmp.name

        try:
            title = extract_title_from_pdf(file_path)
            logging.info(f"Final extracted title for {file.filename}: '{title}'")
            return jsonify({"title": title}), 200
        except Exception as e:
            logging.error(f"Failed to process PDF: {str(e)}")
            return jsonify({"error": f"Error processing file: {str(e)}"}), 500
    except Exception as e:
        logging.error(f"Error handling file: {str(e)}")
        return jsonify({"error": f"Error processing file: {str(e)}"}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)