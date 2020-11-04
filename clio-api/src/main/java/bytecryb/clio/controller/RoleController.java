package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import bytecryb.clio.repository.RoleRepository;
import bytecryb.clio.model.Role;


@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private BadgeRepository roleRepo;
    //get badges
    @GetMapping("/all") 
    public List<Badge> getAllRole() {
        return this.roleRepo.findAll();
    }

}