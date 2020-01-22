package server.security;

public class SecurityConstants {
    public static final String USERS_URL = "/api/users/**";
    public static final String ALL_POSTS_URL = "/api/posts/allPosts";
    public static final String H2_URL = "/h2/**";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 3000_000; // s
}
