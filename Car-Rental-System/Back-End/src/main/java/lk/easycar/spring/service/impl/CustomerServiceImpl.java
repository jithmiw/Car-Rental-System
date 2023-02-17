package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.CustomerRepo;
import lk.easycar.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getNic_no())) {
            throw new RuntimeException("Customer already registered");
        }
        Customer customer = mapper.map(dto, Customer.class);
        customerRepo.save(customer);
    }

    @Override
    public CustomerDTO getCustomerDetails(String id) {
        if (customerRepo.existsById(id)) {
            return mapper.map(customerRepo.findById(id).get(), CustomerDTO.class);
        } else {
            throw new RuntimeException("Something went wrong, Please try again later");
        }
    }
}
