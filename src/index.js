const url = "http://localhost:3000/dogs"
const dogTable = document.querySelector('table.margin')
const tableBody = dogTable.querySelector('#table-body')
const dogForm = document.querySelector('form#dog-form')
const submitButton = dogForm.querySelector('button[type="submit"]')


document.addEventListener('DOMContentLoaded', () => {
    loadDogs()

})

document.addEventListener('click', handleEvents)

function loadDogs() {
    fetch(url)
    .then(r => r.json())
    .then(dogData => {
    dogData.forEach (function(dogObj)  {
        let tr = document.createElement('tr')
        let id = dogObj.id 
        tr.dataset.id = id 
        tr.innerHTML = `<td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td> <button id='edit-btn' data-id=${dogObj.id}>Edit</button> </td>`
        tableBody.append(tr)
        })
    })
    }

    function handleEvents(e) {
        e.preventDefault()
        if(e.target.id === "edit-btn"){
            let id = e.target.dataset.id
            console.log(id)
            editDog(e.target.dataset.id)
        } else if(e.target.parentElement.id === 'dog-form'){
            editedDog(e)
        }
    }

function editDog(id) {
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(dog => {
        dogForm.name.value = dog.name,
        dogForm.sex.value = dog.sex,
        dogForm.breed.value = dog.breed,
        dogForm.dataset.id = dog.id 
    })
}

function editedDog(e){
    let id = e.target.parentElement.dataset.id
    let dog = {
        name: e.target.parentElement.name.value,
        sex: e.target.parentElement.sex.value,
        breed: e.target.parentElement.breed.value
    }
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": 'application/json',
                accepts: 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(res => res.json())
        .then(dog => {
            let foundDog = document.querySelector(`tr[data-id="${dog.id}"]`)
    foundDog.children[0].innerText = dog.name
    foundDog.children[1].innerText = dog.breed
    foundDog.children[2].innerText = dog.sex
        })
    }

