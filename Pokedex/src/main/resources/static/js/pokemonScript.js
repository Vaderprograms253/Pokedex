window.onload = function ()
{
    load();
}



let pokemonTotal;
let count = 0;

async function load()
{
    let uri = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    let params = {
        method: "get",
        mode: "cors",
    };

    fetch(uri, params)
        .then(function (response){
            return response.json();
        })
        .then(function (json){
            showPokemon(json);
        })
}

function showPokemon(pokemon)
{
    let pokemonList = pokemon.results;
    pokemonTotal = pokemon.count;
    console.log(pokemonTotal);
    for (let i = 0; i < pokemon.count; i++){
        let nextPokemon = pokemonList[i];
        addNewPokemon(nextPokemon);
    }
}

function addNewPokemon(pokemon)
{
    let list = document.getElementById("pokeTableBody");
    let name = pokemon.name;
    let pokemonUrl = pokemon.url;
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    tr.setAttribute("id", "tr-" +  name);
    tr.setAttribute("data-bs-toggle", "modal")
    tr.setAttribute("data-bs-target", "#pokeModal")
    td.setAttribute("id", "td-name-" + name);
    tr.addEventListener("click", getMoreInfo);
    tr.url = pokemonUrl;
    name = capitalizeFirstLetter(name);
    td.innerHTML = name;
    tr.appendChild(td);
    list.appendChild(tr);


    let uri = pokemonUrl;
    let params = {
        method: "get",
        mode: "cors",
    };

    fetch(uri, params)
        .then(function (response){
            return response.json();
        })
        .then(function (json){
            getPokemonType(json);
        })


}

function getPokemonType(pokemon)
{
    let tr = document.getElementById("tr-" + pokemon.name);
    let pokeTypes = "";
    let type = "";
    let list = pokemon.types;
    let tdType = document.createElement("td");
    for (let i = 0; i < list.length; i++)
    {
        tdType.setAttribute("id", "td-type-" + pokemon.name);
        type = capitalizeFirstLetter(list[i].type.name);
        pokeTypes += type + "/";

    }
    console.log("Test");
    tr.appendChild(tdType);
    count++;
    let lastIndex = pokeTypes.lastIndexOf("/");
    tdType.innerHTML = pokeTypes.slice(0, lastIndex);

    displayDataTable();

}

function capitalizeFirstLetter(pokeString)
{
    return pokeString.charAt(0).toUpperCase() + pokeString.slice(1);
}

function displayDataTable()
{

    if (count === pokemonTotal)
    {
        $(document).ready(function () {
            $("#pokeTable").DataTable();
        });

    }
}

function getMoreInfo(event)
{
    let uri = event.currentTarget.url;
    let params = {
        method: "get",
        mode: "cors"
    };

    fetch(uri, params)
        .then(function (response){
            return response.json();
        })
        .then(function (json){
            displayInfo(json);
        })
}

function displayInfo(pokemon)
{
    let modalName = document.getElementById("modal-name");
    let name = pokemon.name;
    let pokemonImage = document.getElementById("pokemonImage");
    let appearancesList = document.getElementById("gameAppearances");
    pokemonImage.setAttribute("alt", pokemon.name + " image");
    pokemonImage.setAttribute("src", pokemon.sprites.front_default);
    name = capitalizeFirstLetter(name)
    modalName.innerHTML = name;
    for (let i = 0; i < pokemon.game_indices.length; i++) {
        console.log(pokemon.game_indices[i].version.name);
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("class", "dropdown-item");
        a.setAttribute("href", "#");
        a.innerHTML = pokemon.game_indices[i].version.name;
        li.appendChild(a);
        appearancesList.appendChild(li);
    }
   // appearancesList.appendChild()
}