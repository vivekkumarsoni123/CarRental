package task.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import task.pojoc.Booking;

@Service
public class BookingService {

	@Autowired
	private JdbcTemplate jdbc;
	
	public int carbooking(Booking book) {
		String sql = "Insert into booking(cus_id,car_id,start_date,end_date,status,admin_id,payment_status,total_price) values(?,?,?,?,?,?,?,?)";
		return jdbc.update(sql, 
				book.getCus_id(),book.getCar_id(),book.getStart_date(),book.getEnd_date(),book.getStatus(),book.getAdmin_id(),book.getPayment_status(),
				book.getTotal_price());
	}
}
