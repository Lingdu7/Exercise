// 游戏设置
var gameConfig = {
    width: 500,
    heigth: 500,
    rows: 3,
    cols: 3,
    isOver:false,
    imgUrl: 'http://tencentjiaju.img-cn-beijing.aliyuncs.com/ueditor/20200107/h550w546-5e142fbc274e3.jpg',
    bigBox: document.getElementById('game')
};
var text=document.getElementsByTagName('input')[0]
var submit=document.getElementsByTagName('button')[0]
var reset=document.getElementsByTagName('button')[1]
var sousou=document.getElementsByTagName('button')[2]
var tishi=document.getElementById('tishi')
var cankao =document.getElementById('cankao')

// 初始化
function init () {
    // 小片
    gameConfig.blockWidth = gameConfig.width / gameConfig.rows;
    gameConfig.blockHeigth = gameConfig.heigth / gameConfig.cols;
    gameConfig.blockNumber = gameConfig.rows * gameConfig.cols;

    //初始化大盒子
    var bigBoxStyle = gameConfig.bigBox.style
    bigBoxStyle.width = gameConfig.width + 'px'
    bigBoxStyle.height = gameConfig.heigth + 'px'
    bigBoxStyle.border = '2px solid #999'
    bigBoxStyle.position = 'relative'
    bigBoxStyle.overflow = 'hidden'
    cankao.style.background = `url(${gameConfig.imgUrl}) no-repeat   `
var blocks = []

/**
 * 小块构造函数
 * @param {*} left 坐标
 * @param {*} top 坐标
 * @param {*} isShow 是否可见
 */
function createBlock(left, top, isShow) {
    this.left = left
    this.top = top
    this.correctLeft = this.left
    this.correctTop = this.top
    this.isShow = isShow
    this.block = document.createElement('div')
   this.blockStyle = this.block.style
    if (!isShow) { this.blockStyle.display = 'none' }
    this.blockStyle.width = gameConfig.blockWidth + 'px'
    this.blockStyle.height = gameConfig.blockHeigth + 'px'
    this.blockStyle.background = `url(${gameConfig.imgUrl}) no-repeat  -${this.left}px  -${this.top}px  `
    this.blockStyle.position = 'absolute'
    this.blockStyle.opacity=0.3
    this.blockStyle.boxSizing = 'border-box'
    this.blockStyle.border = '1px solid #fff'
    this.blockStyle.transition='0.2s'
    this.show = function () {
        this.blockStyle.left = this.left + 'px'
        this.blockStyle.top = this.top + 'px'
    }
    this.isCorrect = function () {
        return this.left===this.correctLeft && this.top===this.correctTop;
    }
    this.show()
    // this.blockStyle.padding='2px'
}

/**
 * 交换
 */
function exchange(a,b) {
    var temp1 = JSON.stringify(b)
    temp1 = JSON.parse(temp1)
    var temp2 = JSON.stringify(a)
    temp2 = JSON.parse(temp2)
    a.left = temp1.left
    a.top = temp1.top
    b.left = temp2.left
    b.top = temp2.top

    if (a.left===a.correctLeft&&a.top===a.correctTop) {
        a.blockStyle.opacity=1
    }else{
        a.blockStyle.opacity=0.3
    }
    if (b.left===b.correctLeft&&b.top===b.correctTop) {
        b.blockStyle.opacity=1
    }else{
        b.blockStyle.opacity=0.3
    }
    a.show()
    b.show()
}
 
/**
 * 点击事件
 */
function regEvent() {
    var isShowBlock=blocks.find(function (a) {
        return !a.isShow
    })

    for (let index = 0; index < blocks.length; index++) {
        blocks[index].block.onclick=function () {
            if (blocks[index].top===isShowBlock.top&&(Math.abs(blocks[index].left-isShowBlock.left))===gameConfig.blockWidth||
            blocks[index].left===isShowBlock.left&&(Math.abs(blocks[index].top-isShowBlock.top))===gameConfig.blockHeigth
            ) {
                exchange(blocks[index],isShowBlock)
            isWin()
            }
           
        }
    }


}
/**
 * 判断是否结束
 */
function isWin() {
    var wrongs=blocks.filter(function (item) {
        return !item.isCorrect()
    })
    if (wrongs.length===0) {
        gameConfig.isOver=true
        blocks.forEach(element => {
            element.blockStyle.border='none'
            element.blockStyle.display='block'
           
        //    setTimeout(() => {
        //     setBlocks(gameConfig.rows+1)
        //    }, 1000); 
        });

        
    }
    console.log(wrongs.length);
    tishi.innerText=`还有${wrongs.length}块待归位`
}

function setBlocks (number) {
    while (gameConfig.bigBox.firstChild) {
        gameConfig.bigBox.removeChild(gameConfig.bigBox.firstChild)
    }
    gameConfig.rows=number
    gameConfig.cols=number
    init()
}

/**
 * 洗牌
 */
function shuffle() {
    for (let index = 0; index < gameConfig.blockNumber; index++) {
        var i = Math.floor(Math.random() * (gameConfig.blockNumber - 2 + 1 - index) + index)
        exchange(blocks[i],blocks[index])
    }
    // console.dir(blocks);

}


/**
 * 生成小块
 */
function initBlockArray() {
    for (let i = 0; i < gameConfig.rows; i++) {
        for (let j = 0; j < gameConfig.cols; j++) {
            var left = gameConfig.blockWidth * i;
            var top = gameConfig.blockHeigth * j;
            var isShow = true
            if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                isShow = false
            }
            var newBlock = new createBlock(left, top, isShow)
            blocks.push(newBlock)

        }

    }
}
initBlockArray()
shuffle()
isWin()
for (let index = 0; index < blocks.length; index++) {
    // console.dir(blocks[index].block);
    gameConfig.bigBox.appendChild(blocks[index].block)
}
regEvent()
// gameConfig.bigBox.onclick = function (e) {
//     console.log(e.target);
// }

//一键
sousou.onclick=function () {
    // console.log(blocks);
    
    
    blocks.forEach(element => {
        element.left=element.correctLeft
        element.top=element.correctTop
        element.show()
        element.blockStyle.opacity=1
    });
    isWin()
}

// 提交
submit.onclick=function  () {
    while (gameConfig.bigBox.firstChild) {
        gameConfig.bigBox.removeChild(gameConfig.bigBox.firstChild)
    }
    gameConfig.rows=text.value
    gameConfig.cols=text.value
    init()
}

// 重置
reset.onclick=function () {
    text.value=''
    while (gameConfig.bigBox.firstChild) {
        gameConfig.bigBox.removeChild(gameConfig.bigBox.firstChild)
    }
    gameConfig.rows=3
    gameConfig.cols=3
    init()
}
};
init()

