package com.brodeckyondrej.SignUp.DbEntity.User;

import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserUpdateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Service.UserService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController extends NamedEntityController<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto, FindByNameDto> {
    public UserController(UserService service) {
        super(service);
    }
}
