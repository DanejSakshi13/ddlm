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