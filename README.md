AdScribe.AI - MERN (Vulnerable Version)
This repository contains the MERN stack version of the AdScribe.AI application. This version is intentionally vulnerable and serves as a test case for a university research project evaluating the effectiveness of secure coding practices and SAST (Static Analysis Security Testing) tools.

Application Purpose
AdScribe.AI is a simple marketing tool that uses the OpenAI API to generate compelling product descriptions based on a product name and user-provided keywords.

Research Context: The Vulnerability
The primary purpose of this repository is to demonstrate an unsecure but common coding practice: hardcoded secrets.

In this application, the OPENAI_API_KEY is written directly into the backend source code (backend/server.js). This is a significant security risk because it exposes the secret to anyone with access to the codebase and makes it visible in the version control history. This build is used to test whether security scanning tools can successfully detect this type of vulnerability.

How to Run This Application
This is a standard MERN stack application with a React frontend and a Node.js/Express backend.

Prerequisites
Node.js and npm installed.

An active OpenAI API key.

Instructions
Clone the repository:

git clone <repository-url>

Set the API Key:

Navigate to the backend/ directory.

Open the server.js file.

Find the line const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; and replace the placeholder with your actual OpenAI API key.

Install Dependencies:

In a terminal, navigate to the backend/ folder and run npm install.

In a second terminal, navigate to the frontend/ folder and run npm install.

Run the Application:

In your backend terminal, run npm start. The backend will run on http://localhost:5001.

In your frontend terminal, run npm start. The application will open in your browser at http://localhost:3000.
