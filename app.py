from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
import torch

# Load pre-trained BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

app = Flask(__name__)
CORS(app)

# Function to generate sentence embeddings
def get_sentence_embedding(sentence):
    inputs = tokenizer(sentence, return_tensors='pt', truncation=True, padding=True, max_length=512)
    outputs = model(**inputs)
    # Take the mean of the embeddings from the last hidden state
    sentence_embedding = outputs.last_hidden_state.mean(dim=1).squeeze()
    return sentence_embedding.detach().numpy()

# Example sentences
sentences = [
    "Introduction to Algorithms",
    "Artificial Intelligence: A Modern Approach",
    "Clean Code: A Handbook of Agile Software Craftsmanship",
    "Design Patterns: Elements of Reusable Object-Oriented Software",
    "The Pragmatic Programmer: Your Journey to Mastery",
    "Code Complete: A Practical Handbook of Software Construction",
    "Introduction to the Theory of Computation",
    "The Art of Computer Programming",
    "Structure and Interpretation of Computer Programs",
    "Computer Networks",
    "Database System Concepts",
    "Operating System Concepts",
    "Compilers: Principles, Techniques, and Tools",
    "Deep Learning",
    "Computer Architecture: A Quantitative Approach",
    "The C Programming Language",
    "Python Crash Course",
    "Introduction to Machine Learning with Python",
    "Patterns of Enterprise Application Architecture",
    "Algorithms Unlocked",
    "Engineering Mechanics: Dynamics",
    "Fundamentals of Thermodynamics",
    "Mechanical Engineering Design",
    "Materials Science and Engineering: An Introduction",
    "Fluid Mechanics",
    "Mechanical Vibrations",
    "Introduction to Finite Elements in Engineering",
    "Heat and Mass Transfer: Fundamentals and Applications",
    "Engineering Mechanics: Statics",
    "Theory of Machines and Mechanisms",
    "Fundamentals of Machine Component Design",
    "Advanced Engineering Mathematics",
    "Mechanical Behavior of Materials",
    "Introduction to Robotics: Mechanics and Control",
    "Principles of Heat Transfer",
    "Fundamentals of Fluid Mechanics",
    "Engineering Vibrations",
    "Mechanics of Materials",
    "Introduction to Engineering Experimentation",
    "Mechanics of Composite Materials",
    "Electrical Engineering: Principles and Applications",
    "Fundamentals of Electric Circuits",
    "Power System Analysis and Design",
    "Microelectronic Circuits",
    "Digital Design: With an Introduction to the Verilog HDL",
    "Signals and Systems",
    "Control Systems Engineering",
    "Electric Machinery Fundamentals",
    "Electromagnetic Fields and Waves",
    "Communication Systems",
    "Power Electronics: Converters, Applications, and Design",
    "Digital Signal Processing: Principles, Algorithms, and Applications",
    "Electric Power Systems: A First Course",
    "Analog Integrated Circuit Design",
    "Electromagnetics for Engineers",
    "Modern Control Engineering",
    "Fundamentals of Applied Electromagnetics",
    "Introduction to Electric Circuits",
    "Principles of Power Systems",
    "Introduction to Wireless and Mobile Systems",
    "Principles of Foundation Engineering",
    "Structural Analysis",
    "Concrete Technology",
    "Water Resources Engineering",
    "Transportation Engineering and Planning",
    "Engineering Geology: An Environmental Approach",
    "Design of Reinforced Concrete",
    "Principles of Geotechnical Engineering",
    "Soil Mechanics in Engineering Practice",
    "Construction Planning, Equipment, and Methods",
    "Environmental Engineering: Fundamentals, Sustainability, Design",
    "Steel Design",
    "Hydrology and Hydraulic Systems",
    "Construction Project Management: A Practical Guide to Field Construction Management",
    "Structural Steel Design",
    "Geotechnical Engineering: Principles and Practices",
    "Masonry Structures: Behavior and Design",
    "Advanced Mechanics of Materials and Applied Elasticity",
    "Introduction to Transportation Engineering",
    "Bridge Engineering: Substructure Design",
    "Chemical Engineering: Principles and Practice",
    "Transport Processes and Separation Process Principles",
    "Chemical Engineering Design: Principles, Practice and Economics of Plant and Process Design",
    "Elements of Chemical Reaction Engineering",
    "Introduction to Chemical Engineering Thermodynamics",
    "Process Dynamics and Control",
    "Chemical Process Safety: Fundamentals with Applications",
    "Perry's Chemical Engineers' Handbook",
    "Biochemical Engineering Fundamentals",
    "Principles of Bioseparations Engineering",
    "Fundamentals of Momentum, Heat, and Mass Transfer",
    "Separation Process Principles",
    "Principles and Modern Applications of Mass Transfer Operations",
    "Chemical Engineering Kinetics",
    "Process Design: Principles and Practices",
    "Fluid Mechanics for Chemical Engineers",
    "Introduction to Catalysis and Industrial Catalytic Processes",
    "Chemical Engineering Fluid Mechanics",
    "Essentials of Chemical Reaction Engineering",
    "Principles of Chemical Engineering Processes: Material and Energy Balances",
    "Introduction to Quantum Mechanics",
    "Classical Mechanics",
    "Modern Physics for Scientists and Engineers",
    "Engineering Electromagnetics",
    "Thermodynamics: An Engineering Approach",
    "Optics",
    "Solid State Physics",
    "Statistical Physics",
    "Fundamentals of Photonics",
    "Nuclear Physics: Principles and Applications",
    "The Physics of Solids",
    "Introduction to Plasma Physics and Controlled Fusion",
    "An Introduction to Thermal Physics",
    "Introduction to Solid State Physics",
    "Applied Physics for Engineers",
    "Electronics and Communications for Scientists and Engineers",
    "Classical Electrodynamics",
    "Quantum Physics: A Fundamental Approach to Modern Physics",
    "The Feynman Lectures on Physics",
    "Computational Physics"
]

# Generate embeddings for all sentences
embeddings = [get_sentence_embedding(sentence) for sentence in sentences]

# Function to perform similarity search
def similarity_search(query, embeddings, sentences, top_k=3):
    query_embedding = get_sentence_embedding(query).reshape(1, -1)
    similarities = cosine_similarity(query_embedding, embeddings)[0]
    top_k_indices = similarities.argsort()[-top_k:][::-1]
    results = [(sentences[idx], float(similarities[idx])) for idx in top_k_indices]
    return results

@app.route('/similarity', methods=['POST'])
def similarity():
    data = request.get_json()
    query = data.get('query', '')
    results = similarity_search(query, embeddings, sentences)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
