package lk.easycar.spring.repo;

import lk.easycar.spring.entity.CarImageDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarImageDetailRepo extends JpaRepository<CarImageDetail, String> {

    @Query(value = "SELECT * FROM CarImageDetail WHERE car_reg_no=?1", nativeQuery = true)
    CarImageDetail findCarImageDetailByReg_no(String reg_no);
}
