window.onload = function ()
{
    load();

}



let pokemonTotal;
let count = 1;

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
        count++;
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
    td.setAttribute("id", "td-name-" + name);
    name = capitalizeFirstLetter(name);
    td.innerHTML = name;
    tr.appendChild(td);
    list.appendChild(tr);

    displayDataTable();

}

function capitalizeFirstLetter(pokeString)
{
    return pokeString.charAt(0).toUpperCase() + pokeString.slice(1);
}

function displayDataTable()
{
    console.log("count = " + count);
    console.log("total = " + pokemonTotal);
    if (count === pokemonTotal)
    {
        $(document).ready(function () {
            $("#pokeTable").DataTable();
        });
    }
}