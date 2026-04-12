const clock = document.querySelector(".clock")
const timer = document.querySelector(".timer")
const timerBtn = document.querySelector(".timerbtn")
const stopBtn = document.querySelector(".stopbtn")

let intervalID; let formattedTimer; let isRunning = false;

timerBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    clearInterval(intervalID)

    if(timerBtn.textContent == "Timer"){
        clock.textContent = "00:00:00"
        timerBtn.textContent = "Clock"

        timer.innerHTML = 
        `<input class="timer-input" />
         <button class="startBtn">Start</button>
         <button class="stopBtn">Stop</button>
         <button class="resetBtn">Reset</button>
        `

        const input = timer.querySelector(".timer-input")
        const startBtn = timer.querySelector(".startBtn")
        const stopBtn = timer.querySelector(".stopBtn")
        const resetBtn = timer.querySelector(".resetBtn")
        
        startBtn.addEventListener("click",()=>{
            let value;
            
            if(isRunning) value = formattedTimer
            else{
                if(input.value=="" || isNaN(input.value)) return
                value = input.value
            }

            formattedTimer = value
            intervalID = setInterval(updateTimer,1000)
            isRunning = true;
            

            startBtn.disabled = true
        })

        stopBtn.addEventListener("click",()=>{
            clearInterval(intervalID)
            startBtn.disabled = false
        })

        resetBtn.addEventListener("click",()=>{
            clearInterval(intervalID)
            clock.textContent = "00:00:00";
            isRunning = false

            startBtn.disabled = false
        })

        
    }else if(timerBtn.textContent == "Clock"){
        timerBtn.textContent = "Timer"
        timer.innerHTML = ""

        intervalID = setInterval(updateClock,1000)
    }
    
})

function updateClock(){
    const time = new Date()
    let hrs = time.getHours()
    let mins = time.getMinutes()
    let sec = time.getSeconds()
    let am_pm = "AM"
    
    if(hrs >= 12){
        if(hrs > 12){
            hrs -= 12
        }
        am_pm = "PM"
    }else if(hrs == 0){
        hrs = 12
    }

    hrs = hrs < 10 ? `0` + hrs : hrs
    mins = mins < 10 ? `0` + mins : mins
    sec = sec < 10 ? `0` + sec : sec

    clock.textContent = `${hrs}:${mins}:${sec} ${am_pm}`
}

function updateTimer(){
    
    if(formattedTimer <= 0){
        clearInterval(intervalID)
        isRunning = false
        return
    }

    clock.textContent = formattedTimer < 10 ? `00:00:0${formattedTimer}` : `00:00:${formattedTimer}`
    formattedTimer --
}

updateClock()
intervalID = setInterval(updateClock,1000)