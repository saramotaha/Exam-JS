 // var translator = $('body').translate({lang: "en", t: dict});

// function voting() {

//     $("#rateYo").rateYo({
//             rating: 3,
//             spacing: "10px",
//             numStars: 5,
//             minValue: 0,
//             maxValue: 5,
//             normalFill: 'white',
//             ratedFill: 'green',
//             readOnly: true
  
//         });
    
// }

$(".upArrow").click(function () { 
    $("html,body").animate({scrollTop:0},200);
    
    
});


$(document).ready(async function () {
    $(".loaders").fadeOut(2000);
    $("body").css("overflow", "auto")
    await runNowPlaying();
});

new WOW().init();
let widthOfSideBar = $(".sideBar").innerWidth();
$("nav").css({ left: -widthOfSideBar });



//on click on close or open icon on nav bar
$(".close").click(function () { 
    if ($("nav").css("left") == "0px") {
        $(".close").removeClass('fa-xmark');
        $(".close").addClass('fa-align-justify');
        $("li").animate({opacity:"0"},100);
        $("nav").animate({ left: -widthOfSideBar },500);
        $("#NowPlaying").slideUp(100);
        $("#popular").slideUp(200);
        $("#TopRated").slideUp(300);
        $("#trending").slideUp(400);
        $("#upComing").slideUp(500);
        $("#ContactWith").slideUp(600);
    } else {
            $(".close").removeClass('fa-align-justify');
            $(".close").addClass('fa-xmark');
            $("li").animate({opacity:1},1100);
            $("nav").animate({ left: "0px" }, 1000, function () {
             $("#NowPlaying").slideDown(100);
             $("#popular").slideDown(200);
             $("#TopRated").slideDown(300);
             $("#trending").slideDown(400);
             $("#upComing").slideDown(500);
             $("#ContactWith").slideDown(600);
          });
}
});








// Display NowPlaying Movies
async function nowPlaying() {
    let ask = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=082893ac3b42ddf4847b7c47115e7e97&language=en-US&page=1`)
    let response = await ask.json();
    return response;
}

function displayNowPlaying(res) {
    let box = "";
    for (let x = 0; x < res.results.length; x++) {
        let values = res.results[x].vote_average;
        let vote = Number(values).toFixed(1);
        box+=`<div class="col-md-4 gx-5 gy-4">
                <div class="card w-100  imgItem  position-relative overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500${res.results[x].poster_path}" class="w-100 image" alt="">
                    <figcaption class="overlay overflow-hidden animate__fadeIn position-absolute text-white captionOfImg w-100">
                        <h2 class="text-center wow ">${res.results[x].original_title}</h2>
                        <p class="px-3 wow  ">${res.results[x].overview}</p>
                        <p class="px-3 wow">release_date: ${res.results[x].release_date}</p>
                        <span class="wow  border border-1 border-success rounded-circle p-2 fs-5 ms-1"> ${vote}</span>
                        <div style="width: 600px; margin: 30px auto" id="rateYo" onload="voting()"></div>
                    </figcaption>
                    
                </div>
            </div>`
       
        
        
    }

    $(".main").html(box);
}

async function runNowPlaying() {
    let res = await nowPlaying();
    displayNowPlaying(res);

}
$("#NowPlaying").click(function (){ 
    runNowPlaying();
    add();
    
});









// Display Popular Movies

async function popularMovies() {

    let askPopularMovies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=082893ac3b42ddf4847b7c47115e7e97&language=en-US&page=1`);
    let resPopularMovies = await askPopularMovies.json();
    return resPopularMovies;
    
}

function displayPopular(popularResponse) {
    let box = "";
    for (let x = 0; x < popularResponse.results.length; x++) {
         let values = popularResponse.results[x].vote_average;
        let vote = Number(values).toFixed(1);
         box+=`<div class="col-md-4   gx-5 gy-4">
                <div class="card imgItem overflow-hidden position-relative w-100 ">
                    <img src="https://image.tmdb.org/t/p/w500${popularResponse.results[x].poster_path}" class="w-100 image" alt="">
                    <figcaption class="position-absolute overlay text-white overflow-hidden w-100 captionOfImg">
                        <h2 class="text-center">${popularResponse.results[x].original_title}</h2>
                        <p class="px-3">${popularResponse.results[x].overview}</p>
                        <p class="px-3>release_date: ${popularResponse.results[x].release_date}</p>
                        <span class="border border-1 border-success rounded-circle p-2 fs-5 ms-1"> ${vote}</span>
                    </figcaption>
                </div>
            </div>`
        
    }

$(".main").html(box);
    
}
async function runPopular() {
    let popularResponse = await popularMovies();
    displayPopular(popularResponse);

}
$("#popular").click(function (){ 
    runPopular();
    add();
    
});










// Display TopRated Movies
async function topRatedMovies() {

    let topRatedAskMovies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=082893ac3b42ddf4847b7c47115e7e97&language=en-US&page=1`);
    let topRatedResponseMovies = await topRatedAskMovies.json();
     return topRatedResponseMovies;
    
}

function displayTopRated(topRatedResponse) {
    let box = "";
    for (let x = 0; x < topRatedResponse.results.length; x++) {
        let values = topRatedResponse.results[x].vote_average;
        let vote=Number(values).toFixed(1);
        box+=`<div class="col-md-4  gx-5 gy-4">
                <div class=" position-relative w-100 card imgItem overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500${topRatedResponse.results[x].poster_path}" class="image w-100" alt="">
                    <figcaption class="position-absolute  captionOfImg text-white overlay overflow-hidden w-100">
                        <h2 class="text-center">${topRatedResponse.results[x].original_title}</h2>
                        <p  class="px-3>${topRatedResponse.results[x].overview}</p>
                        <p  class="px-3>release_date: ${topRatedResponse.results[x].release_date}</p>
                        <span class="border border-1 border-success rounded-circle p-2 fs-5 ms-1"> ${vote}</span>
                    </figcaption>
                </div>
            </div>`
        
    }

$(".main").html(box);
    
}
async function runTopRated() {
    let topRatedResponse = await topRatedMovies();
    displayTopRated(topRatedResponse);


}
$("#TopRated").click(function (){ 
    runTopRated();
    add();
    
});










// Display Trending Movies
async function trendingMovies() {

    let trendingAskMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=082893ac3b42ddf4847b7c47115e7e97&language=en-US`);
    let trendingResponseMovies = await trendingAskMovies.json();
     return trendingResponseMovies;
    
}

function displayTrending(trendingResponse) {
    let box = "";
    for (let x = 0; x < trendingResponse.results.length; x++) {
         let values = trendingResponse.results[x].vote_average;
         let vote=Number(values).toFixed(1);
        box+=`<div class="col-md-4 i gx-5 gy-4">
                <div class="card position-relative imgItem overflow-hidden w-100 ">
                    <img src="https://image.tmdb.org/t/p/w500${trendingResponse.results[x].poster_path}" class="image w-100" alt="">
                    <figcaption class="position-absolute text-white captionOfImg overlay overflow-hidden w-100">
                        <h2 class="text-center">${trendingResponse.results[x].original_title}</h2>
                        <p class="px-3>${trendingResponse.results[x].overview}</p>
                        <p class="px-3>release_date: ${trendingResponse.results[x].release_date}</p>
                        <span class="border border-1 border-success rounded-circle p-2 fs-5 ms-1"> ${vote}</span>
                    </figcaption>
                </div>
            </div>`
        
    }

$(".main").html(box);
    
}

async function runTrending() {
    let trendingResponse = await trendingMovies();
    displayTrending(trendingResponse);


}
$("#trending").click(function (){ 
    runTrending();
    add();
    
});











// Display UpComing Movies
async function upComingMovies() {

    let upComingAskMovies = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=082893ac3b42ddf4847b7c47115e7e97&language=en-US&page=1`);
    let upComingResponseMovies = await upComingAskMovies.json();
     return upComingResponseMovies;
    
}

function displayUpComing(upComingResponse) {
    let box = "";
    for (let x = 0; x < upComingResponse.results.length; x++) {
        let values = upComingResponse.results[x].vote_average;
        let vote=Number(values).toFixed(1);
        box+=`<div class="col-md-4  gx-5 gy-4">
                <div class="card imgItem overflow-hidden position-relative w-100">
                    <img src="https://image.tmdb.org/t/p/w500${upComingResponse.results[x].poster_path}" class="image w-100" alt="">
                    <figcaption px-2 class="position-absolute captionOfImg text-white  overlay overflow-hidden w-100">
                        <h2 id="google_translate_element" class="text-center">${upComingResponse.results[x].original_title}</h2>
                        <p class="px-3>${upComingResponse.results[x].overview}</p>
                        <p class="px-3>release_date: ${upComingResponse.results[x].release_date}</p>
                        <span class="border border-1 border-success rounded-circle p-2 fs-5 ms-1"> ${vote}</span>
                    </figcaption>
                </div>
            </div>`
        function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}
        
    }

$(".main").html(box);
    
}

async function runUpComing() {
    let upComingResponse = await upComingMovies();
    displayUpComing(upComingResponse);


}
$("#upComing").click(function (){ 
    runUpComing();
    add();
    
});







// Search About Wanted Movies
$(".searchInput").keyup( async function() { 
    let search = this.value;
    let responseOfSearch =await searchMovies(search);
    console.log(responseOfSearch);
    if (search=="") {
        runNowPlaying();
    }
    else {
        searchMs(responseOfSearch)
    }
});

function searchMs(responseOfSearch) {
     let box = "";
    for (let x = 0; x < responseOfSearch.results.length; x++) {
        let values =responseOfSearch.results[x].vote_average;
        let vote=Number(values).toFixed(1);
        box+=`<div class="col-md-4 gx-5 gy-4">
                <div class="card imgItem overflow-hidden position-relative ">
                    <img src="https://image.tmdb.org/t/p/w500${responseOfSearch.results[x].poster_path}" class="image w-100" alt="">
                    <figcaption class="position-absolute text-white overlay overflow-hidden  captionOfImg">
                        <h2 class="text-center">${responseOfSearch.results[x].original_title}</h2>
                        <p class="px-3>${responseOfSearch.results[x].overview}</p>
                        <p class="px-3>release_date: ${responseOfSearch.results[x].release_date}</p>
                        <span class="border border-1 border-success rounded-circle p-2 fs-5 ms-1"> ${vote}</span>
                    </figcaption>
                </div>
            </div>`
        
    }

    $(".main").html(box);
    add();
    
}

async function searchMovies(term) {

    let searchAskMovies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=082893ac3b42ddf4847b7c47115e7e97&include_adult=false&language=en-US&page=1&query=${term}`);
    let searchResponseMovies = await searchAskMovies.json();
     return searchResponseMovies;
    
}









let nameOfUser = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let age = document.querySelector("#age");
let password=document.querySelector("#password")
let reEnterPassword=document.querySelector("#reEnterPassword")

function contactValidation() {
    let nameOfValidation=/^[a-zA-z][a-z]{2,}$/
    let emailOfValidation= /^[A-Za-z]{6,20}[0-9]{1,11}@(gmail|yahoo)\.com$/;
    let phoneOfValidation=/^01[0125][0-9]{8}$/
    let ageOfValidation=/^(([2-9][0-9])|19|18|17|16|100)$/
    let passwordOfValidation = /^[A-Z][a-z]{2,}[0-9]{4,}$/
    

    if (nameOfValidation.test(nameOfUser.value) == false) {
        return"Error, Wrong name isn't valid name"
    }
    else if (emailOfValidation.test(email.value) == false) {
        return"Error, Wrong email isn't valid email should be ([A-Z])?[a-z]{5,}[0-9]{3,}\@gmail\.com "
    }
    else if (phoneOfValidation.test(phone.value) == false) {
        return"Error, Wrong phone isn't valid phone should be 01[0125][0-9]{8} "
    }
    else if (ageOfValidation.test(age.value) == false) {
        return"Error, Wrong age isn't valid age should be ^(([2-9][0-9])|19|18|17|16|100)$"
    }
    else if (passwordOfValidation.test(password.value) == false) {
        return"Error, Wrong password isn't valid password should be [A-Z][a-z]{2,}[0-9]{4,}"
    }
    else if (password.value != reEnterPassword.value ) {
        return"Error, Password not match"
    }
    return true;
}
 


$(".submit").click(function () {
    let error = contactValidation();
    if (error == true) {
        location.reload();
    }
    else {
        document.querySelector(".err").innerHTML = error;
    }
    
});