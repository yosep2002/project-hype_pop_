package org.hype.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hype.domain.cartVO;
import org.hype.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/purchase/api")
public class PurchaseRestController {

	@Autowired
	private PurchaseService purchaseService;

	// �긽�뭹 �궘�젣
	@DeleteMapping("deleteItem/{gno}")
	public ResponseEntity<String> deleteItem(@PathVariable int gno, @RequestParam int userNo) {
		log.info("Deleting item for userNo: " + userNo + ", gno: " + gno);

		purchaseService.deleteItem(userNo, gno);

		try {
			return ResponseEntity.ok("�긽�뭹�씠 �꽦怨듭쟻�쑝濡� �궘�젣�릺�뿀�뒿�땲�떎.");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("�긽�뭹 �궘�젣�뿉 �떎�뙣�븯���뒿�땲�떎."); // �삤瑜� 諛쒖깮 �떆 硫붿떆吏� 諛섑솚
		}

	}

	// �옣諛붽뎄�땲�뿉 �븘�씠�뀥 異붽�
	@RequestMapping(value = "/addCart", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<String> addToCart(@RequestBody cartVO cvo) {

		int userNo = cvo.getUserNo();
		int gno = cvo.getGno();

		// �씠誘� �옣諛붽뎄�땲�뿉 �엳�뒗 寃쎌슦
		int alreadyInCart = purchaseService.alreadyInCart(userNo, gno);

		log.info("Adding to cart for userNo: " + userNo + ", gno: " + gno);

		if (alreadyInCart > 0) {
			return new ResponseEntity<>("이미 장바구니에 담긴 상품입니다", HttpStatus.OK); // �삉�뒗 HttpStatus.INTERNAL_SERVER_ERROR
																				// �벑�쓣 �궗�슜�븷 �닔 �엳�쓬
		}
		purchaseService.addToCart(cvo);
		return new ResponseEntity<>("장바구니에 상품이 담겼습니다.", HttpStatus.OK);
	}

	@PostMapping("/addToPayList")
	public ResponseEntity<String> addToPayList(@RequestBody cartVO cvo) {
		log.info("addToPayList.. " + cvo);

		try {
			// 데이터 처리 로직
			purchaseService.addToPayList(cvo);

			// 성공적으로 처리된 후 응답할 JSON 데이터를 생성 (여기서 response는 JSON 형식으로 반환)
			String response = "{\"status\":\"success\", \"message\":\"결제 목록에 추가되었습니다.\"}";

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON) // JSON 타입으로 응답 설정
					.body(response); // 실제 응답 내용 (JSON 문자열)

		} catch (Exception e) {
			log.error("에러 발생:", e);
			// 서버 오류 발생 시 JSON 형태로 응답
			String errorResponse = "{\"status\":\"error\", \"message\":\"서버 오류 발생\"}";

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.APPLICATION_JSON) // JSON
																													// 타입으로
																													// 응답
																													// 설정
					.body(errorResponse); // 오류 메시지 반환
		}
	}

	// 장바구니 데이터 반환 (Spring Controller)
	@GetMapping("/getCartItems")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> getCartItems(@RequestParam int userNo) {
		// userNo로 장바구니 데이터를 가져오는 로직
		List<cartVO> cartItems = purchaseService.getCartInfo(userNo);
		log.info("Get cart info: " + cartItems);

		// cartItems 리스트를 Map 형태로 변환
		List<Map<String, Object>> cartItemsList = new ArrayList<>();
		for (cartVO item : cartItems) {
			Map<String, Object> itemMap = new HashMap<>();
			itemMap.put("gno", item.getGno());
			itemMap.put("userNo", item.getUserNo());
			itemMap.put("camount", item.getCamount());
			cartItemsList.add(itemMap);
		}

		// JSON 형태로 반환 (명시적으로 JSON으로 설정)
		Map<String, Object> response = new HashMap<>();
		response.put("cartItems", cartItemsList);

		// ResponseEntity로 응답 반환 (JSON Content-Type 명시)
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON) // JSON 타입으로 응답 설정
				.body(response);
	}

}