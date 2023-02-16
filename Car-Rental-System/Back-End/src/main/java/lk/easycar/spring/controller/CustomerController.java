package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService service;

    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto) {
        service.saveCustomer(dto);
        return new ResponseUtil(200, "Successfully Added", null);
    }
}
