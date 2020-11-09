package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.model.Job;
import bytecryb.clio.model.PDF;
import bytecryb.clio.model.Record;
import bytecryb.clio.model.XML;
import bytecryb.clio.repository.JobRepository;
import bytecryb.clio.repository.RecordRepository;
import bytecryb.clio.service.PDFService;
import bytecryb.clio.service.XMLService;

@RestController
@RequestMapping("/api/v1")
public class JobController {
    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private RecordRepository recordRepo;

    @Autowired
    private PDFService pdfService;

    @Autowired
    private XMLService xmlService;

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getJobById() {
        List<Job> result = this.jobRepo.findAll();
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        Job result = this.jobRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job" + id + " was not found!"));
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/jobs")
    @Transactional
    public ResponseEntity<Job> createJob(@RequestParam(name = "files") MultipartFile[] files,
            @RequestParam(name = "xml") MultipartFile xml, @RequestParam(name = "name") String name,
            @RequestParam(name = "catId") Long catId) throws Exception {
        List<PDF> filesUploaded = new ArrayList<>();
        List<Record> records = new ArrayList<>();
        Job newJob = new Job();

        for (MultipartFile file : files) {
            filesUploaded.add(this.pdfService.uploadToLocal(file, UUID.randomUUID()));
        }

        XML newXml = this.xmlService.uploadToLocal(xml, UUID.randomUUID());

        newJob.setName(name);
        newJob.setCategoryId(catId);
        newJob.setXmlId(newXml.getId());
        newJob.setSize(filesUploaded.size());

        newJob = this.jobRepo.save(newJob);

        for (PDF file : filesUploaded) {
            records.add(this.recordRepo.save(new Record(newJob.getId(), file.getId(), false, false, false, "{}")));
        }

        return ResponseEntity.ok(newJob);
    }

    @PutMapping("/jobs")
    @Transactional
    public ResponseEntity<Job> createJob(@RequestBody Job job) throws Exception {
        Job result = this.jobRepo.findById(job.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found for ID: " + job.getId()));

        result.setName(job.getName());
        result.setCategoryId(job.getCategoryId());
        result.setIndexed(job.getIndexed());
        result.setStatus(job.getStatus());
        return ResponseEntity.ok(this.jobRepo.save(result));
    }

}
