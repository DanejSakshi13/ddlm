# from flask_pymongo import PyMongo
# from werkzeug.security import generate_password_hash, check_password_hash

# mongo = PyMongo()

# def create_user(email, password):
#     hashed_password = generate_password_hash(password)
#     user = {
#         "email": email,
#         "password": hashed_password
#     }
#     mongo.db.users.insert_one(user)

# def find_user_by_email(email):
#     return mongo.db.users.find_one({"email": email})

# def verify_user(email, password):
#     user = find_user_by_email(email)
#     if user and check_password_hash(user['password'], password):
#         return user
#     return None
















# from flask_pymongo import PyMongo
# from werkzeug.security import generate_password_hash, check_password_hash

# mongo = PyMongo()

# def create_user(email, password):
#     db = mongo.db  # Ensure we're using the database
#     if "users" not in db.list_collection_names():
#         db.create_collection("users")
#         print("✅ 'users' collection created.")

#     hashed_password = generate_password_hash(password)
#     user = {"email": email, "password": hashed_password}
#     db.users.insert_one(user)  # This will create 'users' collection if it doesn't exist
#     print(f"✅ User {email} added to the database.")

# def find_user_by_email(email):
#     return mongo.db.users.find_one({"email": email})

# def verify_user(email, password):
#     user = find_user_by_email(email)
#     if user and check_password_hash(user['password'], password):
#         return user
#     return None












from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from database.db import mongo  # Import mongo from db.py instead of creating a new instance

def create_user(email, password, name=None):
    db = mongo.db
    hashed_password = generate_password_hash(password)
    user = {
        "email": email, 
        "password": hashed_password
    }
    if name:
        user["name"] = name

    print("🛠 Debug - Data being inserted into DB:", user)  # Debugging line

    db.users.insert_one(user)
    print(f"✅ User {email} added to the database.")

def find_user_by_email(email):
    return mongo.db.users.find_one({"email": email})

def verify_user(email, password):
    user = find_user_by_email(email)
    if user and check_password_hash(user['password'], password):
        return user
    return None