package bytecryb.clio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.Category;
import bytecryb.clio.repository.CategoryRepository;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	@Autowired
	private CategoryRepository catRepo;
	
	@GetMapping("/all")
	public List<Category> getAll() {
		return this.catRepo.findAll();
	}
}
