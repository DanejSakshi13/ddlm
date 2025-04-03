#extract title incorectly, extracts first line of paper
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber

# title_extractor_bp = Blueprint("title_extractor", __name__)

# # Function to extract the title from the PDF
# def extract_title_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             first_page = pdf.pages[0]
#             title = first_page.extract_text().split('\n')[0]  # Get the first line as title
#             return title.strip() if title else "Title not found"
#     except Exception as e:
#         return str(e)

# # New API Route for Extracting Title from PDFs
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

#         title = extract_title_from_pdf(file_path)  # Extract the title
        
#         return jsonify({"title": title}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)











# # #corenrlty extracts first line of title
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import re
# from flask_cors import CORS  # Import CORS at the top

# title_extractor_bp = Blueprint("title_extractor", __name__)
# CORS(title_extractor_bp)
# # Function to extract the title from the PDF
# def extract_title_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             first_page = pdf.pages[0]
#             text = first_page.extract_text()
#             if not text:
#                 return "Title not found"

#             # Split the text into lines
#             lines = text.split('\n')

#             # Initialize variables to hold potential titles
#             potential_titles = []

#             # Analyze each line for potential title characteristics
#             for line in lines:
#                 # Check for non-empty lines and apply heuristics
#                 if line.strip():
#                     # Check for common title patterns (e.g., capitalization, length)
#                     if len(line.split()) > 1 and (line.isupper() or line[0].isupper()):
#                         potential_titles.append(line.strip())

#             # If we found potential titles, return the first one
#             if potential_titles:
#                 return potential_titles[0]  # Return the first potential title
#             else:
#                 return "Title not found"

#     except Exception as e:
#         return str(e)

# # New API Route for Extracting Title from PDFs
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

#         title = extract_title_from_pdf(file_path)  # Extract the title
        
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






from flask import Blueprint, request, jsonify
import os
import pdfplumber
from flask_cors import CORS

title_extractor_bp = Blueprint("title_extractor", __name__)
# Align CORS with app.py
CORS(title_extractor_bp, resources={r"/extract-title": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
    "methods": ["POST", "OPTIONS"],
    "allow_headers": ["Content-Type"],
    "supports_credentials": True
}})

def extract_title_from_pdf(file_path):
    try:
        with pdfplumber.open(file_path) as pdf:
            if not pdf.pages:
                print("No pages found in PDF")
                return "No pages found in PDF"

            first_page = pdf.pages[0]
            text = first_page.extract_text()
            print(f"Raw text from first page: '{text}'")

            if not text:
                print("No text extracted from first page")
                return "No text found on first page"

            lines = [line.strip() for line in text.split("\n") if line.strip()]
            print(f"Extracted lines: {lines}")

            # Heuristic 1: First 10 lines, relaxed rules
            for i, line in enumerate(lines[:10]):
                word_count = len(line.split())
                if 1 <= word_count <= 30:
                    print(f"Found potential title (heuristic 1): '{line}' at line {i}")
                    return line

            # Heuristic 2: Largest font size near top
            words = first_page.extract_words()
            print(f"Extracted words: {words}")
            if words:
                size_groups = {}
                for word in words:
                    size = word.get("size", 0)
                    if size not in size_groups:
                        size_groups[size] = []
                    size_groups[size].append(word)

                largest_size = max(size_groups.keys(), default=0)
                if largest_size:
                    largest_words = [w for w in size_groups[largest_size] if w["top"] < 100]
                    if largest_words:
                        largest_words = sorted(largest_words, key=lambda w: w["x0"])
                        potential_title = " ".join(w["text"] for w in largest_words).strip()
                        print(f"Found potential title (heuristic 2 - font size): '{potential_title}'")
                        return potential_title

            print("No suitable title found in heuristics")
            return "Title not found"

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