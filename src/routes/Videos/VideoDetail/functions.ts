export const videodatallazo = {

    onReady : (e) => {
        // Ocurre cuando el video está preparado por completo
        console.log(e.target);
        e.target.playVideo()
        console.log(e.target.playerInfo.videoData);
        console.log(e.target.playerInfo.videoData.title);
        let obj = e.target.getVideoData();
        return obj;

    
    },
    onPause : (e) => {
        e.target.pauseVideo()
    }
}
