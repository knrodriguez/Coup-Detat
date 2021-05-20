const rooms = require('./index');
const ALPHANUMERAL_END = 122, 
    ALPHANUMERAL_START = 48,
    INVALID_CHARS = [';',':','<','=','>','?','@','[','\\',']','^','_','`'];

function createString (len) {
    let string = '';
    for(let i = 0; i < len; i++){
        string += rng()
    }
    return string;
}

function rng(start = ALPHANUMERAL_START, end = ALPHANUMERAL_END){
    const randomNum = Math.floor(Math.random() * (end - start) + start);
    const randomChar = String.fromCharCode(randomNum)
    return INVALID_CHARS.includes(randomChar) ? rng() : randomChar;
  }
  
function createUrl(){
    return createString(16);
}
  
function createGameCode(){
    const code = createString(6);
    return rooms[code] ? createGameCode() : code;
}

module.exports = {
    createUrl,
    createGameCode
}
  