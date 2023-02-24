package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class RentalDetail {
    @Id
    @Column(nullable = false)
    private String rental_id;
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
    private String bank_slip_img;

    @ManyToOne
    @JoinColumn(name = "customer_nic", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "car_reg_no", nullable = false)
    private Car car;

    public RentalDetail(String rental_id, LocalDate pick_up_date, LocalDate return_date, LocalTime pick_up_time, LocalTime return_time, String pick_up_venue, String return_venue, String rental_status, String driver_status, Customer customer, Car car) {
        this.rental_id = rental_id;
        this.pick_up_date = pick_up_date;
        this.return_date = return_date;
        this.pick_up_time = pick_up_time;
        this.return_time = return_time;
        this.pick_up_venue = pick_up_venue;
        this.return_venue = return_venue;
        this.rental_status = rental_status;
        this.driver_status = driver_status;
        this.customer = customer;
        this.car = car;
    }
}
