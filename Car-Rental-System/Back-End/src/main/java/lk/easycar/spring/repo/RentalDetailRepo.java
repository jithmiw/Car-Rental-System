package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalDetailRepo extends JpaRepository<RentalDetail, String> {

    @Query(value = "SELECT * FROM RentalDetail WHERE car_reg_no=?1 && rental_status=?2 OR rental_status=?3", nativeQuery = true)
    List<RentalDetail> findRentalDetailByCar_Reg_noAndRental_status(String car_reg_no, String rental_status1, String rental_status2);

    @Query(value = "SELECT rental_id FROM RentalDetail ORDER BY rental_id DESC LIMIT 1", nativeQuery = true)
    String getLastRentalId();

    @Query(value = "SELECT * FROM RentalDetail WHERE rental_id=?1", nativeQuery = true)
    RentalDetail findRentalDetailByRental_id(String rental_id);

    @Query(value = "SELECT * FROM RentalDetail WHERE customer_nic=?1 && rental_status!=2", nativeQuery = true)
    List<RentalDetail> findRentalDetailByCustomer_nic(String customer_nic, String rental_status);

    @Query(value = "SELECT COUNT(*) FROM RentalDetail WHERE customer_nic=?1 && rental_status!=2", nativeQuery = true)
    int countRentalDetailByCustomer_nic(String customer_nic, String rental_status);
}
