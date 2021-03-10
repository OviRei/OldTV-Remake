//Variable Initialising
const colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
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

//Variable Initialising
let colorDifferences = 0; //Counts the ammount of times the hex color and text color are different
let colorRandomNum;
let hexRandomNum;
let colorNamelikelihoods;
let colorHexlikelihoods;
let equalColors = false;

//Changes colors
function changeColor() 
{
    //Changes the likelyhoods of hex colors and text colors being either the same or different
    if(colorDifferences >= 6)
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
}

//Game over :p
function gameOver() {
    if(clicks > 1)
    {
        //Sets highscore and resets game
        if(score >= highscore)
        {
            //TODO Use localstorage to store highscore
            highscore = score;
            document.getElementById("Highscore").innerHTML = `Highscore: ${highscore}`;
        }
        document.getElementById("ColorText").innerHTML = "Game Over";
        document.getElementById("ColorText").style.color = "white"; 
        document.getElementById("Score").innerHTML = `Score: ${score}`;

        clicks = 0;
        score = 0;
    }
    else
    {
        changeColor();
    }
}

//Right Click event
document.oncontextmenu = rightClick; 
function rightClick(clickEvent) 
{ 
    clickEvent.preventDefault(); 

    clicks++;
    if(!equalColors) changeColor();
    else gameOver();
};

//Left Click event
document.body.addEventListener("click", function () 
{
    clicks++;
    if(equalColors) changeColor();
    else gameOver();
});