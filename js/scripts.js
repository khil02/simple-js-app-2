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
function add(pokemon){
    pokemonlist.push(pokemon);
}

function getAll(){
    return pokemonlist;
}
return {
    add: add,
    getAll: getAll
    };
})();


pokemonRepository.add({name: "Charmander", height: 2.00, type: ['fire']});  

//For let to write out all pokemon on list currently
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>' + pokemon.name  + '<br>' + "  height: (" + pokemon.height + ")" )
    //If statement stating if it is a "big" pokemon
    let big = pokemon.height > 6 ? '<br>' + "That's a big one!" : "";
    document.write(big);
    
});
