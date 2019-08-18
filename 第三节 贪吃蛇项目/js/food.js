function Food(options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.color = options.color || "red"; 
}
Food.prototype.render = function (map) {  
    //动态创建div
    var div = document.createElement("div");
    map.append(div);
    div.style.position = "absolute";
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.color;

}
//测试
var map = document.getElementById("map");
var food = new Food();
food.render(map);