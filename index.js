var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
        'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

const linkInput = document.querySelector('#link');

const playBtn = document.querySelector('#play');

function checkLink() {

    if(linkInput.value.includes('http')) {
        let link = linkInput.value.slice(
            linkInput.value.indexOf('=') + 1,
            linkInput.value.indexOf('&')
        )

        player.loadVideoById(link);
    } else {
        player.loadVideoById(linkInput.value)
    }

}

const Timer = document.querySelector('#timer');

function updateTimer() {
    if(player.getCurrentTime() > player.getDuration() - 10) {
        Timer.innerText = Math.ceil(player.getDuration() - player.getCurrentTime());
        if(Timer.style.display == 'none') {
            Timer.style.display = 'block';
        }
    } else {
        Timer.innerText = '';
        Timer.style.display = 'none';
    }
}

var TimerInterval;

function checkTime() {
    if(TimerInterval != undefined) {
        Timer.style.display = 'none';
        clearInterval(TimerInterval);
    } else {
        TimerInterval = setInterval(updateTimer, 100);
    }
}

playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkLink();
    checkTime();
});