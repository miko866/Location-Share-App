package server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.Post;
import server.entities.User;
import server.exceptions.PostNotFoundException;
import server.repositories.PostRepository;
import server.repositories.UserRepository;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Post saveAndUpdatePost(Post post, String username) {

		// Check if have id
		if (post.getId() != null) {
			// Take the one post on id
			Post existingPost = postRepository.getOne(post.getId());

			// Check if id exist and if the user exist for created the post
			if (existingPost != null && (!existingPost.getPostAuthor().equals(username))) {
				throw new PostNotFoundException("Post not found in your account");
			} else if (existingPost == null) {
				throw new PostNotFoundException("Post doesn't exists");
			}
		}

		// Add user into post
		User user = userRepository.findByUserName(username);
		post.setUser(user);
		post.setPostAuthorId(user.getId());
		post.setPostAuthor(user.getUsername());

		// Crerate new post
		return postRepository.save(post);
	}

	@Override
	public void deletePost(Post post) {
		postRepository.delete(post);
	}

	@Override
	public Post getPostById(long id) {
		return postRepository.getOne(id);
	}

	@Override
	public List<Post> getAllPostsByAuthor(String username) {
		return postRepository.findAllByPostAuthor(username);
	}

	@Override
	public List<Post> getAllPosts() { return postRepository.findAll(); }

	@Override
	public Boolean existsById(long id) {
		return postRepository.existsById(id);
	}

	@Override
	public Post findPostByTitle(String title, String username) {

		Post post = postRepository.findByTitle(title);

		if (!post.getPostAuthor().equals(username)) {
			return null;
		}

		return post;
	}
}
