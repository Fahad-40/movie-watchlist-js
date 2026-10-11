

let MoviesArray = JSON.parse(localStorage.getItem("MoviesLS")) || []

function saveToLS() {
    
localStorage.setItem("MoviesLS" , JSON.stringify(MoviesArray));

}

