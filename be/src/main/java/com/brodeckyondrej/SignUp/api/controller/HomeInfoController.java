package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.BaseController;
import com.brodeckyondrej.SignUp.business.dto.HomeInfoDto;
import com.brodeckyondrej.SignUp.business.service.HomeInfoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("home-info")
@AllArgsConstructor
public class HomeInfoController extends BaseController {

    private final HomeInfoService homeInfoService;

    @GetMapping
    public ResponseEntity<HomeInfoDto> getHomeInfoCount() {
        return ResponseEntity.ok(homeInfoService.getHomeInfo());
    }

}
