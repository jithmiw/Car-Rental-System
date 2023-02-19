package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarImageDetailDTO;
import lk.easycar.spring.entity.CarImageDetail;
import lk.easycar.spring.repo.CarImageDetailRepo;
import lk.easycar.spring.service.CarImageDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CarImageDetailServiceImpl implements CarImageDetailService {

    @Autowired
    private CarImageDetailRepo carImageDetailRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCarImageDetail(CarImageDetailDTO dto) {
        CarImageDetail carImageDetail = mapper.map(dto, CarImageDetail.class);
        carImageDetailRepo.save(carImageDetail);
    }
}
