async function getUser() { // 로딩 시 사용자 가져오는 함수
    try {
      const res = await axios.get('/users');  // GET /users 요청
      // res는 JSON객체 data속성이 우리가 원하는 데이터가 저장되어 있음
      const users = res.data;
      //const list = document.getElementById('list');
      const list = document.querySelector('#list');
      // 아이디가 list는 엘리먼트를 찾아 반환
      // list의 값 : <div id="list"></div>
      list.innerHTML = '';  // innerHTML - 엘리먼트의 자식엘리먼트
      // 내용 지움
      // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
      // users - JSON --> KEY:VALUE
      // Array.prototype.map(콜백)
      // Object.keys(users): users객체내에 있는 KEY로 구성된 배열 반환
      Object.keys(users).map(function (key) {  // KEY 갯수만큼 콜백함수 호출됨
        const userDiv = document.createElement('div');  //--> <div></div>
        const span = document.createElement('span');  // --><span></span>
        span.textContent = users[key];  // <span>users[key]의 값</span>
        const edit = document.createElement('button'); // <button></button>
        edit.textContent = '수정';  // <button>수정</button>
        // edit.innerText, edit.innerHTML
        edit.addEventListener(     // <button onclick="콜백내용">수정</button>
        'click', // 이벤트 이름
        async () => { // 수정 버튼 클릭하면 실행할 콜백: 이벤트리스너
          const name = prompt('바꿀 이름을 입력하세요');
          if (!name) {
            return alert('이름을 반드시 입력하셔야 합니다');
          }
          try {
            await axios.put('/user/' + key, { name });  // PUT /user/key
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        const remove = document.createElement('button');  //<button></button>
        remove.textContent = '삭제';  // <button>삭제</button>
        remove.addEventListener('click', async () => { // 삭제 버튼 클릭
          // <button onclick='콜백내용'>삭제</button>
          try {
            await axios.delete('/user/' + key);
            getUser();
          } catch (err) {
            console.error(err);
          }
        });
        userDiv.appendChild(span);// <div><span>users[key]의 값</span></div>
        userDiv.appendChild(edit);  
        // <div><span>users[key]의 값</span><button onclick=''>수정</button></div>
        userDiv.appendChild(remove);
        // <div><span>users[key]의 값</span><button onclick=''>수정</button>
        //  <button onclick=''>삭제</button>  
        //</div>
        list.appendChild(userDiv);
        // <div id="list">
        // <div><span>users[key]의 값</span><button onclick=''>수정</button>
        //  <button onclick=''>삭제</button> 
        //</div>
        console.log(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  window.onload = getUser; // 자바의 main method역할, 화면 로딩 시 getUser 호출
  // 폼 제출(submit) 시 실행
/*    <form id="form">
    <input type="text" id="username">
    <button type="submit">등록</button>
  </form> */  
  // == document.getElementById('form') == document.querySelector('#form')
  //document.getElementById('form').addEventListener('submit', async (e) => {
    document.querySelector('#form').addEventListener('submit', 
    async (e) => {  // e: Event객체
    e.preventDefault();  // submit 디폴트 동작을 막음, 본래 동작을 안하게 함
    const name = e.target.username.value;// input태그의 입력값을 가져오기
    if (!name) {
      return alert('이름을 입력하세요');
    }
    try {
      const res = await axios.post('/user', { name });  // POST /user 요청
      alert(res.data);
      getUser();
    } catch (err) {
      console.error(err);
    }
    e.target.username.value = '';// input태그의 입력값을 지움
  });
  