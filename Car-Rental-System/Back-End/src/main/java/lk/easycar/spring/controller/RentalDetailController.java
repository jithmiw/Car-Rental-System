package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.DriverScheduleDTO;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.service.DriverScheduleService;
import lk.easycar.spring.service.RentalDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @GetMapping(params = {"pick_up_date", "return_date"})
    public ResponseUtil searchAvailableCarsForReservation(@RequestParam String pick_up_date, @RequestParam String return_date) {
        ArrayList<CarDTO> availableCars = rentalDetailService.searchAvailableCarsForReservation(pick_up_date, return_date);
        return new ResponseUtil(200, "Loaded successfully", availableCars);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil makeReservation(@RequestBody RentalDetailDTO dto) {
        String scheduleId = null;
        if (dto.getDriver_status().equals("Yes")) {
            scheduleId = driverScheduleService.generateNewScheduleId();
        }
        rentalDetailService.saveRentalDetail(dto, scheduleId);
        return new ResponseUtil(200, "Rental Request sent successfully", null);
    }
}
