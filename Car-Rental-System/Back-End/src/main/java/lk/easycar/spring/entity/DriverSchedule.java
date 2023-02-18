package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class DriverSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int schedule_id;
    private LocalDate start_date;
    private LocalTime start_time;
    private LocalDate end_date;
    private LocalTime end_time;

    @ManyToOne
    @JoinColumn(name = "driver_nic", nullable = false)
    private Driver driver;
}
