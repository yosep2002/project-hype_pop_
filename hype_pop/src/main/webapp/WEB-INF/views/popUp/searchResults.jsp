<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>검색 결과</title>
</head>
<body>
  <h1>검색 결과 페이지</h1>
  <p>검색한 데이터: ${searchData}</p>
  <br>
  <jsp:include page="layout/popUpHeader.jsp" />
  
  <div class="searchConditions">
    <h3>
     <span id="arrayByDis">거리순</span> <span id="arrayByLike">좋아요 순</span> <span id="arrayByLatest">최신순</span> <span id="arrayByRating">별점순</span> <span id="selInterests">관심사 선택</span>
    </h3>
  </div>

  <table class="searchResultStore">
    <tr>
      <td id="popUpStoreImg">
        <h1>팝업스토어 배너 이미지</h1>
      </td>
      <td id="popUpStoreInfo">
        <span id="popUpName">팝업스토어 이름</span>  <span id="likeCount">좋아요 수</span>
        <h3>팝업스토어 주소</h3> <br> <br>
        <h3>
          관심사: <span>관심사 1</span>, <span>관심사 2</span>, <span>관심사 3</span>  
        </h3>
        <h3>
        <%= new SimpleDateFormat("yyyy-MM-dd").format(new Date()) %>   
        </h3>
      </td>
    </tr>
  </table>

<!-- 관심사 선택 모달 -->
<div id="interestModal" style="display: none; position: absolute;">
    <div id="interestList">
        <h3>관심사를 선택하세요 (최대 3개)</h3>
        <!-- X 버튼 추가 -->
        <button id="closeModalBtn" style="position: absolute; right: 10px; top: 10px;">X</button>
        <!-- 관심사 리스트 (5줄, 18개) -->
        <div class="interests">
            <label><input type="checkbox" value="관심사 1"> 관심사 1</label>
            <label><input type="checkbox" value="관심사 2"> 관심사 2</label>
            <label><input type="checkbox" value="관심사 3"> 관심사 3</label>
            <label><input type="checkbox" value="관심사 4"> 관심사 4</label>
            <label><input type="checkbox" value="관심사 5"> 관심사 5</label>
            <label><input type="checkbox" value="관심사 6"> 관심사 6</label>
            <label><input type="checkbox" value="관심사 7"> 관심사 7</label>
            <label><input type="checkbox" value="관심사 8"> 관심사 8</label>
            <label><input type="checkbox" value="관심사 9"> 관심사 9</label>
            <label><input type="checkbox" value="관심사 10"> 관심사 10</label>
            <label><input type="checkbox" value="관심사 11"> 관심사 11</label>
            <label><input type="checkbox" value="관심사 12"> 관심사 12</label>
            <label><input type="checkbox" value="관심사 13"> 관심사 13</label>
            <label><input type="checkbox" value="관심사 14"> 관심사 14</label>
            <label><input type="checkbox" value="관심사 15"> 관심사 15</label>
            <label><input type="checkbox" value="관심사 16"> 관심사 16</label>
            <label><input type="checkbox" value="관심사 17"> 관심사 17</label>
            <label><input type="checkbox" value="관심사 18"> 관심사 18</label>
        </div>
        <button id="confirmSelection">선택 완료</button>
    </div>
</div>

  <jsp:include page="layout/popUpFooter.jsp" />
</body>
<script type="text/javascript" src="/resources/js/searchResults.js"></script>
</html>
