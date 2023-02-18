package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public DriverDTO verifyDriver(String username, String password) {
        Driver driver = driverRepo.findDriverByUsernameAndPassword(username, password);
        if (!(driver == null)) {
            return mapper.map(driver, DriverDTO.class);
        } else {
            return null;
        }
    }
}
