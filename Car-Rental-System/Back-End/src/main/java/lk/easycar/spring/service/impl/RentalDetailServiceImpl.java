package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.RentalDetail;
import lk.easycar.spring.repo.CarRepo;
import lk.easycar.spring.repo.RentalDetailRepo;
import lk.easycar.spring.service.RentalDetailService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RentalDetailServiceImpl implements RentalDetailService {

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ArrayList<CarDTO> searchAvailableCarsForReservation(String pick_up_date, String return_date) {
        List<Car> availableCars = carRepo.findCarByStatus("Available");
        List<Car> reservedCars = carRepo.findCarByStatus("Reserved");

        for (Car car : reservedCars) {
            List<RentalDetail> rentalDetails = rentalDetailRepo.findRentalDetailByCar_Reg_noAndRental_status(car.getReg_no(), "Rental");
            for (RentalDetail detail : rentalDetails) {
                if (detail.getPick_up_date().isAfter(LocalDate.parse(return_date)) ||
                        detail.getReturn_date().isBefore(LocalDate.parse(pick_up_date))) {
                    availableCars.add(detail.getCar());
                }
            }
        }
        if (!availableCars.isEmpty()) {
            return mapper.map(availableCars, new TypeToken<ArrayList<CarDTO>>() {
            }.getType());
        }
        return null;
    }
}
