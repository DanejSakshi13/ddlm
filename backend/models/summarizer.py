# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# from transformers import pipeline

# summarizer_bp = Blueprint("summarizer", __name__)

# # Function to extract text from a PDF
# def extract_text_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
#     except Exception as e:
#         return str(e)

# # Load Hugging Face Summarization Model
# summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# # Summarization function with a word limit
# def summarize_text_with_limit(text, word_limit):
#     chunks = [text[i:i + 1024] for i in range(0, len(text), 1024)]
#     summary = ""

#     for chunk in chunks:
#         summarized_chunk = summarizer(
#             chunk, max_length=min(word_limit * 2, 1024), min_length=30, do_sample=False
#         )[0]['summary_text']
#         summary += summarized_chunk + " "

#     words = summary.split()
#     return " ".join(words[:word_limit]) + "..." if len(words) > word_limit else summary.strip()

# # API Route for Summarizing PDFs
# @summarizer_bp.route('/summarize-pdf', methods=['POST'])
# def summarize_pdf():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     word_limit = int(request.form.get('word_limit', 150))

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)

#         text = extract_text_from_pdf(file_path)
#         if not text:
#             return jsonify({"error": "No text found in PDF"}), 500

#         summary = summarize_text_with_limit(text, word_limit)
        
#         return jsonify({"summary": summary}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)




















# # working code
# 5/4/25
from flask import Blueprint, request, jsonify
import os
import pdfplumber
from transformers import pipeline
import textwrap

summarizer_bp = Blueprint("summarizer", __name__)

# Function to extract text from a PDF
def extract_text_from_pdf(file_path):
    try:
        with pdfplumber.open(file_path) as pdf:
            return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
    except Exception as e:
        return str(e)

# Load Hugging Face Summarization Model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Function to split text into five key points
def split_into_points(text):
    import re
    sentences = re.split(r'(?<=\.)\s+', text.strip())  # Split sentences properly
    key_points = []
    
    # Prioritize the first 5 core ideas without merging too much
    for sentence in sentences:
        if len(key_points) < 5:
            key_points.append(sentence.strip())

    # Ensure exactly 5 points (truncate extras)
    formatted_points = [f"{i+1}. {point}" for i, point in enumerate(key_points)]
    
    # Join with newline for proper formatting
    return "\n".join(formatted_points)  


# Summarization function with 5 points output
def summarize_text_with_points(text, word_limit):
    chunks = [text[i:i + 1024] for i in range(0, len(text), 1024)]
    summary = ""

    for chunk in chunks:
        summarized_chunk = summarizer(
            chunk, max_length=min(word_limit * 2, 1024), min_length=30, do_sample=False
        )[0]['summary_text']
        summary += summarized_chunk + " "

    # Convert full summary into 5 key points
    summary_points = split_into_points(summary.strip())
    
    return summary_points

# API Route for Summarizing PDFs
@summarizer_bp.route('/summarize-pdf', methods=['POST'])
def summarize_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    word_limit = int(request.form.get('word_limit', 150))

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        file_path = os.path.join('uploads', file.filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(file_path)

        text = extract_text_from_pdf(file_path)
        if not text:
            return jsonify({"error": "No text found in PDF"}), 500

        summary_points = summarize_text_with_points(text, word_limit)
        
        return jsonify({"summary": summary_points}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)




























# # using smaller model 
# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# from transformers import pipeline
# import re

# summarizer_bp = Blueprint("summarizer", __name__)

# # Function to extract text from a PDF
# def extract_text_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
#     except Exception as e:
#         return str(e)

# # Load a more efficient Hugging Face Summarization Model
# summarizer = pipeline("summarization", model="facebook/distilbart-cnn-12-6")

# # Function to split text into five key points
# def split_into_points(text):
#     sentences = re.split(r'(?<=\.)\s+', text.strip())  # Split sentences properly
#     key_points = []
    
#     # Prioritize the first 5 core ideas without merging too much
#     for sentence in sentences:
#         if len(key_points) < 5:
#             key_points.append(sentence.strip())

#     # Ensure exactly 5 points (truncate extras)
#     formatted_points = [f"{i+1}. {point}" for i, point in enumerate(key_points)]
    
#     # Join with newline for proper formatting
#     return "\n".join(formatted_points)  

# # Summarization function with 5 points output
# def summarize_text_with_points(text, word_limit):
#     # Split text into chunks of 1024 characters
#     chunks = [text[i:i + 1024] for i in range(0, len(text), 1024)]
#     summary = ""

#     for chunk in chunks:
#         summarized_chunk = summarizer(
#             chunk, max_length=min(word_limit * 2, 1024), min_length=30, do_sample=False
#         )[0]['summary_text']
#         summary += summarized_chunk + " "

#     # Convert full summary into 5 key points
#     summary_points = split_into_points(summary.strip())
    
#     return summary_points

# # API Route for Summarizing PDFs
# @summarizer_bp.route('/summarize-pdf', methods=['POST'])
# def summarize_pdf():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     word_limit = int(request.form.get('word_limit', 150))

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)

#         text = extract_text_from_pdf(file_path)
#         if not text:
#             return jsonify({"error": "No text found in PDF"}), 500

#         summary_points = summarize_text_with_points(text, word_limit)
        
#         return jsonify({"summary": summary_points}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)













# from flask import Blueprint, request, jsonify
# import os
# import pdfplumber
# import requests
# import re

# summarizer_bp = Blueprint("summarizer", __name__)

# # Hugging Face API setup
# API_TOKEN = "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"  # Replace with your token
# API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"  # BART Large CNN
# HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}

# # Function to extract text from a PDF
# def extract_text_from_pdf(file_path):
#     try:
#         with pdfplumber.open(file_path) as pdf:
#             return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
#     except Exception as e:
#         return str(e)

# # Function to call Hugging Face API for summarization
# def summarize_with_hf_api(text, max_length=150, min_length=30):
#     payload = {
#         "inputs": text,
#         "parameters": {"max_length": max_length, "min_length": min_length, "do_sample": False}
#     }
#     response = requests.post(API_URL, headers=HEADERS, json=payload)
#     if response.status_code == 200:
#         return response.json()[0]["summary_text"]
#     else:
#         raise Exception(f"API error: {response.status_code} - {response.text}")

# # Function to split text into five key points
# def split_into_points(text):
#     sentences = re.split(r'(?<=\.)\s+', text.strip())
#     key_points = []
#     for sentence in sentences:
#         if len(key_points) < 5:
#             key_points.append(sentence.strip())
#     formatted_points = [f"{i+1}. {point}" for i, point in enumerate(key_points)]
#     return "\n".join(formatted_points)

# # Summarization function with 5 points output
# def summarize_text_with_points(text, word_limit):
#     chunks = [text[i:i + 1024] for i in range(0, len(text), 1024)]
#     summary = ""
#     for chunk in chunks:
#         try:
#             summarized_chunk = summarize_with_hf_api(chunk, max_length=min(word_limit * 2, 1024), min_length=30)
#             summary += summarized_chunk + " "
#         except Exception as e:
#             summary += f"Error: {str(e)} "
#     summary_points = split_into_points(summary.strip())
#     return summary_points

# # API Route for Summarizing PDFs
# @summarizer_bp.route('/summarize-pdf', methods=['POST'])
# def summarize_pdf():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400
#     file = request.files['file']
#     word_limit = int(request.form.get('word_limit', 150))
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400
#     try:
#         file_path = os.path.join('uploads', file.filename)
#         os.makedirs('uploads', exist_ok=True)
#         file.save(file_path)
#         text = extract_text_from_pdf(file_path)
#         if not text:
#             return jsonify({"error": "No text found in PDF"}), 500
#         summary_points = summarize_text_with_points(text, word_limit)
#         return jsonify({"summary": summary_points}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         if os.path.exists(file_path):
#             os.remove(file_path)