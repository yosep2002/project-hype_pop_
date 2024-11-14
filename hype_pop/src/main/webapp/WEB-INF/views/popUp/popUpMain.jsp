<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HYPE POP</title>
</head>
<body>
    <jsp:include page="layout/popUpHeader.jsp"/>
	<h1>현재 인기있는 팝업스토어</h1>
	<div id="hotPopUpStore">
		<span id="hpStore1">인기 넘치는 팝업스토어 이미지1</span> &nbsp; 
		<span id="hpStore2">인기 넘치는 팝업스토어 이미지2</span> &nbsp; 
		<span id="hpStore3">인기 넘치는 팝업스토어 이미지3</span> &nbsp;
	    <span id="hpStore4">인기 넘치는 팝업스토어 이미지4</span>
	</div>
	<br>
		<h1>핫한 관심사로 추천!</h1>  <!-- 인기있는 관심사는 총 3줄로 나오기 때문에  id를 div에는 1,2,3으로 구별 span에는 1_1 (첫줄 첫번째 span)으로 구별하는 방식 사용 -->
		<h2>관심사1</h2> 
	<div id="hotCatPopUpStore1">
		<span id="hcpStore1_1">너무 핫한 팝업스토어 이미지1</span> &nbsp; 
		<span id="hcpStore1_2">너무 핫한 팝업스토어 이미지2</span> &nbsp; 
		<span id="hcpStore1_3">너무 핫한 팝업스토어 이미지3</span> &nbsp;
	    <span id="hcpStore1_4">너무 핫한 팝업스토어 이미지4</span>
	</div>
	<br>
	<h2>관심사2</h2> 
	<div id="hotCatPopUpStore2">
	    <span id="hcpStore2_1">너무 핫한 팝업스토어 이미지5</span> &nbsp; 
		<span id="hcpStore2_2">너무 핫한 팝업스토어 이미지6</span> &nbsp; 
		<span id="hcpStore2_3">너무 핫한 팝업스토어 이미지7</span> &nbsp;
	    <span id="hcpStore2_4">너무 핫한 팝업스토어 이미지8</span>
	</div>
		<br>
	<h2>관심사3</h2> 
	<div id="hotCatPopUpStore3">
	    <span id="hcpStore3_1">너무 핫한 팝업스토어 이미지9</span> &nbsp; 
		<span id="hcpStore3_2">너무 핫한 팝업스토어 이미지10</span> &nbsp; 
		<span id="hcpStore3_3">너무 핫한 팝업스토어 이미지11</span> &nbsp;
	    <span id="hcpStore3_4">너무 핫한 팝업스토어 이미지12</span>
	</div>
	<br>
	<br>
	<br>
	<div id="pupUpStoreMap">
	<h1>     
	<span id="MapAPI">지도 API</span>
	</h1>
	</div>
	
	    <jsp:include page="layout/popUpFooter.jsp"/>
	
</body>
</html>