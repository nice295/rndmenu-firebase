let message = {};

message.buttons = [
    '🎁뭐먹지',
    '1식당-점심',
    '2식당-아침',
    '2식당-점심',
    "2식당-저녁",
    "내일 메뉴",
    "🤖빅스비에게 물어보기"
];

message.morebuttons = ['ℹ️자세히 보기',
    '🔙'
];

message.buttonsType = () => {
    return {
        type: 'buttons',
        buttons: message.buttons
    }
};

message.baseType = (text) => {
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

message.baseTypeWithButtons = (text, buttons) => {
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'buttons',
            buttons: buttons
        }
    }
};

message.baseTypeText = (text) => {
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'text',
        }
    }
};

message.photoType = (text, url_photo, label, url_button) => {
    return {
        message: {
            text: text,
            photo: {
                url: url_photo,
                width: 640,
                height: 480
            },
            message_button: {
                label: label,
                url: url_button,
            }
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

message.photoOnlyType = (text, url_photo) => {
    return {
        message: {
            text: text,
            photo: {
                url: url_photo,
                height: 200,
                width: 300
            }
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

message.messageButtonType = (text, label, url_button) => {
    return {
        message: {
            text: text,
            message_button: {
                label: label,
                url: url_button,
            }
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

module.exports = message;