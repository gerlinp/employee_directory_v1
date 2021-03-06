let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const nxtBtn =  document.querySelector('.next')
const prvBtn =  document.querySelector('.prev')
let index = '';
let nextIndex = '';
let prevIndex = '';


fetch('https://randomuser.me/api/?nat=us&results=12')
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container text-grid">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let {name, dob, phone, email, location:{city, street, state, postcode}, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <div>
    <img class="avatar img-thumbnail" src="${picture.large}" />
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address"> ${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    <div>
    `;
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
    nextIndex = parseInt(index) + 1;
    prevIndex = parseInt(index) - 1; 
}


gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        index = card.getAttribute('data-index');
        displayModal(index);
        console.log(e.target)
        console.log(index) 
    }
});


nxtBtn.addEventListener('click', () => {
    if (nextIndex >= 12) {
        displayModal(0)
    } else { 
     displayModal(nextIndex)
    }
});

prvBtn.addEventListener('click', () => {
    if (prevIndex <= -1) {
        displayModal(11)   
    } else {
            displayModal(prevIndex)
    }
});


modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});


// ------------ Search and Filter-------------//
const searchBar =  document.querySelector('#search')
searchBar.addEventListener('keyup', (e) => {
    const search = e.target.value.toLowerCase();
    const names = document.querySelectorAll('.name')
    names.forEach(person => {
        let name = person.innerHTML;
        let parent = person.parentElement.parentElement;
        if (name.toLowerCase().indexOf(search.toLowerCase()) != -1){
            parent.style.display = 'grid'
        } else {
            parent.style.display = 'none';
        };
    });
});

