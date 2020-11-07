package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.Job;
import bytecryb.clio.repository.JobRepository;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
	
	@Autowired
	private JobRepository jobRepo;

	@GetMapping("/all")
	public List<Job> getAllJobs() {
		return this.jobRepo.findAll();
	}
}
