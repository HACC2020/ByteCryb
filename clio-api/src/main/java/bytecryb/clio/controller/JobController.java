package bytecryb.clio.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
import bytecryb.clio.repository.CategoryRepository;
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
    private CategoryRepository categoryRepo;

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
    public ResponseEntity<Job> getJobById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Job result = this.jobRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job" + id + " was not found!"));
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/jobs/csv")
    public ResponseEntity<String> getCsvByJobId(@RequestParam(value = "id") Long id) {
        List<Record> results = this.recordRepo.findByJobId(id);
        JSONArray jsonArray = new JSONArray();
        for (Record result : results) {
            if (result.isApproved()) {
                jsonArray.put(new JSONObject(result.getJson()));
            }
        }
        String csv = CDL.toString(jsonArray);
        return ResponseEntity.ok().contentType(MediaType.parseMediaType("text/csv"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"output_job_" + id + ".csv\"").body(csv);
    }

    // Get Jobs by Category ID
    @GetMapping("/jobs/byCategory/{category_id}")
    public ResponseEntity<List<Job>> getJobByCategory(@PathVariable(name = "category_id") long categoryId) {
        //check if category exists
        if (!this.categoryRepo.existsById(categoryId)) throw new IllegalArgumentException("Category with category_id: " + categoryId + " does not exist!");

        List<Job> result = this.jobRepo.findByCategoryId(categoryId);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/jobs")
    @Transactional
    public ResponseEntity<Job> createJob(@RequestParam(value = "files") MultipartFile[] files,
            @RequestParam(name = "xml") MultipartFile xml, @RequestParam(name = "name") String name,
            @RequestParam(name = "catId") Long catId) throws Exception {
        List<PDF> filesUploaded = new ArrayList<>();
        List<Record> records = new ArrayList<>();
        Job newJob = new Job();

        UUID pdfFolder = UUID.randomUUID();

        UUID xmlFolder = UUID.randomUUID();

        for (MultipartFile file : files) {
            try {
                filesUploaded.add(this.pdfService.uploadToLocal(file, pdfFolder));
            } catch (Exception e) {
                this.pdfService.removeFolder(new File(System.getProperty("user.dir") + "/data/pdf/" + pdfFolder.toString()));
            }
        }

        XML newXml = null;
        try {
            newXml = this.xmlService.uploadToLocal(xml, xmlFolder);
        } catch (Exception e) {
            this.pdfService.removeFolder(new File(System.getProperty("user.dir") + "/data/pdf/" + pdfFolder.toString()));
            this.pdfService.removeFolder(new File(System.getProperty("user.dir") + "/data/pdf/" + xmlFolder.toString()));
        }

        newJob.setName(name);
        newJob.setCategoryId(catId);
        newJob.setXmlId(newXml.getId());
        newJob.setSize(filesUploaded.size());
        newJob.setPoints(5);

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

    @PutMapping("/jobs/points")
    @Transactional
    public ResponseEntity<?> updatePoints(@RequestBody String jsonStr) throws Exception {
        		// put json string into json object
		JSONObject input = new JSONObject(jsonStr);

		// retrieve separate inputs from json object
		Long id = input.getLong("id");
        int points = input.getInt("points");
        
        Job result = this.jobRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Job not found for ID: " + id));

        result.setPoints(points);
        return ResponseEntity.ok(this.jobRepo.save(result));
    }

}
