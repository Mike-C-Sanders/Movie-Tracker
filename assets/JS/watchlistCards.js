var apiKey ='47e6015967msh57883b35319b704p1d5728jsn717c508d42e9';

//watchlist array, will change to LocalStorage eventally.
//hard coded in data for testing purposes
var watchListArray = ['tt0076759', 'tt0080684', 'tt0120915' ];

var cardGroup = $('#card-container');


function getWatchlist() {
    if (watchListArray != []) {
        //loop through watchlist ID array, do fetch call on each ID
        for(var i=0; i<watchListArray.length; i++) {
            fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${watchListArray[i]}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
		"x-rapidapi-key": apiKey
	}
})
.then(response => {
    return response.json();
})
.then(json => {
    movie = json;
    console.log(movie);
    //save json info to variable and call createcard function for each movie in array
    createCard();

})
.catch(err => {
	console.error(err);
});
        }
    }
}

function createCard() {
    //Card Body
    var cardBody = document.createElement('div');
    cardBody.classList.add('card', 'm-3');
    cardBody.style.width ='19rem';
    //Card poster Image
    var poster = document.createElement('img');
    poster.classList.add('img-thumbnail', 'card-img-top');
    poster.style.width = '19rem';

    //Card text container
    var cardText = document.createElement('div');
    cardText.classList.add('card-body', 'text-center');

    //Card Movie Title
    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-danger', 'd-flex', 'flex-wrap', 'justify-content-center')
    

    var cardYear = document.createElement('h5');
    cardYear.classList.add('card-title', 'text-danger', 'd-flex', 'flex-wrap', 'justify-content-center');
    
    //Card Button
    var cardButton = document.createElement('button');
    cardButton.classList.add('btn', 'btn-danger', 'show-info-button', 'm-2');
    cardButton.innerHTML = 'Show more';
    //Delete Button
    var delButton = document.createElement('button');
    delButton.classList.add('btn', 'btn-danger', 'delete-button', 'm-2');
    delButton.innerHTML = 'Delete';
    
    cardButton.setAttribute('data-toggle', 'modal');
    cardButton.setAttribute('data-target', '#movie-results');
    //append all card components together, and append to DOM
    cardGroup.append(cardBody);
    cardText.append(cardTitle);
    cardText.append(cardYear);
    cardText.append(cardButton); 
    cardText.append(delButton);
    cardBody.append(poster);
    cardBody.append(cardText);
    

    //update card info

    poster.src = movie.Poster;
    cardTitle.innerHTML = `${movie.Title}`
    cardYear.innerHTML = `<span class='m-3 text-dark'>${movie.Year}</span>`;
    //Set the imdb id attribute to populate modal details
    cardButton.setAttribute('imdbid', movie.imdbID);
    //button event listeners
    cardButton.addEventListener('click', getInfoModal);
    delButton.addEventListener('click', deleteFromList);
}

getWatchlist();

function deleteFromList() {
   this.parentNode.parentNode.remove();
}

