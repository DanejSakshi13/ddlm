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











#corenrlty extracts first line of title
from flask import Blueprint, request, jsonify
import os
import pdfplumber
import re

title_extractor_bp = Blueprint("title_extractor", __name__)

# Function to extract the title from the PDF
def extract_title_from_pdf(file_path):
    try:
        with pdfplumber.open(file_path) as pdf:
            first_page = pdf.pages[0]
            text = first_page.extract_text()
            if not text:
                return "Title not found"

            # Split the text into lines
            lines = text.split('\n')

            # Initialize variables to hold potential titles
            potential_titles = []

            # Analyze each line for potential title characteristics
            for line in lines:
                # Check for non-empty lines and apply heuristics
                if line.strip():
                    # Check for common title patterns (e.g., capitalization, length)
                    if len(line.split()) > 1 and (line.isupper() or line[0].isupper()):
                        potential_titles.append(line.strip())

            # If we found potential titles, return the first one
            if potential_titles:
                return potential_titles[0]  # Return the first potential title
            else:
                return "Title not found"

    except Exception as e:
        return str(e)

# New API Route for Extracting Title from PDFs
@title_extractor_bp.route('/extract-title', methods=['POST'])
def extract_title():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        file_path = os.path.join('uploads', file.filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(file_path)

        title = extract_title_from_pdf(file_path)  # Extract the title
        
        return jsonify({"title": title}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)























# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import re

# title_extractor_bp = Blueprint("title_extractor", __name__)

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

#             # Initialize a variable to hold the title
#             title = ""

#             # Define keywords to ignore
#             ignore_keywords = ["author", "abstract", "introduction", "index terms", "keywords", "corresponding author"]

#             # Set to track seen author names and affiliations to avoid duplicates
#             seen_content = set()

#             # Analyze each line for potential title characteristics
#             for line in lines:
#                 line = line.strip()
#                 if line:  # Check for non-empty lines
#                     # Check if the line contains any ignore keywords
#                     if any(keyword in line.lower() for keyword in ignore_keywords):
#                         break  # Stop processing if we hit an ignored section

#                     # Check for common title patterns (e.g., capitalization)
#                     if len(line.split()) > 1 and (line.isupper() or line[0].isupper()):
#                         # If title is empty, assign the line
#                         if not title:
#                             title = line
#                         else:
#                             # If title is already set, append the line
#                             title += ' ' + line

#                     # Check if the line contains author names or affiliations
#                     if re.match(r'^[A-Z][a-z]+(?: [A-Z][a-z]+)*$', line) or re.match(r'^[A-Z\s]+$', line):
#                         # If the line is a recognized author name or affiliation, ignore it
#                         if line not in seen_content:
#                             seen_content.add(line)  # Track seen content
#                         continue  # Skip this line

#             # Clean up the title
#             title = title.strip() if title else "Title not found"

#             return title

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