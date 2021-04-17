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

//ANCHOR LEFT Click
[document.getElementById('VerticalClickArea'), document.getElementById('HorizontalClickArea')].forEach(item => 
{
    item.addEventListener('click', event => 
    {
        console.log("left clijc");

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
    })
})

//TODO When DB is set up make is so right click cant start the game while a popup is open
//ANCHOR RIGHT Click
if (document.addEventListener) 
{
    document.addEventListener('contextmenu', function(e) 
    {
        console.log("RIGHT clijc");
        e.preventDefault();

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
    }, false);
}