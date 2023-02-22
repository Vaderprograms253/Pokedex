window.onload = function () {
    loadPage();
    addFormHandler();
}
let list;


function addFormHandler()
{
    let formBtn = document.getElementById("add-btn");
    formBtn.onclick = formSubmit;
}

function editHandler()
{

}

function editDrink(drink)
{
    let tr = document.getElementById(drink.name);
    console(drink);

    let uri = "http://localhost:8080/drinks"
    let params = {
        method: "put",
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
    list = document.getElementById("drinks");

    let drinkName = drink.name;
    let calories = drink.calories;
    let price = drink.price;

    let tr = document.createElement("tr");
   // tr.setAttribute("id", drinkName);
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
    let btnEdit = document.createElement("button");
    let tdEdit = document.createElement("td");
    btnEdit.innerHTML = "Edit";
    let editBtnId = "edit-btn" + drink.name;
    btnEdit.setAttribute("id", editBtnId);
    btnEdit.setAttribute("href", "");
    tdEdit.appendChild(btnEdit);
    tr.appendChild(tdEdit);

    //delete btn
    let btnDelete = document.createElement("button");
    let tdDelete = document.createElement("td");
    btnDelete.innerHTML = "Delete";
    let delBtnId = "del-btn" + drink.name;
    btnDelete.setAttribute("onclick", "removeDrink(this.id)");
    btnDelete.setAttribute("id", drinkName);
    tdDelete.appendChild(btnDelete);
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

 function removeDrink(drink)
{
    let uri = "http://localhost:8080/drinks/" + drink;
    let params = {
        method: "delete",
        mode: "cors"
    };
    console.log(uri);

     fetch(uri, params)
        .then(function (response){
           // console.log(response);
            return response;
        })
        .then(function (json) {
           // console.log(json);
            deleteDrink(json);
        })
}

function deleteDrink(drink)
{
    console.log(drink);
}

function showDrinks(drinks)
{

    for (let i = 0; i < drinks.length ; i++) {

        let drink = drinks[i];

        addNewDrink(drink);

    }


}