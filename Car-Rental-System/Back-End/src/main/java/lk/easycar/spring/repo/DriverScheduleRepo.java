package lk.easycar.spring.repo;

import lk.easycar.spring.entity.DriverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverScheduleRepo extends JpaRepository<DriverSchedule, String> {

    @Query(value = "SELECT schedule_id FROM DriverSchedule ORDER BY schedule_id DESC LIMIT 1", nativeQuery = true)
    String getLastScheduleId();
}
