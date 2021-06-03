//ANCHOR Imports
import { shuffle, getRndInteger } from './gameComponents.js';
import { COLOR_HEX, channelHexRandomNum } from './changeChannelComponent.js';

//ANCHOR Variable initialising
//if(sessionStorage.getItem("DBinvertedControls") === null) sessionStorage.setItem("DBinvertedControls", false);

function changeDifficulty()
{
    if(Number(sessionStorage.getItem("DBscore")) < 20) sessionStorage.setItem("DBcolorNames", JSON.stringify(["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"]));

    //Shuffle color names after score 20+
    if(Number(sessionStorage.getItem("DBscore")) >= 20)
    {
        if(getRndInteger(1, 2) == 1)
        {
            sessionStorage.setItem("DBcolorNames", JSON.stringify([shuffle("red"), shuffle("yellow"), shuffle("green"), shuffle("blue"), shuffle("cyan"), shuffle("purple")]));
        }
        else
        {
            sessionStorage.setItem("DBcolorNames", JSON.stringify(["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"]));
        }
    }

    //Upside down color names after 30+
    if(Number(sessionStorage.getItem("DBscore")) >= 30)
    {
        if(getRndInteger(1, 2) == 1)
        {
            sessionStorage.setItem("DBcolorNames", JSON.stringify(["pǝɹ", "ʍollǝʎ", "uǝǝɹƃ", "ǝnlq", "uɐʎɔ", "ǝldɹnd"]));
        }
        else
        {
            sessionStorage.setItem("DBcolorNames", JSON.stringify(["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"]));
        }
    }

    //TODO Fix inverted controls
    //Inverted controls after score 40+
    //if(Number(sessionStorage.getItem("DBscore")) >= 40)
    //{
    //    if(getRndInteger(1, 4) == 1)
    //    {
    //        sessionStorage.setItem("DBinvertedControls", true);
    //        document.getElementById("InvertedControlsImg").style.display = "block";
    //        document.getElementById("InvertedControlsText").style.display = "block";
    //    }
    //    else
    //    {
    //        sessionStorage.setItem("DBinvertedControls", false);
    //        document.getElementById("InvertedControlsImg").style.display = "none";
    //        document.getElementById("InvertedControlsText").style.display = "none";
    //    }
    //}

    //Randomise background color
    if(Number(sessionStorage.getItem("DBscore")) >= 50)
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

//ANCHOR Exports
export { changeDifficulty };