//Variable Initialising
let colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
const colorHex = ["#ff073a", "#FFFF00", "#00FF00", "#0000ff", "#00FFFF", "#800080"];
let score = -1;
let highscore = -1;
let clicks = 0;

// Generates the chances for colors displayed
function simulateEvent(chances) 
{
    let sum = 0;
    chances.forEach(function(chance) 
    {
        sum += chance;
    });
    let rand = Math.random();
    let chance = 0;
    for(var i = 0; i < chances.length; i++) 
    {
        chance += chances[i] / sum;
        if(rand<chance) 
        {
            return i;
        }
    }
    return -1;
}

//Shuffles text
function shuffle(s) {
    return s.replace(
     /\b([a-z])([a-z]+)([a-z])\b/gi,
        function( t, a, b, c ) 
        {
           b = b.split( /\B/ );
           for( var i = b.length, j, k; i; j = parseInt( Math.random() * i ),
            k = b[--i], b[i] = b[j], b[j] = k ) {}
           return a + b.join( '' ) + c;
        }
    );
}

//Generate a random number
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Variable Initialising
let colorDifferences = 0; //Counts the ammount of times the hex color and text color are different
let colorRandomNum;
let hexRandomNum;
let colorNamelikelihoods;
let colorHexlikelihoods;
let equalColors = false;
let invertedControls = false;

//Changes colors
function changeColor() 
{
    document.getElementById("GameOverText").style.display = "none";
    //Changes the likelyhoods of hex colors and text colors being either the same or different
    //1=red 2=yellow 3=green 4=blue 5=cyan 6=purple
    if(colorDifferences >= 3)
    {
        colorNamelikelihoods = [5,5,5,5,5,5];
        colorHexlikelihoods = [5,5,5,5,5,5];
    }
    else
    {
        colorNamelikelihoods = [2,3,2,4,4,3];
        colorHexlikelihoods = [1,3,2,5,3,2]; 
    }

    //Likelyhood function
    colorRandomNum = simulateEvent(colorHexlikelihoods);
    hexRandomNum = simulateEvent(colorNamelikelihoods);

    //Checks if the hex color and text color are the same
    if(colorRandomNum == hexRandomNum) 
    {
        equalColors = true; 
        colorDifferences = 0;
    }
    else 
    {
        equalColors = false;
        colorDifferences++;
    }

    //Add onto the score
    score++;

    //Changes the hex color and text color + updates score
    document.getElementById("ColorText").innerHTML = colorNames[colorRandomNum];
    document.getElementById("ColorText").style.color = colorHex[hexRandomNum]; 
    document.getElementById("Score").innerHTML = `Score: ${score}`;

    //Suffle color names after 20+
    if(score >= 20)
    {
        if(getRndInteger(1, 2) == 1)
        {
            colorNames = [shuffle("red"), shuffle("yellow"), shuffle("green"), shuffle("blue"), shuffle("cyan"), shuffle("purple")];
        }
        else if(getRndInteger(1, 2) == 1)
        {
            if(score <= 30) colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
            else colorNames = ["pǝɹ", "ʍollǝʎ", "uǝǝɹƃ", "ǝnlq", "uɐʎɔ", "ǝldɹnd"];
        }
        else
        {
            colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
        }
    }

    //Inverted controls
    if(score >= 40)
    {
        if(getRndInteger(1, 4) == 1)
        {
            invertedControls = true;
            document.getElementById("InvertedControlsText").style.display = "block";
            document.getElementById("InvertedControlsImg").style.display = "block";
        }
        else
        {
            invertedControls = false;
            document.getElementById("InvertedControlsText").style.display = "none";
            document.getElementById("InvertedControlsImg").style.display = "none";
        }
    }

    //Randomise background color
    if(score >= 50)
    {
        if(getRndInteger(0, 2) == 1)
        {
            let randomBackgroundColorNum = getRndInteger(0, 5);
            let randomBackgroundColor = colorHex[randomBackgroundColorNum];
            if(randomBackgroundColorNum == hexRandomNum) document.body.style.backgroundColor = "rgb(18, 18, 22)";
            else document.body.style.backgroundColor = randomBackgroundColor;
        }
        else
        {
            document.body.style.backgroundColor = "rgb(18, 18, 22)";
        }
    }
}

//Game over :p
function gameOver() {
    if(clicks > 1)
    {
        //Sets highscore and resets game
        if(score >= highscore)
        {
            //TODO Use localstorage to store highscore (https://github.com/OviRei/OldTV-Remake/issues/2)
            highscore = score;
            document.getElementById("Highscore").innerHTML = `Highscore: ${highscore}`;
        }
        document.getElementById("ColorText").innerHTML = "Game Over";
        document.getElementById("GameOverText").style.display = "block";
        document.getElementById("InvertedControlsText").style.display = "none";
        document.getElementById("InvertedControlsImg").style.display = "none";
        document.getElementById("ColorText").style.color = "white";
        document.body.style.backgroundColor = "rgb(18, 18, 22)";
        document.getElementById("Score").innerHTML = `Score: ${score}`;

        clicks = 0;
        score = -1;
    }
    else
    {
        changeColor();
    }
}

let helpButtonClicked = false;
//Help popup events
//TODO https://github.com/OviRei/OldTV-Remake/issues/1
document.getElementById('HelpButton').addEventListener("click", function() {
    helpButtonClicked = true;
    document.getElementById("HelpPopup").style.display = "block";
})

document.getElementById('ClosePopupButton').addEventListener("click", function() {
    helpButtonClicked = false;
    document.getElementById("HelpPopup").style.display = "none";
})

//Right Click event
document.oncontextmenu = rightClick; 
function rightClick(clickEvent) 
{ 
    clickEvent.preventDefault(); 

    if(!invertedControls)
    {
        clicks++;
        if(!equalColors) changeColor();
        else gameOver();              
    }
    else
    {
        clicks++;
        if(equalColors) changeColor();
        else gameOver(); 
    }
};

//Left Click event
document.body.addEventListener("click", function () 
{
    if(!helpButtonClicked)
    {
        if(!invertedControls)
        {
            clicks++;
            if(equalColors) changeColor();
            else gameOver();              
        }
        else
        {
            clicks++;
            if(!equalColors) changeColor();
            else gameOver(); 
        }
    }
});