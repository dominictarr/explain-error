'use strict';

function getStack(err) {
    return err.stack.substring(err.name.length + 3 + err.message.length)
        .split('\n');
}

function removePrefix(a, b) {
    return a.filter(function (e) {
        return b.indexOf(e) === -1;
    });
}

module.exports = function (err, message) {
    var newErr = new Error(message),
        stack = removePrefix(getStack(newErr).slice(1), getStack(err)).join('\n');

    newErr.stack =
        newErr.name + ': ' + newErr.message + '\n' +
        stack + '\n  ' + err.stack;

    return newErr;
};
