const addMovieTrigger = document.querySelector(".add-movie-trigger");
const addMovieModalBackdrop = document.querySelector(".add-movie-modal-backdrop");
const detailModalBackdrop = document.querySelector(".detail-modal-backdrop");
let movieGridContainer = document.querySelector(".movie-grid-container");
const addMovieForm = document.querySelector("form");

let moviesArray = JSON.parse(localStorage.getItem("moviesLS")) || []

function saveToLS() {   
localStorage.setItem("moviesLS" , JSON.stringify(moviesArray));
}

addMovieTrigger.addEventListener("click" , () => {
addMovieModalBackdrop.classList.remove("hidden")

})

addMovieForm.addEventListener("submit" , (e) => {
console.log("form submit")
e.preventDefault();
const data = Object.fromEntries(new FormData(addMovieForm));

let newMovie = {
    id: Date.now(),
        title: data.title,
    poster: data.poster,
    genre: data.genre,
    releasedDate: data.releasedDate,
    rating: Number(data.rating),
    mins: Number(data.mins),
    status: "none",
    isFavourite: false,
    description: data.description
}

moviesArray.push(newMovie);
saveToLS();
addMovieForm.reset();
addMovieModalBackdrop.classList.add("hidden")

})


addMovieModalBackdrop.addEventListener("click" , (e) => {
    if (e.target.closest(".close-modal-btn")) {
        // let crossBtn = e.target.closest(".close-detail-btn");
        console.log("cross tbn clciked")
        addMovieModalBackdrop.classList.add("hidden")
        
    }
})

const statusStyles = {
  none: { label: "", colors: "hidden" },
  watchLater: {
    label: "Watch Later",
    colors: "text-yellow-600 border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20"
  },
  watched: {
    label: "Watched",
    colors: "text-green-600 border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20"
  }
};

function renderCards() {
    console.log("render chal gya")
    movieGridContainer.innerHTML = ""

    moviesArray.forEach(movie => {

        movieGridContainer.innerHTML += `
  <article data-id ="${movie.id}" class="movie-card group relative rounded-2xl overflow-hidden bg-white dark:bg-obsidian-light border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div class="card-poster relative h-[400px] overflow-hidden">
                    <img src="${movie.poster}" alt="Dune: Part Two" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    
                    <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
                        <button class="heart-btn w-9 h-9 rounded-full backdrop-blur-md bg-black/40 flex items-center justify-center text-white hover:bg-gold-500 transition-colors cursor-pointer">
                            <i class="fa-solid fa-heart text-gold-500 text-sm"></i>
                        </button>
                        <div class="relative">
                            <button class="kebab-btn w-9 h-9 rounded-full backdrop-blur-md bg-black/40 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
                                <i class="fa-solid fa-ellipsis-vertical text-sm"></i>
                            </button>
                            <!-- Dropdown hidden on this card -->
                            <div class=" context-menu-open absolute right-0 mt-2 w-40 bg-white dark:bg-obsidian border border-gray-200 dark:border-white/10 rounded-xl shadow-luxury py-2 z-30 hidden">
                                <button class="menu-action w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Watch Later</button>
                                <button class="menu-action w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Mark Watched</button>
                                <div class="border-t border-gray-100 dark:border-white/10 my-1"></div>
                                <button class="menu-action w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Delete Film</button>
                            </div>
                        </div>
                    </div>

                    <div class="absolute bottom-4 left-4 right-4">
                        <div class="flex justify-between items-end">
                            <div>
                                <span class="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1 drop-shadow-md">${movie.genre}</span>
                                <h3 class="text-xl font-bold text-white leading-tight drop-shadow-md">${movie.title}</h3>
                            </div>
                            <div class="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                                <i class="fa-solid fa-star text-gold-500 text-[10px]"></i>
                                <span class="text-white text-xs font-bold">${movie.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content p-5 flex-grow flex flex-col justify-between">
                    <p data-id ="${movie.id} class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">${movie.description}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-xs text-gray-400 font-medium">${movie.releasedDate} • ${movie.mins}m</span>
                        <span class="status-badge px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${statusStyles[movie.status].colors}">${statusStyles[movie.status].label}</span>
                    </div>
                </div>
            </article>`
    })


}

renderCards();


movieGridContainer.addEventListener("click" , (e) => {
if (e.target.closest(".movie-card")) {
    detailModalBackdrop.classList.remove("hidden");
    let card = e.target.closest(".movie-card");
    let cardId = Number(card.dataset.id);

    let movie = moviesArray.find(movie => movie.id === cardId);

    detailModalBackdrop.innerHTML = "";
    
    detailModalBackdrop.innerHTML +=`
    
      <div class="modal-content relative bg-white dark:bg-obsidian rounded-2xl w-full max-w-4xl mx-4 overflow-hidden shadow-2xl flex flex-col md:flex-row transform scale-95 transition-transform duration-300">
            <button class="close-detail-btn absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors backdrop-blur-sm cursor-pointer"><i class="fa-solid fa-xmark"></i></button>
            <div class="modal-poster w-full md:w-2/5 h-64 md:h-[600px] relative">
                <img src="${movie.poster}" alt="Dune: Part Two" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent md:hidden"></div>
            </div>
            <div class="modal-info w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-xs uppercase tracking-widest text-gold-500 font-bold">${movie.genre}</span>
                    <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 font-medium">${movie.releasedDate}</span>
                    <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 font-medium">${movie.mins} min</span>
                </div>
                <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">${movie.title}</h2>
                
                <div class="flex items-center gap-6 mb-8">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-star text-gold-500 text-xl"></i>
                        <span class="text-2xl font-bold">${movie.rating}</span><span class="text-gray-400 text-sm font-medium">/10</span>
                    </div>
                     <span class="status-badge px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${statusStyles[movie.status].colors}">${statusStyles[movie.status].label}</span>
                </div>

                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base mb-8">${movie.description}</p>
                
                <!-- Action Buttons inside Detail Modal (Static) -->
                <div class="flex gap-4 mt-auto">
                    <button data-id =" ${movie.id}" class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <i class="fa-solid fa-clock text-gold-500"></i> Watch Later
                    </button>
                    <button data-id =" ${movie.id}" class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <i class="fa-regular fa-heart text-gold-500"></i> Favorite
                    </button>
                </div>
            </div>
        </div>
    
    `
    ;
}
})
detailModalBackdrop.addEventListener("click" , (e) => {
    
    if (e.target.closest(".close-detail-btn")) {
        detailModalBackdrop.classList.add("hidden");
    }

})

document.addEventListener("click" , () => {
    if (!e.target.closest(".context-menu") && !e.target.closest(".kebab-btn")) {
        document.querySelectorAll(".context-menu").forEach(menu => menu.classList.add("hidden"))
    }
})


