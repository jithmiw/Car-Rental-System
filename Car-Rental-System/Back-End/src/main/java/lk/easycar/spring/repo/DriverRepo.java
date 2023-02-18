package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepo extends JpaRepository<Driver, String> {

    Driver findDriverByUsernameAndPassword(String username, String password);
}
