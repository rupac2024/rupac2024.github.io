const src = ["trad", "pag", "tini"];
const titles = ["Traditional Tinikling", "Pagapir", "Modern Tinikling"];

function changeSlide(num) {
    console.log(num);
    var video = document.getElementById("slideshow-video");
    var title = document.getElementById("slideshow-title");
    title.innerText = titles[num];
    video.setAttribute("src", "media/" + src[num] + "-vid.mp4");
}
