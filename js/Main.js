let inputPhone = document.getElementById("phone");
let inputName = document.getElementById("Name");
let inputPassword = document.getElementById("Password");
let inputRePassword = document.getElementById("rePassword");
let inputAge = document.getElementById("Age");
let inputEmail = document.getElementById("Email");
let SMovies = document.getElementById("searchInMovies");
let aMovies = document.getElementById("apiSearch");
var dataMovies = [];

//validation
inputRePassword.onkeyup = function () {
  if (inputPassword.value != inputRePassword.value) {
    $('#wrong-Re').css("display", "block");
  }
  else {
    $('#wrong-Re').css("display", "none");
  }
}
inputName.onkeyup = function () {
  let nameregex = /^[a-z]{2,}$/;
  if (nameregex.test(inputName.value) != true) {
    $('#wrong-N').css("display", "block");
  }
  else {
    $('#wrong-N').css("display", "none");
  }
}
inputEmail.onkeyup = function () {
  let emailregex = /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (emailregex.test(inputEmail.value) != true) {
    $('#wrong-E').css("display", "block");
  }
  else {
    $('#wrong-E').css("display", "none");
  }
}
inputPhone.onkeyup = function () {
  let phoneregex = /^01[0,1,2,5][0-9]{8}$/;
  if (phoneregex.test(inputPhone.value) != true) {
    $('#wrong-p').css("display", "block");
  }
  else {
    $('#wrong-p').css("display", "none");
  }
}
inputPassword.onkeyup = function () {
  let passwordregex = /^(?=.*[0-9])(?=.*)[a-zA-Z0-9!@#$%^&*]{8,}$/;
  if (passwordregex.test(inputPassword.value) != true) {
    $('#wrong-pass').css("display", "block");
  }
  else {
    $('#wrong-pass').css("display", "none");
  }
}
inputAge.onkeyup = function () {
  let ageregex = /^[1-9][0-9]$/
  if (ageregex.test(inputAge.value) != true) {
    $('#wrong-A').css("display", "block");
  }
  else {
    $('#wrong-A').css("display", "none");
  }
}

//hide nav bar 
let navwidth = $('.nav-options').outerWidth();
$('nav').animate({ 'left': -navwidth }, 0)

//Open Navbar
$('#menu-bars').click(function () {

  $('nav').animate({ 'left': '0' }, 800, function () {
    $('.nav-op').fadeIn(1000)
  })
  $('#menu-bars').css("display", 'none');
  $('#menu-close').css("display", "block");
})

//Close Navbar
$("#menu-close").click(function () {
  $('nav').animate({ 'left': -navwidth }, 1000, function () {
    $('.nav-op').fadeOut(1000)
  })
  $('#menu-bars').css("display", 'block');
  $('#menu-close').css("display", "none");
})



//Get all remaining categories 
async function getRMovies(target) {

  let response = await fetch(`https://api.themoviedb.org/3/movie/${target}?api_key=6543158ec943a16f0284b28f2067b986&language=en-US&page=1`);
  dataMovies = await response.json();
  dataMovies = dataMovies.results
  displayMovies();
}

//Get Trending category Only
async function getMovies(target) {

  let response = await fetch(`https://api.themoviedb.org/3/${target}/all/day?api_key=6543158ec943a16f0284b28f2067b986`);
  dataMovies = await response.json();
  dataMovies = dataMovies.results
  displayMovies();
}

//display Movies
function displayMovies() {
  let temp = ``;
  let name = "";
  let date = "";
  for (let i = 0; i < dataMovies.length; i++) {
    if (dataMovies[i].name != null) {
      name = dataMovies[i].name;
    }
    else if (dataMovies[i].title != null) {
      name = dataMovies[i].title
    }
    if (dataMovies[i].first_air_date != null) {
      date = dataMovies[i].first_air_date;
    }
    else if (dataMovies[i].release_date != null) {
      date = dataMovies[i].release_date;
    }
    temp += `   
    <div class="col-md-4  p-0 mb-3" >
    <div class="contain position-relative  w-100 h-100 " >
        <img src="https://image.tmdb.org/t/p/w500/${dataMovies[i].poster_path}" alt="Poster" class=" img-film w-100 rounded"  >
        <div class=" position-absolute   start-0 bottom-0  end-0  details  text-center m-3" >
            <div class=" text-center py-5 px-2">
            <h3 class="mt-5">${name}</h3>
            <p class="fs-6">${dataMovies[i].overview}</p>
            <p>rate:${dataMovies[i].vote_average} </p>
            <p> ${date}</p>
            </div>
        </div>
        

    </div>
</div>  
`

 
  }
  document.getElementById('show-data').innerHTML = temp;
}

//handle order of Displaying
async function getAllFilms() {
  await getMovies('trending')

  let links = document.querySelectorAll(" .nav-options .nav-links");

  for (let i = 0; i < links.length; i++) {
   await links[i].addEventListener('click', async function (e) {
      let target = e.target.getAttribute("id");
      if (target == "trending") {
        await getMovies(target);
      }
      else if (target == "popular" || target == "top_rated" || target == "now_playing" || target == "upcoming") {
        await getRMovies(target)
      }

    })

  }
  
}
getAllFilms();


//Search via categoty
function search() {
  var movie = SMovies.value;
  let temp = "";
  let name = "";
  let date = "";
  for (let i = 0; i < dataMovies.length; i++) {
    if (dataMovies[i].name != null) {
      name = dataMovies[i].name;
    }
    else if (dataMovies[i].title != null) {
      name = dataMovies[i].title
    }
    if (dataMovies[i].first_air_date != null) {
      date = dataMovies[i].first_air_date;
    }
    else if (dataMovies[i].release_date != null) {
      date = dataMovies[i].release_date;
    }

    if (name.toLowerCase().includes(movie.toLowerCase()) == true) {
      console.log("yes")
      temp += `   
        <div class="col-md-4  p-0  mb-3">
        <div class="contain position-relative  w-100 h-100  ">
            <img src="https://image.tmdb.org/t/p/w500/${dataMovies[i].poster_path}" alt="" class=" img-film w-100 rounded" >
            <div class=" position-absolute   start-0 bottom-0  end-0  details  text-center m-3 ">
                <div class=" text-center py-5 px-1">
                <h3 class="mt-5">${name}</h3>
                <p class="fs-6">${dataMovies[i].overview}</p>
                <p>rate:${dataMovies[i].vote_average} </p>
                <p> ${date}</p>
                </div>
            </div>
            
    
        </div>
    </div>  
    `
    }



  }
  document.getElementById('show-data').innerHTML = temp;

}

//Search via The Whole Api
async function Apisearch() {
  let target = aMovies.value;

  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6543158ec943a16f0284b28f2067b986&query=${target}`);
  dataMovies = await response.json();
  dataMovies = dataMovies.results;
  displayMovies()



}

$(window).ready(function(){
  $('#loading').fadeOut(2000,function(){
    $('body').css('overflow','visible');
  })
})

