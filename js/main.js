const createShowCard = (show) => {
    console.log("NUEVO: ",show);
    const card = document.createElement("div");
    card.classList.add("show-card");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("show-info");

    const name = document.createElement("h2");
    name.classList.add("show-name");
    name.textContent = show.name;

    const streaming = document.createElement("p");
    streaming.classList.add("show-streaming");
    streaming.textContent = show.network.name;

    const genresDiv = document.createElement("div");
    genresDiv.classList.add ("show-genres");

    show.genres.forEach((type) => {
        const typeSpan = document.createElement("span");
        typeSpan.classList.add("show-genre", type);
        typeSpan.textContent = type;
        genresDiv.appendChild(typeSpan);
    });

    infoDiv.appendChild(name);
    infoDiv.appendChild(streaming);
    infoDiv.appendChild(genresDiv);

    bannerImg = show.image;
    if(bannerImg === null) {
        card.style.backgroundImage = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe6gsRu3WvxIGpbgC5RUGIJFLvo1Ci4nskQ&s)";
    } else {
        card.style.backgroundImage = `url(${bannerImg.original})`;
    }
    

    card.appendChild(infoDiv);

    return card;
}


const loadShow = async () => {
    const showGrid = document.getElementById("show-grid");
    try{
        const response = await axios.get("https://api.tvmaze.com/shows");
        const shows = response.data;

        showGrid.innerHTML = '';

        for(const show of shows) {
            const showCard = createShowCard(show);
            showGrid.appendChild(showCard);
        }

    } catch (error) {
        console.error("Error fetch:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadShow);


//PARA BUSCAR
const searchShow = async () => {
    const showName = document.getElementById('show-search').value.toLowerCase();
    
    if (showName) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${showName}`);
            const showGrid = document.getElementById('show-grid');
            const shows = response.data;

            showGrid.innerHTML = '';

            for(const show of shows) {
                const showCard = createShowCard(show.show);
                showGrid.appendChild(showCard);
            }
        } catch (error) {
            console.error('Error al buscar la serie', error);
        }
    }
};

document.getElementById('search-button').addEventListener('click', searchShow);
document.getElementById('show-search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log("search");
        searchShow();
    }
});