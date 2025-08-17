package com.brodeckyondrej.SignUp.DbEntity.Subject;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.CreateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Service.SubjectService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
public class SubjectController extends NamedEntityController<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto, FindByNameDto> {
    public SubjectController(SubjectService service){
        super(service);
    }
}
