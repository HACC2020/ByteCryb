package bytecryb.clio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.model.Job;
import bytecryb.clio.repository.JobRepository;

@RestController
@RequestMapping(name = "/api/v1")
public class JobController {

    @Autowired
    private JobRepository jobRepo;

    @GetMapping(name = "/jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        Job result = this.jobRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job" + id + " was not found!"));
        return ResponseEntity.ok().body(result);
    }

}
