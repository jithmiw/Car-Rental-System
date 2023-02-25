package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.DriverScheduleDTO;
import lk.easycar.spring.entity.*;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.repo.DriverScheduleRepo;
import lk.easycar.spring.repo.RentalDetailRepo;
import lk.easycar.spring.service.DriverScheduleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DriverScheduleServiceImpl implements DriverScheduleService {

    @Autowired
    private DriverScheduleRepo driverScheduleRepo;

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveDriverSchedule(DriverScheduleDTO dto) {
        Driver driver = driverRepo.findById(dto.getDriver_nic()).get();
        RentalDetail rentalDetail = rentalDetailRepo.findById(dto.getRental_id()).get();
        DriverSchedule driverSchedule = new DriverSchedule(dto.getSchedule_id(), dto.getStart_date(), dto.getStart_time(), dto.getEnd_date(), dto.getEnd_time(), driver, rentalDetail);
        if (driverScheduleRepo.existsById(dto.getSchedule_id())) {
            throw new RuntimeException("Driver Schedule " + dto.getSchedule_id() + " already added");
        }
        driverScheduleRepo.save(driverSchedule);
    }

    @Override
    public ArrayList<DriverDTO> searchAvailableDriversForReservation(LocalDate pick_up_date, LocalDate return_date) {
        List<DriverDTO> availableDrivers = new ArrayList<>();
        if (!(driverScheduleRepo.findAll().isEmpty())) {
            List<DriverSchedule> driverSchedules = driverScheduleRepo.findDriverScheduleByRental_status("Rental");

            for (DriverSchedule driverSchedule : driverSchedules) {
                if (driverSchedule.getStart_date().isAfter(return_date) ||
                        driverSchedule.getEnd_date().isBefore(pick_up_date)) {
                    availableDrivers.add(mapper.map(driverSchedule.getDriver(), DriverDTO.class));
                }
            }
            if (!availableDrivers.isEmpty()) {
                return mapper.map(availableDrivers, new TypeToken<ArrayList<DriverDTO>>() {
                }.getType());
            }
            return mapper.map(driverRepo.findAll(), new TypeToken<ArrayList<DriverDTO>>() {
            }.getType());
        }
        return mapper.map(driverRepo.findAll(), new TypeToken<ArrayList<DriverDTO>>() {
        }.getType());
    }

    @Override
    public String generateNewScheduleId() {
        String schedule_id = "";
        schedule_id = driverScheduleRepo.getLastScheduleId();
        if (schedule_id != null) {
            int newRentalId = Integer.parseInt(schedule_id.replace("SID-", "")) + 1;
            return String.format("SID-%03d", newRentalId);
        }
        return "SID-001";
    }
}
