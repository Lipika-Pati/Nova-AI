# 🤖 Nova AI Chatbot

Nova AI is an AI-powered chatbot developed using Flask, Spring Boot, HTML, CSS, JavaScript, and Groq LLM. It provides intelligent conversational responses through a modern, responsive, and interactive user interface.

The project combines a Python-based AI chatbot service with a Java Spring Boot backend, making it scalable and suitable for future enhancements such as authentication, database integration, and advanced AI features.

---

## 🚀 Features

* AI-Powered Chatbot using Groq LLM
* Intelligent Conversational Responses
* Voice Input (Speech Recognition)
* Chat History Storage (Local Storage)
* New Chat Functionality
* Clear Chat Option
* Dark / Light Mode
* Download Chat as TXT File
* File Attachment Support (UI)
* Typing Animation
* Responsive and Modern User Interface
* REST API Integration
* Spring Boot Backend Support

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### AI Service

* Python
* Flask
* Flask-CORS
* Groq API
* Llama 3.3 70B Versatile

### Backend

* Java
* Spring Boot
* Spring Web
* Maven
* REST APIs

---

## 📂 Project Structure

```text
Nova-AI/

├── backend/
│   └── src/
│
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   └── index.html
│
├── app.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/Lipika-Pati/Nova-AI.git

cd Nova-AI
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Create Environment File

Create a `.env` file:

```env
GROQ_API_KEY=your_api_key_here
```

### 4. Run Flask Application

```bash
python app.py
```

Application URL:

```text
http://127.0.0.1:5000
```

### 5. Run Spring Boot Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

---

## 🔒 Security

* API keys are stored securely using environment variables.
* Sensitive credentials are excluded from GitHub.
* No API keys are hardcoded in the repository.

---

## 👩‍💻 Developer

### Lipika Pati


---

## 📌 Future Enhancements

* Resume Analyzer
* Interview Preparation Mode
* Real-Time Web Search
* PDF Analysis
* Image Understanding
* User Authentication
* Database Integration
* Multi-Language Support
* User Profile Management

---

## ⭐ Contribution

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to GitHub
5. Create a Pull Request

---

## 📄 License

This project is developed for educational, learning, and portfolio purposes.
