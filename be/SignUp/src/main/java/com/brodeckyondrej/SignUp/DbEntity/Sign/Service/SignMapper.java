package com.brodeckyondrej.SignUp.DbEntity.Sign.Service;

import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.CreateSignDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.SignGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.SignGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.UpdateSignDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Sign;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import org.springframework.stereotype.Service;

//TODO fix types
@Service
public class SignMapper implements EntityMapper<Sign, CreateSignDto, UpdateSignDto, SignGetDetailDto, SignGetListDto> {

    @Override
    public Sign fromCreateDto(CreateSignDto createSignDto) {
        return null;
    }

    @Override
    public void updateFromDto(Sign entity, UpdateSignDto updateSignDto) {

    }

    @Override
    public SignGetDetailDto toDetailDto(Sign entity) {
        return null;
    }

    @Override
    public SignGetListDto toListDto(Sign entity) {
        return null;
    }
}
