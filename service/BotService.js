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


Bot.choseMenu = (req, content, callback) => {  
  
  switch (content) {
    case message.buttons[0]: //1식당-점심
      callback(null, message.baseType('준비중입니다.'));
      break;
    case message.buttons[1]: //2식당-점심
      callback(null, message.baseType('준비중입니다.'));
      break;
    case message.buttons[2]: //기능추가요청
      callback(null, message.messageButtonType('버그 및 추가기능 요청', '링크를 클릭해서 등록해주세요.', 'https://github.com/cheese10yun/Node-Boot/issues'));
      break;
    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};

module.exports = Bot;