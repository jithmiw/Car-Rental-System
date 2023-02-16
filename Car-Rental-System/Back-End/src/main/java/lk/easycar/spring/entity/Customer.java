package lk.easycar.spring.entity;

import lk.easycar.spring.dto.RentalDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Customer {
    @Id
    private String nic_no;
    private String license_no;
    private String customer_name;
    private String address;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    private Date register_date;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<RentalDetail> rentalDetails;
}
