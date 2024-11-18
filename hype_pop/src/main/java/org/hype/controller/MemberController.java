package org.hype.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.hype.domain.gImgVO;
import org.hype.domain.likedExhViewVO;
import org.hype.domain.likedGoodsImgVO;
import org.hype.domain.likedPopImgVO;

import org.hype.domain.mCatVO;
import org.hype.domain.pImgVO;
import org.hype.domain.signInVO;
import org.hype.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sun.jdi.connect.spi.Connection;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/member/*")
public class MemberController {

	@Autowired
	private MemberService mservice;
	
    @Autowired
    private PasswordEncoder pwencoder;
	
//	@Autowired
//	private GoogleConnectionFactory googleConnectionFactory;
//	@Autowired
//	private OAuth2Parameters googleOAuth2Parameters;



	// 로그인페이지로 이동
	@GetMapping("/login")
	public String login() {

		return "member/login";
	}

	// 로그인 처리
	@PostMapping("/login")
	public String login(signInVO svo, Model model) {

		signInVO member = mservice.loginMember(svo);
		
		
		if (member != null) {
			return "popUp/popUpMain";
		} else {
			model.addAttribute("error", "로그인을 오류입니다.");
			return "member/login";
		}
	}

	// 로그인 첫 화면 요청 메소드
//	@RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
//	public String login(Model model, HttpSession session) {
//
//		/* 구글code 발행 */
//		OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
//		String url = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);
//
//		System.out.println("구글:" + url);
//
//		model.addAttribute("google_url", url);
//
//		/* 생성한 인증 URL을 View로 전달 */
//		return "login";
//	}
//	
//	@RequestMapping("/googleLogin")
//	public String googleLogin() {
//	    OAuth2Operations oauthOperations = googleConnectionFactory.getOAuthOperations();
//	    String url = oauthOperations.buildAuthorizeUrl(GrantType.AUTHORIZATION_CODE, googleOAuth2Parameters);
//	    return "redirect:" + url;
//	}
	
	// 회원가입
	@GetMapping("/join")
	public String joinPage() {
		log.info("join now");
		return "member/joinPage";
	}

	// 회원가입 처리
	@PostMapping("/join")
	public String join(@ModelAttribute signInVO svo, Model model)
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		svo.setUserPw(pwencoder.encode(svo.getUserPw()));
		log.warn("join!!!!!!!!!!!!!!!");

		// bean 내부의 필드 값 확인 코드
		Method[] methods = svo.getClass().getDeclaredMethods();
		for (Method method : methods) {
			// 메서드 이름이 'get'으로 시작하는지 확인
			if (method.getName().startsWith("get")) {
				// 메서드를 호출하여 값을 가져옴
				Object value = method.invoke(svo);
				System.out.println(method.getName().substring(3) + ": " + value);
			}
		}
		System.out.println("---------------------------------");
		methods = svo.getUserInterest().getClass().getDeclaredMethods();
		for (Method method : methods) {
			// 메서드 이름이 'get'으로 시작하는지 확인
			if (method.getName().startsWith("get")) {
				// 메서드를 호출하여 값을 가져옴
				Object value = method.invoke(svo.getUserInterest());
				System.out.println(method.getName().substring(3) + ": " + value);
			}
		}
		// **아이디 중복 체크 추가**
		if (mservice.checkDuplicateId(svo.getUserId())) {
			model.addAttribute("errorMessage", "이미 존재하는 아이디입니다.");
			return "member/joinForm"; // 중복 시 회원가입 폼으로 돌아가기
		}
		// 회원 가입
		mservice.joinMember(svo);

		return "member/joinSuccess";

	}


	@GetMapping("/myPage")
	public String myPage(Model model, @RequestParam("userNo") int userNo) {
		signInVO userInfo = mservice.selectMyPageInfo(userNo);
		mCatVO userInterests = mservice.selectMyInterest(userNo);
		List<likedPopImgVO> pLikeList = mservice.pLikeList(userNo);
		List<likedGoodsImgVO> gLikeList = mservice.gLikeList(userNo);
		List<likedExhViewVO> eLikeList = mservice.eLikeList(userNo);
		System.out.println("gLikeList :" + gLikeList);

		// 회원 정보
		model.addAttribute("userInfo", userInfo);
		// 유저의 관심사
		model.addAttribute("userInterests", userInterests);
		// 좋아요 한 팝업스토어
		model.addAttribute("pLikeList", pLikeList);
		// 좋아요 한 굿즈 스토어
		model.addAttribute("gLikeList", gLikeList);
		// 좋아요 한 전시회
		model.addAttribute("eLikeList", eLikeList);

		for (likedGoodsImgVO goods : gLikeList) {
			System.out.println("gName: " + goods.getGname());
			System.out.println("gNo: " + goods.getGno());
			System.out.println("uploadPath: " + goods.getUploadPath());
			// 추가적으로 필요한 속성 출력
		}

		return "member/myPage";
	}

	// 비밀번호 변경
	@PostMapping("/passwordChange")
	public String passwordChange(@RequestParam(value = "userNo") int userNo, @RequestParam("oldPw") String oldPw,
			@RequestParam("newPw") String newPw) {
		log.info("비밀번호 변경: userNo=" + userNo);

		if (mservice.selectOldPw(userNo, oldPw) > 0) {
			mservice.updateNewPw(oldPw, newPw, userNo);
			return "/member/myPage"; // 성공 메시지 추가 필요
		}
		// 실패 시 메시지 추가 필요
		return "member/myPage";
	}

	// 이메일 변경
	@GetMapping("/emailChange")
	public String emailChange(@RequestParam(value = "userNo") int userNo, @RequestParam("newEmail") String newEmail,
			Model model) {
		log.info("이메일 변경: userNo=" + userNo);
		log.info("이메일 변경: new Email=" + newEmail);

		// 이메일 변경 성공 시
		int updateCount = mservice.updateNewEmail(newEmail, userNo);

		if (updateCount > 0) {
			model.addAttribute("success", "이메일을 변경했습니다."); // 성공 메시지
		} else {
			model.addAttribute("error", "이메일 변경에 실패했습니다."); // 실패 메시지
		}

		return "redirect:/member/myPage?userNo=" + userNo;
	}

	// 전화번호 변경

	@GetMapping("/phoneNumberChange")
	public String phoneNumberChange(@RequestParam(value = "userNo") int userNo,
			@RequestParam("oldPhoneNumber") String oldPhoneNumber,
			@RequestParam("newPhoneNumber") String newPhoneNumber, Model model) {
		log.info("비밀번호 변경: userNo=" + userNo);

		if (mservice.selectOldPhoneNum(userNo, oldPhoneNumber) > 0) {
			mservice.updateNewPhoneNum(oldPhoneNumber, newPhoneNumber, userNo);
			model.addAttribute("success", "비밀번호를 변경했습니다.");
			return "redirect:/member/myPage?userNo=" + userNo; // 성공 메시지 추가 필요
		}
		// 실패 시 메시지 추가 필요
		model.addAttribute("error", "비밀번호 변경에 실패했습니다.");
		return "redirect:/member/myPage?userNo=" + userNo;
	}

	@GetMapping("/userReply")
	public String userReply() {
		System.out.println("userReply..");
		return "/member/userReply";

	}

	@GetMapping("/myCart")
	public String myCart() {

		System.out.println("myCart..");

		return "/purchase/myCart";

	}

	@GetMapping("/paymentList")
	public String paymentList() {

		System.out.println("paymentList..");

		return "/purchase/paymentList";

	}
	
	
	//비밀번호 찾기 후 비밀번호 변경으로 이동
	@GetMapping("goPwChange")
	public String goPwChange() {
		return "/member/searchPw";
	}
	
	// 비밀번호 변경
	@PostMapping("/pwChange")
	public String pwChange(@RequestParam(value = "userNo") int userNo, 
	                       @RequestParam("oldPw") String oldPw,
	                       @RequestParam("newPw") String newPw, 
	                       Model model) {
	    log.info("비밀번호 변경: userNo=" + userNo);

	    if (mservice.selectOldPw(userNo, oldPw) > 0) {
	        mservice.updateNewPw(oldPw, newPw, userNo);
	        model.addAttribute("msg", "비밀번호가 변경되었습니다.");
	        return "member/login"; // 로그인 페이지로 이동
	    }
	    
	    // 실패 시 메시지 추가
	    model.addAttribute("msg", "비밀번호 변경에 실패했습니다.");
	    return "member/searchPw"; // 비밀번호 찾기 페이지로 이동
	}

	//아이디 찾기 후 아이디 보여주는 화면 이동
	@GetMapping("/checkMyId")
	public String checkMyId(@RequestParam("userName") String userName, 
	                        @RequestParam("userEmail") String userEmail, 
	                        Model model) {
	    log.info("Searching for userName: " + userName + " and userEmail: " + userEmail);

	    // 서비스에서 userName과 userEmail로 아이디를 조회
	    String userId = mservice.checkMyId(userName, userEmail);

	    // userId를 모델에 담아 JSP로 전달
	    model.addAttribute("userId", userId);

	    // 결과를 보여줄 JSP로 이동
	    return "member/searchId";
	}
	
	

	


	
}

    
    