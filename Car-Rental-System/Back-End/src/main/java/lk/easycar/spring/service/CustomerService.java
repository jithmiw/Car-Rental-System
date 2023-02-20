package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomerDTO;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);

    CustomerDTO verifyCustomer(String username, String password);

    CustomerDTO getCustomerByNic(String nic_no);
}
