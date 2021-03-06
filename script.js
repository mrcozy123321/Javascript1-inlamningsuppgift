let userList = [];

const regForm = document.querySelector('#regForm');
const fName = document.querySelector('#firstName');
const lName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const tac = document.querySelector('#tac');
const output = document.querySelector('#userList');
let change = false;

const listUsers = () => {
  output.innerHTML = '';
  userList.forEach(user => {
    output.appendChild(createUserElement(user));
  })
}

const createUserElement = user => {

  let card = document.createElement('div');
  card.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'bg-white', 'p-2', 'mb-2');
  card.id = user.id;

  let textContainer = document.createElement('div');
  textContainer.classList.add('mx-3', 'row');

  let firstName = document.createElement('p');
  firstName.classList.add('m-0', 'col-md-4');
  firstName.innerText = user.fName;

  let lastName = document.createElement('p');
  lastName.classList.add('m-0', 'col-md-6');
  lastName.innerText = user.lName;

  let _email = document.createElement('small');
  _email.classList.add('m-0', 'col-md-9');
  _email.innerText = user.email;

  let buttonContainer = document.createElement('div');
  buttonContainer.classList.add('mx-3');

  let editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'mx-3');
  editButton.innerText = 'Edit';

  let removeButton = document.createElement('button');
  removeButton.classList.add('btn', 'btn-sm', 'btn-danger', 'mx-3');
  removeButton.innerText = 'X';

  card.appendChild(textContainer);
  textContainer.appendChild(firstName);
  textContainer.appendChild(lastName);
  textContainer.appendChild(_email);
  card.appendChild(buttonContainer);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(removeButton);

  editButton.addEventListener('click', () => {
    removeRegisterBtn();
    change = true;
    let saveEdit = document.createElement('button');
    saveEdit.classList.add('btn', 'btn-primary', 'saveBtn');
    saveEdit.id = 'saveBtn';
    saveEdit.innerText = 'Save';
    let saveEditContainer = document.getElementById('regBtn-container');
    saveEditContainer.appendChild(saveEdit);

    fName.value = user.fName;
    lName.value = user.lName;
    email.value = user.email;

    saveEdit.addEventListener('click', () => {
      errors = [];

      for(let i = 0; i < regForm.length; i++) {
        errors[i] = validate(regForm[i]);
      }

      if(!errors.includes(false)) {
      user.fName = fName.value;
      firstName.innerText = user.fName;
      user.lName = lName.value;
      lastName.innerText = user.lName;
      user.email = email.value;
      _email.innerText = user.email;

      removeSaveBtn();
      createRegBtn();

      fName.value = '';
      lName.value = '';
      email.value = '';
      tac.checked = false;
      fName.parentElement.classList.remove('is-valid');
      lName.parentElement.classList.remove('is-valid');
      email.parentElement.classList.remove('is-valid');
      }
    })
  });

removeButton.addEventListener('click', () => removeUser(user.id, card));

return card;
}

function createRegBtn() {
  let register = document.createElement('button');
  register.classList.add('btn', 'btn-primary');
  register.innerText = 'Register';
  register.id = 'regBtn';
  let registerContainer = document.getElementById('regBtn-container');
  registerContainer.appendChild(register);
}

function removeSaveBtn() {
  document.getElementById('saveBtn').remove('button');
}

function removeRegisterBtn() {
  document.getElementById('regBtn').remove('button');
}

function removeUser(id, user) {
  userList = userList.filter(user => user.id !== id);
  user.remove()
}

const validateText = (input) => {

  let onlyLetters = /[^a-??A-?? ]/g;

  if(input.value.trim() === '' || input.value.trim().length < 2) {
    setError(input, 'Please enter a name, name must be atleast 2 characters long');
    return false;
  }
  else if(input.value.match(onlyLetters)) {
    setError(input, 'Name can only contain letters A-?? ond lowecase a-??');
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
  else if (userList.some(user => user.email === email.value)) {
    if(change) {
      setSuccess(email);
      change = false;
      return true;
    }
    else {
      setError(email, 'Email address already exists');
      return false;
    }
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
    fName.value = '';
    lName.value = '';
    email.value = '';
    tac.checked = false;
    fName.parentElement.classList.remove('is-valid');
    lName.parentElement.classList.remove('is-valid');
    email.parentElement.classList.remove('is-valid');
  }
})