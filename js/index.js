// 解析歌词字符串
// 得到一个歌词对象的数组
// 每个歌词对象：{time: 开始时间，words：歌词内容}
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
    return parseFloat((+parts[0]*60) + +parts[1]).toFixed(2)
}
parseLrc()