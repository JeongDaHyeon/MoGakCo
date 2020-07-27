# 프런트엔드 자바스크립트
- 프런트엔드에 사용되는 기능 정리
- HTML의 script 태그 안에 사용
  
## 2.2.1 AJAX
#### AJAX?
- Asynchronous Javascript And XML
- 비동기적 웹 서비스를 개발하기 위한 기법
- XML 말고 JSON도 사용 가능
- 페이지 이동 없이 서버에 요청을 보내고 응답을 받음

``` javascript
<script>
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { // 요청에 대한 콜백
        if (xhr.readyState === xhr.DONE) { // 요청이 완료되면
            // 200: OK
            // 201: Created
            if (xhr.status === 200 || xhr.status === 201) {  
                console.log(xhr.responseText); // 서버에서 보내주는 값
            } else {
                console.error(shr.responseText);
            }
        }
    }
    xhr.open('GET', 'https://www.zerocho.com/api/get'); // 메서드와 주소 설정
    xhr.send();
</script>
```
onreadystatechange 대신 onload와 onerror로 성공과 실패를 구별해도 된다.  
``` javascript
var xhr = new XMLHttpRequest();
xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
        console.log(xhr.responseText);
    }
};
xhr.onerror = function() {
    console.error(xhr.responseText);
};
xhr.open('GET', 'https://www.zerocho.com/api/get'); // 메서드와 주소 결정
xhr.send(); // 요청 전송
```
위의 코드는 onreadystatechange 대신 onlead와 onerror을 사용한 코드이다.

``` html
<script>
    var xhr = new XMLHttpRequest();
    var data = { // JSON 데이터
        name: 'zerocho',
        birth: 1994,
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState === xhr.DONE) {
            if(xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.responseText);
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('POST', 'https://www.zerocho.com/api/pot/json'); // POST 방식으로
    xhr.setRequestHeader('Content-Type', 'application/json'); // 콘텐츠 타입을 json으로
    xhr.send(JSON.stringify(data)); // 데이터를 동봉해 전송
</script>
```
위의 코드는 서버로 JSON 데이터를 보내는 POST 요청의 경우이다.  
xhr.send 메서드에 데이터를 넣어 보낸다는 점이 차이가 있다. xhr.setRequestHeader 메서드로 서버에 보내는 컨텐츠가 JSON 형식임을 알린다.
