const cheerio = require('cheerio');
const request = require('request');
const Iconv1 = require('iconv').Iconv

var returnString = "";

function getTomorrowMenu(callback) {
    request({
            url: 'http://www.welstory.com/menu/seoulrnd/menu.jsp?meal_type=2&course=AA&dtFlag=2',
            encoding: 'binary'
        },
        function (error, response, html) {
            if (error) {
                console.error("error" + error);
                throw error
            };

            var strContents = new Buffer(html, 'binary')
            iconv = new Iconv1('euc-kr', 'UTF8')
            strContents = iconv.convert(strContents).toString()

            var $ = cheerio.load(strContents);

            //var myMap = new Map(restaurantMap);

            var date = $('.date', '#layer2').text();
            returnString = "내일 메뉴 - " + date;

            returnString += "\n\n< 1식당(AB타워) - 점심> (하하)";

            $('.cafeB_tit', '#layer2').each(function () {
                //var restaurant = myMap.get($(this).find('span.cafeB_restaurant').find('img').attr('src'));
                var restaurant = $(this).find('span.img_orange').text();
                if (restaurant) {
                    var description = $(this).parent().find('.cafeB_txt').text();
                    var menuTitle = $(this).text().trim();

                    menuTitle = menuTitle
                        .replace(restaurant, '')
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');
                    description = description
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');

                    //console.log('restaurant : ' + restaurant);
                    //console.log('menuTitle : ' + menuTitle);
                    //console.log('description : ' + description);

                    // returnString += "\n" + menuTitle + " (" + restaurant + ")";
                    returnString += "\n" + menuTitle;
                } else {
                    console.log("*** No restaurant: " + $(this).find('span.cafeB_restaurant').find('img').attr('src'));
                }
            });

            //console.log("점심- Cafeteria 2");
            returnString += "\n\n< 2식당(D타워) - 아침> (굿)";
            $('.cafeA_tit', '#layer1').each(function () {
                //var restaurant = myMap.get($(this).find('span.cafeA_restaurant').find('img').attr('src'));
                var restaurant = $(this).find('span.img_green').text();
                if (restaurant) {
                    var description = $(this).parent().find('.cafeB_txt').text();
                    var menuTitle = $(this).text().trim();

                    menuTitle = menuTitle
                        .replace(restaurant, '')
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');
                    description = description
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');

                    //console.log('restaurant : ' + restaurant);
                    //console.log('menuTitle : ' + menuTitle);
                    //console.log('description : ' + description);

                    // returnString += "\n" + menuTitle + " (" + restaurant + ")";
                    returnString += "\n" + menuTitle;
                } else {
                    console.log("*** No restaurant: " + $(this).find('span.cafeA_restaurant').find('img').attr('src'));
                }
            });

            //callback(returnString);

            //console.log("점심- Cafeteria 2");
            returnString += "\n\n< 2식당(D타워) - 점심> (아잉)";
            $('.cafeA_tit', '#layer2').each(function () {
                //var restaurant = myMap.get($(this).find('span.cafeA_restaurant').find('img').attr('src'));
                var restaurant = $(this).find('span.img_green').text();
                if (restaurant) {
                    var menuTitle = $(this).text().trim();
                    var description = $(this).parent().find('.cafeA_txt').text();
                    //menuTitle = menuTitle.replace(/\s+/g, '').replace('[','(').replace(']',')').replace('/',',');
                    //description = description.replace(/\s+/g, '').replace(' ', '').replace('[','(').replace(']',')').replace('/',',');
                    var nm = "(선택식)닭가슴살망고샐러드(계육:국내산)";

                    menuTitle = menuTitle
                        .replace(restaurant, '')
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');
                    description = description
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');

                    //console.log('restaurant : ' + restaurant);
                    //console.log('menuTitle : ' + menuTitle);
                    //console.log('description : ' + description);

                    // returnString += "\n" + menuTitle + " (" + restaurant + ")";
                    returnString += "\n" + menuTitle;
                } else {
                    console.log("*** No restaurant: " + $(this).find('span.cafeA_restaurant').find('img').attr('src'));
                }
            });

            //callback(returnString);

            //console.log("점심- Cafeteria 2");
            returnString += "\n\n< 2식당(D타워) - 저녁> (감동)";
            $('.cafeA_tit', '#layer3').each(function () {
                //var restaurant = myMap.get($(this).find('span.cafeA_restaurant').find('img').attr('src'));
                var restaurant = $(this).find('span.img_green').text();
                if (restaurant) {
                    var menuTitle = $(this).text().trim();
                    var description = $(this).parent().find('.cafeA_txt').text();
                    //menuTitle = menuTitle.replace(/\s+/g, '').replace('[','(').replace(']',')').replace('/',',');
                    //description = description.replace(/\s+/g, '').replace(' ', '').replace('[','(').replace(']',')').replace('/',',');
                    var nm = "(선택식)닭가슴살망고샐러드(계육:국내산)";

                    menuTitle = menuTitle
                        .replace(restaurant, '')
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');
                    description = description
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');

                    //console.log('restaurant : ' + restaurant);
                    //console.log('menuTitle : ' + menuTitle);
                    //console.log('description : ' + description);

                    // returnString += "\n" + menuTitle + " (" + restaurant + ")";
                    returnString += "\n" + menuTitle;
                } else {
                    console.log("*** No restaurant: " + $(this).find('span.cafeA_restaurant').find('img').attr('src'));
                }
            });

            returnString += "\n\n내일 먹을 음식을 미리 준비하는 당신은 멋집니다. 건강을 위한 운동도 잊지마세요. 🤖"
            callback(returnString);
        });
}

module.exports = getTomorrowMenu;