package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Time;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalDetailDTO {

    private String rental_id;
    private Date pick_up_date;
    private Date return_date;
    private Time pick_up_time;
    private Time return_time;
    private String pick_up_venue;
    private String return_venue;
    private String rental_status;
    private String driver_status;

    private String customer_nic;
    private String car_reg_no;
}
