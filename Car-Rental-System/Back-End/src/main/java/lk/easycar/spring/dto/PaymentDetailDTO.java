package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PaymentDetailDTO {

    private String payment_id;
    private LocalDate payment_date;
    private BigDecimal rental_fee;
    private BigDecimal driver_fee;
    private BigDecimal damage_fee;
    private BigDecimal extra_km_fee;
    private BigDecimal returned_amount;
    private BigDecimal total_payment;
    private int extra_km;

    private RentalDetailDTO rentalDetail;
}
