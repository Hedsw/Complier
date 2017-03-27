var fs = require('fs');
var FS = require('./FileHandler.js');

var TableSize = 211;

module.exports = {
  HashTable: function(HashValues) {
    this.table = new Array(TableSize);
    this.buildChains();
    for (var i = 0; i < HashValues.length; ++i) {
       this.put(HashValues[i]);
    }
    this.showDistro();
  },
  put: function(key,data) {
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
 },
 betterHash: function(string) {
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
 },
 get: function() {
   return this.table[this.betterHash(key)];
 },
 showDistro: function() {
   var n = 0;
   //console.log("Size -> "+ this.table.length);
   for (var i = 0; i < this.table.length; i++) {
      if (this.table[i][n] != undefined) {
         console.log(i + ": " + this.table[i]);
      }
   }
 },
 buildChains: function() {
   for (var i = 0; i < this.table.length; ++i) {
      this.table[i] = new Array();
   }
 }
}
