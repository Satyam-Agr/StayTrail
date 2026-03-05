//form validation script from bootstrap documentation
const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    },)
})
//max length validation for title input field
const inputs = document.getElementsByClassName('limited-input');
const limitWarnings = document.getElementsByClassName('limit-warning');
for(let i=0; i<inputs.length; i++){
  let input = inputs[i];
  let limitWarning = limitWarnings[i];
  if (input && limitWarning) {
      input.addEventListener('input', () => {
          const maxLength = input.maxLength;
          if (input.value.length === maxLength) {
              limitWarning.classList.remove('hidden');
          } else {
              limitWarning.classList.add('hidden');
          }
      });
  }
}

