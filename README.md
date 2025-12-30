🚀 AI Form Architect: Generative UI & Metadata Mapper
A powerful tool designed for marketing managers and developers to bridge the gap between "intent" and "infrastructure." By typing a simple prompt, the system generates a fully functional, styled form and automatically maps user submissions to standardized meta-tags for clean, structured data analytics.

✨ Key Features
Natural Language to UI: Leverages Google Gemini (2.5 Flash) to interpret intent and generate structured JSON schemas for form generation.

Dynamic Rendering Engine: A lightweight frontend architecture that builds HTML inputs, textareas, and labels on the fly based on AI-generated schemas.

Automatic Metadata Mapping: Every field is intelligently assigned a metaTag (e.g., identity, credential, insight), ensuring data is organized regardless of how the field is labeled.

Data Persistence: Fully integrated with MongoDB Atlas for secure storage and easy retrieval of form submissions.

Modern UI/UX: Built with a "Mobile-First" approach using Tailwind CSS for a sleek, responsive experience.

🛠️ Tech Stack
Frontend: HTML5, JavaScript (Vanilla ES6+), Tailwind CSS (via CDN).

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Mongoose ODM).

AI Engine: Google Generative AI (Gemini SDK).

📂 Project Structure
Plaintext

TEXT_TO_FORM/
├── public/              # Static assets and frontend
│   ├── index.html       # UI for the generator & dynamic forms
│   └── script.js        # Logic for frontend rendering
├── models/              # Database Schemas
│   └── FormSubmission.js # Mongoose schema for mapped data
├── .env                 # API keys and Database URI (gitignored)
├── server.js            # Node.js backend & AI orchestration
├── package.json         # Project dependencies
└── README.md            # Documentation
🚀 Getting Started
1. Prerequisites
Node.js (v18 or higher)

Google AI Studio API Key

MongoDB Atlas Account

2. Installation
Bash

git clone https://github.com/Sreejita-code/TEXT_TO_FORM.git
cd TEXT_TO_FORM
npm install
3. Environment Setup
Create a .env file in the root directory and add your credentials:

Plaintext

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/formBuilder
GEMINI_API_KEY=your_gemini_api_key_here
4. Run the Application
Bash

# Start the server
node server.js
Open your browser and navigate to http://localhost:5000.

📖 How It Works
The Schema Generation
When a user enters: "I need a doctors' conference registration with License Number," the AI processes the request and returns a JSON schema:

JSON

{
  "formTitle": "Doctors' Conference",
  "fields": [
    { "id": "lic_no", "label": "Medical License Number", "type": "text", "metaTag": "credential" }
  ]
}
Data Mapping & Analytics
Upon submission, data is stored in MongoDB as a mapped object. This allows teams to query by metaTag rather than specific field names, making it easy to aggregate data across hundreds of different forms.
