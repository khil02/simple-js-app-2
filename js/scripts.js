let pokemonRepository = (function(){
    let pokemonlist= [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContent = document.querySelector(".modal-content");
  

// adds pokemon to the repository list
function add(pokemon){
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

//Generates button list
function addListItem(pokemon){
    let pokedex = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = (pokemon.name);
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    button.setAttribute("aria-pressed","false"); 
    button.setAttribute("autocomplete","off");
    $(button).addClass("pokedexButton list-group-item btn col btn-outline-info");
    $(listItem).addClass("list-group-item")
    listItem.appendChild(button);
    pokedex.appendChild(listItem);

    //Listens for button click
    button.addEventListener('click', () => {
        showDetails(pokemon)
    });
}
//shows the details on screen
function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
        showModal(pokemon);
    });
}
//Adds a loading GIF at the top of the body
function showLoadingMessage(){
    let loading = document.getElementById("loadingBox");
    let loadingTag = '<img src="img/Ball-1s-200px.svg" id="loadingBall">';
    loading.innerHTML = loadingTag;
        
}
//Remove that loading GIF
function removeLoadingMessage(){
    let RemoveLoading = document.querySelector("#loadingBall");
    RemoveLoading.parentElement.removeChild(RemoveLoading);
}

//pulls the pokemon data from the API and adds it to an internal array
function loadList(){
    showLoadingMessage();
    return fetch(apiUrl).then(function (response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function(item){
            let pokemon = {
                //capitalizes the first letter of the Pokemon's name
                name: item.name.charAt(0).toUpperCase()+item.name.substr(1),
                detailsUrl: item.url
            };
            add(pokemon);
        });
        removeLoadingMessage();
    }).catch(function(e){
        removeLoadingMessage();
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
        item.weight = details.weight;
        item.types = details.types;
        item.imageUrlFancy = details.sprites.other['official-artwork'].front_default;
        item.abilities = details.abilities;

    }).catch(function(e){
        console.error(e);
    });
}

//creates Modal to display pokemon information
function showModal (pokemon){
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    //let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    //showModal (title, height, weight, types, img, imgFancy)
    //adding declaring the elements to fill out the modal
    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    let pokemonHeight =$("<p>" + "Height: " + (pokemon.height*.1).toFixed(2) +"</p>");
    let pokemonWeight =$("<p>" +" Weight: " + (pokemon.weight*.1) + "kg" +"</p>");

    // Adds Types to an array by pulling them out of the object they are in
    let typesArray = pokemon.types.map((type) => " " + type.type.name.charAt(0).toUpperCase()+type.type.name.substr(1)); 
    
    let pokemonTypes = $("<p>" + "Types:" +typesArray +"</p>");

    // Adds Abilities to an array
    let abilitiesArray = pokemon.abilities.map((ability) => " " + ability.ability.name.charAt(0).toUpperCase()+ability.ability.name.substr(1));
    let pokemonAbilities = $("<p>" + "Abilities:" +abilitiesArray +"</p>");
    let pokemonImg = $("<img class = modal-image style='width:100%'>"); 
    
    pokemonImg.attr("src", (modalContent.classList.contains("fancy") ? pokemon.imageUrlFancy : pokemon.imageUrl));  

    //Checks to see if fancy mode is on
    if (fancyOn){
        $(".modal-content").addClass("fancy");
    };

    //builds Modal
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImg);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
}

let fancyModeButton = document.querySelector(".fancy-mode");
let fancyOn = false;
fancyModeButton.addEventListener("click", fancyMode);

//Toggles using sprites or official artwork
function fancyMode(){
    modalContent.classList.toggle("fancy");
    //toggles on and off
    fancyOn = !fancyOn;
    if (fancyOn){
    fancyModeButton.innerText = "Fancy Mode: On"
} else {
    fancyModeButton.innerText = "Fancy Mode: Off"
};
}


let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", search);

//searches list for matching name(s)
function search(){

    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    let findMe = document.querySelector('#searchFor').value;
    let result = pokemonlist.filter((e) => e.name.toLowerCase().startsWith(findMe.toLowerCase()));

     if (result.length == 0){

        resultScreen = $("<h1>Results</h1>");
        noneFound = $("<p>No results match that search</p>");
        modalTitle.append(resultScreen);
        modalBody.append(noneFound);
        console.log(result);
        $("#modal-container").modal('toggle');

    //} else if (result.length == 1){
    // console.log(result);
    
    // //Prints out found information if one result is found 
    //  showDetails(result);

    } else if (result.length >= 1 ) {
        // reprints entire page if more than 1 match is found
    pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = " ";
    result.forEach(function (pokemon){
        addListItem(pokemon);
    });
    }

    // Returns as false and prints out Not Found
    else if (result.length >= 1 ) {
        // reprints entire page if more than 1 match is found
    pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = " ";
    result.forEach(function (pokemon){
        addListItem(pokemon);
    });
    }
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

