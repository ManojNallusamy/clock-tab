let hourAndMinuteElement = document.querySelector("#hour-minute");
let secondsElement = document.querySelector("#seconds");
let dateMonthElement = document.querySelector("#date-month");
let dateWeekElement = document.querySelector("#date-week");
let sessionElement = document.querySelector("#session");
let monthMapper = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let dayMapper = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let format = 0
let session =''
if(chrome && chrome.storage){
    chrome.storage.sync.get(['mode','format'], (data)=>{
        modeElement = document.querySelector("#mode")
        if(data.mode == 'normal'){
            modeElement.checked = true;
            body = document.querySelector('body');
            body.classList.add('normal');
            body.classList.remove('dark');
            secondsElement.classList.add('seconds-normal')
            secondsElement.classList.remove('seconds-dark');
        }
        if(data.format == '12'){
            format = 1
            document.querySelector("#toggle-12").checked = true;
            sessionElement.style.visibility = "visible";
        }
    });
}
function setTimeAndDate(){
    let currentTime = new Date()
    let hours
    if(currentTime.getHours()<12){
        session='AM';
    }
    else{
        session='PM'
    } 
    if(format){
        hours = currentTime.getHours() % 12 || 12;
    }
    else{
        hours = currentTime.getHours()
    }
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()
    let date = currentTime.getDate()
    let month = monthMapper[currentTime.getMonth()]
    let week = dayMapper[currentTime.getDay()]
    let hoursPrefix, minutesPrefix, secondsPrefix
    hoursPrefix=minutesPrefix=secondsPrefix=''
    if(hours<10){
        hoursPrefix='0'
    }
    if(minutes<10){
        minutesPrefix='0'
    }
    if(seconds<10){
        secondsPrefix='0'
    }
    dateMonthElement.innerHTML = date + ' ' + month;
    dateWeekElement.innerHTML = week
    hourAndMinuteElement.innerHTML = hoursPrefix + hours + ':' + minutesPrefix + minutes;
    secondsElement.innerHTML = ':' + secondsPrefix + seconds;
    sessionElement.innerHTML = session;
}
setTimeAndDate()
setInterval(setTimeAndDate,1000);
function changeMode(){
    console.log("mode format")
    body = document.querySelector('body');
    if(this.checked){
        body.classList.add('normal');
        body.classList.remove('dark');
        secondsElement.classList.add('seconds-normal')
        secondsElement.classList.remove('seconds-dark');
    }
    else{
        body.classList.add('dark');
        body.classList.remove('normal');
        secondsElement.classList.add('seconds-dark')
        secondsElement.classList.remove('seconds-normal');
    }
    if(chrome && chrome.storage){
        chrome.storage.sync.get('mode', (data)=>{
            if(this.checked){
                data.mode = 'normal';
            }
            else{
                data.mode = 'dark';
            }
            chrome.storage.sync.set({"mode":data.mode})
        });   
    }
}
function showSession(){
    if (!format){
        sessionElement.style.visibility = "hidden";
    }
    else{
        sessionElement.style.visibility = "visible";
    }
}
showSession()
function changeFormat(){
    console.log("changed")
    format = !format 
    if(chrome && chrome.storage){
        if(format){
            chrome.storage.sync.set({'format':'12'})}
        else{
            chrome.storage.sync.set({'format':'24'})
        }
    }
    showSession()  
}
document.querySelector("#mode").addEventListener('change',changeMode)
document.querySelector("#toggle-12").addEventListener('change', changeFormat)
document.querySelector("#toggle-24").addEventListener('change', changeFormat)