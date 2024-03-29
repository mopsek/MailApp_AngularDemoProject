 'use strict';




module.exports = function($timeout) {


    function light(elem) {
        var shadow1 = '3px 0px 9px rgba(0, 255, 0, ',
            shadow2 = ')',
            opacity = 0;

        function incr() {
            if (opacity < 0.9) {
                opacity += 0.05;
                elem.style.textShadow = shadow1 + opacity + shadow2;
                $timeout(incr, 75);
            } else return decr();
        }

        function decr() {
            if (opacity > 0.2) {
                opacity -= 0.05;
                elem.style.textShadow = shadow1 + opacity + shadow2;
                $timeout(decr, 75);
            } else return incr();
        }

        incr();
    }

    function addComa(elem) {
        function add() {
            if(elem.innerHTML.length === 21) elem.innerHTML = 'Loading letters';
            elem.innerHTML += '.';
            $timeout(add, 500)
        }
        add()
    }

    function loading(element) {
        light(element);
        addComa(element)
    }

    return {
        loading: loading,
        addComa:addComa,
        light: light
    }
}