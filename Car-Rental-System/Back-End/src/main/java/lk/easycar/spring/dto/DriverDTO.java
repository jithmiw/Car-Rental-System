package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class DriverDTO {

    private String nic_no;
    private String driver_name;
    private String license_no;
    private String address;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reg_date;
}
