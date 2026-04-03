Drug Encyclopedia UI
A clean interface to explore drug information, personalized for every user
🌟 Overview

The Drug Encyclopedia UI is a modern frontend application that allows users to explore drug-related information through an AI-powered backend.

Instead of presenting raw medical data, this interface transforms complex responses into structured, readable, and user-friendly content.

It acts as a bridge between:

🧠 AI-generated medical insights
👤 Human understanding
🎯 Purpose

This project is designed to:

🔍 Provide an intuitive search experience
🤖 Display AI-generated drug explanations
🎭 Personalize responses based on user persona
📊 Present structured and easy-to-read information
✨ Key Features
🔍 Smart Search Interface
Supports natural language queries
Example:
What are the side effects of ibuprofen?
🎭 Persona-Based Responses

Users can customize how information is presented:

Persona	Description
👩 Patient	Simple, easy-to-understand explanations
🎓 Student	Structured and educational content
🩺 Clinician	Detailed, technical medical insights
📊 Structured Result Display

Each search result is organized into:

🧾 Drug Name
📖 Explanation (AI-generated)
📌 Supporting Details
🧩 Modular Component Architecture

Reusable UI components:

SearchBar → Handles user input
ResultsList → Displays multiple responses
ResultCard → Shows individual drug details
Navbar → Top navigation
Sidebar → Persona selection
🏗️ Project Structure
drug-encyclopedia-ui/
│
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── ResultsList.jsx
│   │   ├── ResultCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── api/
│   │   └── api.js
│   │
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
⚙️ Tech Stack
⚛️ React → UI framework
⚡ Vite → Fast build tool
🎨 Tailwind CSS → Styling
🧠 JavaScript (ES6+) → Logic & interaction
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/drug-encyclopedia-ui.git
cd drug-encyclopedia-ui
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev
4️⃣ Open in Browser
http://localhost:5173
🔌 Backend Integration

This frontend connects to a FastAPI backend for AI responses.

📄 Configure API URL

Edit:

src/api/api.js

Update:

const BASE_URL = "https://your-backend-url.onrender.com";
🧪 Example Workflow
User enters a query
Selects a persona
Clicks search
Request sent to backend API
Response rendered in structured UI
🎨 UI Philosophy
✅ Clarity over complexity
✅ Minimalism over clutter
✅ Understanding over information overload
⚠️ Limitations
❌ Depends on backend availability
❌ No offline support
❌ Basic error handling (needs improvement)
🔮 Future Improvements
🌍 Multi-language support
🎤 Voice input
📱 Mobile optimization
📊 Query history tracking
🔄 Real-time loading indicators
🎓 Conceptual Insight

This project demonstrates:

Human-centered interface design
AI + frontend integration
Dynamic rendering of structured & unstructured data
Personalized content delivery
💬 Final Thought

“Good design doesn’t just show information — it helps people understand it.”

👨‍💻 Author

Your Name
GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile