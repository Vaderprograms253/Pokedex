window.onload = function ()
{
    load();
}

let pokemonTotal;

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
    for (let i = 0; i < pokemonList.length; i++){
        let nextPokemon = pokemonList[i];
        addNewPokemon(nextPokemon);
    }
}

function addNewPokemon(pokemon)
{
    console.log(pokemon.name);
}