package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.CustomerRepo;
import lk.easycar.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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
    public void updateCustomer(CustomerDTO dto) {
        if (!customerRepo.existsById(dto.getNic_no())) {
            throw new RuntimeException("No such a customer, Please enter valid nic no");
        }
        customerRepo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void deleteCustomer(String nic_no) {
        if (!customerRepo.existsById(nic_no)) {
            throw new RuntimeException("No such a customer, Please enter valid nic no");
        }
        customerRepo.deleteById(nic_no);
    }

    @Override
    public CustomerDTO getCustomerByNic(String nic) {
        Customer customer = customerRepo.findCustomerByNic_no(nic);
        if (customer != null) {
            return mapper.map(customer, CustomerDTO.class);
        }
        return null;
    }

    @Override
    public CustomerDTO verifyCustomer(String username, String password) {
        Customer customer = customerRepo.findCustomerByUsernameAndPassword(username, password);
        if (!(customer == null)) {
            return mapper.map(customer, CustomerDTO.class);
        }
        return null;
    }

    @Override
    public ArrayList<CustomerDTO> getAllCustomers() {
        List<Customer> all = customerRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());
    }
}
