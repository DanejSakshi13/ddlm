# works fine 11/4/25
# from flask import Blueprint, request, jsonify
# import os
# import re
# from pdfminer.high_level import extract_text
# from flask_cors import CORS
# import tempfile

# author_extractor_bp = Blueprint("author_extractor", __name__)
# CORS(author_extractor_bp, resources={r"/extract-authors": {
#     "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
#     "methods": ["POST", "OPTIONS"],
#     "allow_headers": ["Content-Type", "Authorization"],
#     "supports_credentials": True
# }})

# def clean_line(line):
#     """Clean and validate potential author names."""
#     line = re.sub(r'[\*\†\‡]', '', line)  # Remove special characters
#     line = re.sub(r'\d(?:st|nd|rd|th)?', '', line)  # Remove ordinals
#     line = re.sub(r'[^\w\s]', '', line)  # Remove other punctuation
#     return line.strip('- ').strip()

# def is_probable_author(line):
#     """Check if a line likely contains an author name."""
#     words = line.split()
#     if 2 <= len(words) <= 6:  # Reasonable length for names
#         return all(word[0].isupper() and word.isalpha() for word in words)
#     return False

# def is_irrelevant_line(line):
#     """Filter out lines unlikely to be author names."""
#     keywords = [
#         'attention', 'scaled', 'multihead', 'dotproduct', 'professor', 'assistant',
#         'school', 'database', 'langchain', 'chennai', 'india', 'google',
#         'brain', 'university', 'institute', 'college', 'hospital', 'technology',
#         'research', 'model', 'abstract', 'introduction', 'discussion',
#         'results', 'acknowledgment', 'conclusion', 'content', 'references',
#         'ieee', 'doi', 'index terms', 'related work', 'qk t', 'usa', 'quantum', 'bloomington'
#     ]
#     return len(line.split()) <= 1 or any(keyword in line.lower() for keyword in keywords)

# def extract_authors_only(text, max_lines=150):
#     """Extract author names from PDF text."""
#     text = re.sub(r'\S+@\S+', '', text)  # Remove emails
#     lines = [clean_line(line) for line in text.split('\n') if clean_line(line)]
#     authors = []
#     for line in lines[:max_lines]:
#         if is_probable_author(line) and not is_irrelevant_line(line):
#             authors.append(line.strip())
#     return list(dict.fromkeys(authors))  # Remove duplicates

# @author_extractor_bp.route("/extract-authors", methods=["POST"])
# def extract_authors():
#     """Endpoint to extract authors from a PDF."""
#     if "file" not in request.files:
#         return jsonify({"authors": ["No file provided"]}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"authors": ["Empty filename"]}), 400

#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             file.save(tmp.name)
#             file_path = tmp.name

#         try:
#             text = extract_text(file_path)
#             authors = extract_authors_only(text)
#             if not authors:
#                 authors = ["No authors found"]
#             print(f"Extracted authors for {file.filename}: {authors}")
#             return jsonify({"authors": authors}), 200
#         except Exception as e:
#             print(f"Failed to read PDF: {str(e)}")
#             return jsonify({"authors": [f"Failed to read PDF: {str(e)}"]}), 500
#     except Exception as e:
#         print(f"Error processing file: {str(e)}")
#         return jsonify({"authors": [f"Error processing file: {str(e)}"]}), 500
#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)
















# handling edge cases
from flask import Blueprint, request, jsonify
import os
import re
from pdfminer.high_level import extract_text
from flask_cors import CORS
import tempfile

author_extractor_bp = Blueprint("author_extractor", __name__)
CORS(author_extractor_bp, resources={r"/extract-authors": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    "methods": ["POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})

def clean_line(line):
    """Clean and validate potential author names."""
    line = re.sub(r'[\*\†\‡]', '', line)
    line = re.sub(r'\d(?:st|nd|rd|th)?', '', line)
    line = re.sub(r'[^\w\s]', '', line)
    return line.strip('- ').strip()

def is_probable_author(line):
    """Check if a line likely contains an author name."""
    words = line.split()
    # Match friend's range: 2-6 words
    if 2 <= len(words) <= 6:
        return all(word[0].isupper() and word.isalpha() for word in words)
    return False

def is_irrelevant_line(line):
    """Filter out lines unlikely to be author names."""
    keywords = [
        'attention', 'scaled', 'multihead', 'dotproduct', 'professor', 'assistant',
        'school', 'database', 'langchain', 'chennai', 'india', 'google',
        'brain', 'university', 'institute', 'college', 'hospital', 'technology',
        'research', 'model', 'abstract', 'introduction', 'discussion',
        'results', 'acknowledgment', 'conclusion', 'content', 'references',
        'ieee', 'doi', 'index terms', 'related work', 'qk t', 'campus', 'identifier'
    ]
    irrelevant_patterns = [
        r'\bUSA\b',           # Exact match for "USA"
        r'^II ',             # Lines starting with "II "
        r'\bMethodology\b'   # Exact match for "Methodology"
    ]
    for pattern in irrelevant_patterns:
        if re.search(pattern, line, re.IGNORECASE):  # Case-insensitive
            return True
    return len(line.split()) <= 1 or any(keyword in line.lower() for keyword in keywords)

# def extract_authors_only(text, max_lines=150):
#     """Extract author names from PDF text."""
#     text = re.sub(r'\S+@\S+', '', text)  # Remove emails
#     lines = [clean_line(line) for line in text.split('\n') if clean_line(line)]
#     print("Extracted lines:", lines[:max_lines])  # Debug
#     authors = []
    
#     for line in lines[:max_lines]:
#         if is_probable_author(line) and not is_irrelevant_line(line):
#             print(f"Accepted author: {line}")  # Debug
#             authors.append(line.strip())
    
#     return list(dict.fromkeys(authors)) or ["No authors found"]

def extract_authors_only(text, max_lines=150):
    """Extract author names with stricter filtering."""
    text = re.sub(r'\S+@\S+', '', text)  # Remove emails
    lines = [clean_line(line) for line in text.split('\n') if clean_line(line)]
    authors = []
    potential_authors = []

    for line in lines[:max_lines]:
        if is_probable_author(line) and not is_irrelevant_line(line):
            # Check if it’s a section header or too long to be a name
            if len(line.split()) > 6 or any(keyword in line.upper() for keyword in ["ABSTRACT", "INTRODUCTION", "BACKGROUND", "DECODER"]):
                continue
            potential_authors.append(line)
            # Assume authors are listed consecutively; stop after a gap
            if len(potential_authors) > 1 and not is_probable_author(lines[lines.index(line) + 1] if lines.index(line) + 1 < len(lines) else ""):
                break
        else:
            if potential_authors:
                break

    # Deduplicate and filter
    authors = list(dict.fromkeys(potential_authors))
    return authors if authors else ["No authors found"]

@author_extractor_bp.route("/extract-authors", methods=["POST"])
def extract_authors():
    """Endpoint to extract authors from a PDF."""
    if "file" not in request.files:
        return jsonify({"authors": ["No file provided"]}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"authors": ["Empty filename"]}), 400

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            file.save(tmp.name)
            file_path = tmp.name

        try:
            text = extract_text(file_path)
            authors = extract_authors_only(text)
            print(f"Extracted authors for {file.filename}: {authors}")
            return jsonify({"authors": authors}), 200
        except Exception as e:
            print(f"Failed to read PDF: {str(e)}")
            return jsonify({"authors": [f"Failed to read PDF: {str(e)}"]}), 500
    except Exception as e:
        print(f"Error processing file: {str(e)}")
        return jsonify({"authors": [f"Error processing file: {str(e)}"]}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)