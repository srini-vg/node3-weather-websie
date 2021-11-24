
console.log('Client side javascript file is loaded.')
const title = 'Index Page'

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = '';

// fetch('http://localhost:3000/weather?address=Hyderabad').then((response) => {
//     response.json().then((data) => {
//         // forecast = data.forecast
//         // location = data.location
//     })
// }, (error) => {
//     console.log(error)
// });

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading....!'
    messageTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                console.log(data.forecast)
                console.log(data.location)
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
            // forecast = data.forecast
            // location = data.location
        })
    }, (error) => {
        console.log(error)
    });
});