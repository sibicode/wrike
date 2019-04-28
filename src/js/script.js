document.addEventListener('DOMContentLoaded', function () {
    handleUserProfileForm();
    handleCustomSelect();
});

function handleUserProfileForm () {
    const userProfileForms = document.querySelectorAll('.js-user-profile-form');
    toArray(userProfileForms).forEach(handleUserProfileFormInit);

    function handleUserProfileFormInit (form) {
        const formSubmit = form.querySelector('.js-form-submit');
        const formReset = form.querySelector('.js-form-cancel');
        const formInputs = form.querySelectorAll('input');

        form.addEventListener('input', handleFormChange);
        form.addEventListener('submit', handleFormSubmit);

        formReset && formReset.addEventListener('click', handleFormReset);

        function handleFormChange () {
            formSubmit.disabled = !handleFormControlChanged()
        }

        function handleFormControlChanged () {
            let isFormChanged = false;

            toArray(formInputs).forEach(function (control) {
                if (control.type === 'checkbox') {
                    if (control.checked !== control.defaultChecked) {
                        isFormChanged = true
                    }
                } else {
                    if (control.value !== control.defaultValue) {
                        isFormChanged = true
                    }
                }
            })

            return isFormChanged
        }

        function handleFormReset () {
            formSubmit.disabled = true;
        }

        function handleFormSubmit (event) {
            event.preventDefault();

            toArray(formInputs).forEach(function (control) {
                if (control.type === 'checkbox') {
                    control.defaultChecked = control.checked;
                } else {
                    control.defaultValue = control.value;
                }
            })
            formSubmit.disabled = true;

            alert('Form Data Saved :D');
        }
    }
}

function handleCustomSelect () {
    const selectList = document.querySelectorAll('.custom-select');
    const OPENED_CLASS = 'custom-select--opened';
    const ACTIVE_CLASS = 'custom-select__option--active';

    document.addEventListener('click', handleCloseAllSelects, true);

    toArray(selectList).forEach(function (select) {
        select.addEventListener('click', handleSelect, true);
    });

    function handleSelect (event) {
        const currentTarget = event.target;
        const currentSelect = event.currentTarget;
        const currentActiveOption = currentSelect.querySelector('.' + ACTIVE_CLASS);
        const currentSelectText = currentSelect.querySelector('.js-select-text');

        currentSelect.classList.add(OPENED_CLASS);

        if (currentTarget.classList.contains('custom-select__option')) {
            currentSelectText.textContent = currentTarget.textContent;
            currentActiveOption.classList.remove(ACTIVE_CLASS);
            currentTarget.classList.add(ACTIVE_CLASS);
            currentSelect.classList.remove(OPENED_CLASS);
        }
    }

    function handleCloseAllSelects (select) {
        toArray(selectList).forEach(function (item) {
            if (select !== item) {
                item.classList.remove(OPENED_CLASS);
            }
        })
    }
}

/* Helpers */
function toArray (list) {
    return Array.prototype.slice.call(list);
}
