let options = {
    timeZone: 'America/New_York',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
},
formatter = new Intl.DateTimeFormat([], options);

function reload() {
    footerTimeUpdate();
    resizeTitle();
    remouse();
}

function resizeTitle() {
    let titleFontSize = window.innerWidth / 4 - 20;
    if (titleFontSize > 250) {
        titleFontSize = 250;
    }
    document.getElementById("movingTitle").style.fontSize = titleFontSize + "px";
    document.getElementById("movingTitle2").style.fontSize = titleFontSize - 40 + "px";
}

function coordinate(event) {
    let x = event.clientX;
    let y = event.clientY;
        document.getElementById("movingTitle").style.left = "calc(0.075 * (" + x + "px - 50%) + 50%)";
        document.getElementById("movingTitle").style.top = "calc(0.075 * (" + y + "px - 50%) + 50%)";
        document.getElementById("movingTitle2").style.left = "calc(-0.075 * (" + x + "px - 50%) + 50%)";
        document.getElementById("movingTitle2").style.top = "calc(-0.075 * (" + y + "px - 50%) + 50%)";
}

function remouse() {
    setTimeout(() => {
        document.getElementById("movingTitle").style.transition = "none";
        document.getElementById("movingTitle2").style.transition = "none";
    }, 50);   
}

function recenter() {
    document.getElementById("movingTitle").style.transition = "cubic-bezier(0,.57,1,.71) 50ms";
    document.getElementById("movingTitle").style.left = "50%";
    document.getElementById("movingTitle").style.top = "45%";
    document.getElementById("movingTitle2").style.transition = "cubic-bezier(0,.57,1,.71) 50ms";
    document.getElementById("movingTitle2").style.left = "50%";
    document.getElementById("movingTitle2").style.top = "55%";
}

function hyenaDo(action) {
    if (action == "awake") {
        document.getElementById("hyena").src = "awake.png";
    } else if (action == "asleep") {
        document.getElementById("hyena").src = "asleep.png"
    }
}

function footerTimeUpdate() {
    let rightNow = Date.now();
    let unformatted = formatter.format(rightNow);
    let timeOfDay = parseInt(unformatted.slice(0, 2)) % 24;
    let footerTime = "<b>" + unformatted + "</b>. ";
    if (timeOfDay >= 0 && timeOfDay < 7) {
        footerTime += "I'm sleeping. Zzzzz...";
    } else if (timeOfDay >= 7 && timeOfDay < 8) {
        footerTime += "Yawwnnn! Available soon!";
    } else if (timeOfDay >= 8 && timeOfDay < 21){
        footerTime += "Come in, we're OPEN!";
    } else {
        footerTime += "Closing for the night!";
    }
    document.getElementById("timezone").innerHTML = footerTime;

    let timeUntilNextMin = 60000 - (rightNow % 60000);
    console.log(timeUntilNextMin);
    setTimeout(() => {
        footerTimeUpdate();
    }, timeUntilNextMin);
}
