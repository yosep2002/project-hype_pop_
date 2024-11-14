document.addEventListener("DOMContentLoaded", function () {
    const reviews = [
        { rating: 4, comment: "여기 정말 좋았어요!", isMine: true },
        { rating: 5, comment: "최고의 경험이었어요!", isMine: false },
        { rating: 3, comment: "보통이었어요.", isMine: true }
    ];

    function loadUserReviews() {
        const reviewList = document.getElementById('reviewList');
        reviewList.innerHTML = '';

        reviews.forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('reviewItem');

            const starDiv = document.createElement('div');
            starDiv.classList.add('userStarRating');
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.textContent = '★';
                star.setAttribute('data-value', i);
                star.style.color = i <= review.rating ? 'gold' : 'gray';
                starDiv.appendChild(star);
            }

            const commentP = document.createElement('p');
            commentP.textContent = review.comment;
            reviewDiv.appendChild(starDiv);
            reviewDiv.appendChild(commentP);

            if (review.isMine) {
                const kebabMenu = document.createElement('div');
                kebabMenu.classList.add('kebabMenu');
                kebabMenu.innerHTML = '⋮';
                reviewDiv.appendChild(kebabMenu);

                const kebabMenuOptions = document.createElement('ul');
                kebabMenuOptions.classList.add('kebabMenuOptions');
                kebabMenuOptions.innerHTML = `
                    <li class="editReview">수정</li>
                    <li class="deleteReview">삭제</li>
                `;
                reviewDiv.appendChild(kebabMenuOptions);

                // 케밥 메뉴 클릭 이벤트 리스너 추가
                kebabMenu.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const optionsVisible = kebabMenuOptions.classList.contains('visible');
                    document.querySelectorAll('.kebabMenuOptions').forEach(menu => menu.classList.remove('visible'));
                    if (!optionsVisible) {
                        kebabMenuOptions.classList.add('visible');
                    }
                });

                // 수정 버튼 클릭 이벤트 리스너 추가
                kebabMenuOptions.querySelector('.editReview').addEventListener('click', function () {
                    updateReviewStarRating(reviewDiv, review.rating);
                    const ratingInput = document.getElementById('rating');
                    ratingInput.value = review.rating; // 기존 별점으로 업데이트
                    selectedRatingText.textContent = '선택한 별점: ' + review.rating; // 선택한 별점 텍스트 업데이트
                });

                // 삭제 버튼 클릭 이벤트 리스너 추가
                kebabMenuOptions.querySelector('.deleteReview').addEventListener('click', function () {
                    // 리뷰 삭제 로직 추가 (예: reviews 배열에서 제거)
                });
            }

            reviewList.appendChild(reviewDiv);
        });
    }

    function updateReviewStarRating(reviewDiv, rating) {
        const stars = reviewDiv.querySelectorAll('.userStarRating span');
        stars.forEach(star => {
            star.style.color = 'gray'; // 초기화
        });
        for (let i = 1; i <= rating; i++) {
            stars[i - 1].style.color = 'gold'; // 선택된 별색으로 변경
        }
    }

    loadUserReviews();

    // 리뷰 작성란의 별점 클릭 기능
    const reviewStars = document.querySelectorAll('#newReviewStars span');
    reviewStars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-value');
            const ratingInput = document.getElementById('rating');
            const selectedRatingText = document.getElementById('selectedRating');

            reviewStars.forEach(s => {
                s.style.color = 'gray'; // 초기 색상
            });
            for (let i = 1; i <= rating; i++) {
                reviewStars[i - 1].style.color = 'gold'; // 선택된 별
            }

            ratingInput.value = rating;
            selectedRatingText.textContent = '선택한 별점: ' + rating;
        });
    });
});
  //굿즈 스토어 이동

document.querySelectorAll('.hitGoods span').forEach(a => {
	  a.addEventListener('click', (event) => {
	    event.preventDefault(); 
	    
	    let goodsName = a.textContent;
	    
	    console.log(goodsName);
	    
	    location.href = `/goodsStore/goodsDetails?goodsName=${encodeURIComponent(goodsName)}`;
	  
	   
	  });
	});
 