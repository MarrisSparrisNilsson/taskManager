console.log('Client side javascript is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         // const jSONData = JSON.stringify(data)
//         console.log(data);        

//     })
// })

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = e.target.elements.weatherInput;
    // console.log(inputValue);
    searchWeather(inputValue.value);
    
    inputValue.value = '';
    
})


const searchWeather = (location) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const url = `/weather?location=${location}`;
    
    fetch(url).then(response => {
        response.json()
        .then(data => {
            if (data.errorMessage) {
                // console.log(data.error);
                messageOne.textContent = '';             
                messageTwo.textContent = `${data.errorMessage}`
                
            } else {            
                // const { data } = data
                console.log(data);
                messageOne.textContent = `${data.data.summary} ${data.data.currentWeather}`
                messageTwo.textContent = '';
                // messageOne.textContent = `${data.data}`
            }
        })
    })
}
