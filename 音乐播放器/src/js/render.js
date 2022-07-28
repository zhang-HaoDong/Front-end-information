;(function(root){
    //渲染图片
    function renderImg(src){//渲染图片
        root.blurImg(src);//给body设置高斯模糊背景图片
        var img = document.querySelector(".songImg img");
        img.src = src;
    }
    function renderInfo(data){
        //渲染歌曲信息
        var info = document.querySelector(".songInfo").children;
        info[0].innerHTML = data.name;
        info[1].innerHTML = data.singer;
        info[2].innerHTML = data.album;

    }
    function renderIslike(isLike){
        //渲染是否喜欢
        var lis = document.querySelector(".control li");
        lis.className = isLike ? "liking" : "";
    }
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data.isLike);

    }
})(window.player || (window.player = {}))