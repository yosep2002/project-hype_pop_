package org.hype.service;

import java.util.List;

import org.hype.domain.exhImgVO;
import org.hype.domain.exhLikeVO;
import org.hype.domain.exhReplyVO;
import org.hype.domain.exhVO;
import org.hype.mapper.ExhibitionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExhibitionServiceImpl implements ExhibitionService {

	@Autowired
	public ExhibitionMapper exhibitionmapper;
	
	@Override
	public List<exhVO> getExhibitionsByPage(int page, int pageSize, String filter, String query) {
	    int offset = (page - 1) * pageSize;

	    // ���� ������ �� ���Ϳ� �Բ� ����
	    switch (filter) {
	        case "latest":
	            return exhibitionmapper.getLatestExhibitions(offset, pageSize, query);  // �ֽ� ����ȸ �������� �������� ����
	        case "dueSoon":
	            return exhibitionmapper.getDueSoonExhibitions(offset, pageSize, query);  // ������
	        case "lowerPrice":
	            return exhibitionmapper.getExhibitionsOrderByPrice("ASC", offset, pageSize, query);  // �������ݼ�
	        case "higherPrice":
	            return exhibitionmapper.getExhibitionsOrderByPrice("DESC", offset, pageSize, query);  // �������ݼ�
	        case "earlyBird":
	            return exhibitionmapper.getEarlyBirdExhibitions(offset, pageSize, query);  // �󸮹��� ����ȸ
	        default:
	            return exhibitionmapper.getExhibitionsByPage(offset, pageSize, query);  // �⺻ ����ȸ ���
	    }
	}


	@Override
	public exhVO getExhibitionByNo(int exhNo) {
		
		return exhibitionmapper.getExhibitionByNo(exhNo);
	}

	@Override
	public void insertLike(exhLikeVO exhLike) {

		exhibitionmapper.insertLike(exhLike);
	}

	@Override
	public void removeExhLike(exhLikeVO exhLikeVO) {
		
		exhibitionmapper.deleteLike(exhLikeVO);
	}

	@Override
	public boolean hasUserReviewed(int exhNo, int userNo) {

		return exhibitionmapper.countReviewsByUser(exhNo, userNo) > 0;
	}
	
	@Override
	public boolean saveReview(exhReplyVO exhReplyVO) {
		int result = exhibitionmapper.insertReply(exhReplyVO);
		return result > 0;
	}

	@Override
	public List<exhReplyVO> getUserReviews(int exhNo, int startRow, int endRow) {
		
		return exhibitionmapper.getUserReviews(exhNo, startRow, endRow);
	}

	@Override
	public boolean updateReview(exhReplyVO exhReplyVO) {
		int result = exhibitionmapper.updateReview(exhReplyVO);
        return result > 0;
	}

	@Override
	public boolean deleteComment(int userNo, int exhReplyNo) {
        return exhibitionmapper.deleteComment(userNo, exhReplyNo) > 0; 
    }

	@Override
	public boolean isLiked(int exhNo, int userNo) {
		Integer likeCount = exhibitionmapper.isLiked(exhNo, userNo);
	    return (likeCount != null && likeCount > 0); // null üũ�� ��
	}

	@Override
	public int getLikeCount(int exhNo) {

		return exhibitionmapper.getLikeCount(exhNo);
	}


	@Override
	public Double getAverageRating(Integer exhNo) {
	    Double rating = exhibitionmapper.getAverageRating(exhNo);
	    return (rating != null) ? rating : 0.0;
	}

	// ��� �� ����
	@Override
	public int getTotalReviewCount(int exhNo) {

		return exhibitionmapper.getTotalReviewCount(exhNo);
	}


	@Override
	public List<exhImgVO> getPopularExhs() {
		
		return exhibitionmapper.getPopularExhs();
	}


	@Override
	public List<exhImgVO> getExhBannerImg() {

		return exhibitionmapper.getExhBannerImg();
	}


	@Override
	public List<exhImgVO> getExhDetailImg(int exhNo) {
	
		return exhibitionmapper.getExhDetailImg(exhNo);
	}


	@Override
	public List<exhImgVO> getExhImg(int exhNo) {
		
		return exhibitionmapper.getExhImg(exhNo);
	}

}