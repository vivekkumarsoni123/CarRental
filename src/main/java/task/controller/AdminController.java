package task.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import task.pojoc.Admin;
import task.pojoc.CarVariant;
import task.pojoc.Company;
import task.services.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

	@Autowired
	private AdminService adservice;
	
	// Add Admin:-----
	@PostMapping("/admin/add")
	public Map<String,Object> addadmin(@RequestBody Admin admin) {
		Map<String,Object> mp = new HashMap<>();
		try {
			System.out.println("Admin registration attempt for: " + admin.getEmail());
			int result = adservice.createadmin(admin);
			System.out.println("Admin registration result: " + result);
			if(result > 0) {
				mp.put("success", true);
				mp.put("message", "Admin registered successfully!");
			} else {
				mp.put("success", false);
				mp.put("message", "Admin registration failed!");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Admin registration error: " + e.getMessage());
			mp.put("success", false);
			mp.put("message", "Something went wrong during admin registration: " + e.getMessage());
		}
		return mp;
	}
	
	// Admin Login:-----
	@PostMapping("/admin/login")
	public Map<String,Object> adminlogin(@RequestBody Admin admin) {
		Map<String,Object> mp = new HashMap<>();
		try {
			System.out.println("Admin login attempt for: " + admin.getEmail());
			String result = adservice.adminlogin(admin);
			System.out.println("Admin login result: " + result);
			if(result != null && result.equals("Login successful")) {
				mp.put("success", true);
				mp.put("message", "Admin login successful!");
				mp.put("admin", admin.getEmail());
			} else {
				mp.put("success", false);
				mp.put("message", "Invalid admin credentials!");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Admin login error: " + e.getMessage());
			mp.put("success", false);
			mp.put("message", "Admin login failed due to server error: " + e.getMessage());
		}
		return mp;
	}
	
	// Get All Admins:-----
	@GetMapping("/admin/alladmins")
	public List<Map<String,Object>> fetchalladmins() {
		List<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
		return lst = adservice.alladmins();
	}
	
	// Add Car Company:-----
	@PostMapping("/admin/addcompany")
	public Map<String,Object> addcompany(@RequestBody Company company) {
		Map<String,Object> mp = new HashMap<>();
		try {
			System.out.println("Company addition attempt for: " + company.getName());
			int result = adservice.addcarcompany(company);
			System.out.println("Company addition result: " + result);
			if(result > 0) {
				mp.put("success", true);
				mp.put("message", "Company added successfully!");
			} else {
				mp.put("success", false);
				mp.put("message", "Company addition failed!");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Company addition error: " + e.getMessage());
			mp.put("success", false);
			mp.put("message", "Something went wrong during company addition: " + e.getMessage());
		}
		return mp;
	}
	
	// Get All Companies:-----
	@GetMapping("/admin/allcompanies")
	public List<Map<String,Object>> fetchallcompanies() {
		List<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
		return lst = adservice.allcompanies();
	}
	
	// Add Car Variant:-----
	@PostMapping("/admin/addvarient")
	public Map<String,Object> addvarient(@RequestBody CarVariant carvariant) {
		Map<String,Object> mp = new HashMap<>();
		try {
			System.out.println("Car variant addition attempt for: " + carvariant.getName());
			int result = adservice.addcarvariant(carvariant);
			System.out.println("Car variant addition result: " + result);
			if(result > 0) {
				mp.put("success", true);
				mp.put("message", "Car variant added successfully!");
			} else {
				mp.put("success", false);
				mp.put("message", "Car variant addition failed!");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Car variant addition error: " + e.getMessage());
			mp.put("success", false);
			mp.put("message", "Something went wrong during car variant addition: " + e.getMessage());
		}
		return mp;
	}
	
	//allvariant:----
	@GetMapping("/admin/allvarient")
	public List<Map<String,Object>> fetchallvariants() {
		List<Map<String,Object>> lst = new ArrayList<Map<String,Object>>();
		return lst = adservice.allvariants();
	}
}
