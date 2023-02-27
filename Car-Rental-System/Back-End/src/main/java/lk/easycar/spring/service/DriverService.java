package lk.easycar.spring.service;

import lk.easycar.spring.dto.DriverDTO;

import java.util.ArrayList;

public interface DriverService {

    void saveDriver(DriverDTO dto);

    void updateDriver(DriverDTO dto);

    void deleteDriver(String nic_no);

    DriverDTO verifyDriver(String username, String password);

    DriverDTO getDriverByNic(String nic_no);

    String getDriverNicByRentalId(String rental_id);

    ArrayList<String> getAllDriversNic();

    void changeDriver(String rental_id, String nic);
}
