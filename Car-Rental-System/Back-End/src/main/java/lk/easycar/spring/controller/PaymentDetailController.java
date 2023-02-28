package lk.easycar.spring.controller;

import lk.easycar.spring.dto.PaymentDetailDTO;
import lk.easycar.spring.service.PaymentDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paymentDetail")
@CrossOrigin
public class PaymentDetailController {

    @Autowired
    private PaymentDetailService paymentDetailService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil savePaymentDetail(@RequestBody PaymentDetailDTO dto) {
        paymentDetailService.savePaymentDetail(dto);
        return new ResponseUtil(200, "Paid successfully", null);
    }

    @GetMapping(path = "/generatePaymentId")
    public ResponseUtil generatePaymentId() {
        return new ResponseUtil(200, "Rental id generated", paymentDetailService.generateNewPaymentId());
    }
}
