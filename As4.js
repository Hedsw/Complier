var fs = require('fs');
var FS = require('./FileHandler.js');

var TableSize = 211;

 var VarType = {
  charType : {value: 0, name: "char", type: "char"},
  intType: {value: 1, name: "int", type: "int"},
  floatType : {value: 2, name: "float", type: "float"}
  };

var EntryType = {
  constEntry : {value: 0, name: "const", type: "const"},
  varEntry: {value: 1, name: "var", type: "var"},
  functionEntry : {value: 2, name: "function", type: "function"}
  };

// var typeOfParameter = VarType.charType;
// val에다가 VarType.charType <- 이걸 넣으면 될듯?
var ParamPtr = function ParamNode(val) {
      this.typeOfParameter = val;
      this.next = null;
}

var TableEntry = {
    Types : {TokenType: "Empty", LexemeType: "Empty"},
    depth : {depth: 1},
    TypeofEntry: {
      var : {
        Vartype: VarType.charType.type,  //여기다가는 각 파일을 넣어야함
        Offset: 0,
        size: 10
      },
      constant : {
        Vartype: VarType.floatType.type,
        Offset: 0,
        Value : 5,
        ValueR : 10
      },
      function : {
        SizeOfLocal : 5,
        NumberOfParameters : 10,
        Vartype : "Empty",
        ParamList : ParamPtr
      }
    }//End of TypeofEntry
}    // this.next = TableEntry; <--이거는 안 넣어도 되지 않음? TableEntry[0]이렇게 들어가면 되니까 push,pop으로 넣으면 될듯

var EntryPtr = function TableE(val) {
    this.val = val;
    this.next = null;
}

//This is Example to Test Every function is working correctly
// var myDictionary = {
//     1: 'Hello',
//     2: 'World',
//     3: 'Test',
//     4: 'Hello',
//     5: 'Test',
//     6: 'suggestive',
//     7: '1234',
//     8: 'This is Test'
// };

var myDictionary = {
    'Hello2': 1,
    'World': 2,
    'Test': 3,
    'Hello': 4,
    'Test2': 5,
    'suggestive': 6,
    '1234': 7,
    'This': 8
};



module.exports = {
  //passed a lexeme and return the location for that lexeme
  makeHashTable: function() {
    var storage = [],
      hashTableMethods = {
          //This is Insert Function!
        createHashIndex: function(key,value) {
          if(key.length == 0) return storage;
          var hash = 0;
          // console.log(key.length + "<--");
          for(var i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash = hash & hash;
          }
          return Math.abs(hash % TableSize);
        },
        //insert the lexeme, token and depth into a record in the symbol table
        insert: function(key, value) {
          if(key === undefined || value === undefined || key.length === 0 || value.length === 0)
            throw ('Insertion of undefined not possible')
          else {
            var hashIndex = this.createHashIndex(key,value);
            storage[hashIndex] = value;
          }
          return this;
        },
        retrieve: function(key) {
                  var hashIndex = this.createHashIndex(key);
                  return key + ': ' + storage[hashIndex] +' : ' + hashIndex;
        }
      };
      return hashTableMethods;
  },
  initialTable: function(hashTable) {
    for(var key in myDictionary) {
      hashTable.insert(key, myDictionary[key]);
    }
  },
  //include a procedure that will write out all variables that are in the table at a specified depth
  writeTable: function(depth) {
    var hashTable = this.makeHashTable();
    this.initialTable(hashTable);
    for (var key in myDictionary) {
    console.log(hashTable.retrieve(key));
    }
    // console.log(hashTable.retrieve('ailurophile'))
    // console.log(TableEntry.Types.TokenType);
    // ParamNode(VarType.intType.name);
  },
  //delete is passed the depth and depth and deletes all records that are in the table at that depth
  deleteDepth: function(ParamPtr, depth) {
        if(ParamPtr == null) return null;

        if(ParamPtr.val == val) {
          return deleteDepth(ParamPtr.next, val);
        }

        function recurse(link) {
          if(!link) return;
          while(link.next != null && link.next.val == val) {
            link.next = link.next.next;
          }
          recurse(link.next);
        }
        recurse(ParamPtr);
        return ParamPtr;
  },
  // lookup uses the lexeme to find the entry and returns a pointer to that entry
  lookUp: function(lex) {
    var hashTable = this.makeHashTable();
    this.initialTable(hashTable);
      console.log(hashTable.retrieve(lex) + " Test")
  }
}


// console.log(this.getRe.procMatch);
