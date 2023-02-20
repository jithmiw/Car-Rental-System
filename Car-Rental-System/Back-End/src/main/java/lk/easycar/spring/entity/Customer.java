package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Customer {
    @Id
    @Column(nullable = false)
    private String nic_no;
    private String license_no;
    private String customer_name;
    private String address;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    @CreationTimestamp
    private LocalDate reg_date;
    private String nic_img;
    private String license_img;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RentalDetail> rentalDetails;
}
