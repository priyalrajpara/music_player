


document.addEventListener("DOMContentLoaded", () => {
    const cover = document.getElementById("cover");
    const title = document.querySelector(".title h1");
    const artist = document.querySelector(".small h5");
    const playBtn = document.querySelector(".fa-play");
    const prevBtn = document.querySelector(".fa-backward");
    const nextBtn = document.querySelector(".fa-forward");
    const progressBar = document.querySelector(".played");
    const circle = document.querySelector(".circle");
    const progressContainer = document.querySelector(".total");
    const songItems = document.querySelectorAll(".musicplayer div");


    const songs = document.querySelectorAll(".musicplayer > div"); 
    const audio = new Audio(); 
    const playIcon = document.querySelector(".fa-play");
    let currentSong = null; 

    let currentSongIndex = 0;
    let isPlaying = false;

    const songList = [
        { title: "Happier Than Ever", artist: "Billie Eilish", src: "happier.mp3", cover: "cover1.jfif" },
        { title: "Follow You", artist: "Noizy", src: "follow.mp3", cover: "cover.jfif" },
        { title: "I'm Good", artist: "Bebe Rexha, David Guetta", src: "good.mp3", cover: "good2.jfif" },
        { title: "Sunflower", artist: "Post Malone, Swae Lee", src: "sunflower.mp3", cover: "sunflower.jfif" },
        { title: "Sage", artist: "Ritviz", src: "liggi2.mp3", cover: "liggi.jfif" },
    ];

    
    function loadSong(index) {
        const song = songList[index];
        audio.src = song.src;
        title.textContent = song.title;
        artist.textContent = song.artist;

        cover.style.backgroundImage = `url("${song.cover}")`;
        cover.style.backgroundSize = "cover";
        cover.style.backgroundRepeat = "no-repeat";

        
        songs.forEach((song) => {
            song.addEventListener("click", () => {
                
                const songTitle = song.querySelector("h5").textContent;
                const songArtist = song.querySelector("p").textContent;
                const songCover = window.getComputedStyle(song.querySelector(".img")).backgroundImage;

                // const songCover = song.querySelector(".img").style.backgroundImage;
                const songSrc = song.getAttribute("data-audio");
                
                
                document.querySelector(".title h1").textContent = songTitle;
                document.querySelector(".small h5").textContent = songArtist;
                document.querySelector(".cover").style.backgroundImage = songCover;
                
        audio.src = songSrc;
        audio.play();
        
        
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");

        
        if (currentSong) {
            currentSong.querySelector(".state i").classList.remove("fa-music");
            currentSong.querySelector(".state i").classList.add("fa-play");
            currentSong.querySelector(".state i").style.color = "#ddd"
        }

     
        const songStateIcon = song.querySelector(".state i");
        songStateIcon.classList.remove("fa-play");
        songStateIcon.classList.add("fa-music");
        songStateIcon.style.color = "rgb(235, 51, 112)";
       
        currentSong = song;
    });
});



      
        if (isPlaying) {
            playSong();
        }
    }

    
    function playSong() {
        audio.play().catch(error => console.log("Autoplay blocked:", error));
        isPlaying = true;
        playBtn.classList.replace("fa-play", "fa-pause");
    }

    
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playBtn.classList.replace("fa-pause", "fa-play");
    }

    
    playBtn.addEventListener("click", () => {
        isPlaying ? pauseSong() : playSong();
    });

    
    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songList.length;
        loadSong(currentSongIndex);
        playSong();
    });

    
    prevBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
        loadSong(currentSongIndex);
        playSong();
    });

    
    songItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
    });

    

    
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            circle.style.left = `${progress}%`;  
        }
    });
    
    

    progressContainer.addEventListener("click", (event) => {
        const width = progressContainer.clientWidth;
        const clickX = event.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    
    audio.addEventListener("ended", () => {
        nextBtn.click();
    });

    
    loadSong(currentSongIndex);
});



