//ANCHOR Imports
import { shuffle, getRndInteger } from '../Component/gameComponents.js';
import { equalColors, invertedControls, changeChannel } from '../Component/changeChannelComponent.js';
import { gameOver } from '../Component/gameOverComponent.js';
import * as timer from '../Component/timerComponent.js';

document.getElementById("Highscore").innerHTML = `#${localStorage.DBhighscore}`;

//ANCHOR Help Button
document.getElementById('HelpButton').addEventListener("click", function() 
{
    document.getElementById("HelpPopup").style.display = "block";
    document.getElementById("ShopPopup").style.display = "none";
    document.getElementById("AchievementsPopup").style.display = "none";
});

document.getElementById('CloseHelpPopupButton').addEventListener("click", function() 
{
    document.getElementById("HelpPopup").style.display = "none";
    document.getElementById("AchievementsPopup").style.display = "none";
    document.getElementById("ShopPopup").style.display = "none";

    document.getElementById('VerticalClickArea').style.display = "block";
    document.getElementById('HorizontalClickArea').style.display = "block";
});

function leftControl()
{
    if(!invertedControls)
    {
        if(equalColors) changeChannel();
        else gameOver();              
    }
    else
    {
        if(!equalColors) changeChannel();
        else gameOver(); 
    }
}

function rightControl()
{
    if(!invertedControls)
    {
        if(!equalColors) changeChannel();
        else gameOver();   
    }
    else
    {
        if(equalColors) changeChannel();
        else gameOver(); 
    }
}

//ANCHOR LEFT Click
const CLICK_AREA_ELMS = document.querySelectorAll('.ClickArea');

CLICK_AREA_ELMS.forEach(el => el.addEventListener('click', event => {
   // console.log("left click");
    leftControl();
}));

//TODO Make is so right click cant start the game while a popup is open
//ANCHOR RIGHT Click
if(document.addEventListener) 
{
    document.addEventListener('contextmenu', function(e) 
    {
        e.preventDefault();
        //console.log("RIGHT click");
        rightControl();
    }, false);
}

//ANCHOR Keyboard Controls
document.onkeyup = function(e)
{
    e = e || window.event;
    if(e.key == "q") leftControl();
    else if(e.key == "e") rightControl();
}