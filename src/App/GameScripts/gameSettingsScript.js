document.getElementById('SettingsImg').addEventListener("click", function() 
{
    document.getElementById("SettingsPopup").style.display = "block";
    document.getElementById("AchievementsPopup").style.display = "none";
    document.getElementById("HelpPopup").style.display = "none";
    document.getElementById('VerticalClickArea').style.display = "none";
    document.getElementById('HorizontalClickArea').style.display = "none";
});

document.getElementById('CloseSettingsPopupButton').addEventListener("click", function() 
{
    document.getElementById("HelpPopup").style.display = "none";
    document.getElementById("AchievementsPopup").style.display = "none";
    document.getElementById("ShopPopup").style.display = "none";
    document.getElementById("SettingsPopup").style.display = "none";

    document.getElementById('VerticalClickArea').style.display = "block";
    document.getElementById('HorizontalClickArea').style.display = "block";
});