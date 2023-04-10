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
for (let i=0; i < pokemonlist.length; i++){
    document.write('<p>' + pokemonlist[i].name  + '<br>' + "  height: (" + pokemonlist[i].height + ")" )
    //If statement stating if it is a "big" pokemon
    let big = pokemonlist[i].height > 6 ? '<br>' + "That's a big one!" : "";
    document.write(big);
}