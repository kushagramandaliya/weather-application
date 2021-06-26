console.log('Public side javascript')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagesecond = document.querySelector('#message-2')


weatherform.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = search.value

    messageone.textContent = "Loading..."
    messagesecond.textContent = ""

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageone.textContent = data.error
        }
        else{
            messageone.textContent = data.place
            messagesecond.textContent = data.forecast
        }
    })
})
})