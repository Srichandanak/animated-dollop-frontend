A clean interface to explore drug information, personalized for every user



Overview

Imagine asking a question about a medicine and instantly seeing a clear, beautiful answer on your screen.

This frontend is the face of the Drug Encyclopedia AI system — the part users interact with.
It takes complex medical responses from the backend and presents them in a way that is:

🧠 Easy to understand
🎯 Well-structured
🎨 Visually clean

Think of it as a translator between humans and medical data.


🎯 Purpose

The goal of this UI is to:

Provide a simple search experience
Display AI-generated drug explanations
Adapt responses based on user persona
Make complex information feel clear and approachable

✨ Key Features
🔍 Smart Search Interface
Users can ask natural language questions
Example:
“What are the side effects of ibuprofen?”

🎭 Persona Selection

Users can choose:

👩 Patient → Simple explanation
🎓 Student → Structured explanation
🩺 Clinician → Detailed technical answer

📊 Structured Result Display

Results are shown in organized sections:

Drug name
Explanation (AI-generated)
Supporting details

🧩 Modular Components

The UI is built using reusable components:

SearchBar → Input queries
ResultsList → Display multiple results
ResultCard → Show each drug response
Navbar → Navigation
Sidebar → Persona selection

Project Structure

<img width="373" height="780" alt="image" src="https://github.com/user-attachments/assets/c564bebe-1242-4bb2-bc07-efaa650f68b4" />

⚙️ Tech Stack
React → UI framework
Vite → Fast development and build tool
Tailwind CSS → Styling
JavaScript (ES6+) → Logic and interaction

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
🔌 Backend Connection

The frontend communicates with a FastAPI backend.

📄 Configure API URL

Inside src/api.js, set:

const BASE_URL = "https://your-backend-url.onrender.com";
🧪 Example Flow
User enters query
Selects persona
Clicks search
Request sent to backend
Response displayed in UI
🎨 UI Philosophy

This interface is designed with:

Clarity over complexity
Minimalism over clutter
Understanding over information overload
⚠️ Limitations
Depends on backend availability
No offline functionality
Limited error handling (can be improved)
🔮 Future Improvements
🌍 Multi-language support
🎤 Voice input
📱 Mobile optimization
📊 Query history tracking
🔄 Real-time loading indicators
🎓 Conceptual Insight

This frontend demonstrates:

Human-centered interface design
Integration with AI systems
Dynamic rendering of structured + unstructured data
💬 Final Thought

“Good design doesn’t just show information — it helps people understand it.”

This UI transforms AI-generated medical data into something users can read, trust, and act upon.
