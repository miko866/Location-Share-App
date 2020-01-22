package server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);
    User getById(Long id);

}
