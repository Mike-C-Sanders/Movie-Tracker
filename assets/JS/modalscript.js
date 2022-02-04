var APIkey = '47e6015967msh57883b35319b704p1d5728jsn717c508d42e9';
// var IMDBid = 'tt4154796';

var plotEl = $('#plot');
var actorsEl = $('#actors');
var ratingEl = $('#rating');
var movieNameEl = $('#staticBackdropLabel');
var directorEl = $('#director');
var showModalBtn = $('.show-info-button');

function getInfoModal(event) { 
    console.log(event.target);

    var IMDBid = event.target.getAttribute('imdbid');
    console.log(IMDBid);
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?plot=short&r=json&i=${IMDBid}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
		"x-rapidapi-key": APIkey
	}
})

    .then(response => {
	console.log(response);
    return response.json();
})
    .then(data => {
    console.log(data);
    var title = data.Title;
    var director = data.Director;
    var plot = data.Plot;
    var actors = data.Actors;
    var rating = data.Ratings[0].Value;
    console.log(plot, actors, rating);


    movieNameEl.text(title);
    directorEl.text(director);
    plotEl.text(plot);
    actorsEl.text(actors);
    ratingEl.text(rating);
})
}


cardGroup.addEventListener('click', getInfoModal);




