# wokring 5/4/25 - but doesnt work for some pdfs
# # backend/models/image_extractor.py
# from flask import Blueprint, request, jsonify
# from PyPDF2 import PdfReader
# from PIL import Image
# import io
# import base64
# import os

# image_extractor_bp = Blueprint('image_extractor_bp', __name__)

# def extract_images_from_pdf(pdf_file, page_num):
#     """Extracts images from a specific page of a PDF file."""
#     images = []
#     try:
#         pdf_reader = PdfReader(pdf_file)
#         page = pdf_reader.pages[page_num]
#         for image in page.images:
#             try:
#                 img_bytes = image.data
#                 img = Image.open(io.BytesIO(img_bytes))
#                 images.append((f"Page {page_num + 1}, Image {image.name}", img))
#             except Exception as e:
#                 print(f"Error processing image {image.name} on page {page_num + 1}: {e}")
#     except Exception as e:
#         print(f"Error extracting images from page {page_num + 1}: {e}")
#     return images

# def process_pdf(pdf_file):
#     """Process the PDF file and extract images."""
#     results = {
#         "images": [],
#     }
    
#     try:
#         pdf_reader = PdfReader(pdf_file)
#         total_pages = len(pdf_reader.pages)
        
#         for page_num in range(total_pages):
#             images = extract_images_from_pdf(pdf_file, page_num)
#             for name, img in images:
#                 buffered = io.BytesIO()
#                 img.save(buffered, format="PNG")
#                 img_str = base64.b64encode(buffered.getvalue()).decode()
#                 results["images"].append({
#                     "name": name,
#                     "image": img_str
#                 })
                
#     except Exception as e:
#         return {"error": str(e)}
    
#     return results

# @image_extractor_bp.route('/extract-images', methods=['POST'])
# def extract_images():
#     """Endpoint to extract images from an uploaded PDF."""
#     if 'file' not in request.files:
#         return jsonify({"error": "No file provided"}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No file selected"}), 400
    
#     if not file.filename.endswith('.pdf'):
#         return jsonify({"error": "File must be a PDF"}), 400
    
#     # Save the uploaded file temporarily
#     temp_path = "temp.pdf"
#     file.save(temp_path)
    
#     try:
#         # Process the PDF and extract images
#         results = process_pdf(temp_path)
#         return jsonify(results), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         # Clean up the temporary file
#         if os.path.exists(temp_path):
#             os.remove(temp_path)

































# backend/models/image_extractor.py
# from flask import Blueprint, request, jsonify
# from pdf2image import convert_from_bytes
# import numpy as np
# import io
# import base64
# import cv2
# import logging

# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# image_extractor_bp = Blueprint('image_extractor_bp', __name__)

# def detect_content(image, page_num):
#     """Detect all visual content (figures, tables, etc.) using contours."""
#     items = []
#     try:
#         # Convert to grayscale and apply adaptive thresholding
#         gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
#         thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
#                                      cv2.THRESH_BINARY_INV, 11, 2)

#         # Find contours
#         contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#         logger.debug(f"Page {page_num + 1}: Found {len(contours)} contours")

#         for contour in contours:
#             x, y, w, h = cv2.boundingRect(contour)
#             # Filter contours by size to catch figures and tables
#             if w > 50 and h > 50 and w < image.width * 0.9 and h < image.height * 0.9:
#                 # Crop the region
#                 crop = image.crop((x, y, x + w, y + h))
#                 img_byte_arr = io.BytesIO()
#                 crop.save(img_byte_arr, format='PNG')
                
#                 # Simple heuristic: tall/wide = table, square-ish = figure
#                 aspect_ratio = w / h
#                 item_type = 'table' if aspect_ratio > 2 or aspect_ratio < 0.5 else 'figure'
                
#                 items.append({
#                     'page': page_num + 1,
#                     'name': f'{item_type}_{page_num}_{len(items)}',
#                     'image': img_byte_arr.getvalue(),
#                     'width': w,
#                     'height': h
#                 })
#                 logger.info(f"Detected {item_type} on page {page_num + 1}: {w}x{h}, aspect ratio: {aspect_ratio:.2f}")

#     except Exception as e:
#         logger.error(f"Error detecting content on page {page_num + 1}: {e}")
    
#     return items

# def process_pdf(file_bytes):
#     """Process PDF by rendering pages and detecting all content."""
#     results = {
#         "images": [],  # For figures/graphs
#         "tables": [],
#         "graphs": []   # Optional, can merge with images later
#     }
    
#     try:
#         logger.info("Rendering pages with pdf2image")
#         pages = convert_from_bytes(file_bytes, dpi=300)  # High DPI for detail
#         logger.info(f"Rendered {len(pages)} pages")

#         for page_num, page_img in enumerate(pages):
#             detected_items = detect_content(page_img, page_num)
#             for item in detected_items:
#                 encoded_img = base64.b64encode(item["image"]).decode('utf-8')
#                 if item["type"] == "table":
#                     results["tables"].append({
#                         "page": item["page"],
#                         "name": item["name"],
#                         "image": encoded_img
#                     })
#                 else:  # Treat as figure/graph
#                     results["images"].append({
#                         "page": item["page"],
#                         "name": item["name"],
#                         "image": encoded_img
#                     })

#         if not any(results.values()):
#             results["warning"] = "No content detected in the PDF"
#             logger.warning("No content extracted from PDF")

#     except Exception as e:
#         logger.error(f"Error processing PDF: {e}")
#         return {"error": f"Failed to process PDF: {str(e)}"}
    
#     return results

# @image_extractor_bp.route('/extract-images', methods=['POST'])
# def extract_images():
#     """Endpoint to extract all visual content."""
#     try:
#         if 'file' not in request.files:
#             logger.error("No file provided")
#             return jsonify({"error": "No file provided"}), 400

#         file = request.files['file']
#         if not file.filename.lower().endswith('.pdf'):
#             logger.error(f"Invalid file type: {file.filename}")
#             return jsonify({"error": "Please upload a PDF file"}), 400

#         file_bytes = file.read()
#         if not file_bytes:
#             logger.error("Empty file uploaded")
#             return jsonify({"error": "Empty file uploaded"}), 400

#         logger.info(f"Processing PDF: {file.filename}")
#         results = process_pdf(file_bytes)
        
#         if "error" in results:
#             return jsonify(results), 500
#         return jsonify(results), 200

#     except Exception as e:
#         logger.error(f"Unexpected error: {e}")
#         return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500























from flask import Blueprint, request, jsonify
from PyPDF2 import PdfReader
from pdf2image import convert_from_bytes
import numpy as np
import io
import base64
import cv2
import logging
from PIL import Image

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logging.getLogger('PIL').setLevel(logging.INFO)

image_extractor_bp = Blueprint('image_extractor_bp', __name__)

def extract_images_from_pdf(file_bytes):
    """Extract embedded images from PDF, filtering small/irrelevant ones."""
    images = []
    pdf = PdfReader(io.BytesIO(file_bytes))
    for page_num, page in enumerate(pdf.pages):
        if '/Resources' in page and '/XObject' in page['/Resources']:
            x_objects = page['/Resources']['/XObject'].get_object()
            for obj in x_objects:
                if x_objects[obj]['/Subtype'] == '/Image':
                    try:
                        data = x_objects[obj].get_data()
                        img = Image.open(io.BytesIO(data))
                        # Filter out very small images that are likely UI elements
                        if img.width < 50 or img.height < 50:
                            logger.debug(f"Skipped small image on page {page_num + 1}: {img.width}x{img.height}")
                            continue
                        img_byte_arr = io.BytesIO()
                        img.save(img_byte_arr, format='PNG')
                        images.append({
                            'page': page_num + 1,
                            'name': f'image_{page_num}_{len(images)}',
                            'image': img_byte_arr.getvalue(),
                            'width': img.width,
                            'height': img.height
                        })
                        logger.info(f"Extracted embedded image from page {page_num + 1}: {img.width}x{img.height}")
                    except Exception as e:
                        logger.error(f"Error processing XObject image on page {page_num + 1}: {e}")
    logger.info(f"Extracted {len(images)} embedded images from PDF")
    print(f"Extracted {len(images)} embedded images from PDF")
    return images

def merge_overlapping_contours(contours, threshold=0.3):
    """Merge contours that significantly overlap to prevent fragmenting images."""
    if not contours:
        return []
    
    # Convert contours to bounding boxes
    bounding_boxes = [cv2.boundingRect(contour) for contour in contours]
    merged_boxes = []
    
    while bounding_boxes:
        # Take the largest box as reference
        current_box = max(bounding_boxes, key=lambda box: box[2] * box[3])
        bounding_boxes.remove(current_box)
        
        x1, y1, w1, h1 = current_box
        merged = True
        
        while merged:
            merged = False
            i = 0
            while i < len(bounding_boxes):
                x2, y2, w2, h2 = bounding_boxes[i]
                
                # Calculate the area of overlap
                x_overlap = max(0, min(x1 + w1, x2 + w2) - max(x1, x2))
                y_overlap = max(0, min(y1 + h1, y2 + h2) - max(y1, y2))
                overlap_area = x_overlap * y_overlap
                
                # Calculate areas of both boxes
                area1 = w1 * h1
                area2 = w2 * h2
                
                # If overlapping beyond threshold, merge them
                if overlap_area > threshold * min(area1, area2):
                    # Merge boxes by taking the union
                    x = min(x1, x2)
                    y = min(y1, y2)
                    w = max(x1 + w1, x2 + w2) - x
                    h = max(y1 + h1, y2 + h2) - y
                    
                    # Update current box
                    x1, y1, w1, h1 = x, y, w, h
                    
                    # Remove the merged box
                    bounding_boxes.pop(i)
                    merged = True
                else:
                    i += 1
        
        merged_boxes.append((x1, y1, w1, h1))
    
    return merged_boxes

def detect_tables_and_figures(image, page_num):
    """Detect tables and figures with refined parameters."""
    tables = []
    figures = []
    
    # Convert PIL Image to OpenCV format
    cv_image = np.array(image)
    height, width = cv_image.shape[:2]
    
    # Skip processing if image is too small
    if width < 100 or height < 100:
        logger.warning(f"Image on page {page_num + 1} too small: {width}x{height}")
        return tables, figures
    
    gray = cv2.cvtColor(cv_image, cv2.COLOR_RGB2GRAY)
    _, binary = cv2.threshold(gray, 180, 255, cv2.THRESH_BINARY_INV)

    # Table detection
    hor_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (int(width/30), 1))
    vert_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, int(height/30)))
    
    horizontal_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, hor_kernel, iterations=2)
    vertical_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, vert_kernel, iterations=2)
    table_structure = cv2.add(horizontal_lines, vertical_lines)
    
    # Dilate to connect nearby lines
    kernel = np.ones((3, 3), np.uint8)
    table_structure = cv2.dilate(table_structure, kernel, iterations=1)
    
    # Find table contours
    contours, _ = cv2.findContours(table_structure, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    table_contours = []
    
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        area = w * h
        if w > 150 and h > 100 and area > 15000:  # Filter by minimum size
            aspect_ratio = w / h
            if 0.5 < aspect_ratio < 4.0:  # Tables can be wide
                table_contours.append(contour)
    
    # Merge overlapping table contours
    merged_table_boxes = merge_overlapping_contours(table_contours)
    
    for (x, y, w, h) in merged_table_boxes:
        # Ensure the box is within image bounds
        x = max(0, x)
        y = max(0, y)
        w = min(width - x, w)
        h = min(height - y, h)
        
        if w > 0 and h > 0:
            crop = image.crop((x, y, x + w, y + h))
            img_byte_arr = io.BytesIO()
            crop.save(img_byte_arr, format='PNG')
            tables.append({
                'page': page_num + 1,
                'name': f'table_{page_num}_{len(tables)}',
                'image': img_byte_arr.getvalue(),
                'width': w,
                'height': h
            })
            logger.info(f"Detected table on page {page_num + 1}: {w}x{h}")

    # Figure detection with improved parameters
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    
    # Dilate edges to connect nearby components
    dilated_edges = cv2.dilate(edges, kernel, iterations=1)
    
    # Find figure contours
    contours, _ = cv2.findContours(dilated_edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    figure_contours = []
    
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        area = w * h
        if w > 100 and h > 100 and area > 10000:  # Filter by minimum size
            aspect_ratio = w / h
            if 0.5 < aspect_ratio < 2.5:  # Reasonable aspect ratio for figures
                roi = gray[y:y+h, x:x+w]
                if roi.size > 0:  # Ensure ROI is not empty
                    # Calculate edge density safely
                    try:
                        roi_edges = cv2.Canny(roi, 50, 150)
                        edge_density = cv2.countNonZero(roi_edges) / area
                        if edge_density > 0.01:  # Has sufficient edge features
                            figure_contours.append(contour)
                    except Exception as e:
                        logger.warning(f"Error calculating edge density: {e}")
                        # Still include the contour if we can't calculate edge density
                        figure_contours.append(contour)
    
    # Merge overlapping figure contours
    merged_figure_boxes = merge_overlapping_contours(figure_contours)
    
    for (x, y, w, h) in merged_figure_boxes:
        # Ensure the box is within image bounds
        x = max(0, x)
        y = max(0, y)
        w = min(width - x, w)
        h = min(height - y, h)
        
        if w > 0 and h > 0:
            roi = gray[y:y+h, x:x+w]
            if roi.size > 0:
                # Calculate edge density safely for logging
                try:
                    roi_edges = cv2.Canny(roi, 50, 150)
                    edge_density = cv2.countNonZero(roi_edges) / (w * h)
                except Exception:
                    edge_density = 0.0
                
                crop = image.crop((x, y, x + w, y + h))
                img_byte_arr = io.BytesIO()
                crop.save(img_byte_arr, format='PNG')
                figures.append({
                    'page': page_num + 1,
                    'name': f'figure_{page_num}_{len(figures)}',
                    'image': img_byte_arr.getvalue(),
                    'width': w,
                    'height': h,
                    'edge_density': float(edge_density)  # Convert to float for JSON serialization
                })
                logger.info(f"Detected figure on page {page_num + 1}: {w}x{h}, edge_density: {edge_density:.4f}")

    # Filter out figures that significantly overlap with tables
    non_overlapping_figures = []
    for figure in figures:
        figure_box = (0, 0, figure['width'], figure['height'])  # Simplified for comparison
        overlaps_with_table = False
        
        for table in tables:
            table_box = (0, 0, table['width'], table['height'])  # Simplified for comparison
            if calculate_overlap(figure_box, table_box) > 0.7:  # If overlap is significant
                overlaps_with_table = True
                break
        
        if not overlaps_with_table:
            non_overlapping_figures.append(figure)
    
    logger.debug(f"Page {page_num + 1}: Extracted {len(tables)} tables, {len(non_overlapping_figures)} figures")
    print(f"Page {page_num + 1}: Extracted {len(tables)} tables, {len(non_overlapping_figures)} figures")
    return tables, non_overlapping_figures





def calculate_overlap(box1, box2):
    """Calculate overlap ratio between two boxes."""
    x1, y1, w1, h1 = box1
    x2, y2, w2, h2 = box2
    
    # Calculate intersection area
    x_overlap = max(0, min(x1 + w1, x2 + w2) - max(x1, x2))
    y_overlap = max(0, min(y1 + h1, y2 + h2) - max(y1, y2))
    intersection = x_overlap * y_overlap
    
    # Calculate union area
    area1 = w1 * h1
    area2 = w2 * h2
    union = area1 + area2 - intersection
    
    # Return overlap ratio
    return intersection / union if union > 0 else 0

def process_pdf(file_bytes):
    """Process PDF to extract tables, images, and figures."""
    results = {
        "images": [],
        "tables": [],
        "figures": []
    }
    try:
        logger.info("Extracting embedded images with PyPDF2")
        embedded_images = extract_images_from_pdf(file_bytes)
        for img in embedded_images:
            encoded_img = base64.b64encode(img["image"]).decode('utf-8')
            results["images"].append({
                "page": img["page"],
                "name": img["name"],
                "image": encoded_img,
                "width": img["width"],
                "height": img["height"]
            })

        logger.info("Rendering pages with pdf2image")
        pages = convert_from_bytes(file_bytes, dpi=300)
        logger.info(f"Rendered {len(pages)} pages")
        print(f"Rendered {len(pages)} pages")

        for page_num, page_img in enumerate(pages):
            try:
                tables, figures = detect_tables_and_figures(page_img, page_num)
                
                for table in tables:
                    encoded_img = base64.b64encode(table["image"]).decode('utf-8')
                    results["tables"].append({
                        "page": table["page"],
                        "name": table["name"],
                        "image": encoded_img,
                        "width": table["width"],
                        "height": table["height"]
                    })
                
                for figure in figures:
                    # Remove edge_density from the figure object before encoding
                    if "edge_density" in figure:
                        del figure["edge_density"]
                    
                    encoded_img = base64.b64encode(figure["image"]).decode('utf-8')
                    results["figures"].append({
                        "page": figure["page"],
                        "name": figure["name"],
                        "image": encoded_img,
                        "width": figure["width"],
                        "height": figure["height"]
                    })
            except Exception as e:
                logger.error(f"Error processing page {page_num + 1}: {e}")
                continue  # Skip this page but continue processing others

        total_tables = len(results["tables"])
        total_images = len(results["images"])
        total_figures = len(results["figures"])
        logger.info(f"Extraction summary: {total_tables} tables, {total_images} images, {total_figures} figures")
        print(f"Extraction summary: {total_tables} tables, {total_images} images, {total_figures} figures")
        if not any([total_tables, total_images, total_figures]):
            results["warning"] = "No content found in the PDF"
            logger.warning("No content extracted from PDF")
    except Exception as e:
        logger.error(f"Error processing PDF: {e}")
        print(f"Error processing PDF: {e}")
        return {"error": f"Failed to process PDF: {str(e)}"}
    return results

@image_extractor_bp.route('/extract-images', methods=['POST'])
def extract_images():
    """Endpoint to extract all visual content."""
    try:
        if 'file' not in request.files:
            logger.error("No file provided")
            return jsonify({"error": "No file provided"}), 400

        file = request.files['file']
        if not file.filename.lower().endswith('.pdf'):
            logger.error(f"Invalid file type: {file.filename}")
            return jsonify({"error": "Please upload a PDF file"}), 400

        file_bytes = file.read()
        if not file_bytes:
            logger.error("Empty file uploaded")
            return jsonify({"error": "Empty file uploaded"}), 400

        logger.info(f"Processing PDF: {file.filename}")
        results = process_pdf(file_bytes)
        
        if "error" in results:
            logger.error(f"Error in results: {results['error']}")
            return jsonify(results), 500
        
        logger.info(f"API response: Extracted {len(results['tables'])} tables, {len(results['images'])} images, {len(results['figures'])} figures")
        return jsonify(results), 200
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500









# shraddhas's code as it is 
# from flask import Flask, request, jsonify
# from PyPDF2 import PdfReader
# from PIL import Image
# from pdf2image import convert_from_bytes
# import numpy as np
# import io
# import cv2
# import tensorflow as tf
# from flask_cors import CORS  # Add this import for handling CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Build the model in-memory (not saved)
# def build_model():
#     model = tf.keras.Sequential([
#         tf.keras.layers.Input(shape=(None, None, 1)),
#         tf.keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
#         tf.keras.layers.MaxPooling2D((2, 2)),
#         tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
#         tf.keras.layers.MaxPooling2D((2, 2)),
#         tf.keras.layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
#         tf.keras.layers.GlobalAveragePooling2D(),
#         tf.keras.layers.Dense(3, activation='softmax')
#     ])
#     return model

# model = build_model()

# def extract_images_from_pdf(file_bytes):
#     images = []
#     try:
#         pdf = PdfReader(io.BytesIO(file_bytes))
#         for page_num, page in enumerate(pdf.pages):
#             try:
#                 # Try to extract images using the /XObject resource dictionary
#                 if '/Resources' in page and '/XObject' in page['/Resources']:
#                     x_objects = page['/Resources']['/XObject'].get_object()
#                     for obj in x_objects:
#                         try:
#                             if x_objects[obj]['/Subtype'] == '/Image':
#                                 try:
#                                     data = x_objects[obj].get_object().get_data()
#                                     if data:
#                                         img = Image.open(io.BytesIO(data))
#                                         img_byte_arr = io.BytesIO()
#                                         img.save(img_byte_arr, format='PNG')
#                                         images.append({
#                                             'page': page_num + 1,
#                                             'name': f'image_{page_num}_{len(images)}',
#                                             'image': img_byte_arr.getvalue()
#                                         })
#                                 except Exception as e:
#                                     print(f"Error processing image data: {e}")
#                                     continue
#                         except Exception as e:
#                             print(f"Error checking image subtype: {e}")
#                             continue

#                 # Fallback to the older images property if available
#                 if hasattr(page, 'images'):
#                     for image in page.images:
#                         try:
#                             img = Image.open(io.BytesIO(image.data))
#                             img_byte_arr = io.BytesIO()
#                             img.save(img_byte_arr, format='PNG')
#                             images.append({
#                                 'page': page_num + 1,
#                                 'name': image.name,
#                                 'image': img_byte_arr.getvalue()
#                             })
#                         except Exception as e:
#                             print(f"Error reading image through images property: {e}")
#                             continue
#             except Exception as e:
#                 print(f"Error processing page {page_num + 1}: {e}")
#                 continue
#     except Exception as e:
#         print(f"Error reading PDF: {e}")
        
#     return images
#     return images

# def detect_tables_with_lines(image):
#     gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
#     _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

#     hor_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 1))
#     vert_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 40))
#     horizontal_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, hor_kernel, iterations=2)
#     vertical_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, vert_kernel, iterations=2)

#     table_structure = cv2.add(horizontal_lines, vertical_lines)
#     contours, _ = cv2.findContours(table_structure, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#     table_images = []
#     for contour in contours:
#         x, y, w, h = cv2.boundingRect(contour)
#         if w > 200 and h > 80:
#             table_crop = image.crop((x, y, x + w, y + h))
#             img_byte_arr = io.BytesIO()
#             table_crop.save(img_byte_arr, format='PNG')
#             table_images.append(img_byte_arr.getvalue())
#     return table_images

# @app.route('/upload', methods=['POST'])
# def upload_pdf():
#     try:
#         if 'file' not in request.files:
#             return jsonify({'error': 'No file provided'}), 400

#         file = request.files['file']
#         if not file.filename.lower().endswith('.pdf'):
#             return jsonify({'error': 'Please upload a PDF file'}), 400

#         file_bytes = file.read()
#         if not file_bytes:
#             return jsonify({'error': 'Empty file uploaded'}), 400

#         try:
#             # Extract page image using pdf2image
#             pages = convert_from_bytes(file_bytes)
#             all_tables = []
#             for img in pages:
#                 try:
#                     tables = detect_tables_with_lines(img)
#                     all_tables.extend(tables)
#                 except Exception as e:
#                     print(f"Error detecting tables: {e}")

#             # Extract embedded images
#             embedded_images = extract_images_from_pdf(file_bytes)

#             if not all_tables and not embedded_images:
#                 return jsonify({
#                     'warning': 'No tables or images found in the PDF',
#                     'tables': [],
#                     'images': []
#                 })

#             return jsonify({
#                 'tables': [table.decode('latin1') for table in all_tables],
#                 'images': [
#                     {'page': img['page'], 'name': img['name'], 'image': img['image'].decode('latin1')}
#                     for img in embedded_images
#                 ]
#             })

#         except Exception as e:
#             print(f"Error processing PDF: {e}")
#             return jsonify({'error': 'Failed to process the PDF file. The file might be corrupted or in an unsupported format.'}), 500

#     except Exception as e:
#         print(f"Unexpected error: {e}")
#         return jsonify({'error': 'An unexpected error occurred'}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
