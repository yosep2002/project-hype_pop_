package org.hype.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/goodsStore/*")
public class GoodsController {
    @GetMapping("/goodsDetails")
    public String search(@RequestParam("goodsName") String goodsName, Model model) {
        // searchData를 사용하여 검색 로직을 처리
        System.out.println("검색 데이터: " + goodsName);
        
        //DB에서 정보 받아오는 로직이 여기있어야함
        
        // searchData를 모델에 추가하여 JSP로 전달
        model.addAttribute("goodsName", goodsName);
        
        return "/goodsStore/goodsDetails"; // 검색 결과를 보여줄 JSP 페이지 이름
    }
    
  
}
