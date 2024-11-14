package org.hype.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.hype.domain.exhImgVO;
import org.hype.domain.exhLikeVO;
import org.hype.domain.exhReplyVO;
import org.hype.domain.exhVO;

public interface ExhibitionMapper {

	public List<exhVO> getExhibitionsByPage(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);

	public exhVO getExhibitionByNo(int exhNo);

	public void insertLike(exhLikeVO exhLike);

	public void deleteLike(exhLikeVO exhLikeVO);

	public int countReviewsByUser(@Param("exhNo") int exhNo,@Param("userNo") int userNo);
	
	public int insertReply(exhReplyVO exhReplyVO);

	public int updateReview(exhReplyVO exhReplyVO);

	public int deleteComment(@Param("userNo") int userNo, @Param("exhReplyNo") int exhReplyNo);

	public Integer isLiked(@Param("exhNo") int exhNo, @Param("userNo") int userNo);

	public int getLikeCount(@Param("exhNo") int exhNo);

	public List<exhVO> getLatestExhibitions(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);

	public List<exhVO> getDueSoonExhibitions(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);

	public List<exhVO> getExhibitionsOrderByPrice(@Param("order") String order, @Param("offset") int offset,
			@Param("pageSize") int pageSize, @Param("query") String query);

	public List<exhVO> getEarlyBirdExhibitions(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("query") String query);

	public Double getAverageRating(@Param("exhNo") Integer exhNo);

	public List<exhReplyVO> getUserReviews(@Param("exhNo") int exhNo, @Param("startRow") int startRow, @Param("endRow") int endRow);

	public int getTotalReviewCount(@Param("exhNo") int exhNo);

	public List<exhImgVO> getPopularExhs();

	public List<exhImgVO> getExhBannerImg();

	public List<exhImgVO> getExhDetailImg(@Param("exhNo") int exhNo);

}