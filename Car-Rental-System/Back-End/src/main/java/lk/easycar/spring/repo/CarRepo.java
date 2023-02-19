package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepo extends JpaRepository<Car, String> {
}
