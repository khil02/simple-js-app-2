let pokemonRepository = (function(){
    let pokemonlist= [
        {
            name: "Bulbasuar",
            height: 2.04,
            type: ['grass', 'poison']
        },
        {
            name: "Ivyasuar",
            height: 3.03,
            type: ['grass', 'poison']
        },
        {
            name: "Venusuar",
            height: 6.07,
            type: ['grass', 'poison']
        }
]
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
    (("name" in pokemon && "height" in pokemon && "type" in pokemon) === false)
    {
        console.log("error does not contain required information, name, height, and type");

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
function showDetails(pokemon){
    console.log(pokemon);
}
return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem
    };
})();

pokemonRepository.add({name: "Charmander", height: 2.00, type: ['fire']});  

// testing additions that need to be removed
pokemonRepository.add({name: "Charmander", type: ['fire']}); 
pokemonRepository.add("Test");   


pokemonRepository.getAll().forEach(function(pokemon) {
   pokemonRepository.addListItem(pokemon);
});

     //   document.write('<p>' + pokemon.name  + '<br>' + "  height: (" + pokemon.height + ")"+'</p>' )
    //     //If statement stating if it is a "big" pokemon
    //     let big = pokemon.height > 6 ? '<br>' + "That's a big one!" : "";
    //     document.write(big);
//});


