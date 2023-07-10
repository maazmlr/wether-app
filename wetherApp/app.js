var searchButton = document.querySelector(".search-img")
async function getLoc()
{
       
var searchValue =document.getElementById("search").value

await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=1&appid=eeb556dc381bf6e4c3745570a9aa25c1`)
.then(res => res.json())
.then(res => [res[0]['lat'], res[0]['lon'],res[0]['country'],res[0]['state'],res[0]['name']])
.then(res =>{
 getSpecificWeatherLocation(res)
})
.catch(err => alert("not found"))

}

 function getCurrentLocation(){
    if (navigator.geolocation)
    {
     navigator.geolocation.getCurrentPosition(location=>abc(location))

        async function abc(location)

        {
        await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location['coords']['latitude']}&longitude=${location['coords']['longitude']}&localityLanguage=en `)
        .then(res => res.json())
        .then(res =>[res["latitude"], res["longitude"], res['countryCode'],res['principalSubdivision'],res['city']])
        .then(getSpecificWeatherLocation)
    }
    }
}


async function getSpecificWeatherLocation(res){
    let country=document.querySelector(".country")
    let state=document.querySelector(".state")
    let city=document.querySelector(".city-name")
    country.textContent=`Country: ${res[2]}`
    state.textContent=`State: ${res[3]}`
    city.textContent=` ${res[4]}`
    

    await fetch(` https://api.openweathermap.org/data/2.5/weather?lat=${res[0]}&lon=${res[1]}&appid=eeb556dc381bf6e4c3745570a9aa25c1&units=metric `)
    .then(loc => loc.json())
    .then(loc =>{
        let type=document.querySelector(".type")
        var w=document.querySelector(".w")
        let temprature=document.querySelector(".temprature")
        var feelslike=document.querySelector(".feelslike")
        let humidity=document.querySelector(".humidity")
        let wind = document.querySelector(".wind")
        let img=document.querySelector(".w")
        let main_div=document.querySelector(".main-div")
        // if (loc['weather'][0]['main']=="Clear")
        // {
        //     document.body.style.color="black"
        // }
        
        console.log(loc['weather'][0]['main'])
        type.textContent=`${loc['weather'][0]['main']}`
        temprature.textContent=`${loc['main']['temp']}`
        feelslike.textContent=`${loc['main']['feels_like']}`
        humidity.textContent=`${loc['main']['humidity']}%`
        wind.textContent=`${(loc['wind'][`speed`]*3).toFixed(2)} Km/h`
        console.log(loc['main']['temp'])
        img.src = `./img/${loc['weather'][0]['main']}.svg`;
        main_div.style.backgroundImage=`url('img/${loc['weather'][0]['main']}.gif')`


    console.log(loc)}
    
    )
    .catch(err => console.log(err))

}

searchButton.addEventListener("click",getLoc)
getCurrentLocation()