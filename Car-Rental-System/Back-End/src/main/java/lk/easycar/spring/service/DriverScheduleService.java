package lk.easycar.spring.service;

import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.DriverScheduleDTO;

import java.util.ArrayList;

public interface DriverScheduleService {
    void saveDriverSchedule(DriverScheduleDTO dto);
//
//    void updateDriverSchedule(DriverScheduleDTO dto);
//
//    void deleteRentalDetail(String rental_id);
//
//    ArrayList<RentalDetailDTO> getAllRentalDetail();

    ArrayList<DriverDTO> searchAvailableDriversForReservation(String pick_up_date, String return_date);
}
