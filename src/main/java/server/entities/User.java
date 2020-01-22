package server.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="user")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "First name is required")
	@Column(name = "firstName")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Column(name = "lastName")
	private String lastName;

	@Email(message = "Username needs to be an email")
	@NotBlank(message = "UserName is required")
	@Column(name = "userName", unique = true)
	private String userName;

	@NotBlank(message = "Password name is required")
	@Column(name = "password")
	private String password;

	@Transient
	private String confirmPassword;

	@Column(name = "image")
	private String image;

	@Column(name = "createdAt")
	private Date createdAt;

	@Column(name = "updatedAt")
	private Date updatedAt;

	// OneToMany with Post
	@OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private List<Post> posts = new ArrayList<>();

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

	//* UserDetails interface methods
	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.userName;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return true;
	}
}
