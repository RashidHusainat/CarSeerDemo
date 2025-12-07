# CarSeerDemo – Vehicle Lookup Web Application

CarSeerDemo is a lightweight **.NET 9 Razor Web Application** that allows users to:

- Select a **Car Make**
- Select a **Manufacture Year**
- View **Vehicle Types** for the selected make
- View **Vehicle Models** for the selected Make, Year, and Vehicle Type

The app uses the official **NHTSA Vehicle API**, demonstrates modern .NET coding practices, uses **Refit** + **Polly** for API resilience, and includes Docker support.  
It is also deployed on **AWS EC2 (Windows Server + IIS)**.

---

## 📌 Features

- ✔️ Built with **.NET 9 Razor**
- ✔️ **Refit** for strongly-typed REST clients
- ✔️ **Polly** for retries + resilience
- ✔️ Responsive **Bootstrap 5** UI
- ✔️ jQuery for dynamic UI interactions
- ✔️ **Dockerized** for portability
- ✔️ **Response caching & Lazy Loading** for Makes drop down list
- ✔️ Hosted on **AWS EC2 Free Tier (IIS on Windows Server 2025)**  
- ✔️ Clean and simple architecture with no over-engineering

---

## 📡 External APIs Used

| Purpose | API |
|--------|-----|
| Get All Makes | `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json` |
| Vehicle Types for Make | `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/{makeId}?format=json` |
| Models for Make + Year | `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json` |

---


---

## 🛠️ Technology Stack

- .NET 9
- Razor 
- Refit
- Polly
- Bootstrap 5
- jQuery
- Docker
- IIS on AWS EC2 (Windows Server)

---

## 📥 How to Run the Application Locally

###  Clone the repository then run the project
```bash
git clone https://github.com/RashidHusainat/CarSeerDemo.git
cd CarSeerDemo
dotnet run
```
### Or open CarSeerDemo solution in visual studio then run the CarSeerDemo project 