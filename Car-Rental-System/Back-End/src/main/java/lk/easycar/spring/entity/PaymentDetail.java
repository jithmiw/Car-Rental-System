package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class PaymentDetail {
    @Id
    private String payment_id;
    private LocalDate payment_date;
    private BigDecimal rental_fee;
    private BigDecimal driver_fee;
    private BigDecimal damage_fee;
    private BigDecimal extra_km_fee;
    private BigDecimal returned_amount;
    private BigDecimal total_payment;
    private int extra_km;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id")
    private RentalDetail rentalDetail;
}
