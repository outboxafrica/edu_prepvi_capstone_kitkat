console.log("It loaded")

let users = JSON.parse(sessionStorage.getItem ("users")) || [];
let books = JSON.parse(sessionStorage.getItem ("books")) || [];

// Accepts values from the form and creates and saves new user
const createUser = (userId,password,userType,emailId) => {
    let user = {
        userId,
        password,
        userType,
        emailId
    }

    // convert users array to JSON string and save it in session storage 
    users.push(user) 
    sessionStorage.setItem("users",JSON.stringify(users))
    
}
const createBook = (bookName, category) => {
    let book = {
        bookId,
        category,
        bookName,
        borrowed:false
    }
    books.push(book) 
}
// check if user exists in users array, if user exists naviagte to books else deny access
const loginUser = (userId,password)=>{
const userExists = users.find((user)=>user.userId===userId && user.password===password)
if(!userExists){
    alert("ACCESS DENIED!!!")
}
else {
    window.open("./books.html", "_self")
}
} 
// function loginUser (userId,password) {}
// const registerUser = (form) =>{alert(Object.keys(form))}
// document.getElementById("registerUser").onclick = registerUser

const onRegister = event => {
    // console.log(event.target)
    event.preventDefault()
    const userId = event.target[0].value
    const emailId = event.target[1].value
    const password = event.target[2].value
    const radios = Array.from(document.getElementsByName ("userType"))
    const userType = radios.find((item)=>item.checked===true)
    // console.log(userType.value)
    createUser(userId,password,userType,emailId) 
    alert ( "Registration Successful") 
}
document.getElementById("register").addEventListener("submit",onRegister)

// log in functionality

const onLogin = event => {
    // console.log(event.target)
    event.preventDefault()
    const userId = event.target[0].value
    const password = event.target[1].value
    
    // console.log(userType.value)
    loginUser(userId,password)  
}
document.getElementById("login").addEventListener("submit",onLogin)