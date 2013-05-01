/* Global variables */
var selectedIndex = "";
var gameObj = new game();
var playCount = 0;
var startTime = 0;
var fastTime = Number.MAX_VALUE;
var todayTime = Number.MAX_VALUE;

/* Object declarations and functions */
function game()
{
    this.map = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
    this.colors = {RED : 0, ORANGE : 1, YELLOW : 2, GREEN : 3, BLUE : 4, INDIGO : 5, VIOLET : 6};
    this.matches = 0;
    this.total = 49;
    //this.chosenOne = "";

    this.checkMatch = checkMatch;
    this.wipeVals = wipeVals;
    this.checkSel = checkSel;
}

function checkMatch(newX, newY, selX, selColor)
{
    // If it's already in the right column, leave it alone!
    if (selColor == selX) {
        return 0;
    }
    // If swapping it will put it in the right column
    if (selColor == newX) {
        // If it is replacing a bad color -> swap it!
        if (this.map[newX][newY] == 0) {
            this.map[newX][newY] = 1;
            this.matches++;
            return 1;
        }
        // If it's replacing the right color -> don't swap!
        else if (this.map[newX][newY] == 1) {
            return 0;
        }
    // If swapping it will put it in the wrong column
    } else {
        // If it's replacing a bad color -> swap it!
        if (this.map[newX][newY] == 0) {
            return 1;
        }
        // If it's replacing the right color -> don't swap!
        else if (this.map[newX][newY] == 1) {
            return 0;
        }
    }
}

function checkSel(selColor, selX, selY)
{
    if (selColor == selX) {
        this.map[selX][selY] = 1;
        this.matches++;
        return true;
    } else {
        return false;
    }
}

function wipeVals ()
{
    var i;
    var j;
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            this.map[i][j] = 0;
        }
    }
}

/* Gameplay functions */

function parseColorNum(color)
{
    if (color == "red")
        return 0;
    if (color == "orange")
        return 1;
    if (color == "yellow")
        return 2;
    if (color == "green")
        return 3;
    if (color == "blue")
        return 4;
    if (color == "indigo")
        return 5;
    if (color == "violet")
        return 6;
}

function parseColorName(number)
{
    switch(number) {
        case 0:
            return "red";
            break
        case 1:
            return "orange";
            break
        case 2:
            return "yellow";
            break
        case 3:
            return "green";
            break
        case 4:
            return "indigo";
            break
        case 5:
            return "blue";
            break
        case 6:
            return "violet";
            break
    }
}

function handleSelect(newPiece)
{
    // If there's already something selected
    if (selectedIndex) {
        // If it's this piece
        if (selectedIndex == newPiece.id) {
            unselectPiece(newPiece);
        } else {
            // Otherwise, handle matches
            handleSwap(newPiece);
        }
    } else {
    // If there isn't already something selected
        selectPiece(newPiece);
    }

    if (gameObj.matches >= gameObj.total) {
        finishGame();
    }
}

function handleSwap(newPiece)
{
    // Get the x and y coords
    selX = selectedIndex.substr(0, 1);
    selY = selectedIndex.substr(1, 1);
    newX = newPiece.id.substr(0, 1);
    newY = newPiece.id.substr(1, 1);

    // Get the colorNum
    var selPiece = document.getElementById(selectedIndex);
    var selColorNum;
    var selColorName;

    // Get the color of the already selected piece
    var selColorArray = selPiece.className.split(" ");
    var selColorName = selColorArray[1];
    selColorNum = parseColorNum(selColorName);

    // Check for a match
    var res = gameObj.checkMatch(newX, newY, selX, selColorNum);

    // If you can swap, do so
    if (res) {
        var newColorArray = newPiece.className.split(" ");
        newPiece.className = newColorArray[0] + " " + selColorName;
        selPiece.className = selColorArray[0] + " " + newColorArray[1] + " " + selColorArray[2];

        // Check to see if the selected piece is in the right column
        selColorNum = parseColorNum(newColorArray[1]);
        if (gameObj.checkSel(selColorNum, selX, selY)) {
        unselectPiece(selPiece);
        }
    }
}

function selectPiece(box)
{
    box.className += " selected";
    selectedIndex = box.id;
}

function unselectPiece(box)
{
    var index = box.className.indexOf(" selected");
    if (index != -1) {
        var newStr = box.className.substring(0, index);
        box.className = newStr;
    }

    selectedIndex = "";
}

/* Initilization function */

function generateBoard() {
    var i;
    var j;
    var rand;
    var colorNums = [0, 0, 0, 0, 0, 0, 0];

    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            var index = i.toString(10) + j.toString(10);
            do {
                rand = Math.floor(Math.random()*7);
            } while (colorNums[rand] > 6);

            //alert(index);
            switch(rand) {
                case 0:
                    document.getElementById(index).className += " red";
                    if (i == gameObj.colors.RED) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[0]++;
                    break;
                case 1:
                    document.getElementById(index).className += " orange";
                    if (i == gameObj.colors.ORANGE) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[1]++;
                    break;
                case 2:
                    document.getElementById(index).className += " yellow";
                    if (i == gameObj.colors.YELLOW) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[2]++;
                    break;
                case 3:
                    document.getElementById(index).className += " green";
                    if (i == gameObj.colors.GREEN) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[3]++;
                    break;
                case 4:
                    document.getElementById(index).className += " blue";
                    if (i == gameObj.colors.BLUE) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[4]++;
                    break;
                case 5:
                    document.getElementById(index).className += " indigo";
                    if (i == gameObj.colors.INDIGO) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[5]++;
                    break;
                case 6:
                    document.getElementById(index).className += " violet";
                    if (i == gameObj.colors.VIOLET) {
                        gameObj.map[i][j] = 1;
                        gameObj.matches++;
                    }
                    colorNums[6]++;
                    break;
            }
        }
    }
} // end generateBoard

/* Game state functions */

function finishGame()
{
    // Get new variables
    playCount++;
    var date = new Date();
    var time = new Number();
    time = (date.getTime() - startTime) / 1000;
    if (time.toFixed(2) < fastTime) {
        fastTime = time.toFixed(2);
    }
    if (time.toFixed(2) < todayTime) {
        todayTime = time.toFixed(2);
    }

    // Alert the user
    alert("You won the game! Radiohead would be proud!");

    // Display new variables
    var playField = document.getElementById("timesplayed");
    if (playField.innerHTML != null) {
        playField.innerHTML = playCount + " times";
    }
    var lastField = document.getElementById("lasttime");
    if (lastField.innerHTML != null) {
        lastField.innerHTML = time.toFixed(2) + " seconds";
    }
    var fastField = document.getElementById("fasttime");
    if (fastField.innerHTML != null) {
        fastField.innerHTML = fastTime + " seconds";
    }
    var todayField = document.getElementById("todaytime");
    if (todayField.innerHTML != null) {
        todayField.innerHTML = todayTime + " seconds";
    }

    // Put new variables in the cookie
    if (navigator.cookieEnabled) {
        var value = playCount + ' ' + fastTime;
        writeCookie("in_rainbows", value, 365);
    } else {
        alert("Use cookies or codemonkey will cry!");
    }

    // Start over!
    playGame(true);
}

function resetGame()
{
    selectedIndex = "";

    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            var index = i.toString(10) + j.toString(10);
            document.getElementById(index).className = "box";
        }
    }

    gameObj.wipeVals();
    gameObj.matches = 0;
}

function playGame(reset)
{
    // Handle if this is the first time being played in this window
    if (reset) {
        resetGame();
    } else {
        if (navigator.cookieEnabled) {
            var cookieVal = readCookie("in_rainbows");
            if (cookieVal != null) {
                var vals = cookieVal.split(' ');
                playCount = vals[0];
                fastTime = vals[1];

                document.getElementById("timesplayed").innerHTML = playCount;
                document.getElementById("fasttime").innerHTML = fastTime;
            }
        } else {
            alert("You don't support cookies! What's wrong with you?");
        }
    }
    generateBoard();
    var time = new Date();
    startTime = time.getTime();
}