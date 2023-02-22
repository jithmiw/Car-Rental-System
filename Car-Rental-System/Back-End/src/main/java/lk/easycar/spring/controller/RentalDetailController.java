package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.service.DriverScheduleService;
import lk.easycar.spring.service.RentalDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;

@RestController
@RequestMapping("/rentalDetail")
@CrossOrigin
public class RentalDetailController {

    @Autowired
    private RentalDetailService rentalDetailService;

    @Autowired
    private DriverScheduleService driverScheduleService;

    @GetMapping(path = "/generateRentalId")
    public ResponseUtil generateRentalId() {
        return new ResponseUtil(200, "Rental id generated", rentalDetailService.generateNewRentalId());
    }

    @GetMapping(params = {"pick_up_date","return_date"})
    public ResponseUtil searchAvailableCarsForReservation(@RequestParam String pick_up_date, @RequestParam String return_date) {
        ArrayList<CarDTO> availableCars = rentalDetailService.searchAvailableCarsForReservation(pick_up_date, return_date);
        return new ResponseUtil(200, "Loaded successfully", availableCars);
    }

    @PostMapping
    public ResponseUtil makeReservation(@RequestBody RentalDetailDTO dto) {
        ArrayList<DriverDTO> drivers = driverScheduleService.searchAvailableDriversForReservation(String.valueOf(dto.getPick_up_date()), String.valueOf(dto.getReturn_date()));
        Collections.shuffle(drivers);
        dto.setCustomer_nic(drivers.get(0).getNic_no());
        rentalDetailService.saveRentalDetail(dto);
        return new ResponseUtil(200, "Rental Request sent successfully", null);
    }
}
