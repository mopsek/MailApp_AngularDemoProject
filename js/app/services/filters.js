'use strict';

module.exports = function() {
    return function(content) {
        return content.slice(0, 220) + '...';
    }
};