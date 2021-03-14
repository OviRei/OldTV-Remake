//Variable Initialising
let colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
const colorHex = ["#ff073a", "#FFFF00", "#00FF00", "#0000ff", "#00FFFF", "#800080"];
let score = -1;
let highscore = -1;
let clicks = 0;

//Timer Variables
let ms = 0;
let running = false;
let tInterval;

//Timer
function startTimer()
{
    if(!running)
    {
        tInterval = setInterval(timeInterval, 1);
        running = true;
    }
}

function resetTimer()
{
    clearInterval(tInterval);
    running = false;
    ms = 0;
}

function timeInterval(){ ms++; }

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

//Shuffles text
function shuffle(s) {
    return s.replace(
     /\b([a-z])([a-z]+)([a-z])\b/gi,
        function( t, a, b, c ) 
        {
           b = b.split( /\B/ );
           for( var i = b.length, j, k; i; j = parseInt( Math.random() * i ),
            k = b[--i], b[i] = b[j], b[j] = k ) {}
           return a + b.join( '' ) + c;
        }
    );
}

//Generate a random number
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Variable Initialising
let colorDifferences = 0; //Counts the ammount of times the hex color and text color are different
let colorRandomNum;
let hexRandomNum;
let colorNamelikelihoods;
let colorHexlikelihoods;
let equalColors = false;
let invertedControls = false;

//Changes colors
function changeColor() 
{
    document.getElementById("Frequency").style.display = "block";
    //Changes the likelyhoods of hex colors and text colors being either the same or different
    //1=red 2=yellow 3=green 4=blue 5=cyan 6=purple
    if(colorDifferences >= 3)
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

    //Suffle color names after 20+
    if(score >= 20)
    {
        if(getRndInteger(1, 2) == 1)
        {
            colorNames = [shuffle("red"), shuffle("yellow"), shuffle("green"), shuffle("blue"), shuffle("cyan"), shuffle("purple")];
        }
        else if(getRndInteger(1, 2) == 1)
        {
            if(score <= 30) colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
            else colorNames = ["pǝɹ", "ʍollǝʎ", "uǝǝɹƃ", "ǝnlq", "uɐʎɔ", "ǝldɹnd"];
        }
        else
        {
            colorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
        }
    }

    //Inverted controls
    if(score >= 40)
    {
        if(getRndInteger(1, 4) == 1)
        {
            invertedControls = true;
            document.getElementById("InvertedControlsText").style.display = "block";
            document.getElementById("InvertedControlsImg").style.display = "block";
        }
        else
        {
            invertedControls = false;
            document.getElementById("InvertedControlsText").style.display = "none";
            document.getElementById("InvertedControlsImg").style.display = "none";
        }
    }

    //Randomise background color
    if(score >= 50)
    {
        if(getRndInteger(0, 2) == 1)
        {
            let randomBackgroundColorNum = getRndInteger(0, 5);
            let randomBackgroundColor = colorHex[randomBackgroundColorNum];
            if(randomBackgroundColorNum == hexRandomNum) document.body.style.backgroundColor = "rgb(18, 18, 22)";
            else document.body.style.backgroundColor = randomBackgroundColor;
        }
        else
        {
            document.body.style.backgroundColor = "rgb(18, 18, 22)";
        }
    }

    if(running) resetTimer();
    startTimer();

    //Checks frequency level
    setInterval(function(){
        const maxFrequency = (1.03**(-score+23.5)+1)*100;
        let frequency = Math.floor(maxFrequency) - ms;
        document.getElementById("Frequency").innerHTML = `${frequency}hz`;

        if(ms >= maxFrequency) //https://discord.com/channels/418091414015049729/800327191689953290/820433698095759362 https://www.geogebra.org/calculator
        {
            clicks = 2;
            gameOver();
        }
    }, 1);
}

//Game over :p
function gameOver() {
    if(clicks > 1)
    {
        //Sets highscore and resets game
        if(score >= highscore)
        {
            //TODO Use localstorage to store highscore (https://github.com/OviRei/OldTV-Remake/issues/2)
            highscore = score;
            document.getElementById("Highscore").innerHTML = `Highscore: ${highscore}`;
        }
        document.getElementById("ColorText").innerHTML = "Game Over";
        document.getElementById("InvertedControlsText").style.display = "none";
        document.getElementById("InvertedControlsImg").style.display = "none";
        document.getElementById("Frequency").style.display = "none";
        document.getElementById("ColorText").style.color = "white";
        document.body.style.backgroundColor = "rgb(18, 18, 22)";
        document.getElementById("Score").innerHTML = `Score: ${score}`;

        clicks = 0;
        score = -1;
        
        //Resets frequency
        resetTimer();
    }
    else
    {
        changeColor();
    }
}

let helpButtonClicked = false;
//Help popup events
//TODO https://github.com/OviRei/OldTV-Remake/issues/1
document.getElementById('HelpButton').addEventListener("click", function() {
    helpButtonClicked = true;
    document.getElementById("HelpPopup").style.display = "block";
})

document.getElementById('ClosePopupButton').addEventListener("click", function() {
    helpButtonClicked = false;
    document.getElementById("HelpPopup").style.display = "none";
})

let MobileUser = false;

//Checks if user is on mobile device
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) 
{ 
    MobileUser = true;

    //Checks if Right Control div is pressed
    document.getElementById('RightControl').addEventListener("click", function() {
        if(!invertedControls)
        {
            clicks++;
            if(!equalColors) changeColor();
            else gameOver();              
        }
        else
        {
            clicks++;
            if(equalColors) changeColor();
            else gameOver(); 
        }
    })

    //Checks if Left Control div is pressed
    document.getElementById('LeftControl').addEventListener("click", function() {
        if(!invertedControls)
        {
            clicks++;
            if(equalColors) changeColor();
            else gameOver();              
        }
        else
        {
            clicks++;
            if(!equalColors) changeColor();
            else gameOver(); 
        }
    })
}
else MobileUser = false;

//Right Click event
document.oncontextmenu = rightClick; 
function rightClick(clickEvent) 
{ 
    clickEvent.preventDefault(); 

    if(!MobileUser)
    {
        if(!invertedControls)
        {
            clicks++;
            if(!equalColors) changeColor();
            else gameOver();              
        }
        else
        {
            clicks++;
            if(equalColors) changeColor();
            else gameOver(); 
        }        
    }
};

//Left Click event
document.body.addEventListener("click", function () 
{
    if(!MobileUser)
    {
        if(!helpButtonClicked)
        {
            if(!invertedControls)
            {
                clicks++;
                if(equalColors) changeColor();
                else gameOver();              
            }
            else
            {
                clicks++;
                if(!equalColors) changeColor();
                else gameOver(); 
            }
        }        
    }
});