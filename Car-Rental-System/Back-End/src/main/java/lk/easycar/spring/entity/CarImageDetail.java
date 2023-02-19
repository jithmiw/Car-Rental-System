package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class CarImageDetail {
    @Id
    private String car_reg_no;

    private String image_one;
    private String image_two;
    private String image_three;
    private String image_four;
}
