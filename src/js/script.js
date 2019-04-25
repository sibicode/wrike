document.addEventListener('DOMContentLoaded', function () {
    handleUserProfileForm();
});

function handleUserProfileForm () {
    const form = document.querySelector('.js-user-profile-form');
    const formSubmit = form.querySelector('.js-form-submit');
    const formCancel = form.querySelector('.js-form-cancel');
    const formInputs = form.querySelectorAll('input');

    form.addEventListener('input', handleFormChange);
    form.addEventListener('submit', handleFormSubmit);
    formCancel.addEventListener('click', handleFormCancel);

    function handleFormChange (event) {
        const target = event.target;
        formSubmit.disabled = target.value === target.defaultValue;
    }

    function handleFormCancel () {
        if (!formSubmit.disabled) {
            Array.prototype.slice.call(formInputs).forEach(function (input) {
                input.value = input.defaultValue;
            })
            formSubmit.disabled = true;
        }
    }

    function handleFormSubmit (event) {
        event.preventDefault();

        Array.prototype.slice.call(formInputs).forEach(function (input) {
            input.defaultValue = input.value;
        })
        formSubmit.disabled = true;

        alert('Form Data Saved :D');
    }
}
