'use strict';

let userAgent = window.navigator.userAgent;
const osObj = select('.os');
const languageObj = select('.language');
const browserObj = select('.browser');
const widthObj = select('.width');
const heightObj = select('.height');
const orientationObj = select('.orientation');
const levelObj = select('.level');
const statusObj = select('.status');
const connectionColorObj = select('.connection-color');
const connectionStatusObj = select('.connection-status');

levelObj.innerText = "not available";
statusObj.innerText = "not available";

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function getOS() {
    let platform = window.navigator.platform;
    let os = "Unknown OS";

    if (platform.indexOf('Win') !== -1) {
        os = "Windows";
    } else if (platform.indexOf('Mac') !== -1) {
        os = "MacOS";
    } else if (platform.indexOf('X11') !== -1) {
        os = "UNIX";
    } else if (platform.indexOf('Linux') !== -1) {
        os = "Linux";
    } else if (/Android/.test(userAgent)) {
        os = "Android";
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
        os = "iOS";
    }

    console.log("os: ", os);
    osObj.innerText = os;
}

function getLanguage() {
    languageObj.innerText = navigator.language || navigator.userLanguage;
}

function getBrowser() {
    let browser = "Unknown Browser";
    if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) browser = "Chrome";
    else if (/Firefox/.test(userAgent)) browser = "Firefox";
    else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = "Safari";
    else if (/MSIE|Trident/.test(userAgent)) browser = "Internet Explorer";
    else if (/Edg/.test(userAgent)) browser = "Edge";
    console.log("userAgent", userAgent);
    browserObj.innerText = browser;
}

function getWidth() {
    widthObj.innerText = `${window.innerWidth}px`;
}

function getHeight() {
    heightObj.innerText = `${window.innerHeight}px`;
}

function getOrientation() {
    orientationObj.innerText = window.matchMedia("(orientation: portrait)").matches ? "Portrait" : "Landscape";
}

function toggleConnection(isOnline) {
    connectionStatusObj.innerText = isOnline ? "ON LINE" : "OFF LINE";
    connectionColorObj.style.backgroundColor = isOnline ? "#04b931" : "#333045";
}

if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        levelObj.innerText = `${(battery.level * 100).toFixed(1)}%`;
        statusObj.innerText = battery.charging ? "charging" : "charged";
    });
}

listen('load', window, () => {
    getOS();
    getLanguage();
    getBrowser();

    getWidth();
    getHeight();
    getOrientation();

    toggleConnection(navigator.onLine);
});

listen('resize', window, () => {
    getWidth();
    getHeight();
    getOrientation();
});

listen('online', window, () => {
    toggleConnection(true);
});

listen('offline', window, () => {
    toggleConnection(false);
});

