function toggleNav(btn) {
  var isOpen = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isOpen));
  document.getElementById('primary-nav').classList.toggle('nav-open', !isOpen);
  btn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
}

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending\u2026';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.innerHTML = '<div class="form-thankyou"><p>Thank you! We\'ll be in touch soon.</p></div>';
      } else {
        btn.disabled = false;
        btn.textContent = 'Contact Us';
        alert('Something went wrong \u2014 please email us directly at pendingcircus@gmail.com');
      }
    }).catch(function () {
      btn.disabled = false;
      btn.textContent = 'Contact Us';
      alert('Something went wrong \u2014 please email us directly at pendingcircus@gmail.com');
    });
  });
})();
