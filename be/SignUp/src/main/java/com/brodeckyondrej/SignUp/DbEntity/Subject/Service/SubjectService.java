package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.CreateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.UpdateSubjectDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class SubjectService extends NamedEntityService<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto> {

    public SubjectService(SubjectRepository repository, SubjectValidator validator, SubjectMapper mapper){
        super(repository, validator, mapper);
    }
}
