package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.transaction.annotation.Transactional;

import bytecryb.clio.repository.RecordRepository;
import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.model.Record;

@RestController
@RequestMapping("/api/v1")
public class RecordController {
    @Autowired
    private RecordRepository recordRepo;

    // get all records
    @GetMapping("/records")
    public List<Record> getAll() {
        return this.recordRepo.findAll();
    }

    @GetMapping("/records/{id}")
    public ResponseEntity<Record> getById(@PathVariable(name = "id") Long id) throws ResourceNotFoundException {
        Record result = this.recordRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record" + id + "was not found"));
        return ResponseEntity.ok().body(result);
    }

    // get first incomplete record pdf link
    @GetMapping("/records/{job_id}")
    @Transactional
    public ResponseEntity<Record> popByJobId(@PathVariable(name = "job_id") Long jobId) {
        // get a list of records with matching job id
        List<Record> filteredRecords = this.recordRepo.findByJobId(jobId);

        Record result = null;

        for (Record r : filteredRecords) {
            // if record is incomplete (status == 0)
            if (!r.isSubmitted()) {
                // change status to in progress
                r.setCheckedOut(true);

                result = r;
            }
        }

        // No incomplete record available, invalid result record returned
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/records")
    public ResponseEntity<String> push(@RequestBody Record input) {
        Record result = this.recordRepo.save(input);
        return ResponseEntity.ok().body(new String("Successfully Created Record: " + result.getId()));
    }

    @PutMapping("/records/{id}")
    @Transactional
    public ResponseEntity<Record> update(@RequestBody Record input) throws ResourceNotFoundException {
        Record result = this.recordRepo.findById(input.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Record not found for id: " + input.getId()));

        result.setCheckedOut(result.isCheckedOut());
        result.setSubmitted(result.isSubmitted());
        result.setApproved(result.isApproved());
        result.setJson(input.getJson());
        final Record update = this.recordRepo.save(result);
        return ResponseEntity.ok().body(update);
    }
}
