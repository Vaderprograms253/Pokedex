window.onload = function () {
    loadPage();
    addFormHandler();
}

function addFormHandler()
{
    let formBtn = document.getElementById("add-btn");
    formBtn.onclick = formSubmit;
}

function formSubmit(event)
{
    event.preventDefault();
    console.log("Test");

    let newDrink ={
        name: document.getElementById("drink_name").value,
        price: document.getElementById("drink_price").value,
        calories: document.getElementById("drink_cal").value,
        caffeinated: true,
        sugarFree: true
        //caffeinated: document.getElementById("caffeinated").value,
       // sugarFree: document.getElementById("sugar-free").value

    };

    let uri = "http://localhost:8080/drinks"
    let params = {
        method: "post",
        mode: "cors",
        body: JSON.stringify(newDrink),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(uri, params)
        .then(function (response){
            console.log(response);
            return response.json();
        })
        .then(function (json){
            console.log(json);
            addNewDrink(json);
        })


}


//method to append new elements
function addNewDrink(drink)
{
    let list = document.getElementById("drinks");

    let drinkName = drink.name;
    let calories = drink.calories;
    let price = drink.price;

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = drinkName;
    tr.appendChild(td);
    list.appendChild(tr);

    //add calories
    let tdCalories = document.createElement("td");
    tdCalories.innerHTML = calories;
    tr.appendChild(tdCalories);

    //add price
    let tdPrice = document.createElement("td");
    tdPrice.innerHTML = price;
    tr.appendChild(tdPrice);

    //add btn
    let aEdit = document.createElement("a");
    let tdEdit = document.createElement("td");
    aEdit.innerHTML = "Edit";
    tdEdit.appendChild(aEdit);
    tr.appendChild(tdEdit);

    //delete btn
    let aDelete = document.createElement("a");
    let tdDelete = document.createElement("td");
    aDelete.innerHTML = "Delete";
    tdDelete.appendChild(aDelete);
    tr.appendChild(tdDelete);
}

function loadPage()
{
    let uri = "http://localhost:8080/drinks";
    let params = {
        method: "get",
        mode: "cors"
    };

    fetch(uri, params)
        .then(function (response){
            console.log(response);
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            showDrinks(json);
        })
}

function showDrinks(drinks)
{
    let list = document.getElementById("drinks");

    for (let i = 0; i < drinks.length ; i++) {

        let drink = drinks[i];

        addNewDrink(drink);

    }


}