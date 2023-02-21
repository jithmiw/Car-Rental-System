package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalDetailRepo extends JpaRepository<RentalDetail, String> {

    @Query(value = "SELECT * FROM RentalDetail WHERE rental_id?1 && rental_status?2", nativeQuery = true)
    List<RentalDetail> findRentalDetailByCar_Reg_noAndRental_status(String car_reg_no, String rental_status);
}
