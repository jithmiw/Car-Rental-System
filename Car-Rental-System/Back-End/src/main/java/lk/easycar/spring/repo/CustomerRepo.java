package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer, String> {

    Customer findCustomerByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT * FROM Customer WHERE nic_no=?1", nativeQuery = true)
    Customer findCustomerByNic_no(String nic_no);
}
