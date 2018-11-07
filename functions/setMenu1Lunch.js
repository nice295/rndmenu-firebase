const cheerio = require('cheerio');
const request = require('request');
const admin = require('firebase-admin');

const utils = require('./utils');

// var serviceAccount =
// require("./rndmenu-firebase-adminsdk-39wi2-2f5c89e874.json");
// admin.initializeApp({     credential: admin.credential.cert(serviceAccount),
//    databaseURL: "https://rndmenu-v2.firebaseio.com" });

function setMenu1Lunch(date) {
    request
        .post({
            url: `http://mydish.welstory.com/todaymenu.do?restaurantCode=REST000048&toDay=${date}&mealType=2`,
            encoding: 'utf-8'
        }, function (error, response, html) {
            if (error) {
                console.error("error" + error);
                throw error
            }

            var postsRef = admin
                .database()
                .ref(`menu/${date}/lunch1`);
            postsRef.set(null);

            var $ = cheerio.load(html);

            var memuArray = new Array();
            var imageArray = new Array();

            $('li').each(function () {
                var menu = $(this)
                    .find('.thumbnail_tit strong')
                    .text();
                var imgUrl = $(this)
                    .find('.box_imgcont img')
                    .attr('src');

                if (menu && imgUrl) {

                    menu = menu
                        .replace(/\s+/g, '')
                        .replace('(선택식)', '')
                        .replace('[선택식]', '')
                        .replace(/\[.*\]/gi, '')
                        .replace(/\(.*\)/gi, '')
                        .replace(/\//g, ',')
                        .replace(/,/g, ', ');

                    postsRef
                        .push()
                        .set({menu: menu, image: imgUrl});

                    utils
                        .recommendedMenus
                        .forEach(function (item, index, array) {
                            if (menu.includes(item) > 0) {

                                memuArray.push(menu);
                                imageArray.push(imgUrl);
                            }
                        });
                }
            });

             if (memuArray.length > 0) {
                var index = utils.getRandomInt(memuArray.length);

                postsRef
                    .child('recommendation')
                    .set({menu: memuArray[index], image: imageArray[index]});

            } else {
                postsRef
                    .child('recommendation')
                    .set({menu: "먹을 게 없네 그려.", image: "http://placekitten.com/g/300/200"});
            }
        });
}

module.exports = setMenu1Lunch;