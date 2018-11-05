const botService = {};

const cache = require('memory-cache');
const ua = require('universal-analytics');
const admin = require('firebase-admin');

const message = require('./messages');
const todayMenu = require('./todayMenu');
const tomorrowMenu = require('./tomorrowMenu');
const recommendedMenu1Lunch = require('./recommendedMenu1Lunch');
const recommendedMenu2Lunch = require('./recommendedMenu2Lunch');
const recommendedMenu2Dinner = require('./recommendedMenu2Dinner');
const setMenu1Lunch = require('./setMenu1Lunch');
const apiai = require('./apiai');
const utils = require('./utils');

var visitor = ua('UA-51117181-7');
var STR_NO_FOOD = "오늘은 식당 운영을 하지 않습니다.";

botService.choseMenu = (req, content, callback) => {
    visitor.event("message", content, req.body.user_key, 0).send();
    console.log(`User(${req.body.user_key}) is asking ${content}.`);

    switch (content) {
        case "🎁뭐먹지":

            if (cache.get("set-datebase")) {
                //console.log("set-datebase> aleady done");
            } else {
                console.log("set-datebase> set first");
                setMenu1Lunch(utils.formatDate());
                cache.put("set-datebase", "OK", 6 * 60 * 60 * 1000);
            }

            if (utils.getTime() == 'morning') {
                //console.log("cache " + cache.get(content));

                if (cache.get(content) == "1") {
                    recommendedMenu2Lunch(utils.formatDate(), function (data) {
                        callback(null, data);
                        cache.put(content, "2", 60 * 1000);
                        //console.log("1");
                    });
                } else {
                    recommendedMenu1Lunch(utils.formatDate(), function (data) {
                        callback(null, data);
                        cache.put(content, "1", 60 * 1000);
                        //console.log("2");
                    });
                }
            } else if (utils.getTime() == 'afternoon') {
                recommendedMenu2Dinner(utils.formatDate(), function (data) {
                    callback(null, data);
                });
            } else {
                callback(null, message.baseType("밤에는 그냥 집에서 치킨 시켜 드세요.(하하)"));
            }

            break;

        case "1식당-점심":
        if (utils.getDay() == 'Sunday' || utils.getDay() == 'Saturday') {
                callback(null, message.baseType(STR_NO_FOOD));
            } else {
                if (cache.get(content)) {
                    console.log("Data from cache " + content)
                    callback(null, message.baseType(cache.get(content)));
                } else {
                    todayMenu(content, function (data) {
                        callback(null, message.baseType(data));
                        cache.put(content, data, 6 * 60 * 60 * 1000);
                    });
                }
            }
            break;

        case "2식당-아침":
            if (utils.getDay() == 'Sunday' || utils.getDay() == 'Saturday') {
                callback(null, message.baseType(STR_NO_FOOD));
            } else {
                if (cache.get(content)) {
                    console.log("Data from cache " + content)
                    callback(null, message.baseType(cache.get(content)));
                } else {
                    todayMenu(content, function (data) {
                        callback(null, message.baseType(data));
                        cache.put(content, data, 6 * 60 * 60 * 1000);
                    });
                }
            }
            break;

        case "2식당-점심":
            if (utils.getDay() == 'Sunday') {
                callback(null, message.baseType(STR_NO_FOOD));
            } else {
                if (cache.get(content)) {
                    console.log("Data from cache " + content)
                    callback(null, message.baseType(cache.get(content)));
                } else {
                    todayMenu(content, function (data) {
                        callback(null, message.baseType(data));
                        cache.put(content, data, 6 * 60 * 60 * 1000);
                    });
                }
            }
            break;

        case "2식당-저녁":
        if (utils.getDay() == 'Sunday' || utils.getDay() == 'Saturday') {
                callback(null, message.baseType(STR_NO_FOOD));
            } else {
                if (cache.get(content)) {
                    console.log("Data from cache " + content)
                    callback(null, message.baseType(cache.get(content)));
                } else {
                    todayMenu(content, function (data) {
                        callback(null, message.baseType(data));
                        cache.put(content, data, 6 * 60 * 60 * 1000);
                    });
                }
            }
            break;

        case "내일 메뉴":
            if (cache.get(content)) {
                console.log("Data from cache " + content)
                callback(null, message.baseType(cache.get(content)));
            } else {
                tomorrowMenu(function (data) {
                    callback(null, message.baseType(data));
                    cache.put(content, data, 6 * 60 * 60 * 1000);
                });
            }
            break;

        case "🤖빅스비에게 물어보기":
            callback(null, message.baseTypeText("🤖 메뉴를 저에게 물어보세요.\n더 이상 대화를 원하지 않으시면 '끝'이라고 말해 주세요."));
            break;

        case "끝":
        case ".":
            callback(null, message.baseType("다음에 또 봐요. 🤖"));
            break;

        default:
            apiai(content, function (data) {
                // callback(null, message.baseTypeText(data));
                callback(null, data);
            });
            break;
    }

    //   var now = new time.Date();
    //   now.setTimezone("Asia/Seoul");
    //   var timeValue = now.toString()

    //   console.log("user_key: " + req.body.user_key);
    //   console.log("timeValue: " + timeValue);

    //   firebase.database().ref('kakao/users/' + req.body.user_key + '/action/' + content + "/" + timeValue).set({
    //     time : timeValue
    //   });

    //   firebase.database().ref('kakao/users/' + req.body.user_key + '/time/' + timeValue).set({
    //     action : content
    //   });
};

module.exports = botService;