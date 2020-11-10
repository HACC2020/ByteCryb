package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.model.Record;
import bytecryb.clio.repository.RecordRepository;

@RestController
@RequestMapping("/api/v1")
public class RecordController {
    @Autowired
    private RecordRepository recordRepo;

    // get all records
    @GetMapping("/records/all")
    public List<Record> getAll() {
        return this.recordRepo.findAll();
    }

    @GetMapping("/records")
    public ResponseEntity<Record> getById(@RequestParam(name = "id") Long id) throws ResourceNotFoundException {
        Record result = this.recordRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record" + id + "was not found"));
        return ResponseEntity.ok().body(result);
    }

    // get first incomplete record pdf link
    @GetMapping("/get_record_by_job")
    @Transactional
    public ResponseEntity<Record> popByJobId(@RequestParam(name = "id") Long jobId) {
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

    @PutMapping("/records")
    @Transactional
    public ResponseEntity<Record> update(@RequestParam(name = "record_id") Long id, @RequestBody Record input) throws ResourceNotFoundException {
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
