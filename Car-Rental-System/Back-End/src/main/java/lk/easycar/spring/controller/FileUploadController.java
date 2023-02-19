package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarImageDetailDTO;
import lk.easycar.spring.repo.CarImageDetailRepo;
import lk.easycar.spring.service.CarImageDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;

@RestController
@RequestMapping("/files/upload")
@CrossOrigin
public class FileUploadController {

    @Autowired
    CarImageDetailService carImageDetailService;

    private static final ArrayList<String> allImages = new ArrayList<>();

    //    formalized end-point to upload files
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadFile(@RequestPart("file") MultipartFile[] files) {
        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println(projectPath);
            uploadsDir.mkdir();
            for (MultipartFile file : files) {
                file.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + file.getOriginalFilename()));

                //save the path of the uploaded image in the database
//                allImages.add("uploads/" + file.getOriginalFilename());
            }
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Sign Up Failed. Please Try Again.", null);
        }
        return new ResponseUtil(200, "Signed Up Successfully.", null);
    }

    @PostMapping(path = "/carImages", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCarImages(@RequestPart("carImage") MultipartFile[] files, @RequestPart("carRegNo") String carRegNo) {
        try {
            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();
            File carsDir = new File(uploadsDir +  "/cars");
            carsDir.mkdir();
            for (MultipartFile file : files) {
                file.transferTo(new File(carsDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
            }
            carImageDetailService.saveCarImageDetail(new CarImageDetailDTO(carRegNo, "uploads/cars/" + files[0].getOriginalFilename(),
                    "uploads/cars/" + files[1].getOriginalFilename(), "uploads/cars/" + files[2].getOriginalFilename(),
                    "uploads/cars/" + files[3].getOriginalFilename()));
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Something Went Wrong. Please Try Again.", null);
        }
        return new ResponseUtil(200, "Car Added Successfully.", null);
    }

//    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity getAllImagesFromDatabase() {
//        return new ResponseEntity(allImages, HttpStatus.OK);
//    }
}
