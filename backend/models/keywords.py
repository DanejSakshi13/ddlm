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




# # integrating priti's model
#terrible fail
# import os
# import re
# import pickle
# import logging
# import pdfplumber
# import tensorflow as tf
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from flask import Blueprint, request, jsonify

# # Configure logging
# logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
# logger = logging.getLogger(__name__)

# # Create Blueprint
# keywords_bp = Blueprint("keywords", __name__)

# # Custom Transformer Encoder Layers (unchanged)
# class EncoderLayer(tf.keras.layers.Layer):
#     def __init__(self, d_model, num_heads, dff, rate=0.1):
#         super(EncoderLayer, self).__init__()
#         self.mha = tf.keras.layers.MultiHeadAttention(num_heads=num_heads, key_dim=d_model)
#         self.ffn = tf.keras.Sequential([
#             tf.keras.layers.Dense(dff, activation='relu'),
#             tf.keras.layers.Dense(d_model)
#         ])
#         self.layernorm1 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
#         self.layernorm2 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
#         self.dropout1 = tf.keras.layers.Dropout(rate)
#         self.dropout2 = tf.keras.layers.Dropout(rate)

#     def call(self, inputs, training=None, mask=None):
#         attn_output = self.mha(query=inputs, value=inputs, key=inputs, training=training)
#         attn_output = self.dropout1(attn_output, training=training)
#         out1 = self.layernorm1(inputs + attn_output)
#         ffn_output = self.ffn(out1)
#         ffn_output = self.dropout2(ffn_output, training=training)
#         return self.layernorm2(out1 + ffn_output)

# class CustomEncoder(tf.keras.Model):
#     def __init__(self, num_layers, d_model, num_heads, dff, input_vocab_size, rate=0.1, **kwargs):
#         super(CustomEncoder, self).__init__(**kwargs)
#         self.embedding = tf.keras.layers.Embedding(input_vocab_size, d_model)
#         self.enc_layers = [EncoderLayer(d_model, num_heads, dff, rate) for _ in range(num_layers)]
#         self.dropout = tf.keras.layers.Dropout(rate)
#         self.final_layer = tf.keras.layers.Dense(input_vocab_size, activation='softmax')

#     def call(self, inputs, training=None, mask=None):
#         x = self.embedding(inputs)
#         x = self.dropout(x, training=training)
#         for encoder_layer in self.enc_layers:
#             x = encoder_layer(x, training=training)
#         return self.final_layer(x)

# # Path configurations
# BASE_DIR = os.path.dirname(__file__)
# MODEL_DIR = os.path.join(BASE_DIR, 'trained_models', 'v1keyword')
# WEIGHTS_PATH = os.path.join(MODEL_DIR, 'model.keras', 'model.weights.h5')
# TOKENIZER_PATH = os.path.join(MODEL_DIR, 'tokenizer.pkl')

# def preprocess_text(text):
#     """Preprocess and clean text"""
#     text = re.sub(r'\s+', ' ', text)
#     text = re.sub(r'[^a-zA-Z\s]', '', text)
#     return text.strip().lower()

# def process_pdf(pdf_data):
#     """Extract text from PDF"""
#     try:
#         with pdfplumber.open(pdf_data) as pdf:
#             full_text = ' '.join([page.extract_text() for page in pdf.pages if page.extract_text()])
#         return full_text
#     except Exception as e:
#         logger.error(f"PDF processing error: {e}")
#         return ""

# def create_or_load_tokenizer(training_text=None):
#     """Create or load tokenizer with fallback"""
#     try:
#         if os.path.exists(TOKENIZER_PATH):
#             with open(TOKENIZER_PATH, 'rb') as handle:
#                 tokenizer = pickle.load(handle)
#             if hasattr(tokenizer, 'word_index'):
#                 vocab_size = len(tokenizer.word_index) + 1
#                 logger.info(f"Loaded tokenizer. Vocab size: {vocab_size}")
#                 return tokenizer, vocab_size
#             else:
#                 logger.warning("Invalid tokenizer loaded. Recreating.")
#     except Exception as e:
#         logger.warning(f"Tokenizer load failed: {e}. Creating new tokenizer.")

#     # Fallback: Create new tokenizer
#     tokenizer = Tokenizer(num_words=None, oov_token="<OOV>")
#     if training_text:
#         preprocessed_text = preprocess_text(training_text)
#         tokenizer.fit_on_texts([preprocessed_text])
#     vocab_size = len(tokenizer.word_index) + 1
    
#     os.makedirs(os.path.dirname(TOKENIZER_PATH), exist_ok=True)
#     with open(TOKENIZER_PATH, 'wb') as handle:
#         pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
    
#     logger.info(f"New tokenizer created. Vocab size: {vocab_size}")
#     return tokenizer, vocab_size

# def tokens_to_unique_words(tokenizer, token_sequence, max_keywords=5):
#     """Convert token sequence to unique words"""
#     unique_words = set()
#     keyword_list = []
#     for token in token_sequence:
#         if token == 0:
#             continue
#         word = tokenizer.index_word.get(token, "<UNK>")
#         if word != "<UNK>" and word not in unique_words:
#             unique_words.add(word)
#             keyword_list.append(word)
#         if len(keyword_list) >= max_keywords:
#             break
#     return keyword_list

# @keywords_bp.route("/", methods=["POST"])
# def extract_keywords():
#     if "pdf" not in request.files:
#         return jsonify({"error": "No PDF file uploaded"}), 400
    
#     try:
#         pdf_file = request.files["pdf"]
#         pdf_data = pdf_file.read()
#         text = process_pdf(pdf_data)
#         logger.info(f"Extracted text length: {len(text)}")
        
#         tokenizer, vocab_size = create_or_load_tokenizer(text)
        
#         if len(text) < 100:
#             return jsonify({"keywords": []})
        
#         cleaned_text = preprocess_text(text)
        
#         # Load model
#         loaded_encoder = CustomEncoder(
#             num_layers=2, d_model=128, num_heads=4, dff=512, 
#             input_vocab_size=vocab_size, rate=0.1
#         )
#         dummy_input = tf.zeros((1, 50), dtype=tf.int32)
#         loaded_encoder(dummy_input, training=False)  # Build model
        
#         if os.path.exists(WEIGHTS_PATH):
#             loaded_encoder.load_weights(WEIGHTS_PATH, by_name=True, skip_mismatch=True)
#             logger.info("Model weights loaded successfully")
#         else:
#             logger.error(f"Weights file not found at {WEIGHTS_PATH}")
#             return jsonify({"error": "Model weights not found"}), 500
        
#         sequences = tokenizer.texts_to_sequences([cleaned_text])
#         padded = pad_sequences(sequences, maxlen=50, padding='post')
#         padded = tf.convert_to_tensor(padded, dtype=tf.int32)
        
#         predictions = loaded_encoder(padded, training=False)
#         predicted_tokens = tf.argmax(predictions, axis=-1).numpy()
        
#         keywords = tokens_to_unique_words(tokenizer, predicted_tokens[0])
#         logger.info(f"Extracted keywords: {keywords}")
#         return jsonify({"keywords": keywords})
    
#     except Exception as e:
#         logger.error(f"Keyword extraction error: {e}")
#         return jsonify({"error": "Internal server error"}), 500

# if __name__ == "__main__":
#     print("Keywords extraction module loaded.")





















#tryng using fast api
# import os
# import tensorflow as tf
# import pickle
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from flask import Blueprint, request, jsonify

# # Define the blueprint
# keywords_bp = Blueprint("keywords", __name__)

# # Path to trained model and tokenizer
# MODEL_DIR = r"D:\Sakshi\Final Year Project\ddlm-backup\backend\models\trained_models\v1keyword"
# TOKENIZER_PATH = os.path.join(MODEL_DIR, "tokenizer.pkl")
# MODEL_PATH = os.path.join(MODEL_DIR, "model.keras")

# # Load tokenizer
# with open(TOKENIZER_PATH, "rb") as handle:
#     tokenizer = pickle.load(handle)

# # Load trained model
# model = tf.keras.models.load_model(MODEL_PATH)

# def preprocess_text(text):
#     """Tokenize and pad input text."""
#     sequence = tokenizer.texts_to_sequences([text])
#     padded = pad_sequences(sequence, maxlen=50, padding='post')
#     return padded

# @keywords_bp.route("/", methods=["POST"])
# def predict_keywords():
#     """Predict keywords from input text."""
#     try:
#         data = request.get_json()
#         if "text" not in data:
#             return jsonify({"error": "Missing 'text' in request"}), 400

#         text = data["text"]
#         processed_text = preprocess_text(text)
#         predictions = model(processed_text, training=False)
        
#         # Get top predicted tokens
#         predicted_tokens = tf.argmax(predictions, axis=-1).numpy()
        
#         # Convert token IDs to words
#         predicted_words = [
#             tokenizer.index_word.get(token, "<UNK>") for token in predicted_tokens[0] if token != 0
#         ]

#         return jsonify({"keywords": predicted_words[:5]})  # Return top 5 keywords

#     except Exception as e:
#         return jsonify({"error": "Prediction failed", "message": str(e)}), 500


















































































































































# best wokring code
#3/4/25
#perfect correctly owkring code
# #perplexity code for more keywords
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
#     if len(text) < 100:  # Ensure there's enough text for analysis
#         return {"keywords": []}
    
#     keyword_results = keyword_extractor(
#         text,
#         max_new_tokens=60,  # Increased from default to allow more keywords
#         num_beams=5,  # Wider beam search for diverse options
#         do_sample=True,  # Enable probabilistic sampling
#         temperature=0.8,  # More creative outputs
#         repetition_penalty=1.3,  # Prevent duplicate keywords
#         truncation=True  # Ensure text fits model limits
#     )
    
#     extracted_keywords = keyword_results[0]["generated_text"].split(", ")
    
#     # Filter and clean keywords
#     filtered_keywords = list(set(kw.strip().lower() for kw in extracted_keywords if len(kw.strip()) > 2))
    
#     return {"keywords": filtered_keywords}

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












































# using keywords for recommentation
import io
import pdfplumber
import re
from flask import Blueprint, request, jsonify
from transformers import pipeline
import requests  # Import requests to call the recommendation API

# Create a Blueprint
keywords_bp = Blueprint("keywords", __name__)

# Initialize the new keyword extraction model (bart-keyword-extractor)
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
        max_new_tokens=60,
        num_beams=5,
        do_sample=True,
        temperature=0.8,
        repetition_penalty=1.3,
        truncation=True
    )
    
    extracted_keywords = keyword_results[0]["generated_text"].split(", ")
    
    # Filter and clean keywords
    filtered_keywords = list(set(kw.strip().lower() for kw in extracted_keywords if len(kw.strip()) > 2))
    
    return {"keywords": filtered_keywords}

# Define API route
@keywords_bp.route("/", methods=["POST"])
def extract_keywords():
    if "pdf" not in request.files:
        return jsonify({"error": "No PDF file uploaded"}), 400
    
    pdf_file = request.files["pdf"]
    pdf_data = pdf_file.read()
    
    # Extract text and analyze keywords
    text = process_pdf(pdf_data)
    results = analyze_text(text)
    
    # Get keywords
    keywords = results["keywords"]
    
    # Initialize recommendations as an empty list
    results["recommendations"] = []
    
    # If keywords are found, fetch recommendations
    if keywords:
        try:
            # Call the recommendation API
            response = requests.post("http://127.0.0.1:5000/recommendation/", json={"keywords": keywords})
            if response.status_code == 200:
                recommendations = response.json()
                results["recommendations"] = recommendations
            else:
                results["recommendations"] = []  # Handle case where recommendations fail
        except Exception as e:
            print(f"Error fetching recommendations: {e}")
            results["recommendations"] = []  # Handle any exceptions gracefully

    return jsonify(results)