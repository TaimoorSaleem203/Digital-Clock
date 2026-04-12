const clock = document.querySelector(".clock")
const timer = document.querySelector(".timer")

const timerBtn = document.querySelector(".timerbtn")
const clockBtn = document.querySelector(".clockbtn")
const stopBtn = document.querySelector(".stopbtn")

let formattedTimer; let currentTime; let isRunning = false; let intervalID = null
let count = 0; let min = 0; let sec = 0; let hr = 0;

let mode = "clock"

function updateWatch() {
    count++

    if (count == 100) {
        sec++
        count = 0
    }

    if (sec == 60) {
        min++
        sec = 0
    }

    if (min == 60) {
        hr++
        min = 0
        sec = 0
    }

    const fhr = hr < 10 ? `0${hr}` : hr
    const fmin = min < 10 ? `0${min}` : min
    const fsec = sec < 10 ? `0${sec}` : sec
    const fcount = count < 10 ? `0${count}` : count

    clock.textContent = `${fhr}:${fmin}:${fsec}:${fcount}`
}

function updateTimer() {

    const startBtn = document.querySelector(".startBtn")

    if (formattedTimer <= 0) {
        clearInterval(intervalID)
        isRunning = false
        clock.textContent = `00:00:00`
        startBtn.disabled = false
        return
    }

    let hr = Math.floor(formattedTimer / 3600) // 3675 / 3600 = 1
    let min = Math.floor((formattedTimer % 3600) / 60) // ((3675 % 3600) / 60) = 75 / 60 = 1.02 = 1
    let sec = formattedTimer % 60 // (3675 % 60) = 15

    const fhr = hr < 10 ? `0${hr}` : hr
    const fmin = min < 10 ? `0${min}` : min
    const fsec = sec < 10 ? `0${sec}` : sec

    clock.textContent = `${fhr}:${fmin}:${fsec}`
    formattedTimer--
}

function updateClock() {
    let time = new Date()
    let hour = time.getHours()
    let mins = time.getMinutes()
    let sec = time.getSeconds()
    let am_pm = "AM"

    if (hour >= 12) {
        if (hour > 12) {
            hour -= 12
        }
        am_pm = "PM"
    } else if (hour == 0) {
        hour = 12
    }

    hour = hour < 10 ? "0" + hour : hour
    mins = mins < 10 ? "0" + mins : mins
    sec = sec < 10 ? "0" + sec : sec

    clock.textContent = `${hour}:${mins}:${sec} ${am_pm}`
}

function handleTimerClick(e) {

    mode = "timer"
    const input = timer.querySelector(".timer-input")
    if (e.target.classList.contains("startBtn")) {

        let value = isRunning ? formattedTimer : input.value
        if (value <= 0 || !value || isNaN(value)) return

        formattedTimer = value
        input.value = ""
        isRunning = true

        clearInterval(intervalID)
        intervalID = setInterval(updateTimer, 1000)

        e.target.disabled = true
    }

    else if (e.target.classList.contains("stopBtn")) {
        clearInterval(intervalID)
        timer.querySelector(".startBtn").disabled = false
    }

    else if (e.target.classList.contains("resetBtn")) {
        clearInterval(intervalID)
        isRunning = false
        timer.querySelector(".startBtn").disabled = false

        formattedTimer = 0
        clock.textContent = "00:00:00"
    }
}

function handleStopClick(e) {
    const target = e.target

    if (target.classList.contains("startBtn")) {
        intervalID = setInterval(updateWatch, 10)
        timer.querySelector(".startBtn").disabled = true
    }

    else if (target.classList.contains("stopBtn")) {
        clearInterval(intervalID)
        timer.querySelector(".startBtn").disabled = false
    }

    else if (target.classList.contains("resetBtn")) {
        clearInterval(intervalID)
        count = 0; min = 0; sec = 0; hr = 0
        clock.textContent = "00:00:00:00"
        timer.querySelector(".startBtn").disabled = false
    }
}

timer.addEventListener("click", (e) => {
    e.preventDefault()
    if (mode == "timer") handleTimerClick(e)
    else if (mode == "stop") handleStopClick(e)
})

timerBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mode = "timer"
    clearInterval(intervalID)

    clock.textContent = "00:00:00"
    timer.innerHTML =
        `
            <input type="number" class='timer-input' placeholder="Input Seconds (1hr = 3600s)"/>
            <div class="btn-container">
                <button class='startBtn'>Start</button>
                <button class='stopBtn'>Stop</button>
                <button class='resetBtn'>Reset</button>
            </div>
                `
})


clockBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mode = "clock"
    clearInterval(intervalID)

    timer.innerHTML = ""
    updateClock()
    intervalID = setInterval(updateClock, 1000)
})


stopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    mode = "stop"
    clearInterval(intervalID)

    clock.textContent = "00:00:00:00"
    count = 0; min = 0; sec = 0; hr = 0

    timer.innerHTML =
        `
        <button class='startBtn'>Start</button>
        <button class='stopBtn'>Stop</button>
        <button class='resetBtn'>Reset</button>
    `
})

updateClock()
intervalID = setInterval(updateClock, 1000)