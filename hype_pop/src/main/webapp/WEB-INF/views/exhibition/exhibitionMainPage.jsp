<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Exhibition Banners</title>
<style>
/* 기존 스타일 유지 */
/* banner-container의 스타일 */
.banner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  overflow: hidden;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 0 auto;
  width: 650px;
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* 버튼 컨테이너를 절대 위치로 배치할 수 있도록 설정 */
}
/* 배너를 화면 크기에 맞게 설정 */
/* 배너 컨테이너 */
/* 배너 컨테이너 */
/* 배너 컨테이너 */
.banner {
    width: 100%;              /* 배너의 너비를 100%로 설정 */
    height: 400px;            /* 배너의 높이를 원하는 값으로 설정 (예: 400px) */
    overflow: hidden;         /* 배너 영역을 넘치는 이미지는 숨김 처리 */
    position: relative;       /* 이미지 위치 설정을 위한 상대적 위치 */
}

/* 배너 이미지 */
.banner img {
    width: auto;              /* 이미지 가로 크기는 자동으로 설정 (비율 유지) */
    height: 100%;             /* 이미지 세로 크기를 배너의 높이에 맞게 100%로 설정 */
    display: block;           /* 이미지를 블록 레벨 요소로 설정 */
    margin: 0 auto;           /* 이미지를 수평 중앙 정렬 */
    cursor : pointer;
}

/* button-container의 스타일 */
.button-container {
  position: absolute;
  bottom: 20px; /* 배너의 하단에서 20px만큼 떨어지게 설정 */
  display: flex;
  justify-content: center; /* 버튼들을 가로로 중앙 정렬 */
  gap: 10px; /* 버튼 사이에 간격 추가 */
  width: 100%; /* 버튼 컨테이너가 banner-container의 가로 크기와 맞게 설정 */
}

/* banner-btn의 스타일 */
.banner-btn {
  width: 10px; /* 버튼의 너비 */
  height: 10px; /* 버튼의 높이 */
  background-color: #3498db; /* 버튼 색상 */
  border: none;
  border-radius: 50%; /* 원형 버튼 */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 호버 효과 */
}

/* 호버 시 버튼 색상 변경 */
.banner-btn:hover {
  background-color: #2980b9;
}
.filter {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	overflow: hidden;
	background-color: #f0f0f0;
	padding: 20px;
	margin: 0 auto;
	width: 650px;
	border: 2px solid #ccc;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-bottom: none; /* 하단 보더 제거 */
	margin-bottom: 0; /* 하단 간격 제거 */
}

.exhibition-info-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 350px;
	overflow: hidden;
	background-color: #f0f0f0;
	padding: 20px;
	margin: 0 auto;
	width: 650px;
	border: 2px solid #ccc;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	font-size: 10px;
	margin-top: 0; /* 상단 간격 제거 */
}

.exhibition-schedule {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 580px;
	padding: 15px;
	background-color: #e0e0e0;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
	cursor: pointer;
	height: 80px;
}

.exhibition-context {
	display: none;
	width: 580px;
	align-items: stretch;
	transition: height 0.3s ease;
	display: flex; /* Flexbox 사용 */
	flex-direction: column; /* 수직 방향으로 정렬 */
}

.exhibition-banner-img {
	width: 100%; /* 배너가 전체 너비를 차지하도록 설정 */
	height: 300px; /* 배너 이미지 높이 설정 (조정 가능) */
	background-color: #e0e0e0; /* 배경색 설정 (이미지가 없을 때) */
	background-size: cover; /* 배경 이미지가 요소의 크기에 맞게 조정 */
	background-position: center; /* 배경 이미지의 위치 설정 */
	margin-bottom: 10px; /* 아래 여백 추가 */
}

table {
	width: 100%; /* 테이블 너비를 100%로 설정하여 일관성 유지 */
	border-collapse: collapse;
	height: auto; /* 자동 높이로 설정 */
}

th, td {
	padding: 8px;
	text-align: left;
	border: 1px solid #ccc;
	font-size: 10px;
	/* 크기 고정 설정 */
	min-height: 50px; /* 최소 높이 설정 (조정 가능) */
	max-height: 50px; /* 최대 높이 설정 (조정 가능) */
	overflow: hidden; /* 내용이 넘칠 경우 숨김 */
	text-overflow: ellipsis; /* 텍스트 넘침 시 '...' 표시 */
	white-space: nowrap; /* 텍스트가 한 줄로 표시되도록 설정 */
}

th {
	background-color: #f2f2f2;
}

.exhibition-info {
	width: 100%;
	padding: 10px;
	background-color: #ffffff;
	border: none border-radius: 5px;
	margin-bottom: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	list-style-type: none;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

/* 중앙 정렬 및 스타일 개선 */
#load-more {
	display: block;
	margin: 20px auto; /* 중앙 정렬 */
	background-color: #007BFF; /* 버튼 배경 색상 */
	color: white; /* 글자 색상 */
	border: none; /* 테두리 제거 */
	padding: 10px 20px; /* 패딩 */
	border-radius: 5px; /* 모서리 둥글게 */
	cursor: pointer; /* 커서 모양 */
	font-size: 14px; /* 글자 크기 */
	transition: background-color 0.3s; /* 배경색 변화 효과 */
}

#load-more:hover {
	background-color: #0056b3; /* 마우스 호버 시 배경색 */
}

.filter {
	display: flex;
	justify-content: flex-end; /* `select` 박스를 오른쪽으로 정렬 */
	align-items: center; /* 수직 정렬 */
}

.filter select {
	text-align: center; /* `option` 안의 글자들을 중앙 정렬 */
	text-align-last: center; /* 선택된 항목의 글자를 중앙 정렬 */
}

#search {
	display: flex;
	align-items: center;
	margin-right: 10px; /* filterSelect와 간격을 줌 */
}

#searchExh {
	height: 25px; /* 원하는 높이로 설정 */
	padding: 5px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 4px;
}

#searchBtn {
	width: 30px; /* 이미지의 너비 */
	height: 25px; /* 텍스트 입력의 높이와 동일하게 설정 */
	margin-left: 5px; /* 텍스트 입력과 이미지 간격 */
	cursor: pointer;
}
</style>
</head>
<body>
	<jsp:include page="layout/popUpHeader.jsp" />

	<br>

	<div class="banner-container">
			<div class="banner">
			
			</div>
			<div class="button-container">
				<button class="banner-btn" data-index="0"></button>
				<button class="banner-btn" data-index="1"></button>
				<button class="banner-btn" data-index="2"></button>
				<button class="banner-btn" data-index="3"></button>
				<button class="banner-btn" data-index="4"></button>
				<button class="banner-btn" data-index="5"></button>
				<button class="banner-btn" data-index="6"></button>
				<button class="banner-btn" data-index="7"></button>
			</div>
	</div>

	<br>

	<div class="filter">
		<select id="filterSelect" onchange="applyFilter()">
			<option value="latest">시작일순</option>
			<option value="dueSoon">마감순</option>
			<option value="lowerPrice">낮은가격순</option>
			<option value="higherPrice">높은가격순</option>
			<option value="earlyBird">얼리버드</option>
		</select>
	</div>

	<div class="exhibition-info-container" id="exhibition-list">
		
	</div>

	<button id="load-more" onclick="loadMoreExhibitions()">더보기</button>

	<br>
	<hr>
	<br>

	<jsp:include page="layout/popUpFooter.jsp" />
	<script type="text/javascript" src="/resources/popUpJs/popUpMain.js"></script>
	<script type="text/javascript"
		src="/resources/exhibitionJs/exhibitionMain.js"></script>

</body>
</html>
