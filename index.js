const ColorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
const ColorHex = ["#ff073a", "#FFFF00", "#00FF00", "#0000ff", "#00FFFF", "#800080"];
let ColorRandomNum;
let HexRandomNum;
let equal = false;
let different = 0;
let click = 0;
let score = -1;
let highscore = -1;

document.oncontextmenu = rightClick; 

function simulateEvent(chances) {
    var sum = 0;
    chances.forEach(function(chance) {
        sum+=chance;
    });
    var rand = Math.random();
    var chance = 0;
    for(var i=0; i<chances.length; i++) {
        chance+=chances[i]/sum;
        if(rand<chance) {
            return i;
        }
    }
    return -1;
}

function Start() {
    let colorNamelikelihoods;
    let colorHexlikelihoods;
    if(different >= 6)
    {
        colorNamelikelihoods = [5,5,5,5,5,5];
        colorHexlikelihoods = [5,5,5,5,5,5];
    }
    else
    {
        colorNamelikelihoods = [2,3,2,4,4,3];
        colorHexlikelihoods = [1,3,2,5,3,2]; 
    }


    ColorRandomNum = simulateEvent(colorHexlikelihoods);
    HexRandomNum = simulateEvent(colorNamelikelihoods);
    score++;

    document.getElementById("StartText").innerHTML = ColorNames[ColorRandomNum];
    document.getElementById("StartText").style.color = ColorHex[HexRandomNum]; 
    document.getElementById("Score").innerHTML = `Score: ${score}`;

    if(ColorRandomNum == HexRandomNum) 
    {
        equal = true; 
        different=0;
    }
    else 
    {
        equal = false; 
        different++;
    }
};

function GameOver() {
    if(click > 1)
    {
        if(score >= highscore)
        {
            highscore = score;
            document.getElementById("Highscore").innerHTML = `Highscore: ${highscore}`;
        }
        document.getElementById("StartText").innerHTML = "Game Over";
        document.getElementById("StartText").style.color = "black"; 
        document.getElementById("Score").innerHTML = `Score: ${score}`;

        click = 0;
        score = 0;
    }
    else
    {
        Start();
    }
}

function rightClick(clickEvent) { 
    clickEvent.preventDefault(); 

    click++;
    if(!equal) Start();
    else GameOver();
};

document.body.addEventListener("click", function () {
    click++;
    if(equal) Start();
    else GameOver();
});