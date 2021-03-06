package server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameAlreadyExistsExeption extends RuntimeException {

    public UsernameAlreadyExistsExeption(String message) {
        super(message);
    }
}
