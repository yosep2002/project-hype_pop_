// 이전 이미지 받아오기
window.onload = function() {
    // 예시로 두 카테고리와 이미지 파일명을 설정
    const category1 = "goodsBanner"; // 굿즈 배너 이미지
    const category2 = "goodsDetail"; // 굿즈 상세 이미지
    
    // 각 요소가 존재하는지 확인한 후 값 가져오기
    const fileName1Element = document.querySelector('input[name="beforeFileName1"]');
    const fileName2Element = document.querySelector('input[name="beforeFileName2"]');
    
    // fileName1Element와 fileName2Element가 존재하는 경우에만 value에 접근
    const fileName1 = fileName1Element ? fileName1Element.value : null;
    const fileName2 = fileName2Element ? fileName2Element.value : null;

    // fileName1과 fileName2가 null이 아닌 경우 fetchImage 호출
    if (fileName1) {
        fetchImage(category1, fileName1, "beforeImg1");
    }
    if (fileName2) {
        fetchImage(category2, fileName2, "beforeImg2");
    }
};

function fetchImage(category, fileName, imgElementId) {
	const encodedFileName = encodeURIComponent(fileName);
    const imageUrl = `/admin/getImages/${encodedFileName}/${category}/`;   

    fetch(imageUrl)
        .then(response => {
            if (response.ok) {
                return response.blob(); // 이미지 파일을 blob 형태로 받음
            } else {
                throw new Error('이미지를 불러오는 데 실패했습니다.');
            }
        })
        .then(blob => {
            const imageObjectURL = URL.createObjectURL(blob);
            document.getElementById(imgElementId).src = imageObjectURL;
        })
        .catch(error => {
            console.error('이미지 로딩 실패:', error);
        });
}


// *** 상품(굿즈) 등록 페이지 영역 ***
// 등록하기 버튼 클릭 시 상품(굿즈) 등록
// psNo 가져오기
document.addEventListener('DOMContentLoaded', function() {
    const storeList = document.getElementById('storeList');
    if (storeList) {
        storeList.addEventListener('change', setStorePsNo);
    }
});

function setStorePsNo() {
    const storeList = document.getElementById("storeList");
    const selectedOption = storeList.options[storeList.selectedIndex];
    console.log('모든 팝업스토어 출력: ', selectedOption); // 선택된 psNo 출력
    const psNo = selectedOption.getAttribute("data-psno"); // data-psno 속성에서 psNo 가져오기
    console.log('선택된 psNo 출력: ', psNo); // 선택된 psNo 출력
    document.querySelector('input[name="psno"]').value = psNo;  // psNo를 readonly input에 설정
}

// 파일 검증
// 이미지인것만 올릴 수 있도록 변경
const regex = new RegExp("(.*?)\\.(jpg|jpeg|png|gif|jfif|avif|webp)$");
const MAX_SIZE = 10485760; 

function checkFile(fileName, fileSize) {
 if (fileSize >= MAX_SIZE) {
     alert("파일 사이즈가 너무 큽니다.");
     return false;
 }
 if (!regex.test(fileName)) {
     alert("잘못된 파일 확장자입니다.");
     return false;
 }
 return true;
}

// 배너 이미지 클릭 시 파일 선택
document.querySelector('#gBannerImg').addEventListener('click', function() {
    document.querySelector('#gBannerImageFile').click(); // 클릭 시 파일 선택 창 열기
});

// 상세 이미지 클릭 시 파일 선택
document.querySelector('#gDetailImg').addEventListener('click', function() {
    document.querySelector('#gDetailImageFile').click(); // 클릭 시 파일 선택 창 열기
});

// 배너 이미지 파일 미리보기 및 검증
document.querySelector('#gBannerImageFile').addEventListener('input', function(event) {
    const files = event.target.files;
    const uploadedBannerImagesDiv = document.getElementById('uploadedBannerImages');
    uploadedBannerImagesDiv.innerHTML = ''; // 기존 이미지 초기화

    // 최대 한 개의 배너 이미지 파일만 선택하도록 제한
    const file = files[0]; // 첫 번째 파일만 선택
    if (file && checkFile(file.name, file.size)) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '150px';
            img.style.marginRight = '10px';
            uploadedBannerImagesDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    // input 값 초기화 (중복 방지)
    event.target.value = '';
});

// 상세 이미지 파일 미리보기 및 검증
document.querySelector('#gDetailImageFile').addEventListener('input', function(event) {
    const files = event.target.files;
    const uploadedBannerImagesDiv = document.getElementById('uploadedDetailImages');
    uploadedBannerImagesDiv.innerHTML = ''; // 기존 이미지 초기화

    // 최대 한 개의 배너 이미지 파일만 선택하도록 제한
    const file = files[0]; // 첫 번째 파일만 선택
    if (file && checkFile(file.name, file.size)) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '150px';
            img.style.marginRight = '10px';
            uploadedBannerImagesDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    // input 값 초기화 (중복 방지)
    event.target.value = '';
});

// 상품(굿즈) 등록 버튼 클릭 이벤트
function goodsRegister() {
	const form = document.forms[0];
	
	// FormData 객체 생성
    const formData = new FormData(form);

    // 예외처리
    // 체크박스
    const checkboxes = form.querySelectorAll('input[type="checkbox"][name^="gcat"]');
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    
    const gBannerImageFile = document.getElementById('gBannerImageFile');
    const gDetailImageFile = document.getElementById('gDetailImageFile');

    
    if (gBannerImageFile.files.length === 0) {
    	alert('상품 배너 이미지를 입력해주세요');
    	return;
    }
    if (gDetailImageFile.files.length === 0) {
    	alert('상품 상세 이미지를 입력해주세요');
    	return;
    }
    if (selectedCategories.length === 0) {
        alert('최소 한 개의 카테고리를 선택해야 합니다.');
        return;
    }
    if (selectedCategories.length > 3) {
        alert('최대 세 개의 카테고리만 선택할 수 있습니다.');
        return;
    }
    if (!form.gname.value) {
        alert('상품 이름을 입력해주세요');
        return;
    }
    if (!form.gprice.value) {
        alert('상품 가격을 입력해주세요');
        return;
    }
    if (!form.sellDate.value) {
        alert('상품 판매 종료일을 입력해주세요');
        return;
    }
    if (!form.gexp.value) {
        alert('설명글을 입력해주세요');
        return;
    }
	    
    // 폼 제출
    form.submit();
}

// **** 상품(굿즈) 수정/삭제 페이지 영역 ****
// 수정하기 버튼 클릭 시 업데이트
// 신규 이미지 선택 시 미리보기
document.getElementById("gBannerImageFile").addEventListener("change", function(event) {
 const file = event.target.files[0];
 if (file) {
     const reader = new FileReader();
     reader.onload = function(e) {
    	 const previewContainer = document.getElementById("uploadedBannerImages");
         previewContainer.innerHTML = ''; // 이전 미리보기 내용 초기화
         const img = document.createElement('img');
         img.src = e.target.result;
         img.width = 400; // 이미지 크기 조정 (필요시)
         img.height = 500; // 이미지 크기 조정 (필요시)
         previewContainer.appendChild(img); // 새로운 이미지 요소 추가
     };
     reader.readAsDataURL(file);
 }
});
document.getElementById("gDetailImageFile").addEventListener("change", function(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById("uploadedDetailImages");
            previewContainer.innerHTML = ''; // 이전 미리보기 내용 초기화
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 400; // 이미지 크기 조정 (필요시)
            img.height = 500; // 이미지 크기 조정 (필요시)
            previewContainer.appendChild(img); // 새로운 이미지 요소 추가
        };
		reader.readAsDataURL(file);
	}
});

function goodsUpdate() {
	const f = document.forms[0];
	
	const formData = new FormData(f);
		
    const gBannerImageFile = document.getElementById('gBannerImageFile');
    const gDetailImageFile = document.getElementById('gDetailImageFile');
    
	// 예외처리
    const checkboxes = f.querySelectorAll('input[type="checkbox"][name^="gcat"]');
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    if (selectedCategories.length === 0) {
        alert('최소 한 개의 카테고리를 선택해야 합니다.');
        return;
    }
    if (selectedCategories.length > 3) {
        alert('최대 세 개의 카테고리만 선택할 수 있습니다.');
        return;
    }
    
    if (gBannerImageFile.files.length === 0) {
        alert('상품 배너 이미지를 입력해주세요');
        return;  // 배너 이미지가 없으면 폼 제출하지 않음
    }
    
    if (gDetailImageFile.files.length === 0) {
        alert('상품 상세 이미지를 입력해주세요');
        return;  // 상세 이미지가 없으면 폼 제출하지 않음
    }
    
    if (f.gname.value == '') {
        alert('상품 이름을 입력해주세요');
        return;
    }
    if (f.gprice.value == '') {
        alert('상품 가격을 입력해주세요');
        return;
    }
    if (f.sellDate.value == '') {
        alert('상품 판매 종료일을 입력해주세요');
        return;
    }
    if (f.gexp.value == '') {
        alert('설명글을 입력해주세요');
        return;
    }
    
    document.getElementById("goodsForm").action = "/admin/gUpdate";  // 수정 요청 경로
    document.getElementById("goodsForm").submit();  // 폼 제출
//    f.submit();
}

// 삭제하기 버튼 클릭 시 업데이트
function goodsDelete() {
	if (confirm("정말 삭제하시겠습니까?")) {
        // 삭제 작업을 위한 폼 액션 설정
        document.getElementById("goodsForm").action = "/admin/gDelete";  // 삭제 요청 경로
        document.getElementById("goodsForm").submit();  // 폼 제출
    }
}

// 취소 및 리스트로 돌아가기 버튼 클릭시 메인페이지로 이동
function backtoGList() {
	window.location.href = "/admin/adminPage";
}