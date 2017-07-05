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
    case message.buttons[0]: //1식당-아침
      //callback(null, message.baseType(getMenu(12, callback)));
      getMenu(11, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case message.buttons[1]: //1식당-점심
       getMenu(12, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case message.buttons[2]: //1식당-저녁
       getMenu(13, function(data) {
        callback(null, message.baseType(data));
      });
      break;

    case message.buttons[3]: //2식당-아침
       getMenu(21, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case message.buttons[4]: //2식당-점심
       getMenu(22, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case message.buttons[5]: //2식당-저녁
       getMenu(23, function(data) {
        callback(null, message.baseType(data));
      });
      break;

    case message.buttons[6]: //문의하기
      callback(null, message.baseType("우측에 있는 1:1 채팅을 통해 문의하시면 빠르게 대응하겠습니다."));
      break;

    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};

module.exports = Bot;