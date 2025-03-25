
# from pymongo import MongoClient
# from pymongo.server_api import ServerApi
# from flask_pymongo import PyMongo
# from flask import Flask

# # Initialize PyMongo
# mongo = PyMongo()

# def init_db(app: Flask):
#     # Hardcoded MongoDB URI
#     app.config["MONGO_URI"] = app.config["MONGO_URI"] = "mongodb+srv://sakshidanej:ddlmproject@cluster0.mlqtr.mongodb.net/ddlm_db?retryWrites=true&w=majority&appName=Cluster0"


#     # Initialize PyMongo
#     mongo.init_app(app)

#     # Create MongoDB client
#     client = MongoClient(app.config["MONGO_URI"], server_api=ServerApi('1'))
#     db = client.get_database()

#     # Ensure the 'users' collection exists
#     if "users" not in db.list_collection_names():
#         db.create_collection("users")  # This creates the collection explicitly
#         print("✅ 'users' collection created.")

#     # Test MongoDB connection
#     try:
#         client.admin.command('ping')
#         print("✅ Successfully connected to MongoDB!")
#     except Exception as e:
#         print("❌ Could not connect to MongoDB:", e)





















# working v1
# from pymongo import MongoClient
# from pymongo.server_api import ServerApi
# from flask_pymongo import PyMongo
# from flask import Flask

# # Initialize PyMongo
# mongo = PyMongo()

# def init_db(app: Flask):
#     # MongoDB URI with updated connection parameters
#     app.config["MONGO_URI"] = "mongodb+srv://sakshidanej:ddlmproject@cluster0.mlqtr.mongodb.net/ddlm_db?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

#     # Initialize PyMongo
#     mongo.init_app(app)

#     # Create MongoDB client with SSL settings
#     client = MongoClient(app.config["MONGO_URI"], server_api=ServerApi('1'), tls=True, tlsAllowInvalidCertificates=True)
#     db = client.get_database()

#     # Ensure the 'users' collection exists
#     if "users" not in db.list_collection_names():
#         db.create_collection("users")  # This creates the collection explicitly
#         print("✅ 'users' collection created.")

#     # Test MongoDB connection
#     try:
#         client.admin.command('ping')
#         print("✅ Successfully connected to MongoDB!")
#     except Exception as e:
#         print("❌ Could not connect to MongoDB:", e)













# removed redundancy and add new colleciotn
from flask import Flask
from flask_pymongo import PyMongo

# Initialize PyMongo
mongo = PyMongo()

def init_db(app: Flask):
    # MongoDB URI
    app.config["MONGO_URI"] = (
        "mongodb+srv://sakshidanej:ddlmproject@cluster0.mlqtr.mongodb.net/ddlm_db"
        "?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"
    )

    # Initialize PyMongo with the app
    mongo.init_app(app)

    # Ensure collections exist
    db = mongo.db
    collections = ["users", "paper_analyses"]
    for collection in collections:
        if collection not in db.list_collection_names():
            db.create_collection(collection)
            print(f"✅ '{collection}' collection created.")

    # Test MongoDB connection
    try:
        mongo.db.command('ping')
        print("✅ Successfully connected to MongoDB!")
    except Exception as e:
        print("❌ Could not connect to MongoDB:", e)
        raise