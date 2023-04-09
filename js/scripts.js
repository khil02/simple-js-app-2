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
console.log(pokemonlist[1]);
pokemonlist[3] = {name: "Charmander", height: 2, type: ['fire']};  
console.log(pokemonlist[3]);