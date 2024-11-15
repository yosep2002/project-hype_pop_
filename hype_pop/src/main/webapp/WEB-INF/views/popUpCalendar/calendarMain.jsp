<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=no">
<!-- 확대/축소 방지 -->
<style>
body {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 0;
	overflow-x: hidden; /* 수평 스크롤 방지 */
}

.tab {
	display: flex;
	justify-content: center;
	background-color: #f1f1f1;
	padding: 10px 0;
	border-bottom: 2px solid #ccc;
}

.tab div {
	margin: 0 15px;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 5px;
	transition: background-color 0.3s;
}

.tab div:hover {
	background-color: #ddd;
}

.tab .active {
	background-color: #007bff;
	color: white;
}

.container {
	display: flex;
	justify-content: center;
	margin: 0 40px;
	max-width: 100%; /* 컨테이너 최대 너비 */
}

.content {
	max-width: 90%; /* 너비를 70%로 설정 */
	margin: 20px;
	padding: 20px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	min-width: 300px; /* 최소 너비 설정 */
}

.popUpList {
    position: sticky;
    top: 100px;
    max-width: 40%;
    margin: 20px;
    padding: 20px;
    background-color: lightgreen;
    border-radius: 5px;
    min-width: 500px;
    max-height: 700px;
    overflow-y: auto;
}

.popUpItem {
    display: flex; /* 수평 배치 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: flex-start; /* 좌측 정렬 */
    margin-bottom: 20px; /* 아이템 간 간격 */
    width: 100%; /* 전체 너비 */
}

.itemInfo {
    width: 50%; /* 텍스트 영역은 50% */
}

.itemInfo ul {
    padding-left: 0;
    list-style: none; /* 기본 불릿 제거 */
    margin: 0;
}

.itemInfo ul li {
    font-size: 14px; /* 글자 크기 */
    line-height: 1.6; /* 줄 간격 */
    display: block; /* li 항목을 블록으로 설정 */
    overflow: hidden;
    text-overflow: ellipsis; /* 내용이 길면 '...' 추가 */
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    max-width: 300px; /* li의 최대 너비 제한 */
}

.itemInfo ul li strong {
    color: #333; /* 강조 텍스트 색상 */
    font-weight: bold;
}

.all-list {
	list-style: none;
	padding: 0;
}

.all-list li {
	padding: 10px;
	border-bottom: 1px solid #ccc;
}

.all-list li:last-child {
	border-bottom: none;
}

section {
	display: none;
}

section.active {
	display: block;
}

.calendar-container {
	width: 100%; /* 캘린더 전체 너비 */
	margin: 20px;
	padding: 20px;
}

.calendar-table {
	min-width: 280px; /* 최소 너비 설정 */
	max-width: 100%; /* 최대 너비는 100%로 제한 */
	border-collapse: collapse; /* 경계를 겹치게 설정 */
}

.calendar-table th, .calendar-table td {
	border: 1px solid #ccc;
	text-align: center;
	padding: 5px;
	font-size: 7.5px;
	width: 35px; /* 고정된 너비 설정 */
	height: 35px; /* 고정된 높이 설정 */
	vertical-align: middle; /* 수직 중앙 정렬 */
	box-sizing: border-box; /* 여백을 포함한 크기 계산 */
}

.calendar-table td.monthDate {
	font-size: 12px !important; /* !important로 우선순위 강제 */
	font-weight: bold;
}

.calendar-table td.today {
	background-color: yellow; /* 배경색을 노란색으로 */
	font-weight: bold; /* 글자를 굵게 */
	border: 2px solid red; /* 테두리를 빨간색으로 */
	font-size: 12px;
}

thead th {
	background-color: #f0f0f0;
	font-weight: bold;
}

.psName {
	width: 100px;
	height: 30px;
	max-width: 10ch; /* 최대 글자 수를 10자로 제한 */
	overflow: hidden; /* 넘치는 내용 숨김 */
	text-overflow: ellipsis; /* 줄임표(...) 추가 */
	white-space: nowrap; /* 줄 바꿈 방지 */
}

.schedule {
	width: 25px; /* 고정된 너비 설정 */
	height: 25px; /* 고정된 높이 설정 */
	vertical-align: middle; /* 수직 중앙 정렬 */
}

.schedule-1 {
	width: 25px; /* 고정된 너비 설정 */
	height: 25px;; /* 고정된 높이 설정 */
	background-color: purple;
	background-image: linear-gradient(135deg, transparent 25%, rgba(255, 255, 255, 0.5)
		25%, rgba(255, 255, 255, 0.5) 50%, transparent 50%, transparent 75%,
		rgba(255, 255, 255, 0.5) 75%, rgba(255, 255, 255, 0.5));
	background-size: 10px 10px; /* 슬래시 크기 조절 */
}

.schedule-start {
	background-color: blue; /* 파란색 배경 */
	color: white; /* 글자색 흰색 */
	font-size: auto;
	width: 25px;
	height: 25px;
}

.schedule-end {
	background-color: red; /* 빨간색 배경 */
	color: white; /* 글자색 흰색 */
	font-size: auto;
	width: 25px;
	height: 25px;
}

.checkBoxList {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 100%;
	background-color: #f0f0f0;
	padding: 10px;
}

.checkBoxList div {
	margin: 5px;
	width: 100px; /* 각 체크박스와 레이블이 함께 고정 너비로 설정 */
}

.monthChange {
	display: flex;
	justify-content: center; /* 수평 중앙 정렬 */
	align-items: center; /* 수직 중앙 정렬 (필요시 사용) */
	margin: 20px 0; /* 상하 간격 조절 */
}

.monthChange button {
	padding: 5px 10px; /* 버튼의 크기 조절 */
	font-size: 16px; /* 버튼 글자 크기 */
}

.monthChange span {
	font-size: 18px; /* 현재 월 글자 크기 */
	margin: 0 20px; /* 버튼과 현재 월 사이 간격 */
}

#currentDateMonth {
	margin-left: auto; /* 오른쪽으로 밀기 */
	margin-right: 38px; /* 오른쪽 여백 추가 */
}

.psImage {
    width: 50%; /* 이미지 영역은 50% */
    height: 200px; /* 이미지 높이 */
    background-color: #ccc; /* 이미지 배경색 */
    margin-right: 20px; /* 텍스트와 간격 */
    overflow: hidden; /* 이미지 영역을 벗어나는 부분 숨기기 */
}

.psImage img {
    width: 100%; /* div에 맞게 이미지 크기 조정 */
    height: 100%;
    object-fit: cover; /* 이미지 비율 유지하면서 영역에 맞게 채우기 */
}

.popUpItem span {
	font-size: 17px; /* 글자 크기 조정 */
	line-height: 1.5; /* 줄 간격 조정 */
	display: block; /* 각 항목을 블록으로 만들어 줄 바꿈 */
}

.tooltip {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.7);
	color: #fff;
	padding: 5px;
	border-radius: 5px;
	z-index: 1000;
	white-space: nowrap; /* 툴팁 텍스트가 줄 바꿈되지 않도록 설정 */
	display: none; /* 기본적으로 숨김 */
}

.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover, .close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}

.checkbox-disabled {
	pointer-events: none;
	opacity: 0.5; /* 비활성화된 느낌을 위해 투명도를 낮춤 */
	background-color: #d3d3d3; /* 회색 배경 */
	border-color: #b0b0b0; /* 회색 테두리 */
}

.modal {
	display: none;
	position: fixed;
	z-index: 1000;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
	background-color: #222;
	color: white;
	margin: 15% auto;
	padding: 20px;
	border-radius: 8px;
	width: 300px;
	text-align: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.modal-content p {
	font-size: 18px;
	margin-bottom: 20px;
}

.modal-content button {
	padding: 10px 20px;
	background-color: #e50914;
	color: white;
	border: none;
	cursor: pointer;
	font-size: 16px;
	border-radius: 5px;
	transition: background-color 0.3s;
}

.modal-content button:hover {
	background-color: #c3070a;
}

.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
	cursor: pointer;
}

.close:hover, .close:focus {
	color: #fff;
}
</style>
</head>
<body>
	<jsp:include page="layout/popUpHeader.jsp" />
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal" var="pinfo" />
		<input type="hidden" id="userNo" value="${pinfo.member.userNo}">
	</sec:authorize>
	<br>

	<div class="container">
		<div class="content">
			<div class="calendar-container">
				<div class="checkBoxList">
					<label><input type="checkbox" id="selectAll"
						class="category-checkbox"> 전체보기</label> <label><input
						type="checkbox" class="category-checkbox" value="healthBeauty">
						헬스/뷰티</label> <label><input type="checkbox"
						class="category-checkbox" value="game"> 게임</label> <label><input
						type="checkbox" class="category-checkbox" value="culture">
						문화</label> <label><input type="checkbox" class="category-checkbox"
						value="shopping"> 쇼핑</label> <label><input type="checkbox"
						class="category-checkbox" value="supply"> 문구</label> <label><input
						type="checkbox" class="category-checkbox" value="kids"> 키즈</label>
					<label><input type="checkbox" class="category-checkbox"
						value="design"> 디자인</label> <label><input type="checkbox"
						class="category-checkbox" value="foods"> 음식</label> <label><input
						type="checkbox" class="category-checkbox" value="interior">
						인테리어</label> <label><input type="checkbox"
						class="category-checkbox" value="policy"> 정책</label> <label><input
						type="checkbox" class="category-checkbox" value="character">
						캐릭터</label> <label><input type="checkbox"
						class="category-checkbox" value="experience"> 경험</label> <label><input
						type="checkbox" class="category-checkbox" value="collaboration">
						콜라보</label> <label><input type="checkbox"
						class="category-checkbox" value="entertainment"> 방송</label> <label><input
						type="checkbox" class="category-checkbox" value="myInterest"
						id="myInterest"> 내 관심사</label> <label><input
						type="checkbox" class="category-checkbox" value="myLike"
						id="myLike"> 내 좋아요</label>
				</div>


				<br>

				<div class="monthChange">
					<button id="prevMonth">&lt;</button>
					<!-- 이전 달로 이동 -->
					<span id="currentMonth">10월</span>
					<!-- 현재 달 표시 -->
					<button id="nextMonth">&gt;</button>
					<!-- 다음 달로 이동 -->
					<button id="currentDateMonth">현재 날짜로 이동</button>
				</div>


				<br>
				<table class="calendar-table">
					<thead>
						<tr id="calendar-days">
							<!-- 날짜 나올 공간  -->
						</tr>
					</thead>

					<tbody id="calendar-body">

						<!-- 팝업스토어 목록 나올 공간 -->
					</tbody>
				</table>
			</div>
		</div>

		<div class="popUpList" id="popUpList"></div>


	</div>

	<br>
	<hr>
	<br>

	<div id="loginModal" class="modal">
		<div class="modal-content">
			<span class="close">&times;</span>
			<p>로그인이 필요한 기능입니다.</p>
			<button id="goToLogin">로그인하러 가기</button>
		</div>
	</div>

	<jsp:include page="layout/popUpFooter.jsp" />
	<script type="text/javascript" src="/resources/popUpJs/popUpMain.js"></script>
	<script type="text/javascript"
		src="/resources/calendarJs/calendarMain.js"></script>
</body>
</html>
