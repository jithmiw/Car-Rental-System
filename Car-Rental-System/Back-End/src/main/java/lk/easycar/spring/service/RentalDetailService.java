package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarDTO;

import java.util.ArrayList;

public interface RentalDetailService {
//    void saveRentalDetail(RentalDetailDTO dto);
//
//    void updateRentalDetail(RentalDetailDTO dto);
//
//    void deleteRentalDetail(String rental_id);
//
//    ArrayList<RentalDetailDTO> getAllRentalDetail();

    ArrayList<CarDTO> searchAvailableCarsForReservation(String pick_up_date, String return_date);
}
