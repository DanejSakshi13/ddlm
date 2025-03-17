# from transformers import pipeline

# # Initialize the keyword extraction model
# keyword_extractor = pipeline("ner", model="ml6team/keyphrase-extraction-kbir-inspec", grouped_entities=True)


# def extract_keywords(text):
#     """
#     Extract keywords from the given text.
#     :param text: Input text to analyze
#     :return: List of keywords
#     """
#     keyword_results = keyword_extractor(text)
#     keywords = [entity['word'] for entity in keyword_results if entity['entity_group'] == 'KEY']
#     return keywords























# -------------------------------------------------------------------------------
#working code -gives 3 keywords
# import io
# import pdfplumber
# import re
# from flask import Blueprint, request, jsonify
# from transformers import pipeline

# # Create a Blueprint
# keywords_bp = Blueprint("keywords", __name__)

# # ✅ Initialize the new keyword extraction model (bart-keyword-extractor)
# keyword_extractor = pipeline("text2text-generation", model="ilsilfverskiold/bart-keyword-extractor")

# def preprocess_text(text):
#     text = re.sub(r'\s+', ' ', text)  # Replace multiple spaces with a single space
#     return text.strip()

# def process_pdf(pdf_data):
#     with io.BytesIO(pdf_data) as pdf_file:
#         with pdfplumber.open(pdf_file) as pdf:
#             full_text = ' '.join([page.extract_text() for page in pdf.pages if page.extract_text()])
#     return preprocess_text(full_text)

# def analyze_text(text):
#     keyword_results = keyword_extractor(text, max_length=50, min_length=5, do_sample=False)
    
#     # Extract keywords from the model's generated text
#     extracted_keywords = keyword_results[0]["generated_text"].split(", ")
    
#     return {"keywords": extracted_keywords}

# # Define API route
# @keywords_bp.route("/", methods=["POST"])  # ✅ Ensure correct API route
# def extract_keywords():
#     if "pdf" not in request.files:
#         return jsonify({"error": "No PDF file uploaded"}), 400
    
#     pdf_file = request.files["pdf"]
#     pdf_data = pdf_file.read()
    
#     # Extract text and analyze keywords
#     text = process_pdf(pdf_data)
#     results = analyze_text(text)

#     return jsonify(results)


















#working code - gives many random keywords
# # keywords.py
# import io
# import pdfplumber
# import re
# from flask import Blueprint, request, jsonify
# from transformers import pipeline

# # Create a Blueprint
# keywords_bp = Blueprint("keywords", __name__)

# # Initialize the keyword extraction model
# keyword_extractor = pipeline("text2text-generation", 
#                            model="ilsilfverskiold/bart-keyword-extractor",
#                            max_length=128)  # Increased max_length to allow for more keywords

# def preprocess_text(text):
#     text = re.sub(r'\s+', ' ', text)
#     return text.strip()

# def process_pdf(pdf_data):
#     with io.BytesIO(pdf_data) as pdf_file:
#         with pdfplumber.open(pdf_file) as pdf:
#             full_text = ' '.join([page.extract_text() for page in pdf.pages if page.extract_text()])
#     return preprocess_text(full_text)

# def analyze_text(text):
#     # Generate multiple sets of keywords and combine them
#     chunks = [text[i:i + 512] for i in range(0, len(text), 512)]
#     all_keywords = set()
    
#     for chunk in chunks:
#         # Generate keywords with higher max_length to get more keywords
#         keyword_results = keyword_extractor(
#             chunk,
#             max_length=128,
#             min_length=30,
#             num_return_sequences=3,  # Generate multiple sequences
#             do_sample=True,  # Enable sampling
#             top_k=50,  # Increase diversity
#             temperature=1.2  # Increase randomness slightly
#         )
        
#         # Process all generated sequences
#         for result in keyword_results:
#             keywords = result["generated_text"].split(", ")
#             all_keywords.update(keywords)
    
#     # Convert to list and ensure we have at least 10 keywords
#     final_keywords = list(all_keywords)
    
#     # If we still don't have enough keywords, try to extract more using different text chunks
#     while len(final_keywords) < 10 and text:
#         additional_results = keyword_extractor(
#             text[-512:],  # Try different part of text
#             max_length=128,
#             min_length=30,
#             do_sample=True,
#             top_k=50,
#             temperature=1.3
#         )
#         for result in additional_results:
#             new_keywords = result["generated_text"].split(", ")
#             final_keywords.extend([k for k in new_keywords if k not in final_keywords])
    
#     # Take the top 10 keywords (or all if less than 10)
#     return {"keywords": final_keywords[:10]}

# @keywords_bp.route("/", methods=["POST"])
# def extract_keywords():
#     if "pdf" not in request.files:
#         return jsonify({"error": "No PDF file uploaded"}), 400
    
#     pdf_file = request.files["pdf"]
#     pdf_data = pdf_file.read()
    
#     try:
#         text = process_pdf(pdf_data)
#         results = analyze_text(text)
        
#         # Ensure we have at least 10 keywords or as many as possible
#         if len(results["keywords"]) < 10:
#             print(f"Warning: Only generated {len(results['keywords'])} keywords")
            
#         return jsonify(results)
#     except Exception as e:
#         print(f"Error processing keywords: {str(e)}")
#         return jsonify({"error": str(e)}), 500


























#perplexity code for more keywords
import io
import pdfplumber
import re
from flask import Blueprint, request, jsonify
from transformers import pipeline

# Create a Blueprint
keywords_bp = Blueprint("keywords", __name__)

# ✅ Initialize the new keyword extraction model (bart-keyword-extractor)
keyword_extractor = pipeline("text2text-generation", model="ilsilfverskiold/bart-keyword-extractor")

def preprocess_text(text):
    text = re.sub(r'\s+', ' ', text)  # Replace multiple spaces with a single space
    return text.strip()

def process_pdf(pdf_data):
    with io.BytesIO(pdf_data) as pdf_file:
        with pdfplumber.open(pdf_file) as pdf:
            full_text = ' '.join([page.extract_text() for page in pdf.pages if page.extract_text()])
    return preprocess_text(full_text)

def analyze_text(text):
    if len(text) < 100:  # Ensure there's enough text for analysis
        return {"keywords": []}
    
    keyword_results = keyword_extractor(
        text,
        max_new_tokens=60,  # Increased from default to allow more keywords
        num_beams=5,  # Wider beam search for diverse options
        do_sample=True,  # Enable probabilistic sampling
        temperature=0.8,  # More creative outputs
        repetition_penalty=1.3,  # Prevent duplicate keywords
        truncation=True  # Ensure text fits model limits
    )
    
    extracted_keywords = keyword_results[0]["generated_text"].split(", ")
    
    # Filter and clean keywords
    filtered_keywords = list(set(kw.strip().lower() for kw in extracted_keywords if len(kw.strip()) > 2))
    
    return {"keywords": filtered_keywords}

# Define API route
@keywords_bp.route("/", methods=["POST"])  # ✅ Ensure correct API route
def extract_keywords():
    if "pdf" not in request.files:
        return jsonify({"error": "No PDF file uploaded"}), 400
    
    pdf_file = request.files["pdf"]
    pdf_data = pdf_file.read()
    
    # Extract text and analyze keywords
    text = process_pdf(pdf_data)
    results = analyze_text(text)

    return jsonify(results)
