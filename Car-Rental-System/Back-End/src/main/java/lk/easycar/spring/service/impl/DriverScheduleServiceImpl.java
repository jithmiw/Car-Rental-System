package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.DriverScheduleDTO;
import lk.easycar.spring.entity.DriverSchedule;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.repo.DriverScheduleRepo;
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
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveDriverSchedule(DriverScheduleDTO dto) {

    }

    @Override
    public ArrayList<DriverDTO> searchAvailableDriversForReservation(String pick_up_date, String return_date) {
        List<DriverDTO> availableDrivers = new ArrayList<>();
        if (!(driverScheduleRepo.findAll().isEmpty())) {
            List<DriverSchedule> driverSchedules = driverScheduleRepo.findDriverScheduleByRental_status("Rental");

            for (DriverSchedule driverSchedule : driverSchedules) {
                if (driverSchedule.getStart_date().isAfter(LocalDate.parse(return_date)) ||
                        driverSchedule.getEnd_date().isBefore(LocalDate.parse(pick_up_date))) {
                    availableDrivers.add(mapper.map(driverSchedule.getDriver(), DriverDTO.class));
                }
            }
            if (!availableDrivers.isEmpty()) {
                return mapper.map(availableDrivers, new TypeToken<ArrayList<DriverDTO>>() {
                }.getType());
            }
            return null;
        }
        return mapper.map(driverRepo.findAll(), new TypeToken<ArrayList<DriverDTO>>() {
        }.getType());
    }
}
