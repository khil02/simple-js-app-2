let pokemonRepository = (function(){
    let pokemonlist= [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector("#modal-container");

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

/* Not in use currently
//searches list for matching name
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
*/

//Generates button list
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
        //showModal (title, height, weight, types, img, imgFancy)
        showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.types, pokemon.imageUrl, pokemon.imageUrlFancy);
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

    }).catch(function(e){
        console.error(e);
    });
}

//creates Modal to display pokemon information
function showModal (title, height, weight, types, img, imgFancy){

    modalContainer.innerHTML = " ";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeModalButton = document.createElement("button");
    closeModalButton.classList.add("modal-close");
    closeModalButton.innerText = "Close";
    closeModalButton.addEventListener("click", hideModal);

    let modalTitle = document.createElement("h2");
    modalTitle.innerText = title;

    let modalText = document.createElement("p");
    // Adds Types to an array by pulling them out of the object they are in
    typesArray = [];
    for (let i = 0; i < types.length; i++){
        typesArray.push(" " + types[i].type.name);
    };
    // Prints out information about pokemon
    modalText.innerText = "  Height: " + (height*.1).toFixed(2) + "m" + "\n Weight: " + (weight*.1) + "kg" + "\n Types: " + typesArray;


    let modalImage = document.createElement("img");
    //Checks to see if fancy mode is on
    modalImage.src = modalContainer.classList.contains("fancy") ? imgFancy : img;
    modalImage.classList.add("pokemon-image");

    if (fancyOn){
        modal.classList.add("fancy");
        closeModalButton.classList.add("fancy");
    };

    //builds Modal
    modal.appendChild(closeModalButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalImage);
    modal.appendChild(modalText);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
    // closes modal if clicked outside of it
    modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer){
            hideModal();
        }
    });
}
// hides Modal
function hideModal(){
    modalContainer.classList.remove("is-visible");
}
let fancyModeButton = document.querySelector(".fancy-mode");
let fancyOn = false;
fancyModeButton.addEventListener("click", fancyMode);

//Toggles using sprites or official artwork
function fancyMode(){
    modalContainer.classList.toggle("fancy");
    //toggles on and off
    fancyOn = !fancyOn;
    if (fancyOn){
    fancyModeButton.innerText = "Fancy Mode: On"
} else {
    fancyModeButton.innerText = "Fancy Mode: Off"
};
}

return {
    add: add,
    getAll: getAll,
    //search: search,
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

