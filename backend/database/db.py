

# //wokrign code pings correctly
# import os
# from flask import Flask
# from flask_pymongo import PyMongo
# from pymongo import MongoClient
# from pymongo.server_api import ServerApi

# # Initialize PyMongo
# mongo = PyMongo()

# def init_db(app: Flask):
#     # Set the MongoDB URI directly (HARD-CODED)
#     app.config["MONGO_URI"] = "mongodb+srv://sakshidanej:ddlmproject@cluster0.mlqtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

#     # Initialize PyMongo
#     mongo.init_app(app)

#     # Create a new client and connect to the server
#     client = MongoClient(app.config["MONGO_URI"], server_api=ServerApi('1'))

#     # Send a ping to confirm a successful connection
#     try:
#         client.admin.command('ping')
#         print("Pinged your deployment. You successfully connected to MongoDB!")
#     except Exception as e:
#         print("Could not connect to MongoDB:", e)

# # Example usage
# if __name__ == "__main__":
#     app = Flask(__name__)
#     init_db(app)













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






















from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask_pymongo import PyMongo
from flask import Flask

# Initialize PyMongo
mongo = PyMongo()

def init_db(app: Flask):
    # MongoDB URI with updated connection parameters
    app.config["MONGO_URI"] = "mongodb+srv://sakshidanej:ddlmproject@cluster0.mlqtr.mongodb.net/ddlm_db?retryWrites=true&w=majority&appName=Cluster0&tlsAllowInvalidCertificates=true"

    # Initialize PyMongo
    mongo.init_app(app)

    # Create MongoDB client with SSL settings
    client = MongoClient(app.config["MONGO_URI"], server_api=ServerApi('1'), tls=True, tlsAllowInvalidCertificates=True)
    db = client.get_database()

    # Ensure the 'users' collection exists
    if "users" not in db.list_collection_names():
        db.create_collection("users")  # This creates the collection explicitly
        print("✅ 'users' collection created.")

    # Test MongoDB connection
    try:
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB!")
    except Exception as e:
        print("❌ Could not connect to MongoDB:", e)