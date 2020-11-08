package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.transaction.annotation.Transactional;

import bytecryb.clio.repository.RecordRepository;
import bytecryb.clio.model.Record;
import bytecryb.clio.model.ResultRecord;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    @Autowired
    private RecordRepository recordRepo;
    //get all records
    @GetMapping("/all") 
    public List<Record> getAllRole() {
        return this.recordRepo.findAll();
    }

    //get first incomplete record pdf link
    @GetMapping("/firstIncomplete")
    @Transactional
    public ResultRecord getFirstIncompleteRecord(Long jobId) {
        //if jobId passed in is null return an invalid result record
        if (jobId == null) {
            return new ResultRecord(-1, "", "", -1);
        }
        //get xml associated with jobId
        String xmlPath = "dummy path"; 

        //get a list of records with matching job id
        List<Record> filteredRecords = this.recordRepo.findByJobId(jobId);

        for (Record r : filteredRecords) {
            int status = r.getStatus();
            //if record is incomplete (status == 0)
            if (status == 0) {
                //change status to in progress
                r.setStatus(1);
                //create new result record object
                ResultRecord rec = new ResultRecord(r.getId() ,xmlPath, r.getPdfLink(), r.getStatus());
                return rec;
            }
        }

        //No incomplete record available, invalid result record returned
        return new ResultRecord(-1, "", "", -1);
    }

}
