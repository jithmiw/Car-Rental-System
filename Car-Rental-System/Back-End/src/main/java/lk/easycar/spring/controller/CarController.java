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
    public ResponseUtil saveCar(@ModelAttribute CarDTO dto) {
        carService.saveCar(dto);
        return new ResponseUtil(200, "Car added successfully", null);
    }

    @PutMapping
    public ResponseUtil updateCar(@RequestBody CarDTO dto) {
        carService.updateCar(dto);
        return new ResponseUtil(200, "Reg no: " + dto.getReg_no() + " car updated successfully", null);
    }

    @DeleteMapping(params = {"reg_no"})
    public ResponseUtil deleteCar(@RequestParam String reg_no) {
        carService.deleteCar(reg_no);
        return new ResponseUtil(200, "Reg no: " + reg_no + " car deleted successfully", null);
    }

    @GetMapping(params = {"reg_no"})
    public ResponseUtil findCarByRegNo(@RequestParam String reg_no) {
        return new ResponseUtil(200, "Loaded successfully", carService.findCarByRegNo(reg_no));
    }

    @GetMapping
    public ResponseUtil getAllCars() {
        return new ResponseUtil(200, "Loaded successfully", carService.getAllCars());
    }
}
