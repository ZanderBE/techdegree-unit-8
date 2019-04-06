// Variables
var employeeList = document.querySelector('.employee-list');
var employeeModal = document.querySelector('.employee-list-modal');
var employeeCard = document.querySelector('.employee-card');
var employeeModalCard = document.querySelector('.employee-modal-card');
var closeButton = document.querySelector('.close');
var input = document.querySelector('#search');

//Use fetch to get and display 12 random users from the API
fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json()) // Parse data into JSON
  .then(function(data) {
    createEmployeeCard(data);
    createModalCard(data);
  })
  .catch(error => console.log(error))

// Helper Functions
//Generate Employee Cards based on employee data
function createEmployeeCard(data) {
  var employee = data.results;
  var employeeCard = '';
  for (i=0; i < employee.length; i++) {
    employeeCard += `<div class="employee-card" data-employee="${i}">`;
    employeeCard += `<div class="img-container">`;
    employeeCard += `<img src="${employee[i].picture.large}" class="avatar" alt="employee picture">`;
    employeeCard += `</div>`;
    employeeCard += `<div class="text-container">`;
    employeeCard += `<p class="employee-name">${employee[i].name.first} ${employee[i].name.last}</p>`;
    employeeCard += `<p class="text-description">${employee[i].email}</p>`;
    employeeCard += `<p class="text-description capitalize">${employee[i].location.city}</p>`;
    employeeCard += `</div>`;
    employeeCard += `</div>`;
  }
  employeeList.innerHTML = employeeCard;
}

//Generate Employee *Modal* Cards based on employee data
function createModalCard(data) {
  var employee = data.results;
  var employeeModalCard = '';
  for (i=0; i < employee.length; i++) {
    employeeModalCard += `<div class="employee-modal-card" data-employee="${i}">`;
    employeeModalCard += `<div class="close-container">`;
    employeeModalCard += `<p class="close">X</p>`;
    employeeModalCard += `</div>`;
    employeeModalCard += `<div class="modal-container">`;
    employeeModalCard += `<div class="top-modal">`
    employeeModalCard += `<div class="img-container">`;
    employeeModalCard += `<img src="${employee[i].picture.large}" class="avatar" alt="employee picture">`;
    employeeModalCard += `</div>`;
    employeeModalCard += `<p class="employee-name">${employee[i].name.first} ${employee[i].name.last}</p>`;
    employeeModalCard += `<p class="text-description">${employee[i].email}</p>`;
    employeeModalCard += `<p class="text-description capitalize">${employee[i].location.city}</p>`;
    employeeModalCard += `</div>`; 
    employeeModalCard += `<div class="bottom-modal">`
    employeeModalCard += `<p class="text-description">${employee[i].cell}</p>`;
    employeeModalCard += `<p class="text-description capitalize">${employee[i].location.street}, ${employee[i].location.city}, ${employee[i].location.state} ${employee[i].location.postcode}</p>`;
    employeeModalCard += `<p class="text-description">Birthday: ${employee[i].dob.date.substring(5,7)}/${employee[i].dob.date.substring(8,10)}/${employee[i].dob.date.substring(0,4)}</p>`;
    employeeModalCard += `</div>`;
    employeeModalCard += `</div>`;
    employeeModalCard += `<div class="next-previous-container">`;
    employeeModalCard += `<a href="#" class="previous round">&#8249;</a>`;
    employeeModalCard += `<a href="#" class="next round">&#8250;</a>`;
    employeeModalCard += `</div>`;
    employeeModalCard += `</div>`;
  }
  employeeModal.innerHTML = employeeModalCard;
}

// Event Listeners
//Open modal window for employee after their box has been clicked
employeeList.addEventListener('click', function(e) {
  if(e.target && e.target.nodeName == "DIV") {
    for (i=0; i < employeeModal.childNodes.length; i++) {
      if (e.target.dataset.employee == employeeModal.childNodes[i].dataset.employee) {
        employeeModal.style.display = 'block';
        employeeModal.childNodes[i].style.display = 'block';
      }
    }
  }
});

// Close Modal Window after the close button has been clicked
document.addEventListener('click', function(e) {
  if (e.target.className === "close") {
    employeeModal.style.display = 'none';
    for (i=0; i < employeeModal.childNodes.length; i++) {
      if (employeeModal.childNodes[i].style.display === 'block') {
        employeeModal.childNodes[i].style.display = 'none';
      }
    }
  }
})

// Search filter
input.addEventListener('keyup', function myFunction() {
  // Declare variables
  var filter = input.value.toUpperCase();
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < employeeList.childNodes.length; i++) {
    a = employeeList.childNodes[i].lastChild.firstChild.childNodes[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      employeeList.childNodes[i].style.display = "";
    } else {
      employeeList.childNodes[i].style.display = "none";
    }
  }
});

//
document.addEventListener('click', function(e) {
  if (e.target.className === 'previous round') {
    for (i=0; i < employeeModal.childNodes.length; i++) {
      if (employeeModal.childNodes[i].style.display === 'block') {
        employeeModal.childNodes[i].style.display = 'none';
        if (i == [0]) {
          i = 11;
        } else {
          i--;
        }
        employeeModal.childNodes[i].style.display = 'block';
      }
    }
  } if (e.target.className === 'next round') {
    for (i=0; i < employeeModal.childNodes.length; i++) {
      if (employeeModal.childNodes[i].style.display === 'block') {
        employeeModal.childNodes[i].style.display = 'none';
        if (i == [11]) {
          i = 0;
        } else {
          i++;
        }
        employeeModal.childNodes[i].style.display = 'block';
      }
    }
  }
});
