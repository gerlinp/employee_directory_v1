function createUSer(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return document.appendChild(element);
}

fetch('https://randomuser.me)
    .then((resp) => resp.json())
    .then(function (data) {
        let users = data.results;
        return users.map(function (user) {
            let li = createUser('li'),
            img = createUser('img'),
            p = createUser('p');
            img.src = user.picture.large;
            p.innerHTML = `${user.name.first} ${user.name.last}}`
            append(li, img);
            append(li, p);
            appened(document.querySelector('#users'), li);         
        })
        .catch(function(error) {
            console.log(error);
        })
    })
    .catch(function (error) {

    });