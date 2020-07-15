## 2.1.5 비구조화 할당
객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있게 해줌.
``` javascript
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function() {
        this.status.count--;
        return this.status.count;
    }
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```
=> 객체의 속성을 같은 이름의 변수에 대입하는 코드  
  
위의 코드는 아래와 같이 변환할 수 있다.
``` javascript
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    }
};
const { getCandy, status: { count } } = candyMachine;
```
candyMachine 객체 안의 속성을 찾아서 변수와 매칭해줌.  
  
#### 배열의 비구조화
``` javascript 
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];
```
위의 코드를 아래와 같이 바꿀 수 있다.
``` javascript
const array = ['node.js', {}, 10, true];
const [node, obj, , bool] = array;
```
**위치에 유의해야 한다.** 
코드의 줄 수를 줄여주므로 유용. 노드는 모듈을 사용하으로 이러한 방식을 자주 사용.

## 2.1.6 프로미스
  
* Javascript와 Node에서 주로 비동기 프로그래밍을 함
* 이벤트 주도 방식 때문에 콜백 함수를 자주 사용
  
**ES2015부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스(promise) 기반으로 재구성됨**
=> 콜백 헬(callback hell)을 극복  

/* callback hell?  
=> 콜백 함수가 연속될 때 발생. 가독성이 안 좋아지고 유지보수가 어려움.  

``` javascript
const condition - true;
// 프로미스 객체슬 생성
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  }
  else {
    reject('실패');
  }
});

promise
  .then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
  })
  .catch((error) => {
    console.error(error); // 실패(reject)한 경우 실행
  });
```
1. new Promise로 프로미스를 생성
2. 생성한 프로미스 안에 resolve와 reject를 매개변수로 가지는 콜백 함수 생성
3. 생성한 promise 변수에 then, catch 메서드 생성. resolve가 호출되면 then이 실행, reject가 호출되면 catch가 실행.
  
``` javascript
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })
  .catch((error) => {
    console.error(error);
  });
```
위와 같이 프로미스를 작성할 수 있다.
  
``` javascript
// 콜백 함수가 세 번 중첩되는 함수
function findAndSaveUser(Users) {
    Users.findOne({}, (err,user) => { // 첫 번째 콜백
        if(err) {
            return console.error(err);
        }
        user.name = 'zero';
        user.save((err) => { // 두 번째 출력
            if(err) {
                return console.error(err);
            }
            Users.findOne({ gender: 'm' }, (err, user) => { // 세 번째 출력
            });
        });
    });
}
```
위의 코드를 아래와 같이 바꿔 적을 수 있다.
``` javascript
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return usesave();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {

        })
        .catch(err => {
            console.log(err)
        });
}
```
- 코드가 더 깊지 않다
- then 메서드를 순차적으로 실행한다
- 콜백에서 따로 처리한 에러들을 catch에서 한 번에 처리
- 메서드가 프로미스 방식을 지원해야만 가능하다
  
#### 여러개의 프로미스를 한번에 실행하는 방법?
Promise.all을 사용
``` javascript
const promise1 = Promise.resolve('성공1'); // 즉시 resolve 하는 프로미스 (Promise.reject: 즉시 reject하는 프로미스)
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2]) // 모두 resolve 될 때까지 기다렸다가 then으로 넘어감
    .then((result) => {
        console.log([result]);
    })
    .catch((error) => { // 프로미스 중 하나라도 reject 되면 실행
        console.error(error);
    });
```
  
## 2.1.7 async/await
프로미스를 사용한 코드를 한 번 더 깔끔하게 줄여준다.
``` javascript
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return usesave();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {

        })
        .catch(err => {
            console.log(err)
        });
}
```
위의 코드는 2.1.6의 프로미스 코드이다. 이 코드를 아래와 같이 바꿀 수 있다.
``` javascript
// async function이 추가
async function findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.name = 'zero';
    // await: 해당 프로미스가 resolve 될 때까지 기다림.
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
}
```
위의 코드에는 에러를 처리하는 부분이 없으므로 아래와 같이 코드를 추가하였다.
``` javascript
async function findAndSaveUser(Users) {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
    } catch (error) {
        console.error(error);
    }
}
```
화살표 함수도 아래처럼 async를 사용할 수 있다.
``` javascript
const findAndSaveUser = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
    } catch (error) {
        console.error(error);
    }
};
```
ES2018 문법 노드 10 버전부터)에서는 아래와 같이 for문과 async/await를 같이 사용하여 Promise.all을 대체할 수 있다. 
``` javascript
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
    // Promise.all 대신 for await of 사용
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();
```
