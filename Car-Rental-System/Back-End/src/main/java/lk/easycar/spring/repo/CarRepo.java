package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepo extends JpaRepository<Car, String> {

    List<Car> findCarByStatus(String status);
}
