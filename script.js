let userList = []

const regForm = document.querySelector('#regForm');
const fName = document.querySelector('#firstName');
const lName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const tac = document.querySelector('#tac');
const output = document.querySelector('#userList');
const eUser = document.querySelector('#editUser');
const rUser = document.querySelector('#removeUser');

const listUsers = () => {
  output.innerHTML = '';
  userList.forEach(user => {
    output.innerHTML += `
      <div id="${user.id}" class="d-flex justify-content-between align-items-center border bg-white p-2 mb-2">
        <div class="mx-3 row">
          <p class="m-0 col-md-4">${user.fName}</p>
          <p class="m-0 col-md-6">${user.lName}</p>
          <small class="m-0 col-md-9">${user.email}</small>
        </div>
        <div class="mx-3">
          <button class="btn btn-sm btn-primary mx-3" id="editUser">Edit</button>
          <button class="btn btn-sm btn-danger mx-3" id="removeUser">X</button>
        </div>
      </div>
    `
  })
}

const validateText = (input) => {

  if(input.value.trim() === '') {
    setError(input, 'Name can\'t be empty');
    return false;
  }
  else if(input.value.trim().length < 2) {
    setError(input, 'Name must be atleast 2 characters long');
    return false;
  }
  else{
    setSuccess(input);
    return true;
  }
}

const validateEmail = (email) => {
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if(email.value.trim() === '' || !regEx.test(email.value)) {
    setError(email, 'You need to enter a valid email address');
    return false;
  }
  else {
    setSuccess(email);
    return true;
  }
}

const validateCheck = checkbox => {
  if(!checkbox.checked) {
    setError(checkbox, 'You must accept the terms');
    return false;
  }
  else {
    setSuccess(checkbox);
    return true;
  }
}

const setError = (input, textMessage) => {
  const parent = input.parentElement;
  
  parent.classList.add('is-invalid');
  parent.classList.remove('is-valid');
  
  parent.querySelector('.invalid-feedback').innerText = textMessage;
}

const setSuccess = input => {
  const parent = input.parentElement;
  parent.classList.add('is-valid');
  parent.classList.remove('is-invalid');
}

const validate = input => {
  switch(input.type) {
    case 'text': return validateText(input)
    case 'email': return validateEmail(input)
    case 'checkbox': return validateCheck(input)
    default:
      break;
  }
}

regForm.addEventListener('submit', e => {
  e.preventDefault();
  // listUsers();
  // validateText();
  // validateEmail();
  errors = []

  for(let i = 0; i < regForm.length; i++) {
    errors[i] = validate(regForm[i]);
  }
  
  if(!errors.includes(false)) {
    const user = {
      id: Date.now().toString(),
      fName: fName.value,
      lName: lName.value,
      email: email.value
    }
    userList.push(user);
    listUsers();
  }
})