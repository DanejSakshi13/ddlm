# from flask import Blueprint, request, jsonify
# from database.user_service import create_user, verify_user

# user_bp = Blueprint('user_bp', __name__)



# @user_bp.route('/signup', methods=['POST'])
# def signup():
#     print("Signup endpoint reached")  # Debugging line
#     data = request.json
#     print("Received data:", data)  # Debugging line
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({"error": "Email and password are required"}), 400

#     existing_user = verify_user(email, password)
#     if existing_user:
#         return jsonify({"error": "User  already exists"}), 400

#     create_user(email, password)
#     return jsonify({"message": "User  created successfully"}), 201


# @user_bp.route('/api/login', methods=['POST'])
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














from flask import Blueprint, request, jsonify
from database.user_service import create_user, verify_user, find_user_by_email

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    print("Signup endpoint reached")
    data = request.json
    print("Received data:", data)
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')  # Get the name from the request

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_user = find_user_by_email(email)  # Changed from verify_user to find_user_by_email
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    create_user(email, password, name)  # Pass the name
    return jsonify({"message": "User created successfully"}), 201

@user_bp.route('/login', methods=['POST'])  # Removed the /api prefix since it's added by blueprint registration
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = verify_user(email, password)
    if user:
        return jsonify({"message": "Login successful", "user": {"email": user['email']}}), 200
    return jsonify({"error": "Invalid email or password"}), 401