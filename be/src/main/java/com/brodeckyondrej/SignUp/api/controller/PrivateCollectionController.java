package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionGetListDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.business.service.collection.PrivateCollectionService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/private-collection")
public class PrivateCollectionController extends NamedEntityController<
        PrivateCollection,
        PrivateCollectionCreateDto,
        PrivateCollectionUpdateDto,
        PrivateCollectionGetDetailDto,
        PrivateCollectionGetListDto,
        FindByNameDto
        > {

    public PrivateCollectionController(PrivateCollectionService service){
        super(service);
    }
}
