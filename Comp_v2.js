/***************************************
Name : Yunhyeok Lee
Instructor : George Hamer
Due Date : March 29 2017
Class : Complier CSC 446
***************************************/
// To Test..  node Comp_v2.js Test.txt

var modifyAs3 = require('./modifyAs3.js'); // Regular Expression
var FS = require('./FileHandler.js');
var as4 = require('./As4.js');
/*
Get file name from console to check data
*/


//Regular Expressions
var procedure_match = (/PROCEDURE/gi);
var end_match = (/END/gi);
var IS_match = (/IS/gi);
var typeMark = (/integer|real|char|constant/gi);

var test = FS.readTxt(process.argv[2]);
var slice = FS.sliceByLine(test);

if(modifyAs3.read(slice) == true) {
  modifyAs3.errorHandle(1);
  return;
}
var as3 = modifyAs3.recurseParser(slice);

var As4 = as4.writeTable(5);
as4.lookUp("4");

/*
Checking ID, Reserved_words, operator, Special Value
*/
function LexicalAnalyzer () {
  /*
  Input File into this program to split each line!
  */
var fs = require('fs');
fs.readFile(process.argv[2],function(err,data) {
    if(err) throw err;
    var reserved_words = (/CONSTANT|MODULE|BEGIN|PROCEDURE| IS|IF|THEN|ELSE|ELSIF|WHILE|LOOP|FLOAT|INTEGER|CHAR|CHAR|GET|PUT|END/gi);
    var comments = (/-- */);
    var rel_ops = /[;]|[:]|[()]|[=]|[<]|[>]|[<=]|[>=]/gi;
    var mul_ops = /[*]|[/]|rem|and|and|or\B/gi;
  //  var ass_ops = /[:=]/
    var result = ['reserve word is.. '];
    var text = data.toString();
    var lines = text.split('\n');

    var comment = [];
    var rel_op =[];
    // lines.forEach(function(line) {
    //     console.log(line);
    // });

    //  console.log("\n\n\nChecking..\n\n\n")


      // Checking Reserved_word
    lines.forEach(function(line) {
         if(line.match(reserved_words) !=null) {
           result.push(line.match(reserved_words));
         }
    })

    //console.log(result);
      var tmp = result.toString();
      var results = tmp.split(',');

    //console.log('reserve word is.. ');
    // for(var i = 1; i < results.length; i ++)
    //   console.log(results[i]+'t');

    //console.log('comment is..');
    lines.forEach(function(line) {
        if(line.match(comments) != null) {
            comment.push(line + ' <-- comment');
        }
    })
     // console.log(comment);

    //Relational Operator
  //  console.log('relational op is.. ');
    lines.forEach(function(line) {
    if(line.match(rel_ops) != null) {
            rel_op.push(line.match(rel_ops));
        }
    })
      // for(var i = 0; i < rel_op.length; i ++)
      // console.log(rel_op[i] +  ' <-- relational op \n ');

      //Mul Operator
      var mul_op =[];
      lines.forEach(function(line) {
      if(line.match(mul_ops) != null) {
              mul_op.push(line.match(mul_ops));
          }
      })
        // for(var i = 0; i < mul_op.length; i ++)
        // console.log(mul_op[i] +  ' <-- Multiple op \n ');

      //Assign Operator
      //Mul Operator
      var ass_op =[];
      lines.forEach(function(line) {
      if(line.match(':=') != null) {
              ass_op.push(line.match(':='));
          }
      })
      // for(var i = 0; i < ass_op.length; i ++)
      // console.log(ass_op[i] +  ' <-- assign op \n ');


      function isInt(n){
            return Number(n) === n && n % 1 === 0;
        }

      function isFloat(n){
            return Number(n) === n && n % 1 !== 0;
        }

      //Assign Operator
      //Mul Operator
      // lines.forEach(function(line) {
      //   console.log(isInt(line));
      //   console.log(isFloat(line));
      // })

      var pattern1='"';
      var check_que;
       for(var i = 0; i < lines.length; i++) {
          for( var j = 0; j <lines[i].length; j++) {
            if(lines[i][j] == pattern1)
                check_que = check_que + 1;
          }
          if(check_que == 1)
           // console.log("Unchecked Que mark");
            check_que = 0;
        }

      var check_paran=0;
      var Lparanthesis = '(';
      var Rparanthesis = ')';
      for(var i = 0; i < lines.length; i++) {
         for( var j = 0; j <lines[i].length; j++) {
           if(lines[i][j] == Lparanthesis) {
              if(lines[i][j] == Rparanthesis || lines[i][j] == Lparanthesis) {
                check_paran = check_paran + 1; //Two is matched Correctly
            }
         }
       }
    }

    })
  }

//
// recursiveDescentParser ();
// LexicalAnalyzer();
