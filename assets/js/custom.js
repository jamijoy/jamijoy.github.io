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