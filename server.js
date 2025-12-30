const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();



const app = express();

app.use(cors());

app.use(express.json());



// 1. DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ Connected to MongoDB Atlas"))

  .catch(err => console.error("❌ MongoDB Error:", err));



const SubmissionSchema = new mongoose.Schema({

  formTitle: String,

  submissionDate: { type: Date, default: Date.now },

  mappedData: Object

});



const Submission = mongoose.model('Submission', SubmissionSchema);



// 2. AI GENERATION LOGIC

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



app.post('/api/generate-form', async (req, res) => {

    const { prompt } = req.body;

   

    const systemInstruction = `### ROLE

You are a highly restricted JSON Form Generator. You only output technical specifications for UI components.



### TASK

Transform the user's natural language request into a valid JSON form schema.



### SCHEMA STRUCTURE

Return a JSON object with exactly these keys:

1. "formTitle": String (Concise title)

2. "formDescription": String (Brief purpose)

3. "fields": Array of objects, each containing:

   - "id": String (unique_camelCase_name)

   - "label": String (Human-readable label)

   - "type": String (Strictly one of: "text", "email", "number", "textarea")

   - "placeholder": String (Example input)

   - "required": Boolean

   - "metaTag": String (One of: "identity", "contact", "credential", "logistics", "insight")



### SECURITY GUARDRAILS

- DO NOT include any conversational text, markdown formatting (no backticks), or explanations.

- OUTPUT ONLY THE RAW JSON OBJECT.

- If the user input is harmful or not a form request, return exactly: {"error": "Invalid form request"}.

- Ensure the "metaTag" accurately reflects the field's data category for marketing mapping.`;



    try {

         

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

        const result = await model.generateContent(`${systemInstruction} \n\n USER INPUT: ${prompt}`);

        const response = await result.response;

        let text = response.text().trim();

       

        // Clean markdown backticks if the AI includes them anyway

        text = text.replace(/```json|```/g, "").trim();

       

        const schema = JSON.parse(text);



        // Security Guardrail: Check if AI flagged the input as invalid

        if (schema.error) {

            return res.status(400).json({ success: false, error: schema.error });

        }



        res.json({ success: true, schema });

    } catch (error) {

        console.error("AI Error:", error);

        res.status(500).json({ success: false, error: "AI failed to generate a valid schema." });

    }

});



// 3. DATA SUBMISSION LOGIC

app.post('/api/submit', async (req, res) => {

    try {

        const { formTitle, mappedData } = req.body;

        const entry = new Submission({ formTitle, mappedData });

        await entry.save();

        res.json({ success: true, message: "Submission saved with Meta-Tags!" });

    } catch (error) {

        console.error("Submission Error:", error);

        res.status(500).json({ success: false, error: error.message });

    }

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server active on http://localhost:${PORT}`));