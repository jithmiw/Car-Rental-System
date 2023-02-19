package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CarImageDetailDTO {

    private String car_reg_no;
    private String image_one;
    private String image_two;
    private String image_three;
    private String image_four;
}
