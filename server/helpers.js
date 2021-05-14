const rooms = require('./index');
const ALPHANUMERAL_END = 122, 
    ALPHANUMERAL_START = 48,
    INVALID_CHARS = [';',':','<','=','>','?','@','[','\\',']','^','_','`'];

function createString (len) {
    let string = '';
    for(let i = 0; i < len; i++){
        string += String.fromCharCode(rng())
    }
    return string;
}

function rng(start = ALPHANUMERAL_START, end = ALPHANUMERAL_END){
    let randomNum = Math.floor(Math.random() * (end - start) + start);
    if(INVALID_CHARS.includes(String.fromCharCode(randomNum)))
        return rng();
    return randomNum;
  }
  
function createUrl(){
    return createString(16);
}
  
function createGameCode(){
    const code = createString(4).toUpperCase();
    return rooms[code] ? createGameCode() : code;
}

module.exports = {
    createUrl,
    createGameCode
}
  