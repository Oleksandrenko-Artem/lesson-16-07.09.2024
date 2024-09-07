const root = document.getElementById('root');

const h1 = document.createElement('h1');
h1.textContent = 'Sign Up';
const form = document.createElement('form');
form.classList.add('form');

const datasForm = [
  {type:'text', placeholder: 'Name...', name: 'fullName', title:'Full Name'},
  {type:'email', placeholder: 'Email address...', name: 'email', title:'Email'},
  {type:'text', placeholder: 'Username...', name: 'username', title:'Username'},
  {type:'password', placeholder: '*****', name: 'password', title:'Password'},
  {type:'password', placeholder: '*****', name: 'repeatPassword', title:'Repeat Password'}
]

function createInput(data) {
    const label = document.createElement('label');
    const span = document.createElement('span');
    span.textContent = data.title;
    const input = document.createElement('input');
    input.setAttribute('name', data.name);
    input.setAttribute('type', data.type);
    input.setAttribute('placeholder', data.placeholder);
    label.append(span, input);
    return label;
}
const elementsForm = datasForm.map((data) => createInput(data));

const labelCheckbox = document.createElement('label');
labelCheckbox.classList.add('checkbox');
const checkbox = document.createElement('input');
checkbox.setAttribute('name', 'agree');
checkbox.setAttribute('type', 'checkbox');
labelCheckbox.append(checkbox, 'I agree to the Terms of User');
checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        event.target.parentElement.nextElementSibling.disabled = false;
    } else {
        event.target.parentElement.nextElementSibling.disabled = true;
    }
});
const button = document.createElement('button');
button.textContent = 'Sign Up';
button.classList.add('button');
button.setAttribute('type', 'submit');
button.disabled = true;
form.append(...elementsForm, labelCheckbox, button);
root.append(h1, form);

const patternEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const patternUser = /^[a-z0-9_-]{3,15}$/;
const patternPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let empty = false;
    for (let index = 0; index < 5; index++) {
        const element = form.elements[index];
        if (element.value.trim() === '') {
            element.style.borderColor = 'red';
            empty = true;
        }
    }
    if (empty) return;
    const isValidEmail = patternEmail.test(form.elements.email.value.trim());
    const isValidUser = patternUser.test(form.elements.username.value.trim());
    const isValidPassword = patternPassword.test(form.elements.password.value.trim());
    const isConfirmPassword = form.elements.password.value.trim() === form.elements.repeatPassword.value.trim();
    console.log(empty, isValidEmail, isValidUser, isValidPassword, isConfirmPassword);
    if (isValidEmail && isValidUser && isValidPassword && isConfirmPassword) {
        alert('Thanks!');
        form.submit();
    }
});