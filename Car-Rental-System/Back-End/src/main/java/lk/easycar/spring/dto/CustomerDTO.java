package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerDTO {

    private String nic_no;
    private String license_no;
    private String customer_name;
    private String address;
    private String contact_no;
    private String email;
    private String username;
    private String password;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reg_date;
    private String nic_img;
    private String license_img;
}
