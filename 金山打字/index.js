
/**
 * 随机数
 * @param {number} min 最小数
 * @param {number} max 最大数
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


var board = {
    dom: $('#board'),
    maxLost: 3,
    lost: 0,
    score: 0,
    render: function () {
        this.dom.html(`<div><p>得分：${this.score}</p><p>丢失：${this.lost} / ${this.maxLost}</p></div>`)
    },
    /**
     * 丢失
     */
    addLost: function () {
        if (this.lost === this.maxLost) {
            game.gameOver()
        } else if (this.lost === this.maxLost - 1) {
            this.lost++
            console.log(2);
            
            board.render()
            game.gameOver()
        } else {
            console.log(1);
            
            this.lost++
            board.render()
        }
    },
    /**
     * 得分
     * @param {number}} num 
     */
    addScore: function (num) {
        this.score += num
        board.render()
    },

    /**
     * 重新开始
     */
    reset: function () {
        console.log(123);
        
        this.lost = 0
        this.score = 0
        this.render()
    }
}

var letters = []
var divContainer = $('#content')
var divContainerWidth = divContainer.innerWidth()


/**
 * 生成img元素
 */
function createLetter() {
    var char = String.fromCharCode(getRandom(65, 65 + 26))
    var left = getRandom(0, divContainerWidth - 100)
    var img = $('<img>').attr('src', `./img/letter/${char}.png`).addClass('letter').css('left', left)
    divContainer.prepend(img)

    var letter = {
        dom: img,
        char: char,
        left: left,
        top: -100,
        speed: getRandom(100, 300),
        /**
         * 设置top
         */
        render: function () {
            this.dom.css('top', this.top + 'px')
        },

        /**
         * 移动
         * @param {number} duration 
         */
        move: function (duration) {
            var dis = duration * this.speed
            this.top += dis
            this.render()
        },

        /**
         * 移除
         */
        kill: function () {
            var index = letters.indexOf(this)
            if (index >= 0) {
                letters.splice(index, 1)
            }
            this.dom.remove()
        }

    }
    letter.render()
    letters.push(letter)
}

var game = {
    timerProduce: null, //自动产生字母的timerid
    timerMove: null, //自动移动的timerid
    isOver: false,
    /**
     * 自动生成字母
     */
    startProduce: function () {
        if (this.timerProduce) {
            return
        }
        this.timerProduce = setInterval(createLetter, 700);
    },

    /**
   * 停止自动生成字母
   */
    stopProduce: function () {
        clearInterval(this.timerProduce);
        this.timerProduce = null;
    },

    /**
     * 移动
     */
    startMove: function () {

        if (this.timerMove) {
            return
        }
        var duration = 0.016;
        this.timerMove = setInterval(() => {
            for (let index = 0; index < letters.length; index++) {
                var letter = letters[index]
                letter.move(duration)
                if (letter.top >= divContainer.innerHeight()) {
                    letter.kill()
                    index--
                    board.addLost()
                }

            }
        }, duration * 1000);
    },

    /**
    * 停止移动
    */
    stopMove: function () {
        clearInterval(this.timerMove);
        this.timerMove = null;
    },

    /**
     * 游戏结束
     */
    gameOver: function () {
        game.stopProduce()
        game.stopMove()
        $('#over').css('opacity', 1)
        $('#over .score').text(`得分：${board.score}`)
        this.isOver = true;
    },

    /**
     * 重新开始
     */
    restart: function () {
        divContainer.empty()
        board.reset()
        game.startProduce();
        game.startMove();
        letters=[]
        $('#over').css('opacity', 0)
        this.isOver = false;
    }
}

board.render()
game.startProduce();
game.startMove();



//注册事件
$(document).keypress(function (e) {
    if (game.isOver) {
        return;
    }
    var key = e.key.toUpperCase();
    for (let index = 0; index < letters.length; index++) {
        if (letters[index].char === key) {
            letters[index].kill()
            board.addScore(10);
            return; //只移除一个
        }

    }
})

$(document).ready(function () {
    $('#over .btn').click(function () {
        game.restart()
    })
})