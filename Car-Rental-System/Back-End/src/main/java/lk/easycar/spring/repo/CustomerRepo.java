package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, String> {

    Customer findCustomerByUsernameAndPassword(String username, String password);
}
