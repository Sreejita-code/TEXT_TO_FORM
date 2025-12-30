🚀 AI Form Architect: Generative UI & Metadata Mapper
A powerful tool designed for marketing managers to bridge the gap between "intent" and "infrastructure." By typing a simple prompt, the system generates a fully functional, styled form and automatically maps user submissions to standardized meta-tags for clean data analytics.

✨ Key Features
Natural Language to UI: Uses Google Gemini (1.5 Flash) to interpret prompts and generate a structured JSON schema.

Dynamic Rendering: A lightweight frontend engine that builds HTML inputs, textareas, and labels on the fly.

Automatic Metadata Mapping: Every field is assigned a metaTag (e.g., identity, credential, insight) by the AI, ensuring data is organized regardless of how the field is labeled.

Persistence: Fully integrated with MongoDB Atlas for storing submissions.

Modern UI: Styled with Tailwind CSS for a sleek, responsive experience.

🛠️ Tech Stack
Frontend: HTML5, JavaScript (ES6+), Tailwind CSS (via CDN).

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Mongoose ODM).

AI Engine: Google Generative AI (Gemini SDK).

📂 Project Structure
Plaintext

form-gen-project/
├── server.js            # Node.js backend & AI orchestration
├── index.html           # Dynamic frontend & generator interface
├── .env                 # API keys and Database URI (gitignored)
├── package.json         # Project dependencies
└── README.md            # Documentation
🚀 Getting Started
1. Prerequisites
Node.js (v18 or higher)

A Google AI Studio API Key (Get it here)

A MongoDB Atlas Account (Create one here)

2. Installation
Clone the repository and install the dependencies:

Bash

git clone https://github.com/your-username/ai-form-architect.git
cd ai-form-architect
npm install
3. Environment Setup
Create a .env file in the root directory:

Plaintext

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/formBuilder?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
4. Run the Application
Start the backend server:

Bash

node server.js
Open index.html in your browser (use Live Server in VS Code or simply double-click the file).

📖 How It Works
The Schema Generation
When a user enters: "I need a doctors' conference registration with License Number," the AI returns:

JSON

{
  "formTitle": "Doctors' Conference",
  "fields": [
    { "id": "lic_no", "label": "Medical License Number", "type": "text", "metaTag": "credential" }
  ]
}
Data Mapping
Upon submission, the data is stored in MongoDB as a mapped object. This allows marketing teams to query by metaTag rather than specific field names, making it easy to aggregate data across different forms.

JSON

{
  "formTitle": "Doctors' Conference",
  "mappedData": {
    "lic_no": {
      "value": "MD-99201",
      "tag": "credential"
    }
  }
}
