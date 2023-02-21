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

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        customerService.updateCustomer(dto);
        return new ResponseUtil(200, "Nic no: " + dto.getNic_no() + " customer updated successfully", null);
    }

    @DeleteMapping(params = {"nic_no"})
    public ResponseUtil deleteCustomer(@RequestParam String nic_no) {
        customerService.deleteCustomer(nic_no);
        return new ResponseUtil(200, "Nic no: " + nic_no + " customer deleted successfully", null);
    }

    @GetMapping(path = "/{nic}")
    public ResponseUtil getCustomerByNic(@PathVariable String nic) {
        CustomerDTO customerDTO = customerService.getCustomerByNic(nic);
        return new ResponseUtil(200, "Customer exists", customerDTO);
    }
}
