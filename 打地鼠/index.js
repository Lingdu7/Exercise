$(function () {
    var position = [[52.5, 28.3], [1.8, 31.3], [26.5, 22.3], [27.5, 38.3], [58.5, 42.3], [0.8, 44.3], [4.8, 59.3], [59.8, 60], [32.8, 55.2]]
    var score=0;
    var settim;
    var schebuleWidth=$('.schebule').width()
    /**
     * 开始游戏
     */
    function start() {
        var index = 0
        // 随机生成图片属性
        var img = $('<img>')
        var pos = random(0, 9)
        var roles = random(0, 10) > 2 ? 'h' : 'x'
        img.css({
            'top': position[pos][1] + '%',
            'left': position[pos][0] + '%'
        })
       
    // 设置图片动画
    animation(img,roles,index,5)   
    
    // 添加元素
        $('.gaming').append(img)

    // 点击事件
    gameRules(img,roles)


    }
        /**
         * 设置图片动画
         */
        function animation(img,roles,index,maxIndex) {
            clearInterval(settim)
            settim=setInterval(() => {
                img.attr('src', `./images/${roles}${index}.png`)
                index++
                if (index>maxIndex) {
                    clearInterval(settim)
                    settim=null
                    setTimeout(() => {
                        img.remove()
                        start()
                    }, 360);
                }
            }, 120);
        }

    /**
     * 拍打点击
     * @param {*} dom 
     */
    function gameRules(dom) {
        dom.one('click',()=>{
        console.log(dom.attr('src').indexOf('h'));
        if (dom.attr('src').indexOf('h')!== -1) {
            score+=10
            $('.score').text(score)
            animation(dom,'h',6,9)
        }else{
            score-=10
            $('.score').text(score)
            animation(dom,'x',6,9)
        }
            
        })
    }

    /**
     * 计时
     */
    function schebule() {
       var setOut=setTimeout(function() {
        clearInterval(settim)
        $('.over').fadeIn(100)
        clearTimeout(setOut)
       }, 10000);
        $('.schebule').animate({
            width:1
        },10000)
    }


    /**
     * 随机数
     * @param {*} min 最小
     * @param {*} max 最大
     */
    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }


//    注册事件

    $('.scoreBtn').click(function(){
        $('.startBox').hide()
        start()
        schebule()
    })

    $('.over .btn').click(function(){
        $('.over').hide()
        $('.gaming').empty()
        $('.schebule').width(schebuleWidth)
        start()
        schebule()
    })
    $('.ruleBtn').click(()=>{
        $('.rule').fadeIn(100)
    })

    $('.rule .btn').click(()=>{
        $('.rule').fadeOut(100)
    })
})
