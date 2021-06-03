import { changeChannel } from '../Component/changeChannelComponent.js';

//ANCHOR Game Over
if(localStorage.getItem("DBhighscore") === null) localStorage.setItem("DBhighscore", 0); //Sets DBhighscore to 0 if it doesn't exist

function gameOver()
{
    if(Number(sessionStorage.getItem("DBscore")) > 0)
    {
        //Sets highscore and resets game
        if(Number(sessionStorage.getItem("DBscore")) > Number(localStorage.getItem("DBhighscore")))
        {
            localStorage.setItem("DBhighscore", sessionStorage.getItem("DBscore"));
            document.getElementById("Highscore").innerHTML = `#${localStorage.getItem("DBhighscore")}`;
        }

        sessionStorage.setItem("DBscore", 0);
        sessionStorage.setItem("DBcolorNames", JSON.stringify(["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"]));
        //sessionStorage.setItem("DBinvertedControls", false);

        document.getElementById("Highscore").innerHTML = `#${localStorage.getItem("DBhighscore")}`;
        document.getElementById("ChannelText").innerHTML = "Game Over";
        document.getElementById("ChannelText").style.color = "white";
        document.body.style.backgroundColor = "rgb(18, 18, 22)";

        //Hides elements
        document.getElementById("Channel").style.display = "none";
        document.getElementById("Score").style.display = "none";
        document.getElementById("InvertedControlsText").style.display = "none";
        document.getElementById("InvertedControlsImg").style.display = "none";
        document.getElementById("Frequency").style.display = "none";

        //Shows elements
        document.getElementById("Highscore").style.display = "block";
        document.getElementById("TrophyImg").style.display = "block";
        document.getElementById("ShoppingCartImg").style.display = "block";
        document.getElementById("HelpButton").style.display = "block";
        document.getElementById("SettingsImg").style.display = "block";
    }    
    else
    {
        changeChannel();
    }
}

export { gameOver };