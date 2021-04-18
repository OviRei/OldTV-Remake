//ANCHOR Imports
import { simulateEvent, shuffle, getRndInteger } from '../Component/gameComponents.js';
import { equalColors, invertedControls, changeChannel, gameOver } from '../Component/changeChannelComponent.js';
import * as timer from '../Component/timerComponent.js';

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

function leftClick()
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

function rightClick()
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
[document.getElementById('VerticalClickArea'), document.getElementById('HorizontalClickArea')].forEach(item => 
{
    item.addEventListener('click', event => 
    {
        console.log("left clijc");

        leftClick();
    })
})

//TODO When DB is set up make is so right click cant start the game while a popup is open
//ANCHOR RIGHT Click
if(document.addEventListener) 
{
    document.addEventListener('contextmenu', function(e) 
    {
        console.log("RIGHT clijc");
        e.preventDefault();

        rightClick();
    }, false);
}

document.onkeydown = function(e) 
{
    e = e || window.event;
    if(e.key == "q") leftClick();
    else if(e.key == "e") rightClick();
};