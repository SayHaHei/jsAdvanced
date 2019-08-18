//生成10个方块  随机生成颜色
var container = document.getElementById("container");
//数组 存储创建的方块
var array = new Array();
for(var i=0;i<10;i++)
{
    var r = Tools.getRandom(0, 255);
    var g = Tools.getRandom(0, 255);
    var b = Tools.getRandom(0, 255);
    
    var box = new Box(container, {
        backgroundColor:'rgb('+r+',' + g +',' + b +')'
    });
    //把创建好的方块对象，添加到数组中
    array.push(box);
}
//设置随机位置  开启定时器
setInterval(randomBox, 500)
//页面加载完成,先设置随机位置
randomBox();
function randomBox() {
    //随机生成方块的坐标
    for (let index = 0; index < array.length; index++) {
        const box = array[index];
        box.random();
    }
}