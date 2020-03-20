const profileHeading = document.querySelector('#profile-header')
const userInfo = document.querySelector('.user-info')
const actFeed = document.querySelector('.activity-feed')
const borderC = document.querySelector('.border-container')
const taskC = document.querySelector('.task-container')
const userName = document.querySelector('#userName')
const userEmail = document.querySelector('#userEmail')
const welcomeText = document.querySelector('.welcomeText')
const taskContainer = document.querySelector('.task-container')
// const overflowBox = document.querySelector('.overflowBox')
const taskBody = document.querySelector('.task-body')
const switchBtn = document.querySelector('.switch')
const slider = document.querySelector('.slider')
const plusIcon = document.querySelector('.plusIcon')
const createTaskField = document.querySelector('.create-task-field')
const logoutIcon = document.querySelector('.logoutIcon')
const updatedName = document.querySelector('#updatedName')
const updatedAge = document.querySelector('#updatedAge')
const updatedEmail = document.querySelector('#updatedEmail')
const updatedPassword = document.querySelector('#updatedPassword')
const updateUserInfo = document.querySelector('.modal-form')
const confirmationPopUp = document.querySelector('.confirmation-popUp')
const confirmationText = document.querySelector('.confirmation-text')






// ------------------------------------------ START FETCHING TASKS AND USER ---------------------------------------------

// ---------------------------------------------------------- TASK ------------------------------------------------------


const fetchUserTasks = async (e) => {
    try {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        const tasks = await response.json()
        
        console.log(tasks);
        
        // printUserData(tasks)
        tasks.forEach(task => {
            generateTasks(task)
        });
        
    } catch (error) {
        console.log(error);    
    }
}

const fetchUserTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        const task = await response.json()
        
        console.log(task);

        return task
        
    } catch (error) {
        console.log(error);    
    }
}

const createUserTask = async (e) => {
    e.preventDefault()
    const {title, description } = e.target.elements

    try {
        const response = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value
            })
        })
        const task = await response.json()
        console.log(task);
        
        generateTasks(task)
        
    } catch (error) {
        console.log(error);    
    }
}

const deleteOneUserTask = async ({_id}) => {    
    try {
        const response = await fetch(`http://localhost:5000/tasks/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        const data = await response.json()
        console.log(data);
        fetchUserTasks()
        
    } catch (error) {
        console.log(error);
    }
}

const updateUserTask = async (task) => {
    const { _id, title, description, completeStatus } = task
    // taskBody.innerHTML = ''
    try {
        const response = await fetch(`http://localhost:5000/tasks/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: {
                // title: title.value,
                // description: description.value,
                completeStatus: completeStatus
            }
        })
        const data = await response.json()
        console.log(data);
        fetchUserTasks()
        
    } catch (error) {
        console.log(error);
    }
}
// ---------------------------------------------------------- TASK ------------------------------------------------------

// ---------------------------------------------------------- USER ------------------------------------------------------

const updateUserProfile = async (e) => {
    e.preventDefault()
    const { name, age, email, password } = e.target.elements
    confirmationPopUp.classList.remove('success')
    confirmationPopUp.classList.remove('error')

    try {
        const response = await fetch(`http://localhost:5000/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                email: email.value,
                password: password.value,
            })
        })
        const data = await response.json()

        if (data) {
            confirmationPopUp.classList.add('success')
            confirmationText.textContent = `User changes has been saved!`
        }
        
        console.log(data);
        printUserData(data)
        
    } catch (error) {
        console.log(error);

        confirmationPopUp.classList.add('error')
        confirmationText.textContent = `An error saving updated user info occured!`
    }
}

const fetchUserProfile = async (e) => {
    try {
        const response = await fetch('http://localhost:5000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        const data = await response.json()
        
        fetchUserTasks()
        printUserData(data)

        return data
        
        
    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async (e) => {
    try {
        const response = await fetch('http://localhost:5000/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
        
        if (response) {
            // disableWindowBackBtn()
            location.assign('../html/index.html')
        }
        
    } catch (error) {
        console.log(error);
    }
}

// ---------------------------------------------------------- USER ------------------------------------------------------

fetchUserProfile()

// ------------------------------------------ START FETCHING TASKS AND USER ---------------------------------------------

// ------------------------------------------------ CUSTOM FUNCTIONS ----------------------------------------------------

const disableWindowBackBtn = () => {
    // window.history.forward()

    // history.pushState(null, null, location.href)
    // window.onpopstate = function () {
    //     history.go('../hmtl/index.html')
    // }
    console.log(window);
    
}

const printUserData = (data) => {
    console.log(data);
    if (data.name) {
        
        profileHeading.textContent = `Welcome back ${data.name}!`
        profileHeading.classList.add('opacityAnimation')
        welcomeText.textContent = `${data.name}`
        userName.textContent = `${data.name}`
        userName.setAttribute('title', data.name)
        userEmail.textContent = `${data.email}`
        userEmail.setAttribute('title', data.email)

    }
}

const generateTasks = async (task) => {



    // let createTaskBody = document.createElement("div");
    let createTask = document.createElement("div");
    let createTaskInfoContainer = document.createElement("div");
    let createCheckboxContainer = document.createElement("div");
    createCheckboxContainer.setAttribute('data-id', task._id)
    let createSwitch = document.createElement("label")
    createSwitch.setAttribute('for', 'taskCheckbox')
    createSwitch.checked = task.completeStatus;
    let createTaskCheckBox = document.createElement("input")
    createTaskCheckBox.setAttribute('type', 'checkbox')
    createTaskCheckBox.setAttribute('for', 'taskCheckbox')
    let createSlider = document.createElement("span")
    let createTaskTextContainer = document.createElement("div")
    let createTaskTitle = document.createElement("h4")
    let createTaskDescription = document.createElement("span")
    let createTaskOptBar = document.createElement("div")
    createTaskOptBar.setAttribute('data-id', task._id)
    let createTrashIcon = document.createElement("img")
    createTrashIcon.setAttribute('src', '../images/trash-alt-solid.svg')
    createTrashIcon.setAttribute('title', 'Delete this task')

    // createA.setAttribute('title', `Skapades: ${task.timeStamp.fulldate}`)

    createTask.classList.add('task');
    createTaskInfoContainer.classList.add('taskInfo-container');
    createCheckboxContainer.classList.add('checkbox-container');
    createSwitch.classList.add('switch');


    // ----------------------------------------- Checkbox --------------------------------------------------------

    createSwitch.addEventListener('change', async (e) => {
        // taskBody.innerHTML = ''

        const checked = e.target.checked    
        
        if (!checked) {
            createSlider.style.transform = "translateX(0px)";
            createSlider.style.backgroundColor = "grey";
        }
        else {
            createSlider.style.transform = "translateX(20px)";
            createSlider.style.backgroundColor = "rgb(4, 196, 62)";
        }
        console.log(checked);


        const id = e.target.parentElement.getAttribute('data-id')
        console.log(id);
        const task = await fetchUserTask(id)
        task.completeStatus = checked;
        
        updateUserTask(task)

        // fetchUserTasks()

        // console.log(toDoList);
    });

    createSlider.classList.add('slider')
    createTaskTextContainer.classList.add('taskText-container');
    createTaskTitle.classList.add('taskTitle');
    createTaskTitle.setAttribute('title', task.title);
    createTaskDescription.classList.add('taskDescription')
    createTaskDescription.setAttribute('title', task.description);
    createTaskOptBar.classList.add('task-OptBar');
    createTrashIcon.classList.add('trashIcon');    
    // createHR.classList.add('taskHR')
// ----------------------------------------- Delete button --------------------------------------------------------
    
    createTrashIcon.addEventListener('click', async (e) => {

        // const popUpText = document.querySelector('.popUp-header__text');
        // popUpText.textContent = `Vill du verkligen ta bort ${task.task}?`;                
        
        // const popUpBox = document.querySelector('#showPopUp');
        // popUpBox.classList.toggle('displayPopUp');        

        const id = e.target.parentElement.getAttribute('data-id')
        console.log(id);

        const task = await fetchUserTask(id)
        deleteOneUserTask(task);

        // fetchUserTasks()
        // generateTasks()
    });

    // createTimeArea.classList.add('timeArea');
    // createA.classList.add('date');

    // createDeleteBtnContainer.classList.add('deleteBtnPosition');


    taskBody.appendChild(createTask);
    createTask.appendChild(createTaskInfoContainer)
    createTaskInfoContainer.appendChild(createCheckboxContainer)
    createCheckboxContainer.appendChild(createSwitch)
    createSwitch.appendChild(createTaskCheckBox)
    createSwitch.appendChild(createSlider)
    createTaskInfoContainer.appendChild(createTaskTextContainer)
    createTaskTextContainer.appendChild(createTaskTitle)
    createTaskTextContainer.appendChild(createTaskDescription)
    createTaskInfoContainer.appendChild(createTaskOptBar)
    createTaskOptBar.appendChild(createTrashIcon)


    // overflowBox.appendChild(createHR);

    createTaskTitle.textContent = task.title
    createTaskDescription.textContent = task.description

    // createA.textContent = `${task.timeStamp.date} ${task.timeStamp.month}`;
}


// ------------------------------------------------- TIMER FUNCTIONS  ---------------------------------------------------

const timer = () => {
    setInterval(() => {
        console.log('Sek');        
    }, 1000);    
}

const showUserInfo = () => {
    setInterval(() => {
        userInfo.style.display = "flex";
        actFeed.style.display = "block";
        borderC.style.display = "flex";
        clearInterval()
        // console.log('hej');
        
    }, 8000);

    setInterval(() => {
        taskC.style.display = "flex";
        
        clearInterval()
    }, 9000);
    
    // console.log('hejdå');
    
}

const removeH2 = () => {
    setInterval(() => {
        welcomeText.style.display = "none"
        clearInterval()
    }, 4000);
}

// ---------------------------------------------- CUSTOM FUNCTIONS -------------------------------------------------

// ------------------------------------------ STARTING TIMER FUNCTIONS ---------------------------------------------

timer()
removeH2()
showUserInfo()

// ------------------------------------------ STARTING TIMER FUNCTIONS ---------------------------------------------



// ------------------------------------------ CLIENT EVENTLISTENERS ---------------------------------------------

let open = false
plusIcon.addEventListener('click', e => {
    if (open) {
        plusIcon.setAttribute('src', '../images/plus-solid.svg')
        createTaskField.style.height = "0px"
        createTaskField.style.padding = "0px"
        
        open = false
    } else {
        plusIcon.setAttribute('src', '../images/angle-up-solid.svg')
        createTaskField.style.height = "150px"
        createTaskField.style.padding = "10px 0px"

        open = true
    }
})
 
logoutIcon.addEventListener('click', logoutUser)
updateUserInfo.addEventListener('submit', e => {
    updateUserProfile(e)
})

const openModalBtn = document.querySelector('#editProfile')
const closeModalBtn = document.querySelector('#closeModal')
const overlay = document.querySelector('#overlay')
const modal = document.querySelector('#modal')

openModalBtn.addEventListener('click', e => {
    openModal()
})

closeModalBtn.addEventListener('click', e => {
    closeModal()
})

overlay.addEventListener('click', e => {
    closeModal()
})

createTaskField.addEventListener('submit', e => {
    createUserTask(e)
})

const openModal = async () => {
    const user = await fetchUserProfile()
    
    updatedName.value = user.name
    updatedAge.value = user.age
    updatedEmail.value = user.email
    // updatedPassword.value = user.password

    modal.classList.add('active')
    overlay.classList.add('active')
}
const closeModal = async () => {

    modal.classList.remove('active')
    overlay.classList.remove('active')
}

// switchBtn.addEventListener('change', e => {
//     const checked = e.target.checked
    
    
//     if (!checked) {
//         slider.style.transform = "translateX(0px)";
//         slider.style.backgroundColor = "grey";
//     }
//     else {
//         slider.style.transform = "translateX(20px)";
//         slider.style.backgroundColor = "rgb(4, 196, 62)";
//     }
//     console.log(checked);
    
// })

// window.onunload = function() {null}
// disableWindowBackBtn()