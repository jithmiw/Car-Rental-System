package lk.easycar.spring.service;

import lk.easycar.spring.dto.PaymentDetailDTO;

import java.util.ArrayList;

public interface PaymentDetailService {
    void savePaymentDetail(PaymentDetailDTO dto);

    String generateNewPaymentId();

    ArrayList<PaymentDetailDTO> getAllPaymentDetails();
}
