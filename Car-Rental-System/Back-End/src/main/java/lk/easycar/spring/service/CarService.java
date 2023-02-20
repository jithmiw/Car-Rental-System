package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarDTO;

import java.util.ArrayList;

public interface CarService {
    void saveCar(CarDTO dto);

    ArrayList<CarDTO> getAllCars();
}
