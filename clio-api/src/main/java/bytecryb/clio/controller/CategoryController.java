package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.Category;
import bytecryb.clio.repository.CategoryRepository;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {
	@Autowired
	private CategoryRepository catRepo;

	@GetMapping("/categories")
	public List<Category> getAll() {
		return this.catRepo.findAll();
	}

	@PostMapping("/categories")
    public ResponseEntity<String> push(@RequestBody Category input) {
        Category result = this.catRepo.save(input);
        return ResponseEntity.ok().body(new String("Successfully Created Category: " + result.getId()));
    }
}
