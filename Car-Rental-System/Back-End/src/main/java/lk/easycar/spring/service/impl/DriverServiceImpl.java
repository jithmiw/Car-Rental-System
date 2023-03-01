package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.DriverScheduleDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.DriverSchedule;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.repo.DriverScheduleRepo;
import lk.easycar.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private DriverScheduleRepo driverScheduleRepo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveDriver(DriverDTO dto) {
        if (driverRepo.existsById(dto.getNic_no())) {
            throw new RuntimeException("Driver already registered");
        }
        Driver driver = mapper.map(dto, Driver.class);
        driverRepo.save(driver);
    }

    @Override
    public void updateDriver(DriverDTO dto) {
        if (!driverRepo.existsById(dto.getNic_no())) {
            throw new RuntimeException("No such a driver, Please enter valid nic no");
        }
        driverRepo.save(mapper.map(dto, Driver.class));
    }

    @Override
    public void changeDriver(String rental_id, String nic) {
        DriverSchedule driverSchedule = driverScheduleRepo.getDriverScheduleByRentalId(rental_id);
        if (driverSchedule == null) {
            throw new RuntimeException("No such a reservation, Please enter valid rental id");
        }
        driverSchedule.setDriver(driverRepo.findDriverByNic_no(nic));
        driverScheduleRepo.save(driverSchedule);
    }

    @Override
    public void deleteDriver(String nic_no) {
        if (!driverRepo.existsById(nic_no)) {
            throw new RuntimeException("No such a driver, Please enter valid nic no");
        }
        driverRepo.deleteById(nic_no);
    }

    @Override
    public DriverDTO getDriverByNic(String nic) {
        Driver driver = driverRepo.findDriverByNic_no(nic);
        if (driver != null) {
            return mapper.map(driver, DriverDTO.class);
        }
        return null;
    }

    @Override
    public DriverDTO verifyDriver(String username, String password) {
        Driver driver = driverRepo.findDriverByUsernameAndPassword(username, password);
        if (!(driver == null)) {
            return mapper.map(driver, DriverDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public String getDriverNicByRentalId(String rental_id) {
        return driverScheduleRepo.getDriverNicByRentalId(rental_id);
    }

    @Override
    public ArrayList<String> getAllDriversNic() {
        List<Driver> all = driverRepo.findAll();
        ArrayList<String> drivers = new ArrayList<>();
        for (Driver driver : all) {
            drivers.add(driver.getNic_no());
        }
        return drivers;
    }

    @Override
    public ArrayList<DriverScheduleDTO> getDriverSchedulesByDriverNic(String nic) {
        List<DriverSchedule> driverSchedules = driverScheduleRepo.findDriverScheduleByDriver_nic(nic);
        ArrayList<DriverScheduleDTO> schedules = new ArrayList<>();
        if (driverSchedules.size() != 0) {
            for (DriverSchedule schedule : driverSchedules) {
                if (!schedule.getRentalDetail().getRental_status().equals("Closed")) {
                    schedules.add(new DriverScheduleDTO(schedule.getSchedule_id(), schedule.getStart_date(), schedule.getStart_time(),
                            schedule.getEnd_date(), schedule.getEnd_time(), schedule.getDriver().getNic_no(), schedule.getRentalDetail().getRental_id()));

                }
            }
            return schedules;
        }
        return null;
    }

    @Override
    public ArrayList<DriverDTO> getAllDrivers() {
        List<Driver> all = driverRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<DriverDTO>>() {
        }.getType());
    }
}
