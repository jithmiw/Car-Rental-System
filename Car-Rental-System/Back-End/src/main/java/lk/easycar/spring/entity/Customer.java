package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;
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
    private Date reg_date;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RentalDetail> rentalDetails;
}