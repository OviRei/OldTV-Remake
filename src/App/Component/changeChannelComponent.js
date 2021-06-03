//ANCHOR Imports
import { getRndInteger } from './gameComponents.js';
import { gameOver } from '../Component/gameOverComponent.js';
import { changeDifficulty } from './changeDifficultyComponent.js';
import * as timer from '../Component/timerComponent.js';


//Initializing localstorage 
if(sessionStorage.getItem("DBscore") === null) sessionStorage.setItem("DBscore", 0);
if(sessionStorage.getItem("DBcolorNames") === null) sessionStorage.setItem("DBcolorNames", JSON.stringify(["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"]));

//ANCHOR Variable initialising
const COLOR_HEX = ["#ff073a", "#FFFF00", "#00FF00", "#0000ff", "#00FFFF", "#800080"];

let colorDifferences = 0; //Counts the amount of times the hex color and text color are different
//Channel RND Variables
let channelColorRandomNum;
let channelHexRandomNum;
let equalColors = false; //Checks if the the hex color and text color are the same

function changeChannel()
{
    let colorNames = JSON.parse(sessionStorage.getItem("DBcolorNames"));

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
    sessionStorage.setItem("DBscore", Number(sessionStorage.DBscore)+1);
    document.getElementById("ChannelText").innerHTML = colorNames[channelColorRandomNum];
    document.getElementById("ChannelText").style.color = COLOR_HEX[channelHexRandomNum]; 
    document.getElementById("Score").innerHTML = `#${sessionStorage.DBscore}`;

    //Adds difficulty after reaching certain scores
    changeDifficulty();

    //Starts frequency
    if(timer.running) timer.reset();
    timer.start();

    //Checks frequency level
    setInterval(function()
    {
        const maxFrequency = (1.03**(-Number(sessionStorage.getItem("DBscore"))+23.5)+1.38)*100;
        let frequency = Math.floor(maxFrequency) - timer.ms;
        document.getElementById("Frequency").innerHTML = `${frequency}hz`;

        if(timer.ms >= maxFrequency) //https://discord.com/channels/418091414015049729/800327191689953290/820433698095759362 https://www.geogebra.org/calculator
        {
            gameOver();
        }
    }, 1);

    //Shows elements
    document.getElementById("Channel").style.display = "block";
    document.getElementById("Score").style.display = "block";   
    document.getElementById("Frequency").style.display = "block"; 

    //Hides elements
    document.getElementById("TrophyImg").style.display = "none";
    document.getElementById("ShoppingCartImg").style.display = "none";
    document.getElementById("SettingsImg").style.display = "none";
    document.getElementById("HelpButton").style.display = "none";
    document.getElementById("Highscore").style.display = "none";
}

//ANCHOR Exports
export { equalColors, COLOR_HEX, channelHexRandomNum, changeChannel };