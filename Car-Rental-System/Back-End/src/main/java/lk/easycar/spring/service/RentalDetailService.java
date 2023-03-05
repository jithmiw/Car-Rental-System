package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.RentalDetailDTO;

import java.util.ArrayList;

public interface RentalDetailService {
    void saveRentalDetail(RentalDetailDTO dto, String scheduleId);

    void updateRentalDetail(RentalDetailDTO dto);

    ArrayList<CarDTO> searchAvailableCarsForReservation(String pick_up_date, String return_date);

    String generateNewRentalId();

    RentalDetailDTO getRentalDetailByRentalId(String rental_id);

    ArrayList<RentalDetailDTO> getRentalRequests();

    ArrayList<RentalDetailDTO> getRentalRequestsByCustomerNic(String nic);

    int countRentalRequestsByCustomerNic(String nic);
}
