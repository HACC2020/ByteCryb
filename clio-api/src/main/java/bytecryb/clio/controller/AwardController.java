package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import bytecryb.clio.repository.AwardRepository;
import bytecryb.clio.model.Award;

@RestController
@RequestMapping("/api/v1")
public class AwardController {

    @Autowired
    private AwardRepository awardRepo;
    //get all awards
    @GetMapping("/awards") 
    public List<Award> getAllAward() {
        return this.awardRepo.findAll();
    }

    //get award by username
}