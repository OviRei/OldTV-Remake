//Timer Variables
let ms = 0;
let running = false;
let tInterval;

//Timer
function start()
{
    if(!running)
    {
        tInterval = setInterval(function(){ ms++; }, 1);
        running = true;
    }
}

function stop()
{
    clearInterval(tInterval);
    running = false;
}

function reset()
{
    stop();
    ms = 0;
}

//ANCHOR Exports
export { ms, running, start, stop, reset };