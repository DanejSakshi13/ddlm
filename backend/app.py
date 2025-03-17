# from flask import Flask, request, jsonify
# from models.summarizer import summarize_text
# from models.keyword_extractor import extract_keywords
# import io
# import pdfplumber
# import re

# app = Flask(__name__)


# def preprocess_text(text):
#     """Clean and preprocess extracted text."""
#     text = re.sub(r'\s+', ' ', text)  # Replace multiple spaces with single space
#     return text.strip()


# def process_pdf(pdf_data):
#     """Extract text from a PDF."""
#     with io.BytesIO(pdf_data) as pdf_file:
#         with pdfplumber.open(pdf_file) as pdf:
#             full_text = ''
#             for page in pdf.pages:
#                 full_text += page.extract_text()
#     return preprocess_text(full_text)


# @app.route('/upload', methods=['POST'])
# def upload_pdf():
#     """
#     Endpoint to handle PDF uploads and return summary and keywords.
#     """
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400

#     uploaded_file = request.files['file']

#     if not uploaded_file.filename.endswith('.pdf'):
#         return jsonify({'error': 'Invalid file type. Please upload a PDF file.'}), 400

#     try:
#         # Read the PDF file
#         pdf_data = uploaded_file.read()
#         text = process_pdf(pdf_data)

#         # Summarization and Keyword Extraction
#         summary = summarize_text(text)
#         keywords = extract_keywords(text)

#         return jsonify({
#             'summary': summary,
#             'keywords': keywords
#         })
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)















# -------------------------------------------------------------------------------------
# from flask import Flask
# from flask_cors import CORS
# from models.summarizer import summarizer_bp

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# # Register Blueprint
# app.register_blueprint(summarizer_bp, url_prefix='/api')

# if __name__ == '__main__':
#     app.run(debug=True, host='127.0.0.1', port=5000)
















#------------------------------coreectly worknig
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.summarizer import summarizer_bp
# from models.keywords import keywords_bp
# from models.table_extractor import table_extractor_bp

# # app = Flask(__name__)
# # CORS(app)  # Enable CORS for frontend communication



# app = Flask(__name__)

# # Update CORS configuration to allow requests from Vite's default port
# CORS(app, resources={
#     r"/api/*": {
#         "origins": ["http://localhost:5173"],  # Add Vite's development server port
#         "methods": ["POST", "OPTIONS"],
#         "allow_headers": ["Content-Type"],
#         "expose_headers": ["Content-Type"],
#         "supports_credentials": True
#     }
# })


# # Register the Blueprints (Ensure they are correctly set up)
# app.register_blueprint(summarizer_bp, url_prefix="/api")
# app.register_blueprint(keywords_bp, url_prefix="/api/keywords")
# app.register_blueprint(table_extractor_bp, url_prefix="/api")


# @app.route("/")
# def home():
#     return "Backend is running!"

# if __name__ == "__main__":
#     app.run(debug=True)

























# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.summarizer import summarizer_bp
# from models.keywords import keywords_bp
# from models.table_extractor import table_extractor_bp

# app = Flask(__name__)

# # Enhanced CORS configuration with better security and error handling
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "http://localhost:5173",  # Vite's default development server
#             "http://localhost:5174",  # Alternative Vite port
#             "http://127.0.0.1:5173"   # Local IP access
#         ],
#         "methods": ["POST", "OPTIONS", "GET"],
#         "allow_headers": [
#             "Content-Type",
#             "Accept",
#             "Authorization",
#             "X-Requested-With"
#         ],
#         "expose_headers": [
#             "Content-Type",
#             "Content-Disposition"
#         ],
#         "supports_credentials": True,
#         "max_age": 3600  # Cache preflight requests for 1 hour
#     }
# })

# # Register blueprints with error handling
# def register_blueprints(app):
#     """Register all blueprints with proper error handling"""
#     blueprints = [
#         (summarizer_bp, "/api"),
#         (keywords_bp, "/api/keywords"),
#         (table_extractor_bp, "/api")
#     ]
    
#     for blueprint, url_prefix in blueprints:
#         app.register_blueprint(blueprint, url_prefix=url_prefix)

# register_blueprints(app)

# # Global error handlers
# @app.errorhandler(400)
# def bad_request_error(error):
#     return jsonify({
#         'error': 'Bad Request',
#         'message': str(error.description)
#     }), 400

# @app.errorhandler(404)
# def not_found_error(error):
#     return jsonify({
#         'error': 'Not Found',
#         'message': 'The requested resource was not found'
#     }), 404

# @app.errorhandler(500)
# def internal_error(error):
#     return jsonify({
#         'error': 'Internal Server Error',
#         'message': 'An unexpected error occurred'
#     }), 500

# # Health check endpoint
# @app.route("/api/health")
# def health_check():
#     return jsonify({
#         'status': 'healthy',
#         'version': '1.0.0'
#     })

# @app.route("/")
# def home():
#     return jsonify({
#         'message': 'Backend is running!',
#         'endpoints': {
#             'summarize': '/api/summarize-pdf',
#             'keywords': '/api/keywords/',
#             'table-extract': '/api/table-extract'
#         }
#     })

# # Request logging middleware
# @app.before_request
# def log_request_info():
#     if app.debug:
#         print(f'Headers: {request.headers}')
#         print(f'Body: {request.get_data()}')

# # Response headers middleware
# @app.after_request
# def after_request(response):
#     response.headers.add('X-Content-Type-Options', 'nosniff')
#     response.headers.add('X-Frame-Options', 'DENY')
#     response.headers.add('X-XSS-Protection', '1; mode=block')
#     return response

# if __name__ == "__main__":
#     app.run(debug=True, host='0.0.0.0', port=5000)




    # .\venv\Scripts\activate


























from flask import Flask, request, jsonify
from flask_cors import CORS
from models.summarizer import summarizer_bp
from models.keywords import keywords_bp
from models.table_extractor import table_extractor_bp
from models.title_extractor import title_extractor_bp  # Import the title extractor blueprint
from models.recommendation import recommendation_bp  # Import the recommendation blueprint
from models.citation_extractor import citation_extractor_bp
from routes.user_routes import user_bp  # Import the user routes
from database.db import init_db  # Import the init_db function



app = Flask(__name__)
init_db(app)

# Enhanced CORS configuration
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5173"
        ],
        "methods": ["POST", "OPTIONS", "GET"],
        "allow_headers": [
            "Content-Type",
            "Accept",
            "Authorization",
            "X-Requested-With"
        ],
        "expose_headers": [
            "Content-Type",
            "Content-Disposition"
        ],
        "supports_credentials": True,
        "max_age": 3600
    }
})

# Register blueprints
# Register blueprints
def register_blueprints(app):
    blueprints = [
        (summarizer_bp, "/api"),
        (keywords_bp, "/api/keywords"),
        (table_extractor_bp, "/api"),
        (title_extractor_bp, "/api"),
        (recommendation_bp, "/api/recommend"),  # Ensure this line ends with a comma
        (citation_extractor_bp, "/api"),  # This line is fine
        (user_bp, "/api")
    ]
    
    for blueprint, url_prefix in blueprints:
        app.register_blueprint(blueprint, url_prefix=url_prefix)

register_blueprints(app)



# Global error handlers
@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({
        'error': 'Bad Request',
        'message': str(error.description)
    }), 400

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource was not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred'
    }), 500

# Health check endpoint
@app.route("/api/health")
def health_check():
    return jsonify({
        'status': 'healthy',
        'version': '1.0.0'
    })

@app.route("/")
def home():
    return jsonify({
        'message': 'Backend is running!',
        'endpoints': {
            'summarize': '/api/summarize-pdf',
            'keywords': '/api/keywords/',
            'table-extract': '/api/table-extract',
            'extract-title': '/api/extract-title',
            'recommend': '/api/recommend',
            'extract-citations': '/api/extract-citations',
            'signup': '/api/signup',  # Add this line
            'login': '/api/login'      # Add this line
        }
    })


# Request logging middleware
@app.before_request
def log_request_info():
    if app.debug:
        print(f'Headers: {request.headers}')
        print(f'Body: {request.get_data()}')

# Response headers middleware
@app.after_request
def after_request(response):
    response.headers.add('X-Content-Type-Options', 'nosniff')
    response.headers.add('X-Frame-Options', 'DENY')
    response.headers.add('X-XSS-Protection', '1; mode=block')
    return response

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)