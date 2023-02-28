package lk.easycar.spring.service;

import lk.easycar.spring.dto.PaymentDetailDTO;

public interface PaymentDetailService {
    void savePaymentDetail(PaymentDetailDTO dto);

    String generateNewPaymentId();
}
