package task.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import task.pojoc.Booking;
import task.pojoc.Customer;
import task.services.AdminService;
import task.services.BookingService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

	@Autowired
	private AdminService service;
	
	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/test")
	public Map<String,Object> test() {
		Map<String,Object> mp = new HashMap<>();
		mp.put("success", true);
		mp.put("message", "Backend is working!");
		return mp;
	}
	
	//register customer:---
	@PostMapping("/customersignup")
	public Map<String,Object> customerregister(@RequestBody Customer customer) {
		Map<String,Object> mp = new HashMap<>();
		try {
			System.out.println("Registration attempt for: " + customer.getEmail());
			int result = service.regcustomer(customer);
			System.out.println("Registration result: " + result);
			if(result > 0) {
				mp.put("success", true);
				mp.put("message", "Customer registered successfully!");
			} else {
				mp.put("success", false);
				mp.put("message", "Registration failed!");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Registration error: " + e.getMessage());
			mp.put("success", false);
			mp.put("message", "Something went wrong during registration: " + e.getMessage());
		}
		return mp;
	}
	
	@PostMapping("/customer/login") 
	public Map<String,Object> customerlogin(@RequestBody Customer cus) {
		Map<String,Object> mp = new HashMap<>();
		try {
			System.out.println("Login attempt for: " + cus.getEmail());
			String result = service.customerlogin(cus);
			System.out.println("Login result: " + result);
			if(result != null && result.equals("Login successful")) {
				mp.put("success", true);
				mp.put("message", "Login successful!");
				mp.put("user", cus.getEmail());
			} else {
				mp.put("success", false);
				mp.put("message", "Invalid credentials!");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("Login error: " + e.getMessage());
			mp.put("success", false);
			mp.put("message", "Login failed due to server error: " + e.getMessage());
		}
		return mp;
	}
	
	 @PostMapping("/create")
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        int result = bookingService.carbooking(booking);

        if (result > 0) {
            return ResponseEntity.ok("Booking created successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create booking.");
        }
	    }
}
