package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentDetailRepo extends JpaRepository<RentalDetail, String> {

    @Query(value = "SELECT payment_id FROM PaymentDetail ORDER BY payment_id DESC LIMIT 1", nativeQuery = true)
    String getLastPaymentId();
}
