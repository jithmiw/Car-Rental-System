package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Car {
    @Id
    @Column(nullable = false)
    private String reg_no;
    private String brand;
    private String type;
    private String transmission_type;
    private String color;
    private int no_of_passengers;
    private String fuel_type;
    private BigDecimal daily_rate;
    private BigDecimal monthly_rate;
    private int free_km_day;
    private int free_km_month;
    private BigDecimal extra_km_price;
    private BigDecimal ldw_payment;
    private String status;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RentalDetail> rentalDetails;
}
