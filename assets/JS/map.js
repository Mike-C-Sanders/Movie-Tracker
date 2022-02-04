const apiKey = 'AIzaSyCHAJJ5XH4PYYCDaUhJ3Ovr73VHQIIIS1c'; // google map API
const openWeatherApiKey = "dbb76c5d98d5dbafcb94441c6a10236e";
//1 getCurrentPosition
$('#location-button').click(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            // console.log(position);      
            //2 get city name
            getCityName(position)
        });  
    }
});
//2 get city name/
const getCityName = async (position) => { // === async function getCityName(postion) {}
    const {latitude, longitude} = position.coords;
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}`, {
        method: 'GET'
    });
    const data = await response.json();
    const {name: city} = data[0] // === 'const city = data[0].name'
    // 3 in city
    const mapI = document.querySelector('#map');
    mapI.setAttribute('style', 'width:95%; height:70vh');
    mapI.setAttribute('src', `https://www.google.com/maps/embed/v1/search?q=record+movietheater+in+${city}&key=${apiKey}&zoom=12&center=${latitude},${longitude}`);
}
// dan: https://developers.google.com/maps/documentation/embed/embedding-map
const mapI = document.querySelector('#map');
mapI.setAttribute('style', 'width:95%; height:70vh');
mapI.setAttribute('src', `https://www.google.com/maps/embed/v1/search?q=record+movietheater+in+seattle&key=${apiKey}&zoom=12`);

