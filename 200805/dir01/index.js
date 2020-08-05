// var와 func 모두 참조
// 모듈 하나가 여러 개의 모듈을 사용
const{ odd, even } = require('./var'); // 모듈 하나가 여러 개의 모듈에 사용
const checkNumber = require('./func'); // 모듈로 부터 불러올 때 변수 이름을 다르게 지정할 수 있음

function checkStringOddOrEven(str) {
    if (str.length % 2) { // if the string length is odd
        return odd;
    }
    return even;
}

console.log(checkNumber(10)); // output: 짝수입니다.    
console.log(checkStringOddOrEven('hello')); // output: 홀수입니다.
