# Sai Kiran Avusula - Java Full Stack Portfolio

A high-performance, visually stunning portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**. This project features a modern UI with smooth animations and a unique **AI Assistant** powered by Google's Gemini API (`gemini-2.5-flash`) that acts as a personal representative to answer visitor questions.

## 🚀 Features

- **AI Chat Assistant**: Embedded chatbot powered by Google Gemini to answer questions about skills, experience, and projects contextually.
- **Interactive UI**: Smooth scrolling, glassmorphism effects, and entrance animations using **Framer Motion**.
- **Data Visualization**: Radar charts for skill proficiency using **Recharts**.
- **Responsive Design**: Fully responsive layout optimized for mobile and desktop.
- **Project Filtering**: Categorized view of projects (Backend, Frontend, Full Stack, AI).
- **Timeline**: Visual representation of professional experience.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI SDK**: @google/genai

## 📦 Installation & Setup

Follow these steps to run the project locally.

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

### 2. Install Dependencies

```bash
# Install project dependencies
npm install
```

### 3. Environment Configuration

To enable the AI Chat feature, you need to configure your API key.

1. Create a `.env` file in the root directory.
2. Add your Google Gemini API key:

```env
VITE_API_KEY=your_actual_api_key_here
```

*> **Note**: Ensure `services/geminiService.ts` is configured to read this variable (e.g., via `import.meta.env.VITE_API_KEY` for Vite projects).*

### 4. Run Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 📂 Project Structure

- **`src/components/`**: UI components (Navbar, Hero, Skills, Chat, etc.).
- **`src/services/`**: API integration logic (Gemini Service).
- **`src/constants.ts`**: Centralized data file. **Edit this file** to update your Resume details, Projects, Skills, and AI System Instructions.
- **`src/types.ts`**: TypeScript interfaces for type safety.

## 🤖 Customizing the AI

To change how the AI behaves or what it knows about you, navigate to `src/constants.ts` and modify the `SYSTEM_INSTRUCTION` constant. This string serves as the prompt for the Gemini model.

## 📄 License

This project is open source and available under the MIT License.
