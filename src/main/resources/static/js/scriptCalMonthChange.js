window.onload= function() { buildCalendar(); }

let nowMonth= new Date();
let today= new Date();
today.setHours(0,0,0,0);

function buildCalendar(){
    let firstDate= new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDate= new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1, 0)

    let tbodyCal= document.querySelector(".cal > tbody");
    document.getElementById("calYear").innerText= nowMonth.getFullYear();
    document.getElementById("calMonth").innerText= leftPad(nowMonth.getMonth()+1);

    while(tbodyCal.rows.length>0){
        tbodyCal.deleteRow(tbodyCal.rows.length - 1);
    }

    let nowRow= tbodyCal.insertRow();

    for(let i=0; i<firstDate.getDay(); i++){
        let nowCol= nowRow.insertCell();
    }

    for(let nowDay=firstDate; nowDay<=lastDate; nowDay.setDate(nowDay.getDate()+1)){
        let nowCol= nowRow.insertCell();

        let newDiv= document.createElement("span");
        newDiv.innerHTML= leftPad(nowDay.getDate());
        nowCol.appendChild(newDiv);
        if(nowDay.getDay()==0){
            newDiv.classList.add('sunday')
        }
        if(nowDay.getDay()==6){
            newDiv.classList.add('saturday');
            nowRow= tbodyCal.insertRow();
        }
        if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDiv.className= "today";
            newDiv.onclick= function(){
                choiceDate(this);
            }
        }
        else {
            newDiv.className = "otherDay";
            newDiv.onclick = function () { choiceDate(this); }
        }
    }

    let printMsg = "<h3>" + "NO DATE SELECTED" + "</h3>";
    document.getElementById('divCalendarInfo').innerHTML = printMsg;
}

function leftPad(n){
    if (n<10){
        n= "0"+n;
        return n;
    }
    return n;
}

function choiceDate(newDiv) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }
    newDiv.classList.add("choiceDay");

    let printYear = document.getElementById("calYear").innerText
    printYear = "<h3>" + printYear + "</h3>";
    document.getElementById('divCalendarInfo').innerHTML = printYear;
    let printDate = document.getElementById("calMonth").innerText + " . " +newDiv.innerHTML
    printDate = "<h2>" + printDate + "</h2>";
    document.getElementById('divCalendarInfo').innerHTML += printDate;
}

function calPrev(){
    nowMonth= new Date(nowMonth.getFullYear(), nowMonth.getMonth()-1,nowMonth.getDate())
    buildCalendar();
}

function calNext(){
    nowMonth= new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1,nowMonth.getDate())
    buildCalendar();
}