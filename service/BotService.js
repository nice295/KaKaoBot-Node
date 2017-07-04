/**
 * Created by cheese on 2017. 2. 9..
 */

const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  message = require('../service/message'),
  Bot={};

const getMenu = require('../service/getMenu');

Bot.choseMenu = (req, content, callback) => {  
  
  switch (content) {
    case message.buttons[0]: //1식당-점심
      //callback(null, message.baseType(getMenu(12, callback)));
      getMenu(12, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case message.buttons[1]: //2식당-점심
       getMenu(22, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case message.buttons[2]: //뭐먹지
      callback(null, message.baseType("무엇을 먹는 것보다 누구와 먹는 게 더 중요합니다. :)\n (이 기능은 준비중입니다.)"));
      break;
    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};

module.exports = Bot;