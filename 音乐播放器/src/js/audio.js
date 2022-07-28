(function (root) {
    function AudioManger(){
        this.audio = new Audio();
        this.status = "pause";
    }
    AudioManger.prototype = {
        load(src){
            this.audio.src = src;
            this.audio.load();
        },
        play(){
            this.audio.play();
            this.status = "play";
        },
        pause(){
            this.audio.pause();
            this.status = "pause";
        },
        end(fn){
            this.audio.onended = fn;
        },
        playTo(time){
            this.audio.currentTime = time;
        }
    }
    root.music = new AudioManger();
})(window.player || (window.player = {}))