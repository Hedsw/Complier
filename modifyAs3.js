var fs = require('fs');
var FS = require('./FileHandler.js');

//RE class
module.exports = {
  getRe: function() {
    var procMatch = (/PROCEDURE/gi);
    var endMatch = (/END/gi);
    var isMatch = (/IS/gi);
    var typeMark = (/integer|real|char|constant/gi);
    return [procMatch, endMatch, isMatch, typeMark]
  },
  read: function(txt) {
    if(txt == '') {
      // this.errorHandle(1);
      return true;
    }
    else
      return {err:false}
  },
  errorHandle: function(type) {
    switch(type){
      case 1: console.log('Test file empty');
    }
  },
  //bring data from FileHandler.js and then Check Grammers.
  recurseParser: function(data) {
  
  //   this.Test(); -> 똑같은 module안에서 사용 할 때 쓰는 것!
    var procMatch = (/PROCEDURE/gi);
    var endMatch = (/END/gi);
    var isMatch = (/IS/gi);
    var typeMark = (/integer|real|char|constant/gi)
    var procedure_count = 0;
    //var end_check = 0, end_check2 = 0;
    for(var i = 0; i < data.length; i++)
      if(data[i].match(procMatch) != null)
        procedure_count++;

    console.log(procedure_count);
//Counting Procedure
    if(procedure_count == 1) {
      var end_check = 0;
      for(var i = 0; i< data.length; i++) {
        if(data[i].match(procMatch) != null) {
          tmp_line = data[i].split(' ');
          idt_check = tmp_line[1];
        }
      if(data[i].match(endMatch) != null) {
          tmp_line = data[i].split(' ');
          tmp_line2 = tmp_line[1].split(';');
          end_check = tmp_line2[0];
        }
      }
      if(idt_check.match(end_check) == null)
        console.log("idt and end is not matched");
    }

    if(procedure_count == 2) {
        // var end_check,end_check2;
       if(data[0].match(procMatch) != null) {
          tmp_line2 = data[0].split(' ');
          idt_check2 = tmp_line2[1];
          // console.log(idt_check2);
        }
      for(var i = 0; i< data.length; i++) {
        if(data[i].match(endMatch) != null) {
          tmp_line = data[i].split(' ');
          tmp_line2 = tmp_line[1].split(';');
          end_check = tmp_line2[0];
        }
      }
      if(idt_check2.match(end_check) == null)
        console.log("idt and end is not matched1");

      for(var i = 1; i < (data.length-2); i++) {
        if(data[i].match(procMatch) != null) {
          tmp_line2 = data[i].split(' ');
          idt_check2 = tmp_line2[1];
        }

        if(data[i].match(endMatch) != null) {
          tmp_line = data[i].split(' ');
          tmp_line2 = tmp_line[1].split(';');
          end_check2 = tmp_line2[0];
        }
      }
      if(idt_check2.match(end_check2) == null)
        console.log("idt and end is not matched2");
    }
    // console.log(this.getRe.procMatch);
    data.forEach(function(line) {
      var is_check = 0;
      var paran_check = 0;
      var mode_check = 0; // ) check
      var mode_check2 = 0; // ; check
      var mode_check3 = 0; // : check
      var mode_check4 = 0; // ; check

     if(data[0].match(procMatch) != null) {
      data.forEach(function(line_ISCHECK) {
        if(line_ISCHECK.match(isMatch) != null) {
          is_check++;
        }
      })
      //Is Checking
      if(is_check != procedure_count) {
        console.log("IS is missing\n");
        // console.log(data);
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
        console.log(line + " Paranthesis is missing\n");
        paran_check = null;
      }
      tmp = mode_check3 - mode_check4;

      if(mode_check4 >= mode_check3 && paran_check > null)
        console.log(line + " : or ; missing");
        }
     }) //forEach End

    //DeclarativePart Start
     var check_begin;
     for(var i = 0; i<data.length; i++) {
        var lines2 = data[i].split(' ');
             if(lines2[0].match(/BEGIN/gi) != null) {
                check_begin = i+1;
                break;
       } // if macth
     } //for loop
     for(var j = 0; j < check_begin; j++) {
         var line3_tmp = data[j].split(' ');
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
     } //DeclarativePart Finish
  }
}
