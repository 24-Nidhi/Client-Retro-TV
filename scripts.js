const video = document.getElementById('tv-video');
const videos = ['/videos/cakeDessert.mp4', '/videos/veg.mp4']; 
let currentIndex = 0;

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : videos.length - 1;
    loadVideo();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex < videos.length - 1) ? currentIndex + 1 : 0;
    loadVideo();
});

document.getElementById('random').addEventListener('click', () => {
    currentIndex = Math.floor(Math.random() * videos.length);
    loadVideo();
});

document.getElementById('download').addEventListener('click', () => {
    const currentVideo = videos[currentIndex];
    const link = document.createElement('a');
    link.href = currentVideo;
    link.download = currentVideo.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('share').addEventListener('click', () => {
    const currentVideo = videos[currentIndex];
    const shareUrl = `${window.location.href.split('?')[0]}?video=${encodeURIComponent(currentVideo)}`;

    if (navigator.share) {
        navigator.share({
            title: 'Recipe Video',
            text: 'Check out this recipe video!',
            url: shareUrl
        }).catch((error) => console.error('Error sharing', error));
    } else {
        alert(`Web Share API not supported on this browser. Share this link: ${shareUrl}`);
    }
});

// Corrected the search input id to 'searchBar'
document.getElementById('searchBar').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredVideos = videos.filter(video => video.toLowerCase().includes(query));
    if (filteredVideos.length > 0) {
        currentIndex = videos.indexOf(filteredVideos[0]);
        loadVideo();
    }
});

function loadVideo() {
    video.src = videos[currentIndex];
    video.play();
}

loadVideo();
