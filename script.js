
console.log("hello")

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3002/song/")
    let responce = await a.text();
    let div = document.createElement("div")
    div.innerHTML = responce;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/song/")[1])
        }
    }
    return songs
} 

async function main() {
    // get the list of all songs
    let songs = await getSongs();

    // show songs in playlist
    let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>  <img class="invert" src="assets/music.svg" alt="music">
                            <div class="info">
                                <div> ${song.replaceAll("%20", " ")}</div>
                                <div>Song Artist</div>
                            </div>
                            <div class="play-now">
                                <span>Play Now</span>
                                <img class="invert" src="assets/play.svg" alt="play">

                            </div>
        
        </li>`;

    }
}

main()
