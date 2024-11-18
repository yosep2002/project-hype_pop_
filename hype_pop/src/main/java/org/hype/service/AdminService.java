package org.hype.service;

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
import org.springframework.stereotype.Service;

@Service
public interface AdminService {	
	// ���� Header����
	// �˻��� ���� �˾������ ����¡ ó�� 
	// �˾������ ����Ʈ ��������
	public List<popStoreVO> getPList(Criteria cri, String searchPs);	
	public int getPTotal(String searchPs);
	// �˻��� ���� ���� ����¡ ó�� 
	// ��ǰ ����Ʈ ��������
	public List<goodsVO> getGList(Criteria cri, String searchGs);  
	public int getGTotal(String searchGs);
	// �˻��� ���� ����ȸ ����¡ ó�� 
	// ����ȸ ����Ʈ ��������
	public List<exhVO> getExhList(@Param("cri") Criteria cri, String searchEs);  
	public int getExhTotal(String searchEs);
	// �˻��� ���� ȸ�� ����¡ ó�� 
	// ȸ�� ����Ʈ ��������
	public List<signInVO> getMList(Criteria cri, String searchMs);
	public int getMTotal(String searchMs);
	
	// Ư�� �˾������ ��ȸ
	public popStoreVO getPopStoreById (int psNo);  
	// Ư�� ��ǰ(����) ��ȸ
	public goodsVO getGoodsById (int gno);  
	// Ư�� ����ȸ ��ȸ
	public exhVO getExhById (int exhNo); 
	// Ư�� ȸ�� ��ȸ
	public signInVO getMembersById (String userId); 
	
	// �˾������ ����ϱ�
	public int insertPopStore(popStoreVO pvo); 
	
	// �˾������ �����ϱ�
	public int updatePopStore(popStoreVO pvo);
	public pImgVO getPsImg(int psNo);
	public pCatVO getPsCat(int psNo);
	
	// �˾������ �����ϱ�
	public int deletePopStore(int psNo);
	
	// ��ǰ(����) ����ϱ� 
	// selectbox ��� �˾������ ��������
	public List<popStoreVO> getAllPopStores();	
	// ��ǰ(����) insert
	public int insertGoodsStore(goodsVO gvo);
	
	// ��ǰ(����) �����ϱ�
	public int updateGoodsStore(goodsVO gvo);
	// ��� �̹����� �� �̹��� ��������
    public gImgVO getGImgBanner(int gno);
    public gImgVO getGImgDetail(int gno);
    // ī�װ� ��������
    public gCatVO getGCat(int gno);
    
    // ��ǰ(����) �����ϱ�
    public int deleteGoodsStore(int gno);
	
	// ����ȸ ����ϱ�
	public int insertExhibition(exhVO evo);
	
	// ����ȸ �����ϱ�
	public int updateExhibition(exhVO evo);
	// ��� �̹����� �� �̹��� ��������
    public exhImgVO getExhImgBanner(int exhNo);
    public exhImgVO getExhImgDetail(int exhNo);
	
    // ����ȸ �����ϱ�
    public int deleteExhibition(int exhNo);
    
	// ���� ����Ʈ Ȯ�� ������ ����
	// ���� ����Ʈ ��������	
	public List<qnaVO> getQnaListByType(String qnaType, String qnaAnswer);	

	// ȸ�� ���� ���� ������ ����
	// ȸ�� ���� ������Ʈ
	public int updateMem(signInVO svo); 
	

}