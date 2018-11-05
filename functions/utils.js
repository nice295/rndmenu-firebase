'use strict';

const moment = require('moment-timezone');

let utils = {};

// utils.formatDate = () => {
//     var d = new Date(),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('');
// };

utils.formatDate = () => {
    var m = moment();
    m.tz("Asia/Seoul").format();

    var g = null; //return g

    var currentDate = m.format("YYYYMMDD");
    console.log("currentDate is " + currentDate);

    return currentDate;
};

utils.getTime = () => {
    var m = moment();
    m.tz("Asia/Seoul").format();

    var g = null; //return g

    var split_afternoon = 12 //24hr time to split the afternoon
    var split_evening = 19 //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));
    console.log("currentHour is " + currentHour);

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "afternoon";
    } else if (currentHour >= split_evening) {
        g = "evening";
    } else {
        g = "morning";
    }

    return g;
};

utils.getDay = () => {
    var m = moment();
    m.tz("Asia/Seoul").format();

    var currentDay = m.format("dddd");
    console.log("currentDay is " + currentDay);

    return currentDay;
};


utils.getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

utils.recommendedMenus = [
    '선택식',
    '자장면',
    '탄탄멘',
    '피자',
    '짬뽕',
    '냉면',
    '오므라이스',
    '잔치국수',
    '잡채덮밥'
];

utils.info = [
    '최준호 님 화이팅!',
    '기대홍 님 멋쟁이~',
    '장광현 님 화이팅♡',
    'UXD2 잘한다!',
    '갤럭시 폰 흥해라!',
    'PS가 기대된다. 홧팅',
    '삼성뮤직 UX 쵝오.'
];

module.exports = utils;