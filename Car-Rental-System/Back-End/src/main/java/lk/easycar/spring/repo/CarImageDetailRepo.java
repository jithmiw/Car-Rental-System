package lk.easycar.spring.repo;

import lk.easycar.spring.entity.CarImageDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarImageDetailRepo extends JpaRepository<CarImageDetail, String> {
}
