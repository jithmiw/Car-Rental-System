package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarImageDetailDTO;

public interface CarImageDetailService {
    void saveCarImageDetail(CarImageDetailDTO dto);

    CarImageDetailDTO getCarImageDetailByRegNo(String reg_no);
}
