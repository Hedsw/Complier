var fs = require('fs');
var FS = require('./FileHandler.js');

var TableSize = 211;
var someNames = ["David", "Jennifer", "1", "Raymond",
                 "Cynthia", "Mike", "Clayton", "1", "Jonathan", "1"];


//이것은 OOP로 수정 하기 전의 코드임.
//as4and5.js가 OOP로 수정 하고 난 후의 코드


function HashTable() {
  this.table = new Array(TableSize);
  // this.simpleHash = simpleHash;
  this.betterHash = betterHash;
  this.showDistro = showDistro;
  this.buildChains = buildChains;
  this.put = put;
  // this.get = get;
}

function put(key, data) {
   var pos = this.betterHash(key);
   var index = 0;
  //  console.log(data,key,pos,this.table[pos][index]);
  if(this.table[pos][index] == undefined) {
     this.table[pos][index] = key;
     index = index + 1;
    //  console.log(this.table[pos][index]+ " <--");
   }
  else {
    while(this.table[pos][index] != undefined) {
      ++index;
    }
      this.table[pos][index] = key;
  }
}

function betterHash(string) {
    const H = 37;
     var total = 0;
     for (var i = 0; i < string.length; ++i) {
        total += H * total + string.charCodeAt(i);
     }
     total = total % TableSize;
     if (total < 0) {
        total += this.table.length-1;
     }
     return parseInt(total);
}

function get(key) {
   return this.table[this.betterHash(key)];
}

function showDistro() {
   var n = 0;
   //console.log("Size -> "+ this.table.length);
   for (var i = 0; i < this.table.length; i++) {
      if (this.table[i][n] != undefined) {
         console.log(i + ": " + this.table[i]);
      }
   }
}

function buildChains() {
   for (var i = 0; i < this.table.length; ++i) {
      this.table[i] = new Array();
   }
}


var hTable = new HashTable();
// console.log(someNames);
hTable.buildChains();
for (var i = 0; i < someNames.length; ++i) {
   hTable.put(someNames[i]);
}
hTable.showDistro();
