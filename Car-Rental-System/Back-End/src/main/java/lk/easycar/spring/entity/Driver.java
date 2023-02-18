package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Driver {
    @Id
    @Column(nullable = false)
    private String nic_no;
    private String driver_name;
    private String license_no;
    private String address;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    @CreationTimestamp
    private LocalDate reg_date;
}
