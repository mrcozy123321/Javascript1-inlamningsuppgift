let userList = [
  {
    id: '1',
    fName: 'Daniel',
    lName: 'Mrkoci',
    email: 'daniel@wiklunds.nu'
  }
]

const regForm = document.querySelector('#regForm');
const fName = document.querySelector('#firstName');
const lName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const TAC = document.querySelector('#tac');
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

const validateText = (id) => {
  let input = document.querySelector(id);

  if(input.value === '' || input.value.length < 2) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.focus();
    return false;
  }
  else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true;
  }
}

const validateEmail = (emailInput) => {
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if(regEx.test(emailInput.value)) {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    return true;
  }
  else {
    emailInput.classList.remove('is-valid');
    emailInput.classList.add('is-invalid');
    emailInput.focus();
    return false;
  }
}

listUsers();

regForm.addEventListener('submit', (e) => {
  e.preventDefault();

})