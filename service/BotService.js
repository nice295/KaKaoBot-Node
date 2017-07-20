/**
 * Created by cheese on 2017. 2. 9..
 */

const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  message = require('../service/message'),
  Bot = {};

const getMenu = require('../service/getMenu');
const getTomorrowMenu = require('../service/getTomorrowMenu');
const getApiai = require('../service/getApiai');
const cache = require('memory-cache');
const firebase = require('firebase');
const dateFormat = require('dateformat');
const time = require('time');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyASEMR2PC7ngVtgEQ50TVJJeAYHPTrztW8",
  authDomain: "rndmenu.firebaseapp.com",
  databaseURL: "https://rndmenu.firebaseio.com",
  projectId: "rndmenu",
  storageBucket: "rndmenu.appspot.com",
  messagingSenderId: "430408163918"
};
firebase.initializeApp(config);
var database = firebase.database();

Bot.choseMenu = (req, content, callback) => {

  switch (content) {
    case "🏠 1식당-점심":
    case "점심":
    case "1식당":
    case "1":
      if (cache.get('1-lunch')) {
        console.log(cache.get('1-lunch'));
        callback(null, message.baseType(cache.get('1-lunch')));
      } else {
        console.log("No 1-lunch");
        getMenu(12, function (data) {
          callback(null, message.baseType(data));
          cache.put('1-lunch', data, 1 * 60 * 60 * 1000);
        });
      }
      /*
      getMenu(12, function (data) {
        callback(null, message.baseType(data));
      });
      */
      break;

    case "2식당-아침":
    case "아침":
      if (cache.get('2-breakfast')) {
        console.log(cache.get('2-breakfast'));
        callback(null, message.baseType(cache.get('2-breakfast')));
      } else {
        console.log("No 2-breakfast");
        getMenu(21, function (data) {
          callback(null, message.baseType(data));
          cache.put('2-breakfast', data, 1 * 60 * 60 * 1000);
        });
      }
      /*
      getMenu(21, function (data) {
        callback(null, message.baseType(data));
      });
      */
      break;

    case "2식당-점심":
    case "2식당":
    case "2":
      if (cache.get('2-lunch')) {
        console.log(cache.get('2-lunch'));
        callback(null, message.baseType(cache.get('2-lunch')));
      } else {
        console.log("No 2-lunch");
        getMenu(22, function (data) {
          callback(null, message.baseType(data));
          cache.put('2-lunch', data, 1 * 60 * 60 * 1000);
        });
      }
      /*
      getMenu(22, function (data) {
        callback(null, message.baseType(data));
      });
      */
      break;

    case "2식당-저녁":
    case "저녁":
      if (cache.get('2-dinner')) {
        console.log(cache.get('2-dinner'));
        callback(null, message.baseType(cache.get('2-dinner')));
      } else {
        console.log("No 2-dinner");
        getMenu(23, function (data) {
          callback(null, message.baseType(data));
          cache.put('2-dinner', data, 1 * 60 * 60 * 1000);
        });
      }
      /*
      getMenu(23, function (data) {
        callback(null, message.baseType(data));
      });
      */
      break;

    case "내일 뭐먹지?":
    case "내일":
      if (cache.get('tomorrow-menu')) {
        console.log(cache.get('tomorrow-menu'));
        callback(null, message.baseType(cache.get('tomorrow-menu')));
      } else {
        console.log("No tomorrow-menu");
        getTomorrowMenu(function (data) {
          callback(null, message.baseType(data));
          cache.put('tomorrow-menu', data, 1 * 60 * 60 * 1000);
        });
      }
      //callback(null, message.baseType("알려드리고 싶지만 나중에... (아잉)"));
      break;

    case "문의하기":
      callback(null, message.messageButtonType("아래 링크를 통해 오류와 개선제안을 하실 수 있습니다.", "문의하기", "https://docs.google.com/forms/u/0/d/e/1FAIpQLScxmXXdTB75iutcM5a9LbB-Bz3iRVacRmywu88cNo65_6F4mw/viewform?usp=sf_link"));
      break;

    case "🤖 박스비와 대화하기 (실험실)":
      callback(null, message.baseTypeText("🤖 안녕하세요? 여러분의 친구 박스비(Boxby)예요.\n간단한 대화도 할 수 있답니다.\n더 이상 대화를 원하지 않으시면 [끝]을 쳐 주세요."));
      break;

    case "끝":
    case ".":
      callback(null, message.baseType("다음에 또 봐요. 🤖"));
      break;

    default:
      getApiai(content, function (data) {
        callback(null, message.baseTypeText(data));
      });
      break;     
  }

  var now = new time.Date();
  now.setTimezone("Asia/Seoul");
  var timeValue = dateFormat(now, "yyyymmddHHMMss");

  console.log("user_key: " + req.body.user_key);
  console.log("timeValue: " + timeValue);

  firebase.database().ref('kakao/users/' + req.body.user_key + "/" + timeValue).set({
    action : content
  });
};

module.exports = Bot;