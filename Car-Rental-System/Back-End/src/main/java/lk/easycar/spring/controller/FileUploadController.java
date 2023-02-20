package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarImageDetailDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.service.CarImageDetailService;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/files/upload")
@CrossOrigin
public class FileUploadController {

    @Autowired
    CustomerService customerService;

    @Autowired
    CarImageDetailService carImageDetailService;

    //    formalized end-point to upload files
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCustomerNicAndLicense(@RequestPart("file") MultipartFile[] files, @RequestPart("customerNic") String customerNic) {
        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();
            File customersDir = new File(uploadsDir + "/customers");
            customersDir.mkdir();
            for (MultipartFile file : files) {
                file.transferTo(new File(customersDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
            }
            CustomerDTO customer = customerService.getCustomerByNic(customerNic);
            customer.setNic_img("uploads/customers/" + files[0].getOriginalFilename());
            customer.setLicense_img("uploads/customers/" + files[1].getOriginalFilename());
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Sign up failed, Please try again.", null);
        }
        return new ResponseUtil(200, "Signed up successfully", null);
    }

    @PostMapping(path = "/carImages", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCarImages(@RequestPart("carImage") MultipartFile[] files, @RequestPart("carRegNo") String carRegNo) {
        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();
            File carsDir = new File(uploadsDir + "/cars");
            carsDir.mkdir();
            for (MultipartFile file : files) {
                file.transferTo(new File(carsDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
            }
            carImageDetailService.saveCarImageDetail(new CarImageDetailDTO(carRegNo, "uploads/cars/" + files[0].getOriginalFilename(),
                    "uploads/cars/" + files[1].getOriginalFilename(), "uploads/cars/" + files[2].getOriginalFilename(),
                    "uploads/cars/" + files[3].getOriginalFilename()));
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Something went wrong, Please try again later", null);
        }
        return new ResponseUtil(200, "Car added successfully", null);
    }
}
