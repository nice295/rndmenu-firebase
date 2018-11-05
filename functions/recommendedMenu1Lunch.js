const cheerio = require('cheerio');
const request = require('request');
const cache = require('memory-cache');

const message = require('./messages');
const utils = require('./utils');

function recommendedMenu1Lunch(date, callback) {
    if (cache.get(date)) {
        console.log("Data from cache, " + date);
        var html = cache.get(date);

        var $ = cheerio.load(html);
        var returnString = "";

        // console.log("1식당 점심 추천 메뉴");
        // returnString = "점심 추천 메뉴<br>";
        // returnString += "1식당(AB타워)<br>";

        var memuArray = new Array();
        var imageArray = new Array();

        $('li').each(function () {
            var menu = $(this).find('.thumbnail_tit strong').text();
            // if (menu) {
            //     console.log(`menu: ${menu}`);
            //     returnString += menu + '<br>';                  
            // }

            var imgUrl = $(this).find('.box_imgcont img').attr('src');
            // if (imgUrl) {
            //     console.log(`Image url: ${imgUrl}`);
            //     returnString += `<img src='${imgUrl}'><br><br>`; 
            // }

            if (menu && imgUrl) {
                utils.recommendedMenus.forEach(function (item, index, array) {
                    if (menu.includes(item) > 0) {
                        // console.log(menu);

                        memuArray.push(menu);
                        imageArray.push(imgUrl);
                    }
                });
            }
        });

        // console.log("length: " + map.size);

        if (memuArray.length > 0) {
            var index = utils.getRandomInt(memuArray.length);
            // console.log("Random # is " + index);
            // console.log(memuArray[index]);
            // console.log(imageArray[index]);

            returnString += `<img src='${imageArray[index]}'><br><br>`;
            returnString += memuArray[index] + '<br>';
            memuArray[index] = memuArray[index].replace(/\s+/g, '')
                .replace('(선택식)', '')
                .replace('[선택식]', '')
                .replace(/\[.*\]/gi, '')
                .replace(/\(.*\)/gi, '')
                .replace(/\//g, ',')
                .replace(/,/g, ', ');

            var indexInfo = utils.getRandomInt(utils.info.length);
            var infoMessage = utils.info[indexInfo];

            // callback(returnString);
            returnString = `(하하)빅스비 추천 메뉴 나갑니다.\n마음에 드셨으면 좋겠습니다.\n\n1식당(AB타워) 점심\n- ${memuArray[index]}\n\n💌${infoMessage}`;
            console.log(returnString);
            callback(message.photoOnlyType(returnString, imageArray[index]));
        } else {
            callback(message.baseType("오늘은 맛있는 게 없네요.(민망)"));
        }

    } else {
        request.post(
            {
                url: `http://mydish.welstory.com/todaymenu.do?restaurantCode=REST000048&toDay=${date}&mealType=2`,
                encoding: 'utf-8'
            },
            function (error, response, html) {
                if (error) {
                    console.error("error" + error);
                    throw error
                }
                
                cache.put(date, html, 1 * 60 * 60 * 1000);

                var $ = cheerio.load(html);
                // var returnString = "";

                // console.log("1식당 점심 추천 메뉴");
                // returnString = "점심 추천 메뉴<br>";
                // returnString += "1식당(AB타워)<br>";

                var memuArray = new Array();
                var imageArray = new Array();

                $('li').each(function () {
                    var menu = $(this).find('.thumbnail_tit strong').text();
                    // if (menu) {
                    //     console.log(`menu: ${menu}`);
                    //     returnString += menu + '<br>';                  
                    // }

                    var imgUrl = $(this).find('.box_imgcont img').attr('src');
                    // if (imgUrl) {
                    //     console.log(`Image url: ${imgUrl}`);
                    //     returnString += `<img src='${imgUrl}'><br><br>`; 
                    // }

                    if (menu && imgUrl) {
                        utils.recommendedMenus.forEach(function (item, index, array) {
                            if (menu.includes(item) > 0) {
                                // console.log(menu);

                                memuArray.push(menu);
                                imageArray.push(imgUrl);
                            }
                        });
                    }
                });

                // console.log("length: " + map.size);

                if (memuArray.length > 0) {
                    var index = utils.getRandomInt(memuArray.length);
                    // console.log("Random # is " + index);
                    // console.log(memuArray[index]);
                    // console.log(imageArray[index]);

                    returnString += `<img src='${imageArray[index]}'><br><br>`;
                    returnString += memuArray[index] + '<br>';
                    memuArray[index] = memuArray[index].replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');

                    var indexInfo = utils.getRandomInt(utils.info.length);
                    var infoMessage = utils.info[indexInfo];

                    // callback(returnString);
                    returnString = `(하하)빅스비 추천 메뉴 나갑니다.\n마음에 드셨으면 좋겠습니다.\n\n1식당(AB타워) 점심\n- ${memuArray[index]}\n\n💌${infoMessage}`;
                    console.log(returnString);
                    callback(message.photoOnlyType(returnString, imageArray[index]));
                } else {
                    callback(message.baseType("오늘은 맛있는 게 없네요.(민망)"));
                }
            }
        );
    }
}

module.exports = recommendedMenu1Lunch;
