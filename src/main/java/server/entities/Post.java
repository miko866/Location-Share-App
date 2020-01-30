package server.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="post")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "title")
	@Size(min=4, max=20, message = "Please use 4 to 20 characters")
	@NotBlank(message = "Title is required")
	private String title;

	@Column(name = "street", updatable = false)
	@NotBlank(message = "Street is required")
	private String street;

	@Column(name = "streetNumber", updatable = false)
	private String streetNumber;

	@Column(name = "zip", updatable = false)
	@NotBlank(message = "Zip is required")
	@Size(min=4, max=4, message = "Please use only 4 digits")
	private String zip;

	@Column(name = "city", updatable = false)
	@NotBlank(message = "City is required")
	private String city;

	@Column(name = "text")
	private String text;

	@Column(name = "image")
	private String image;

	@Column(name = "createdAt")
	@JsonFormat(pattern = "dd-mm-yyyy")
	private Date createdAt;

	@Column(name = "updatedAt")
	@JsonFormat(pattern = "dd-mm-yyyy")
	private Date updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;

	private Long postAuthorId;
	private String postAuthor;

	//* Auto create current date
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	//* Auto update current date
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
}

