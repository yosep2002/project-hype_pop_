<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=v3s0wu5ddz"></script>
<div class="popUpRecommend"> 
    <h1>현재 인기있는 팝업스토어</h1>
    <div class="slider-container">
        <button class="arrow leftArrow">&#9664;</button>
        <div class="slider" id="hotPopUpStore">
            <c:forEach var="popUp" items="${popularPopUps}">
                <div class="popUpItem">
                   <div class="popUpLikeCount">❤️ ${popUp.likeCount}</div>
                    <img class="popUpImage" alt="${popUp.psName}">
                    <input type="hidden" class="fileData" value="<c:out value="${popUp.psImg.uuid}_${popUp.psImg.fileName}" />">
                    <div class="popUpText">${popUp.psName}</div>
                </div>
            </c:forEach>
        </div>
        <button class="arrow rightArrow">&#9654;</button>
    </div>

    <br>
    <h1>핫한 관심사로 추천!</h1>
    <c:forEach var="entry" items="${topStoresByInterestMap}" varStatus="status">
        <h2>${entry.key}</h2>
        <div class="slider-container">
            <button class="arrow leftArrow">&#9664;</button>
            <div class="slider" id="hotCatSlider${status.index + 1}">
                <c:forEach var="store" items="${entry.value}">
                    <div class="popUpItem">
                        <input type="hidden" class="fileData" value="${store.psImg.uuid}_${store.psImg.fileName}">
                     <div class="popUpLikeCount">❤️ ${store.likeCount}</div>
                        <img class="popUpImage" alt="${store.psName}">
                        <div class="popUpText">${store.psName}</div>
                    </div>
                </c:forEach>
            </div>
            <button class="arrow rightArrow">&#9654;</button>
        </div>
        <br>
    </c:forEach>

    <c:forEach var="category" items="${topCategoriesByLikesMap}" varStatus="status">
        <h2>${category.key}</h2>
        <div class="slider-container">
            <button class="arrow leftArrow">&#9664;</button>
            <div class="slider" id="catSlider${status.index + 1}">
                <c:forEach var="store" items="${category.value}">
                    <div class="popUpItem">
                    <div class="popUpLikeCount">❤️ ${store.likeCount}</div>
                        <input type="hidden" class="fileData" value="${store.psImg.uuid}_${store.psImg.fileName}">
                        <img class="popUpImage" alt="${store.psName}">
                        <div class="popUpText">${store.psName}</div>
                    </div>
                </c:forEach>
            </div>
            <button class="arrow rightArrow">&#9654;</button>
        </div>
        <br>
    </c:forEach>
</div>

<div id="map" style="width: 800px; height: 400px; margin: 30px auto; display: flex; justify-content: center;" ></div>
