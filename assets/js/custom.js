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
  });


fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(res => res.text())
  .then(data => {
    const countryCode = data.match(/loc=([A-Z]+)/)[1].toLowerCase();

    const flagUrl = `https://flagcdn.com/48x36/${countryCode}.png`;

    document.getElementById('visitor-info').innerHTML = `
      <img src="${flagUrl}" /> <span class="text-muted text-small">Posting From: </span> 
      <strong>${countryCode.toUpperCase()}</strong>
    `;
  });