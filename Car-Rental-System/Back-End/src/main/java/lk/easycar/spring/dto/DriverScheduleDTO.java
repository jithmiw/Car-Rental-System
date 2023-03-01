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
public class DriverScheduleDTO {

    private String schedule_id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate start_date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime start_time;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate end_date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime end_time;

    private String driver_nic;
    private String rental_id;
}
