package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import bytecryb.clio.repository.RecordRepository;
import bytecryb.clio.model.Record;

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

    

}
