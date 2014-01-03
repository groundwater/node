// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var common = require('../common');
var EventEmitter = require('events').EventEmitter;
var assert = require('assert');

var handlers_catch_ok = false;
var handlers_catch = {
  error: function () {
    handlers_catch_ok = true;

    // stop the error even from throwing
    return true;
  }
};

var handlers_throw_ok = false;
var handlers_throw = {
  error: function () {
    handlers_throw_ok = true;
    // let the error event bubble
    // and possibly throw
  }
};

var ob_catch = EventEmitter.createObserver(handlers_catch);
var ob_throw = EventEmitter.createObserver(handlers_throw);

var ee_catch = new EventEmitter();
var ee_throw = new EventEmitter();

EventEmitter.attachObserver(ee_catch, ob_catch);
EventEmitter.attachObserver(ee_throw, ob_throw);

// this error event should now throw because the observer catches it
ee_catch.emit('error');
assert.equal(handlers_catch_ok, true);

// the next error event should throw
assert.throws(function () {
  ee_throw.emit('error');
});

console.log('ok');
