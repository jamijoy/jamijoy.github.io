fetch('/components/footer.html')
.then(response => response.text())
.then(data => {
  document.getElementById('footer').innerHTML = data;
});

fetch('/components/navbar.html')
.then(response => response.text())
.then(data => {
  document.getElementById('navbar').innerHTML = data;
});

fetch('/components/header.html')
.then(response => response.text())
.then(data => {
  document.getElementById('header').innerHTML = data;
});


$('#contact-msg-save-form').submit(function(e) {
  e.preventDefault();

  var formArray = $(this).serializeArray();
  var formData = {};

  formArray.forEach(function(field) {
    formData[field.name] = field.value;
  });

  // $(".error-message").classList.remove('d-block');
  $(".error-message").show();
  $(".error-message").innerHTML = 'Your response has been received. We will get back to you shortly!';

  $.ajax({
    type: 'POST',
    url: 'https://sms-service-scheduler-program.onrender.com/save-contact-form',
    data: JSON.stringify(formData),
    contentType: "application/json",
    success: function(response) {
      displayError(e, 'Your response has been received. We will get back to you shortly!');
      alert('Message sent successfully!');
    },
    error: function(err) {
      console.error(err);
    }
  });
});

fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ip-address').textContent = `Visitor IP: ${data.ip}`;
    localStorage.setItem("visitor-ip", `Visitor IP: ${data.ip}`);
  });


fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(res => res.text())
  .then(data => {
    const countryCode = data.match(/loc=([A-Z]+)/)[1].toLowerCase();

    const flagUrl = `https://flagcdn.com/48x36/${countryCode}.png`;

    // document.getElementById('visitor-info').innerHTML = `
    //   <img src="${flagUrl}" /> <span class="text-muted text-small">Posting From: </span> 
    //   <strong>${countryCode.toUpperCase()}</strong>
    // `;
  });

        // ════════════════════════════════════════════════
      //  CONFIG — edit these three values
      // ════════════════════════════════════════════════
      const WA_PHONE   = '8801521311767';           // your WhatsApp number (international format)
      const PROXY_URL  = 'https://YOUR-PROJECT.vercel.app/api/chat'; // your Vercel proxy URL
      const YOUR_NAME  = 'Jami Joy';               // displayed in chat header
      const INITIALS   = 'J';                      // avatar initials

      const SYSTEM_PROMPT = `You are a friendly AI assistant on ${YOUR_NAME}'s web & app development portfolio.

      Your job:
      - Answer questions about skills: HTML, CSS, JavaScript, React, Node.js, Next.js, etc.
      - Help visitors understand services, availability, and how to hire ${YOUR_NAME}
      - Collect contact messages and encourage visitors to send them via WhatsApp
      - Keep replies short and conversational (2–4 sentences max)
      - If asked about specific projects or pricing, say "Send a WhatsApp message for details and I'll get back to you personally!"
      - Be warm, professional, and encouraging`;

      // ════════════════════════════════════════════════
      //  State
      // ════════════════════════════════════════════════
      let history    = [];
      let isOpen     = false;
      let hasGreeted = false;

      // ════════════════════════════════════════════════
      //  DOM refs
      // ════════════════════════════════════════════════
      const window_el    = document.getElementById('wa-chat-window');
      const messages_el  = document.getElementById('wa-messages');
      const input_el     = document.getElementById('wa-input');
      const sendBtn      = document.getElementById('wa-send-btn');
      const toggleBtn    = document.getElementById('wa-toggle-btn');
      const closeBtn     = document.getElementById('wa-close-btn');
      const forwardBar   = document.getElementById('wa-forward-bar');
      const forwardBtn   = document.getElementById('wa-forward-btn');
      const statusEl     = document.getElementById('wa-status');
      const badge        = document.getElementById('wa-badge');
      const nameEl       = document.getElementById('wa-name');
      const avatarEl     = document.getElementById('wa-avatar');

      // Apply config
      nameEl.textContent   = "Jami Joy";
      avatarEl.textContent = "J";

      // ════════════════════════════════════════════════
      //  Helpers
      // ════════════════════════════════════════════════
      function addMsg(text, role) {
        const div = document.createElement('div');
        div.className = 'wa-msg ' + role;
        div.textContent = text;
        messages_el.appendChild(div);
        messages_el.scrollTop = messages_el.scrollHeight;
        return div;
      }

      function showTyping() {
        const div = document.createElement('div');
        div.className = 'wa-typing';
        div.id = 'wa-typing';
        div.innerHTML = '<div class="wa-dot"></div><div class="wa-dot"></div><div class="wa-dot"></div>';
        messages_el.appendChild(div);
        messages_el.scrollTop = messages_el.scrollHeight;
      }

      function removeTyping() {
        const t = document.getElementById('wa-typing');
        if (t) t.remove();
      }

      function buildWaText() {
        const lines = Array.from(messages_el.querySelectorAll('.wa-msg')).map(m => {
          const role = m.classList.contains('user') ? 'Visitor' : YOUR_NAME + ' (AI)';
          return role + ': ' + m.textContent;
        });
        return encodeURIComponent(
          '--- Chat from portfolio ---\n' + lines.join('\n') + '\n\n(sent via portfolio chatbot)'
        );
      }

      // ════════════════════════════════════════════════
      //  Open / close
      // ════════════════════════════════════════════════
      function openChat() {
      alert("Hello! Welcome to my portfolio chatbot. How can I assist you today?");
        isOpen = true;
        window_el.style.display = 'flex';
        badge.style.display = 'none';
        input_el.focus();
        if (!hasGreeted) {
          hasGreeted = true;
          addMsg('Hi there! I\'m the AI assistant for ' + YOUR_NAME + '\'s portfolio. Ask me anything about skills, services, or availability — or just leave a message!', 'bot');
        }
      }

      function closeChat() {
        isOpen = false;
        window_el.style.display = 'none';
      }

      toggleBtn.addEventListener('click', () => isOpen ? closeChat() : openChat());
      closeBtn.addEventListener('click', closeChat);

      // Show badge after 3s as a nudge
      setTimeout(() => {
        if (!isOpen) badge.style.display = 'flex';
      }, 3000);

      // ════════════════════════════════════════════════
      //  Send message
      // ════════════════════════════════════════════════
      async function sendMessage() {
        const text = input_el.value.trim();
        if (!text || sendBtn.disabled) return;
        input_el.value = '';

        addMsg(text, 'user');
        history.push({ role: 'user', content: text });

        if (history.length >= 4) forwardBar.style.display = 'block';

        statusEl.textContent = 'typing…';
        sendBtn.disabled = true;
        showTyping();

        try {
          const res = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: history, system: SYSTEM_PROMPT })
          });

          if (!res.ok) throw new Error('HTTP ' + res.status);

          const data = await res.json();
          removeTyping();

          const reply = (data.content || []).map(b => b.text || '').join('').trim()
                      || 'Sorry, I had a hiccup. Please try again or send a WhatsApp message!';

          history.push({ role: 'assistant', content: reply });
          addMsg(reply, 'bot');
          statusEl.textContent = 'AI assistant · online';

        } catch (err) {
          removeTyping();
          addMsg('Oops — connection issue. You can reach me directly on WhatsApp using the button below!', 'error');
          forwardBar.style.display = 'block';
          statusEl.textContent = 'AI assistant · online';
          console.error('Chatbot error:', err);
        }

        sendBtn.disabled = false;
        input_el.focus();
      }

      sendBtn.addEventListener('click', sendMessage);
      input_el.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

      // WhatsApp forward
      forwardBtn.addEventListener('click', () => {
        window.open('https://wa.me/' + WA_PHONE + '?text=' + buildWaText(), '_blank');
      });