# Intelligent Sales Automation & Lead Management System (MERN)

A premium, AI-powered lead management system built with the MERN stack. Features intelligent lead scoring, automated agent assignment, sales pipeline visualization, and an integrated AI chatbot.

## 🚀 Key Features

*   **Smart Lead Capture**: Capture leads from forms and store in MongoDB.
*   **AI Lead Scoring**: Automatically rank leads as Hot, Warm, or Cold based on engagement.
*   **Automated Assignment**: Assign leads based on Region, Expertise, and Workload.
*   **Follow-Up Automation**: Scheduled email reminders via node-cron.
*   **Sales Pipeline**: Drag-and-drop style Kanban board for lead tracking.
*   **Predictive Analytics**: Insights into conversion rates and revenue growth.
*   **AI Chatbot**: Qualification assistant powered by OpenAI.
*   **RBAC Security**: JWT auth with Admin and Sales Agent roles.

---

## 🛠️ Tech Stack

*   **Backend**: Node.js, Express, MongoDB (Mongoose)
*   **Frontend**: React.js (Vite), Tailwind CSS, Chart.js, Lucide Icons
*   **Logic**: Axios, Node-Cron, OpenAI API, Nodemailer

---

## 📦 Getting Started

### 1. Prerequisites
*   Node.js (v18+)
*   MongoDB (Compass or Atlas)
*   OpenAI API Key (Optional for chatbot)

### 2. Backend Setup
1.  Navigate to `/backend`
2.  Install dependencies: `npm install`
3.  Configure `.env` file (set MONGO_URI and OpenAI API Key)
4.  Seed sample data: `node data/seed.js`
5.  Start server: `node server.js`

### 3. Frontend Setup
1.  Navigate to `/frontend`
2.  Install dependencies: `npm install`
3.  Start dev server: `npm run dev`

---

## 📂 Folder Structure

```text
/backend
├── controllers/    # Route controllers
├── models/         # Mongoose schemas
├── routes/         # API endpoints
├── utils/          # Logic (Scoring, Logic, Scheduler)
└── data/           # Seeding script
/frontend
├── src/components  # Reusable UI elements
├── src/pages       # Dashboard, Leads, Pipeline
└── src/services    # API wrappers (Axios)
```

## 🔐 Authentication
*   **Admin**: admin@salesauto.com / password123
*   **Agent**: john@salesauto.com / password123
