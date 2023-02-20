package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarImageDetailDTO;
import lk.easycar.spring.service.CarImageDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carImageDetail")
@CrossOrigin
public class CarImageDetailController {

    @Autowired
    private CarImageDetailService carImageDetailService;

    @GetMapping(path = "/{reg_no}")
    public ResponseUtil getCarImagesByRegNo(@PathVariable String reg_no) {
        CarImageDetailDTO carImageDetailDTO = carImageDetailService.getCarImageDetailByRegNo(reg_no);
        return new ResponseUtil(200, "Car images loaded successfully", carImageDetailDTO);
    }
}
