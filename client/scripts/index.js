const login = document.querySelector(".login")
const signup = document.querySelector(".signup")
const signUpBox = document.querySelector(".signupBox")
const loginBox = document.querySelector(".loginBox")
const errorM = document.querySelector(".errorM")

let timer
login.addEventListener('click', e => {
    signup.setAttribute('disabled', 'true')
    login.setAttribute('disabled', 'true')
    
    timer = setInterval(disableBtn, 800, signup);

    signUpBox.style.marginLeft = "-400px";
    login.style.backgroundColor = "white";
    signup.style.backgroundColor = "transparent";
    document.body.style.backgroundImage = "url(../images/background_img6.jpg)"

})

const disableBtn = (e) => {
    e.removeAttribute('disabled', '')
    
    clearInterval(timer)
}

signup.addEventListener('click', e => {
    signup.setAttribute('disabled', 'true')
    login.setAttribute('disabled', 'true')

    timer = setInterval(disableBtn, 800, login);

    signUpBox.style.marginLeft = "0px";
    signup.style.backgroundColor = "white";
    login.style.backgroundColor = "transparent";
    document.body.style.backgroundImage = "url(../images/background_img1.jpg)"
})





// const tasksContainer = document.querySelector('#tasks');
// const taskForm = document.querySelector('#add-task');

// const fetchTasks = async () => {
//   const response = await fetch('http://localhost:3000/tasks');
//   const data = await response.json();
//   return data;
// };

// const renderData = async () => {
//   const data = await fetchTasks();
//   tasksContainer.innerHTML = '';

//   data.forEach((item, index) => {
//     tasksContainer.innerHTML +=
//       `${index + 1}. ${item.description}, ${item.completeStatus}` + '<br>';
//   });
// };

// renderData();

// taskForm.addEventListener('submit', async e => {
//     console.log('click');
    
//   e.preventDefault();

//   const data = {
//     description: e.target.elements.description.value
//   };
//   await fetch('http://localhost:3000/tasks', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data)
//   });

//   renderData();
// });

const createUser = async (e) => {   
    e.preventDefault();
    const { name, email, password } = e.target.elements

    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
            })
        })
        const data = await response.json()
        console.log(data);

        sessionStorage.setItem('token', data.token);

        // console.log(password.value.length);
        

        if (data.token) {
            // loginUser()
            location.assign('../html/profile.html');
        }
        else if (data.errmsg) {
            resetDOM(email, password)

            email.style.borderColor = "red"

            displayErrorM('A user with this email already exist!')
            // password.style.borderColor = "red"            
        }
        else if (data.message) {
            // email.style.borderColor = "black"
            resetDOM(email, password)
            
            password.style.borderColor = "red"

            displayErrorM(`Your password is too short! Minimum length is 7 characters`)
        } else {
            console.log('jag kördes');     
        }
    } catch (error) {
        console.log(error);
    }    
}

const resetDOM = (email, password) => {
    // const { email, password } = e
    errorM.style.display = "none"
    errorM.textContent = ""

    email.style.borderColor = "black"
    password.style.borderColor = "black"
}

const displayErrorM = (string) => {
    errorM.textContent = string
    errorM.style.display = "block"
}

const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements

    try {
    const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${sessionStorage.setItem('token')}`
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        })
    })
    const data = await response.json()

    console.log(data);    
    
    sessionStorage.setItem('token', data.token);

    if (data.token) {
        location.assign('../html/profile.html')
    }
    else{
        email.style.borderColor = "red"
        password.style.borderColor = "red"
    }
        
    } catch (error) {
        console.log(error);
    }
}

// const logoutUser = async (e) => {
//     // const { email, password } = e.target.elements
//     try {
//         const response = await fetch('http://localhost:5000/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: JSON.stringify({
//                 email: email.value,
//                 password: password.value,
//             })
//         })
//         const data = await response.json()

//         console.log(data);
        
//     } catch (error) {
//         console.log(error);    
//     }
// }

// const readUserProfile = async (e) => {
//     e.preventDefault()
//     // const { email, password } = e.target.elements
//     try {
//         const response = await fetch('http://localhost:3000/users/me', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
//             },
//         })
//         const data = await response.json()

//         console.log(data);
        
//     } catch (error) {
//         console.log(error);    
//     }
// }

document.querySelector('#create-user').addEventListener('submit', createUser);

// document.querySelector('#create-user').addEventListener('change', e => {
    
//     console.log(e.target.elements);
    
//     // const { name, email, password } = e.target.elements
//         if (e.target.elements.password.value.length < 7) {
//             displayErrorM(`Password must be at least 7 characters long!`)
//         }
// });

document.querySelector('#login-user').addEventListener('submit', loginUser);

document.querySelector('#email').addEventListener('click', e => {
    const password = document.querySelector('#password')

    e.target.style.borderColor = "black"
    password.style.borderColor = "black"

});

document.querySelector('#password').addEventListener('click', e => {
    const email = document.querySelector('#email')

    e.target.style.borderColor = "black"
    email.style.borderColor = "black"

});

const disableWindowBackBtn = () => {
    // window.history.forward()

    // history.pushState(null, null, location.href)
    // window.onpopstate = function () {
    //     history.go(1)
    // }

}
// window.addEventListener('onload', disableWindowBackBtn)
// disableWindowBackBtn()