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
    private CustomerService customerService;

    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto) {
        customerService.saveCustomer(dto);
        return new ResponseUtil(200, "Customer added successfully", null);
    }

//    @GetMapping(path = "/customer_details/{id}")
//    public ResponseUtil getCustomerDetails(@PathVariable String id) {
//        CustomerDTO customerDTO = customerService.getCustomerDetails(id);
//        return new ResponseUtil(200, "Done", customerDTO);
//    }

    @GetMapping(path = "/{nic}")
    public ResponseUtil getCustomerByNic(@PathVariable String nic) {
        CustomerDTO customerDTO = customerService.getCustomerByNic(nic);
        return new ResponseUtil(200, "Customer exists", customerDTO);
    }
}
