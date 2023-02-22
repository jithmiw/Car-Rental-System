package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.service.RentalDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/rentalDetail")
@CrossOrigin
public class RentalDetailController {

    @Autowired
    private RentalDetailService rentalDetailService;

    @GetMapping(params = {"pick_up_date","return_date"})
    public ResponseUtil searchAvailableCarsForReservation(@RequestParam String pick_up_date, @RequestParam String return_date) {
        ArrayList<CarDTO> availableCars = rentalDetailService.searchAvailableCarsForReservation(pick_up_date, return_date);
        return new ResponseUtil(200, "Loaded successfully", availableCars);
    }
}
