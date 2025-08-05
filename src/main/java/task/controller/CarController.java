package task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import task.pojoc.Booking;
import task.services.BookingService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {

	@Autowired
	private BookingService service;
	
	@PostMapping("/car/book")
	public String bookcar(@RequestBody Booking book) {
		try {
			int result = service.carbooking(book);
			if(result > 0) return "Success! Car Booking requested";
			return "Failed! Something wrong";
		}
		catch(Exception e) {
			e.printStackTrace();
			return "Failed! Something wrong";
		}
	}
}
