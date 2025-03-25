

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












from flask import Blueprint, request, jsonify
from database.user_service import (
    create_user, verify_user, find_user_by_email, update_user_logout,
    save_paper_analysis, get_user_recent_analyses
)

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
                "last_login": user.get("last_login"),
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
        "logout_time": datetime.utcnow()
    }), 200

@user_bp.route('/user-data', methods=['GET'])
def get_user_data():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email parameter is required"}), 400
    
    user = find_user_by_email(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user['_id'] = str(user['_id'])
    recent_analysis = get_user_recent_analyses(email)  # Single analysis

    return jsonify({
        "pdfs": user.get('pdfs', []),
        "recent_analysis": recent_analysis,  # Renamed from chat_history
        "analysis": user.get('analysis', [])
    }), 200

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