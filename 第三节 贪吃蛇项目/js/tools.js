var Tools = {
    getRandom : function (min, max) {  
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random()*(max - min) + min;  /*random 0~1*/
    }
};