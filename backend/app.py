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

























# WORKS PERFECTLY FINE
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.summarizer import summarizer_bp
# from models.keywords import keywords_bp
# from models.table_extractor import table_extractor_bp
# from models.title_extractor import title_extractor_bp  # Import the title extractor blueprint
# from models.recommendation import recommendation_bp  # Import the recommendation blueprint
# from models.citation_extractor import citation_extractor_bp
# from routes.user_routes import user_bp  # Import the user routes
# from database.db import init_db  # Import the init_db function



# app = Flask(__name__)
# init_db(app)

# # Enhanced CORS configuration
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "http://localhost:5173",
#             "http://localhost:5174",
#             "http://127.0.0.1:5173"
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
#         "max_age": 3600
#     }
# })

# # Register blueprints
# # Register blueprints
# def register_blueprints(app):
#     blueprints = [
#         (summarizer_bp, "/api"),
#         (keywords_bp, "/api/keywords"),
#         (table_extractor_bp, "/api"),
#         (title_extractor_bp, "/api"),
#         (recommendation_bp, "/api/recommend"),  # Ensure this line ends with a comma
#         (citation_extractor_bp, "/api"),  # This line is fine
#         (user_bp, "/api")
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
#             'table-extract': '/api/table-extract',
#             'extract-title': '/api/extract-title',
#             'recommend': '/api/recommend',
#             'extract-citations': '/api/extract-citations',
#             'signup': '/api/signup',  
#             'login': '/api/login',
#             'user-data': '/api/user-data'      
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










#WORKING CODE 27/3/25
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.summarizer import summarizer_bp
# from models.keywords import keywords_bp
# from models.table_extractor import table_extractor_bp
# from models.title_extractor import title_extractor_bp
# from models.recommendation import recommendation_bp
# from models.citation_extractor import citation_extractor_bp
# from routes.user_routes import user_bp
# from database.db import init_db
# from datetime import datetime

# app = Flask(__name__)
# init_db(app)

# # Apply CORS globally with explicit configuration
# CORS(app, resources={r"/api/*": {
#     "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
#     "methods": ["GET", "POST", "OPTIONS"],
#     "allow_headers": ["Content-Type", "Authorization"],
#     "supports_credentials": True
# }})

# # Register blueprints
# def register_blueprints(app):
#     blueprints = [
#         (summarizer_bp, "/api"),
#         (keywords_bp, "/api/keywords"),
#         (table_extractor_bp, "/api"),
#         (title_extractor_bp, "/api"),
#         (recommendation_bp, "/api/recommend"),
#         (citation_extractor_bp, "/api"),
#         (user_bp, "/api")
#     ]
#     for blueprint, url_prefix in blueprints:
#         app.register_blueprint(blueprint, url_prefix=url_prefix)

# register_blueprints(app)

# # Global error handlers
# @app.errorhandler(400)
# def bad_request_error(error):
#     return jsonify({'error': 'Bad Request', 'message': str(error.description)}), 400

# @app.errorhandler(404)
# def not_found_error(error):
#     return jsonify({'error': 'Not Found', 'message': 'The requested resource was not found'}), 404

# @app.errorhandler(500)
# def internal_error(error):
#     return jsonify({'error': 'Internal Server Error', 'message': 'An unexpected error occurred'}), 500

# # Health check endpoint
# @app.route("/api/health")
# def health_check():
#     return jsonify({'status': 'healthy', 'version': '1.0.0'})

# @app.route("/")
# def home():
#     return jsonify({
#         'message': 'Backend is running!',
#         'endpoints': {
#             'summarize': '/api/summarize-pdf',
#             'keywords': '/api/keywords/',
#             'table-extract': '/api/table-extract',
#             'extract-title': '/api/extract-title',
#             'recommend': '/api/recommend',
#             'extract-citations': '/api/extract-citations',
#             'signup': '/api/signup',
#             'login': '/api/login',
#             'user-data': '/api/user-data',
#             'paper-analysis': '/api/paper-analysis'
#         }
#     })

# # Request logging middleware
# @app.before_request
# def log_request_info():
#     print(f"[{datetime.utcnow()}] {request.method} {request.path}")
#     print(f"Headers: {request.headers}")
#     print(f"Body: {request.get_data(as_text=True)}")

# # Response headers middleware
# @app.after_request
# def after_request(response):
#     response.headers['X-Content-Type-Options'] = 'nosniff'
#     response.headers['X-Frame-Options'] = 'DENY'
#     response.headers['X-XSS-Protection'] = '1; mode=block'
#     print(f"Response Headers: {response.headers}")
#     return response

# if __name__ == "__main__":
#     app.run(debug=True, host='127.0.0.1', port=5000)  # Changed to 127.0.0.1


















# #integrating user query
from flask import Flask, request, jsonify
from flask_cors import CORS
from models.summarizer import summarizer_bp
from models.keywords import keywords_bp
from models.table_extractor import table_extractor_bp
from models.title_extractor import title_extractor_bp
from models.recommendation import recommendation_bp
from models.citation_extractor import citation_extractor_bp
from models.image_extractor import image_extractor_bp
from models.author_extractor import author_extractor_bp  
from routes.user_routes import user_bp
from database.db import init_db
from datetime import datetime
from models.user_query import user_query_bp  # Add this import


app = Flask(__name__)
init_db(app)

# Apply CORS globally with explicit configuration
# CORS(app, resources={r"/api/*": {
#     "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
#     "methods": ["GET", "POST", "OPTIONS"],
#     "allow_headers": ["Content-Type", "Authorization"],
#     "supports_credentials": True
# }})


CORS(app, resources={r"/*": {
    "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})


# Register blueprints
def register_blueprints(app):
    blueprints = [
        (summarizer_bp, "/api"),
        (keywords_bp, "/api/keywords"),
        (table_extractor_bp, "/api"),
        (title_extractor_bp, "/api"),
        (recommendation_bp, "/api/recommend"),
        (citation_extractor_bp, "/api"),
        (image_extractor_bp, "/api"),
        (author_extractor_bp, "/api"),
        (user_bp, "/api"),
        (user_query_bp, "/api")  # Register the new blueprint
    ]
    for blueprint, url_prefix in blueprints:
        app.register_blueprint(blueprint, url_prefix=url_prefix)

register_blueprints(app)

# Global error handlers
@app.errorhandler(400)
def bad_request_error(error):
    return jsonify({'error': 'Bad Request', 'message': str(error.description)}), 400

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not Found', 'message': 'The requested resource was not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Server Error', 'message': 'An unexpected error occurred'}), 500

# Health check endpoint
@app.route("/api/health")
def health_check():
    return jsonify({'status': 'healthy', 'version': '1.0.0'})

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
            'extract-images': '/api/extract-images',
            'extract-authors': '/api/extract-authors',
            'signup': '/api/signup',
            'login': '/api/login',
            'user-data': '/api/user-data',
            'paper-analysis': '/api/paper-analysis',
            'query': '/api/query'  # Add this endpoint
        }
    })

# Request logging middleware
@app.before_request
def log_request_info():
    print(f"[{datetime.utcnow()}] {request.method} {request.path}")
    print(f"Headers: {request.headers}")
    print(f"Body: {request.get_data(as_text=True)}")

# Response headers middleware
@app.after_request
def after_request(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    print(f"Response Headers: {response.headers}")
    return response

# if __name__ == "__main__":
#     app.run(debug=True, host='127.0.0.1', port=5000)

# Resolve the Socket Error
if __name__ == "__main__":
    app.run(debug=False, host='127.0.0.1', port=5000)


















