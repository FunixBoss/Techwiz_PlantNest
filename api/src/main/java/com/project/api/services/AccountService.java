package com.project.api.services;

import com.project.api.dtos.AccountDTO;
import com.project.api.dtos.AccountDetailDTO;
import com.project.api.entities.Account;

import java.util.List;

public interface AccountService {
    List<AccountDTO> findAll();
    Account findByEmail(String email);
    Account create(Account account);
    Boolean update(Account account);
    Boolean updateActive(List<Account> accounts, Boolean active);
    Boolean deleteById(Integer id);
    Boolean checkEmailExisting(String email);
    Boolean checkUsernameExisting(String username);
    List<AccountDTO> findByEmailKeyword(String keyword);
    Account save(Account account);
    AccountDetailDTO findById(Integer accountId);
    Account register(String email, String password, String fullName, String phoneNumber);

}
