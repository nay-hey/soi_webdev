from flask import Flask, jsonify, send_from_directory, request
from pymongo import MongoClient
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
sentences1 = [
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


desc = [
    "Comprehensive guide to algorithms with detailed explanations.",
    "Fundamental concepts and techniques in AI, covering a wide range of topics.",
    "Principles and best practices for writing clean, maintainable code.",
    "Classic book on design patterns for software development.",
    "Practical advice for becoming a better programmer.",
    "Detailed guide to software construction best practices.",
    "Comprehensive text on computational theory and complexity.",
    "Seminal work covering many aspects of computer science.",
    "Foundational text on computer science principles and programming.",
    "Detailed introduction to the principles and practice of computer networking.",
    "Comprehensive introduction to database systems.",
    "In-depth look at the design and implementation of operating systems.",
    "Authoritative guide on compiler construction.",
    "Comprehensive introduction to deep learning theory and practice.",
    "In-depth exploration of computer architecture with a quantitative approach.",
    "Classic book on C programming by the language's creators.",
    "Hands-on guide to programming with Python for beginners.",
    "Practical guide to applying machine learning with Python.",
    "Guide to building enterprise applications with design patterns.",
    "Accessible introduction to fundamental algorithms.",
    "Comprehensive guide to the principles of dynamics in engineering mechanics.",
    "Detailed introduction to thermodynamic principles and applications.",
    "In-depth look at design principles and practices in mechanical engineering.",
    "Comprehensive text on the fundamentals of materials science and engineering.",
    "Thorough exploration of fluid mechanics principles and applications.",
    "Detailed guide to the study of mechanical vibrations.",
    "Comprehensive introduction to finite element analysis and its applications.",
    "Fundamental concepts and applications of heat and mass transfer.",
    "Comprehensive guide to the principles of statics in engineering mechanics.",
    "Detailed study of the kinematics and dynamics of machines and mechanisms.",
    "Comprehensive text on the design of machine components.",
    "Essential mathematical concepts and techniques for engineering.",
    "In-depth exploration of the behavior of materials under different conditions.",
    "Comprehensive introduction to the mechanics and control of robots.",
    "Thorough exploration of heat transfer principles and applications.",
    "Comprehensive guide to fluid mechanics principles and practices.",
    "Detailed study of vibration analysis and its engineering applications.",
    "Comprehensive text on the mechanics and behavior of materials.",
    "Guide to the principles and practices of engineering experimentation.",
    "Comprehensive text on the mechanical behavior of composite materials.",
    "Comprehensive guide to fundamental principles and applications of electrical engineering.",
    "In-depth study of electric circuit theory and practice.",
    "Detailed introduction to power systems and their design.",
    "Comprehensive guide to the principles and applications of microelectronic circuits.",
    "Fundamentals of digital design and introduction to Verilog HDL.",
    "Introduction to the theory and application of signals and systems.",
    "Comprehensive guide to control systems and their applications.",
    "Detailed study of electric machinery and its operation.",
    "Introduction to electromagnetic theory and applications.",
    "Comprehensive guide to the principles of communication systems.",
    "Detailed introduction to power electronics and their applications.",
    "Comprehensive guide to the principles and applications of digital signal processing.",
    "Introductory guide to electric power systems and their operation.",
    "Comprehensive guide to the design of analog integrated circuits.",
    "Introduction to the principles and applications of electromagnetics for engineers.",
    "Comprehensive guide to modern control engineering principles and practices.",
    "Introductory guide to applied electromagnetics and its applications.",
    "Detailed introduction to electric circuit analysis and design.",
    "Comprehensive guide to the principles of power systems engineering.",
    "Introductory guide to the principles of wireless and mobile communication systems.",
    "Comprehensive guide to the principles and practices of foundation engineering.",
    "In-depth study of structural analysis methods and applications.",
    "Detailed introduction to concrete properties, production, and testing.",
    "Comprehensive text on water resources engineering and management.",
    "Fundamentals of transportation engineering and planning concepts.",
    "Introduction to the principles and applications of engineering geology.",
    "Comprehensive guide to the design principles of reinforced concrete structures.",
    "Detailed introduction to the principles of geotechnical engineering.",
    "Comprehensive text on the principles and applications of soil mechanics.",
    "Guide to the planning and methods of construction projects.",
    "Comprehensive guide to environmental engineering principles and sustainable design.",
    "Introduction to the principles and practices of structural steel design.",
    "Detailed study of hydrology and hydraulic engineering systems.",
    "Practical guide to the management of construction projects.",
    "Comprehensive text on the design of structural steel elements and systems.",
    "In-depth guide to the principles and practices of geotechnical engineering.",
    "Comprehensive guide to the behavior and design of masonry structures.",
    "Detailed study of advanced mechanics of materials and applied elasticity.",
    "Comprehensive guide to the fundamentals of transportation engineering.",
    "In-depth guide to the design principles of bridge substructures.",
    "Comprehensive guide to chemical engineering principles and industrial practice.",
    "Detailed introduction to transport processes and separation techniques.",
    "Guide to the principles and practices of chemical engineering design.",
    "Fundamentals of chemical reaction engineering and reactor design.",
    "Comprehensive text on the principles of chemical engineering thermodynamics.",
    "In-depth study of process dynamics and control strategies.",
    "Comprehensive guide to the fundamentals of chemical process safety.",
    "Essential reference for chemical engineering practice and principles.",
    "Detailed introduction to the principles and applications of biochemical engineering.",
    "Comprehensive guide to the principles and practices of bioseparations.",
    "Essential concepts and principles of momentum, heat, and mass transfer.",
    "Detailed study of the principles and techniques of separation processes.",
    "Comprehensive guide to the principles and applications of mass transfer.",
    "Fundamentals of chemical reaction kinetics and reactor design.",
    "Guide to the principles and practices of chemical process design.",
    "Detailed introduction to fluid mechanics principles and applications in chemical engineering.",
    "Comprehensive text on the principles and applications of catalysis.",
    "Guide to the principles and applications of fluid mechanics in chemical engineering.",
    "Fundamental principles and applications of chemical reaction engineering.",
    "Comprehensive guide to material and energy balance calculations in chemical processes.",
    "Fundamental principles and applications of quantum mechanics.",
    "Comprehensive guide to classical mechanics principles and applications.",
    "Introduction to the concepts and principles of modern physics.",
    "Detailed study of electromagnetics and its engineering applications.",
    "Fundamentals of thermodynamics with practical engineering applications.",
    "Comprehensive guide to the principles and applications of optics.",
    "Fundamental concepts and applications of solid state physics.",
    "Comprehensive introduction to statistical mechanics and its applications.",
    "In-depth study of photonics principles and applications.",
    "Introduction to nuclear physics principles and their practical applications.",
    "Comprehensive guide to the physics and properties of solid materials.",
    "Fundamentals of plasma physics and controlled nuclear fusion.",
    "Fundamental principles and applications of thermal physics.",
    "Comprehensive introduction to the principles of solid state physics.",
    "Practical applications of physics principles for engineering.",
    "Detailed introduction to electronics and communication systems.",
    "In-depth study of the principles and applications of classical electrodynamics.",
    "Fundamental principles of quantum physics with modern applications.",
    "Comprehensive collection of lectures covering fundamental physics concepts.",
    "Introduction to computational methods for solving physics problems."
]

genr = [
    "Algorithms",
    "Artificial Intelligence",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Software Engineering",
    "Computational Theory",
    "Algorithms",
    "Programming",
    "Networking",
    "Database Systems",
    "Operating Systems",
    "Compilers",
    "Machine Learning",
    "Computer Architecture",
    "Programming",
    "Programming",
    "Machine Learning",
    "Software Engineering",
    "Algorithms",
    "Dynamics",
    "Thermodynamics",
    "Design",
    "Materials Science",
    "Fluid Mechanics",
    "Vibrations",
    "Finite Element Analysis",
    "Heat Transfer",
    "Statics",
    "Mechanisms",
    "Design",
    "Mathematics",
    "Materials Science",
    "Robotics",
    "Heat Transfer",
    "Fluid Mechanics",
    "Vibrations",
    "Materials Science",
    "Experimentation",
    "Materials Science",
    "General Electrical Engineering",
    "Circuits",
    "Power Systems",
    "Microelectronics",
    "Digital Design",
    "Signals and Systems",
    "Control Systems",
    "Electric Machinery",
    "Electromagnetics",
    "Communication Systems",
    "Power Electronics",
    "Digital Signal Processing",
    "Power Systems",
    "Analog Design",
    "Electromagnetics",
    "Control Systems",
    "Electromagnetics",
    "Circuits",
    "Power Systems",
    "Wireless Communication",
    "Foundation Engineering",
    "Structural Engineering",
    "Materials Engineering",
    "Water Resources",
    "Transportation Engineering",
    "Geotechnical Engineering",
    "Structural Engineering",
    "Geotechnical Engineering",
    "Geotechnical Engineering",
    "Construction Management",
    "Environmental Engineering",
    "Structural Engineering",
    "Hydraulic Engineering",
    "Construction Management",
    "Structural Engineering",
    "Geotechnical Engineering",
    "Structural Engineering",
    "Materials Engineering",
    "Transportation Engineering",
    "Structural Engineering",
    "General Chemical Engineering",
    "Transport Processes",
    "Design",
    "Reaction Engineering",
    "Thermodynamics",
    "Process Control",
    "Safety",
    "Reference",
    "Biochemical Engineering",
    "Bioseparations",
    "Transport Processes",
    "Separation Processes",
    "Mass Transfer",
    "Reaction Engineering",
    "Design",
    "Fluid Mechanics",
    "Catalysis",
    "Fluid Mechanics",
    "Reaction Engineering",
    "Process Engineering",
    "Quantum Mechanics",
    "Classical Mechanics",
    "Modern Physics",
    "Electromagnetics",
    "Thermodynamics",
    "Optics",
    "Solid State Physics",
    "Statistical Physics",
    "Photonics",
    "Nuclear Physics",
    "Solid State Physics",
    "Plasma Physics",
    "Thermal Physics",
    "Solid State Physics",
    "Applied Physics",
    "Electronics",
    "Electrodynamics",
    "Quantum Physics",
    "General Physics",
    "Computational Physics"
]


dept = [
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Computer Science",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Chemical Engineering",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics",
    "Engineering Physics"
]

sentences=[]
for i in range(len(genr)):
    word=genr[i]+desc[i]+dept[i]+sentences1[i]
    sentences.append(word)
# Generate embeddings for all sentences
embeddings = [get_sentence_embedding(sentence) for sentence in sentences]

# Function to perform similarity search
def similarity_search(query, embeddings, sentences, top_k=9):
    query_embedding = get_sentence_embedding(query).reshape(1, -1)
    similarities = cosine_similarity(query_embedding, embeddings)[0]
    top_k_indices = similarities.argsort()[-top_k:][::-1]
    results=[]
    for idx in top_k_indices:
        if len(results) >= top_k:
            break
        if sentences1[idx].lower() not in query:
            results.append((sentences1[idx], float(similarities[idx])))
    return results
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['library']  # database name
collection = db['issues']

@app.route('/get_book_titles', methods=['GET'])
def get_book_titles():
    roll_number = request.args.get('rollNumber')
    if not roll_number:
        return jsonify({"error": "Roll number is required"}), 400

    # Convert roll number to the appropriate data type if needed
    try:
        roll_number = int(roll_number)  # Convert to integer if roll number is stored as an integer
    except ValueError:
        pass  # Keep it as a string if conversion fails


    # Fetch book titles from the issues collection filtered by the student's roll number
    book_titles = collection.distinct('bookId', {'rollno': roll_number})

    if not book_titles:
        return jsonify({"error": "No books found for this roll number"}), 404

    query = ""
    for title in book_titles:
        query += title.lower() + " "  # Ensure space between titles

    results = similarity_search(query.strip(), embeddings, sentences)
    return jsonify(results)

@app.route('/')
def serve_html():
    return send_from_directory('static', 'i1.html')

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)
