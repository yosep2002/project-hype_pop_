package org.hype.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.hype.domain.gReplyVO;
import org.hype.mapper.GReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;
@Log4j
@Service
public class GReplyServiceImpl implements GReplyService {
	@Autowired
	private GReplyMapper gMapper;
	
	@Override
	public int insertGReply(gReplyVO gVo) {
		gMapper.updateReplyCntPlus(gVo.getGno());
		return gMapper.insertGReply(gVo);
	}
	
	@Override
	public List<gReplyVO> getAllReplyList(@Param("gno") int gno,@Param("userNo") int userNo) {
		return gMapper.getAllReplyList(gno, userNo);
	}
	
	@Override
	public gReplyVO getMyReply(@Param("gno") int gno,@Param("userNo") int userNo) {
		return gMapper.getMyReply(gno, userNo);
	}
	
	@Override
	public double getAvgStars(int gno) {
		return gMapper.getAvgStars(gno);
	}
	
	@Override
	public String chkReplied(int userNo, int gno) {
    	log.warn("bbbbbbbbbbbb" + userNo + gno);
    	int result = gMapper.chkReplied(userNo, gno);
		return String.valueOf(result);
	}
	
	@Override
	public int deleteReply(int gno, int userNo) {
		gMapper.updateReplyCntMinus(gno);
		return gMapper.deleteReply(gno, userNo);
	}
	
	@Override
	public int updateReply(gReplyVO vo) {
		return gMapper.updateReply(vo);
	}
	
	@Override
    public List<gReplyVO> getAllReplyListWithPaging(@Param("gno") int gno, @Param("userNo") int userNo, @Param("offset") int offset, @Param("size") int size) {
        return gMapper.getAllReplyListWithPaging(gno, userNo, offset, size);
    }
	
	@Override
	public int getReplyCount(@Param("gno") int gno,@Param("userNo") int userNo) {
	    return gMapper.getReplyCount(gno, userNo);
	}
	   //새로 추가(김윤)
	   @Override
	   @Transactional
	   public Map<String, Object> getGreplyReviews(int userNo) {
	    
	      //내 댓글 리스트
	      List<gReplyVO>greplies = gMapper.getGreply(userNo);
	      // gName 저장할 리스트
	      List<String> gnames = new ArrayList<>();
	       
	      // 각 gNo에 대해 gName 가져오기
	       for (gReplyVO greply : greplies) {
	              String gname = gMapper.getGname(greply.getGno()); 
	              gnames.add(gname);
	          }
	      
	      
	          Map<String, Object> result = new HashMap<>();
	          result.put("greplies", greplies);
	          result.put("gnames", gnames);
	          return result; // 결과를 Map 형태로 반환 
	   }
	   
}