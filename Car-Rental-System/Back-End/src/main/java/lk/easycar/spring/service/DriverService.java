package lk.easycar.spring.service;

import lk.easycar.spring.dto.DriverDTO;

public interface DriverService {

    DriverDTO verifyDriver(String username, String password);
}
