package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.repo.CarRepo;
import lk.easycar.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
        Car car = mapper.map(dto, Car.class);
        carRepo.save(car);
    }
}