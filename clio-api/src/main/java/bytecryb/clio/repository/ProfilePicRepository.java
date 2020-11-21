package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.ProfilePic;

@Repository
public interface ProfilePicRepository extends JpaRepository<ProfilePic, Long> {

}
