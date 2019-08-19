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
