package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.entity.*;
import lk.easycar.spring.repo.*;
import lk.easycar.spring.service.RentalDetailService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
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
    private DriverRepo driverRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveRentalDetail(RentalDetailDTO dto, String scheduleId) {
        Customer customer = customerRepo.findById(dto.getCustomer_nic()).get();
        Car car = carRepo.findById(dto.getCar_reg_no()).get();
        RentalDetail rentalDetail = new RentalDetail(dto.getRental_id(), dto.getPick_up_date(), dto.getReturn_date(),
                dto.getPick_up_time(), dto.getReturn_time(), dto.getPick_up_venue(), dto.getReturn_venue(), "Rental",
                dto.getDriver_status(), customer, car);
        if (rentalDetailRepo.existsById(rentalDetail.getRental_id())) {
            throw new RuntimeException("Reservation " + rentalDetail.getRental_id() + " already added");
        }
        rentalDetailRepo.save(rentalDetail);

        // save rental detail
        if (dto.getDriver_status().equals("Yes")) {
            List<Driver> drivers = driverRepo.findAll();
            Collections.shuffle(drivers);
            Driver driver = driverRepo.findById(drivers.get(0).getNic_no()).get();
            DriverSchedule driverSchedule = new DriverSchedule(scheduleId, dto.getPick_up_date(), dto.getPick_up_time(), dto.getReturn_date(), dto.getReturn_time(), driver, rentalDetail);
            if (driverScheduleRepo.existsById(scheduleId)) {
                throw new RuntimeException("Driver Schedule " + scheduleId + " already added");
            }
            driverScheduleRepo.save(driverSchedule);
        }
        // update car status
        rentalDetail.getCar().setStatus("Reserved");
        carRepo.save(car);
    }

    @Override
    public void updateRentalDetail(RentalDetailDTO dto) {
        if (!rentalDetailRepo.existsById(dto.getRental_id())) {
            throw new RuntimeException("No such a reservation, Please enter valid rental id");
        }
        Customer customer = customerRepo.findById(dto.getCustomer_nic()).get();
        Car car = carRepo.findById(dto.getCar_reg_no()).get();
        RentalDetail rentalDetail = new RentalDetail(dto.getRental_id(), dto.getPick_up_date(), dto.getReturn_date(),
                dto.getPick_up_time(), dto.getReturn_time(), dto.getPick_up_venue(), dto.getReturn_venue(), dto.getRental_status(),
                dto.getDriver_status(), dto.getReserved_date(), dto.getBank_slip_img(), customer, car);
        rentalDetailRepo.save(rentalDetail);
    }

    @Override
    public ArrayList<CarDTO> searchAvailableCarsForReservation(String pick_up_date, String return_date) {
        List<Car> availableCars = carRepo.findCarByStatus("Available");
        List<Car> reservedCars = carRepo.findCarByStatus("Reserved");

        for (Car car : reservedCars) {
            List<RentalDetail> rentalDetails = rentalDetailRepo.findRentalDetailByCar_Reg_noAndRental_status(car.getReg_no(), "Rental", "Accepted");
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
        RentalDetail rental = rentalDetailRepo.findRentalDetailByRental_id(rental_id);
        return new RentalDetailDTO(rental.getRental_id(), rental.getPick_up_date(),
                rental.getReturn_date(), rental.getPick_up_time(), rental.getReturn_time(), rental.getPick_up_venue(),
                rental.getReturn_venue(), rental.getRental_status(), rental.getDriver_status(), rental.getReserved_date(),
                rental.getBank_slip_img(), rental.getCustomer().getNic_no(), rental.getCar().getReg_no());
    }

    @Override
    public ArrayList<RentalDetailDTO> getRentalRequests() {
        List<RentalDetail> requests = rentalDetailRepo.findAll();
        ArrayList<RentalDetailDTO> rentalRequests = new ArrayList<>();
        if (requests.size() != 0) {
            for (RentalDetail rental : requests) {
                rentalRequests.add(new RentalDetailDTO(rental.getRental_id(), rental.getPick_up_date(),
                        rental.getReturn_date(), rental.getPick_up_time(), rental.getReturn_time(), rental.getPick_up_venue(),
                        rental.getReturn_venue(), rental.getRental_status(), rental.getDriver_status(), rental.getReserved_date(),
                        rental.getBank_slip_img(), rental.getCustomer().getNic_no(), rental.getCar().getReg_no()));
            }
            return rentalRequests;
        }
        return null;
    }

    @Override
    public ArrayList<RentalDetailDTO> getRentalRequestsByCustomerNic(String nic) {
        List<RentalDetail> requests = rentalDetailRepo.findRentalDetailByCustomer_nic(nic, "Closed");
        ArrayList<RentalDetailDTO> reservations = new ArrayList<>();
        if (requests.size() != 0) {
            for (RentalDetail rental : requests) {
                reservations.add(new RentalDetailDTO(rental.getRental_id(), rental.getPick_up_date(),
                        rental.getReturn_date(), rental.getPick_up_time(), rental.getReturn_time(), rental.getPick_up_venue(),
                        rental.getReturn_venue(), rental.getRental_status(), rental.getDriver_status(), rental.getReserved_date(),
                        rental.getBank_slip_img(), rental.getCustomer().getNic_no(), rental.getCar().getReg_no()));
            }
            return reservations;
        }
        return null;
    }
}
