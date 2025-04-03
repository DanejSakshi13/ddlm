

# working code v1
# from flask import Blueprint, request, jsonify
# from database.user_service import create_user, verify_user, find_user_by_email

# user_bp = Blueprint('user_bp', __name__)

# @user_bp.route('/signup', methods=['POST'])
# def signup():
#     print("Signup endpoint reached")
#     data = request.json
#     print("Received data:", data)
#     email = data.get('email')
#     password = data.get('password')
#     name = data.get('name')  # Get the name from the request

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     existing_user = find_user_by_email(email)  # Changed from verify_user to find_user_by_email
#     if existing_user:
#         return jsonify({"error": "User already exists"}), 400

#     create_user(email, password, name)  # Pass the name
#     return jsonify({"message": "User created successfully"}), 201

# @user_bp.route('/login', methods=['POST'])  # Removed the /api prefix since it's added by blueprint registration
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     user = verify_user(email, password)
#     if user:
#         return jsonify({"message": "Login successful", "user": {"email": user['email']}}), 200
#     return jsonify({"error": "Invalid email or password"}), 401













# # working v2
# from flask import Blueprint, request, jsonify
# from database.user_service import (
#     create_user, verify_user, find_user_by_email, update_user_logout
# )

# user_bp = Blueprint('user_bp', __name__)

# @user_bp.route('/signup', methods=['POST'])
# def signup():
#     print("Signup endpoint reached")
#     data = request.json
#     print("Received data:", data)
    
#     email = data.get('email')
#     password = data.get('password')
#     name = data.get('name')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     existing_user = find_user_by_email(email)
#     if existing_user:
#         return jsonify({"error": "User already exists"}), 400

#     create_user(email, password, name)
#     return jsonify({"message": "User created successfully"}), 201

# @user_bp.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     user = verify_user(email, password)
#     if user:
#         return jsonify({
#             "message": "Login successful",
#             "user": {
#                 "name": user.get("name"),
#                 "email": user.get("email"),
#                 "role": user.get("role"),
#                 "last_login": user.get("last_login"),
#                 "session_active": True
#             }
#         }), 200
#     return jsonify({"error": "Invalid email or password"}), 401

# @user_bp.route('/logout', methods=['POST'])
# def logout():
#     data = request.json
#     email = data.get('email')

#     if not email:
#         return jsonify({"error": "Email is required"}), 400

#     user = find_user_by_email(email)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     update_user_logout(email)
#     return jsonify({
#         "message": "Logout successful",
#         "email": email,
#         "logout_time": datetime.utcnow()
#     }), 200












# from flask import Blueprint, request, jsonify
# from database.user_service import (
#     create_user, verify_user, find_user_by_email, update_user_logout,
#     save_paper_analysis, get_user_recent_analyses
# )

# user_bp = Blueprint('user_bp', __name__)

# @user_bp.route('/signup', methods=['POST'])
# def signup():
#     print("Signup endpoint reached")
#     data = request.json
#     print("Received data:", data)
    
#     email = data.get('email')
#     password = data.get('password')
#     name = data.get('name')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     existing_user = find_user_by_email(email)
#     if existing_user:
#         return jsonify({"error": "User already exists"}), 400

#     create_user(email, password, name)
#     return jsonify({"message": "User created successfully"}), 201

# @user_bp.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     user = verify_user(email, password)
#     if user:
#         return jsonify({
#             "message": "Login successful",
#             "user": {
#                 "name": user.get("name"),
#                 "email": user.get("email"),
#                 "role": user.get("role"),
#                 "last_login": user.get("last_login"),
#                 "session_active": True
#             }
#         }), 200
#     return jsonify({"error": "Invalid email or password"}), 401

# @user_bp.route('/logout', methods=['POST'])
# def logout():
#     data = request.json
#     email = data.get('email')

#     if not email:
#         return jsonify({"error": "Email is required"}), 400

#     user = find_user_by_email(email)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     update_user_logout(email)
#     return jsonify({
#         "message": "Logout successful",
#         "email": email,
#         "logout_time": datetime.utcnow()
#     }), 200

# # @user_bp.route('/user-data', methods=['GET'])
# # def get_user_data():
# #     email = request.args.get('email')
# #     if not email:
# #         return jsonify({"error": "Email parameter is required"}), 400
    
# #     user = find_user_by_email(email)
# #     if not user:
# #         return jsonify({"error": "User not found"}), 404

# #     user['_id'] = str(user['_id'])
# #     recent_analysis = get_user_recent_analyses(email)  # Single analysis

# #     return jsonify({
# #         "pdfs": user.get('pdfs', []),
# #         "recent_analysis": recent_analysis,  # Renamed from chat_history
# #         "analysis": user.get('analysis', [])
# #     }), 200


# @user_bp.route('/user-data', methods=['GET'])
# def get_user_data():
#     email = request.args.get('email')
#     if not email:
#         return jsonify({"error": "Email parameter is required"}), 400
    
#     user = find_user_by_email(email)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     user['_id'] = str(user['_id'])
    
#     # Get all analysis IDs from recent_analyses
#     analysis_ids = user.get("recent_analyses", [])
    
#     # Fetch all corresponding analyses from paper_analyses
#     analyses = []
#     if analysis_ids:
#         analyses = list(mongo.db.paper_analyses.find({"_id": {"$in": analysis_ids}}))
#         # Convert ObjectId to string for JSON serialization
#         for analysis in analyses:
#             analysis["_id"] = str(analysis["_id"])
    
#     # Get the most recent analysis (optional, for consistency with your current setup)
#     recent_analysis = get_user_recent_analyses(email)

#     return jsonify({
#         "pdfs": user.get('pdfs', []),
#         "recent_analysis": recent_analysis,  # Latest analysis
#         "analysis": analyses  # List of all analyses
#     }), 200



# @user_bp.route('/paper-analysis', methods=['POST'])
# def save_paper_analysis_route():
#     data = request.json
#     print("🛠 Received POST /api/paper-analysis:", data)
#     email = data.get('email')
#     analysis_data = data.get('analysis_data')

#     if not email or not analysis_data:
#         print("❌ Missing email or analysis_data")
#         return jsonify({"error": "Email and analysis_data are required"}), 400

#     user = find_user_by_email(email)
#     if not user:
#         print("❌ User not found:", email)
#         return jsonify({"error": "User not found"}), 404

#     save_paper_analysis(email, analysis_data)
#     print("✅ Analysis saved for:", email)
#     return jsonify({
#         "message": "Paper analysis saved",
#         "analysis": analysis_data
#     }), 200





























































25/3/25
import json  
import os  
from flask import Blueprint, request, jsonify
from database.user_service import (
    create_user, verify_user, find_user_by_email, update_user_logout,
    save_paper_analysis, get_user_recent_analyses
)
from models.image_extractor import process_pdf
from bson.objectid import ObjectId
from database.db import mongo
from datetime import datetime

user_bp = Blueprint('user_bp', __name__)




@user_bp.route('/signup', methods=['POST'])
def signup():
    print("Signup endpoint reached")
    data = request.json
    print("Received data:", data)
    
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_user = find_user_by_email(email)
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    create_user(email, password, name)
    return jsonify({"message": "User created successfully"}), 201




@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = verify_user(email, password)
    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user.get("name"),
                "email": user.get("email"),
                "role": user.get("role"),
                "last_login": str(user.get("last_login")),
                "session_active": True
            }
        }), 200
    return jsonify({"error": "Invalid email or password"}), 401




@user_bp.route('/logout', methods=['POST'])
def logout():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = find_user_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    update_user_logout(email)
    return jsonify({
        "message": "Logout successful",
        "email": email,
        "logout_time": str(datetime.utcnow())
    }), 200





@user_bp.route('/user-data', methods=['GET'])
def get_user_data():
    try:
        email = request.args.get('email')
        if not email:
            return jsonify({"error": "Email parameter is required"}), 400
        
        user = find_user_by_email(email)
        if not user:
            return jsonify({"error": "User not found"}), 404

        user['_id'] = str(user['_id'])
        
        # Fetch analysis IDs from user's recent_analyses
        analysis_ids = user.get("recent_analyses", [])
        print(f"Recent analyses IDs: {analysis_ids}")
        
        # Fetch all corresponding analyses
        analyses = []
        if analysis_ids:
            try:
                analyses = list(mongo.db.paper_analyses.find({"_id": {"$in": [ObjectId(id) for id in analysis_ids]}}))
                for analysis in analyses:
                    analysis["_id"] = str(analysis["_id"])
            except Exception as e:
                print(f"Error fetching analyses: {e}")
                return jsonify({"error": "Failed to fetch analyses", "details": str(e)}), 500
        
        recent_analysis = get_user_recent_analyses(email)
        if recent_analysis:
            recent_analysis["_id"] = str(recent_analysis["_id"])

        return jsonify({
            "pdfs": user.get('pdfs', []),
            "recent_analysis": recent_analysis,
            "analysis": analyses  # Corrected: uses 'analyses', not 'analysis'
        }), 200
    except Exception as e:
        print(f"Unexpected error in /user-data: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500



@user_bp.route('/paper-analysis', methods=['POST'])
def save_paper_analysis_route():
    data = request.json
    print("🛠 Received POST /api/paper-analysis:", data)
    email = data.get('email')
    analysis_data = data.get('analysis_data')

    if not email or not analysis_data:
        print("❌ Missing email or analysis_data")
        return jsonify({"error": "Email and analysis_data are required"}), 400

    user = find_user_by_email(email)
    if not user:
        print("❌ User not found:", email)
        return jsonify({"error": "User not found"}), 404

    save_paper_analysis(email, analysis_data)
    print("✅ Analysis saved for:", email)
    return jsonify({
        "message": "Paper analysis saved",
        "analysis": analysis_data
    }), 200



# HORRIBLE
# @user_bp.route('/paper-analysis', methods=['POST'])
# def save_paper_analysis_route():
#     print("🛠 Received POST /api/paper-analysis")
    
#     # Check if a file is included in the request
#     if 'file' not in request.files:
#         print("❌ No file part in request")
#         return jsonify({"error": "No file provided"}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         print("❌ No file selected")
#         return jsonify({"error": "No file selected"}), 400
    
#     if not file.filename.endswith('.pdf'):
#         print("❌ File is not a PDF")
#         return jsonify({"error": "File must be a PDF"}), 400
    
#     email = request.form.get('email')
#     analysis_data_str = request.form.get('analysis_data')
    
#     if not email or not analysis_data_str:
#         print("❌ Missing email or analysis_data")
#         return jsonify({"error": "Email and analysis_data are required"}), 400
    
#     try:
#         analysis_data = json.loads(analysis_data_str)  # Parse JSON string from FormData
#     except Exception as e:
#         print(f"❌ Invalid analysis_data JSON: {e}")
#         return jsonify({"error": "Invalid analysis_data format"}), 400
    
#     user = find_user_by_email(email)
#     if not user:
#         print("❌ User not found:", email)
#         return jsonify({"error": "User not found"}), 404
    
#     # Save and process the PDF file
#     temp_path = "temp.pdf"
#     file.save(temp_path)
#     try:
#         image_results = process_pdf(temp_path)
#         if "error" in image_results:
#             print(f"⚠️ Image extraction failed: {image_results['error']}")
#         else:
#             analysis_data["images"] = image_results.get("images", [])
#             print(f"✅ Extracted {len(analysis_data['images'])} images")
        
#         save_paper_analysis(email, analysis_data)
#         print("✅ Analysis saved for:", email)
#         return jsonify({
#             "message": "Paper analysis saved",
#             "analysis": analysis_data
#         }), 200
#     except Exception as e:
#         print(f"❌ Error processing PDF or saving analysis: {e}")
#         return jsonify({"error": str(e)}), 500
#     finally:
#         if os.path.exists(temp_path):
#             os.remove(temp_path)




@user_bp.route('/delete-analysis', methods=['POST'])
def delete_analysis():
    data = request.json
    email = data.get('email')
    analysis_id = data.get('analysis_id')  # Changed from pdf_id to analysis_id to match _id

    if not email or not analysis_id:
        return jsonify({'error': 'Email and analysis_id are required'}), 400

    user = find_user_by_email(email)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    try:
        # Convert analysis_id to ObjectId for MongoDB query
        analysis_obj_id = ObjectId(analysis_id)

        # Delete the analysis from paper_analyses collection
        delete_result = mongo.db.paper_analyses.delete_one({'_id': analysis_obj_id})
        if delete_result.deleted_count == 0:
            return jsonify({'error': 'Analysis not found in paper_analyses'}), 404

        # Remove the analysis_id from user's recent_analyses array
        update_result = mongo.db.users.update_one(
            {'email': email},
            {'$pull': {'recent_analyses': analysis_id}}
        )

        if update_result.modified_count == 0:
            print(f"Warning: Analysis ID {analysis_id} not found in user's recent_analyses")

        return jsonify({'message': 'Analysis deleted successfully'}), 200

    except Exception as e:
        print(f"Error deleting analysis: {e}")
        return jsonify({'error': 'Failed to delete analysis', 'details': str(e)}), 500