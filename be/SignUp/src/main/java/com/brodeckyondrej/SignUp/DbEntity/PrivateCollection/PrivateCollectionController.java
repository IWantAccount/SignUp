package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection;

import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Service.PrivateCollectionService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
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
