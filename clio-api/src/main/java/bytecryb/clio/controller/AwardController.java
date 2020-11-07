package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import bytecryb.clio.repository.AwardRepository;
import bytecryb.clio.model.Award;

@RestController
@RequestMapping("/api/awards")
public class AwardController {

    @Autowired
    private AwardRepository awardRepo;
    //get all awards
    @GetMapping("/all") 
    public List<Award> getAllAward() {
        return this.awardRepo.findAll();
    }

    //get award by username
}