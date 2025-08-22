package com.brodeckyondrej.SignUp.DbEntity.User.Service;

import com.brodeckyondrej.SignUp.DbEntity.User.UserRepository;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserUpdateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class UserService extends NamedEntityService<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    public UserService(UserRepository repository, UserValidator validator, UserMapper mapper){
        super(repository, validator, mapper);
    }
}
