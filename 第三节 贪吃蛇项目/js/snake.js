//自调用函数  开启局部作用域，防止命名冲突
(function () {
    var position = "absolute";
    var elements =[];//记录之前创建的蛇
    function Snake(options) {
        //蛇节的 大小
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        console.log("snake ", this.width, "  ", this.height)
        //蛇移动的方向
        this.direction = options.direction || "right";
        //蛇的身体(蛇节)  第一个元素时蛇头
        this.body = [
            {
                x: 3,
                y: 2,
                color: "red"
            },
            {
                x: 2,
                y: 2,
                color: "blue"
            },
            {
                x: 1,
                y: 2,
                color: "blue"
            },
        ];
    }
    Snake.prototype.render = function (map) {
        //删除掉之前创建的蛇
        remove();
        //把每一个蛇节渲染到地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            var object = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            //记录当前蛇
            elements.push(div);
            div.style.position = position;
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = object.x * this.width + "px";
            div.style.top = object.y * this.height + "px";
            div.style.backgroundColor = object.color;
        }
    };
    /* 私有成员 */
    function remove() {
        for (var index = elements.length - 1; index >= 0; index--) {
            //删除div
            elements[index].parentNode.removeChild(elements[index]);
            //删除数组中的元素
            elements.splice(index, 1);
        }
    }
    Snake.prototype.move = function (food, map) {
        //控制蛇的身体移动(当前蛇节到上一个蛇节的位置)
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
                //控制蛇头的移动(判断当前移动的方向)
        //判断蛇移动的方向
        var head = this.body[0];
        switch (this.direction) {
            case "right":
                head.x += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "top":
                head.y -= 1;
                break;
            case "bottom":
                head.y += 1;
                break;
            default:
                break;
        }
        //2.4 判断蛇头是否和食物 的坐标重合
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        console.log("snake head ", headX, "  ", headY);
        if(headX === food.x && headY === food.Y)
        {
            //让蛇增加一节
            //获取蛇的最后一节
            var last = this.body[this.body.length - 1];
            this.body.push({
                x:last.x,
                y:last.y,
                color: last.color
            });
            //重新生成食物
            food.render(map);
        }
    };
    //暴露构造函数给外部
    window.Snake = Snake;
})();
/* var snake = new Snake();
snake.render(map); */