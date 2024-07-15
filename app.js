let TIMEoptions = {
    timeZone: 'America/New_York',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
},
formatter = new Intl.DateTimeFormat([], TIMEoptions);

function deblur() {
    document.body.style.filter = "none";
    // timezoneUpdate();
}

let listItems = [...document.querySelectorAll("li")];

let ANIMoptions = {
    rootMargin: "-10%",
    threshold: 0.0
}

let observer = new IntersectionObserver(showItem, ANIMoptions);

function showItem(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            let letters = [...entry.target.querySelectorAll("span")];
            letters.forEach((letter, idx) => {
                setTimeout(() => {
                    letter.classList.add("active");
                }, idx * 20);
            })
            entry.target.children[0].classList.add("active");
        }
    })
}

listItems.forEach(item =>{
    let newString = "";
    let itemText = item.children[0].innerText.split("");
    itemText.map(letter => (newString += `<span>${letter}</span>`))
    item.innerHTML = newString;
    observer.observe(item);
})

function scrolled() {
    let pageHeight = document.body.scrollHeight;
    let windowBottom = window.scrollY + window.innerHeight;
    let footerVisible = (windowBottom - (pageHeight - window.innerHeight)) / window.innerHeight;
    let coverVisible = (window.innerHeight - window.scrollY) / window.innerHeight;
    footerVisible -= 0.5;
    if (footerVisible < 0) {
        footerVisible = 0;
    }
    if (coverVisible < 0) {
        coverVisible = 0;
    }
    let navbarWidth = document.getElementById("navbar").offsetHeight;
    document.getElementById("navbar").style.transform = "translate(" + -2 * footerVisible * navbarWidth + "px, 100vh) rotate(-90deg)";
    let scrollHintHeight = document.getElementById("scrollHint").offsetHeight;
    document.getElementById("scrollHint").style.transform = "translate(0, " + -3 * (coverVisible - 1) * scrollHintHeight + "px)";
}

var standOutDivAnimateAngle = 135;
function standOutDivAnimate() {
    standOutDivAnimateAngle = (standOutDivAnimateAngle + 1) % 360;
    document.getElementById("standOutDiv").style.background = "linear-gradient(" + standOutDivAnimateAngle + "deg , #a7e, #729)";
    setTimeout(() => {
        standOutDivAnimate();
    }, 20);
}

function goToVersion() {
    let versionSelected = document.getElementById("versionSelector")
    let value = versionSelected.options[versionSelected.selectedIndex].value;

    if (value == "v3") {
        window.location.href = "index.html";
    } else if (value == "v2") {
        window.location.href = "versions/v2/index.html";
    } else if (value == "v1") {
        window.location.href = "versions/v1/index.html";
    } 
}



function timezoneUpdate() {
    let now = Date.now();
    let time = formatter.format(now);
    let hour = parseInt(time.slice(0, 2)) % 24;
    let displayTime = "<b>" + time + "</b>";
    // if (hour >= 0 && hour < 7) {
    //     displayTime += "I'm sleeping. Zzzzz...";
    // } else if (hour >= 7 && hour < 8) {
    //     displayTime += "Available soon!";
    // } else if (hour >= 8 && hour < 21){
    //     displayTime += "Come in, we're OPEN!";
    // } else {
    //     displayTime += "Closing for the night!";
    // }
    document.getElementById("localTime").innerHTML = displayTime;

    let timeUntilNextMin = 60000 - (rightNow % 60000);
    console.log(timeUntilNextMin);
    setTimeout(() => {
        timezoneUpdate();
    }, timeUntilNextMin);
}