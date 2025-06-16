AdScribe.AI - MERN (Secure Version)
This repository contains the MERN stack version of the AdScribe.AI application. This version has been refactored to be secure and serves as a test case for a university research project evaluating the effectiveness of secure coding practices and SAST (Static Analysis Security Testing) tools.

Application Purpose
AdScribe.AI is a simple marketing tool that uses the OpenAI API to generate compelling product descriptions based on a product name and user-provided keywords.

Research Context: The Security Fix
The purpose of this repository is to demonstrate the correct, secure method for handling secrets in a Node.js application.

The vulnerability present in the "unsecure" version (a hardcoded API key) has been mitigated by using environment variables. The secret key is now loaded from a .env file at runtime and is never exposed in the source code. The .env file is explicitly ignored by .gitignore to prevent it from ever being committed to version control. This build is used to verify that security scanning tools no longer detect the hardcoded secret vulnerability.

How to Run This Application
This is a standard MERN stack application with a React frontend and a Node.js/Express backend.

Prerequisites
Node.js and npm installed.

An active OpenAI API key.

Instructions
Clone the repository:

git clone <repository-url>

Create the .env file:

Navigate to the backend/ directory.

Create a new file and name it exactly .env.

Inside the .env file, add the following line, replacing the placeholder with your actual OpenAI API key:

OPENAI_API_KEY='sk-YourActualKeyHere'

Install Dependencies:

In a terminal, navigate to the backend/ folder and run npm install.

In a second terminal, navigate to the frontend/ folder and run npm install.

Run the Application:

In your backend terminal, run npm start. The backend will run on http://localhost:5001.

In your frontend terminal, run npm start. The application will open in your browser at http://localhost:3000.
