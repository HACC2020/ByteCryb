package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Badge;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {

}