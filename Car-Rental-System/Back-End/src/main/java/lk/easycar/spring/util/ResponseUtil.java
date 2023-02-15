package lk.easycar.spring.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ResponseUtil {

    private int status;
    private String message;
    private Object data;
}
