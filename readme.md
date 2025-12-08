# ☀️ Aplikasi Cuaca 
A simple and modern Weather App built with **HTML, CSS, and JavaScript**, featuring animated weather effects, hourly forecast, autosuggest city search, and a minimalist splash screen.

This project uses the **OpenWeather API** to fetch real-time weather information.

---

## ✨ Fitur Utama

### 🌦️ 1. Cuaca Utama (Current Weather)
- Nama kota & negara  
- Suhu real-time  
- Deskripsi cuaca  
- Angin  
- Kelembapan  
- Feels like  

### 🎨 2. Animasi Cuaca Dinamis
Animasi otomatis berubah sesuai kondisi cuaca:
- ☀️ Cerah → Sun float animation  
- ☁️ Berawan → Moving clouds  
- 🌧️ Hujan → Rain particle animation  

### 🕒 3. Hourly Forecast (24 Jam)
- Menggunakan **Forecast API (3-hour interval)**  
- Scroll horizontal  
- Ikon cuaca per jam  
- Suhu setiap interval  

### 🔎 4. Auto-Suggest Kota (Geocoding API)
- Ketik nama kota → muncul daftar kota  
- Pilih salah satu untuk mendapatkan cuaca  
- Akurat dan cepat  

### 🌀 5. Parallax Weather Card
- Kartu cuaca bergerak mengikuti pergerakan mouse  
- Efek 3D modern seperti kartu iOS  

### 🚀 6. Minimalist Splash Screen
- Animasi dot loader modern  
- Fade-in & fade-out smooth  
- Memberikan pengalaman aplikasi profesional  

### 📍 7. Auto-Detect Lokasi
- Menggunakan browser geolocation  
- Menampilkan cuaca sesuai lokasi pengguna  

---

## 🧩 Teknologi yang Digunakan
- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **OpenWeather API**
- **Chart.js (optional)**

---

## 📦 Instalasi & Menjalankan Proyek

1. Clone repository:

```bash
git clone https://github.com/username/weather-animated-app.git
```

2. Masuk ke folder:

```bash
cd weather-animated-app
```

3. Jalankan aplikasi dengan membuka:

```
index.html
```

Tidak memerlukan server tambahan (pure frontend).

---

## 🔑 Konfigurasi API Key

Dapatkan API Key di:

https://home.openweathermap.org/api_keys

Masukkan Key pada:

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

---

## 📁 Struktur Folder

```
📂 weather-app/
│── 📄 index.html
│── 📄 style.css
│── 📄 script.js
│── 📄 README.md
```

---

## 🎯 Roadmap / Fitur Mendatang

- 7-Day Forecast  
- Air Quality Index (AQI)  
- Wind Compass Animation  
- Dark Mode Toggle  
- Sunrise/Sunset chart  
- PWA support  

---

## 🤝 Kontribusi
Kontribusi sangat dipersilakan! Ajukan pull request atau buat issue baru untuk usulan fitur.

---

## 📝 Lisensi
Proyek ini berada di bawah **MIT License**.

---

## 💬 Kontak
**Author:** yourname  
Email: yourmail@example.com  
