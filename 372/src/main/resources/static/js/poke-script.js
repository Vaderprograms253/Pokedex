window.onload =  function (){
    load();
    addFormHandler();

}


let totalPokemon; // total number of pokemon
let count = 0; //count tds appended

async function load()
{
    let uri = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    let params = {
        method: "get",
        mode: "cors",
    };

    fetch(uri, params)
       .then(function (response){
           //console.log(response);
           return response.json();
       })
       .then(function (json){
           //console.log(json);
          showPokemon(json);
       })
}



 function showPokemon(pokemon)
{
    let pokeList = pokemon.results;
    totalPokemon = pokemon.count;
    for (let i = 0; i < pokeList.length ; i++) {
        let poke = pokeList[i];
        addNewPokemon(poke);
    }
}




function addNewPokemon(pokemon)
{
    //console.log(pokemon);
    list = document.getElementById("poke-table");
    let name = pokemon.name;
    let pokemonUrl = pokemon.url;
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    tr.setAttribute("id", "tr-" +  name);
    td.setAttribute("id", "td-name-" + name);
    tr.addEventListener("click" ,getAllMoves);
    tr.addEventListener("click", getAllStats)

    tr.url = pokemonUrl;
    let pokeName = capitalizeFirstLetter(name)
    td.innerHTML = pokeName;

    tr.appendChild(td)
    list.appendChild(tr)

    let uri = pokemonUrl;
    let params = {
        method: "get",
        mode: "cors",
    };

    fetch(uri, params)
        .then(function (response){
           // console.log(response);
            return response.json();
        })
        .then(async function (json) {
           // console.log(json);
            await getPokeType(json);
        })
}

function getPokeType(pokemon)
{
   // console.log(pokemon);
    let tr = document.getElementById("tr-" + pokemon.name);
    //console.log(tr);
    let pokeTypes = "";
    let type = "";
    let list = pokemon.types;
    let tdType = document.createElement("td");

    for (let i = 0; i < list.length ; i++) {
       // console.log(list[i].type.name);

        tdType.setAttribute("id", "td-type-" + pokemon.name);

        type = capitalizeFirstLetter(list[i].type.name);
        pokeTypes += type + getTypeImg(type) + "/"
    }
    let lastIndex = pokeTypes.lastIndexOf("/");
    tdType.innerHTML = pokeTypes.slice(0, lastIndex);
    //console.log(typeResult);
    tr.appendChild(tdType);
    count++;

    //make sure all table entries appear before using data table
    if (count === totalPokemon)
    {
        displayDataTable();
    }

}

function getTypeImg(type)
{
    switch (type)
    {
        case "Grass":
            return '<img src="https://www.clipartmax.com/png/small/322-3228843_pokemon-type-symbols-download-grass-type-pokemon-icon.png" class="type-img" alt="Pokemon Type Symbols Download - Grass Type Pokemon Icon @clipartmax.com">'
        case "Normal":
            return '<img src="images/normal.png" class="type-img" alt="normal image icon">';
        case "Ground":
            return '<img src="images/ground.png" class="type-img" alt="ground image icon">';
        case "Rock":
            return '<img src="images/rock.png" class="type-img" alt="rock image icon">';
        case "Fire":
            return '<img src="https://www.clipartmax.com/png/small/83-830894_fire-type-pokemon-symbol-pokemon-fire-type-logo.png" class="type-img" alt="Fire-type Pokemon Symbol - Pokemon Fire Type Logo @clipartmax.com">';
        case "Ice":
            return '<img src="images/ice.png" class="type-img" alt="ice image icon">';
        case "Flying":
            return '<img src="images/flying.png" class="type-img" alt="flying image icon">';
        case "Ghost":
            return '<img src="images/ghost.png" class="type-img" alt="ghost image icon">';
        case "Steel":
            return '<img src="images/steel.png" class="type-img" alt="steel image icon">';
        case "Water":
            return '<img src="https://www.clipartmax.com/png/small/26-261578_pokemon-water-type-symbol.png" class="type-img" alt="Pokemon Water Type Symbol @clipartmax.com">';
        case "Fighting":
            return '<img src="https://www.clipartmax.com/png/small/322-3228840_pokemon-type-symbols-download-pokemon-fighting-type-png.png" class="type-img" alt="Pokemon Type Symbols Download - Pokemon Fighting Type Png @clipartmax.com">';
        case "Psychic":
            return '<img src="images/psychic.png" class="type-img" alt="psychic image icon">';
        case "Dragon":
            return '<img src="images/dragon.png" class="type-img" alt="dragon image icon">';
        case "Fairy":
            return '<img src="images/fairy.png" class="type-img" alt="fairy image icon">';
        case "Electric":
            return '<img src="images/eletric.png" class="type-img" alt="eletric image icon">';
        case "Poison":
            return '<img src="images/poison.png" class="type-img" alt="poison image icon">';
        case "Bug":
            return '<img src="images/bug.png" class="type-img" alt="bug image icon">';
        case "Dark":
            return '<img src="images/dark.png" class="type-img" alt="dark image icon">';
    }




}

function capitalizeFirstLetter(pokeString)
{
    return pokeString.charAt(0).toUpperCase() + pokeString.slice(1);
}

//TODO display move information on click

function getAllMoves(event)
{

//    console.log(event.currentTarget.url);

    let uri = event.currentTarget.url;
    let params = {
        method: "get",
        mode: "cors"
    };

    fetch(uri, params)
        .then(function (response){
          //  console.log(response);
            return response.json();
        })
        .then(function (json){
           // console.log(json);
            displayMoves(json);
        })
}


//TODO: Fix dataTable work around
 function displayDataTable()
{
    $(document).ready(function () {
        $('#table').DataTable();
    });
}


function displayMoves(pokemon)
{

    //console.log(pokemon);
    let pokemonSelected = document.getElementById("pokemon-selected");
    let moveList = document.getElementById("move-list");
    let pokeMoves = "";


     for (let i = 0; i < pokemon.moves.length; i++) {
         let list = document.getElementById("poke-list");
       //  console.log(pokemon.moves[i].move.name);
          pokeMoves += "<li class='list-group-item'>" + capitalizeFirstLetter(pokemon.moves[i].move.name) + "</li> ";
        // console.log(moveList);
         }
     //console.log(pokeMoves)
    pokemonSelected.innerHTML = "Pokemon selected: " + capitalizeFirstLetter(pokemon.name);
    moveList.innerHTML = pokeMoves;

}

function getAllStats(event)
{
    let uri = event.currentTarget.url;
    let params = {
        method: "get",
        mode: "cors"
    };

    fetch(uri, params)
        .then(function (response){
            //  console.log(response);
            return response.json();
        })
        .then(function (json){
           // console.log(json);
            displayStats(json);
        })
}

function displayStats(pokemon)
{
   // console.log(pokemon)
    let pokemonSelected = document.getElementById("pokemon-selected")
    let statsList = document.getElementById("stats-list");
    let stats = "";

    for (let i = 0; i < pokemon.stats.length; i++) {
      //  console.log(pokemon.stats[i]);
        let statNum = pokemon.stats[i].base_stat;
        let statImage = getStatImg(pokemon.stats[i].stat.name);
        stats += "<li class='list-group-item'>" + statImage + capitalizeFirstLetter(pokemon.stats[i].stat.name) + ": " + statNum + "</li>"

    }
    statsList.innerHTML = stats;
}

function getStatImg(stat)
{
    console.log(stat);
    switch (stat)
    {
        case "speed":
            return '<img src="images/speed.png" class="stat-img" alt="dark image icon">';
        case "defense":
            return '<img src=\"https://www.clipartmax.com/png/small/19-193880_clipart-info-shield-png.png\" class="stat-img" alt=\"Clipart Info - Shield Png @clipartmax.com\">';
        case "hp":
            return "<img src=\"https://www.clipartmax.com/png/small/0-8681_love-clipart-heart-symbol.png\" class='stat-img' alt=\"Love - Clipart - Heart Symbol @clipartmax.com\">";
        case "attack":
            return "<img src=\"https://www.clipartmax.com/png/small/4-42874_cartoon-crossed-swords.png\" class='stat-img' alt=\"Cartoon Crossed Swords @clipartmax.com\">";
        case "special-attack":
            return "<img src=\"https://www.clipartmax.com/png/small/34-344041_orange-caution-icon-clip-art-at-clker-exclamation-button.png\" class='stat-img' alt=\"Orange Caution Icon Clip Art At Clker - Exclamation Button @clipartmax.com\">";
        case "special-defense":
            return "<img src=\"https://www.clipartmax.com/png/small/6-63003_do-not-proceed-if-this-is-an-emergency-stop-hand.png\" class='stat-img' alt=\"Do Not Proceed If This Is An Emergency - Stop Hand @clipartmax.com\">";
    }
}

function addFormHandler()
{
    let addBtn = document.getElementById("add-btn");
    addBtn.onclick = savePokemon;

}

function savePokemon(event)
{
    event.preventDefault();
    console.log("Test");
    let poke_moves = [];
    let poke_moves_select = document.getElementById("poke-moves");
    let poke_name = document.getElementById("poke-name").value;
    let poke_type = document.getElementById("poke-type").value;
    const poke_stats_default = [25,10,10,10,20];
    console.log(poke_name);
    console.log(poke_type);

    for (let i = 0; i < poke_moves_select.length ; i++)
    {
        if (poke_moves_select[i].selected)
        {
            poke_moves.push(poke_moves_select[i].value);
        }
    }

    let newPokemon = {
        name: poke_name,
        type: poke_type,
        moves: poke_moves,
        stats: poke_stats_default
    };

    let uri = "http://localhost:8080/pokemon"
    let params = {
        method: "post",
        mode: "cors",
        body: JSON.stringify(newPokemon),
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
            addCustomPokemon(json);
        })
}

function addCustomPokemon(pokemon)
{
    let table = $('table').DataTable();
    table.rows.add([{
        "name" : pokemon.name,
        "type" : pokemon.type,
        "moves": pokemon.moves,
        "stats": pokemon.stats
    }])
        .draw();
}



