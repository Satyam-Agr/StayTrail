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
const titleInput = document.getElementById('title');
const titleLimitWarning = document.getElementById('titleLimitWarning');

if (titleInput && titleLimitWarning) {
    titleInput.addEventListener('input', () => {
        const maxLength = titleInput.maxLength;
        if (titleInput.value.length === maxLength) {
            titleLimitWarning.classList.remove('hidden');
        } else {
            titleLimitWarning.classList.add('hidden');
        }
    });
}
