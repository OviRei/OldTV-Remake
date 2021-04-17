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
    for(let i = 0; i < chances.length; i++) 
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
function shuffle(s) 
{
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
function getRndInteger(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//ANCHOR Exports
export { simulateEvent, shuffle, getRndInteger };