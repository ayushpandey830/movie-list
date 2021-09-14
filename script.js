// when all these three are added we get json file of data
const API_KEY = "api_key=1f4a2964e987aa2a73a37c687bcd3d24";

const BASE_URL = "https://api.themoviedb.org/3";

const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const search_url = BASE_URL + "/search/movie?" + API_KEY;

const img_url = "https://image.tmdb.org/t/p/w500";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const main = document.getElementById("main");

const form = document.getElementById("form");

const search = document.getElementById("search");

const tags_element = document.getElementById("tags");

var selectedgenre = [];
setgenre();

function setgenre() {
  tags_element.innerHTML = "";

  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedgenre.len == 0) {
        selectedgenre.push(genre.id);
      } else {
        if (selectedgenre.includes(genre.id)) {
          selectedgenre.forEach((id, idx) => {
            if ((id = genre.id)) {
              selectedgenre.splice(idx, 1);
            }
          });
        } else {
          selectedgenre.push(genre.id);
        }
      }

      console.log(selectedgenre);
      getmovies(API_URL+ '&with_genres='+encodeURI(selectedgenre.join(',')));
      highlight_selected_genre();
    });
    tags_element.append(t);
  });
}


function highlight_selected_genre(){
  const tags=document.querySelectorAll('.tag');
  tags.forEach(tag=>{
    tag.classList.remove('highlight')
  })
  clearbtn();
  if(selectedgenre.length!=0)
  {
  selectedgenre.forEach(id=>{
    const highlighted_tag = document.getElementById(id);
    highlighted_tag.classList.add('highlight');


  })
}}


function clearbtn(){
let clearbutton=document.getElementById('clear');

if(clearbutton){
     clearbutton.classList.add('highlight');
}
else{

  let clear = document.createElement('div');
  clear.classList.add('tag','highlight');
  clear.id='clear';
  clear.innerText= 'clear all';
  clear.addEventListener('click',()=>{
    selectedgenre=[];
    setgenre();
    getmovies(API_URL);
  })
  tags_element.append(clear);

}}

getmovies(API_URL);

function getmovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if(data.results.lenth !== 0){
      showmovies(data.results);}
      else

      {
        main.innerHTML='<h1> class="no_results">Ooops!! No Results Found</h1>' 
      }
    });
}

function showmovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movie_element = document.createElement("div");
    movie_element.classList.add("movie");
    movie_element.innerHTML = `
        <img src="${poster_path? img_url + poster_path : "https://via.placeholder.com/150"}" alt="${title}">
       
        <div class="movie-info">

            <h3>${title}</h3>
            <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>${overview}</h3>
        </div>`;

    main.appendChild(movie_element);
  });
}

function getcolor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchterm = search.value;
  selectedgenre=[];
setgenre();

  if (searchterm) {
    getmovies(search_url + "&query=" + searchterm);
  } else {
    getmovies(API_URL);
  }
});
 