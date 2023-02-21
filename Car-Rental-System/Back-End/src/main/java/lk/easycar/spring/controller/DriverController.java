package lk.easycar.spring.controller;

import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.service.DriverService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping
    public ResponseUtil saveDriver(@ModelAttribute DriverDTO dto) {
        driverService.saveDriver(dto);
        return new ResponseUtil(200, "Driver added successfully", null);
    }

    @PutMapping
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto) {
        driverService.updateDriver(dto);
        return new ResponseUtil(200, "Nic no: " + dto.getNic_no() + " driver updated successfully", null);
    }

    @DeleteMapping(params = {"nic_no"})
    public ResponseUtil deleteDriver(@RequestParam String nic_no) {
        driverService.deleteDriver(nic_no);
        return new ResponseUtil(200, "Nic no: " + nic_no + " driver deleted successfully", null);
    }

    @GetMapping(path = "/{nic}")
    public ResponseUtil getDriverByNic(@PathVariable String nic) {
        DriverDTO driverDTO = driverService.getDriverByNic(nic);
        return new ResponseUtil(200, "Driver exists", driverDTO);
    }
}
