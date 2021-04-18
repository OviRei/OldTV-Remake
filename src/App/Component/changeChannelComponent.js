//ANCHOR Imports
import { simulateEvent, shuffle, getRndInteger } from './gameComponents.js';

//ANCHOR Variable initialising
let score = 0;

let colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
const COLOR_HEX = ["#ff073a", "#FFFF00", "#00FF00", "#0000ff", "#00FFFF", "#800080"];

let colorDifferences = 0; //Counts the ammount of times the hex color and text color are different
//Channel RND Variables
let channelColorRandomNum;
let channelHexRandomNum;
let equalColors = false; //Checks if the the hex color and text color are the same

function changeChannel()
{
    //ANCHOR Channel RND
    if(colorDifferences >= getRndInteger(4, 7))
    {
        channelColorRandomNum = getRndInteger(0, 5);
        channelHexRandomNum = channelColorRandomNum
    }
    else
    {
        channelColorRandomNum = getRndInteger(0, 5);
        channelHexRandomNum = getRndInteger(0, 5);
    }

    //Checks if the hex color and text color are the same
    if(channelColorRandomNum == channelHexRandomNum) 
    {
        equalColors = true;
        colorDifferences = 0;
    }
    else 
    {
        equalColors = false;
        colorDifferences++;
    }
    
    //Changes the hex color and text color + updates score
    score++;
    document.getElementById("ChannelText").innerHTML = colorNames[channelColorRandomNum];
    document.getElementById("ChannelText").style.color = COLOR_HEX[channelHexRandomNum]; 
    document.getElementById("Score").innerHTML = `Score: ${score}`;

    //Adds difficulty after reaching certain scores
    changeDifficulty();

    //Hides elements
    document.getElementById("TrophyImg").style.display = "none";
    document.getElementById("ShoppingCartImg").style.display = "none";
    document.getElementById("HelpButton").style.display = "none";
}


//TODO Put this in own component once database is set up
//ANCHOR Change Difficulty
let invertedControls = false;

function changeDifficulty()
{
    if(score < 20) colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];

    //Suffle color names after score 20+
    if(score >= 20)
    {
        if(getRndInteger(1, 2) == 1)
        {
            colorNames = [shuffle("red"), shuffle("yellow"), shuffle("green"), shuffle("blue"), shuffle("cyan"), shuffle("purple")];
        }
        else
        {
            colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
        }
    }

    //Upsidedown color names after 30+
    if(score >= 30)
    {
        if(getRndInteger(1, 2) == 1)
        {
            colorNames = ["pǝɹ", "ʍollǝʎ", "uǝǝɹƃ", "ǝnlq", "uɐʎɔ", "ǝldɹnd"];
        }
        else
        {
            colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
        }
    }

    //Inverted controls after score 40+
    if(score >= 40)
    {
        if(getRndInteger(1, 4) == 1)
        {
            invertedControls = true;
            document.getElementById("InvertedControlsImg").style.display = "block";
            document.getElementById("InvertedControlsText").style.display = "block";
        }
        else
        {
            invertedControls = false;
            document.getElementById("InvertedControlsImg").style.display = "none";
            document.getElementById("InvertedControlsText").style.display = "none";
        }
    }

    //Randomise background color
    if(score >= 50)
    {
        if(getRndInteger(0, 2) == 1)
        {
            let randomBackgroundColorNum = getRndInteger(0, 5);
            let randomBackgroundColor = COLOR_HEX[randomBackgroundColorNum];
            if(randomBackgroundColorNum == channelHexRandomNum) document.body.style.backgroundColor = "rgb(18, 18, 22)";
            else document.body.style.backgroundColor = randomBackgroundColor;
        }
        else
        {
            document.body.style.backgroundColor = "rgb(18, 18, 22)";
        }
    }
}

//TODO Put this in own component once database is set up
//ANCHOR Game Over
let highscore = 0;

function gameOver()
{
    if(score > 0)
    {
        //Sets highscore and resets game
        if(score >= highscore)
        {
            //TODO Use database to store highscore (https://github.com/OviRei/OldTV-Remake/issues/2)
            highscore = score;
            document.getElementById("Highscore").innerHTML = `Highscore: ${highscore}`;
        }

        score = 0;

        document.getElementById("ChannelText").innerHTML = "Game Over";
        document.getElementById("ChannelText").style.color = "white";
        document.body.style.backgroundColor = "rgb(18, 18, 22)";
        document.getElementById("Score").innerHTML = `Score: ${score}`;

        //Hides elements
        document.getElementById("InvertedControlsText").style.display = "none";
        document.getElementById("InvertedControlsImg").style.display = "none";
        document.getElementById("Frequency").style.display = "none";

        //Shows elements
        document.getElementById("TrophyImg").style.display = "block";
        document.getElementById("ShoppingCartImg").style.display = "block";
        document.getElementById("HelpButton").style.display = "block";
    }    
    else
    {
        changeChannel();
    }
}

//ANCHOR Exports
export { equalColors, highscore, score, invertedControls, changeChannel, gameOver };