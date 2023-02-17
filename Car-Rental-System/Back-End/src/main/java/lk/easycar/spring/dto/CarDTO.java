package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarDTO {

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
}
