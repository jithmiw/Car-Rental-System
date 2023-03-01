package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.PaymentDetailDTO;
import lk.easycar.spring.entity.PaymentDetail;
import lk.easycar.spring.entity.RentalDetail;
import lk.easycar.spring.repo.PaymentDetailRepo;
import lk.easycar.spring.repo.RentalDetailRepo;
import lk.easycar.spring.service.PaymentDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PaymentDetailServiceImpl implements PaymentDetailService {

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void savePaymentDetail(PaymentDetailDTO dto) {
        RentalDetail rentalDetail = rentalDetailRepo.findById(dto.getRental_id()).get();
        PaymentDetail paymentDetail = new PaymentDetail(dto.getPayment_id(), dto.getRental_fee(), dto.getDriver_fee(), dto.getDamage_fee(), dto.getExtra_km_fee(),
                dto.getReturned_amount(), dto.getTotal_payment(), dto.getExtra_km(), rentalDetail);
        if (paymentDetailRepo.existsById(paymentDetail.getPayment_id())) {
            throw new RuntimeException("Payment " + paymentDetail.getPayment_id() + " already added");
        }
        paymentDetailRepo.save(paymentDetail);

        // update rental status
        paymentDetail.getRentalDetail().setRental_status("Closed");
        rentalDetailRepo.save(rentalDetail);
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

    @Override
    public ArrayList<PaymentDetailDTO> getAllPaymentDetails() {
        List<PaymentDetail> all = paymentDetailRepo.findAll();
        ArrayList<PaymentDetailDTO> payments = new ArrayList<>();
        if (all.size() != 0) {
            for (PaymentDetail detail : all) {
                payments.add(new PaymentDetailDTO(detail.getPayment_id(), detail.getPayment_date(), detail.getRental_fee(),
                        detail.getDriver_fee(), detail.getDamage_fee(), detail.getExtra_km_fee(), detail.getReturned_amount(),
                        detail.getTotal_payment(), detail.getExtra_km(), detail.getRentalDetail().getRental_id()));
            }
            return payments;
        }
        return null;
    }
}
