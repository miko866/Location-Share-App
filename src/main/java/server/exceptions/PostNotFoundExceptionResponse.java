package server.exceptions;

public class PostNotFoundExceptionResponse {

    private String PostNotFound;

    public PostNotFoundExceptionResponse(String postNotFound) {
        PostNotFound = postNotFound;
    }

    public String getPostNotFound() {
        return PostNotFound;
    }

    public void setPostNotFound(String postNotFound) {
        PostNotFound = postNotFound;
    }
}
