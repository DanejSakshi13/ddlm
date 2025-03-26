
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














# working code v1
# from flask_pymongo import PyMongo
# from werkzeug.security import generate_password_hash, check_password_hash
# from database.db import mongo  # Import mongo from db.py instead of creating a new instance

# def create_user(email, password, name=None):
#     db = mongo.db
#     hashed_password = generate_password_hash(password)
#     user = {
#         "email": email, 
#         "password": hashed_password
#     }
#     if name:
#         user["name"] = name

#     print("🛠 Debug - Data being inserted into DB:", user)  # Debugging line

#     db.users.insert_one(user)
#     print(f"✅ User {email} added to the database.")

# def find_user_by_email(email):
#     return mongo.db.users.find_one({"email": email})

# def verify_user(email, password):
#     user = find_user_by_email(email)
#     if user and check_password_hash(user['password'], password):
#         return user
#     return None









# working without chat analysis collection
# from flask_pymongo import PyMongo
# from werkzeug.security import generate_password_hash, check_password_hash
# from datetime import datetime
# from database.db import mongo  # Import mongo from db.py instead of creating a new instance

# def create_user(email, password, name=None):
#     db = mongo.db
#     hashed_password = generate_password_hash(password)

#     user = {
#         "name": name if name else "Unnamed User",
#         "email": email, 
#         "password": hashed_password,
#         "created_at": datetime.utcnow(),  # Store user creation timestamp
#         "last_login": None,
#         "logout_time": None,
#         "role": "user",  # Default role is "user"
#         "session_active": False  # Session starts as inactive
#     }

#     print("🛠 Debug - Data being inserted into DB:", user)  # Debugging line
#     db.users.insert_one(user)
#     print(f"✅ User {email} added to the database.")

# def find_user_by_email(email):
#     return mongo.db.users.find_one({"email": email})

# def update_user_login(email):
#     db = mongo.db
#     db.users.update_one(
#         {"email": email},
#         {"$set": {"last_login": datetime.utcnow(), "session_active": True}}
#     )

# def update_user_logout(email):
#     db = mongo.db
#     db.users.update_one(
#         {"email": email},
#         {"$set": {"logout_time": datetime.utcnow(), "session_active": False}}
#     )

# def verify_user(email, password):
#     user = find_user_by_email(email)
#     if user and check_password_hash(user['password'], password):
#         update_user_login(email)  # Update last login time & session status
#         return user
#     return None







from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from database.db import mongo
from bson.objectid import ObjectId

def create_user(email, password, name=None):
    db = mongo.db
    hashed_password = generate_password_hash(password)

    user = {
        "name": name if name else "Unnamed User",
        "email": email, 
        "password": hashed_password,
        "created_at": datetime.utcnow(),
        "last_login": None,
        "logout_time": None,
        "role": "user",
        "session_active": False,
        "recent_analyses": []  # Array of analysis IDs
    }

    print("🛠 Debug - Data being inserted into DB:", user)
    db.users.insert_one(user)
    print(f"✅ User {email} added to the database.")

def find_user_by_email(email):
    return mongo.db.users.find_one({"email": email})

def update_user_login(email):
    db = mongo.db
    db.users.update_one(
        {"email": email},
        {"$set": {"last_login": datetime.utcnow(), "session_active": True}}
    )

def update_user_logout(email):
    db = mongo.db
    db.users.update_one(
        {"email": email},
        {"$set": {"logout_time": datetime.utcnow(), "session_active": False}}
    )

def verify_user(email, password):
    user = find_user_by_email(email)
    if user and check_password_hash(user['password'], password):
        update_user_login(email)
        return user
    return None

def save_paper_analysis(email, analysis_data):
    db = mongo.db
    analysis_entry = {
        "user_email": email,
        "pdf_id": analysis_data.get("pdf_id", str(ObjectId())),
        "filename": analysis_data.get("filename"),
        "title": analysis_data.get("title"),
        "authors": analysis_data.get("authors", []),
        "citations": analysis_data.get("citations", []),
        "citation_count": analysis_data.get("citation_count", 0),
        "recommendations": analysis_data.get("recommendations", []),
        "summary": analysis_data.get("summary"),
        "keywords": analysis_data.get("keywords", []),
        "graphs": analysis_data.get("graphs", []),
        "tables": analysis_data.get("tables", []),
        "chat": analysis_data.get("chat", []),
        "timestamp": datetime.utcnow()
    }
    analysis_result = db.paper_analyses.insert_one(analysis_entry)
    analysis_id = str(analysis_result.inserted_id)  # Convert to string
    print("✅ Inserted analysis with ID:", analysis_id)
    
    # Append the new analysis ID to recent_analyses
    update_result = db.users.update_one(
        {"email": email},
        {"$push": {"recent_analyses": analysis_id}}
    )
    print(f"🛠 Update result: matched={update_result.matched_count}, modified={update_result.modified_count}")
    print(f"✅ Appended {analysis_id} to recent_analyses for {email}")

def get_user_recent_analyses(email):
    """Retrieve the most recent paper analysis for the user."""
    user = find_user_by_email(email)
    if not user or "recent_analyses" not in user or not user["recent_analyses"]:
        return None
    
    # Get the most recent analysis ID (last in the list)
    analysis_id = user["recent_analyses"][-1]  # Get the latest analysis ID
    
    try:
        # Fetch the actual analysis document from paper_analyses collection
        analysis = mongo.db.paper_analyses.find_one({"_id": ObjectId(analysis_id)})
        
        if analysis:
            # Convert ObjectId to string for JSON serialization
            analysis['_id'] = str(analysis['_id'])
            return analysis
        
        return None
    
    except Exception as e:
        print(f"Error retrieving recent analysis: {e}")
        return None