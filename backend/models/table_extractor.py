


# workes for few but incroeeclty
# import os
# import io
# import pandas as pd
# import matplotlib.pyplot as plt
# import uuid
# from flask import Blueprint, request, jsonify
# from tabula import read_pdf
# import base64

# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF using tabula, mimicking friend's upload_pdf logic.
#     """
#     tables = []
#     debug_info = []
#     try:
#         # Extract all tables from the PDF, matching friend's approach
#         extracted_tables = read_pdf(pdf_path, pages="all", multiple_tables=True, pandas_options={"header": None})
#         if not extracted_tables:
#             debug_info.append("No tables found in PDF.")
#         else:
#             for table_idx, df in enumerate(extracted_tables):
#                 if not df.empty and len(df) > 1:
#                     # Use the first row as headers, as per friend's preview_tables
#                     headers = df.iloc[0].astype(str).values
#                     df = df[1:].reset_index(drop=True)
#                     df.columns = headers
#                     df = df.replace("", pd.NA).dropna(how="all")
#                     # Convert to string list for UI, matching friend's format
#                     table_data = df.fillna("").astype(str).values.tolist()
#                     tables.append({
#                         "page": 1,  # tabula doesn't provide page info, so use 1
#                         "table": df,
#                         "index": table_idx,
#                         "table_data": table_data
#                     })
#                     debug_info.append(f"Detected table at index {table_idx}.")
#                 else:
#                     debug_info.append(f"Empty or invalid table detected at index {table_idx}.")
#     except Exception as e:
#         debug_info.append(f"Error extracting tables from PDF: {str(e)}")
#     return tables, debug_info

# def generate_graph_from_table(table_data, file_id, table_index, chart_type="bar"):
#     """
#     Generates a chart (bar or pie) from the table data and returns as BytesIO, mimicking friend's generate_graph.
#     """
#     if not table_data or len(table_data) < 2:  # Ensure header + at least one row
#         return None

#     df = pd.DataFrame(table_data[1:], columns=table_data[0])
#     img_io = io.BytesIO()
    
#     try:
#         if chart_type == "pie":
#             value_counts = df.iloc[:, 0].value_counts()
#             value_counts.plot.pie(autopct='%1.1f%%', figsize=(6, 6))
#             plt.ylabel('')
#         else:
#             for col in df.columns[1:]:
#                 df[col] = pd.to_numeric(df[col], errors="coerce")
#             df.fillna(0, inplace=True)
#             df.set_index(df.columns[0], inplace=True)
#             df.plot(kind=chart_type, figsize=(10, 6))
#             plt.xlabel(df.index.name or "X-Axis")
#             plt.ylabel("Values")

#         plt.title(f"{chart_type.capitalize()} Chart")
#         plt.tight_layout()
#         plt.savefig(img_io, format="png", bbox_inches="tight")
#         plt.close()
#         img_io.seek(0)
#         return img_io
#     except Exception as e:
#         print(f"Error generating graph for table index {table_index}: {e}")
#         return None

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     API endpoint to extract tables from an uploaded PDF, generate graphs, and return table data.
#     Uses friend's logic with inline graph generation.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
    
#     if not file or not file.filename.lower().endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     # Save the uploaded file temporarily, as friend's code does implicitly
#     temp_pdf_path = "temp_uploaded.pdf"
#     file.save(temp_pdf_path)

#     # Extract tables and debug info
#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "No tables found", "debug_info": debug_info}), 200

#     # Generate graphs with unique file_id, matching friend's approach
#     file_id = str(uuid.uuid4())
#     chart_type = request.form.get("chartType", "bar")  # Default to bar, allow override
#     graph_urls = []
#     for table_data in tables:
#         table_idx = table_data["index"]
#         table_content = table_data["table_data"]  # Use raw table_data as friend does
#         graph_img = generate_graph_from_table(table_content, file_id, table_idx, chart_type)
#         if graph_img:
#             graph_urls.append({
#                 "url": f"data:image/png;base64,{base64.b64encode(graph_img.read()).decode('utf-8')}",
#                 "page": table_data["page"],
#                 "table_index": table_idx
#             })
#             graph_img.seek(0)  # Reset pointer

#     os.remove(temp_pdf_path)

#     response_data = {
#         "tables": [{"table_data": table["table_data"], "page": table["page"], "index": table["index"]} for table in tables],
#         "graphs": graph_urls,
#         "debug_info": debug_info
#     }
#     if not graph_urls:
#         response_data["message"] = "No valid data available for visualization"

#     return jsonify(response_data), 200







































# working code 18th apr 2025
# # shraddha's code in my blueprint
# import os
# import io
# import pandas as pd
# import matplotlib.pyplot as plt
# import uuid
# from flask import Blueprint, request, jsonify
# from tabula import read_pdf
# import base64

# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF using tabula.
#     """
#     tables = []
#     debug_info = []
#     try:
#         extracted_tables = read_pdf(pdf_path, pages="all", multiple_tables=True, pandas_options={"header": None})
#         if not extracted_tables:
#             debug_info.append("No tables found in PDF.")
#             return [], debug_info
        
#         for table_idx, df in enumerate(extracted_tables):
#             if not df.empty:
#                 table_data = df.fillna("").astype(str).values.tolist()
#                 tables.append({
#                     "page": 1,
#                     "table_data": table_data,
#                     "index": table_idx
#                 })
#                 # Preview first few rows for debugging
#                 preview = table_data[:min(3, len(table_data))]
#                 debug_info.append(
#                     f"Detected table at index {table_idx} with {len(table_data)} rows and "
#                     f"{len(table_data[0]) if table_data else 0} columns. Preview: {preview}"
#                 )
#             else:
#                 debug_info.append(f"Empty table at index {table_idx}.")
#     except Exception as e:
#         debug_info.append(f"Error extracting tables: {str(e)}")
#     return tables, debug_info

# def generate_graph_from_table(table_data, file_id, table_index, chart_type):
#     """
#     Generates a chart (bar or pie) from table data.
#     Returns base64-encoded image and debug message.
#     """
#     if not table_data or len(table_data) < 2:
#         return None, f"No data or insufficient rows for table index {table_index}"

#     try:
#         df = pd.DataFrame(table_data[1:], columns=table_data[0])
#         img_io = io.BytesIO()
        
#         if chart_type == "pie":
#             if df.iloc[:, 0].isna().all() or df.iloc[:, 0].astype(str).str.strip().eq("").all():
#                 return None, f"First column empty or invalid for pie chart at index {table_index}"
#             value_counts = df.iloc[:, 0].value_counts()
#             if value_counts.empty or len(value_counts) < 1:
#                 return None, f"No valid data for pie chart at index {table_index}"
#             debug_msg = f"Pie chart data for table {table_index}: {value_counts.to_dict()}"
#             value_counts.plot.pie(autopct='%1.1f%%', figsize=(6, 6))
#             plt.ylabel('')
#         elif chart_type == "bar":
#             if len(df.columns) < 2:
#                 return None, f"Insufficient columns for bar chart at index {table_index}"
#             for col in df.columns[1:]:
#                 df[col] = pd.to_numeric(df[col], errors="coerce")
#             if df.iloc[:, 1:].isna().all().all():
#                 return None, f"No valid numeric data for bar chart at index {table_index}"
#             df.fillna(0, inplace=True)
#             df.set_index(df.columns[0], inplace=True)
#             debug_msg = f"Bar chart data for table {table_index}: {df.to_dict()}"
#             df.plot(kind="bar", figsize=(10, 6))
#             plt.xlabel(df.index.name or "X-Axis")
#             plt.ylabel("Values")
#         else:
#             return None, f"Unsupported chart type {chart_type} for table index {table_index}"

#         plt.title(f"{chart_type.capitalize()} Chart (Table {table_index})")
#         plt.tight_layout()
#         plt.savefig(img_io, format="png")
#         plt.close()
#         img_io.seek(0)
#         return img_io, debug_msg
#     except Exception as e:
#         plt.close()
#         return None, f"Error generating {chart_type} chart for table index {table_index}: {str(e)}"

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     Extracts tables from PDF and generates both pie and bar charts if possible.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
#     if not file or not file.filename.lower().endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     file_id = str(uuid.uuid4())
#     temp_pdf_path = f"temp_{file_id}.pdf"
#     file.save(temp_pdf_path)

#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "No tables found", "tables": [], "graphs": [], "debug_info": debug_info}), 200

#     graph_urls = []
#     errors = []
    
#     for table in tables:
#         table_idx = table["index"]
#         table_content = table["table_data"]
        
#         # Try generating pie chart
#         pie_img, pie_msg = generate_graph_from_table(table_content, file_id, table_idx, "pie")
#         # Try generating bar chart
#         bar_img, bar_msg = generate_graph_from_table(table_content, file_id, table_idx, "bar")
        
#         graph_entry = {"table_index": table_idx, "page": table["page"]}
        
#         if pie_img:
#             graph_entry["pie_url"] = f"data:image/png;base64,{base64.b64encode(pie_img.read()).decode('utf-8')}"
#             debug_info.append(pie_msg)
#         if bar_img:
#             graph_entry["bar_url"] = f"data:image/png;base64,{base64.b64encode(bar_img.read()).decode('utf-8')}"
#             debug_info.append(bar_msg)
        
#         if pie_img or bar_img:
#             graph_urls.append(graph_entry)
        
#         if isinstance(pie_msg, str) and pie_msg.startswith("Error"):
#             errors.append(pie_msg)
#         if isinstance(bar_msg, str) and bar_msg.startswith("Error"):
#             errors.append(bar_msg)

#     if os.path.exists(temp_pdf_path):
#         os.remove(temp_pdf_path)

#     response_data = {
#         "tables": [{"table_data": table["table_data"], "page": table["page"], "index": table["index"]} for table in tables],
#         "graphs": graph_urls,
#         "debug_info": debug_info + errors
#     }
    
#     if not graph_urls:
#         response_data["message"] = "No valid data available for visualization"

#     return jsonify(response_data), 200





















# import os
# import io
# import pandas as pd
# import matplotlib.pyplot as plt
# import uuid
# from flask import Blueprint, request, jsonify
# from tabula import read_pdf
# import base64
# from pdf2image import convert_from_path
# from PIL import Image
# import numpy as np

# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF as data (tabula) and images (pdf2image).
#     """
#     tables = []
#     debug_info = []
#     try:
#         # Extract table data with tabula
#         extracted_tables = read_pdf(
#             pdf_path,
#             pages="all",
#             multiple_tables=True,
#             pandas_options={"header": None}
#         )
#         if not extracted_tables:
#             debug_info.append("No tables found in PDF.")
#             return [], debug_info

#         # Extract page images with pdf2image
#         page_images = convert_from_path(pdf_path, dpi=300)

#         for table_idx, df in enumerate(extracted_tables):
#             if not df.empty:
#                 table_data = df.fillna("").astype(str).values.tolist()
#                 table_entry = {
#                     "page": 1,  # Simplified; adjust with pdfplumber if needed
#                     "table_data": table_data,
#                     "index": table_idx,
#                 }
#                 # Assign table image (use page image for now)
#                 if table_idx < len(page_images):
#                     img = page_images[table_idx]
#                     img_io = io.BytesIO()
#                     img.save(img_io, format="PNG")
#                     img_io.seek(0)
#                     table_entry["image_url"] = (
#                         f"data:image/png;base64,{base64.b64encode(img_io.read()).decode('utf-8')}"
#                     )
#                 else:
#                     table_entry["image_url"] = None
#                     debug_info.append(f"No image for table index {table_idx}")

#                 tables.append(table_entry)
#                 preview = table_data[:min(3, len(table_data))]
#                 debug_info.append(
#                     f"Detected table at index {table_idx} with {len(table_data)} rows and "
#                     f"{len(table_data[0]) if table_data else 0} columns. Preview: {preview}"
#                 )
#             else:
#                 debug_info.append(f"Empty table at index {table_idx}.")
#     except Exception as e:
#         debug_info.append(f"Error extracting tables: {str(e)}")
#     return tables, debug_info

# def generate_chart_from_table(table_data, chart_type, table_index):
#     """
#     Generates a pie or bar chart from table data.
#     Returns base64-encoded image and debug message.
#     """
#     if not table_data or len(table_data) < 2:
#         return None, f"No data or insufficient rows for table index {table_index}"

#     try:
#         df = pd.DataFrame(table_data[1:], columns=table_data[0])
#         img_io = io.BytesIO()

#         if chart_type == "pie":
#             labels = df.iloc[:, 0].astype(str)
#             values = pd.to_numeric(df.iloc[:, 1], errors="coerce")
#             if values.isna().all() or len(values) < 1:
#                 return None, f"No valid data for pie chart at index {table_index}"
#             debug_msg = f"Pie chart data for table {table_index}: {values.to_dict()}"
#             plt.figure(figsize=(6, 6))
#             plt.pie(values, labels=labels, autopct="%1.1f%%")
#             plt.title(f"Pie Chart (Table {table_index})")
#             plt.ylabel("")
#         elif chart_type == "bar":
#             df.set_index(df.columns[0], inplace=True)
#             for col in df.columns:
#                 df[col] = pd.to_numeric(df[col], errors="coerce")
#             df.fillna(0, inplace=True)
#             if df.empty or df.isna().all().all():
#                 return None, f"No valid numeric data for bar chart at index {table_index}"
#             debug_msg = f"Bar chart data for table {table_index}: {df.to_dict()}"
#             plt.figure(figsize=(10, 6))
#             df.plot(kind="bar")
#             plt.xlabel(df.index.name or "X-Axis")
#             plt.ylabel("Values")
#             plt.title(f"Bar Chart (Table {table_index})")
#         else:
#             return None, f"Invalid chart type for table index {table_index}"

#         plt.tight_layout()
#         plt.savefig(img_io, format="png")
#         plt.close()
#         img_io.seek(0)
#         return img_io, debug_msg
#     except Exception as e:
#         plt.close()
#         return None, f"Error generating {chart_type} chart for table index {table_index}: {str(e)}"

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     Extracts tables from PDF as data and images.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
#     if not file or not file.filename.lower().endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     file_id = str(uuid.uuid4())
#     temp_pdf_path = f"temp_{file_id}.pdf"
#     file.save(temp_pdf_path)

#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)

#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify(
#             {
#                 "message": "No tables found",
#                 "tables": [],
#                 "debug_info": debug_info,
#             }
#         ), 200

#     if os.path.exists(temp_pdf_path):
#         os.remove(temp_pdf_path)

#     response_data = {
#         "tables": [
#             {
#                 "table_data": table["table_data"],
#                 "page": table["page"],
#                 "index": table["index"],
#                 "image_url": table.get("image_url"),
#             }
#             for table in tables
#         ],
#         "debug_info": debug_info,
#     }

#     return jsonify(response_data), 200

# @table_extractor_bp.route("/generate-chart", methods=["POST"])
# def generate_chart():
#     """
#     Generates a pie or bar chart for a specific table.
#     Expects: pdf file, table_index, chart_type (pie or bar).
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No PDF file provided"}), 400
#     if not request.form.get("table_index"):
#         return jsonify({"error": "No table_index provided"}), 400
#     if not request.form.get("chart_type"):
#         return jsonify({"error": "No chart_type provided"}), 400

#     file = request.files["pdf"]
#     table_index = request.form.get("table_index")
#     chart_type = request.form.get("chart_type").lower()

#     if not file or not file.filename.lower().endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400
#     if chart_type not in ["pie", "bar"]:
#         return jsonify({"error": "Invalid chart_type. Use 'pie' or 'bar'."}), 400

#     try:
#         table_index = int(table_index)
#     except ValueError:
#         return jsonify({"error": "table_index must be an integer"}), 400

#     file_id = str(uuid.uuid4())
#     temp_pdf_path = f"temp_{file_id}.pdf"
#     file.save(temp_pdf_path)

#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)

#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify(
#             {
#                 "error": "No tables found in PDF",
#                 "debug_info": debug_info,
#             }
#         ), 400

#     target_table = next(
#         (t for t in tables if t["index"] == table_index), None
#     )
#     if not target_table:
#         os.remove(temp_pdf_path)
#         return jsonify(
#             {
#                 "error": f"Table index {table_index} not found",
#                 "debug_info": debug_info,
#             }
#         ), 400

#     img, msg = generate_chart_from_table(
#         target_table["table_data"], chart_type, table_index
#     )

#     if os.path.exists(temp_pdf_path):
#         os.remove(temp_pdf_path)

#     if not img:
#         return jsonify(
#             {
#                 "error": msg,
#                 "debug_info": debug_info + [msg],
#             }
#         ), 400

#     return jsonify(
#         {
#             "url": f"data:image/png;base64,{base64.b64encode(img.read()).decode('utf-8')}",
#             "debug_info": debug_info + [msg],
#         }
#     ), 200











































import os
import io
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Non-GUI backend to avoid Tkinter issues
import matplotlib.pyplot as plt
import uuid
from flask import Blueprint, request, jsonify
from pdf2image import convert_from_path
from PIL import Image
import camelot
import pytesseract
import cv2
import numpy as np
import base64
import chardet
import logging
import gc

# Configure logging
logging.basicConfig(filename='table_extraction.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

table_extractor_bp = Blueprint("table_extractor", __name__)

def preprocess_image_for_ocr(image):
    """Preprocess image for better OCR results."""
    try:
        img = np.array(image)
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return Image.fromarray(thresh)
    except Exception as e:
        logging.error(f"Error preprocessing image for OCR: {str(e)}")
        return image

def extract_tables_from_pdf(pdf_path):
    """
    Extracts tables from a PDF using Camelot, with OCR fallback for scanned PDFs.
    """
    tables = []
    debug_info = []
    try:
        # Detect PDF encoding for debugging
        with open(pdf_path, 'rb') as f:
            raw_data = f.read()
            encoding_info = chardet.detect(raw_data)
            debug_info.append(f"Detected encoding: {encoding_info}")
            logging.info(f"Detected encoding: {encoding_info}")

        # Convert PDF pages to images (limit to first 10 pages to avoid memory issues)
        pdf_images = convert_from_path(pdf_path, dpi=150, first_page=1, last_page=10)
        debug_info.append(f"Converted {len(pdf_images)} pages to images")

        # Try Camelot table extraction (lattice mode)
        try:
            camelot_tables = camelot.read_pdf(
                pdf_path,
                pages="1-10",  # Limit pages
                flavor="lattice",
                suppress_stdout=True
            )
            debug_info.append(f"Found {len(camelot_tables)} tables in lattice mode")
        except Exception as e:
            debug_info.append(f"Lattice mode failed: {str(e)}. Trying stream mode.")
            logging.warning(f"Lattice mode failed: {str(e)}")
            camelot_tables = None

        # If lattice mode failed or found no tables, try stream mode
        if not camelot_tables or len(camelot_tables) == 0:
            debug_info.append("No tables found with lattice mode. Trying stream mode.")
            try:
                camelot_tables = camelot.read_pdf(
                    pdf_path,
                    pages="1-10",
                    flavor="stream",
                    encoding='latin1'
                )
                debug_info.append(f"Found {len(camelot_tables)} tables in stream mode")
            except Exception as e:
                debug_info.append(f"Stream mode failed: {str(e)}. Proceeding to OCR fallback.")
                logging.warning(f"Stream mode failed: {str(e)}")
                camelot_tables = None

        if camelot_tables and len(camelot_tables) > 0:
            for table_idx, table in enumerate(camelot_tables):
                df = table.df
                if not df.empty:
                    table_data = df.fillna("").astype(str).values.tolist()
                    # Improved header merging logic
                    if len(table_data) > 0:
                        first_row = table_data[0]
                        is_header_row = False
                        if len(first_row) > 1:
                            try:
                                first_cell = first_row[0].strip()
                                rest_cells = [x.strip() for x in first_row[1:]]
                                if (any(c.isalpha() for c in first_cell) and
                                    all(c.replace('.', '').replace('-', '').isdigit() or c == "" for c in rest_cells)):
                                    is_header_row = True
                            except AttributeError:
                                pass
                        if is_header_row:
                            header_row = [" ".join(first_row)]
                            table_data = [header_row] + table_data[1:]
                        else:
                            max_cols = max(len(row) for row in table_data)
                            table_data = [row + [""] * (max_cols - len(row)) for row in table_data]

                    table_area = table._bbox
                    page_num = table.page - 1
                    table_image_base64 = None
                    if table_area and 0 <= page_num < len(pdf_images):
                        try:
                            page_image = pdf_images[page_num]
                            left, top, right, bottom = table_area
                            img_width, img_height = page_image.size
                            left = max(0, int(left))
                            top = max(0, int(top))
                            right = min(img_width, int(right))
                            bottom = min(img_height, int(bottom))
                            if right > left and bottom > top:
                                table_image = page_image.crop((left, top, right, bottom))
                                img_io = io.BytesIO()
                                table_image.save(img_io, format="PNG")
                                img_io.seek(0)
                                table_image_base64 = f"data:image/png;base64,{base64.b64encode(img_io.read()).decode('utf-8')}"
                                debug_info.append(f"Generated image for table {table_idx} on page {page_num + 1}")
                            else:
                                debug_info.append(f"Invalid crop area for table {table_idx}: {table_area}")
                        except Exception as e:
                            debug_info.append(f"Error extracting table image for index {table_idx}: {str(e)}")
                            logging.error(f"Error extracting table image: {str(e)}")
                    else:
                        debug_info.append(f"No valid table area or page for table {table_idx}")

                    tables.append({
                        "page": page_num + 1,
                        "table_data": table_data,
                        "index": table_idx,
                        "image_url": table_image_base64
                    })
                    preview = table_data[:min(3, len(table_data))]
                    debug_info.append(
                        f"Detected table at index {table_idx} with {len(table_data)} rows and "
                        f"{len(table_data[0]) if table_data else 0} columns. Preview: {preview}"
                    )
                    logging.info(f"Detected table {table_idx} on page {page_num + 1}")
                else:
                    debug_info.append(f"Empty table at index {table_idx}.")
        else:
            debug_info.append("No tables found with Camelot. Attempting OCR fallback.")
            logging.info("No tables found with Camelot. Attempting OCR.")
            # OCR fallback for scanned PDFs
            for page_idx, page_image in enumerate(pdf_images):
                try:
                    preprocessed_image = preprocess_image_for_ocr(page_image)
                    ocr_data = pytesseract.image_to_data(preprocessed_image, output_type=pytesseract.Output.DICT)
                    table_detected = False
                    table_data = []
                    for i, text in enumerate(ocr_data['text']):
                        if text.strip() and ocr_data['conf'][i] > 50:
                            top = ocr_data['top'][i]
                            row = [text]
                            for j, other_text in enumerate(ocr_data['text']):
                                if i != j and other_text.strip() and abs(ocr_data['top'][j] - top) < 10:
                                    row.append(other_text)
                            if len(row) > 1:
                                table_data.append(row)
                                table_detected = True
                    if table_detected:
                        debug_info.append(f"Table detected via OCR on page {page_idx + 1}")
                        logging.info(f"Table detected via OCR on page {page_idx + 1}")
                        img_io = io.BytesIO()
                        page_image.save(img_io, format="PNG")
                        img_io.seek(0)
                        table_image_base64 = f"data:image/png;base64,{base64.b64encode(img_io.read()).decode('utf-8')}"
                        tables.append({
                            "page": page_idx + 1,
                            "table_data": table_data or [["OCR-detected table placeholder"]],
                            "index": len(tables),
                            "image_url": table_image_base64
                        })
                    else:
                        debug_info.append(f"No table detected via OCR on page {page_idx + 1}")
                except Exception as e:
                    debug_info.append(f"OCR error on page {page_idx + 1}: {str(e)}")
                    logging.error(f"OCR error on page {page_idx + 1}: {str(e)}")
        # Clean up
        del pdf_images
        gc.collect()
    except Exception as e:
        debug_info.append(f"Error extracting tables: {str(e)}")
        logging.error(f"Error extracting tables: {str(e)}")
    return tables, debug_info

def generate_graph_from_table(table_data, file_id, table_index, chart_type):
    """
    Generates a pie or bar chart from table data.
    """
    if not table_data or len(table_data) < 2:
        return None, f"No data or insufficient rows for table index {table_index}"
    try:
        df = pd.DataFrame(table_data[1:], columns=table_data[0])
        df.columns = [str(col).strip() for col in df.columns]
        df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)

        img_io = io.BytesIO()
        if chart_type == "pie":
            if df.iloc[:, 0].isna().all() or df.iloc[:, 0].astype(str).str.strip().eq("").all():
                return None, f"First column empty or invalid for pie chart at index {table_index}"
            value_counts = df.iloc[:, 0].value_counts()
            if value_counts.empty or len(value_counts) < 1:
                return None, f"No valid data for pie chart at index {table_index}"
            debug_msg = f"Pie chart data for table {table_index}: {value_counts.to_dict()}"
            value_counts.plot.pie(autopct='%1.1f%%', figsize=(6, 6))
            plt.ylabel('')
        elif chart_type == "bar":
            if len(df.columns) < 2:
                return None, f"Insufficient columns for bar chart at index {table_index}"
            numeric_cols = []
            for col in df.columns[1:]:
                df[col] = pd.to_numeric(df[col], errors="coerce")
                if not df[col].isna().all():
                    numeric_cols.append(col)
            if not numeric_cols:
                return None, f"No valid numeric columns for bar chart at index {table_index}"
            df = df[[df.columns[0]] + numeric_cols]
            df.fillna(0, inplace=True)
            df.set_index(df.columns[0], inplace=True)
            debug_msg = f"Bar chart data for table {table_index}: {df.to_dict()}"
            df.plot(kind="bar", figsize=(10, 6))
            plt.xlabel(df.index.name or "X-Axis")
            plt.ylabel("Values")
        else:
            return None, f"Unsupported chart type {chart_type} for table index {table_index}"
        plt.title(f"{chart_type.capitalize()} Chart (Table {table_index})")
        plt.tight_layout()
        plt.savefig(img_io, format="png")
        plt.close()
        img_io.seek(0)
        return img_io, debug_msg
    except Exception as e:
        plt.close()
        return None, f"Error generating {chart_type} chart for table index {table_index}: {str(e)}"
    finally:
        gc.collect()

@table_extractor_bp.route("/table-extract", methods=["POST"])
def extract_table_and_visualize():
    """
    Extracts tables from PDF and generates pie and bar charts if possible.
    """
    logging.info("Received request for /table-extract")
    if "pdf" not in request.files:
        logging.error("No file provided")
        return jsonify({"error": "No file provided"}), 400

    file = request.files["pdf"]
    if not file or not file.filename.lower().endswith(".pdf"):
        logging.error("Invalid file format")
        return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

    file_id = str(uuid.uuid4())
    temp_pdf_path = f"temp_{file_id}.pdf"
    try:
        file.save(temp_pdf_path)
        logging.info(f"Saved PDF to {temp_pdf_path}")

        tables, debug_info = extract_tables_from_pdf(temp_pdf_path)
        
        if not tables:
            debug_info.append("No tables found in PDF")
            logging.info("No tables found")
            return jsonify({"message": "No tables found", "tables": [], "graphs": [], "debug_info": debug_info}), 200

        graph_urls = []
        errors = []
        
        for table in tables:
            table_idx = table["index"]
            table_content = table["table_data"]
            
            pie_img, pie_msg = generate_graph_from_table(table_content, file_id, table_idx, "pie")
            bar_img, bar_msg = generate_graph_from_table(table_content, file_id, table_idx, "bar")
            
            graph_entry = {"table_index": table_idx, "page": table["page"]}
            
            if pie_img:
                graph_entry["pie_url"] = f"data:image/png;base64,{base64.b64encode(pie_img.read()).decode('utf-8')}"
                debug_info.append(pie_msg)
                logging.info(pie_msg)
            else:
                graph_entry["pie_error"] = pie_msg
                errors.append(pie_msg)
            
            if bar_img:
                graph_entry["bar_url"] = f"data:image/png;base64,{base64.b64encode(bar_img.read()).decode('utf-8')}"
                debug_info.append(bar_msg)
                logging.info(bar_msg)
            else:
                graph_entry["bar_error"] = bar_msg
                errors.append(bar_msg)
            
            if pie_img or bar_img:
                graph_urls.append(graph_entry)
        
        response_data = {
            "tables": [
                {
                    "table_data": table["table_data"],
                    "page": table["page"],
                    "index": table["index"],
                    "image_url": table["image_url"]
                } for table in tables
            ],
            "graphs": graph_urls,
            "debug_info": debug_info + errors
        }
        
        if not graph_urls:
            response_data["message"] = "No valid data available for visualization"
            logging.info("No valid data for visualization")
        
        return jsonify(response_data), 200
    except Exception as e:
        logging.error(f"Error in table-extract: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}", "debug_info": debug_info}), 500
    finally:
        if os.path.exists(temp_pdf_path):
            try:
                os.remove(temp_pdf_path)
                logging.info(f"Removed temp file {temp_pdf_path}")
            except Exception as e:
                logging.error(f"Error removing temp file: {str(e)}")
        gc.collect()









































































































































# works for latex papers utf-8 encoding error (24/4/25)
# import os
# import io
# import pandas as pd
# import matplotlib.pyplot as plt
# import uuid
# from flask import Blueprint, request, jsonify
# from tabula import read_pdf
# import base64
# from pdf2image import convert_from_path
# from PIL import Image

# table_extractor_bp = Blueprint("table_extractor", __name__)
# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF using tabula, including table images and data, with improved header merging.
#     """
#     tables = []
#     debug_info = []
#     try:
#         # Read tables with lattice detection to get bounding box coordinates
#         extracted_tables = read_pdf(
#             pdf_path,
#             pages="all",
#             multiple_tables=True,
#             pandas_options={"header": None},
#             lattice=True,
#             java_options=["-Djava.awt.headless=true"]
#         )
#         if not extracted_tables:
#             debug_info.append("No tables found in PDF.")
#             return [], debug_info

#         # Convert PDF pages to images
#         pdf_images = convert_from_path(pdf_path, dpi=300)

#         for table_idx, df in enumerate(extracted_tables):
#             if not df.empty:
#                 table_data = df.fillna("").astype(str).values.tolist()
#                 # Improved header merging logic
#                 if len(table_data) > 0:
#                     # Check if the first row contains a header pattern (e.g., text followed by numbers)
#                     first_row = table_data[0]
#                     is_header_row = False
#                     if len(first_row) > 1:  # Ensure there are multiple columns to check
#                         # Heuristic: If the first element is text and others are numeric-like, merge
#                         try:
#                             first_cell = first_row[0].strip()
#                             rest_cells = [x.strip() for x in first_row[1:]]
#                             if (any(c.isalpha() for c in first_cell) and
#                                 all(c.replace('.', '').replace('-', '').isdigit() or c == "" for c in rest_cells)):
#                                 is_header_row = True
#                         except AttributeError:
#                             pass
#                     if is_header_row:
#                         header_row = [" ".join(first_row)]
#                         table_data = [header_row] + table_data[1:]
#                     else:
#                         # Ensure consistent column count by padding empty cells if needed
#                         max_cols = max(len(row) for row in table_data)
#                         table_data = [row + [""] * (max_cols - len(row)) for row in table_data]

#                 table_area = getattr(df, "area", None)
#                 page_num = getattr(df, "page", 1) - 1
#                 table_image_base64 = None
#                 if table_area and 0 <= page_num < len(pdf_images):
#                     try:
#                         page_image = pdf_images[page_num]
#                         top, left, bottom, right = table_area
#                         img_width, img_height = page_image.size
#                         left = max(0, int(left))
#                         top = max(0, int(top))
#                         right = min(img_width, int(right))
#                         bottom = min(img_height, int(bottom))
#                         if right > left and bottom > top:
#                             table_image = page_image.crop((left, top, right, bottom))
#                             img_io = io.BytesIO()
#                             table_image.save(img_io, format="PNG")
#                             img_io.seek(0)
#                             table_image_base64 = f"data:image/png;base64,{base64.b64encode(img_io.read()).decode('utf-8')}"
#                             debug_info.append(f"Generated image for table {table_idx} on page {page_num + 1}")
#                         else:
#                             debug_info.append(f"Invalid crop area for table {table_idx}: {table_area}")
#                     except Exception as e:
#                         debug_info.append(f"Error extracting table image for index {table_idx}: {str(e)}")
#                 else:
#                     debug_info.append(f"No valid table area or page for table {table_idx}")
#                 tables.append({
#                     "page": page_num + 1,
#                     "table_data": table_data,
#                     "index": table_idx,
#                     "image_url": table_image_base64
#                 })
#                 preview = table_data[:min(3, len(table_data))]
#                 debug_info.append(
#                     f"Detected table at index {table_idx} with {len(table_data)} rows and "
#                     f"{len(table_data[0]) if table_data else 0} columns. Preview: {preview}"
#                 )
#             else:
#                 debug_info.append(f"Empty table at index {table_idx}.")
#     except Exception as e:
#         debug_info.append(f"Error extracting tables: {str(e)}")
#     return tables, debug_info


# def generate_graph_from_table(table_data, file_id, table_index, chart_type):
#     if not table_data or len(table_data) < 2:
#         return None, f"No data or insufficient rows for table index {table_index}"
#     try:
#         df = pd.DataFrame(table_data[1:], columns=table_data[0])
#         img_io = io.BytesIO()
#         if chart_type == "pie":
#             if df.iloc[:, 0].isna().all() or df.iloc[:, 0].astype(str).str.strip().eq("").all():
#                 return None, f"First column empty or invalid for pie chart at index {table_index}"
#             value_counts = df.iloc[:, 0].value_counts()
#             if value_counts.empty or len(value_counts) < 1:
#                 return None, f"No valid data for pie chart at index {table_index}"
#             debug_msg = f"Pie chart data for table {table_index}: {value_counts.to_dict()}"
#             value_counts.plot.pie(autopct='%1.1f%%', figsize=(6, 6))
#             plt.ylabel('')
#         elif chart_type == "bar":
#             if len(df.columns) < 2:
#                 return None, f"Insufficient columns for bar chart at index {table_index}"
#             numeric_cols = []
#             for col in df.columns[1:]:
#                 df[col] = pd.to_numeric(df[col], errors="coerce")
#                 if not df[col].isna().all():
#                     numeric_cols.append(col)
#             if not numeric_cols:
#                 return None, f"No valid numeric columns for bar chart at index {table_index}"
#             df = df[[df.columns[0]] + numeric_cols]
#             df.fillna(0, inplace=True)
#             df.set_index(df.columns[0], inplace=True)
#             debug_msg = f"Bar chart data for table {table_index}: {df.to_dict()}"
#             df.plot(kind="bar", figsize=(10, 6))
#             plt.xlabel(df.index.name or "X-Axis")
#             plt.ylabel("Values")
#         else:
#             return None, f"Unsupported chart type {chart_type} for table index {table_index}"
#         plt.title(f"{chart_type.capitalize()} Chart (Table {table_index})")
#         plt.tight_layout()
#         plt.savefig(img_io, format="png")
#         plt.close()
#         img_io.seek(0)
#         return img_io, debug_msg
#     except Exception as e:
#         plt.close()
#         return None, f"Error generating {chart_type} chart for table index {table_index}: {str(e)}"
# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     Extracts tables from PDF and generates both pie and bar charts if possible.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
#     if not file or not file.filename.lower().endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     file_id = str(uuid.uuid4())
#     temp_pdf_path = f"temp_{file_id}.pdf"
#     file.save(temp_pdf_path)

#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "No tables found", "tables": [], "graphs": [], "debug_info": debug_info}), 200

#     graph_urls = []
#     errors = []
    
#     for table in tables:
#         table_idx = table["index"]
#         table_content = table["table_data"]
        
#         # Try generating pie chart
#         pie_img, pie_msg = generate_graph_from_table(table_content, file_id, table_idx, "pie")
#         # Try generating bar chart
#         bar_img, bar_msg = generate_graph_from_table(table_content, file_id, table_idx, "bar")
        
#         graph_entry = {"table_index": table_idx, "page": table["page"]}
        
#         if pie_img:
#             graph_entry["pie_url"] = f"data:image/png;base64,{base64.b64encode(pie_img.read()).decode('utf-8')}"
#             debug_info.append(pie_msg)
#         else:
#             graph_entry["pie_error"] = pie_msg
#             errors.append(pie_msg)
        
#         if bar_img:
#             graph_entry["bar_url"] = f"data:image/png;base64,{base64.b64encode(bar_img.read()).decode('utf-8')}"
#             debug_info.append(bar_msg)
#         else:
#             graph_entry["bar_error"] = bar_msg
#             errors.append(bar_msg)
        
#         if pie_img or bar_img:
#             graph_urls.append(graph_entry)
        
#     if os.path.exists(temp_pdf_path):
#         os.remove(temp_pdf_path)

#     response_data = {
#         "tables": [
#             {
#                 "table_data": table["table_data"],
#                 "page": table["page"],
#                 "index": table["index"],
#                 "image_url": table["image_url"]
#             } for table in tables
#         ],
#         "graphs": graph_urls,
#         "debug_info": debug_info + errors
#     }
    
#     if not graph_urls:
#         response_data["message"] = "No valid data available for visualization"

#     return jsonify(response_data), 200


































































