
console.log("hello")
let currentSong = new Audio();

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/song/")
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

// play music function
const playMusic = (track)=>{
    currentSong.src = "/song/" + track
    currentSong.play()
    play.src = "assets/play.svg"


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
    // attach an event listner to each song 
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach( e=>{

        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
       
    })
    //even listner for play,next and previous
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "assets/pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "assets/play.svg"
        }

    })
}

main()
