package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomerDTO;

import java.util.ArrayList;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);

    void updateCustomer(CustomerDTO dto);

    void deleteCustomer(String nic_no);

    CustomerDTO verifyCustomer(String username, String password);

    CustomerDTO getCustomerByNic(String nic_no);

    ArrayList<CustomerDTO> getAllCustomers();
}
