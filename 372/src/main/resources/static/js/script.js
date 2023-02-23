window.onload = function () {
    loadPage();
    addFormHandler();
    editHandler();
}
let list;


function addFormHandler()
{
    let formBtn = document.getElementById("add-btn");
    formBtn.onclick = formSubmit;
}

function editHandler()
{
    let saveBtn = document.getElementById("save-btn");
    saveBtn.onclick = saveDrink;
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
    tr.setAttribute("id", "tr-" + drinkName);
    let td = document.createElement("td");
    td.setAttribute("id", "td-name-" + drinkName);
    td.innerHTML = drinkName;
    tr.appendChild(td);
    list.appendChild(tr);

    //add calories
    let tdCalories = document.createElement("td");
    tdCalories.setAttribute("id", "td-cal-"+ drinkName);
    tdCalories.innerHTML = calories;
    tr.appendChild(tdCalories);

    //add name
    let tdPrice = document.createElement("td");
    tdPrice.setAttribute("id", "td-price-" + drinkName);
    tdPrice.innerHTML = price;
    tr.appendChild(tdPrice);

    //add btn
    let btnEdit = document.createElement("button");
    let tdEdit = document.createElement("td");
    btnEdit.innerHTML = "Edit";
    let editBtnId = "edit-btn" + drink.name;
    btnEdit.setAttribute("id", editBtnId);
    btnEdit.setAttribute("onclick", "editDrink(this.id)");
    tdEdit.appendChild(btnEdit);
    tr.appendChild(tdEdit);

    //delete btn
    let btnDelete = document.createElement("button");
    let tdDelete = document.createElement("td");
    btnDelete.innerHTML = "Delete";
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

function editDrink(editedDrink)
{

    let drink = editedDrink.slice(8);
    let editBtn = document.getElementById("edit-btn" + drink);
    let saveBtn = document.getElementById("save-btn")
    editBtn.style.display = "none";
    saveBtn.style.display = "block";
    let name = document.getElementById("td-name-" + drink);
    let cal = document.getElementById("td-cal-" + drink);
    let price = document.getElementById("td-price-" + drink);
    let nameValue = name.innerHTML;
    let priceValue = price.innerHTML;
    let calValue = cal.innerHTML;

    name.innerHTML = "<input type='text' class='"+ drink +"' id='input-name-"+ drink +"' value='" + nameValue +"'> "
    price.innerHTML = "<input type='text' class='"+ drink +"' id='input-price-"+ drink +"' value='" + priceValue +"'> "
    cal.innerHTML = "<input type='text' class='"+ drink +"' id='input-cal-"+ drink +"' value='" + calValue +"'>"
    document.getElementById("save-btn").addEventListener("click", function(event){
        event.preventDefault();
    });

}

function saveDrink(drink)
{
    let updatedDrink ={
        name: document.getElementById("input-name-" + drink).value,
        price: document.getElementById("input-price-" + drink).value,
        calories: document.getElementById("input-cal-" + drink).value,
        caffeinated: true,
        sugarFree: true
        //caffeinated: document.getElementById("caffeinated").value,
        // sugarFree: document.getElementById("sugar-free").value

    };

    let uri = "http://localhost:8080/drinks"
    let params = {
        method: "put",
        mode: "cors",
        body: JSON.stringify(updatedDrink),
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
        })

    let name = document.getElementById("input-name-" + drink).value;
    let price = document.getElementById("input-price-" + drink).value;
    let cal = document.getElementById("input-cal-" + drink).value;

    document.getElementById("td-name-" +drink).innerHTML = name;
    document.getElementById("td-cal-" +drink).innerHTML = cal;
    document.getElementById("td-price-" +drink).innerHTML = price;


}



 function removeDrink(drink)
{
    let uri = "http://localhost:8080/drinks/" + drink;
    let params = {
        method: "delete",
        mode: "cors"
    };

     fetch(uri, params)
        .then(function (response){
            console.log(response);
            return response;
        })
        .then(function (json) {
            console.log(json);
            deleteDrink(drink);
        })
}

function deleteDrink()
{
    window.location.reload();
}

function showDrinks(drinks)
{

    for (let i = 0; i < drinks.length ; i++) {

        let drink = drinks[i];

        addNewDrink(drink);

    }


}