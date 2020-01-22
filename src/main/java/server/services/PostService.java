package server.services;

import server.entities.Post;

import java.util.List;

public interface PostService {

	Post saveAndUpdatePost(Post post, String username);

	void deletePost(Post post);

	Post getPostById(long id);

	List<Post> getAllPostsByAuthor(String username);

	List<Post> getAllPosts();

	Boolean existsById(long id);

	Post findPostByTitle(String title,  String username);
}
