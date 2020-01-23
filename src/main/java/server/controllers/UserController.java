package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import server.entities.User;
import server.payload.JWTLoginSuccessResponse;
import server.payload.LoginRequest;
import server.security.JwtTokenProvider;
import server.services.MapValidationErrorService;
import server.services.UserService;
import server.validator.UserValidator;

import javax.validation.Valid;

import java.util.List;

import static server.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private static String UPLOADED_FOLDER = "\\Users\\michalevo\\Desktop\\My_Code\\Java\\location-share-app\\src\\main\\java\\server\\images\\";

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserValidator userValidator;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;

		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(
				loginRequest.getUserName(),
				loginRequest.getPassword()
			)
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
	}

	@PostMapping("register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
		// Validate paswords match
		userValidator.validate(user, result);

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;

		User newUser = userService.saveAndUpdateUser(user);

		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}

	@GetMapping("allUsers")
	public List<User> listUsers() { return userService.getAllUsers();}


	@GetMapping("{id}")
	public ResponseEntity<?> getUserId(@PathVariable("id") Long id) {
		User user = userService.getUserById(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

}
