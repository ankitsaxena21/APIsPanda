function gifs(){
    const btns = document.querySelectorAll(".storage");
    btns.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const img = btn.parentNode.parentNode.children[0].children[0].currentSrc;
            let f = localStorage.getItem("gifs");
            f = JSON.parse(f);
            let newFav = []
            f.forEach((op,i) => {
                if(op.includes(img)) {
                    let i;
                }else{
                    newFav.push(op)
                }
            });
            localStorage.setItem("gifs", JSON.stringify(newFav));
            let fav = localStorage.getItem("gifs");
            fav = JSON.parse(fav);
            let output ="";
            fav.forEach(item => {
                output = output + item;
            });
            document.querySelector(".favourite").innerHTML = output;
            gifs();
        });
    });
}
function nasa(){
    const btns = document.querySelectorAll(".storage");
    btns.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const img = btn.parentNode.parentNode.children[0].children[0].currentSrc;
            let f = localStorage.getItem("nasa");
            f = JSON.parse(f);
            let newFav = []
            f.forEach((op,i) => {
                if(op.includes(img)) {
                    let i;
                }else{
                    newFav.push(op)
                }
            });
            localStorage.setItem("nasa", JSON.stringify(newFav));
            let fav = localStorage.getItem("nasa");
            fav = JSON.parse(fav);
            let output ="";
            fav.forEach(item => {
                output = output + item;
            });
            document.querySelector(".favourite").innerHTML = output;
            nasa();
        });
    });
}
document.querySelector(".gifs").addEventListener("click", e => {
    let fav = localStorage.getItem("gifs");
    fav = JSON.parse(fav);
    let output ="";
    fav.forEach(item => {
        output = output + item;
    });
    document.querySelector(".favourite").innerHTML = output;
    gifs();
})
;
document.querySelector(".nasa").addEventListener("click", e => {
    let fav = localStorage.getItem("nasa");
    fav = JSON.parse(fav);
    let output ="";
    fav.forEach(item => {
        output = output + item;
    });
    document.querySelector(".favourite").innerHTML = output;
    nasa();
})