# 💼 Job Portal Web Application (MERN Stack + Clerk Auth)

Excited to share my latest full-stack **Job Portal Web Application** — a modern platform for **job seekers** and **recruiters**, built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), with secure **Clerk authentication** and a sleek **Tailwind CSS** UI.

---

## 🚀 Live Demo  
🔗 **[Visit the Deployment](https://job-portal-client-sigma-virid.vercel.app/)**  

---

## 🧠 Overview  
This Job Portal is designed to simplify the hiring process for both job seekers and recruiters.  
It provides a seamless and secure environment to post, apply, and manage job listings — all from one place.

---

## 👨‍💻 Features

### 👩‍🔬 For Job Seekers:
- 🔍 Search and filter job openings in real-time  
- 📄 Apply directly through the portal  
- 📁 Upload and manage resumes via personal profiles  
- 🔐 Seamless and secure user authentication powered by **Clerk**

### 🧑‍💼 For Recruiters:
- 🖥️ Dedicated **Recruiter Dashboard**  
- ➕ Post new job openings and manage active listings  
- 👀 View applicants and their resumes  
- ✅ Accept or ❌ reject applications easily  

---

## 🧩 Tech Stack

| Layer | Technologies Used |
|-------|--------------------|
| 💻 Frontend | React.js, Tailwind CSS |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | MongoDB |
| 🔐 Authentication | Clerk |
| 🌐 Deployment | Vercel / Render / MongoDB Atlas |

---

## 🖼️ Screenshots



### 👤 Job Seeker Dashboard
![Jobseeker.jpeg](Job-Portal/assets/Jobseeker.jpeg)

### 🧑‍💼 Recruiter Dashboard
![Recuriter.jpeg](Job-Portal/assets/Recuriter.jpeg)



---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/job-portal.git
cd job-portal

# Install dependencies
npm install

# Navigate to backend folder and install dependencies
cd backend
npm install

# Create a .env file and add your environment variables
# Example:
# MONGO_URI=your_mongodb_connection_string
# CLERK_SECRET_KEY=your_clerk_secret_key
# PORT=5000

# Run the backend
npm start

# In another terminal, run the frontend
cd frontend
npm run dev
