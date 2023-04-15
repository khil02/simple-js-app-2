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

        if (keysBaseline.length !== keysAdded){
            return false;
        }
        for (let key of keysBaseline){
            if (keysBaseline[key] !== pokemon[key]){
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
return {
    add: add,
    getAll: getAll,
    search: search
    };
})();

pokemonRepository.add({name: "Charmander", height: 2.00, type: ['fire']});  

// testing additions that need to be removed
pokemonRepository.add({name: "Charmander", type: ['fire']}); 
pokemonRepository.add("Test");   

//ForEach to write out all pokemon on list currently
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>' + pokemon.name  + '<br>' + "  height: (" + pokemon.height + ")" )
    //If statement stating if it is a "big" pokemon
    let big = pokemon.height > 6 ? '<br>' + "That's a big one!" : "";
    document.write(big);
    
});
// searchs for specific name
pokemonRepository.search("Charmander");



