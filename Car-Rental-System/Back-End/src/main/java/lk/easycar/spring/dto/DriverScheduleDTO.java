package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Time;
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
    private String rental_id;

    public DriverScheduleDTO(LocalDate start_date, LocalTime start_time, LocalDate end_date, LocalTime end_time, String driver_nic, String rental_id) {
        this.start_date = start_date;
        this.start_time = start_time;
        this.end_date = end_date;
        this.end_time = end_time;
        this.driver_nic = driver_nic;
        this.rental_id = rental_id;
    }
}
