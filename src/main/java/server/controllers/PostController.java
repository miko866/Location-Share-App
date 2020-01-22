package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import server.entities.Post;
import server.services.MapValidationErrorService;
import server.services.PostService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin
public class PostController {

	@Autowired
	private PostService postService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("")
	public ResponseEntity<?>  createNewPost(@Valid @RequestBody Post post, BindingResult result, Principal principal) {
		//* Check custom errors
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null) return errorMap;

		Post post1 = postService.saveAndUpdatePost(post, principal.getName());
		return new ResponseEntity<Post>(post1, HttpStatus.CREATED);
	}

	@GetMapping("title/{postTitle}")
	public ResponseEntity<?> getPostByTitle(@PathVariable String postTitle, Principal principal) {
		Post post = postService.findPostByTitle(postTitle, principal.getName());

		return new ResponseEntity<Post>(post, HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<?> getPostId(@PathVariable("id") Long id) {
		Post post = postService.getPostById(id);

		return new ResponseEntity<Post>(post, HttpStatus.OK);
	}

	@GetMapping("allPostsByAuthor")
	public List<Post> listPosts(Principal principal) { return postService.getAllPostsByAuthor(principal.getName());}

	@GetMapping("allPosts")
	public List<Post> listPostsAll() { return postService.getAllPosts();}

	@DeleteMapping("deletePost/{id}")
	public boolean deletePost(@PathVariable("id") long id) {
		Post post = postService.getPostById(id);
		postService.deletePost(post);
		return postService.existsById(id);
	}
}

