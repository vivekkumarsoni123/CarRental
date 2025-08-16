
# 🚗 Car Rental Management System

A **full-stack web application** for managing car rentals, built with **Spring Boot (Java)** for the backend, **React.js** for the frontend, and **MySQL** as the database. This system allows **admins** to manage companies and car variants, while **customers** can browse and book cars seamlessly.

---

## ✨ Features

### 🔑 Admin
- Add, update, or delete **companies** and **car variants**  
- Approve or reject **customer bookings**  
- Manage users and rental history  

### 👤 Customer
- Register and login securely  
- Browse available cars and filter by type/company  
- Book cars and view booking status  
- Manage profile and rental history  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Bootstrap, Axios  
- **Backend:** Spring Boot, REST APIs  
- **Database:** MySQL with foreign key constraints  
- **Other Tools:** Maven, Postman (API testing), Git/GitHub  

---

## 🏗️ Architecture

```text
Frontend (React)  <-->  Backend (Spring Boot REST APIs)  <-->  MySQL Database
````

* RESTful APIs ensure smooth communication between frontend and backend
* MySQL ensures relational consistency with foreign keys (e.g., company → car variants → bookings)
* Responsive UI built with React.js for user-friendly interaction

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/car-rental-system.git
cd car-rental-system
```

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

* Default server runs on: `http://localhost:8080`

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

* Default server runs on: `http://localhost:5071`

### 4️⃣ Database Setup

* Create a MySQL database named `car_rental`
* Import the provided SQL schema from `/database/schema.sql`
* Update DB credentials in `application.properties` (Spring Boot)

---

## 📸 Screenshots (Optional)

<img width="1911" height="993" alt="image" src="https://github.com/user-attachments/assets/4eee153d-ecb5-4f46-812d-a463c7866dc7" />
<img width="1915" height="1022" alt="image" src="https://github.com/user-attachments/assets/ce79e3e4-847f-44f5-bf2e-a0ca78bdb103" />
<img width="1585" height="826" alt="image" src="https://github.com/user-attachments/assets/3ac59618-7b11-4845-9436-7dfc0693290d" />
<img width="1690" height="976" alt="image" src="https://github.com/user-attachments/assets/96196a71-fc66-419b-bd56-dfee9907a16a" />



---

## 🚀 Future Enhancements

* Integration of **payment gateway** for online transactions
* Real-time **availability tracking** of cars
* Adding **JWT-based authentication** and role-based access
* Deployment on **AWS/GCP** with CI/CD pipelines

---

## 👨‍💻 Author

**Vivek Kumar Soni**

* [LinkedIn](https://linkedin.com/in/vivek-kumar-soni-9b2591258)
* [GitHub](https://github.com/vivekkumarsoni123)

```
