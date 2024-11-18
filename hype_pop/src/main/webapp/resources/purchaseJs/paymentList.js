document.querySelectorAll('.image-payList').forEach(item => {
    // data-file-name 속성에서 파일 이름을 가져옴
    const fileName = item.getAttribute('data-file-name');
    console.log(fileName);
    const imgElement = item.querySelector('img'); // 각 image-goodsItem 내부의 img 요소를 찾음

    // 이미지 파일이 존재할 경우에만 요청 수행
    if (fileName && imgElement) {
        fetch(`/member/api/goodsBannerImages/${encodeURIComponent(fileName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("이미지를 불러오는 데 실패했습니다.");
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
                imgElement.src = imageUrl; // img 태그의 src로 설정
                imgElement.style.width = "100px"; // 너비 설정
                imgElement.style.height = "100px"; // 높이 설정
            })
            .catch(error => {
                console.error("이미지 불러오기 오류:", error);
            });
    }
});