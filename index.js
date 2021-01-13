const ColorNames = ["Red", "Yellow", "Green", "Blue", "Cyan", "Purple"];
const ColorHex = ["#ff073a", "#FFFF00", "#00FF00", "#0000ff", "#00FFFF", "#800080"];
let ColorRandomNum;
let HexRandomNum;
let equal = false;
let click = 0;
let score = -1;
let rightClicked = false;
let leftClicked = false;

document.oncontextmenu = rightClick; 

function Start() {
    ColorRandomNum = Math.floor(Math.random() * 6);
    HexRandomNum = Math.floor(Math.random() * 6);
    score++;
    console.log("Score: " + score)

    document.getElementById("StartText").innerHTML = ColorNames[ColorRandomNum];
    document.getElementById("StartText").style.color = ColorHex[HexRandomNum]; 
    document.getElementById("Score").innerHTML = `Score: ${score}`;

    if(ColorRandomNum == HexRandomNum) equal = true;
    else equal = false;
    console.log(equal);
};



function GameOver() {
    if(click > 1)
    {
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
    console.log("Right click: " + click)
    rightClicked = true;

    if(!equal) Start();
    else GameOver();
};

document.body.addEventListener("click", function () {
    click++; 
    console.log("Left click: " + click)
    leftClicked = true;

    if(equal) Start();
    else GameOver();
});