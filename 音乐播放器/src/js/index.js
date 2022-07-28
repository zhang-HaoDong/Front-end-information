(function ($, player) {
    function MusicPlayer(dom) {
        this.wrap = dom;
        this.dataList = [];
        // this.controlIndex = 0 ;
        this.controlIndex = null;
        this.rotateTimer = null;
    }
    MusicPlayer.prototype = {
        init() {
            this.getDom();
            this.getData("../mock/data.json");
        },
        getDom() {
            this.record = document.querySelector('.songImg img');
            this.controlBtns = document.querySelectorAll('.control li');
        },
        getData(url) {
            $.ajax({
                url: url,
                method: "get",
                success: (data) => {
                    this.dataList = data;
                   this.listPlay();
                    this.controlIndex = new player.CreateIndex(this.dataList.length);
                    // console.log(this.controlIndex.index);
                    this.loadMusic(this.controlIndex.index);
                    this.musicControl();
                },
                error: (data) => {
                    console.log("数据请求失败");
                }
            });
        },
        loadMusic(index) {

            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audioSrc);

            if (player.music.status === 'play') {
                player.music.play();
                this.controlBtns[2].className = "playing";
                this.imgRotate(0);
            }
            this.list.changeSelect(index);
 
            this.curIndex=index;
        },
        musicControl() {
            this.controlBtns[1].addEventListener('touchend', () => {
                player.music.status = "play";
                this.loadMusic(this.controlIndex.prev());
            })
            this.controlBtns[2].addEventListener('touchend', () => {
                if (player.music.status === 'play') {
                    player.music.pause();
                    player.music.status = "pause";
                    this.controlBtns[2].className = "";
                    clearInterval(this.rotateTimer);
                } else {
                    player.music.play();
                    player.music.status = "play";
                    this.controlBtns[2].className = 'playing';
                    this.imgRotate(this.record.dataset.rotate || 0);
                }
            })
            this.controlBtns[3].addEventListener('touchend', () => {
                player.music.status = "play";
                this.loadMusic(this.controlIndex.next());
            })
        },
        imgRotate(deg) {
            clearInterval(this.rotateTimer);
            this.rotateTimer = setInterval(() => {
                this.record.style.transform = `rotate(${deg}deg)`;
                deg = +deg + .2;
                if (deg >= 360) {
                    deg = 0;
                }
                this.record.dataset.rotate = deg;
            }, 1000 / 60);
        },
        listPlay() {
            this.list = player.listControl(this.dataList,this.wrap);
            this.controlBtns[4].addEventListener('touchend',() => {
                
                this.list.slideUp();
            })
            this.list.musicList.forEach((item,index) => {
                item.addEventListener('touchend',() => {
                    if(this.curIndex == index){
                        retrun;
                    }
                    player.music.status = 'play';
                    this.loadMusic(index);
                    this.controlIndex.index = index;
                    this.list.slideDown();
                })
            })
        }
    }
    var musicplayer = new MusicPlayer(document.getElementById('wrap'));
    musicplayer.init();
})(window.Zepto, window.player);