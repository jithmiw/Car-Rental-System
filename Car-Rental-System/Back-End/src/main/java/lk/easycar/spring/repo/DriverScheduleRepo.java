package lk.easycar.spring.repo;

import lk.easycar.spring.entity.DriverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DriverScheduleRepo extends JpaRepository<DriverSchedule, String> {

    @Query(value = "SELECT schedule_id FROM DriverSchedule ORDER BY schedule_id DESC LIMIT 1", nativeQuery = true)
    String getLastScheduleId();

    @Query(value = "SELECT driver_nic FROM DriverSchedule WHERE rental_id=?1", nativeQuery = true)
    String getDriverNicByRentalId(String rental_id);

    @Query(value = "SELECT * FROM DriverSchedule WHERE rental_id=?1", nativeQuery = true)
    DriverSchedule getDriverScheduleByRentalId(String rental_id);
}
