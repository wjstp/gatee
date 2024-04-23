package io.ssafy.gatee.domain.family.api;

import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/family")
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveFamily(@RequestBody FamilySaveReq familySaveReq) {
        familyService.saveFamily(familySaveReq);
    }
}
