package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class RentalDetail {
    @Id
    @Column(nullable = false)
    private String rental_id;
    private Date pick_up_date;
    private Date return_date;
    private Time pick_up_time;
    private Time return_time;
    private String pick_up_venue;
    private String return_venue;
    private String rental_status;
    private String driver_status;

    @ManyToOne
    @JoinColumn(name = "customer_nic", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "car_reg_no", nullable = false)
    private Car car;
}
