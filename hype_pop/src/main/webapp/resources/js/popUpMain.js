// 헤더 스팬 클릭 이벤트
document.querySelectorAll('.popUpHeader span').forEach(a => {
  a.addEventListener('click', (event) => {
    event.preventDefault(); 
    
    let headerClick = a.id;
    let searchVal = document.querySelector("#popUpSearchBox").value; // ID 수정
    let sendSearchData = `searchData=${encodeURIComponent(searchVal)}`; // 한국어로 검색할 가능성이 높아서 인코딩 처리를 따로 해 줘야 함

    console.log(sendSearchData);
    
    if (headerClick === "hamburgerBTN") {
      // 햄버거 버튼 클릭 시 메뉴 토글
      console.log("햄버거 버튼");
      const menuItems = document.querySelectorAll("ul li"); // li들 불러오고
      menuItems.forEach(function(item) {
        item.classList.toggle("show"); //토글로 껐다 켰다 할수있게 만들기
      });
      
    } else if (headerClick === "searchBTN") {
      location.href = `/hypePop/search?${sendSearchData}`; // 검색 버튼 클릭 시 이동

    } else if (headerClick === "notice") {
      console.log("알림 아이콘");
    }else if (headerClick === "mainLogo") {
		location.href = "/"
	}
  });
});
