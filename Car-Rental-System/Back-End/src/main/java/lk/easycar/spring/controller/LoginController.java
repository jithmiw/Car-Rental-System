package lk.easycar.spring.controller;

import lk.easycar.spring.dto.AdminDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.dto.UserDTO;
import lk.easycar.spring.service.AdminService;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.service.DriverService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    @Autowired
    CustomerService customerService;

    @Autowired
    DriverService driverService;

    @Autowired
    AdminService adminService;

    @PostMapping
    public ResponseUtil verifyUser(@RequestBody UserDTO userDTO) {

        CustomerDTO customerDTO = customerService.verifyCustomer(userDTO.getUsername(), userDTO.getPassword());

        if (customerDTO == null) {
            AdminDTO adminDTO = adminService.verifyAdmin(userDTO.getUsername(), userDTO.getPassword());
            if (adminDTO == null) {
                DriverDTO driverDTO = driverService.verifyDriver(userDTO.getUsername(), userDTO.getPassword());
                if (!(driverDTO == null)) {
                    return new ResponseUtil(200, "Driver", driverDTO);
                } else {
                    return new ResponseUtil(200, "You have entered an invalid username or password. Please try again.", null);
                }
            } else {
                return new ResponseUtil(200, "Admin", adminDTO);
            }
        } else {
            return new ResponseUtil(200, "Customer", customerDTO);
        }
    }
}
