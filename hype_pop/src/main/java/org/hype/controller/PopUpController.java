package org.hype.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/hypePop/*")
public class PopUpController {
    @GetMapping("/hypePop/search")
    public String search(@RequestParam("searchData") String searchData, Model model) {
        // searchData�� ����Ͽ� �˻� ������ ó��
        System.out.println("�˻� ������: " + searchData);
        
        //DB���� ���� �޾ƿ��� ������ �����־����
        
        // searchData�� �𵨿� �߰��Ͽ� JSP�� ����
        model.addAttribute("searchData", searchData);
        
        return "/popUp/searchResults"; // �˻� ����� ������ JSP ������ �̸�
    }
    
    @GetMapping("/hypePop/popUpDetails")
    public String popUpDetails(@RequestParam("storeName") String storeName, Model model) {
        // searchData�� ����Ͽ� �˻� ������ ó��
        System.out.println("����� �̸�: " + storeName);
        
        //DB���� ���� �޾ƿ��� ������ �����־����
        
        // searchData�� �𵨿� �߰��Ͽ� JSP�� ����
        model.addAttribute("storeName", storeName);
        
        return "/popUp/popUpDetails"; // �˻� ����� ������ JSP ������ �̸�
    }
}
