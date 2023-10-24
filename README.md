# Threetierapplication

This is the front end for the Sample user registration 
cd frontend

Edit script.js update the top 2 lines 
    const loginEndpoint = 'http://192.168.29.161:3000/login'; #Replace 192.168.29.161 with the ip of the backend running on 
    const registerEndpoint = 'http://192.168.29.161:3000/register'; # Replace 192.168.29.161 with the ip of the backend running on 
npm init
npm install http-server --save
docker build -t my-frontend .
docker run -d -p 8080:80 my-frontend
how access using htpp://localhost:8080
Run this below query on the database ssms
USE tempdb; -- You may change the database name if needed

-- Create the Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(255) NOT NULL,
    Password NVARCHAR(255) NOT NULL
);
