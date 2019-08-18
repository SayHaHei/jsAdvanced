//记录上一次创建的食物 为删除做准备
var elements = [];
function Food(options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.color = options.color || "red";
}
Food.prototype.render = function (map) {
    //删除之前创建的食物
    remove();
    //随机设置x和y
    this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.offsetHeight/this.height - 1) * this.height;
    //动态创建div
    var div = document.createElement("div");
    map.append(div);
    elements.push(div);
    div.style.position = "absolute";
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.color;
};
//
function remove() {
    for (var index = elements.length - 1; index >= 0; index--) {
        
        //删除div
        elements[i].parentNode.removeChild(elements[i]);
        //删除数组中的元素
        //从index开始，删除一个
        elements.splice(index , 1);
    }
}
//测试
var map = document.getElementById("map");
var food = new Food();
food.render(map);