/**
 * Created by cheese on 2017. 2. 9..
 */

const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  //RedisDAO = require('../service/RedisDAO'),
  message = require('../service/message'),
  Bot={};

getMenu = (cafeNum, time) => {
  return cafenum + "메뉴 (" + time + ")\n" +
  "싱푸-자장면\n";
};

Bot.choseMenu = (req, content, callback) => {  
  
  switch (content) {
    case message.buttons[0]: //1식당-점심
      callback(null, message.baseType(getMenu("1식당", "점심")));
      break;
    case message.buttons[1]: //2식당-점심
      callback(null, message.baseType('준비중입니다.'));
      break;
    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};

module.exports = Bot;