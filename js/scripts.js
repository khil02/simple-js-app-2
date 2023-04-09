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
pokemonlist[3] = {name: "Charmander", height: 2, type: ['fire']};  
//verifying new object was added to array correctly
console.log(pokemonlist[3]);