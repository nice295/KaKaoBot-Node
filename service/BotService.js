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
    case "1식당-점심":
       getMenu(12, function(data) {
        callback(null, message.baseType(data));
      });
      break;

    case "2식당-아침":

       getMenu(21, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case "2식당-점심":
       getMenu(22, function(data) {
        callback(null, message.baseType(data));
      });
      break;
    case "2식당-저녁":
       getMenu(23, function(data) {
        callback(null, message.baseType(data));
      });
      break;

    case "내일 뭐먹지?":
      callback(null, message.baseType("알려드리고 싶지만 나중에 ㅠ.ㅠ"));
      break;

    case "문의하기":
      callback(null, message.baseType("오른쪽 1:1 채팅을 통해 문의하시면 빠르게 대응하겠습니다."));
      break;

    default:
      callback(null, message.baseType('어이쿠~'));
      break;
  }
};

module.exports = Bot;