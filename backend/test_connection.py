from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Define MongoDB URI directly
MONGO_URI = "mongodb+srv://sakshidanej:ddlmproject@cluster0.mlqtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a MongoDB client with SSL/TLS settings
client = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)

# Test the connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("Could not connect to MongoDB:", e)
