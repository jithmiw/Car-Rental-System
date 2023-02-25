package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.DriverScheduleDTO;
import lk.easycar.spring.dto.RentalDetailDTO;

import java.util.ArrayList;

public interface RentalDetailService {
    void saveRentalDetail(RentalDetailDTO dto, DriverScheduleDTO driverDTO);
//
//    void updateRentalDetail(RentalDetailDTO dto);
//
//    void deleteRentalDetail(String rental_id);
//
//    ArrayList<RentalDetailDTO> getAllRentalDetail();

    ArrayList<CarDTO> searchAvailableCarsForReservation(String pick_up_date, String return_date);

    String generateNewRentalId();

    RentalDetailDTO getRentalDetailByRentalId(String rental_id);
}
