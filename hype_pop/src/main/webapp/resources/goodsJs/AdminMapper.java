package org.hype.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.hype.domain.Criteria;
import org.hype.domain.exhImgVO;
import org.hype.domain.exhVO;
import org.hype.domain.gCatVO;
import org.hype.domain.gImgVO;
import org.hype.domain.goodsVO;
import org.hype.domain.pCatVO;
import org.hype.domain.pImgVO;
import org.hype.domain.payVO;
import org.hype.domain.popStoreVO;
import org.hype.domain.qnaVO;
import org.hype.domain.signInVO;

public interface AdminMapper {
	// ����¡O
	// ������ �˾������ ����Ʈ ��������
	public List<popStoreVO> getPList(@Param("cri") Criteria cri, @Param("searchPs") String searchPs); 
	public int getPTotal(String searchPs);
	
	// ������ ��ǰ ����Ʈ �������� 
	public List<goodsVO> getGList(@Param("cri") Criteria cri, @Param("searchGs") String searchGs);  
	public int getGTotal(String searchGs);
	
	// ������ ����ȸ ����Ʈ ��������
	public List<exhVO> getExhList(@Param("cri") Criteria cri, @Param("searchEs") String searchEs);  
	public int getExhTotal(String searchEs);
	
	// ������ ȸ�� ����Ʈ ��������
	public List<signInVO> getMList(@Param("cri") Criteria cri, @Param("searchMs") String searchMs);  
	public int getMTotal(String searchMs);
	
	// Ư�� �˾������ ��ȸ
	public popStoreVO getPopStoreById (int psNo);
	// Ư�� ����(��ǰ) ��ȸ
	public goodsVO getGoodsById (int gno);  
//	public goodsVO getGoodsById (int gNo);  
	// Ư�� ����ȸ ��ȸ
	public exhVO getExhById (int exhNo); 
	// Ư�� ȸ�� ��ȸ
	public signInVO getMembersById (String userId);  
	
	// �˾������ ����ϱ�
	public int insertPopStore(popStoreVO pvo);
	public int insertPsImage(pImgVO imgVo);  // �̹��� ���
	public int insertPsCat(pCatVO cvo);  // ī�װ� ���
	
	// �˾������ �����ϱ�
	public pImgVO getPsImg(int psNo);
	public pCatVO getPsCat(int psNo);
	public int updatePopStore(popStoreVO pvo);
	public int updatePsImage(pImgVO imgVo);
	public int updatePsCat(pCatVO cvo);
	
	// �˾������ �����ϱ�
	public int deletePopStore(int psNo);
	public int deletePsImage(int psNo);
	public int deletePsCat(int psNo);
	public int deletePsReply(int psNo);
	public int deletePsLike(int psNo);
	public List<goodsVO> getPsnoList(int psNo); // �˾������ ���� ���� mapper ����
	
	// ��ǰ(����) ����ϱ�
	public List<popStoreVO> getAllPopStores();	  // select box ��� �˾������ ���
	public int insertGoodsStore(goodsVO gvo);
	public int insertBannerImage(gImgVO gImgVo);  // ��� �̹��� ���
	public int insertDetailImage(gImgVO gImgVo);  // �� �̹��� ���
	public int insertGcat(gCatVO gvo); 			  // ī�װ� ���
	
	// ��ǰ(����) �����ϱ�
	public gImgVO getGImgBanner(int gno);
	public gImgVO getGImgDetail(int gno);
	public gCatVO getGCat(int gno);
	public int updateGoodsStore(goodsVO gvo);
	public int updateGImgBanner(gImgVO gImgVo);	  // ��� �̹��� ����
    public int updateGImgDetail(gImgVO gImgVo);   // �� �̹��� ����
    public int updateGCat(gCatVO gcatVo);
    
    // ��ǰ(����) �����ϱ�
    public int deleteGoodsStore(int gno);
    public int deleteGImgBanner(int gno);
    public int deleteGImgDetail(int gno);
    public int deleteGCat(int gno);
    public int deleteGCart(int gno);
    public int deleteGPay(int gno);
    public int deleteGLike(int gno);
    public int deleteGReply(int gno);
    
	// ����ȸ ����ϱ�
	public int insertExhibition(exhVO evo);
	public int insertExhBannerImage(exhImgVO exhImgVo);  // ��� �̹��� ���
	public int insertExhDetailImage(exhImgVO exhImgVo);  // �� �̹��� ���
	
	// ����ȸ �����ϱ�
	public exhImgVO getExhImgBanner(int exhNo);
    public exhImgVO getExhImgDetail(int exhNo);
	public int updateExhibition(exhVO evo);
	public int updateExhBannerImage(exhImgVO exhImgVo);  // ��� �̹��� ����
	public int updateExhDetailImage(exhImgVO exhImgVo);  // �� �̹��� ����
	
	// ����ȸ �����ϱ�
	public int deleteExhibition(int exhNo);
    public int deleteExhImgBanner(int exhNo);
    public int deleteExhImgDetail(int exhNo);
    public int deleteExhLike(int exhNo);
    public int deleteExhReply(int exhNo);
    
	// ������ ���� ����Ʈ ��������	
	public List<qnaVO> getQnaListByType(@Param("qnaType") String qnaType, @Param("qnaAnswer") String qnaAnswer); 	
//	public List<qnaVO> getQList(@Param("cri") Criteria cri, @Param("qnaType") String qnaType);  // ����¡O
//	public int getQTotal(String qnaType);
	
	// ȸ�� ���� ������Ʈ
	public int updateMem(signInVO svo); 
	
}