// Chatbot State Machine
const STATE = {
  ASK_NAME: 0,
  ASK_ROLE: 1,
  ASK_EXPERIENCE: 2,
  ASK_EDUCATION: 3,
  ASK_SKILLS: 4,
  CONFIRM: 5,
  GENERATING: 6,
  FINISH: 7
};

let currentState = STATE.ASK_NAME;
let userData = {
  name: '',
  role: '',
  experience: '',
  education: '',
  skills: ''
};

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

function generateResumeHTML(data) {
  return `
<div class="resume-preview animate-fade-in">
  <div class="resume-header">
    <div>
      <h1>${data.name ? data.name.toUpperCase() : 'PROFESSIONAL'}</h1>
      <p>${data.role || 'Professional Role'}</p>
    </div>
  </div>

  <h3>Professional Summary</h3>
  <p>Driven and dedicated professional with a focus on ${data.role || 'achieving excellence'}. Demonstrated expertise in leveraging key skills to deliver outstanding results. Passionate about continuous improvement and contributing to organizational success.</p>

  <h3>Experience</h3>
  <div class="job-title">Career Highlights</div>
  <p style="white-space: pre-line;">${data.experience || 'Experience details...'}</p>

  <h3>Education</h3>
  <div class="job-title">Academic History</div>
  <p style="white-space: pre-line;">${data.education || 'Education details...'}</p>

  <h3>Skills & Competencies</h3>
  <p style="white-space: pre-line;">${data.skills || 'Skills...'}</p>
</div>

<div class="resume-actions animate-fade-in" style="animation-delay: 0.5s;">
  <button class="btn btn-secondary" onclick="alert('Downloading PDF to your device...')">Download PDF</button>
  <button class="btn btn-secondary" onclick="alert('Saved! Profile updated successfully.')">Save to Profile</button>
  <button class="btn btn-primary" onclick="window.location.href='jobs.html'">Find Matched Jobs ✨</button>
</div>
`;
}

function appendMessage(text, sender, isHTML = false, extraClasses = '') {
  const msgEl = document.createElement('div');
  msgEl.className = `message ${sender} ${extraClasses}`;
  
  if (isHTML) {
    msgEl.innerHTML = text;
  } else {
    msgEl.textContent = text;
  }
  
  chatWindow.appendChild(msgEl);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
  const el = document.createElement('div');
  el.classList.add('message', 'bot', 'typing');
  el.id = 'typing-indicator';
  el.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
  chatWindow.appendChild(el);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function simulateBotResponse(text, delay = 800, isHTML = false, extraClasses = '') {
  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    appendMessage(text, 'bot', isHTML, extraClasses);
    
    if (currentState === STATE.GENERATING) {
      setTimeout(() => {
        simulateBotResponse(generateResumeHTML(userData), 1500, true, 'bot-generated');
        currentState = STATE.FINISH;
      }, 1500);
    }
  }, delay);
}

// Initial Greeting
document.addEventListener('DOMContentLoaded', () => {
  simulateBotResponse("Hello! I'm your WTX Connect AI Career Assistant. I'm here to help you build a professional resume. To get started, what is your name?", 800);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = chatInput.value.trim();
  if (!val) return;
  
  // User says
  appendMessage(val, 'user');
  chatInput.value = '';
  
  // Bot logic
  if (currentState === STATE.ASK_NAME) {
    userData.name = val;
    currentState = STATE.ASK_ROLE;
    simulateBotResponse(`Nice to meet you, ${userData.name}! What type of role or job title are you seeking?`);
  } 
  else if (currentState === STATE.ASK_ROLE) {
    userData.role = val;
    currentState = STATE.ASK_EXPERIENCE;
    simulateBotResponse(`Got it. Tell me a bit about your past work experience related to the ${userData.role} role.`);
  }
  else if (currentState === STATE.ASK_EXPERIENCE) {
    userData.experience = val;
    currentState = STATE.ASK_EDUCATION;
    simulateBotResponse(`Great experience! Now, could you share your educational background or any relevant certifications?`);
  }
  else if (currentState === STATE.ASK_EDUCATION) {
    userData.education = val;
    currentState = STATE.ASK_SKILLS;
    simulateBotResponse(`Excellent. What are your key skills or tools that you specialize in?`);
  }
  else if (currentState === STATE.ASK_SKILLS) {
    userData.skills = val;
    currentState = STATE.CONFIRM;
    simulateBotResponse(`Awesome! Based on the information you provided, would you like me to generate your fully formatted professional resume now?`);
  }
  else if (currentState === STATE.CONFIRM) {
    currentState = STATE.GENERATING;
    chatInput.disabled = true;
    sendBtn.disabled = true;
    chatInput.placeholder = "Generating AI Profile...";
    simulateBotResponse("Generating your optimized profile and formatting your resume...", 1000);
  }
});
