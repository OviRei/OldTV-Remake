//ANCHOR Imports
import { equalColors, changeChannel } from '../Component/changeChannelComponent.js';
import { gameOver } from '../Component/gameOverComponent.js';

document.getElementById("Highscore").innerHTML = `#${localStorage.getItem("DBhighscore")}`;

//ANCHOR Help Button
document.getElementById('HelpButton').addEventListener("click", function() 
{
    document.getElementById("HelpPopup").style.display = "block";
    document.getElementById("ShopPopup").style.display = "none";
    document.getElementById("AchievementsPopup").style.display = "none";
    document.getElementById("SettingsPopup").style.display = "none";
});

document.getElementById('CloseHelpPopupButton').addEventListener("click", function() 
{
    document.getElementById("HelpPopup").style.display = "none";
    document.getElementById("AchievementsPopup").style.display = "none";
    document.getElementById("ShopPopup").style.display = "none";
    document.getElementById("SettingsPopup").style.display = "none";``

    document.getElementById('VerticalClickArea').style.display = "block";
    document.getElementById('HorizontalClickArea').style.display = "block";
});

function leftControl()
{
    //if(sessionStorage.getItem("DBinvertedControls"))
    //{
    //    if(equalColors) changeChannel();
    //    else gameOver();
    //}
    //else
    //{
    //    if(!equalColors) changeChannel();
    //    else gameOver(); 
    //}

    if(equalColors) changeChannel();
    else gameOver();
}

function rightControl()
{
    //if(sessionStorage.getItem("DBinvertedControls"))
    //{
    //    if(!equalColors) changeChannel();
    //    else gameOver();   
    //}
    //else
    //{
    //    if(equalColors) changeChannel();
    //    else gameOver(); 
    //}

    if(!equalColors) changeChannel();
    else gameOver();
}

//ANCHOR LEFT Click
const CLICK_AREA_ELMS = document.querySelectorAll('.ClickArea');

CLICK_AREA_ELMS.forEach(el => el.addEventListener('click', event => {
    leftControl();
}));

//TODO Make is so right click cant start the game while a popup is open
//ANCHOR RIGHT Click
if(document.addEventListener) 
{
    document.addEventListener('contextmenu', function(e) 
    {
        e.preventDefault();
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