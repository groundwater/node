var EventEmitter = require('events').EventEmitter;
var assert = require('assert');

console;

var handlers1 = {
  create: function () {
    // this observer should be removed before its ever called
    throw new Error();
  }
};

var handlers2 = {
  create: function () {
    // this observer will stand the test of time
    // it is the one who will bring balance to the force
    console.log('ok');
  }
}

var observer;

observer = EventEmitter.addObserver(handlers1);
EventEmitter.removeObserver(observer);

observer = EventEmitter.addObserver(handlers2);

new EventEmitter();
