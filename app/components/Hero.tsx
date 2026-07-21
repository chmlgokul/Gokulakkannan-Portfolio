"use client";

import { useEffect, useState } from "react";
import ProfileCircle from "./ProfileCircle";
import LockAnimation from "./LockAnimation";
import InfoRow from "./InfoRow";

const consoleMessages = [
  "Incoming Connection...",
  "Unknown Session...",
  "Initializing AI Core...",
  "Verifying Identity...",
  "Secure Session Established ✓",
];

export default function Hero() {
  const [verified, setVerified] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showLock, setShowLock] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [progress, setProgress] = useState(0);

  // Console Animation
  useEffect(() => {
    if (!showConsole) return;

    let msgIndex = 0;
    let bar = 0;

    const progressTimer = setInterval(() => {
      bar += 2;

      if (bar > 100) bar = 100;

      setProgress(bar);
    }, 40);

    const messageTimer = setInterval(() => {
      msgIndex++;

      if (msgIndex < consoleMessages.length) {
        setCurrentMessage(msgIndex);
      } else {
        clearInterval(messageTimer);
        clearInterval(progressTimer);

        setTimeout(() => {
          setShowConsole(false);
          setShowLock(true);

          // Wait Lock Animation

          setTimeout(() => {
            setShowLock(false);
            setShowPortfolio(true);

            // Voice can be played here later

            // const audio = new Audio("/audio/intro_speech_audio.mp3");
            // audio.play();

          }, 2500);

        }, 800);
      }

    }, 900);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };

  }, [showConsole]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center py-16 px-6">

      {/* ---------------- TITLE ---------------- */}

      <h1 className="text-5xl font-extrabold text-green-700 mb-4 tracking-widest">
        GOKULAKKANNAN
      </h1>

      <p className="text-green-500 text-lg mb-10">
        Data Science • Machine Learning • Computer Vision
      </p>

      {/* ---------------- BEFORE CLICK ---------------- */}

      {!verified && !showConsole && !showPortfolio && (
        <>
          <ProfileCircle
            onClick={() => {
              setVerified(true);
              setShowConsole(true);
            }}
          />

          <p className="text-green-400 mt-6 tracking-wider">
            Click to Initialize AI Console
          </p>
        </>
      )}

      {/* ---------------- SECURITY CONSOLE ---------------- */}

      {showConsole && (
        <div className="w-full max-w-2xl rounded-xl border border-green-700 bg-black/80 p-8 shadow-[0_0_40px_rgba(34,197,94,0.15)]">

          <h2 className="text-center text-green-400 text-xl font-bold tracking-[6px] mb-8">
            AI SECURITY CONSOLE v2.6
          </h2>

          <div className="space-y-5 font-mono text-green-400">

            {consoleMessages.map((msg, index) => (

              <div
                key={msg}
                className={`transition-all duration-700 ${
                  index <= currentMessage
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                ● {msg}
              </div>

            ))}

          </div>

          {/* Progress Bar */}

          <div className="mt-10">

            <div className="h-2 rounded-full bg-green-900 overflow-hidden">

              <div
                className="h-full bg-green-500 transition-all duration-100"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="flex justify-between mt-3 text-xs text-green-600 font-mono">
              <span>INITIALIZING</span>
              <span>{progress}%</span>
            </div>

          </div>

        </div>
      )}

      {/* ---------------- LOCK ANIMATION ---------------- */}

      {showLock && (
        <>
          <LockAnimation />

          <p className="mt-6 text-green-400 tracking-widest animate-pulse">
            Authentication Successful
          </p>
        </>
      )}

      {/* ---------------- PORTFOLIO ---------------- */}

      {showPortfolio && (
        <div className="w-full max-w-6xl space-y-8">



          <InfoRow
  title="ABOUT"
  content={`> Identity Verified

> Role
AI Developer

> Experience
8 Years Professional VFX Experience

> Career Transition
Transitioning from VFX to Artificial Intelligence

> Core Technologies
Python
TensorFlow
OpenCV
SQL
Streamlit

> Focus Areas
Machine Learning
Deep Learning
Computer Vision

> Mission
Build intelligent AI applications
that solve real-world problems
through Artificial Intelligence.`}
  delay={0}
/>

         <InfoRow
  title="PROJECTS"
  content={`> AI Project Repository

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[01] IMDB Movie Data Scraping
Status      : Completed
Duration    : 2026
Tech Stack  : Python, Selenium, Pandas, SQL,
              Streamlit, Plotly
Features    :
 • Automated Data Scraping
 • Data Cleaning
 • Interactive Dashboard
 • Data Visualization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[02] Fish Image Classification
Status      : Completed
Duration    : 2026
Tech Stack  : Python, TensorFlow, Keras,
              OpenCV, Streamlit
Features    :
 • Image Classification
 • Deep Learning Model
 • Fish Species Prediction
 • AI-Based Recognition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[03] AI Cricket Shot Analyzer
Status      : In Progress
Start Date  : 2026
End Date    : Ongoing
Tech Stack  : Python, OpenCV,
              MediaPipe, Computer Vision
Features    :
 • Pose Estimation
 • Batting Shot Analysis
 • Performance Feedback
 • AI Motion Tracking

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[04] Smart Security Helmet AI
Status      : In Progress
Start Date  : July 2026
End Date    : Ongoing
Tech Stack  : Python, YOLO,
              OpenCV, OCR, ESP32
Features    :
 • Vehicle Detection
 • Number Plate Recognition
 • Traffic Violation Detection
 • Smart Alert System

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[05] Ferry Capacity Utilization &
     Operational Efficiency
     Analytics System

Status      : Completed
Duration    : 2026
Tech Stack  : Python, Pandas,
              SQL, Power BI,
              Streamlit
Features    :
 • Capacity Utilization Analysis
 • Operational KPI Dashboard
 • Route Performance Analytics
 • Business Intelligence Reports

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repository Status : Active
Projects          : 5
Focus             : AI • ML • Computer Vision
`}
  delay={0.4}
/>

          <InfoRow
  title="EXPERIENCE"
  content={`> Career Timeline

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Role
AI / Data Science Aspirant

Status      : Career Transition
Experience  : Fresher
Focus       : Machine Learning
              Deep Learning
              Computer Vision
              Data Science

Learning    :
 • Python
 • SQL
 • TensorFlow
 • OpenCV
 • Streamlit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Professional Experience

Industry    : VFX & Animation

Role        : Matchmove Artist
Experience  : 6 Years

Specialization :
 • Camera Tracking
 • Object Tracking
 • 3D Matchmoving
 • Scene Reconstruction
 • Maya Integration

Software :
 • 3DEqualizer
 • Autodesk Maya
 • Adobe Photoshop

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Career Objective

Transitioning from
Visual Effects Industry
to Artificial Intelligence,
Machine Learning and
Computer Vision by building
real-world AI applications.

Current Status : Open to
AI / ML / Data Science Roles
`}
  delay={0.6}
/>

          <InfoRow
  title="EDUCATION"
  content={`> Academic Records

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

B.Sc Computer Science

University :
Alagappa University

Year :
2020-2022

Grade:
75%

Status :
Completed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

B.A VFX & Animation

University :
Mahatma Gandhi University

Year :
2013-2016

Grade:
70%

Status :
Completed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Data Science Program

Institute :
ProITBridge

Year :
2026-ongoing

Grade:
--%

Status :
Pursuing

Focus Areas :
 • Python
 • Machine Learning
 • Deep Learning
 • SQL
 • Computer Vision

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AI Developer Program

Institute :
TNSKILLS


Year :
2025-2026

Grade:
72%

Status :
Completed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Learning Status

Continuously building
AI projects and enhancing
Data Science skills.
`}
  delay={0.8}
/>

<InfoRow
  title="CONTACT"
  content={`> Contact Information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name

Gokulakkannan Lakshminarayanan

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email

your.email@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location

Tamil Nadu, India

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Availability

✔ Open to Work

✔ Immediate Joiner

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Preferred Roles

• AI Engineer

• Data Scientist

• Machine Learning Engineer

• Computer Vision Engineer
`}
  delay={1.0}
/>

<InfoRow
  title="PROFILES"
  content={`> Professional Profiles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LinkedIn

https://www.linkedin.com/in/gokulakkannanl/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub

https://github.com/chmlgokul/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Portfolio

AI Interactive Portfolio

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status

✔ All Links Active
`}
  delay={1.2}
/>



<div className="flex justify-center gap-4 mt-8">
  <a
    href="/resume/Gokulakkannan_Resume.pdf"
    target="_blank"
    className="w-32 rounded-lg border border-green-500 px-4 py-2 text-center hover:bg-green-500/10"
  >
    📄 View
  </a>

  <a
    href="/resume/Gokulakkannan_Resume.pdf"
    download
    className="w-32 rounded-lg border border-green-500 px-4 py-2 text-center hover:bg-green-500/10"
  >
    ⬇ Download
  </a>
</div>

        </div>
      )}

    </main>
  );
}