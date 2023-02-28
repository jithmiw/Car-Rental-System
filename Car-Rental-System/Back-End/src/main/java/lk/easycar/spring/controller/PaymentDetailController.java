package lk.easycar.spring.controller;

import lk.easycar.spring.service.PaymentDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/paymentDetail")
@CrossOrigin
public class PaymentDetailController {

    @Autowired
    private PaymentDetailService paymentDetailService;

    @GetMapping(path = "/generatePaymentId")
    public ResponseUtil generatePaymentId() {
        return new ResponseUtil(200, "Rental id generated", paymentDetailService.generateNewPaymentId());
    }
}
