package server.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageController {

	private static String UPLOADED_FOLDER = "/Users/michalevo/Desktop/My_Code/Java/location-share-app/src/main/java/server/images/";

	@GetMapping("/images/{fileName}")
	public ResponseEntity getFileToClient(@PathVariable String fileName) {
		Path path = Paths.get(UPLOADED_FOLDER + fileName);
		Resource resource = null;
		try {
			resource = new UrlResource(path.toUri());
		} catch(MalformedURLException e) {
			e.printStackTrace();
		}
		assert resource != null;
		return ResponseEntity.ok()
			.contentType(MediaType.parseMediaType("image/jpeg"))
			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
			.body(resource);
	}
}
