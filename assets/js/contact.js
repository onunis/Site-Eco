document.addEventListener("DOMContentLoaded", function() {
  emailjs.init("XNDcBOR6f8GYqr3G0");

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value
      };

      emailjs.send('eco_site', 'template_fnhe55x', formData) 
          .then(function(response) {
              alert('Mensagem enviada com sucesso!', response.status, response.text);
              contactForm.reset(); 
          }, function(error) {
              alert('Ocorreu um erro ao enviar a mensagem.', error);
          });
  });
});
