   // Modal functionality
   const modal = document.getElementById('registrationModal');
   const registerBtns = document.querySelectorAll('#registerBtn, .register-main');
   const closeBtn = document.getElementById('closeModal');
   const cancelBtn = document.getElementById('cancelBtn');
   const form = document.getElementById('registrationForm');
   const submitBtn = document.getElementById('submitBtn');
   const dataConsent = document.getElementById('dataConsent');

   // Open modal
   registerBtns.forEach(btn => {
     btn.addEventListener('click', () => {
       modal.classList.add('active');
       document.body.style.overflow = 'hidden';
     });
   });

   // Close modal
   function closeModal() {
     modal.classList.remove('active');
     document.body.style.overflow = 'auto';
     form.reset();
     submitBtn.disabled = true;
   }

   closeBtn.addEventListener('click', closeModal);
   cancelBtn.addEventListener('click', closeModal);

   // Close on overlay click
   modal.addEventListener('click', (e) => {
     if (e.target === modal) {
       closeModal();
     }
   });

   // Close on Escape key
   document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && modal.classList.contains('active')) {
       closeModal();
     }
   });

   // Enable/disable submit button based on consent
   function checkFormValidity() {
     const requiredFields = form.querySelectorAll('input[required], textarea[required]');
     let allValid = true;
     
     requiredFields.forEach(field => {
       if (!field.value.trim()) {
         allValid = false;
       }
     });
     
     const consentChecked = dataConsent.checked;
     submitBtn.disabled = !(allValid && consentChecked);
   }

   // Add event listeners to form fields
   form.addEventListener('input', checkFormValidity);
   form.addEventListener('change', checkFormValidity);

   // Phone input formatting
   const phoneInput = document.getElementById('phone');
   phoneInput.addEventListener('input', (e) => {
     let value = e.target.value.replace(/\D/g, '');
     if (value.startsWith('8')) value = '7' + value.substring(1);
     if (value.startsWith('7') && value.length <= 11) {
       value = value.replace(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, (match, p1, p2, p3, p4) => {
         let result = '+7';
         if (p1) result += ` (${p1}`;
         if (p2) result += `) ${p2}`;
         if (p3) result += `-${p3}`;
         if (p4) result += `-${p4}`;
         return result;
       });
     }
     e.target.value = value;
     checkFormValidity();
   });

   // Form submission
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     
     // Simulate form submission
     submitBtn.textContent = 'Отправка...';
     submitBtn.disabled = true;
     
     setTimeout(() => {
       alert('Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.');
       closeModal();
       submitBtn.textContent = 'Отправить';
     }, 2000);
   });

   // Initialize form validity check
   checkFormValidity();