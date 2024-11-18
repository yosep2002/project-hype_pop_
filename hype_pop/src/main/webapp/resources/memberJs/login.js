// 각종 아이디
const searchIdBtn = document.getElementById('searchId');
const customAlert = document.getElementById('customAlert');
const sendEmailBtn = document.getElementById('sendEmailBtn');

document.getElementById('redirect').value = document.referrer;
console.log(document.getElementById('redirect').value);

//로그인 처리 (storage에 저장)


// 로그페이지 아이디 찾기 버튼 클릭
searchIdBtn.addEventListener('click', function() {
   const searchIdModal = document.getElementById('searchIdModal');
   // 아이디 찾기 모달 창 오픈
   searchIdModal.style.display = 'block';
});


// 이메일 전송 버튼 클릭
sendEmailBtn.addEventListener('click', function() {
   const userEmail = document.getElementById('userEmail').value;
   const userName = document.getElementById('userName').value;

   console.log('sendEmail....');

   // 이메일 체크 비동기(post)
   fetch('/member/api/checkEmail', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userEmail: userEmail, userName: userName })
   })
   .then(response => response.text())
   .then(data => {
      if (data === 'exists') {
    	  customAlert.style.display = 'block';
  		
  			setTimeout(function(){
  			customAlert.style.display = 'none';
  		}, 2000);
         console.log(userEmail);

         // 이메일 전송 비동기
         return fetch('/member/api/sendMail/' + userEmail)
            .then(response => response.text())
            .then(result => {
               if (result === 'ok') {
            		
                  console.log(userEmail);
               } else {
                  alert('이메일 전송에 실패했습니다. 다시 시도해주세요');
               }
            });
      } else {
         alert('등록되지 않은 이메일입니다.');
      }
   })
   .catch(err => console.log(err));
});


function verifyEmailCode(){
	const inputCode = document.getElementById('verifyCodeInput').value;
	
	fetch('/member/api/verifyCode?code=' + inputCode)
	.then(response => response.text())
	.then(data => {
		if (data === 'ok') {
			alert('인증 성공!');
			customAlertId.style.display = 'block';
			setTimeout(function(){
				customAlertId.style.display = 'none';
			}, 2000);
			
		}else{
			alert('인증 코드가 잘못되었습니다.')
		}
	})
	.catch(err => console.log(err));
	
	}


document.getElementById('checkMyId').addEventListener('click', function() {
	

	const userName = document.getElementById('userName').value;
	 const userEmail = document.getElementById('userEmail').value;

	
	  location.href = "/member/checkMyId/" + userName + "/" + userEmail;
});





const searchPwBtn = document.getElementById('searchPwBtn');
//비밀번호 찾기 버튼 클릭
searchPwBtn.addEventListener('click', function() {
	const searchPwModal = document.getElementById('searchPwModal');
	// 비밀번호 찾기 모달 창 오픈
	searchPwModal.style.display = 'block';
});


document.getElementById('confirmId').addEventListener('click', function() {
	const userId = document.getElementById('userIdSearchPw').value;
	
	 if (!userId) {
	        alert("User ID를 입력해주세요.");
	        return; // userId가 비어있으면 함수 종료
	    }
	
	
    fetch(`/member/api/confirmId?userId=${userId}`, {
        method: 'GET',
    })
    .then(response => {
        console.log('Response:', response); // 서버 응답 확인
        return response.text();
    })
    .then(text => {
        console.log('Response Text:', text); // 변환된 데이터 확인
        alert(text); // 서버에서 받은 메시지를 알림으로 표시
    })
    .catch(err => {
        console.error('에러:', err);
        alert('오류가 발생했습니다.');
    });
});




//비밀번호 찾기 이메일 전송 버튼 클릭
document.getElementById('sendEmailBtnPw').addEventListener('click', function() {
   const userEmail = document.getElementById('userEmailPw').value;
   const userId= document.getElementById('userIdSearchPw').value;
   
   console.log('userEmail:', userEmail);
   console.log('userId:', userId);
   
   console.log('sendEmail....');
   // 이메일 체크 비동기(post)
   fetch('/member/api/checkEmailSeachPw', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userEmail: userEmail, userId: userId })
   })
   .then(response => response.text())
   .then(data => {
      if (data === 'exists') {
    	  customAlert.style.display = 'block';
  		
  			setTimeout(function(){
  			customAlert.style.display = 'none';
  		}, 2000);
         console.log(userEmail);

         // 이메일 전송 비동기
         return fetch('/member/api/sendMail/' + userEmail)
            .then(response => response.text())
            .then(result => {
               if (result === 'ok') {
            		
                  console.log(userEmail);
                  alert('이메일 전송이 완료되었습니다.');
               } else {
                  alert('이메일 전송에 실패했습니다. 다시 시도해주세요');
               }
            });
      } else {
         alert('등록되지 않은 이메일입니다.');
      }
   })
   .catch(err => console.log(err));
});

//인증 코드 확인 (비밀번호 찾기)
function verifyEmailCodePw() {
    const inputCode = document.getElementById('verifyCodeInputPw').value;

    fetch('/member/api/verifyCode?code=' + inputCode)
    .then(response => response.text())
    .then(data => {
        if (data === 'ok') {
            alert('인증 성공!');
            location.href='/member/pwChange';
        } else {
            alert('인증 코드가 잘못되었습니다.');
        }
    })
    .catch(err => console.log(err));
}

//비밀번호 변경
function submitPwChange() {
    const f = document.getElementById('passwordChangeForm');
    const oldPw = f.oldPw.value;
    const newPw = f.newPw.value;
    const checkNewPw = f.checkNewPw.value;

    // 비밀번호 유효성 검사
    if (!oldPw) {
        alert("비밀번호를 입력하세요");
        return false; // 실패
    } else if (!newPw) {
        alert("새 비밀번호를 입력하세요");
        return false; // 실패
    } else if (checkNewPw !== newPw) {
        alert("비밀번호가 일치하지 않습니다.");
        return false; // 실패
    }
    return true; // 성공
}

document.getElementById('passwordChangeForm').onsubmit = submitPwChange;






