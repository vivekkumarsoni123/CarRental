package task.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import task.pojoc.Admin;
import task.pojoc.CarVariant;
import task.pojoc.Company;
import task.pojoc.Customer;

@Service
public class AdminService {

	@Autowired
	private JdbcTemplate jdbc;
	
	// Add Admin:-----
	public int createadmin(Admin admin) {
		String sql = "Insert into admin(username,email,password) values(?,?,?)";
		return jdbc.update(sql, 
				admin.getUsername(),admin.getEmail(),admin.getPassword());
	}
	
	// Admin Login:-----
	public String adminlogin(Admin admin) {
		String sql = "Select password from admin where email = ?";
		 try {
			 String dbPassword = jdbc.queryForObject(
					    sql,
					    (rs, rowNum) -> rs.getString("password"),
					    admin.getEmail()
					);
			 
			 // Compare the provided password with the stored password
			 if (dbPassword != null && dbPassword.equals(admin.getPassword())) {
				 return "Login successful";
			 } else {
				 return null; // Password doesn't match
			 }
	    } catch (Exception e) {
	        return null; // email not found
	    }
	}
	
	//Get All Admins
	public List<Map<String,Object>> alladmins() {
		List<Map<String,Object>> admins = new ArrayList<Map<String,Object>>();
		String sql = "Select * from admin";
		return admins = jdbc.queryForList(sql);
	}
	
	// Add car companies:-----
	public int addcarcompany(Company cmp) {
		String sql = "Insert into company(name,logo_url,created_by) values(?,?,?)";
		return jdbc.update(sql, 
				cmp.getName(),cmp.getLogo_url(),cmp.getCreated_by());
	}
	
	//Get Car companies
	public List<Map<String,Object>> allcompanies() {
		List<Map<String,Object>> companies = new ArrayList<Map<String,Object>>();
		String sql = "Select * from company";
		return companies = jdbc.queryForList(sql);
	}
	
	
	// Add car Variants:-----
	public int addcarvariant(CarVariant cvar) {
		String sql = "Insert into carvariant(company_id,name,color,seats,fuel_type,price_per_day,available,image_url) values(?,?,?,?,?,?,?,?)";
		return jdbc.update(sql, 
				cvar.getCompany_id(),cvar.getName(),cvar.getColor(),cvar.getSeats(),cvar.getFuel_type(),cvar.getPrice_per_day(),cvar.isAvailable(),cvar.getImage_url());
	}
	
	//Get Car Variants
	public List<Map<String,Object>> allvariants() {
		List<Map<String,Object>> variants = new ArrayList<Map<String,Object>>();
		String sql = "Select * from carvariant";
		return variants = jdbc.queryForList(sql);
	}
	
	
	// Add Customer register:-----
	public int regcustomer(Customer customer) {
		String sql = "Insert into customer(cus_name,email,password,license_no,phone) values(?,?,?,?,?)";
		return jdbc.update(sql, 
				customer.getCus_name(),customer.getEmail(),customer.getPassword(),customer.getLicense_no(),customer.getPhone());
	}
	
	
	// Add Customer Login:-----
	public String customerlogin(Customer customer) {
		String sql = "Select password from customer where email = ?";
		 try {
			 String dbPassword = jdbc.queryForObject(
					    sql,
					    (rs, rowNum) -> rs.getString("password"),
					    customer.getEmail()
					);
			 
			 // Compare the provided password with the stored password
			 if (dbPassword != null && dbPassword.equals(customer.getPassword())) {
				 return "Login successful";
			 } else {
				 return null; // Password doesn't match
			 }
	    } catch (Exception e) {
	        return null; // email not found
	    }
	}
}
