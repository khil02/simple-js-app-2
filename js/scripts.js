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
]; 
//testing that array is working
console.log(pokemonlist[1]);
pokemonlist[3] = {name: "Charmander", height: 2.00, type: ['fire']};  
//verifying new object was added to array correctly
console.log(pokemonlist[3]);

//For let to write out all pokemon on list currently
pokemonlist.forEach(function(pokemon) {
    document.write('<p>' + pokemon.name  + '<br>' + "  height: (" + pokemon.height + ")" )
    //If statement stating if it is a "big" pokemon
    let big = pokemon.height > 6 ? '<br>' + "That's a big one!" : "";
    document.write(big);
    
});
