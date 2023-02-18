package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.UserDTO;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    @Autowired
    CustomerService customerService;

    @PostMapping
    public ResponseUtil verifyUser(@RequestBody UserDTO userDTO) {

        CustomerDTO customerDTO = customerService.verifyCustomer(userDTO.getUsername(), userDTO.getPassword());

    }
}
