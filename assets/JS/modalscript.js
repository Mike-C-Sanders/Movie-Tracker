var APIkey = '47e6015967msh57883b35319b704p1d5728jsn717c508d42e9';
// var IMDBid = 'tt4154796';

var plotEl = $('#plot');
var actorsEl = $('#actors');
var ratingEl = $('#rating');
var movieNameEl = $('#staticBackdropLabel');
var directorEl = $('#director');
var showModalBtn = $('.show-info-button');
var addToWatch = $('.add-to-watch-list')
var modalEl = $('.modal');


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
        return response.json();
    })
    .then(data => {
        //save data to variables
        var title = data.Title;
        var director = data.Director;
        var plot = data.Plot;
        var actors = data.Actors;
        var rating = data.Ratings[0].Value;
        var movieID = data.imdbID;
        //temporary array to store ids
        var storeIDs = [];
        //get the local stored ids
        var findWatchListArray = localStorage.getItem('ids');
        
        //add movie data to modal
        movieNameEl.text(title);
        directorEl.text(director);
        plotEl.text(plot);
        actorsEl.text(actors);
        ratingEl.text(rating);
        
        modalEl.on('click', addToWatch, function(){
                if(findWatchListArray ===null){
                    storeIDs.push(movieID);
                    localStorage.setItem('ids', JSON.stringify(storeIDs));
                }
                else{
                    storeIDs = JSON.parse(findWatchListArray);
                    if(storeIDs.indexOf(movieID)===-1){ // -1 means not in the array, only add movies if they are not in an arry
                        storeIDs.push(movieID);
                        localStorage.setItem('ids', JSON.stringify(storeIDs));

                    }
                }
        });
            
    }).catch(function(error){
        console.log(error);
    })
}