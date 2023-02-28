package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.PaymentDetailDTO;
import lk.easycar.spring.repo.PaymentDetailRepo;
import lk.easycar.spring.service.PaymentDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PaymentDetailServiceImpl implements PaymentDetailService {

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void savePaymentDetail(PaymentDetailDTO dto) {

    }

    @Override
    public String generateNewPaymentId() {
        String payment_id = "";
        payment_id = paymentDetailRepo.getLastPaymentId();
        if (payment_id != null) {
            int newPaymentId = Integer.parseInt(payment_id.replace("PID-", "")) + 1;
            return String.format("PID-%03d", newPaymentId);
        }
        return "PID-001";
    }
}
