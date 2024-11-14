// 관심사 선택 버튼 클릭 시 모달창 열기
document.getElementById('selInterests').addEventListener('click', function() {
    const modal = document.getElementById('interestModal');
    modal.style.display = 'block'; // 모달창 열기
    
    // 모달창 위치를 관심사 선택 버튼 아래로 조정
    const selInterestsBtn = document.getElementById('selInterests');
    modal.style.top = selInterestsBtn.offsetTop + selInterestsBtn.offsetHeight + 'px';
    modal.style.left = selInterestsBtn.offsetLeft + 'px';
});

// X 버튼 클릭 시 모달창 닫기
document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('interestModal').style.display = 'none'; // 모달창 닫기
});

// 선택 완료 버튼 클릭 시 선택된 관심사 확인 및 처리
document.getElementById('confirmSelection').addEventListener('click', function() {
    const checkedInterests = document.querySelectorAll('#interestList input[type="checkbox"]:checked');
    
    if (checkedInterests.length > 3) {
        alert('최대 3개의 관심사만 선택할 수 있습니다.');
    } else {
        let selectedInterests = [];
        checkedInterests.forEach(interest => {
            selectedInterests.push(interest.value);
        });
        console.log('선택한 관심사:', selectedInterests);
        document.getElementById('interestModal').style.display = 'none'; // 선택 완료 후 모달창 닫기
    }
});

// 정렬 기준 클릭 이벤트
document.querySelectorAll('.searchConditions span').forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();

        let sortBy = option.id; // 클릭한 요소의 ID를 가져와줍니다

        console.log(`정렬 기준: ${sortBy}`);
        
        if (sortBy === "arrayByDis") {
            console.log("거리순 정렬");
            // 컨트롤러를 타고 가서 데이터를 정렬하게 되겠죠?
        } else if (sortBy === "arrayByLike") {
            console.log("좋아요순 정렬");
        } else if (sortBy === "arrayByLatest") {
            console.log("최신순 정렬");
        } else if (sortBy === "arrayByRating") {
            console.log("별점 순 정렬");
        } else if (sortBy === "selInterests") {
            // 관심사 선택 모달창 열기
            document.getElementById('selInterests').click();
        }
    });
});


document.querySelectorAll('#popUpName').forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();

        let popUpStoreName = option.textContent; // 텍스트 가져오기

        console.log(popUpStoreName);

        // GET 방식으로 보내줍니다
        location.href = `/hypePop/popUpDetails?storeName=${encodeURIComponent(popUpStoreName)}`;
    });
});


