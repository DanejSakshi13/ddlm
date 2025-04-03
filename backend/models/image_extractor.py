# backend/models/image_extractor.py
from flask import Blueprint, request, jsonify
from PyPDF2 import PdfReader
from PIL import Image
import io
import base64
import os

image_extractor_bp = Blueprint('image_extractor_bp', __name__)

def extract_images_from_pdf(pdf_file, page_num):
    """Extracts images from a specific page of a PDF file."""
    images = []
    try:
        pdf_reader = PdfReader(pdf_file)
        page = pdf_reader.pages[page_num]
        for image in page.images:
            try:
                img_bytes = image.data
                img = Image.open(io.BytesIO(img_bytes))
                images.append((f"Page {page_num + 1}, Image {image.name}", img))
            except Exception as e:
                print(f"Error processing image {image.name} on page {page_num + 1}: {e}")
    except Exception as e:
        print(f"Error extracting images from page {page_num + 1}: {e}")
    return images

def process_pdf(pdf_file):
    """Process the PDF file and extract images."""
    results = {
        "images": [],
    }
    
    try:
        pdf_reader = PdfReader(pdf_file)
        total_pages = len(pdf_reader.pages)
        
        for page_num in range(total_pages):
            images = extract_images_from_pdf(pdf_file, page_num)
            for name, img in images:
                buffered = io.BytesIO()
                img.save(buffered, format="PNG")
                img_str = base64.b64encode(buffered.getvalue()).decode()
                results["images"].append({
                    "name": name,
                    "image": img_str
                })
                
    except Exception as e:
        return {"error": str(e)}
    
    return results

@image_extractor_bp.route('/extract-images', methods=['POST'])
def extract_images():
    """Endpoint to extract images from an uploaded PDF."""
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "File must be a PDF"}), 400
    
    # Save the uploaded file temporarily
    temp_path = "temp.pdf"
    file.save(temp_path)
    
    try:
        # Process the PDF and extract images
        results = process_pdf(temp_path)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)