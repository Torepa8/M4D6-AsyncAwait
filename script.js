// API: https://jsonplaceholder.typicode.com/users

const api = 'https://jsonplaceholder.typicode.com/users'
const tbUser = document.getElementById('tbUser')
const userFilter = document.getElementById('filterUser')
const userText = document.getElementById('userText')
const AllUsersFind = []
let allUsersFiltered = []

async function LoadUsers() {
    const r = await fetch('https://jsonplaceholder.typicode.com/users/')
    const allU = await r.json()
    return allU
}

//caricamento di tutti i dati
window.onload = async function () {
    const AllUsers = await LoadUsers()
    console.log(AllUsers)
    AllUsers.forEach(u => {
        AllUsersFind.push(u)
    })
    // console.log(AllUsersFind)
    tbUser.innerHTML += AllUsers.map((user) => /*html*/ `
        <tr>
            <td> ${user.name} </td>
            <td> ${user.username} </td>
            <td> ${user.email} </td>
        </tr>
    `).join("")
}

function filterFor(dato) {
    let datouser = String(userText.value).toLowerCase()
    let datolower
    if (userFilter.value === "Mail") {
        datolower = String(dato.email).toLowerCase()
        return datolower.includes(datouser)
    }
    if (userFilter.value === "Name") {
        datolower = String(dato.name).toLowerCase()
        return datolower.includes(datouser)
    }
    if (userFilter.value === "Username") {
        datolower = String(dato.username).toLowerCase()
        return dato.username.includes(userText.value)
    }
}


function searchBy() {
    allUsersFiltered = AllUsersFind.filter(filterFor)
    console.log(allUsersFiltered)
    return allUsersFiltered
}

function resetTable() {
    tbUser.innerHTML =/*html*/ `
    <tr class="mx-2">
        <th> Name </th>
        <th> Username </th>
        <th> email </th>
    </tr>
    `
}

function fillTable() {
    resetTable()
    tbUser.innerHTML += allUsersFiltered.map((user) => /*html*/ `
        <tr>
            <td> ${user.name} </td>
            <td> ${user.username} </td>
            <td> ${user.email} </td>
        </tr>
    `).join("")
}

function searchFill() {
    searchBy()
    fillTable()
}