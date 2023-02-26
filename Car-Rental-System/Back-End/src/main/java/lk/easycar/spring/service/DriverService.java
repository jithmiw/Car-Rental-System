package lk.easycar.spring.service;

import lk.easycar.spring.dto.DriverDTO;

public interface DriverService {

    void saveDriver(DriverDTO dto);

    void updateDriver(DriverDTO dto);

    void deleteDriver(String nic_no);

    DriverDTO verifyDriver(String username, String password);

    DriverDTO getDriverByNic(String nic_no);

    String getDriverNicByRentalId(String rental_id);
}
