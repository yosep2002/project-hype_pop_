document.addEventListener("DOMContentLoaded", function() {
	const userNoElement = document.getElementById("userNo");
	const userIdElement = document.getElementById("userId");
	const userNo = userNoElement ? userNoElement.value : null;
	const userId = userIdElement ? userIdElement.value : null;
	console.log(userNo);
	console.log(userId);
	
	function performSearch() {
		const searchText = document.getElementById('goodsSearchBox').value;
		localStorage.setItem('searchText', searchText);
		location.href = `/goodsStore/goodsSearch`;
	}
	
	document.getElementById('goodsSearchBox').addEventListener('keyup', function(event) {
	    if (event.key === 'Enter') {
	        performSearch();
	    }
	});
	
	
	if(localStorage.getItem('searchText') === '' || localStorage.getItem('searchText') === null) {
	    const searchText = document.getElementById('goodsSearchBox');
	    searchText.placeholder = '검색어 입력';
	} else {
	    const savedSearchText = localStorage.getItem('searchText');
	    const searchText = document.getElementById('goodsSearchBox');
	    searchText.value = savedSearchText;
	}
	
	document.getElementById("searchBtn").addEventListener('click', function() {
	    performSearch();
	});
	
	window.showLogos = function() {
	    const logoContainer = document.getElementById("logoContainer");
	    const overlay = document.getElementById("overlay");
	
	    // 슬라이드 메뉴 및 오버레이 표시
	    logoContainer.classList.toggle("show");
	    overlay.classList.toggle("show");
	
	    // 오버레이 클릭 시 메뉴 숨기기
	    overlay.onclick = function() {
	        logoContainer.classList.remove("show");
	        overlay.classList.remove("show");
	    }
	};
	document.getElementById("goodsLogo").addEventListener('click', function() {
	    if (userNo) {
	        location.href = `/goodsStore/goodsMain?userNo=${userNo}`;
	    } else {
	        location.href = "/goodsStore/goodsMain";
	    }
	});
});