package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.service.CarService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CarDTO dto) {
        carService.saveCar(dto);
        return new ResponseUtil(200, "Car added successfully", null);
    }

    @GetMapping
    public ResponseUtil getAllCars() {
        return new ResponseUtil(200, "Loaded successfully", carService.getAllCars());
    }
}
