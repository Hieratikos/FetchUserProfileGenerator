const url = "https://randomuser.me/api/";
let btn = document.querySelector("#btn");
let fullNameDisplay = document.querySelector("#fullname");
let userNameDisplay = document.querySelector("#username");
let emailDisplay = document.querySelector("#email");
let cityDisplay = document.querySelector("#city");
let avatarDisplay = document.querySelector("#avatar");

btn.addEventListener("click", function(){
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)
        .catch(printError)
});

function handleErrors(response){
    if (!response.ok){
        throw Error(response.status);
    }
    return response;
}

function parseJSON(response){
    //a then() function must be attached to the .json() method so the data is processed before it is passed along.
    return response.json().then(function(parsedData){
        //the data is stored in an array; return the first person
        return parsedData.results[0];
    })
}

function updateProfile(person){
    fullNameDisplay.innerHTML = person.name.first[0].toUpperCase() + person.name.first.substring(1) + " " +
        person.name.last[0].toUpperCase() + person.name.last.substring(1);
    userNameDisplay.innerHTML = person.login.username;
    emailDisplay.innerHTML = person.email;
    cityDisplay.innerHTML = person.location.city[0].toUpperCase() + person.location.city.substring(1);
    avatarDisplay.src = person.picture.large;
}

function printError(response){
    console.log("Printed Error status: " + response);
}