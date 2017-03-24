var fs = require('fs');
module.exports = {
    // File Read
    // output: (string) extract Text File
    readTxt: function(path) {
      var result;
      return fs.readFileSync('./'+path, {encoding: 'utf8'},(err, data) => {
        if (err) throw err;
        result = data;
      });
    },
    // Splice by Line
    // output: (array) text line array
    sliceByLine: function(data) {
      var lines = data.split('\n');
      lines = lines.filter(function(v){return v!==''});
      return lines;
    }
}
