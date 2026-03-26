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
  alert('Form submitted!');
  e.preventDefault();
  var formData = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'https://sms-service-scheduler-program.onrender.com/save-contact-form',
    data: formData,
    contentType: "application/json",
    processData: false,
    success: function(response) {
      alert('Message sent successfully!');
    }
  });
});