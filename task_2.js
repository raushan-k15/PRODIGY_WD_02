let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.querySelector('.laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    isRunning = false;
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);

    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    const milliseconds = String(time.getMilliseconds()).padStart(3, '0').slice(0, 2);

    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (!isRunning) return;
    const lapTime = display.textContent;
    const lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
}
