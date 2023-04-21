let pokemonRepository = (function(){
    let pokemonlist= [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

// adds pokemon to the repository list
function add(pokemon){
    //This should have allowed for a set of required information, and removed the need for the "IN" If statement
    /*function trueInformation(pokemon){
        const keysBaseline = ["name", "height", "type"];
        const keysAdded = Object.keys(pokemon);

        if (keysBaseline.length !== keysAdded.length){
            return false;
        }
        for (let key of keysBaseline){
            if (!pokemon[key]){
                return false;
            }
        }
        return true
    } */

    //checks to see if it's an object
    if (typeof pokemon !== "object"){
        console.log("error not an object");
     } else if //checks if required information is part of that object
    (("name" in pokemon) === false)
    {
        console.log("error does not contain required information: name");
 
    }  else { 
        pokemonlist.push(pokemon);
    }
}
//outputs a full list of the pokemon
function getAll(){
    return pokemonlist;
}
// searches list for matching name
function search(findMe){
    let result = pokemonlist.filter((e) => e.name == findMe);
    if (result.length !== 0){
    console.log(result);
    
    //Prints out found information
    result.forEach(function(pokemon) {
        document.write('<p>' + pokemon.name  + '<br>' + "  height: (" + pokemon.height + ")" )});    
    console.log(result);
    return result;
    }
    // Returns as false and prints out Not Found
    else { 
        result = false;
        console.log(result);
        document.write('<p>' +"Not Found" );
        return result;
    }
}
function addListItem(pokemon){
    let pokedex = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = (pokemon.name);
    button.classList.add("pokedexButton");
    listItem.appendChild(button);
    pokedex.appendChild(listItem);

    //Listens for button click
    button.addEventListener('click', function(event){
        showDetails(pokemon)
    })
}
//shows the details on screen
function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
        console.log(pokemon);
    });
}

function loadList(){
    return fetch(apiUrl).then(function (response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function(item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}

//calls the details of the pokemon from the list
function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
        return response.json();
    }).then(function (details){
        //adds the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function(e){
        console.error(e);
    });
}

return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

     //   document.write('<p>' + pokemon.name  + '<br>' + "  height: (" + pokemon.height + ")"+'</p>' )
    //     //If statement stating if it is a "big" pokemon
    //     let big = pokemon.height > 6 ? '<br>' + "That's a big one!" : "";
    //     document.write(big);
//});


