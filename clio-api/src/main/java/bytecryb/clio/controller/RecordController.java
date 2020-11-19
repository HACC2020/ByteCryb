package bytecryb.clio.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.transaction.annotation.Transactional;

import bytecryb.clio.repository.JobRepository;
import bytecryb.clio.repository.PDFRepository;
import bytecryb.clio.repository.RecordRepository;
import bytecryb.clio.service.PDFService;
import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.model.Job;
import bytecryb.clio.model.PDF;
import bytecryb.clio.model.Record;

@RestController
@RequestMapping("/api/v1")
public class RecordController {
    @Autowired
    private RecordRepository recordRepo;

    @Autowired
    private PDFService pdfService;

    @Autowired
    private PDFRepository pdfRepo;

    @Autowired
    private JobRepository jobRepo;

    // get all records
    @GetMapping("/records/all")
    public List<Record> getAll() {
        return this.recordRepo.findAll();
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<Record> getById(@PathVariable Long id) throws ResourceNotFoundException {
        Record result = this.recordRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record " + id + " was not found"));
        return ResponseEntity.ok().body(result);
    }

    // get first incomplete record pdf link
    @GetMapping("/records/pop")
    @Transactional
    public ResponseEntity<Record> popByJobId(@RequestParam(name = "job_id") Long jobId) {
        // get a list of records with matching job id
        List<Record> filteredRecords = this.recordRepo.findByJobId(jobId);

        for (Record record : filteredRecords) {
            System.out.println(record);
        }

        Record result = null;

        for (Record r : filteredRecords) {
            // check if the record had been checked out for longer than 5 minutes
            if (r.isCheckedOut() && !r.isSubmitted() && !r.isApproved()) {
                if (System.currentTimeMillis() > r.getDue().getTime()) {
                    r.setDue(new Timestamp(System.currentTimeMillis() + 300000));

                    result = r;

                    break;
                }
            }

            // if record is incomplete (status == 0)
            if (!r.isCheckedOut() && !r.isSubmitted() && !r.isApproved()) {
                // change status to in progress
                r.setCheckedOut(true);
                r.setDue(new Timestamp(System.currentTimeMillis() + 300000));
                result = r;

                break;
            }
        }

        if (result != null) {
            result = this.recordRepo.save(result);
        }

        // No incomplete record available, invalid result record returned
        return ResponseEntity.ok().body(result);
    }

    // get first incomplete record pdf link
    @GetMapping("/records/approve")
    @Transactional
    public ResponseEntity<Record> approveByJobId(@RequestParam(name = "job_id") Long jobId) {
        // get a list of records with matching job id
        List<Record> filteredRecords = this.recordRepo.findByJobId(jobId);

        for (Record record : filteredRecords) {
            System.out.println(record);
        }

        Record result = null;

        for (Record r : filteredRecords) {
            // check if the record had been checked out for longer than 5 minutes
            if (r.isCheckedOut() && r.isSubmitted() && !r.isApproved()) {
                if (System.currentTimeMillis() > r.getDue().getTime()) {
                    r.setDue(new Timestamp(System.currentTimeMillis() + 300000));

                    result = r;

                    break;
                }
            }

            // if record is incomplete (status == 0)
            if (!r.isCheckedOut() && r.isSubmitted() && !r.isApproved()) {
                // change status to in progress
                r.setCheckedOut(true);
                r.setDue(new Timestamp(System.currentTimeMillis() + 300000));
                result = r;
                break;
            }
        }

        if (result != null) {
            result = this.recordRepo.save(result);
        }

        // No incomplete record available, invalid result record returned
        return ResponseEntity.ok().body(result);
    }

    // get first incomplete record pdf link
    @GetMapping("/records/job/{job_id}")
    public ResponseEntity<List<Record>> getByJobId(@PathVariable Long jobId) {
        // get a list of records with matching job id
        List<Record> filteredRecords = this.recordRepo.findByJobId(jobId);
        return ResponseEntity.ok().body(filteredRecords);
    }

    // Get submitted but NOT approved records
    @GetMapping("/records/unapproved")
    public ResponseEntity<List<Record>> getUnapprovedRecords() {
        // get list of records submitted
        List<Record> unapprovedRecords = this.recordRepo.findBySubmittedUnapproved();
        return ResponseEntity.ok().body(unapprovedRecords);
    }

    @PostMapping("/records")
    public ResponseEntity<String> push(@RequestBody Record input) {
        Record result = this.recordRepo.save(input);
        return ResponseEntity.ok().body(new String("Successfully Created Record: " + result.getId()));
    }

    @PostMapping("/jobs/record")
    public ResponseEntity<List<Record>> pushRecords(@RequestParam(name = "job_id") Long id,
            @RequestParam(name = "files") MultipartFile[] files) throws Exception {
        // check job exits
        Job job = this.jobRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job " + id + " does not exist!"));

        // example for path
        Record record = this.recordRepo.findFirstByJobId(id);
        PDF example = null;
        UUID folder = null;
        if (record == null) {
            folder = UUID.randomUUID();
        } else {
            example = this.pdfRepo.findById(record.getPdfId()).orElse(null);
            System.out.println(example.toString());
            String path = example.getPath();
            System.out.println(path);
            String[] pathDivided = path.split("/");
            System.out.println(pathDivided[pathDivided.length - 2]);
            folder = UUID.fromString(pathDivided[pathDivided.length - 2]);
        }

        List<PDF> filesUploaded = new ArrayList<>();
        List<Record> records = new ArrayList<>();

        for (MultipartFile file : files) {
            System.out.println(file.toString());
            filesUploaded.add(this.pdfService.uploadToLocal(file, folder));
        }

        int recordCount = 0;

        for (PDF file : filesUploaded) {
            records.add(this.recordRepo.save(new Record(id, file.getId(), false, false, false, "{}")));
            recordCount += 1;
        }

        job.setSize(job.getSize() + recordCount);

        this.jobRepo.save(job);

        return ResponseEntity.ok(records);
    }

    @PutMapping("/records/submit")
    @Transactional
    public ResponseEntity<Record> update(@RequestBody Record input) throws Exception {
        Record result = this.recordRepo.findById(input.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Record not found for id: " + input.getId()));

        if (result.isSubmitted()) {
            throw new Exception("Already Submitted!");
        }

        result.setCheckedOut(false);
        result.setSubmitted(input.isSubmitted());
        result.setApproved(false);
        result.setJson(input.getJson());
        result.setSubmittedBy(result.getSubmittedBy());
        result.setSubmittedOn(result.getSubmittedOn());

        if (input.isSubmitted() && !input.isApproved()) {
            Job job = this.jobRepo.findById(input.getJobId())
                    .orElseThrow(() -> new ResourceNotFoundException("Job " + input.getJobId() + "  was not found!"));
            job.setIndexed(job.getIndexed() + 1);
            this.jobRepo.save(job);
        }

        return ResponseEntity.ok().body(this.recordRepo.save(result));
    }

    @DeleteMapping("/records/{id}")
    public ResponseEntity<String> removeRecord(@PathVariable(value = "id") Long id) throws Exception {
        this.pdfService.removePDFById(id);
        return ResponseEntity.ok(new String("PDF " + id + " has been removed!"));
    }
}
