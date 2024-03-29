//------Tools---------
//自调用函数传入window的目的，是为了让变量名可以压缩
//在老版本的浏览器中，undefined可以被重新赋值，传入可房子undefined的值被改变
(function (w, un) {  
    var Tools = {
        getRandom : function (min, max) {  
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.random()*(max - min) + min;  /*random 0~1*/
        }
    };
    w.Tools = Tools;
})(window, undefined);
//------Food---
//所有的js文件中书写代码，都是全局作用域
//自调用函数----开启一个新的作用域，避免命名冲突
(function () {
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
        this.x = Math.ceil(Tools.getRandom(0, map.offsetWidth / this.width - 1)) * this.width;
        this.y = Math.ceil(Tools.getRandom(0, map.offsetHeight / this.height - 1)) * this.height;
        console.log("food ", this.x, this.y);        
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
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            //从index开始，删除一个
            elements.splice(i, 1);
        }
    }
    //把Food构造函数 让外部可以访问
    window.Food = Food;

})();
//----Snake
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
        console.log("food ", food.x, "  ", food.y);
        if(headX == food.x && headY === food.y)
        {
            console.log("come to eat");
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
//------game
(function () {
    var that; //记录游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function () {
        //1.把蛇和食物对象，渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);
        //2.开始游戏的逻辑
        //2.1让蛇移动起来
        //2.2 当蛇遇到边界，游戏结束
        runSnake();
        //2.3通过键盘控制蛇移动的方向
        bindKey();
        //2.4当蛇遇到食物，做相应的处理


        //测试move
        /* 
        this.snake.move(food);
        this.snake.render(this.map); */
    };
    //2.3通过键盘控制蛇移动的方向
    function bindKey() {
        // document.onkeydown = function (param) {  }
        document.addEventListener("keydown", function (e) { 
            //37-left
            //38-top
            //39-right
            //40-bottom
            switch(e.keyCode)
            {
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "top";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "bottom";
                    break;
            } 
        });
    }
    function runSnake() {
        var timeId = setInterval(function () {
            //让蛇走一格
            //在定时器中，this指向window
            //要获取游戏中的game对象
            this.snake.move(that.food, that.map);
            this.snake.render(that.map);
            //2.2 当蛇遇到边界，游戏结束
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) 
            {
                alert("Game Over");
                clearInterval(timeId);
            }
            if (headY < 0 || headY >= maxY)
            {
                alert("Game over");
                clearInterval(timeId);
            }
        }.bind(that), 150);
    }
    window.Game = Game;
})();
//-----main
//测试
(function () {  
    var map = document.getElementById("map");
    var game = new Game(map);
    game.start();
})();
