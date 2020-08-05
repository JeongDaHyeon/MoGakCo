// 모듈을 사용하는 파일을 다시 모듈로 만들 수 있음
// 모듈을 불러옴
const {odd, even} = require('./var');

function checkOddOrEven(num) {
    if (num % 2) { // if num is odd number
        return odd;
    }
    return even;
}
// module.exports에 함수를 대입
module.exports = checkOddOrEven; // 함수나 변수 대입 가능
