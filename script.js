/** Variables */

// Grabs all data from the form/DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/** Functions */ 

// Show error
function showError(input, message) {
    // This gets the 'form-control' div
    const formControl = input.parentElement;
    // Overrides the 'form-control' class and adds the error class
    formControl.className = 'form-control error';
    // Inserts message into <small> tags
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success
function showSuccess(input) {
        // This gets the 'form-control' div
        const formControl = input.parentElement;
        // Overrides the 'form-control' class and adds the success class
        formControl.className = 'form-control success';
}

// Check is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // If email matches the format(regex) above, run success message
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        // If email is in the wrong format, run error message
        showError(input, 'Email is not valid')
    }
}

// Check required fields
function checkRequired(inputArr) {
    // For every item in the array run the function 
    inputArr.forEach(function(input) {
        // If value is empty run error message
        if(input.value.trim() === '') {
            // input.id grabs the id of the input box 
            showError(input, `${getFieldName(input)} is required`);
        } else {
            // If field is not empty run success 
            showSuccess(input);
        }
    });
}

// Check length of input
function checkLength(input, min, max) {
    // If characters are less than minimum characters, show error
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        // If characters are more than maximum characters, show error
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        // If required amount characters, show success
        showSuccess(input);
    }
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
    // If passwords don't match show error message
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// Get fieldName
function getFieldName(input) {
    // Grabs first letter of message makes it uppercase and adds it the rest of the message
    // which is lowercase. Slice(1) cuts the word from the second letter(index). 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}

/** Event Listeners */ 

// For submit button
form.addEventListener('submit', function(e) {
   e.preventDefault();

    // When submit is pressed, run functions to check for errors and display errors

    // Check that all fields have inputs
    checkRequired([username, email, password, password2]);
    // Check username length
    checkLength(username, 3, 15);
    // Check password length
    checkLength(password, 6, 25);
    // Check email format
    checkEmail(email);
    // Check that passwords match
    checkPasswordsMatch(password, password2);
});