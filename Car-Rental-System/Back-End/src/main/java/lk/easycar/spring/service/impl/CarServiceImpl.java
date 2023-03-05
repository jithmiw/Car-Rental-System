package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.repo.CarRepo;
import lk.easycar.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCar(CarDTO dto) {
        if (carRepo.existsById(dto.getReg_no())) {
            throw new RuntimeException("Car already registered");
        }
        switch (dto.getStatus()) {
            case "1":
                dto.setStatus("Available");
                break;
            case "2":
                dto.setStatus("Not Available");
                break;
            case "3":
                dto.setStatus("Reserved");
                break;
        }
        carRepo.save(mapper.map(dto, Car.class));
    }

    @Override
    public void updateCar(CarDTO dto) {
        if (!carRepo.existsById(dto.getReg_no())) {
            throw new RuntimeException("No such a car, Please enter valid registration no");
        }
        switch (dto.getStatus()) {
            case "1":
                dto.setStatus("Available");
                break;
            case "2":
                dto.setStatus("Not Available");
                break;
            case "3":
                dto.setStatus("Reserved");
                break;
        }
        carRepo.save(mapper.map(dto, Car.class));
    }

    @Override
    public void deleteCar(String reg_no) {
        if (!carRepo.existsById(reg_no)) {
            throw new RuntimeException("No such a car, Please enter valid registration no");
        }
        carRepo.deleteById(reg_no);
    }

    @Override
    public ArrayList<CarDTO> getAllCars() {
        List<Car> all = carRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<CarDTO>>() {
        }.getType());
    }

    @Override
    public CarDTO findCarByRegNo(String reg_no) {
        Car car = carRepo.findById(reg_no).get();
        return mapper.map(car, CarDTO.class);
    }
}
