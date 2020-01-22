package server.services;

import server.entities.User;

import java.util.List;

public interface UserService {

	User saveAndUpdateUser(User user);

	void deleteUser(User user);

	User getUserById(long id);

	List<User> getAllUsers();

	Boolean existById(long id);
}
