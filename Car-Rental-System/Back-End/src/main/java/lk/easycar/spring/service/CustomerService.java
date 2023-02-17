package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomerDTO;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);

    CustomerDTO getCustomerDetails(String nic);
}
