// UserAddressable variables, how many numbers and time between calls
var maxNum = 90;
var interval = 1000; 
// background variables 
var pool = []; // create pool of numbers
var poolDrawn = []; // pool of called numbers
var timer;  // automatic game timer 

// Initialize pool of numbers
function initPool(){
    for (var i = 1; i <= maxNum ; i++) {
        pool.push(i);
    }
}

// Start automatic game
function startGame(){
    timer = setInterval(setGenerator,interval);
}

function sortNumber(a, b)
{
  return a - b;
}

// Call next number and push called number to HTML
function setGenerator(){
    if (pool.length == 0) {
        throw "No numbers left";
    }
    var index = Math.floor(pool.length * Math.random());
    var drawn = pool.splice(index, 1);
    poolDrawn.push(drawn[0]);
    poolDrawn = poolDrawn.sort(sortNumber);
    document.getElementById("circle_text").innerHTML=drawn[0];
    printArrayInTabularFormat(poolDrawn,5);
}

// Stop/pause automatic game 
function pauseGenerator() {
    clearInterval(timer);
}

function printArrayInTabularFormat(poolDrawn, colCount) {
    var html = '<table name="pollTable" cellpadding="1" border="1"><thead></thead><tbody>' + "\n";

    var cellIndex=1;
    for (var $i=0; $i<poolDrawn.length; $i++) {
      if (cellIndex == 1) {
        html += '<tr>';
      }
      var $id = poolDrawn[$i];
      html += '<td width="40">' + $id + '</td>' + "\n";
      if (++cellIndex > colCount) { //close the row
        html += '</tr>';
        cellIndex = 1;
      }
    }
    //finish empty cells
    var remainingCellsCount = poolDrawn.length % colCount;
    if (remainingCellsCount) {
      for (var $i=0; $i<remainingCellsCount; $i++) {
        html += '<td width="40"> </td>' + "\n";
      }
      html += '</tr>';
    }
    html += '</tbody></table>' + "\n";
    html += '</td></tr></tbody></table>' + "\n";
   
    document.getElementById('poll').innerHTML = html;
}

window.addEventListener('load',initPool,false);
