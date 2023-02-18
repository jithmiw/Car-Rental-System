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
public class DriverScheduleDTO {

    private Long schedule_id;
    private LocalDate start_date;
    private LocalTime start_time;
    private LocalDate end_date;
    private LocalTime end_time;

    private String driver_nic;
}
