package com.project.api.controllers.customer;

import com.project.api.domain.HttpResponse;
import com.project.api.domain.UserPrincipal;
import com.project.api.dtos.AccountDTO;
import com.project.api.dtos.AddressDTO;
import com.project.api.entities.Account;
import com.project.api.exceptions.ExceptionHandling;
import com.project.api.exceptions.domain.*;
import com.project.api.services.AccountService;
import com.project.api.services.AddressService;
import com.project.api.utilities.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

import java.util.List;

import static com.project.api.constants.SecurityConstant.JWT_TOKEN_HEADER;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("api")
public class CustomerController extends ExceptionHandling {
    private AuthenticationManager authenticationManager;
    private AccountService accountService;
    private JWTTokenProvider jwtTokenProvider;
    private AddressService addressService;

    @Autowired
    public CustomerController(AuthenticationManager authenticationManager, AccountService accountService, JWTTokenProvider jwtTokenProvider, AddressService addressService) {
        this.authenticationManager = authenticationManager;
        this.accountService = accountService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.addressService = addressService;
    }

    @PostMapping("/login")
    public ResponseEntity<AccountDTO> login(@RequestBody Account account) {
        authenticate(account.getUsername(), account.getPassword());
        Account loginUser = accountService.findByUsername(account.getUsername());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);
        HttpHeaders jwtHeader = getJwtHeader(userPrincipal);
        return new ResponseEntity<>(new AccountDTO(loginUser), jwtHeader, OK);
    }

    @PostMapping("/register")
    public ResponseEntity<AccountDTO> register(@RequestBody Account account) throws UserNotFoundException, UsernameExistException, EmailExistException, MessagingException {
        AccountDTO newAccount = accountService.register(account.getUsername(), account.getEmail(), account.getPassword(), account.getFullName(), account.getPhoneNumber());
        return new ResponseEntity<>(newAccount, OK);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<Account> getUser(@PathVariable("username") String username) {
        Account account = accountService.findByUsername(username);
        return new ResponseEntity<>(account, OK);
    }

//    @GetMapping("/resetpassword/{email}")
//    public ResponseEntity<HttpResponse> resetPassword(@PathVariable("email") String email) throws MessagingException, EmailNotFoundException {
//        userService.resetPassword(email);
//        return response(OK, EMAIL_SENT + email);
//    }

//    @DeleteMapping("/delete/{username}")
//    @PreAuthorize("hasAnyAuthority('user:delete')")
//    public ResponseEntity<HttpResponse> deleteUser(@PathVariable("username") String username) throws IOException {
//        accountService.deleteById(username);
//        return response(OK, USER_DELETED_SUCCESSFULLY);
//    }


//    @GetMapping(path = "/image/{username}/{fileName}", produces = IMAGE_JPEG_VALUE)
//    public byte[] getProfileImage(@PathVariable("username") String username, @PathVariable("fileName") String fileName) throws IOException {
//        return Files.readAllBytes(Paths.get(USER_FOLDER + username + FORWARD_SLASH + fileName));
//    }

//    @GetMapping(path = "/image/profile/{username}", produces = IMAGE_JPEG_VALUE)
//    public byte[] getTempProfileImage(@PathVariable("username") String username) throws IOException {
//        URL url = new URL(TEMP_PROFILE_IMAGE_BASE_URL + username);
//        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//        try (InputStream inputStream = url.openStream()) {
//            int bytesRead;
//            byte[] chunk = new byte[1024];
//            while((bytesRead = inputStream.read(chunk)) > 0) {
//                byteArrayOutputStream.write(chunk, 0, bytesRead);
//            }
//        }
//        return byteArrayOutputStream.toByteArray();
//    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }

    private HttpHeaders getJwtHeader(UserPrincipal user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(user));
        return headers;
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

    @GetMapping("isUsernameExist")
    public ResponseEntity<Boolean> isUsernameExist(@RequestParam("username") String username) {
        try {
            return new ResponseEntity<>(this.accountService.checkUsernameExisting(username), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("isEmailExist")
    public ResponseEntity<Boolean> isEmailExist(@RequestParam("email") String email) {
        try {
            return new ResponseEntity<>(this.accountService.checkEmailExisting(email), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{accountId}/addresses")
    public ResponseEntity<List<AddressDTO>> findAddressesByAccountId(@PathVariable Integer accountId) {
        try {
            return new ResponseEntity<>(addressService.findByAccountId(accountId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
