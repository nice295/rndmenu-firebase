const utils = require("./utils");

let message = {};

// message.buttons = [     '🎁뭐먹지',     '1식당-점심',     '2식당-아침',     '2식당-점심',
//  "2식당-저녁",     "내일 메뉴",     "🤖빅스비에게 물어보기" ];

message.buttons = [
  // '🎁뭐먹지',
  "1식당-점심",
  "2식당-아침",
  "2식당-점심",
  "2식당-저녁"
  //   "내일 메뉴"
];

// message.buttonsAfternoon = ["🎁뭐먹지", "2식당-저녁", "내일 메뉴"];

// message.buttonsEvening = ["내일 메뉴"];

// message.morebuttons = ["ℹ️자세히 보기", "🔙"];

message.buttonsType = () => {
  return { type: "buttons", buttons: message.buttons };

//   if (utils.getTime() == "morning") {
//     return { type: "buttons", buttons: message.buttons };
//   } else if (utils.getTime() == "afternoon") {
//     return { type: "buttons", buttons: message.buttonsAfternoon };
//   } else {
//     return { type: "buttons", buttons: message.buttonsEvening };
//   }
};

message.baseType = text => {
  return {
    message: {
      text: text
    },
    keyboard: {
      type: "buttons",
      buttons: message.buttons
    }
  };

//   if (utils.getTime() == "morning") {
//     return {
//       message: {
//         text: text
//       },
//       keyboard: {
//         type: "buttons",
//         buttons: message.buttons
//       }
//     };
//   } else if (utils.getTime() == "afternoon") {
//     return {
//       message: {
//         text: text
//       },
//       keyboard: {
//         type: "buttons",
//         buttons: message.buttonsAfternoon
//       }
//     };
//   } else {
//     return {
//       message: {
//         text: text
//       },
//       keyboard: {
//         type: "buttons",
//         buttons: message.buttonsEvening
//       }
//     };
//   }
};

// message.baseType = (text) => {     return {         message: {
// text: text,         },         keyboard: {             type: 'buttons',
//       buttons: message.buttons         }     } };

message.baseTypeWithButtons = (text, buttons) => {
  return {
    message: {
      text: text
    },
    keyboard: {
      type: "buttons",
      buttons: buttons
    }
  };
};

message.baseTypeText = text => {
  return {
    message: {
      text: text
    },
    keyboard: {
      type: "text"
    }
  };
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
        url: url_button
      }
    },
    keyboard: {
      type: "buttons",
      buttons: message.buttons
    }
  };
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
      type: "buttons",
      buttons: message.buttons
    }
  };

//   if (utils.getTime() == "morning") {
//     return {
//       message: {
//         text: text,
//         photo: {
//           url: url_photo,
//           height: 200,
//           width: 300
//         }
//       },
//       keyboard: {
//         type: "buttons",
//         buttons: message.buttons
//       }
//     };
//   } else if (utils.getTime() == "afternoon") {
//     return {
//       message: {
//         text: text,
//         photo: {
//           url: url_photo,
//           height: 200,
//           width: 300
//         }
//       },
//       keyboard: {
//         type: "buttons",
//         buttons: message.buttonsAfternoon
//       }
//     };
//   } else {
//     return {
//       message: {
//         text: text,
//         photo: {
//           url: url_photo,
//           height: 200,
//           width: 300
//         }
//       },
//       keyboard: {
//         type: "buttons",
//         buttons: message.buttonsEvening
//       }
//     };
//   }
};

message.messageButtonType = (text, label, url_button) => {
  return {
    message: {
      text: text,
      message_button: {
        label: label,
        url: url_button
      }
    },
    keyboard: {
      type: "buttons",
      buttons: message.buttons
    }
  };
};

module.exports = message;
