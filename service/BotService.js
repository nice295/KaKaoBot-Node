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
//const getTomorrowMenu = require('../service/getMenu');
const getApiai = require('../service/getApiai');
const cache = require('memory-cache');

Bot.choseMenu = (req, content, callback) => {

  switch (content) {
    case "🏠 1식당-점심":
    case "점심":
    case "1식당":
    case "1":
      getMenu(12, function (data) {
        callback(null, message.baseType(data));
      });
      break;

    case "2식당-아침":
    case "아침":
      getMenu(21, function (data) {
        callback(null, message.baseType(data));
      });
      break;

    case "2식당-점심":
    case "2식당":
    case "2":
      getMenu(22, function (data) {
        callback(null, message.baseType(data));
      });
      break;

    case "2식당-저녁":
    case "저녁":
      getMenu(23, function (data) {
        callback(null, message.baseType(data));
      });
      break;

    case "내일 뭐먹지?":
    case "내일":
      /*
      getTomorrowMenu(function (data) {
        callback(null, message.baseType(data));
      });
      */
      /*
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
      */
      callback(null, message.baseType("알려드리고 싶지만 나중에... (아잉)"));
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
};

module.exports = Bot;