import { TMDB_TOKEN } from "./config.js";
let baseUrl = "https://api.themoviedb.org/3";
let imgBaseUrl = "https://image.tmdb.org/t/p/";
let token = TMDB_TOKEN;
let movieList = {};
function start() {
  console.log("lets start");

  let url = "/discover/movie";
  $.ajax({
    type: "get",
    url: baseUrl + url,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      movieList = response.results;
      setCarousel();
      setPosters();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function setCarousel() {
  let carousel = $(".carousel-inner")[0];
  $.each(carousel.children, function (indexInArray, div) {
    $(div).find("h3").text(movieList[indexInArray].original_title);

    $(div)
      .find("img")
      .attr(
        "src",
        imgBaseUrl + "original/" + movieList[indexInArray].backdrop_path,
      );
  });
}
function setPosters() {
  let top20 = $(".top20");
  for (let index = 0; index < movieList.length; index++) {
    let data = `
        <button
        type="button"
        data-id="${index}"
        class="movie-detail btn btn-dark col-1 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        
      <div class="card  text-white bg-dark">
      <img class="card-img-top" src="${imgBaseUrl + "w342/" + movieList[index].poster_path}" alt="Title" />
      <div class="card-body">
      <h4 class="card-title">${movieList[index].original_title}</h4>
      <p class="card-text">${movieList[index].overview.slice(0, 80) + "..."}</p>
      </div>
      </div>
      </button>`;
    $(data).appendTo(top20);
  }
  $(document).on("click", ".movie-detail", function () {
    let id = $(this).data("id");
    let movie = movieList[id];
    $("#exampleModal .modal-title").text(movie.original_title);
    $("#exampleModal .modal-body").html(
      `<img class="img-fluid mb-3" src="${imgBaseUrl + "w500/" + movie.poster_path}"> <p><strong>Release:</strong> ${movie.release_date}</p> <p><strong>Rating:</strong> ${movie.vote_average}</p> <p>${movie.overview}</p>`,
    );
  });
}

$(document).ready(function () {
  start();
});
