package server.exceptions;

import lombok.Data;

@Data
public class InvalidLoginResponse {
    private String userName;
    private String password;

    public InvalidLoginResponse() {
        this.userName = "Invalid UserName";
        this.password = "Invalid Password";
    }


}
