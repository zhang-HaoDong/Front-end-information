//传入整个游戏的外边框的样式
var gameData = {
  //容器的宽高
  width: 600,
  height: 600,
  //用于存放整个游戏的容器
  dom: document.getElementsByClassName("wrapper")[0],
  //行块数
  rowBlockNums: 3,
  //列块数
  colBlockNums: 3,
  //图片链接
  imgUrl: "./img/1.jpg",
};

//设置小方块初始的构造函数
function Block(left, top, isValiable) {
  this.left = left;
  this.top = top;
  this.reactLeft = left;
  this.reactTop = top;
  this.dom = document.createElement("div");
  this.dom.style.width = gameData.rowBlockSize + "px";
  this.dom.style.height = gameData.colBlockSize + "px";
  this.dom.style.position = "absolute";
  this.dom.style.left = this.reactLeft + "px";
  this.dom.style.top = this.reactTop + "px";
  this.dom.style.background = `url(${gameData.imgUrl}) -${this.left}px -${this.top}px`;
  this.dom.style.border = "1px solid #fff";
  this.dom.style.boxSizing = "border-box";
  this.dom.style.transition = 'all .5s'
  if (!isValiable) {
    this.dom.style.display = "none";
  }
  gameData.dom.appendChild(this.dom);
  this.show = function(){
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px';
  };
  this.show();
}
//用于存放每个小方块的数据对象
var blockArr = [];
var isWins = false;
function init() {
  //初始化游戏容器设置
  wrapperInit();
  //初始化游戏内小方块的样式
  blockShow();
  //随机打乱小方块的位置
  regBlockShow();
  //设置图片点击事件
  imgClick();
  //初始化游戏容器设置函数
  function wrapperInit() {
    //获取拼图内每个小块的宽和高
    gameData.rowBlockSize = gameData.width / gameData.rowBlockNums;
    gameData.colBlockSize = gameData.height / gameData.colBlockNums;
    gameData.blockNum = gameData.rowBlockNums * gameData.colBlockNums;
    //设置游戏的宽高
    gameData.dom.style.width = gameData.width + "px";
    gameData.dom.style.height = gameData.height + "px";
    //设置游戏外边框
    gameData.dom.style.border = "2px solid #ccc";
    gameData.dom.style.position = "relative";
  }
  //初始化游戏内小方块的样式设置
  function blockShow() {
    for (var i = 0; i < gameData.colBlockNums; i++) {
      for (var j = 0; j < gameData.rowBlockNums; j++) {
        var isValiable = true;
        if (
          i === gameData.colBlockNums - 1 &&
          j === gameData.rowBlockNums - 1
        ) {
          isValiable = false;
        }
        var testLeft = j*gameData.rowBlockSize;
        var testTop = i*gameData.colBlockSize;
        blockArr.push(
          new Block(testLeft,testTop,isValiable)
        );
      }
    }
  }
  //随机打乱小方块的位置
  function regBlockShow() {
      blockArr
      .filter(function (ele, index, self) {
        return index < self.length - 1;
      })
      .sort(function () {
        return Math.random() - 0.5;
        
      })
      .forEach(function (ele, index) {
        ele.left =
          parseInt(index % gameData.rowBlockNums) * gameData.rowBlockSize;
        ele.top =
          parseInt(index / gameData.rowBlockNums) * gameData.colBlockSize;
        ele.show();
      })
    
     
  }
 
  
  //设置图片点击事件函数
  function imgClick() {
    blockArr.forEach(function (ele) {
      ele.dom.onclick = function () {
        if(isWins){
          return;
        }
        // 交换两个元素的定位值
        if(!canExchange(ele, blockArr[blockArr.length - 1])){
          return;
        }
        exchang(ele, blockArr[blockArr.length - 1]);
        ele.show();
        blockArr[blockArr.length - 1].show();
        if(isWin()){
          isWins = true;
          blockArr[blockArr.length - 1].dom.style.display = 'block';
          blockArr.forEach(function(ele){
            ele.dom.style.border = 'none';;
          })
        }

      }

    })

  }
  //判断是否赢了
  function isWin(){
    return blockArr.every(function(ele){
      return ele.left === ele.reactLeft && ele.top === ele.reactTop;
    })
  }
  //交换两个元素的定位值
  function exchang(dom1, dom2) {
    var temp = dom2.left;
    dom2.left = dom1.left;
    dom1.left = temp;
    var temp = dom2.top;
    dom2.top = dom1.top;
    dom1.top = temp;
    
  }
  //判断两个元素是否可以交换位置
  function canExchange (dom1, dom2) {
    if(parseInt(dom1.top) === parseInt(dom2.top) && 
      parseInt(Math.abs(dom1.left - dom2.left)) === parseInt(gameData.rowBlockSize)||
      parseInt(dom1.left) === parseInt(dom2.left) && 
      parseInt(Math.abs(dom1.top - dom2.top)) === parseInt(gameData.colBlockSize)){
        return true;
      }
      return false;
  }
}   
  
init();
