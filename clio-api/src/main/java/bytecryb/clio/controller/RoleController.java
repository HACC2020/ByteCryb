package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import bytecryb.clio.repository.RoleRepository;
import bytecryb.clio.model.Role;

@RestController
@RequestMapping("/api/v1")
public class RoleController {

    @Autowired
    private RoleRepository roleRepo;

    // get all roles
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRole() {
        return ResponseEntity.ok().body(this.roleRepo.findAll());
    }

}