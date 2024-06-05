
let startStopButton = document.getElementById("start/stop");
let lapButton = document.getElementById("lap");
let resetButton = document.getElementById("reset");

let msecValue = document.getElementById("msecond");
let secValue = document.getElementById("second");
let minValue = document.getElementById("minute");
let hourValue = document.getElementById("hour");

let lapList = document.getElementById("laplist");

let msecCount = 0;
let secCount = 0;
let minCount = 0;
let hourCount = 0;
let laprecord = [];
let timerId;

let stateRunning = false;

function StartTimer(){
    timerId = setInterval(()=> {
        msecValue.innerHTML = msecCount.toString().padStart(2, '00');
        secValue.innerHTML = secCount.toString().padStart(2, '00');
        minValue.innerHTML = minCount.toString().padStart(2, '00');
        hourValue.innerHTML = hourCount.toString().padStart(2, '00');
        lapButton.style.backgroundColor = "#7c76a35e"
        resetButton.style.backgroundColor = "#7c76a35e"
        lapButton.style.color = "white"
        resetButton.style.color = "white"
        msecCount++;
        
        if (msecCount >= 100) {
            msecCount = 0;
            secCount++;
        }
        if (secCount > 59) {
            secCount = 0;
            minCount++;
        }
        if (minCount > 59) {
            minCount = 0;
            hourCount++;
        }
    }, 10);
}

function PauseTimer() {
    clearInterval(timerId);
    lapButton.style.backgroundColor = "#7c76a31a"
    resetButton.style.backgroundColor = "#7c76a35e"
    lapButton.style.color = "rgba(255, 255, 255, 0.32)"
    resetButton.style.color = "white"
}

startStopButton.addEventListener("click", ()=> {
    if (stateRunning) {
        stateRunning = !stateRunning;
        PauseTimer();
        startStopButton.textContent = "Start"
    }else{
        stateRunning = !stateRunning;
        StartTimer();
        startStopButton.textContent = "Pause"
    }
});

function update() {
    var td = document.createElement("td");
    td.innerHTML = laprecord[laprecord.length - 1];

    if(laprecord.length >= 2){
        if (!(laprecord[laprecord.length - 1] === laprecord[laprecord.length - 2])){
            lapList.appendChild(td);
        }
    }
}

lapButton.addEventListener("click",()=> {
    if (hourCount != 0 || minCount != 0 || secCount != 0 || msecCount != 0) {
        hourCountStr = hourCount.toString().padStart(2, '0');
        minCountStr = minCount.toString().padStart(2, '0');
        secCountStr = secCount.toString().padStart(2, '0');
        // console.log(secCountStr);
        msecCountStr = msecCount.toString().padStart(2, '0');

        let data = hourCountStr + ":" + minCountStr + ":" + secCountStr + ":" + msecCountStr;
        laprecord.push(data);
        update();
    }
});

resetButton.addEventListener("click", ()=> {
    
    PauseTimer()
    resetButton.style.backgroundColor = "#7c76a31a"
    resetButton.style.color = "rgba(255, 255, 255, 0.32)"
    startStopButton.textContent = "Start";
    lapList.innerHTML = [];

    msecCount = 0;
    secCount = 0;
    minCount = 0;
    hourCount = 0;

    msecValue.innerHTML = msecCount.toString().padStart(2, '00');
    secValue.innerHTML = secCount.toString().padStart(2, '00');
    minValue.innerHTML = minCount.toString().padStart(2, '00');
    hourValue.innerHTML = hourCount.toString().padStart(2, '00');
});


