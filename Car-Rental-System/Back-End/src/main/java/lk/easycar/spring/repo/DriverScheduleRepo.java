package lk.easycar.spring.repo;

import lk.easycar.spring.entity.DriverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverScheduleRepo extends JpaRepository<DriverSchedule, String> {

    @Query(value = "SELECT * FROM DriverSchedule WHERE rental_id.rental_status=?1", nativeQuery = true)
    List<DriverSchedule> findDriverScheduleByRental_status(String rental_status);
}
