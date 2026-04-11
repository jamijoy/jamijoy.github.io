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