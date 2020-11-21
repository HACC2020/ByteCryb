package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.util.StringUtils;

import bytecryb.clio.repository.AwardRepository;
import bytecryb.clio.repository.BadgeRepository;
import bytecryb.clio.repository.UserRepository;
import bytecryb.clio.util.JwtUtil;
import bytecryb.clio.model.Award;
import bytecryb.clio.model.Badge;

@RestController
@RequestMapping("/api/v1")
public class AwardController {
    
    @Autowired
    private AwardRepository awardRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BadgeRepository badgeRepo;

    @Autowired
	private JwtUtil jwtUtil;

    // get all awards
    @GetMapping("/awards")
    public ResponseEntity<List<Award>> getAllAward() {
        return ResponseEntity.ok(this.awardRepo.findAll());
    }

    // get award by username
    @GetMapping("/awards/profile")
    public ResponseEntity<List<Badge>> getUserAwards(HttpServletRequest request) {
        String jwtToken = extractJwtFromRequest(request);
        String currUsername = jwtUtil.getUsernameFromToken(jwtToken);
        Long userId = this.userRepo.findByUsername(currUsername).getId();

        List<Award> userAwards = this.awardRepo.findByUserId(userId);

        List<Badge> userBadges = new ArrayList<>();
        for (Award a: userAwards) {
            Badge badge = this.badgeRepo.findById(a.getBadge().getId());
            userBadges.add(badge);
        }

        return ResponseEntity.ok(userBadges);
    }


	// gets jwt from http servlet request (not a endpoint)
	private String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
}