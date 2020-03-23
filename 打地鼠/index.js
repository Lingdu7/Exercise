$(function () {
    var score=0;
    var settim;
    var schebuleWidth=$('.schebule').width()
    var holes=$('.hole').children()

    var notHit;
    /**
     * 开始游戏
     */
    function start() {
        if ($('.schebule').width()>1) {
        var index = 0
        // 随机生成图片属性
        var img = $('<img>')
        var pos = random(0, 9)
        var roles = random(0, 10) > 2 ? 'h' : 'x'
        // img.css({
        //     'top': position[pos][1] + '%',
        //     'left': position[pos][0] + '%'
        // })
       
    // 设置图片动画
    animation(img,roles,index,5)   
    
    // 添加元素
    holes.eq(pos).append(img)

    // 点击事件
    gameRules(img,roles)


    }}

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
                    notHit=setTimeout(() => {
                        img.remove()
                        start()
                    }, 360);
                }
            }, 80);
        } 

    /**
     * 拍打点击
     * @param {*} dom 
     */
    function gameRules(dom) {
        dom.one('click',()=>{
            clearTimeout(notHit)
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
        $('.hole img').off( )
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
        $('.hole div').empty('img')
        $('.schebule').width(schebuleWidth)
        score=0
        $('.score').text(score)
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
