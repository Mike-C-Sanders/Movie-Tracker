//GLobal Variables from index1
var searchReq = document.querySelector('#search');
var searchButtonMain = document.querySelector('#main-search-button');
var searchFormMain = document.querySelector('#main-search-form')

//Global Variables from index2
var cardGroup = document.querySelector('#cards');
//apiVariables
var apiKey = 'e5c6820448msh7847cebfda8cfe4p116a77jsn0dcf262600c9';
var apiRequest = 'https://movie-database-imdb-alternative.p.rapidapi.com/?s='

var myData;
var userSearch;

//fetch API from movie database
var getMovieResults = function(movieSearchByUser){

    fetch(apiRequest+ movieSearchByUser, {"method": "GET",
    "headers": {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "e5c6820448msh7847cebfda8cfe4p116a77jsn0dcf262600c9"
        }
    })
        .then(function(response){
            return response.json();
    })
        .then(function(json){
            myData =json;
            console.log(myData.Search[0].imdbID);

            //print the movie cards to the screen
            printResults(json.Search);
            
    })
        .catch(function(error){
        console.log(error);
    });
}

//Loops through the movie results array and finds then calls the create movie card function
var printResults = function(movieArr){
    for(var i = 0; i < movieArr.length; i++){
        //create each movie card and print to the screen
        if(movieArr[i].Type === 'movie'){

            createMovieCard(movieArr[i]);
        }
    }

}

//Create the movie card based on fetch results
var createMovieCard = function(movie){
    //Card Body
    var cardBody = document.createElement('div');
    cardBody.classList.add('card', 'm-3');
    cardBody.style.width ='19rem';
    //Card poster Image
    var poster = document.createElement('img');
    poster.src = movie.Poster;
    poster.classList.add('img-thumbnail', 'card-img-top');
    poster.style.width = '19rem';

    //Card text container
    var cardText = document.createElement('div');
    cardText.classList.add('card-body', 'text-center');

    //Card Movie Title
    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-danger', 'd-flex', 'flex-wrap', 'justify-content-center')
    cardTitle.innerHTML = `${movie.Title}`

    var cardYear = document.createElement('h5');
    cardYear.classList.add('card-title', 'text-danger', 'd-flex', 'flex-wrap', 'justify-content-center');
    cardYear.innerHTML = `<span class='m-3 text-dark'>${movie.Year}</span>`;

    //Card Button
    var cardButton = document.createElement('button');
    cardButton.classList.add('btn', 'btn-danger', 'show-info-button');
    cardButton.innerHTML = 'Show more';
    //Set the imdb id attribute to populate modal details
    cardButton.setAttribute('imdbid', movie.imdbID);
    cardButton.setAttribute('data-toggle', 'modal');
    cardButton.setAttribute('data-target', '#movie-results');
    cardButton.addEventListener('click', getInfoModal);


    cardText.appendChild(cardTitle);
    cardText.appendChild(cardYear);
    cardText.appendChild(cardButton);
    
    cardBody.appendChild(poster);
    cardBody.appendChild(cardText);

    cardGroup.appendChild(cardBody);
    
}

//* Search for movie
var searchForMovie = function(event){

    event.preventDefault();
    userSearch = searchReq.value;

    var queryString = `./searchResults.html?q=${userSearch}`;
    location.assign(queryString);
}


//ensures if the element is on the page the event will perform.
if(searchFormMain){

    searchFormMain.addEventListener('submit', searchForMovie);
}

//Get the users search parameter
var getSearch = function(){
    var searchParam = document.location.search;

    //conditional to prevent the call on a page with no search.
    if(searchParam.includes('?q=')){
        var movieSearched = searchParam.split('=').pop();

        getMovieResults(movieSearched);
    };
    
}

//Call get search function
getSearch();