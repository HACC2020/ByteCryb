package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import bytecryb.clio.model.CustomUser;

@Repository
public interface UserRepository extends JpaRepository<CustomUser, Long> {
    Optional<CustomUser> findByEmail(String email);

    Optional<CustomUser> findByUsernameOrEmail(String username, String email);

    CustomUser findById(long id);
    
    CustomUser findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}