#corectly working
# import os
# import io
# import pdfplumber
# import pandas as pd
# import matplotlib.pyplot as plt
# from flask import Blueprint, request, jsonify, send_file

# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF and returns them as a list of Pandas DataFrames.
#     """
#     tables = []
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             extracted_tables = page.extract_tables()
#             for table in extracted_tables:
#                 df = pd.DataFrame(table)
#                 if not df.empty and len(df) > 1:
#                     df.columns = df.iloc[0]  # Set first row as column headers
#                     df = df[1:].reset_index(drop=True)  # Remove the first row
#                     tables.append(df)
#     return tables

# def generate_graph_from_table(df):
#     """
#     Generates a bar chart from the extracted table and returns the image as a response.
#     """
#     if df.empty:
#         return None

#     img_io = io.BytesIO()
    
#     try:
#         df_numeric = df.apply(pd.to_numeric, errors='coerce')  # Convert columns to numeric if possible
#         df_numeric.dropna(axis=1, how='all', inplace=True)  # Remove completely non-numeric columns

#         if df_numeric.shape[1] >= 2:
#             x_col = df_numeric.columns[0]
#             y_col = df_numeric.columns[1]
#             plt.figure(figsize=(8, 5))
#             plt.bar(df_numeric[x_col], df_numeric[y_col])
#             plt.xlabel(str(x_col))
#             plt.ylabel(str(y_col))
#             plt.title("Table Data Visualization")
#             plt.xticks(rotation=45)
#             plt.tight_layout()
#             plt.savefig(img_io, format='png')
#             img_io.seek(0)
#             return img_io
#         else:
#             print("No valid numeric columns detected.")
#             return None
#     except Exception as e:
#         print(f"Error generating graph: {e}")
#         return None

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     API endpoint to extract tables from an uploaded PDF and generate graphs.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
    
#     if not file.filename.endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     # Save the uploaded file temporarily
#     temp_pdf_path = "temp_uploaded.pdf"
#     file.save(temp_pdf_path)

#     # Extract tables
#     tables = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "Table not found"}), 200

#     # Attempt to generate visualization from first valid table
#     for df in tables:
#         graph_img = generate_graph_from_table(df)
#         if graph_img:
#             os.remove(temp_pdf_path)
#             return send_file(graph_img, mimetype='image/png')
    
#     os.remove(temp_pdf_path)
#     return jsonify({"message": "No numeric data available for visualization"}), 200
















# # multigraph
# import os
# import io
# import pdfplumber
# import pandas as pd
# import matplotlib.pyplot as plt
# from flask import Blueprint, request, jsonify, send_file

# # Define Blueprint
# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF and returns them as a list of Pandas DataFrames.
#     """
#     tables = []
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             extracted_tables = page.extract_tables()
#             for table in extracted_tables:
#                 df = pd.DataFrame(table)
#                 df.columns = df.iloc[0]  # Set first row as column headers
#                 df = df[1:]  # Remove the first row
#                 df = df.reset_index(drop=True)
#                 tables.append(df)
#     return tables

# def generate_graphs_from_table(df):
#     """
#     Generates multiple graphs from the extracted table and returns images as responses.
#     """
#     if df.empty:
#         return None

#     img_io = io.BytesIO()
#     df = df.reset_index(drop=True)  # Ensure clean indexing

#     # Convert numeric columns (excluding the first column which is categorical)
#     df_numeric = df.iloc[:, 1:].apply(pd.to_numeric, errors='coerce')
#     df_numeric.dropna(axis=1, how='all', inplace=True)  # Remove fully non-numeric columns

#     if df_numeric.empty:
#         print("No valid numeric columns detected.")
#         return None

#     # Ensure the first column is categorical (X-axis)
#     x_col = df.columns[0]
#     df[x_col] = df[x_col].astype(str)
#     df_numeric.index = df[x_col]
    
#     plt.figure(figsize=(10, 6))
    
#     # Multi-bar chart
#     df_numeric.plot(kind='bar', figsize=(10, 6))
#     plt.title("Multi-bar Chart")
#     plt.xlabel(x_col)
#     plt.ylabel("Values")
#     plt.xticks(rotation=45)
#     plt.legend(title="Metrics")
#     plt.grid(axis='y')
#     plt.tight_layout()
#     plt.savefig(img_io, format='png')
#     img_io.seek(0)
#     return img_io

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     API endpoint to extract tables from an uploaded PDF and generate graphs.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
    
#     if not file.filename.endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     # Save the uploaded file temporarily
#     temp_pdf_path = "temp_uploaded.pdf"
#     file.save(temp_pdf_path)

#     # Extract tables
#     tables = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "Table not found"}), 200

#     # Generate visualization from the first table
#     graph_img = generate_graphs_from_table(tables[0])

#     os.remove(temp_pdf_path)

#     if graph_img:
#         return send_file(graph_img, mimetype='image/png')
#     else:
#         return jsonify({"message": "No numeric data available for visualization"}), 200























































import os
import io
import pdfplumber
import pandas as pd
import matplotlib.pyplot as plt
from flask import Blueprint, request, jsonify, send_file

table_extractor_bp = Blueprint("table_extractor", __name__)

def extract_tables_from_pdf(pdf_path):
    """
    Extracts tables from a PDF and returns them as a list of Pandas DataFrames.
    """
    tables = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            extracted_tables = page.extract_tables()
            for table in extracted_tables:
                df = pd.DataFrame(table)
                if not df.empty and len(df) > 1:
                    df.columns = df.iloc[0]  # Set first row as column headers
                    df = df[1:].reset_index(drop=True)  # Remove the first row
                    tables.append(df)
    return tables

def generate_graph_from_table(df):
    """
    Generates a bar chart from the extracted table and returns the image as a response.
    """
    if df.empty:
        return None

    img_io = io.BytesIO()
    
    try:
        # Identify the first column as categorical and the rest as numeric
        x_col = df.columns[0]
        numeric_cols = df.columns[1:]

        # Convert numeric columns to numeric types
        df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')

        # Drop rows with NaN values in numeric columns
        df.dropna(subset=numeric_cols, inplace=True)

        if not df.empty:
            # Create a bar plot for each numeric column
            df.set_index(x_col, inplace=True)
            df.plot(kind='bar', figsize=(10, 6))
            plt.title("Table Data Visualization")
            plt.xlabel(str(x_col))
            plt.ylabel("Values")
            plt.xticks(rotation=45)
            plt.tight_layout()
            plt.legend(title="Parameters")
            plt.savefig(img_io, format='png')
            img_io.seek(0)
            return img_io
        else:
            print("No valid data available for visualization.")
            return None
    except Exception as e:
        print(f"Error generating graph: {e}")
        return None

@table_extractor_bp.route("/table-extract", methods=["POST"])
def extract_table_and_visualize():
    """
    API endpoint to extract tables from an uploaded PDF and generate graphs.
    """
    if "pdf" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["pdf"]
    
    if not file.filename.endswith(".pdf"):
        return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

    # Save the uploaded file temporarily
    temp_pdf_path = "temp_uploaded.pdf"
    file.save(temp_pdf_path)

    # Extract tables
    tables = extract_tables_from_pdf(temp_pdf_path)
    
    if not tables:
        os.remove(temp_pdf_path)
        return jsonify({"message": "Table not found"}), 200

    # Attempt to generate visualization from the first valid table
    for df in tables:
        graph_img = generate_graph_from_table(df)
        if graph_img:
            os.remove(temp_pdf_path)
            return send_file(graph_img, mimetype='image/png')
    
    os.remove(temp_pdf_path)
    return jsonify({"message": "No valid data available for visualization"}), 200









# import os
# import io
# import pdfplumber
# import pandas as pd
# import matplotlib.pyplot as plt
# from flask import Blueprint, request, jsonify, send_file

# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF with adjusted detection parameters and returns them as a list of Pandas DataFrames.
#     Includes fallback to text-based table reconstruction.
#     """
#     tables = []
#     debug_info = []
#     try:
#         with pdfplumber.open(pdf_path) as pdf:
#             for page_num, page in enumerate(pdf.pages, 1):
#                 # Step 1: Try line-based table detection
#                 table_settings = {
#                     "vertical_strategy": "lines",
#                     "horizontal_strategy": "lines",
#                     "edge_min_length": 2,  # Reduced to detect shorter lines
#                     "snap_tolerance": 5,   # Increased tolerance for line alignment
#                     "join_tolerance": 5,   # Increased tolerance for joining lines
#                     "intersection_tolerance": 5,  # Increased tolerance for intersections
#                 }
#                 extracted_tables = page.extract_tables(table_settings)
#                 if extracted_tables:
#                     for table_idx, table in enumerate(extracted_tables):
#                         if table:
#                             df = pd.DataFrame(table)
#                             if not df.empty and len(df) > 1:
#                                 df.columns = df.iloc[0]
#                                 df = df[1:].reset_index(drop=True)
#                                 df = df.replace("", pd.NA).dropna(how="all")
#                                 if df.select_dtypes(include=[float, int]).columns.any():
#                                     tables.append({"page": page_num, "table": df, "index": table_idx})
#                                     debug_info.append(f"Detected table on page {page_num}, index {table_idx} with numeric data.")
#                                 else:
#                                     debug_info.append(f"Table on page {page_num}, index {table_idx} has no numeric data.")
#                             else:
#                                 debug_info.append(f"Empty or invalid table detected on page {page_num}, index {table_idx}.")
#                 else:
#                     debug_info.append(f"No tables detected with lines on page {page_num}.")

#                     # Step 2: Fallback - Attempt text-based table reconstruction
#                     words = page.extract_words()
#                     if words:
#                         text_by_y = {}
#                         for word in words:
#                             y = round(word["top"], 1)
#                             text_by_y.setdefault(y, []).append(word["text"])
#                         rows = []
#                         prev_y = None
#                         for y, texts in sorted(text_by_y.items()):
#                             if prev_y and abs(y - prev_y) > 10:  # New row if y-gap is significant
#                                 rows.append(" ".join(texts))
#                             else:
#                                 rows[-1] = rows[-1] + " " + " ".join(texts) if rows else " ".join(texts)
#                             prev_y = y
#                         if rows:
#                             df = pd.DataFrame([row.split() for row in rows])
#                             if not df.empty and len(df) > 1:
#                                 df.columns = df.iloc[0]
#                                 df = df[1:].reset_index(drop=True)
#                                 df = df.replace("", pd.NA).dropna(how="all")
#                                 if df.select_dtypes(include=[float, int]).columns.any():
#                                     tables.append({"page": page_num, "table": df, "index": 0})
#                                     debug_info.append(f"Reconstructed table with numeric data on page {page_num} using text fallback.")
#                                 else:
#                                     debug_info.append(f"Reconstructed table on page {page_num} has no numeric data.")
#                             else:
#                                 debug_info.append(f"Invalid reconstructed table on page {page_num}.")
#                     else:
#                         debug_info.append(f"No text data available for fallback on page {page_num}.")

#     except Exception as e:
#         debug_info.append(f"Error extracting tables from PDF: {e}")
#     return tables, debug_info

# def generate_graph_from_table(df, page_num, table_idx):
#     """
#     Generates a bar chart from the extracted table and returns the image as a BytesIO object.
#     """
#     if df.empty:
#         return None

#     img_io = io.BytesIO()
    
#     try:
#         x_col = df.columns[0]
#         numeric_cols = df.select_dtypes(include=[float, int]).columns
#         if not numeric_cols.any():
#             print(f"No numeric data in table on page {page_num}, index {table_idx}.")
#             return None

#         df_numeric = df[numeric_cols].apply(pd.to_numeric, errors="coerce")
#         df = pd.concat([df[x_col], df_numeric], axis=1).dropna()

#         if not df.empty:
#             df.set_index(x_col, inplace=True)
#             ax = df.plot(kind="bar", figsize=(10, 6))
#             plt.title(f"Table Visualization (Page {page_num}, Table {table_idx})")
#             plt.xlabel(str(x_col))
#             plt.ylabel("Values")
#             plt.xticks(rotation=45)
#             plt.legend(title="Parameters", bbox_to_anchor=(1.05, 1), loc="upper left")
#             plt.tight_layout()
#             plt.savefig(img_io, format="png", bbox_inches="tight")
#             img_io.seek(0)
#             return img_io
#         else:
#             print(f"No valid data for visualization in table on page {page_num}, index {table_idx}.")
#             return None
#     except Exception as e:
#         print(f"Error generating graph for table on page {page_num}, index {table_idx}: {e}")
#         return None

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     API endpoint to extract tables from an uploaded PDF and generate graphs.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
    
#     if not file or not file.filename.endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     # Save the uploaded file temporarily
#     temp_pdf_path = "temp_uploaded.pdf"
#     file.save(temp_pdf_path)

#     # Extract tables and debug info
#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "No tables found", "debug_info": debug_info}), 200

#     # Generate graphs for all valid tables
#     graph_urls = []
#     for table_data in tables:
#         df = table_data["table"]
#         page_num = table_data["page"]
#         table_idx = table_data["index"]
#         graph_img = generate_graph_from_table(df, page_num, table_idx)
#         if graph_img:
#             graph_urls.append({
#                 "url": send_file(graph_img, mimetype="image/png", as_attachment=False).data.decode("utf-8"),
#                 "page": page_num,
#                 "table_index": table_idx
#             })

#     os.remove(temp_pdf_path)

#     if not graph_urls:
#         return jsonify({"message": "No valid data available for visualization", "debug_info": debug_info}), 200

#     return jsonify({"graphs": graph_urls, "debug_info": debug_info}), 200

































































# import os
# import io
# import pandas as pd
# import matplotlib.pyplot as plt
# from flask import Blueprint, request, jsonify, send_file
# from tabula import read_pdf

# table_extractor_bp = Blueprint("table_extractor", __name__)

# def extract_tables_from_pdf(pdf_path):
#     """
#     Extracts tables from a PDF using tabula and returns them as a list of dictionaries with metadata.
#     """
#     tables = []
#     debug_info = []
#     try:
#         # Extract all tables from the PDF using tabula
#         extracted_tables = read_pdf(pdf_path, pages="all", multiple_tables=True, pandas_options={"header": None})
#         if not extracted_tables:
#             debug_info.append("No tables found in PDF.")
#         else:
#             for table_idx, df in enumerate(extracted_tables):
#                 if not df.empty and len(df) > 1:
#                     # Use the first row as headers if it looks like a header row
#                     headers = df.iloc[0].astype(str).values
#                     df = df[1:].reset_index(drop=True)
#                     df.columns = headers
#                     df = df.replace("", pd.NA).dropna(how="all")
#                     # Convert to string for database storage and UI display
#                     table_data = df.fillna("").astype(str).values.tolist()
#                     # Check for numeric data for graph generation
#                     if df.select_dtypes(include=[float, int]).columns.any():
#                         tables.append({
#                             "page": 1,  # tabula doesn't provide page info, so use 1
#                             "table": df,
#                             "index": table_idx,
#                             "table_data": table_data  # For database/UI
#                         })
#                         debug_info.append(f"Detected table with numeric data at index {table_idx}.")
#                     else:
#                         tables.append({
#                             "page": 1,
#                             "table": df,
#                             "index": table_idx,
#                             "table_data": table_data
#                         })
#                         debug_info.append(f"Table at index {table_idx} has no numeric data.")
#                 else:
#                     debug_info.append(f"Empty or invalid table detected at index {table_idx}.")
#     except Exception as e:
#         debug_info.append(f"Error extracting tables from PDF: {e}")
#     return tables, debug_info

# def generate_graph_from_table(df, page_num, table_idx):
#     """
#     Generates a bar chart from the extracted table and returns the image as a BytesIO object.
#     """
#     if df.empty:
#         return None

#     img_io = io.BytesIO()
    
#     try:
#         x_col = df.columns[0]
#         numeric_cols = df.select_dtypes(include=[float, int]).columns
#         if not numeric_cols.any():
#             print(f"No numeric data in table on page {page_num}, index {table_idx}.")
#             return None

#         df_numeric = df[numeric_cols].apply(pd.to_numeric, errors="coerce")
#         df = pd.concat([df[x_col], df_numeric], axis=1).dropna()

#         if not df.empty:
#             df.set_index(x_col, inplace=True)
#             ax = df.plot(kind="bar", figsize=(10, 6))
#             plt.title(f"Table Visualization (Page {page_num}, Table {table_idx})")
#             plt.xlabel(str(x_col))
#             plt.ylabel("Values")
#             plt.xticks(rotation=45)
#             plt.legend(title="Parameters", bbox_to_anchor=(1.05, 1), loc="upper left")
#             plt.tight_layout()
#             plt.savefig(img_io, format="png", bbox_inches="tight")
#             plt.close()
#             img_io.seek(0)
#             return img_io
#         else:
#             print(f"No valid data for visualization in table on page {page_num}, index {table_idx}.")
#             return None
#     except Exception as e:
#         print(f"Error generating graph for table on page {page_num}, index {table_idx}: {e}")
#         return None

# @table_extractor_bp.route("/table-extract", methods=["POST"])
# def extract_table_and_visualize():
#     """
#     API endpoint to extract tables from an uploaded PDF, generate graphs, and return table data for database/UI.
#     """
#     if "pdf" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["pdf"]
    
#     if not file or not file.filename.endswith(".pdf"):
#         return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

#     # Save the uploaded file temporarily
#     temp_pdf_path = "temp_uploaded.pdf"
#     file.save(temp_pdf_path)

#     # Extract tables and debug info
#     tables, debug_info = extract_tables_from_pdf(temp_pdf_path)
    
#     if not tables:
#         os.remove(temp_pdf_path)
#         return jsonify({"message": "No tables found", "debug_info": debug_info}), 200

#     # Generate graphs for all valid tables
#     graph_urls = []
#     for table_data in tables:
#         df = table_data["table"]
#         page_num = table_data["page"]
#         table_idx = table_data["index"]
#         graph_img = generate_graph_from_table(df, page_num, table_idx)
#         if graph_img:
#             graph_urls.append({
#                 "url": send_file(graph_img, mimetype="image/png", as_attachment=False).data.decode("utf-8"),
#                 "page": page_num,
#                 "table_index": table_idx
#             })

#     os.remove(temp_pdf_path)

#     response_data = {
#         "tables": [{"table_data": table["table_data"], "page": table["page"], "index": table["index"]} for table in tables],
#         "graphs": graph_urls,
#         "debug_info": debug_info
#     }
#     if not graph_urls:
#         response_data["message"] = "No valid data available for visualization"

#     return jsonify(response_data), 200
