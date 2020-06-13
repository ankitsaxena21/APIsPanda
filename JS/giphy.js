const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
let output = ""
// fetching the data
class Giphy {
    async getData(search) {
        try {
            let response = await fetch(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=JJ43JOFNdubiydqFyuWf2et6JkHR6Vvz&limit=21`);
            let data = await response.json();
            return data;
        }   
        catch (err) {
            console.log(err);
        }
    }

    displayItems(items) {
        let output = "";
        items.forEach(item => {
            const source = item.images.downsized.url;
            output += `
            <div class="giph-card col-md-12 mr-3 col-sm-3 shadow-lg">
            <div>
                <img src=${item.images.downsized.url} alt="giphy" class="img-fluid giphy">
            </div>
            <div class="caption">
            <p class="card-header font-weight-bold">${item.title}</p>
            <button class="storage btn btn-dark ml-4 mt-2 mb-2">${(Giphy.getFavourite(source) === 1) ? "Favourite" : "Add to favourites"}</button>
             </div>
            </div>
        ` ;
        });
        document.getElementById("giphyResults").innerHTML = output;
    }
    setFavourite(src, title) {
        let fav;
        const source = src;
        if(localStorage.getItem("gifs") === null) {
            fav = [];
            const item = `<div class="giph-card col-md-12 mr-3 col-sm-3 shadow-lg">
            <div>
                <img src=${src} alt="giphy" class="img-fluid giphy">
            </div>
            <div class="caption">
            <p class="card-header font-weight-bold">${title}</p>
            <button class="storage btn btn-dark">Remove from favourite</button>
             </div>
            </div>
            `;
            fav.push(item);
            localStorage.setItem("gifs", JSON.stringify(fav));

        } else{
            fav = localStorage.getItem("gifs");
            fav = JSON.parse(fav);
            const item = `
            <div class="giph-card col-md-12 mr-3 col-sm-12 shadow-lg">
            <div>
                <img src=${src} alt="giphy" class="img-fluid giphy">
            </div>
            <div class="caption">
            <p class="card-header font-weight-bold">${title}</p>
            <button class="storage btn btn-dark">Remove from favourite</button>
             </div>
            </div>
            `;
            fav.push(item);
            localStorage.setItem("gifs", JSON.stringify(fav));
        }

    }
    removeFavourite(item) {
        let f = localStorage.getItem("gifs");
        f = JSON.parse(f);
        let newFav = []
        f.forEach((op,i) => {
            if(op.includes(item)) {
                let i;
            }else{
                newFav.push(op)
            }
        });
        localStorage.setItem("gifs", JSON.stringify(newFav));
    }
    static getFavourite(item) {
        let f = localStorage.getItem("gifs");
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
const giphy = new Giphy();
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    giphy.getData(searchInput.value).then(gifs => {
        giphy.displayItems(gifs.data);
        const btns = document.querySelectorAll(".caption");
        btns.forEach(btn => {
            btn.children[1].addEventListener("click", e => {
                const src = btn.parentNode.children[0].children[0].currentSrc;
                const title = btn.children[0].textContent;
                if(btn.children[1].textContent === "Add to favourites"){
                    btn.children[1].textContent = "Favourite";
                    giphy.setFavourite(src, title);
                }else if (btn.children[1].textContent === "Favourite") {
                    btn.children[1].textContent = "Add to favourites";
                    giphy.removeFavourite(src);
                }
            })
        })
        })
    })
