// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('inputField');
    const mybtn = document.getElementById('mybtn');
    const inputDiv = document.getElementById('input-container');
    const user_input = document.getElementById('user_input');
    const inputDiv2 = document.getElementById('input-container2');
    const login_user_btn = document.getElementById("login_user_btn");
    const login_email_btn = document.getElementById("login_email_btn");
    const username_continue_btn = document.getElementById("username_continue_btn");

    // Check if elements exist before using them
    if (!inputField || !mybtn || !inputDiv || !user_input || !inputDiv2 || !login_user_btn || !login_email_btn) {
        console.error("One or more required elements not found");
        return;
    }

    const inputLabel = inputField.nextElementSibling;
    const inputLabel2 = user_input.nextElementSibling;

    let errorMessageDisplayedUsername = false;
    let errorMessageDisplayedEmail = false;
    let emailFieldInteracted = false; // Track if user has interacted with email field
    let usernameFieldInteracted = false; // Track if user has interacted with username field

    mybtn.disabled = true;

    inputField.addEventListener('focus', () => {
        inputLabel.classList.add('active');
        inputField.classList.add('border_change');
        inputDiv.classList.add('border_change_main');

        // Remove error message if it was displayed before
        if (errorMessageDisplayedEmail) {
            hideErrorMessageEmail();
            errorMessageDisplayedEmail = false;
        }
    });

    inputField.addEventListener('blur', () => {
        if (!inputField.value) {
            inputLabel.classList.remove('active');
            inputField.classList.remove('border_change');
            inputDiv.classList.remove('border_change_main');
            
            // Only show "Required" if user has interacted with the field before
            if (emailFieldInteracted) {
                showErrorMessageEmail('Required');
                errorMessageDisplayedEmail = true;
            }
        } else if (!validateEmail(inputField.value)) {
            showErrorMessageEmail('Please enter a valid email address');
            inputLabel.classList.remove('remove_top_dis');
            inputDiv.classList.remove('border_change_main');
            errorMessageDisplayedEmail = true;
        } else {
            mybtn.disabled = false;
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showErrorMessageEmail(message) {
        const existingErrorMessage = inputDiv.querySelector('.error-message-email');
        if (!existingErrorMessage) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message-email');
            errorMessage.textContent = message;
            inputField.classList.add('border_red');
            inputLabel.classList.add('color_red'); 
            inputLabel.classList.add('remove_top_dis');
            inputDiv.appendChild(errorMessage);
        }
    }

    function hideErrorMessageEmail() {
        const errorMessage = inputDiv.querySelector('.error-message-email');
        if (errorMessage) {
            errorMessage.remove();
            inputField.classList.remove('border_red');
            inputLabel.classList.remove('color_red'); 
            inputLabel.classList.remove('remove_top_dis');
        }
    }

    inputField.addEventListener('input', () => {
        // Mark that user has interacted with the field
        emailFieldInteracted = true;
        
        hideErrorMessageEmail();
        if (validateEmail(inputField.value)) {
            mybtn.disabled = false;
        } else {
            mybtn.disabled = true;
        }
    });

    user_input.addEventListener('focus', () => {
        inputLabel2.classList.add('active');
        user_input.classList.add('border_change');
        inputDiv2.classList.add('border_change_main');
        
        // Remove error message if it was displayed before
        if (errorMessageDisplayedUsername) {
            hideErrorMessageUsername();
            errorMessageDisplayedUsername = false;
        }
    });

    user_input.addEventListener('input', () => {
        // Mark that user has interacted with the field
        usernameFieldInteracted = true;
        
        hideErrorMessageUsername();
        
        if (user_input.value.trim().length === 0) {
            mybtn.disabled = true;
            if (username_continue_btn) username_continue_btn.disabled = true;
        } else {
            mybtn.disabled = false;
            if (username_continue_btn) username_continue_btn.disabled = false;
        }
    });

    user_input.addEventListener('blur', () => {
        if (!user_input.value) {
            inputLabel2.classList.remove('active');
            user_input.classList.remove('border_change');
            inputDiv2.classList.remove('border_change_main');
            
            // Only show "Required" if user has interacted with the field before
            if (usernameFieldInteracted) {
                showErrorMessageUsername('Required');
                errorMessageDisplayedUsername = true;
                mybtn.disabled = true;
                if (username_continue_btn) username_continue_btn.disabled = true;
            }
        }
    });

    // Show error message for the username input
    function showErrorMessageUsername(message) {
        const existingErrorMessage = inputDiv2.querySelector('.error-message-username');
        if (!existingErrorMessage) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message-username');
            errorMessage.textContent = message;
            user_input.classList.add('border_red');
            inputLabel2.classList.add('color_red');
            inputLabel2.classList.add('remove_top_dis');
            inputDiv2.appendChild(errorMessage);
        }
    }

    // Remove error message if it was displayed before for the username input
    function hideErrorMessageUsername() {
        const errorMessage = inputDiv2.querySelector('.error-message-username');
        if (errorMessage) {
            errorMessage.remove();
            user_input.classList.remove('border_red');
            inputLabel2.classList.remove('color_red');
            inputLabel2.classList.remove('remove_top_dis');
        }
    }

    // Add null checks to these functions
    function change_email() {
        if (inputDiv2) inputDiv2.style.display = "block";
        if (inputDiv) inputDiv.style.display = "none";
        if (login_user_btn) login_user_btn.style.display = "none";
        if (login_email_btn) login_email_btn.style.display = "block";
        mybtn.disabled = true;
    }

    function change_username() {
        if (inputDiv2) inputDiv2.style.display = "none";
        if (inputDiv) inputDiv.style.display = "block";
        if (login_user_btn) login_user_btn.style.display = "block";
        if (login_email_btn) login_email_btn.style.display = "none";
        mybtn.disabled = true;
    }

    // Focus on the email field when page loads
    inputField.focus();
});