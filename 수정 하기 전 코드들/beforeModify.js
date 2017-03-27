/***************************************
Name : Yunhyeok Lee
Instructor : George Hamer
Due Date : Feb 20 2017
Class : Complier CSC 446
***************************************/
// To Test..  node Comp_v2.js Test.txt

var modifyAs3 = require('./modifyAs3.js'); // Regular Expression
var FS = require('./FileHandler.js');
var as4 = require('./As4.js');
/*
Get file name from console to check data
*/


var test = FS.readTxt(process.argv[2]);
var slice = FS.sliceByLine(test);

if(modifyAs3.read(slice) == true) {
  modifyAs3.errorHandle(1);
  return;
}
var as3 = modifyAs3.recurseParser(slice);

//Regular Expressions
var procedure_match = (/PROCEDURE/gi);
var end_match = (/END/gi);
var IS_match = (/IS/gi);
var typeMark = (/integer|real|char|constant/gi);
   // var declar_pick = (/PROCEDURE|END|BEGIN|/gi);
function recursiveDescentParser (input) {

  var fs = require('fs');
  fs.readFile(process.argv[2],function(err,data) {
      if(err) throw err;

  var text = data.toString();
  var lines = text.split('\n');
  var procedure_tmp = text.split(' ');
  var procedure_count = 0;

  //Check the procedure how many procedure is working now
  for(var i = 0; i < lines.length; i++)
    if(lines[i].match(procedure_match) != null)
      procedure_count++;

  //begin end check
  if(procedure_count == 1) {
    for(var i = 0; i< lines.length; i++) {
      if(lines[i].match(procedure_match) != null) {
        tmp_line = lines[i].split(' ');
        idt_check = tmp_line[1];
      }
    if(lines[i].match(end_match) != null) {
        tmp_line = lines[i].split(' ');
        tmp_line2 = tmp_line[1].split(';');
        end_check = tmp_line2[0];
      }
    }
    if(idt_check.match(end_check) == null)
      console.log("idt and end is not matched");
  }

  if(procedure_count == 2) {
     if(lines[0].match(procedure_match) != null) {
        tmp_line2 = lines[0].split(' ');
        idt_check2 = tmp_line2[1];
      }
    for(var i = 0; i< lines.length; i++) {
      if(lines[i].match(end_match) != null) {
        tmp_line = lines[i].split(' ');
        tmp_line2 = tmp_line[1].split(';');
        end_check = tmp_line2[0];
      }
    }
    if(idt_check2.match(end_check) == null)
      console.log("idt and end is not matched1");

    for(var i = 1; i < (lines.length-3); i++) {
      if(lines[i].match(procedure_match) != null) {
        tmp_line2 = lines[i].split(' ');
        idt_check2 = tmp_line2[1];
      }

      if(lines[i].match(end_match) != null) {
        tmp_line = lines[i].split(' ');
        tmp_line2 = tmp_line[1].split(';');
        end_check2 = tmp_line2[0];
      }
    }

    if(idt_check2.match(end_check2) == null)
      console.log("idt and end is not matched2");
  }

 // match_procedure start
   lines.forEach(function(line) {
          match_procedure(line);
    })

    //declarativePart
    var check_begin;
    for(var i = 0; i<lines.length; i++) {
       var lines2 = lines[i].split(' ');
            if(lines2[0].match(/BEGIN/gi) != null) {
               check_begin = i+1;
               break;
      } // if macth
    } //for loop
          for(var j = 0; j < check_begin; j++) {
              var line3_tmp = lines[j].split(' ');
               if(/PROCEDURE|END|BEGIN/gi.test(line3_tmp[0])!=true) {
                 for(var k = 0; k < line3_tmp.length; k++) {
                  var n = line3_tmp[k].search(/:/g);
                    if( n >= 0) {
                      if(/integer|real|char/gi.test(line3_tmp[k-1])==true) {
                      console.log("Declarative Error " + line3_tmp[k-1]);
                  }
                }
                  var n2 = line3_tmp[k].search(/:=/g);
                    if( n2 >= 0) {
                       if(/constant/gi.test(line3_tmp[k-1])!=true) {
                      console.log("Declarative Error " + line3_tmp[k-1]);
                  }
                  if(/[0-9]/.test(line3_tmp[k+1])!=true) {
                      console.log("Declarative Error " + line3_tmp[k+1]);
                  }
                }
              }
            }
          }
         //DeclarativePart Finish
  })
}

// Procedure Match
// Here is check about idt Args is
function match_procedure(line) {
      var is_check = 0;
      var paran_check = 0;
      var lines2 = line.split(' ');
      var mode_check = 0; // ) check
      var mode_check2 = 0; // ; check
      var mode_check3 = 0; // : check
      var mode_check4 = 0; // ; check

      //Is check
     if(lines2[0].match(procedure_match) != null) {
      lines2.forEach(function(line_ISCHECK) {
        if(line_ISCHECK.match(IS_match) != null) {
          is_check++;
        }
      })

      //Is Checking
      if(is_check < 1) {
        console.log("IS is missing\n");
        console.log(lines2);
        is_check = 0;
      }

      //Paran Check
      for(var i = 0; i < line.length; i++) {
       //console.log(line[i]);
      if(line[i] == "(") {
          paran_check++;
          mode_check = i;
      }
      if(line[i] == ")")
          paran_check++;
      if(line[i] == ";") {
          mode_check4++;
          mode_check2 = i; // this need to make Args
      }
       if(line[i] == ":")
          mode_check3++;
    }
      if(paran_check == 1) {
        console.log(line + "Paranthesis is missing\n");
        paran_check = null;
      }
      tmp = mode_check3 - mode_check4;

      if(mode_check4 >= mode_check3 && paran_check > null)
        console.log(line + ": or ; missing");
  }
}


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
