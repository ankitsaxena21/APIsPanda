const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
let output = ""
// fetching the data
class NasaImagesAndVideos {
    async getData(search) {
        try {
            let response = await fetch(`https://images-api.nasa.gov/search?q=${search}`);
            let data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
    displayItems(items, src) {
        items.forEach(item => {
            output = `
        <div class="card  border-secondary font-weight-bold shadow-lg col-md-10 col-sm-6 mb-4">
        <div class="img-container">
         <img src=${src} class="img card-img-top" alt="image not available" />
         </div>
             <div class="card-body">
             <button class="storage btn btn-dark mb-3 ml-3">${(NasaImagesAndVideos.getFavourite(src) === 1) ? "Favourite" : "Add to favourites"}</button>
             <h5 class="card-title"><span class="text-dark"><b>Title -</b></span> ${item.title}</h5>
             <p class="card-text"><span class="text-dark"><b>Description -</b></span> ${item.description}</p>
       </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item detail"><span class="text-dark"><b>Location -</b></span> ${item.location}</li>
            <li class="list-group-item detail"><span class="text-dark"><b>Center - </b></span>${item.center}</li>
        </ul>
        <div class="card-body">
            <a class="text-white font-weight-bold"><span class="text-dark"><b>Photographer - </b></span>${item.photographer}</a><br />
            <a class="text-white font-weight-bold"><span class="text-dark"><b>Date-created - </b></span>${item.date_created}</a>
        </div>
        </div>
        ` + output;
        });
        document.getElementById("displayResult").innerHTML = output;
        const btns = document.querySelectorAll(".storage");
        btns.forEach(btn => {
            btn.addEventListener("click", e => {
                e.preventDefault();
                const child1 = btn.parentNode.parentNode.children[0];
                const child2 = btn.parentNode.parentNode.children[1];
                const child3 = btn.parentNode.parentNode.children[2];
                const child4 = btn.parentNode.parentNode.children[3];
                const img = child1.children[0].currentSrc;
                const title = child2.children[1].textContent;
                const description = child2.children[2].textContent;
                const location = child3.children[0].textContent;
                const center = child3.children[1].textContent;
                const photographer = child4.children[0].textContent;
                const dateCreated = child4.children[1].textContent;
                if(btn.textContent === "Add to favourites"){
                    btn.textContent = "Favourite";
                    NasaImagesAndVideos.setFavourite(img, title, description, location, center, photographer, dateCreated);
                }else if (btn.textContent === "Favourite"){
                    btn.textContent = "Add to favourites";
                    NasaImagesAndVideos.removeFavourite(img);   
                } 
            });
        });
    }
    static setFavourite(img, title, description, location, center, photographer, dateCreated) {
        let fav;
        if(localStorage.getItem("nasa") === null) {
            fav = [];
            const item = `<div class="card nasa-card border-secondary font-weight-bold shadow-lg col-md-10 col-sm-6 mb-4">
            <div class="img-container">
             <img src=${img} class="img card-img-top" alt="image not available" />
             </div>
                 <div class="card-body">
                 <button class="storage btn btn-dark mb-3">Remove from favourites</button>
                 <h5 class="card-title"><span class="text-dark"><b>Title -</b></span> ${title}</h5>
                 <p class="card-text"><span class="text-dark"><b>Description -</b></span> ${description}</p>
           </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item detail"><span class="text-dark"><b>Location -</b></span> ${location}</li>
                <li class="list-group-item detail"><span class="text-dark"><b>Center - </b></span>${center}</li>
            </ul>
            <div class="card-body">
                <a class="text-white font-weight-bold"><span class="text-dark"><b>Photographer - </b></span>${photographer}</a><br />
                <a class="text-white font-weight-bold"><span class="text-dark"><b>Date-created - </b></span>${dateCreated}</a>
            </div>
            </div>
            `;
            fav.push(item);
            localStorage.setItem("nasa", JSON.stringify(fav));

        } else{
            fav = localStorage.getItem("nasa");
            fav = JSON.parse(fav);
            const item = `
            <div class="card nasa-card border-secondary font-weight-bold shadow-lg col-md-10 col-sm-6 mb-4">
            <div class="img-container">
             <img src=${img} class="img card-img-top" alt="image not available" />
             </div>
                 <div class="card-body">
                 <button class="storage btn btn-dark mb-3">Remove from favourites</button>
                 <h5 class="card-title"><span class="text-dark"><b>Title -</b></span> ${title}</h5>
                 <p class="card-text"><span class="text-dark"><b>Description -</b></span> ${description}</p>
           </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item detail"><span class="text-dark"><b>Location -</b></span> ${location}</li>
                <li class="list-group-item detail"><span class="text-dark"><b>Center - </b></span>${center}</li>
            </ul>
            <div class="card-body">
                <a class="text-white font-weight-bold"><span class="text-dark"><b>Photographer - </b></span>${photographer}</a><br />
                <a class="text-white font-weight-bold"><span class="text-dark"><b>Date-created - </b></span>${dateCreated}</a>
            </div>
            </div>
            `;
            fav.push(item);
            localStorage.setItem("nasa", JSON.stringify(fav));
        }

    }
    static removeFavourite(item) {
        let f = localStorage.getItem("nasa");
        f = JSON.parse(f);
        let newFav = []
        f.forEach((op,i) => {
            if(op.includes(item)) {
                let i;
            }else{
                newFav.push(op)
            }
        });
        localStorage.setItem("nasa", JSON.stringify(newFav));
    }
    static getFavourite(item) {
        let f = localStorage.getItem("nasa");
        f = JSON.parse(f);
        let c = 0;
        if( f != null){
             f.map((op,i) => {
                if(op.includes(item)) {
                    c = 1;
                }
            });
        }
        console.log(c)
        return c;

    }
}

class NasaAPOD {
    async getData() {
        try {
            let response = await fetch("https://api.nasa.gov/planetary/apod?api_key=koRnN9J8dAsUCYwWrrZvSndMEtXEVLafb4LQTnuh");
            let data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
    displayItem(item) {
        let res = `
        <div class="card shadow-lg col-md-10 col-sm-6 mb-4" id="displayApod">
        <div class="card-header text-center">Astronomy Picture of the Day </div>
         <img src=${item.hdurl} class="card-img-top mt-2" alt="image not available">
             <div class="card-body">
             <h5 class="card-title font-weight-bold"><span class="text-dark"><b>Title - </b></span>${item.title}</h5>
             <p class="card-text"><span class="text-dark"><b>Description - </b></span>${item.explanation}</p>
       </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item detail"><span class="text-dark"><b>Date - </b></span>${item.date}</li>
        </ul>
        <div class="card-body">
            <a class="text-white font-weight-bold"><span class="text-dark"><b>Copyright- </b></span>${item.copyright}</a>
        </div>
        </div>
        `;
        document.getElementById("target").innerHTML = res;
    }
}

class MarsRover {
    async getData() {
        try {
            let response = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=koRnN9J8dAsUCYwWrrZvSndMEtXEVLafb4LQTnuh");
            let data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
    displaypics(items) {
        let res = `<div id="displayRover" class="p-2" >
                    <div class="nasa-card col-md-10 col-sm-3 mb-4 shadow-lg">
                    <div class="thumbnail img-container">
                        <img src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG" alt="Lights" class="mars-img img">
                    </div>
                    <div class="caption">
                    <p class="card-header font-weight-bold">Earth Date - 2015-05-30 </p>
                    </div>
                    </div>
                    `;
        items.forEach(item => {
            console.log(item.img_src)
            res = res + `
            <div class="nasa-card col-md-10 shadow-lg mb-4 col-sm-3 shadow-lg">
            <div class="thumbnail shadow-lg img-container">
                <img src=${item.img_src} alt="Mars rover" class="mars-img img">
            </div>
            <div class="caption">
            <p class="card-header font-weight-bold">Earth Date - ${item.earth_date}</p>
             </div>
            </div>
            `
        });
        res = res + `</div>`;
        document.getElementById("target").innerHTML = res;
    }
}

const imgandvideos = new NasaImagesAndVideos();
const apod = new NasaAPOD();
const rover = new MarsRover();
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    imgandvideos.getData(searchTerm).then(items => {
        const lists = items.collection.items;
        lists.map(list => {
            imgandvideos.displayItems(Object.values(list.data), list.links[0].href)
        });
    });
});

searchInput.addEventListener("input", e => {
    e.preventDefault();
    output = "";
});

document.getElementById("apod").addEventListener("click", e => {
    e.preventDefault();
    apod.getData().then(data => {
        apod.displayItem(data);
    })
});

document.getElementById("rover").addEventListener("click", e => {
    e.preventDefault();
    rover.getData().then(data => {
        rover.displaypics(data.photos)
    })

})