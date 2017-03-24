var RE = require('./RE.js')
var FS = require('./FileHandler.js')
var _ = require('lodash');

var result;
var testFile = process.argv[2]

var array = [1, 2, 3];
console.log(_.fill(array, 'a'))
if(!RE.read('')){
  //RE.recursiveDescentParser()
}

// var data = FS.readTxt(testFile)
// var testLines = FS.sliceByLine(data)
