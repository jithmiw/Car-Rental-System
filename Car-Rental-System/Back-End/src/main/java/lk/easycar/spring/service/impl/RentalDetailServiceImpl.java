package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.RentalDetail;
import lk.easycar.spring.repo.CarRepo;
import lk.easycar.spring.repo.CustomerRepo;
import lk.easycar.spring.repo.DriverScheduleRepo;
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
import java.util.stream.Collectors;

@Service
@Transactional
public class RentalDetailServiceImpl implements RentalDetailService {

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private DriverScheduleRepo driverScheduleRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveRentalDetail(RentalDetailDTO dto) {
        Customer customer = customerRepo.findById(dto.getCustomer_nic()).get();
        Car car = carRepo.findById(dto.getCar_reg_no()).get();
        RentalDetail rentalDetail = new RentalDetail(dto.getRental_id(), dto.getPick_up_date(), dto.getReturn_date(),
                dto.getPick_up_time(), dto.getReturn_time(), dto.getPick_up_venue(), dto.getReturn_venue(), "Rental",
                dto.getDriver_status(), customer, car);
        if (rentalDetailRepo.existsById(rentalDetail.getRental_id())) {
            throw new RuntimeException("Reservation " + rentalDetail.getRental_id() + " already added");
        }
        rentalDetailRepo.save(rentalDetail);

        // update car status
        rentalDetail.getCar().setStatus("Reserved");
        carRepo.save(car);
    }

    @Override
    public ArrayList<CarDTO> searchAvailableCarsForReservation(String pick_up_date, String return_date) {
        List<Car> availableCars = carRepo.findCarByStatus("Available");
        List<Car> reservedCars = carRepo.findCarByStatus("Reserved");

        for (Car car : reservedCars) {
            List<RentalDetail> rentalDetails = rentalDetailRepo.findRentalDetailByCar_Reg_noAndRental_status(car.getReg_no(), "Rental");
            for (RentalDetail detail : rentalDetails) {
                if (!(detail.getPick_up_date().isAfter(LocalDate.parse(return_date)) ||
                        detail.getReturn_date().isBefore(LocalDate.parse(pick_up_date)))) {
                    reservedCars.remove(detail.getCar());
                }
            }
        }
        availableCars.addAll(reservedCars);
        availableCars = availableCars.stream().distinct().collect(Collectors.toList());
        if (availableCars.size() != 0) {
            return mapper.map(availableCars, new TypeToken<ArrayList<CarDTO>>() {
            }.getType());
        }
        return null;
    }

    @Override
    public String generateNewRentalId() {
        String rental_id = "";
        rental_id = rentalDetailRepo.getLastRentalId();
        if (rental_id != null) {
            int newRentalId = Integer.parseInt(rental_id.replace("RID-", "")) + 1;
            return String.format("RID-%03d", newRentalId);
        }
        return "RID-001";
    }

    @Override
    public RentalDetailDTO getRentalDetailByRentalId(String rental_id) {
        RentalDetail rentalDetail = rentalDetailRepo.findRentalDetailByRental_id(rental_id);
        return mapper.map(rentalDetail, RentalDetailDTO.class);
    }
}
