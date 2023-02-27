// // 解析歌词字符串
// // 得到一个歌词对象的数组
// // 每个歌词对象：{time: 开始时间，words：歌词内容}
function parseLrc(){
    var lines = lrc.split('\n')
    var result = []
    for(var i=0;i<lines.length;i++){
        var str = lines[i]
        var parts = str.split(']')
        var timeStr = parts[0].substring(1)
        var obj = {
            time: parseTime(timeStr),
            words: parts[1]
        }
        result.push(obj)
    }
    console.log(result)
    return result
}
// 将时间字符串解析为数字（秒）
function parseTime(timeStr){
    var parts = timeStr.split(':')
    return Number(parseFloat((+parts[0]*60) + +parts[1]).toFixed(2))
}
var lrcData = parseLrc()

// 计算出，在当前播放器放到第几秒 在lrcData数组中，应该高亮显示的歌词下标
var doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.container ul'),
    container: document.querySelector('.container')
}
console.log(doms)

function findIndex(){
    // 播放器当前时间
    var curTime = doms.audio.currentTime
    for(var i = 0; i < lrcData.length; i++){
        if(curTime < lrcData[i].time){
            return i-1
        }
    }
    // 如果找遍了还没找到 说明是最后一句
    return lrcData.length - 1
}

// 界面
// 创建歌词函数
function createLrcElements(){
    // 文档片段
    var flag = document.createDocumentFragment()
    for(var i = 0; i < lrcData.length; i++){
        var li = document.createElement('li')
        li.textContent = lrcData[i].words
        flag.appendChild(li)  // 改动dom树
    }
    doms.ul.appendChild(flag)
}
 createLrcElements()

// 数据逻辑
// 界面逻辑
// 事件

// 容器高度
var containerHeight = doms.container.clientHeight
// 最大
var maxOffset = doms.ul.clientHeight - containerHeight
// 每个li的高度
var liHeight = doms.ul.children[0].clientHeight
// 设置ul的偏移量
function setOffset(){
    var index = findIndex()
    var offset = liHeight * index + liHeight/2 - containerHeight/2
    if(offset < 0){
        offset = 0
    }
    if(offset > maxOffset){
        offset = maxOffset
    }
    doms.ul.style.transform = `translateY(-${offset}px)`
    var li =  doms.ul.querySelector('.active')
    if(li){
        li.classList.remove('active')
    }
    li = doms.ul.children[index]
    if(li){
        li.classList.add('active')
    }
}

doms.audio.addEventListener('timeupdate', setOffset)
