package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, String> {

    Admin findAdminByUsernameAndPassword(String username, String password);
}
