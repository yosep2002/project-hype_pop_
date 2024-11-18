package org.hype.service;

import java.util.Date; 
import java.util.HashMap;
import java.util.Map;
import java.util.List;

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
import org.hype.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	public AdminMapper mapper;
		
	// ����¡ ó��
	// �˾������ ����
	// �˾������ ����Ʈ ��������
	@Override
	public List<popStoreVO> getPList(Criteria cri, String searchPs) {
		return mapper.getPList(cri, searchPs);
	}
	
	@Override
	public int getPTotal(String searchPs) {
		return mapper.getPTotal(searchPs);
	}	

	// ����(��ǰ) ����
	// ����(��ǰ) ����Ʈ ��������
	@Override
	public List<goodsVO> getGList(Criteria cri, String searchGs) {
		return mapper.getGList(cri, searchGs);
	}

	@Override
	public int getGTotal(String searchGs) {
		return mapper.getGTotal(searchGs);
	}	
	
	// ����ȸ ����
	// ����ȸ ����Ʈ ��������	
	@Override
	public List<exhVO> getExhList(Criteria cri, String searchEs) {
		return mapper.getExhList(cri, searchEs);
	}

	@Override
	public int getExhTotal(String searchEs) {
		return mapper.getExhTotal(searchEs);
	}

	// ȸ�� ����
	// ȸ�� ����Ʈ �������� 
	@Override
	public List<signInVO> getMList(Criteria cri, String searchMs) {
		return mapper.getMList(cri, searchMs);
	}
	
	@Override
	public int getMTotal(String searchMs) {
		return mapper.getMTotal(searchMs);
	}
	
	// Ư�� �˾������ ��ȸ
	@Override
	public popStoreVO getPopStoreById(int psNo) {
		return mapper.getPopStoreById(psNo);
	}
	
	// Ư�� ����(��ǰ) ��ȸ
	@Override
	public goodsVO getGoodsById(int gno) {
		return mapper.getGoodsById(gno);
	}	
//	@Override
//	public goodsVO getGoodsById(int gNo) {
//		return mapper.getGoodsById(gNo);
//	}	
	
	// Ư�� ����ȸ ��ȸ
	@Override
	public exhVO getExhById(int exhNo) {
		return mapper.getExhById(exhNo);
	}
	
	// Ư�� ȸ�� ��ȸ
	@Override
	public signInVO getMembersById(String userId) {
		return mapper.getMembersById(userId);
	}
	
	// �˾������ ��� ������ ����
	// �˾������ ���� ���
	@Transactional
	@Override
	public int insertPopStore(popStoreVO pvo) {
		
		int result1 = mapper.insertPopStore(pvo);
		pvo.getPsImg().setPsNo(pvo.getPsNo()); // �������� xml���� ó���� �Ÿ� ����� ��
		log.warn(pvo.getPsNo());
		int result2 = mapper.insertPsImage(pvo.getPsImg());	 // vo ��������
		
		pvo.getPsCat().setPsNo(pvo.getPsNo()); // �������� xml���� ó���� �Ÿ� ����� ��
		
		int result3 = mapper.insertPsCat(pvo.getPsCat());	 // vo ��������

		log.warn("result1�� ���� " + result1);
		log.warn("result2�� ���� " + result2);

		return result1;		
	}
	
	// �˾������ ���� ������ ����
	// �˾������ ���� ����
	// �̹��� �޾ƿ���
	@Override
	public pImgVO getPsImg(int psNo) {
		return mapper.getPsImg(psNo);
	}
	
	// ī�װ� �� �޾ƿ���
	@Override
	public pCatVO getPsCat(int psNo) {
		return mapper.getPsCat(psNo);
	}

	// �˾������ ���� ����
	@Override
	public int updatePopStore(popStoreVO pvo) {
		log.info("�˾������ ����..." + pvo);
		
		// 1. �⺻ �˾������ ���� ������Ʈ
		int result1 = mapper.updatePopStore(pvo);
		log.warn("�⺻ ���� ������Ʈ ���: " + result1);
		
		// 2. �̹��� ���� ������Ʈ
	    if (pvo.getPsImg() != null) {
	        pvo.getPsImg().setPsNo(pvo.getPsNo());
	        int result2 = mapper.updatePsImage(pvo.getPsImg());
	        log.warn("�̹��� ���� ������Ʈ ���: " + result2);
	    } else {
	        log.warn("pvo.getPsImg()�� null�Դϴ�. �̹��� ���� ������Ʈ�� �ǳʶݴϴ�.");
	    }
	    		
		// 3. ī�װ� ���� ������Ʈ
	    pvo.getPsCat().setPsNo(pvo.getPsNo());
	    int result3 = mapper.updatePsCat(pvo.getPsCat());
	    log.warn("ī�װ� ���� ������Ʈ ���: " + result3);
	    
		return result1;		
	}

	// �˾������ ���� ������ ����
	// �˾������ ���� ����	
	@Override
	@Transactional
	public int deletePopStore(int psNo) {
		List<goodsVO> gvo = mapper.getPsnoList(psNo);
		for(goodsVO vo : gvo) {
			int gno = vo.getGno();
			int result2 = mapper.deleteGCart(gno);
			result2 += mapper.deleteGPay(gno);
			result2 += mapper.deleteGLike(gno);
			result2 += mapper.deleteGReply(gno);
			result2 += mapper.deleteGCat(gno);
			result2 += mapper.deleteGImgBanner(gno);
			result2 += mapper.deleteGImgDetail(gno);
			result2 += mapper.deleteGoodsStore(gno);
		}
		int result = mapper.deletePsCat(psNo);
        result += mapper.deletePsImage(psNo);
        result += mapper.deletePsReply(psNo);
        result += mapper.deletePsLike(psNo);
        result += mapper.deletePopStore(psNo);

        return result;
	}	
	
	// ��ǰ(����) ��� ������ ����
	// ��ǰ(����) ���� ���	
	@Override
	public List<popStoreVO> getAllPopStores() {
		return mapper.getAllPopStores();
	}

	@Transactional
	@Override
	public int insertGoodsStore(goodsVO gvo) {
	    // 1. ��ǰ ���
		log.warn("�����̸� �������� " + gvo.getAttachList().get(0).getFileName());
		log.warn(gvo.getAttachList().get(1).getFileName());
	    int result1 = mapper.insertGoodsStore(gvo);
	    log.warn("��ǰ ��� ���: " + result1);	

	    if (result1 > 0) {

	    	for (gImgVO img : gvo.getAttachList()) {
	    		log.warn("gno�� ? : " + gvo.getGno());
	            img.setGno(gvo.getGno()); // gno�� �� �̹����� ����
	            // ��� �̹��� ���
	            if (img.getUploadPath().contains("���� ��� ����")) {
	                int result2 = mapper.insertBannerImage(img);
	                log.warn("��� �̹��� ��� ���: " + result2);
	            }
	            // �� �̹��� ���
	            else if (img.getUploadPath().contains("���� �� ����")) {
	                int result3 = mapper.insertDetailImage(img);
	                log.warn("�� �̹��� ��� ���: " + result3);
	            }
	        }
	    } else {
	        throw new RuntimeException("��ǰ ��� ����");
	    }
	    
	    gvo.getGcat().setGno(gvo.getGno()); // �������� xml���� ó���� �Ÿ� ����� ��
	    
	    int result4 = mapper.insertGcat(gvo.getGcat());	    

	    return result1;
	}
	
	// ��ǰ(����) ���� ������ ����
	// ��ǰ(����) ���� ����	
	@Override
	public gImgVO getGImgBanner(int gno) {
		return mapper.getGImgBanner(gno);
	}
	
	@Override
	public gImgVO getGImgDetail(int gno) {
		return mapper.getGImgDetail(gno);
	}
	
	@Override
	public gCatVO getGCat(int gno) {
		return mapper.getGCat(gno);
	}
	
	@Transactional
	@Override
	public int updateGoodsStore(goodsVO gvo) {

	    // 1. �⺻ ��ǰ ���� ������Ʈ
	    int result = mapper.updateGoodsStore(gvo);

	    // 2. ī�װ� ���� ������Ʈ
	    if (gvo.getGcat() != null) {
	        gvo.getGcat().setGno(gvo.getGno());  // ��ǰ ��ȣ ����
	        result += mapper.updateGCat(gvo.getGcat());
	    }

	    // 3. �̹��� ����Ʈ�� ������ ��� ��ʿ� �� �̹��� �����Ͽ� ������Ʈ ����
	    if (gvo.getAttachList() != null && !gvo.getAttachList().isEmpty()) {
	        for (gImgVO img : gvo.getAttachList()) {
	            img.setGno(gvo.getGno());  // ��ǰ ��ȣ ����
	            if (img.getUploadPath().contains("���� ��� ����")) {
	                result += mapper.updateGImgBanner(img);  // ��� �̹��� ������Ʈ
	            } else if (img.getUploadPath().contains("���� �� ����")) {
	                result += mapper.updateGImgDetail(img);  // �� �̹��� ������Ʈ
	            }
	        }
	    }

	    return result;
	}
	
	// ��ǰ(����) ���� ������ ����
	// ��ǰ(����) ���� ����
	@Transactional
	@Override
	public int deleteGoodsStore(int gno) {
			    
		int result = mapper.deleteGCart(gno);
		
		result += mapper.deleteGPay(gno);
		
		result += mapper.deleteGLike(gno);
		
		result += mapper.deleteGReply(gno);
		
		result += mapper.deleteGCat(gno);
		
        result += mapper.deleteGImgBanner(gno);

        result += mapper.deleteGImgDetail(gno);

        result += mapper.deleteGoodsStore(gno);        

        return result; 
	}

	// ����ȸ ��� ������ ����
	// ����ȸ ���� ���	
	@Transactional
	@Override
	public int insertExhibition(exhVO evo) {
	    // 1. ��ǰ ���
		log.warn("�����̸� �������� " + evo.getAttachExhList().get(0).getFileName());
		log.warn(evo.getAttachExhList().get(1).getFileName());
	    int result1 = mapper.insertExhibition(evo);
	    log.warn("����ȸ ��� ���: " + result1);

	    if (result1 > 0) {

	    	for (exhImgVO exhImg : evo.getAttachExhList()) {
	    		exhImg.setExhNo(evo.getExhNo()); // exhNo�� �� �̹����� ����
	    		log.warn("����ȸ ��ȣ : " + evo.getExhNo());
	            // ��� �̹��� ���
	            if (exhImg.getUploadPath().contains("����ȸ ��� ����")) {
	                int result2 = mapper.insertExhBannerImage(exhImg);
	                log.warn("��� �̹��� ��� ���: " + result2);
	            }
	            // �� �̹��� ���
	            else if (exhImg.getUploadPath().contains("����ȸ �� ����")) {
	                int result3 = mapper.insertExhDetailImage(exhImg);
	                log.warn("�� �̹��� ��� ���: " + result3);
	            }
	        }
	    } else {
	        throw new RuntimeException("����ȸ ��� ����");
	    }

	    return result1;
	}

	// ����ȸ ���� ������ ����
	// ����ȸ ���� ����
	@Override
	public exhImgVO getExhImgBanner(int exhNo) {
		return mapper.getExhImgBanner(exhNo);
	}
	
	@Override
	public exhImgVO getExhImgDetail(int exhNo) {
		return mapper.getExhImgDetail(exhNo);
	}
	
	@Override
	public int updateExhibition(exhVO evo) {
		// 1. �⺻ ��ǰ ���� ������Ʈ
	    int result = mapper.updateExhibition(evo);

	    // 2. �̹��� ����Ʈ�� ������ ��� ��ʿ� �� �̹��� �����Ͽ� ������Ʈ ����
	    if (evo.getAttachExhList() != null && !evo.getAttachExhList().isEmpty()) {
	        for (exhImgVO img : evo.getAttachExhList()) {
	            img.setExhNo(evo.getExhNo());  // ����ȸ ��ȣ ����
	            if (img.getUploadPath().contains("����ȸ ��� ����")) {
	                result += mapper.updateExhBannerImage(img);  // ��� �̹��� ������Ʈ
	            } else if (img.getUploadPath().contains("����ȸ �� ����")) {
	                result += mapper.updateExhDetailImage(img);  // �� �̹��� ������Ʈ
	            }
	        }
	    }

	    return result;
	}

	// ����ȸ ���� ������ ����
	// ����ȸ ���� ����
	@Transactional
	@Override
	public int deleteExhibition(int exhNo) {
		
		int result = mapper.deleteExhImgBanner(exhNo);
		
        result += mapper.deleteExhImgDetail(exhNo);
        
        result += mapper.deleteExhLike(exhNo);
        
        result += mapper.deleteExhReply(exhNo);

        result += mapper.deleteExhibition(exhNo);

        return result;         
	}
		
	// ���� ����Ʈ Ȯ�� ������ ����
	// ���� ����Ʈ ��������
	@Override
    public List<qnaVO> getQnaListByType(String qnaType, String qnaAnswer) {        
        return mapper.getQnaListByType(qnaType, qnaAnswer);
    }

    // ȸ�� ���� ���� ������ ����
	// ȸ�� ���� ������Ʈ	
	@Override
	public int updateMem(signInVO svo) {
		return mapper.updateMem(svo);
	}	
		
		
}