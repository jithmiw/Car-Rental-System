package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalDetailDTO {

    private String rental_id;
    private LocalDate pick_up_date;
    private LocalDate return_date;
    private LocalTime pick_up_time;
    private LocalTime return_time;
    private String pick_up_venue;
    private String return_venue;
    private String rental_status;
    private String driver_status;
    private LocalDate reserved_date;

    private String customer_nic;
    private String car_reg_no;
}
