package server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.entities.Post;
import server.services.MapValidationErrorService;
import server.services.PostService;

import java.io.IOException;
import java.nio.file.Path;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin
public class PostController {

//	private static String UPLOADED_FOLDER = "\\Users\\michalevo\\Desktop\\My_Code\\Java\\location-share-app\\src\\main\\java\\server\\images\\";
	private static String UPLOADED_FOLDER = "/Users/michalevo/Desktop/My_Code/Java/location-share-app/src/main/java/server/images/";
	@Autowired
	private PostService postService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

//	@PostMapping("")
//	public ResponseEntity<?>  createNewPost(@Valid @RequestBody Post post, BindingResult result, Principal principal) {
//		//* Check custom errors
//		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//		if (errorMap != null) return errorMap;
//
//		Post post1 = postService.saveAndUpdatePost(post, principal.getName());
//		return new ResponseEntity<Post>(post1, HttpStatus.CREATED);
//	}

	@PostMapping("")
	public ResponseEntity<?>  createNewPost(@RequestParam String title, @RequestParam String street, @RequestParam String streetNumber, @RequestParam String zip, @RequestParam String city, @RequestParam String text, @RequestParam("file") MultipartFile file, Principal principal) {
		Date date = new Date();
		long timeMilli = date.getTime();
		String filename = timeMilli + "_" + file.getOriginalFilename();

		Post post = new Post();
		post.setTitle(title);
		post.setStreet(street);
		post.setStreetNumber(streetNumber);
		post.setZip(zip);
		post.setCity(city);
		post.setText(text);
		post.setImage(filename);

		// Check custom errors, but with the image don't working
//		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//		if (errorMap != null) return errorMap;

		try {
			byte[] bytes = file.getBytes();
			Path path = Paths.get(UPLOADED_FOLDER + filename);
			Files.write(path, bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}




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

