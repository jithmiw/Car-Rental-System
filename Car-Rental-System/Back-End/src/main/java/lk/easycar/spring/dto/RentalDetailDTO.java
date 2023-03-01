package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pick_up_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate return_date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime pick_up_time;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime return_time;
    private String pick_up_venue;
    private String return_venue;
    private String rental_status;
    private String driver_status;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reserved_date;
    private String bank_slip_img;

    private String customer_nic;
    private String car_reg_no;
}
