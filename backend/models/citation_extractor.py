# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import re

# citation_extractor_bp = Blueprint("citation_extractor", __name__)

# # Function to extract citations from the PDF
# def extract_citations_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             citations = set()  # Use a set to avoid duplicate citations
#             for page in pdf.pages:
#                 text = page.extract_text()
#                 if text:
#                     # Use regex to find citations in the text
#                     # This regex looks for citations in the format (Author, Year) or [1], [2], etc.
#                     matches = re.findall(r'\(([^)]+)\)|\[(\d+)\]', text)
#                     for match in matches:
#                         # Add the citation to the set
#                         citation = match[0] if match[0] else match[1]
#                         citations.add(citation.strip())

#             return list(citations)  # Convert set to list for JSON response

#     except Exception as e:
#         return str(e)

# # New API Route for Extracting Citations from PDFs
# @citation_extractor_bp.route('/extract-citations', methods=['POST'])
# def extract_citations():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)

#         citations = extract_citations_from_pdf(file_path)  # Extract the citations
        
#         return jsonify({"citations": citations}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)










# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import re

# citation_extractor_bp = Blueprint("citation_extractor", __name__)

# # Function to extract citations from the PDF
# def extract_citations_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             citations = set()  # Use a set to avoid duplicate citations
#             for page in pdf.pages:
#                 text = page.extract_text()
#                 if text:
#                     # Use regex to find citations in the text
#                     matches = re.findall(r'\(([^)]+)\)|\[(\d+)\]', text)
#                     for match in matches:
#                         # Add the citation to the set
#                         citation = match[0] if match[0] else match[1]
#                         citations.add(citation.strip())
        
#         # Print all extracted citations for verification
#         if citations:
#             print("Extracted Citations:")
#             for citation in citations:
#                 print(citation)
#         else:
#             print("No citations found.")

#         return list(citations)  # Convert set to list for JSON response

#     except Exception as e:
#         return str(e)

# # New API Route for Extracting Citations from PDFs
# @citation_extractor_bp.route('/extract-citations', methods=['POST'])
# def extract_citations():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)

#         citations = extract_citations_from_pdf(file_path)  # Extract the citations
        
#         return jsonify({"citations": citations}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)
































# # priti's code that prints all citations but twice
# from flask import Flask, Blueprint, request, jsonify
# import os
# import re
# import PyPDF2

# # Create a Flask application
# app = Flask(__name__)

# # Create a Blueprint for citation extraction
# citation_extractor_bp = Blueprint("citation_extractor", __name__)

# def extract_text_from_pdf(pdf_path):
#     """Extract text from a PDF file."""
#     text = ""
#     with open(pdf_path, "rb") as file:
#         reader = PyPDF2.PdfReader(file)
#         for page in reader.pages:
#             text += page.extract_text() + "\n"
#     return text

# def extract_references(text):
#     """Extract references from research paper text."""
#     # Look for a References section (or Bibliography)
#     references_start = re.search(r'(?i)\b(?:References|Bibliography)\b', text)
#     if references_start:
#         references_text = text[references_start.start():]
#     else:
#         return []  # No references section found

#     # Extract individual references using patterns
#     reference_patterns = [
#         r'\[\d+\].*?(?=\[\d+\]|\n\n)',  # [1] Author. Title...
#         r'\d+\.\s+.*?(?=\d+\.\s|\n\n)',  # 1. Author. Title...
#         r'\((19|20)\d{2}\).*?(?=\((19|20)\d{2}\)|\n\n)',  # (Year) Author. Title...
#     ]

#     references = []
#     for pattern in reference_patterns:
#         matches = re.findall(pattern, references_text, re.DOTALL)
#         references.extend(matches)

#     return references

# # Function to extract citations from the PDF
# def extract_citations_from_pdf(file_path):
#     try:
#         text = extract_text_from_pdf(file_path)
#         references = extract_references(text)

#         return references  # Return the list of references

#     except Exception as e:
#         return str(e)

# # New API Route for Extracting Citations from PDFs
# @citation_extractor_bp.route('/extract-citations', methods=['POST'])
# def extract_citations():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)

#         references = extract_citations_from_pdf(file_path)  # Extract the citations
        
#         return jsonify({"citations": references}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)

# # Register the blueprint
# app.register_blueprint(citation_extractor_bp)

# if __name__ == "__main__":
#     app.run(debug=True)




















#  attempt to prints all citations properly once
from flask import Flask, Blueprint, request, jsonify
import os
import re
import PyPDF2

# Create a Flask application
app = Flask(__name__)

# Create a Blueprint for citation extraction
citation_extractor_bp = Blueprint("citation_extractor", __name__)

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

def extract_references(text): #LEAVES THE LAST CITATION
    """Extract references from research paper text."""
    # Look for a References section (or Bibliography)
    references_start = re.search(r'(?i)\b(?:References|Bibliography)\b', text)
    if references_start:
        references_text = text[references_start.start():]
    else:
        return []  # No references section found

    # Combined regex pattern to capture all references
    reference_pattern = r'(\[\d+\].*?(?=\[\d+\]|\n\n)|\d+\.\s+.*?(?=\d+\.\s|\n\n)|\((19|20)\d{2}\).*?(?=\((19|20)\d{2}\)|\n\n))'

    references = []  # Use a list to maintain order
    seen_references = set()  # To track duplicates

    matches = re.findall(reference_pattern, references_text, re.DOTALL)
    for match in matches:
        # match[0] contains the full match
        citation = match[0].strip()  # Clean up whitespace
        if citation not in seen_references:
            seen_references.add(citation)
            references.append(citation)  # Append to list to maintain order

    return references  # Return the ordered list of references



# def extract_references(text): #TAKES THE LAST CITATION BUT PRINTS ON SAME LINE 
#     """Extract references from research paper text."""
#     # Look for a References section (or Bibliography)
#     references_start = re.search(r'(?i)\b(?:References|Bibliography)\b', text)
#     if references_start:
#         references_text = text[references_start.start():]
#     else:
#         return []  # No references section found

#     # Combined regex pattern to capture all references, including the last one
#     reference_pattern = r'(\[\d+\].*?(?=\[\d +\]|\n\n|$)|\d+\.\s+.*?(?=\d+\.\s|\n\n|$)|\((19|20)\d{2}\).*?(?=\((19|20)\d{2}\)|\n\n|$))'

#     references = []  # Use a list to maintain order
#     seen_references = set()  # To track duplicates

#     matches = re.findall(reference_pattern, references_text, re.DOTALL)
#     for match in matches:
#         citation = match[0].strip()  # Clean up whitespace
#         if citation not in seen_references:
#             seen_references.add(citation)
#             references.append(citation)  # Append to list to maintain order

#     # Final check for any remaining text that could be a citation
#     remaining_text = references_text[len(''.join(references)):]
#     if remaining_text.strip():
#         last_citation = remaining_text.strip()
#         if last_citation not in seen_references:
#             references.append(last_citation)

#     return references  # Return the ordered list of references



# Function to extract citations from the PDF
def extract_citations_from_pdf(file_path):
    try:
        text = extract_text_from_pdf(file_path)
        print(f"Extracted text length: {len(text)}")  # Debug text length
        references = extract_references(text)
        print(f"Found {len(references)} references: {references}")  # Debug references
        return references
    except Exception as e:
        print(f"Error in citation extraction: {str(e)}")
        return str(e)

# New API Route for Extracting Citations from PDFs
@citation_extractor_bp.route('/extract-citations', methods=['POST'])
def extract_citations():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        file_path = os.path.join('uploads', file.filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(file_path)
        print(f"File saved: {file_path}")  # Debug file save

        references = extract_citations_from_pdf(file_path)
        return jsonify({"citations": references}), 200
    except Exception as e:
        print(f"Endpoint error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

# Register the blueprint
app.register_blueprint(citation_extractor_bp)

if __name__ == "__main__":
    app.run(debug=True)
