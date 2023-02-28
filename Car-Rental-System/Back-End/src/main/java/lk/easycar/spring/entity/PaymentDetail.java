package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

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
    @CreationTimestamp
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

    public PaymentDetail(String payment_id, BigDecimal rental_fee, BigDecimal driver_fee, BigDecimal damage_fee, BigDecimal extra_km_fee, BigDecimal returned_amount, BigDecimal total_payment, int extra_km, RentalDetail rentalDetail) {
        this.payment_id = payment_id;
        this.rental_fee = rental_fee;
        this.driver_fee = driver_fee;
        this.damage_fee = damage_fee;
        this.extra_km_fee = extra_km_fee;
        this.returned_amount = returned_amount;
        this.total_payment = total_payment;
        this.extra_km = extra_km;
        this.rentalDetail = rentalDetail;
    }
}
