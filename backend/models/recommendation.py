# import io
# import pdfplumber
# import arxiv
# import re
# from flask import Blueprint, request, jsonify

# # Create Blueprint
# recommendation_bp = Blueprint("recommendation", __name__)

# # Function to extract text from PDF
# def extract_text_from_pdf(pdf_data):
#     with io.BytesIO(pdf_data) as pdf_file:
#         with pdfplumber.open(pdf_file) as pdf:
#             full_text = ' '.join([page.extract_text() for page in pdf.pages if page.extract_text()])
#     return full_text.strip()

# # Function to identify domain based on keywords
# def identify_domain(text):
#     domain_keywords = {
#         "Machine Learning": ["deep learning", "neural network", "AI", "artificial intelligence", "reinforcement learning", "supervised learning", "unsupervised learning"],
#         "Computer Vision": ["image processing", "object detection", "segmentation", "image classification", "computer vision", "facial recognition"],
#         "Natural Language Processing": ["text analysis", "language model", "transformer", "BERT", "GPT", "sentiment analysis", "tokenization"],
#         "Cybersecurity": ["encryption", "cyber attack", "firewall", "hacking", "malware", "phishing", "intrusion detection"],
#         "Quantum Computing": ["quantum mechanics", "qubits", "entanglement", "superposition", "quantum algorithms", "quantum cryptography"],
#         "Blockchain": ["blockchain", "cryptocurrency", "decentralized", "smart contracts", "distributed ledger"],
#         "Internet of Things": ["IoT", "smart devices", "sensor networks", "connected devices", "home automation"],
#         "Data Science": ["data analysis", "big data", "data mining", "data visualization", "predictive analytics"],
#         "Bioinformatics": ["genomics", "proteomics", "biological data", "DNA sequencing", "computational biology"],
#         "Robotics": ["robotics", "automation", "robotic process automation", "autonomous systems", "robotic vision"],
#         "Augmented Reality": ["augmented reality", "virtual reality", "mixed reality", "AR", "VR"],
#         "Edge Computing": ["edge computing", "fog computing", "distributed computing", "cloud computing"],
#         "5G Technology": ["5G", "wireless communication", "mobile networks", "network slicing"],
#         "Sustainable Energy": ["renewable energy", "solar power", "wind energy", "energy storage", "sustainability"],
#         "Health Informatics": ["healthcare data", "medical informatics", "telemedicine", "health technology"]
#     }
    
#     for domain, keywords in domain_keywords.items():
#         if any(re.search(r'\b' + re.escape(keyword) + r'\b', text, re.IGNORECASE) for keyword in keywords):
#             return domain
#     return "General Science"
    
# # Function to fetch top 3 recent papers from arXiv
# def get_research_papers(domain):
#     search = arxiv.Search(
#         query=domain,
#         max_results=3,
#         sort_by=arxiv.SortCriterion.SubmittedDate
#     )
#     papers = []
#     for result in search.results():
#         papers.append({
#             "title": result.title,
#             "authors": [author.name for author in result.authors],
#             "published": result.published.strftime('%Y-%m-%d'),
#             "url": result.entry_id
#         })
#     return papers

# # API Route to recommend research papers
# @recommendation_bp.route("/recommend", methods=["POST"])
# def recommend_papers():
#     if "pdf" not in request.files:
#         return jsonify({"error": "No PDF file uploaded"}), 400

#     pdf_file = request.files["pdf"]
#     pdf_data = pdf_file.read()

#     try:
#         # Extract text and identify domain
#         text = extract_text_from_pdf(pdf_data)
#         if not text:
#             return jsonify({"error": "Failed to extract text from PDF"}), 500

#         domain = identify_domain(text)
#         papers = get_research_papers(domain)

#         return jsonify({"domain": domain, "recommendations": papers}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500






import io
import pdfplumber
import arxiv
import re
from flask import Blueprint, request, jsonify

# Create Blueprint
recommendation_bp = Blueprint("recommendation", __name__)

# def get_recommendations(keywords):
#     # Create a search query from the keywords
#     search_query = " OR ".join(keywords)
    
#     # Query arXiv for related papers
#     search = arxiv.Search(
#         query=search_query,
#         max_results=5,  # You can adjust this number
#         sort_by=arxiv.SortCriterion.Relevance
#     )
    
#     recommendations = []
#     for result in search.results():
#         recommendations.append({
#             "title": result.title,
#             "summary": result.summary,
#             "url": result.entry_id,
#             "authors": [author.name for author in result.authors],
#             "published": result.published
#         })
    
#     return recommendations[:3]  # Return top 3 recommendations



from datetime import datetime

def get_recommendations(keywords):
    # Get the current year and last year
    current_year = datetime.now().year
    last_year = current_year - 1
    two_years_ago = current_year - 2  # Extend the range if no results are found

    # Create a search query from the keywords
    search_query = " OR ".join(keywords)
    
    # Query arXiv for relevant papers
    search = arxiv.Search(
        query=search_query,
        max_results=50,  # Increase the number to have more candidates
        sort_by=arxiv.SortCriterion.Relevance  # Sort by relevance first
    )
    
    recommendations = []
    for result in search.results():
        # Log the paper to see what is being retrieved
        print(f"Found paper: {result.title}, Published: {result.published.year}")

        # Filter by date (allowing the last two years initially)
        if two_years_ago <= result.published.year <= current_year:
            recommendations.append({
                "title": result.title,
                "url": result.entry_id,
                "published": result.published.strftime("%Y-%m-%d")
            })
    
    # If no results, relax the filter to include three years ago
    if not recommendations:
        print("No recent papers found, relaxing to last three years...")
        for result in search.results():
            if (current_year - 3) <= result.published.year <= current_year:
                recommendations.append({
                    "title": result.title,
                    "url": result.entry_id,
                    "published": result.published.strftime("%Y-%m-%d")
                })

    # Sort filtered results by date (newest first)
    recommendations = sorted(recommendations, key=lambda x: x["published"], reverse=True)
    
    return recommendations[:3]  # Return top 3 latest and relevant recommendations


# Define API route
@recommendation_bp.route("/", methods=["POST"])
def recommend_papers():
    if "keywords" not in request.json:
        return jsonify({"error": "No keywords provided"}), 400
    
    keywords = request.json["keywords"]
    
    # Get recommendations based on keywords
    recommendations = get_recommendations(keywords)
    
    return jsonify(recommendations)