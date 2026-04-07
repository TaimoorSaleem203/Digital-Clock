const clock = document.querySelector(".clock")
const timer = document.querySelector(".timer")
const timerBtn = document.querySelector(".timerbtn")
const stopBtn = document.querySelector(".stopbtn")

let formattedTimer
let currentTime
let isRunning = false
let intervalID = null

function stopWatch() {
    console.log("click me");

}

function updateTimer() {
    if (formattedTimer <= 0) {
        clearInterval(intervalID)
        isRunning = false
        return
    }

    formattedTimer--
    clock.textContent = formattedTimer < 10 ? `00:00:0${formattedTimer}` : `00:00:${formattedTimer}`
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

    currentTime = `${hour}:${mins}:${sec} ${am_pm}`

    clock.textContent = currentTime
}

timerBtn.addEventListener("click", (e) => {
    e.preventDefault()
    clearInterval(intervalID)

    if (timerBtn.textContent == "Timer") {

        clock.textContent = "00:00:00"
        timerBtn.textContent = "Clock"

        timer.innerHTML =
            `
            <input type="number" class='timer-input' />
            <button class='startBtn'>Start</button>
            <button class='stopBtn'>Stop</button>
            <button class='resetBtn'>Reset</button>
        `
        timer.addEventListener("click", (e) => {
            const input = timer.querySelector(".timer-input")
            if (e.target.classList.contains("startBtn")) {

                let value;
                if (isRunning) value = formattedTimer
                else {
                    value = Number(input.value)
                    if (value <= 0 || !value) return
                }

                clock.textContent = value < 10 ? `00:00:0${value}` : `00:00:${value}`
                formattedTimer = value
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

        })
    }
    else if (timerBtn.textContent == "Clock") {
        updateClock()

        timerBtn.textContent = "Timer"
        timer.innerHTML = ""

        clearInterval(intervalID)
        intervalID = setInterval(updateClock, 1000)
    }
})

stopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    clearInterval(intervalID)
    
    clock.textContent = "00:00:00"
    timer.innerHTML =
        `
            <button class='startBtn'>Start</button>
            <button class='stopBtn'>Stop</button>
            <button class='resetBtn'>Reset</button>
        `
    
    
})

updateClock()
intervalID = setInterval(updateClock, 1000)