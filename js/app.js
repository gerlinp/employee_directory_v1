let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

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
        <div class="text-container">
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
    <img class="avatar" src="${picture.large}" />
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
    `;
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
}


gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
        console.log(e.target)
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});


// ------------ Search and Filter-------------//
const handleSearch = e => {
    let inputValue = e.target.value.toLowerCase()
     let names = document.querySelectorAll('.name')
  
     for(let i = 0; i < names.length; i++) {
       let person = names[i]
       let name = person.innerHTML.toLowerCase();
       name.includes(inputValue) ? person.style.display = 'inline' : person.parentNode.parentNode.parentNode.style.display = 'none'
       if(inputValue === '') {
         person.parentNode.parentNode.parentNode.style.display = 'inline'
       }
     }
  }


// // ------------ Search and Filter-------------//
// // code based on "JavaScript DOM Tutorial #16" from https://youtu.be/3NG8zy0ywIk
// const list = document.querySelector('#image-list ul');
// const forms = document.forms;
// const searchBar = forms['search-images'].querySelector('input');

// searchBar.addEventListener('keyup', (e) => {
//   const term = e.target.value.toLowerCase();
//   const images = list.getElementsByTagName('a');
//   Array.from(images).forEach((image) => {
//     const title = image.getAttribute("data-caption");
//     if(title.toLowerCase().indexOf(term.toLowerCase()) != -1){
//       image.style.display = 'block';
//     } else {
//       image.style.display = 'none';
//     }
//   });
// });