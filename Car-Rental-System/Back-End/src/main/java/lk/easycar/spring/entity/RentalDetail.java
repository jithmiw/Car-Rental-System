package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class RentalDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rental_id;
    private LocalDate pick_up_date;
    private LocalDate return_date;
    private LocalTime pick_up_time;
    private LocalTime return_time;
    private String pick_up_venue;
    private String return_venue;
    private String rental_status;
    private String driver_status;
    @CreationTimestamp
    private LocalDate reserved_date;

    @ManyToOne
    @JoinColumn(name = "customer_nic", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "car_reg_no", nullable = false)
    private Car car;
}
