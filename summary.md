<<<<<<< HEAD
Siap. Berikut **PRD final** yang sudah disesuaikan dengan keputusan yang benar-benar fix:

* deploy di **GitHub Pages**
* sumber data hanya dari **`data.txt`**
* **tidak ada fitur tambah/edit/hapus kata di aplikasi**
* query pencarian hanya dari **tombol A–Z**
* mode **Awalan** dan **Akhiran**
* teman Anda cukup buka link web, lalu saat Anda update `data.txt` di repo dan deploy selesai, mereka tinggal buka/refresh link yang sama
* struktur folder yang sudah ada: **`Project_Sambung_Kata`** berisi minimal `summary.md` dan `data.txt`

Isi di bawah ini bisa langsung Anda pakai sebagai isi baru `summary.md`.

---

# PRD — Project Sambung Kata

## 1. Ringkasan Produk

Project Sambung Kata adalah aplikasi web ringan berbasis static site yang di-host di **GitHub Pages**. Aplikasi digunakan untuk mencari kata dari sebuah file sumber bernama **`data.txt`** berdasarkan:

* **Awalan** (prefix)
* **Akhiran** (suffix)

User membentuk query pencarian dengan menekan tombol huruf **A–Z** di layar. Aplikasi **tidak** menyediakan fitur input/edit data kata dari UI. Semua data dikelola manual di luar aplikasi melalui file **`data.txt`**, lalu dipublikasikan bersama project.

Aplikasi ditujukan untuk penggunaan sederhana, cepat, ringan, dan mudah dipakai di **HP maupun laptop**, dengan target user kecil dan tanpa backend.

---

## 2. Keputusan Final yang Tidak Boleh Berubah

1. Platform aplikasi adalah **web app**, bukan APK.
2. Hosting target adalah **GitHub Pages**.
3. Sumber data utama dan satu-satunya adalah file **`data.txt`**.
4. File **`data.txt`** diisi manual oleh pemilik project di luar aplikasi.
5. Aplikasi **tidak** memiliki fitur:

   * tambah kata
   * edit kata
   * hapus kata
   * import/export data dari UI
   * localStorage/database
6. Input query pencarian **hanya** dari tombol huruf **A–Z** pada UI.
7. Terdapat dua mode pencarian:

   * **Awalan**
   * **Akhiran**
8. Saat mode diganti, query yang sudah terbentuk **tidak di-reset**.
9. Hasil pencarian menampilkan **semua hasil yang cocok**.
10. Teman/user lain cukup membuka link GitHub Pages yang sama untuk memakai versi data terbaru.
11. Aplikasi harus selalu mencoba mengambil `data.txt` terbaru saat halaman dibuka/refreshed.
12. Folder project yang dipakai adalah **`Project_Sambung_Kata`**.
13. File **`summary.md`** hanya untuk dokumentasi, **bukan** bagian runtime aplikasi.

---

## 3. Tujuan Produk

Tujuan aplikasi:

1. Menyediakan pencarian kata yang sangat sederhana dan cepat.
2. Menghindari keribetan sinkronisasi file manual di sisi user.
3. Membuat update data cukup dilakukan oleh 1 orang dengan mengubah `data.txt` di repo.
4. Membuat user lain cukup buka/refresh web untuk melihat data terbaru.
5. Menjaga implementasi tetap ringan tanpa backend, database, framework berat, atau logika rumit.

---

## 4. Masalah yang Diselesaikan

Masalah utama yang ingin diselesaikan:

* User ingin mencari kata berdasarkan awalan/akhiran.
* Data bisa ratusan hingga ribuan kata.
* User lain tidak paham mengganti file manual di perangkat mereka.
* Dibutuhkan solusi yang cukup sederhana: update di satu tempat, semua orang buka link yang sama.
* Tidak ingin ada ketergantungan pada storage browser, database, atau proses sinkronisasi yang rumit.

---

## 5. Target User

Target user:

* Pemilik project yang mengelola `data.txt`
* Teman/user lain yang hanya memakai aplikasi untuk mencari kata

Karakteristik:

* Tidak teknis
* Menggunakan HP atau laptop
* Tidak ingin setup ribet
* Hanya butuh buka web dan langsung pakai

---

## 6. Struktur Folder Final Project

Struktur minimum yang harus dipakai di folder `Project_Sambung_Kata`:

```text
Project_Sambung_Kata/
├── summary.md
├── data.txt
├── index.html
├── styles.css
└── app.js
```

Keterangan:

* `summary.md` = dokumen requirement/PRD
* `data.txt` = sumber data kata
* `index.html` = halaman utama aplikasi
* `styles.css` = styling UI
* `app.js` = logika aplikasi

Semua file runtime (`index.html`, `styles.css`, `app.js`, `data.txt`) harus berada di level folder yang sama agar path relatif tetap sederhana.

---

## 7. Sumber Data

### 7.1 Nama file

Nama file sumber data harus **tepat**:

```text
data.txt
```

### 7.2 Lokasi file

File `data.txt` harus berada di folder yang sama dengan `index.html`.

### 7.3 Format file

Format `data.txt` adalah **plain text UTF-8**, dengan aturan:

* **1 baris = 1 data kata**
* Setiap baris dibaca sebagai satu entri
* Baris kosong diabaikan
* Spasi di awal/akhir baris dihapus saat parsing
* Huruf besar/kecil dianggap sama saat pencarian
* File ini bisa disiapkan manual, termasuk bila sumbernya berasal dari hasil copy/download dari Google, selama hasil akhirnya berupa plain text yang bersih

### 7.4 Contoh isi `data.txt`

```text
apel
anggur
makan
minum
bakso
jalan
```

### 7.5 Aturan kualitas data

Direkomendasikan:

* satu kata per baris
* tidak pakai numbering
* tidak pakai bullet
* tidak pakai koma di akhir
* tidak pakai karakter dekoratif

Contoh **yang benar**:

```text
apel
anggur
makan
```

Contoh **yang tidak direkomendasikan**:

```text
1. apel
- anggur
makan,
```

Catatan:
Aplikasi akan membaca isi per baris apa adanya setelah trim. Jadi bila file berisi `1. apel`, maka entri itu akan dianggap literal sebagai `1. apel`, yang bisa membuat hasil pencarian tidak sesuai harapan. Karena itu file sumber harus dibersihkan manual sebelumnya.

---

## 8. Aturan Parsing dan Normalisasi Data

Saat `data.txt` dimuat, aplikasi harus melakukan langkah berikut:

1. Membaca file sebagai text.
2. Menghapus BOM UTF-8 jika ada.
3. Memecah text berdasarkan line break (`\n` atau `\r\n`).
4. Melakukan `trim()` pada setiap baris.
5. Mengabaikan baris kosong.
6. Menyimpan nilai asli hasil trim untuk ditampilkan.
7. Membuat nilai normalisasi lowercase untuk keperluan pencarian.
8. Menghapus duplikasi secara **case-insensitive**.

Contoh:

```text
Apel
apel
APEL
```

Hasil akhir di memori cukup disimpan satu entri saja.

---

## 9. Perilaku Update Data

### 9.1 Cara update data

Update data dilakukan dengan cara:

1. Edit file `data.txt`
2. Commit/push perubahan ke repository
3. GitHub Pages mempublikasikan perubahan
4. User membuka atau me-refresh halaman web

### 9.2 Auto update yang dimaksud

Definisi “otomatis terupdate” untuk project ini adalah:

* Saat user membuka halaman web, aplikasi harus mengambil `data.txt` terbaru dari server
* Saat user me-refresh halaman, aplikasi harus mengambil `data.txt` terbaru dari server

### 9.3 Yang tidak termasuk auto update

Berikut **bukan** bagian scope:

* sinkronisasi live tanpa refresh
* websocket
* polling realtime
* push update otomatis saat halaman sedang terbuka terus

Artinya:

* bila `data.txt` diubah ketika user sedang membuka halaman, user perlu **refresh halaman** untuk melihat data terbaru

---

## 10. Keputusan Teknis Penting untuk Mencegah Cache Lama

Karena data di-host di GitHub Pages, aplikasi harus meminimalkan risiko `data.txt` lama terbaca dari cache browser.

Maka implementasi wajib:

1. `fetch` ke `data.txt` harus memakai cache-busting query parameter, misalnya:

   * `data.txt?t=<timestamp>`
2. `fetch` harus memakai opsi:

   * `cache: 'no-store'`
3. Aplikasi **tidak boleh** memakai service worker pada MVP
4. Aplikasi **tidak perlu** dibuat sebagai PWA pada MVP

Tujuannya agar saat user membuka/refresh halaman, kemungkinan membaca data lama jauh lebih kecil.

---

## 11. User Flow

### 11.1 User biasa

1. User membuka link aplikasi
2. Aplikasi memuat `data.txt`
3. Setelah data berhasil dimuat, user memilih mode
4. User menekan huruf A–Z
5. Query terbentuk
6. Hasil pencarian tampil realtime

### 11.2 Pemilik project

1. Pemilik project menyiapkan atau mengedit `data.txt`
2. Commit/push perubahan ke repo
3. GitHub Pages update
4. User lain membuka/refresh link yang sama
5. Data terbaru dipakai otomatis

---

## 12. Functional Requirements

## FR-01 — Startup dan Loading State

Saat aplikasi dibuka:

* aplikasi langsung mencoba memuat `./data.txt`
* sebelum data selesai dimuat, tombol pencarian harus nonaktif
* UI harus menampilkan status:

  * **“Memuat data...”**

---

## FR-02 — Success State setelah Data Berhasil Dimuat

Jika `data.txt` berhasil dimuat:

* tombol pencarian menjadi aktif
* mode default adalah **Awalan**
* query default kosong
* UI menampilkan jumlah total data valid yang berhasil dimuat
* jika query masih kosong, aplikasi **belum** menampilkan semua kata

Alasan:
Karena data bisa ratusan/ribuan kata, maka saat query kosong lebih baik tampilkan state idle, bukan seluruh daftar data.

Pesan idle saat query kosong:

* **“Pilih huruf untuk mulai mencari.”**

Tambahan info:

* tampilkan total data, misalnya:

  * **“Total data: 2.483 kata”**

---

## FR-03 — Error State jika `data.txt` Gagal Dimuat

Jika file gagal dimuat karena tidak ada, path salah, atau fetch gagal:

* tombol A–Z harus tetap nonaktif
* tombol Backspace dan Reset nonaktif
* area hasil menampilkan pesan error yang jelas

Pesan minimum:

* **“Gagal memuat data. Pastikan file data.txt tersedia.”**

Bila perlu, boleh ditambahkan info teknis ringan:

* **“Aplikasi harus dijalankan dari GitHub Pages atau local server, bukan dibuka langsung via file://.”**

---

## FR-04 — Empty Data State

Jika `data.txt` berhasil dimuat tetapi setelah parsing tidak ada entri valid:

* aplikasi tetap tampil normal
* tombol A–Z boleh aktif atau nonaktif, tetapi disarankan nonaktif
* area hasil menampilkan:

  * **“Data kosong. Isi data.txt terlebih dahulu.”**

---

## FR-05 — Mode Pencarian

Aplikasi wajib memiliki 2 mode:

* **Awalan**
* **Akhiran**

Default saat halaman dibuka:

* **Awalan**

Saat user mengganti mode:

* query yang sedang aktif **tetap dipertahankan**
* hasil langsung dihitung ulang secara realtime

---

## FR-06 — Input Query hanya dari Tombol A–Z

Aplikasi wajib menyediakan tombol huruf:

* A sampai Z

Aturan:

* setiap klik menambahkan 1 huruf ke query aktif
* query dapat terdiri dari banyak huruf
* query **tidak** diketik lewat keyboard
* tampilan query harus read-only / display-only

Contoh:

* klik `A` → query = `A`
* klik `Z` → query = `AZ`
* klik `X` → query = `AZX`

---

## FR-07 — Tombol Backspace

Aplikasi wajib memiliki tombol **Backspace**.

Perilaku:

* menghapus 1 huruf terakhir dari query
* bila query kosong, tombol tidak melakukan apa-apa atau berada dalam keadaan disabled

Contoh:

* `AZXC` → Backspace → `AZX`

---

## FR-08 — Tombol Reset

Aplikasi wajib memiliki tombol **Reset**.

Perilaku:

* menghapus seluruh query
* mode saat ini tidak berubah
* setelah query kosong, aplikasi kembali ke state idle:

  * **“Pilih huruf untuk mulai mencari.”**

---

## FR-09 — Logika Pencarian

Pencarian harus bersifat **case-insensitive**.

### Mode Awalan

Jika mode = Awalan, tampilkan data yang:

* diawali query

Contoh:

* query = `A`
* hasil: `apel`, `anggur`

### Mode Akhiran

Jika mode = Akhiran, tampilkan data yang:

* diakhiri query

Contoh:

* query = `AN`
* hasil: `makan`, `jalan`

---

## FR-10 — Hasil Pencarian Realtime

Setelah user menekan huruf, hasil pencarian harus langsung diperbarui tanpa tombol Cari.

Update realtime harus terjadi saat:

* huruf ditambahkan
* Backspace ditekan
* Reset ditekan
* mode diganti

---

## FR-11 — Tampilan Hasil

Saat ada hasil:

* tampilkan **semua** hasil yang cocok
* tampilkan jumlah hasil
* hasil diletakkan dalam area yang dapat discroll
* hasil disusun rapi dan mudah dibaca di HP maupun laptop

Format minimum:

* list vertikal

Info minimum:

* **“Hasil: 23 kata”**

### Urutan hasil

Hasil harus diurutkan alfabetis secara case-insensitive menggunakan locale yang cocok untuk bahasa Indonesia bila memungkinkan.

---

## FR-12 — No Match State

Jika query tidak menghasilkan kecocokan apa pun:

* area hasil menampilkan:

  * **“Tidak ada data”**

Contoh:

* mode Awalan
* query `AZXC`
* tidak ada kecocokan
* tampilkan **“Tidak ada data”**

---

## FR-13 — Query Kosong

Jika query kosong:

* aplikasi **tidak** menampilkan semua data
* area hasil menampilkan state idle:

  * **“Pilih huruf untuk mulai mencari.”**

Tambahan:

* info total data tetap boleh ditampilkan

---

## FR-14 — Responsif di HP dan Laptop

Aplikasi harus nyaman digunakan di:

* HP
* laptop
* tablet kecil

Ketentuan UI:

* tombol huruf cukup besar untuk disentuh
* jarak antar tombol cukup
* layout tidak pecah di layar sempit
* hasil bisa discroll
* mode toggle mudah diakses

---

## FR-15 — Bahasa UI

Bahasa UI utama:

* **Bahasa Indonesia**

Teks minimum yang dipakai:

* Memuat data...
* Gagal memuat data. Pastikan file data.txt tersedia.
* Data kosong. Isi data.txt terlebih dahulu.
* Pilih huruf untuk mulai mencari.
* Tidak ada data
* Awalan
* Akhiran
* Backspace
* Reset
* Total data: X kata
* Hasil: X kata

---

## FR-16 — `summary.md` tidak Dipakai oleh Runtime

Aplikasi **tidak boleh** membaca atau menggunakan `summary.md` saat runtime.

`summary.md` hanya berfungsi sebagai:

* dokumen requirement
* catatan project
* dokumentasi internal

---

## FR-17 — `data.txt` adalah Satu-satunya Sumber Data

Tidak boleh ada sumber data lain seperti:

* localStorage
* hardcoded array besar di `app.js`
* database online
* file JSON tambahan
* spreadsheet live sync

Semua data pencarian harus berasal dari `data.txt`.

---

## 13. Non-Functional Requirements

### NFR-01 — Ringan

Aplikasi harus ringan:

* tanpa framework berat
* tanpa dependency yang tidak perlu
* cukup HTML, CSS, dan Vanilla JavaScript

### NFR-02 — Cepat

Target performa:

* untuk ratusan hingga beberapa ribu data, pencarian harus terasa instan
* perubahan hasil setelah klik huruf harus sangat cepat

Pendekatan yang cukup:

* load `data.txt` sekali saat startup
* simpan data di memori
* filter di sisi client

### NFR-03 — Sederhana

Kode harus mudah dipahami dan mudah dirawat.

### NFR-04 — Tidak Bergantung Storage Browser

Aplikasi tidak menggunakan:

* localStorage
* IndexedDB
* sessionStorage

### NFR-05 — Stabil

Aplikasi tidak boleh crash ketika:

* file kosong
* ada baris kosong
* ada duplikasi
* file gagal dimuat

### NFR-06 — Mudah Dideploy

Aplikasi harus bisa langsung di-host sebagai static files di GitHub Pages.

### NFR-07 — Tidak Mengganggu Auto Update

Karena prioritasnya data terbaru, maka:

* jangan gunakan service worker
* jangan gunakan cache agresif untuk data
* `data.txt` harus selalu dicoba diambil ulang saat load

---

## 14. Desain UI Minimum

## 14.1 Komponen UI

Urutan komponen yang direkomendasikan:

1. Judul aplikasi
2. Status data

   * total data / loading / error
3. Toggle mode

   * Awalan / Akhiran
4. Display query aktif
5. Tombol aksi

   * Backspace
   * Reset
6. Grid tombol A–Z
7. Ringkasan hasil
8. Area hasil

## 14.2 Perilaku visual

* Query aktif terlihat jelas
* Mode aktif terlihat berbeda
* Tombol disabled punya tampilan nonaktif
* Area hasil tidak terlalu tinggi di mobile agar keyboard tombol tetap terlihat

---

## 15. Batasan Teknis

1. Aplikasi harus mengakses `data.txt` menggunakan path relatif.
2. Aplikasi diutamakan berjalan dari hosting GitHub Pages.
3. Membuka `index.html` langsung via `file://` **bukan** skenario utama produksi.
4. Untuk testing lokal saat development, disarankan memakai local server / preview dari editor.
5. Tidak boleh ada backend.

---

## 16. Out of Scope

Hal-hal berikut **bukan** bagian MVP:

* APK
* backend
* database
* login
* akun user
* localStorage
* import/export dari UI
* fitur tambah/edit/hapus kata di aplikasi
* pencarian via keyboard
* realtime update tanpa refresh
* service worker / PWA
* analytics
* notifikasi
* upload file dari user
* membaca `summary.md` untuk data

---

## 17. Acceptance Criteria

Aplikasi dianggap selesai bila semua poin berikut terpenuhi:

1. Project berjalan sebagai static web app.
2. File `data.txt` dibaca dari folder yang sama dengan `index.html`.
3. Aplikasi menampilkan loading state saat startup.
4. Jika `data.txt` gagal dimuat, aplikasi menampilkan error yang jelas.
5. Jika `data.txt` kosong/tidak punya entri valid, aplikasi menampilkan state data kosong.
6. Terdapat dua mode: Awalan dan Akhiran.
7. Mode default adalah Awalan.
8. Query hanya dibentuk dari tombol A–Z di layar.
9. Query tidak diketik langsung dari keyboard.
10. Terdapat tombol Backspace.
11. Terdapat tombol Reset.
12. Saat mode diganti, query tetap ada.
13. Pencarian bersifat case-insensitive.
14. Saat query kosong, aplikasi menampilkan state idle, bukan semua data.
15. Saat ada query, aplikasi menampilkan semua hasil yang cocok.
16. Saat tidak ada hasil, aplikasi menampilkan “Tidak ada data”.
17. Hasil diurutkan alfabetis.
18. Tampilan nyaman di HP dan laptop.
19. Aplikasi tidak memakai localStorage/IndexedDB.
20. Aplikasi tidak memakai service worker.
21. Aplikasi mengambil `data.txt` terbaru saat halaman dibuka/refresh dengan anti-cache strategy.
22. `summary.md` tidak dipakai oleh runtime.
23. `data.txt` menjadi satu-satunya sumber data pencarian.

---

## 18. Skenario Uji

### Skenario 1 — Load berhasil

Isi `data.txt`:

```text
apel
anggur
makan
jalan
```

Ekspektasi:

* aplikasi sukses load
* total data = 4
* query kosong menampilkan:

  * “Pilih huruf untuk mulai mencari.”

### Skenario 2 — Mode Awalan

Query:

* `A`

Ekspektasi:

* hasil:

  * apel
  * anggur

### Skenario 3 — Mode Akhiran

Query:

* `AN`

Ekspektasi:

* hasil:

  * makan
  * jalan

### Skenario 4 — Tidak ada hasil

Query:

* `AZXC`

Ekspektasi:

* tampil:

  * “Tidak ada data”

### Skenario 5 — Duplikasi

Isi `data.txt`:

```text
Apel
apel
APEL
anggur
```

Ekspektasi:

* total valid unik = 2
* hasil pencarian tidak menampilkan apel tiga kali

### Skenario 6 — Baris kosong

Isi `data.txt`:

```text
apel

anggur


makan
```

Ekspektasi:

* baris kosong diabaikan
* total valid unik = 3

### Skenario 7 — File gagal dimuat

`data.txt` tidak ada atau path salah

Ekspektasi:

* tampil pesan gagal memuat
* tombol pencarian nonaktif

---

## 19. Catatan Implementasi untuk Codex

Implementasi yang diharapkan:

* gunakan **Vanilla JavaScript**
* pisahkan file menjadi:

  * `index.html`
  * `styles.css`
  * `app.js`
* fetch `data.txt` dengan strategi anti-cache
* parse dengan aman untuk `\n` dan `\r\n`
* trim BOM UTF-8
* dedupe case-insensitive
* mode toggle tidak mereset query
* query display read-only
* hasil diurutkan alfabetis
* UI responsif mobile-first
* jangan gunakan framework
* jangan gunakan service worker
* jangan gunakan localStorage
* jangan gunakan backend

---
=======
Siap. Berikut **PRD final** yang sudah disesuaikan dengan keputusan yang benar-benar fix:

* deploy di **GitHub Pages**
* sumber data hanya dari **`data.txt`**
* **tidak ada fitur tambah/edit/hapus kata di aplikasi**
* query pencarian hanya dari **tombol A–Z**
* mode **Awalan** dan **Akhiran**
* teman Anda cukup buka link web, lalu saat Anda update `data.txt` di repo dan deploy selesai, mereka tinggal buka/refresh link yang sama
* struktur folder yang sudah ada: **`Project_Sambung_Kata`** berisi minimal `summary.md` dan `data.txt`

Isi di bawah ini bisa langsung Anda pakai sebagai isi baru `summary.md`.

---

# PRD — Project Sambung Kata

## 1. Ringkasan Produk

Project Sambung Kata adalah aplikasi web ringan berbasis static site yang di-host di **GitHub Pages**. Aplikasi digunakan untuk mencari kata dari sebuah file sumber bernama **`data.txt`** berdasarkan:

* **Awalan** (prefix)
* **Akhiran** (suffix)

User membentuk query pencarian dengan menekan tombol huruf **A–Z** di layar. Aplikasi **tidak** menyediakan fitur input/edit data kata dari UI. Semua data dikelola manual di luar aplikasi melalui file **`data.txt`**, lalu dipublikasikan bersama project.

Aplikasi ditujukan untuk penggunaan sederhana, cepat, ringan, dan mudah dipakai di **HP maupun laptop**, dengan target user kecil dan tanpa backend.

---

## 2. Keputusan Final yang Tidak Boleh Berubah

1. Platform aplikasi adalah **web app**, bukan APK.
2. Hosting target adalah **GitHub Pages**.
3. Sumber data utama dan satu-satunya adalah file **`data.txt`**.
4. File **`data.txt`** diisi manual oleh pemilik project di luar aplikasi.
5. Aplikasi **tidak** memiliki fitur:

   * tambah kata
   * edit kata
   * hapus kata
   * import/export data dari UI
   * localStorage/database
6. Input query pencarian **hanya** dari tombol huruf **A–Z** pada UI.
7. Terdapat dua mode pencarian:

   * **Awalan**
   * **Akhiran**
8. Saat mode diganti, query yang sudah terbentuk **tidak di-reset**.
9. Hasil pencarian menampilkan **semua hasil yang cocok**.
10. Teman/user lain cukup membuka link GitHub Pages yang sama untuk memakai versi data terbaru.
11. Aplikasi harus selalu mencoba mengambil `data.txt` terbaru saat halaman dibuka/refreshed.
12. Folder project yang dipakai adalah **`Project_Sambung_Kata`**.
13. File **`summary.md`** hanya untuk dokumentasi, **bukan** bagian runtime aplikasi.

---

## 3. Tujuan Produk

Tujuan aplikasi:

1. Menyediakan pencarian kata yang sangat sederhana dan cepat.
2. Menghindari keribetan sinkronisasi file manual di sisi user.
3. Membuat update data cukup dilakukan oleh 1 orang dengan mengubah `data.txt` di repo.
4. Membuat user lain cukup buka/refresh web untuk melihat data terbaru.
5. Menjaga implementasi tetap ringan tanpa backend, database, framework berat, atau logika rumit.

---

## 4. Masalah yang Diselesaikan

Masalah utama yang ingin diselesaikan:

* User ingin mencari kata berdasarkan awalan/akhiran.
* Data bisa ratusan hingga ribuan kata.
* User lain tidak paham mengganti file manual di perangkat mereka.
* Dibutuhkan solusi yang cukup sederhana: update di satu tempat, semua orang buka link yang sama.
* Tidak ingin ada ketergantungan pada storage browser, database, atau proses sinkronisasi yang rumit.

---

## 5. Target User

Target user:

* Pemilik project yang mengelola `data.txt`
* Teman/user lain yang hanya memakai aplikasi untuk mencari kata

Karakteristik:

* Tidak teknis
* Menggunakan HP atau laptop
* Tidak ingin setup ribet
* Hanya butuh buka web dan langsung pakai

---

## 6. Struktur Folder Final Project

Struktur minimum yang harus dipakai di folder `Project_Sambung_Kata`:

```text
Project_Sambung_Kata/
├── summary.md
├── data.txt
├── index.html
├── styles.css
└── app.js
```

Keterangan:

* `summary.md` = dokumen requirement/PRD
* `data.txt` = sumber data kata
* `index.html` = halaman utama aplikasi
* `styles.css` = styling UI
* `app.js` = logika aplikasi

Semua file runtime (`index.html`, `styles.css`, `app.js`, `data.txt`) harus berada di level folder yang sama agar path relatif tetap sederhana.

---

## 7. Sumber Data

### 7.1 Nama file

Nama file sumber data harus **tepat**:

```text
data.txt
```

### 7.2 Lokasi file

File `data.txt` harus berada di folder yang sama dengan `index.html`.

### 7.3 Format file

Format `data.txt` adalah **plain text UTF-8**, dengan aturan:

* **1 baris = 1 data kata**
* Setiap baris dibaca sebagai satu entri
* Baris kosong diabaikan
* Spasi di awal/akhir baris dihapus saat parsing
* Huruf besar/kecil dianggap sama saat pencarian
* File ini bisa disiapkan manual, termasuk bila sumbernya berasal dari hasil copy/download dari Google, selama hasil akhirnya berupa plain text yang bersih

### 7.4 Contoh isi `data.txt`

```text
apel
anggur
makan
minum
bakso
jalan
```

### 7.5 Aturan kualitas data

Direkomendasikan:

* satu kata per baris
* tidak pakai numbering
* tidak pakai bullet
* tidak pakai koma di akhir
* tidak pakai karakter dekoratif

Contoh **yang benar**:

```text
apel
anggur
makan
```

Contoh **yang tidak direkomendasikan**:

```text
1. apel
- anggur
makan,
```

Catatan:
Aplikasi akan membaca isi per baris apa adanya setelah trim. Jadi bila file berisi `1. apel`, maka entri itu akan dianggap literal sebagai `1. apel`, yang bisa membuat hasil pencarian tidak sesuai harapan. Karena itu file sumber harus dibersihkan manual sebelumnya.

---

## 8. Aturan Parsing dan Normalisasi Data

Saat `data.txt` dimuat, aplikasi harus melakukan langkah berikut:

1. Membaca file sebagai text.
2. Menghapus BOM UTF-8 jika ada.
3. Memecah text berdasarkan line break (`\n` atau `\r\n`).
4. Melakukan `trim()` pada setiap baris.
5. Mengabaikan baris kosong.
6. Menyimpan nilai asli hasil trim untuk ditampilkan.
7. Membuat nilai normalisasi lowercase untuk keperluan pencarian.
8. Menghapus duplikasi secara **case-insensitive**.

Contoh:

```text
Apel
apel
APEL
```

Hasil akhir di memori cukup disimpan satu entri saja.

---

## 9. Perilaku Update Data

### 9.1 Cara update data

Update data dilakukan dengan cara:

1. Edit file `data.txt`
2. Commit/push perubahan ke repository
3. GitHub Pages mempublikasikan perubahan
4. User membuka atau me-refresh halaman web

### 9.2 Auto update yang dimaksud

Definisi “otomatis terupdate” untuk project ini adalah:

* Saat user membuka halaman web, aplikasi harus mengambil `data.txt` terbaru dari server
* Saat user me-refresh halaman, aplikasi harus mengambil `data.txt` terbaru dari server

### 9.3 Yang tidak termasuk auto update

Berikut **bukan** bagian scope:

* sinkronisasi live tanpa refresh
* websocket
* polling realtime
* push update otomatis saat halaman sedang terbuka terus

Artinya:

* bila `data.txt` diubah ketika user sedang membuka halaman, user perlu **refresh halaman** untuk melihat data terbaru

---

## 10. Keputusan Teknis Penting untuk Mencegah Cache Lama

Karena data di-host di GitHub Pages, aplikasi harus meminimalkan risiko `data.txt` lama terbaca dari cache browser.

Maka implementasi wajib:

1. `fetch` ke `data.txt` harus memakai cache-busting query parameter, misalnya:

   * `data.txt?t=<timestamp>`
2. `fetch` harus memakai opsi:

   * `cache: 'no-store'`
3. Aplikasi **tidak boleh** memakai service worker pada MVP
4. Aplikasi **tidak perlu** dibuat sebagai PWA pada MVP

Tujuannya agar saat user membuka/refresh halaman, kemungkinan membaca data lama jauh lebih kecil.

---

## 11. User Flow

### 11.1 User biasa

1. User membuka link aplikasi
2. Aplikasi memuat `data.txt`
3. Setelah data berhasil dimuat, user memilih mode
4. User menekan huruf A–Z
5. Query terbentuk
6. Hasil pencarian tampil realtime

### 11.2 Pemilik project

1. Pemilik project menyiapkan atau mengedit `data.txt`
2. Commit/push perubahan ke repo
3. GitHub Pages update
4. User lain membuka/refresh link yang sama
5. Data terbaru dipakai otomatis

---

## 12. Functional Requirements

## FR-01 — Startup dan Loading State

Saat aplikasi dibuka:

* aplikasi langsung mencoba memuat `./data.txt`
* sebelum data selesai dimuat, tombol pencarian harus nonaktif
* UI harus menampilkan status:

  * **“Memuat data...”**

---

## FR-02 — Success State setelah Data Berhasil Dimuat

Jika `data.txt` berhasil dimuat:

* tombol pencarian menjadi aktif
* mode default adalah **Awalan**
* query default kosong
* UI menampilkan jumlah total data valid yang berhasil dimuat
* jika query masih kosong, aplikasi **belum** menampilkan semua kata

Alasan:
Karena data bisa ratusan/ribuan kata, maka saat query kosong lebih baik tampilkan state idle, bukan seluruh daftar data.

Pesan idle saat query kosong:

* **“Pilih huruf untuk mulai mencari.”**

Tambahan info:

* tampilkan total data, misalnya:

  * **“Total data: 2.483 kata”**

---

## FR-03 — Error State jika `data.txt` Gagal Dimuat

Jika file gagal dimuat karena tidak ada, path salah, atau fetch gagal:

* tombol A–Z harus tetap nonaktif
* tombol Backspace dan Reset nonaktif
* area hasil menampilkan pesan error yang jelas

Pesan minimum:

* **“Gagal memuat data. Pastikan file data.txt tersedia.”**

Bila perlu, boleh ditambahkan info teknis ringan:

* **“Aplikasi harus dijalankan dari GitHub Pages atau local server, bukan dibuka langsung via file://.”**

---

## FR-04 — Empty Data State

Jika `data.txt` berhasil dimuat tetapi setelah parsing tidak ada entri valid:

* aplikasi tetap tampil normal
* tombol A–Z boleh aktif atau nonaktif, tetapi disarankan nonaktif
* area hasil menampilkan:

  * **“Data kosong. Isi data.txt terlebih dahulu.”**

---

## FR-05 — Mode Pencarian

Aplikasi wajib memiliki 2 mode:

* **Awalan**
* **Akhiran**

Default saat halaman dibuka:

* **Awalan**

Saat user mengganti mode:

* query yang sedang aktif **tetap dipertahankan**
* hasil langsung dihitung ulang secara realtime

---

## FR-06 — Input Query hanya dari Tombol A–Z

Aplikasi wajib menyediakan tombol huruf:

* A sampai Z

Aturan:

* setiap klik menambahkan 1 huruf ke query aktif
* query dapat terdiri dari banyak huruf
* query **tidak** diketik lewat keyboard
* tampilan query harus read-only / display-only

Contoh:

* klik `A` → query = `A`
* klik `Z` → query = `AZ`
* klik `X` → query = `AZX`

---

## FR-07 — Tombol Backspace

Aplikasi wajib memiliki tombol **Backspace**.

Perilaku:

* menghapus 1 huruf terakhir dari query
* bila query kosong, tombol tidak melakukan apa-apa atau berada dalam keadaan disabled

Contoh:

* `AZXC` → Backspace → `AZX`

---

## FR-08 — Tombol Reset

Aplikasi wajib memiliki tombol **Reset**.

Perilaku:

* menghapus seluruh query
* mode saat ini tidak berubah
* setelah query kosong, aplikasi kembali ke state idle:

  * **“Pilih huruf untuk mulai mencari.”**

---

## FR-09 — Logika Pencarian

Pencarian harus bersifat **case-insensitive**.

### Mode Awalan

Jika mode = Awalan, tampilkan data yang:

* diawali query

Contoh:

* query = `A`
* hasil: `apel`, `anggur`

### Mode Akhiran

Jika mode = Akhiran, tampilkan data yang:

* diakhiri query

Contoh:

* query = `AN`
* hasil: `makan`, `jalan`

---

## FR-10 — Hasil Pencarian Realtime

Setelah user menekan huruf, hasil pencarian harus langsung diperbarui tanpa tombol Cari.

Update realtime harus terjadi saat:

* huruf ditambahkan
* Backspace ditekan
* Reset ditekan
* mode diganti

---

## FR-11 — Tampilan Hasil

Saat ada hasil:

* tampilkan **semua** hasil yang cocok
* tampilkan jumlah hasil
* hasil diletakkan dalam area yang dapat discroll
* hasil disusun rapi dan mudah dibaca di HP maupun laptop

Format minimum:

* list vertikal

Info minimum:

* **“Hasil: 23 kata”**

### Urutan hasil

Hasil harus diurutkan alfabetis secara case-insensitive menggunakan locale yang cocok untuk bahasa Indonesia bila memungkinkan.

---

## FR-12 — No Match State

Jika query tidak menghasilkan kecocokan apa pun:

* area hasil menampilkan:

  * **“Tidak ada data”**

Contoh:

* mode Awalan
* query `AZXC`
* tidak ada kecocokan
* tampilkan **“Tidak ada data”**

---

## FR-13 — Query Kosong

Jika query kosong:

* aplikasi **tidak** menampilkan semua data
* area hasil menampilkan state idle:

  * **“Pilih huruf untuk mulai mencari.”**

Tambahan:

* info total data tetap boleh ditampilkan

---

## FR-14 — Responsif di HP dan Laptop

Aplikasi harus nyaman digunakan di:

* HP
* laptop
* tablet kecil

Ketentuan UI:

* tombol huruf cukup besar untuk disentuh
* jarak antar tombol cukup
* layout tidak pecah di layar sempit
* hasil bisa discroll
* mode toggle mudah diakses

---

## FR-15 — Bahasa UI

Bahasa UI utama:

* **Bahasa Indonesia**

Teks minimum yang dipakai:

* Memuat data...
* Gagal memuat data. Pastikan file data.txt tersedia.
* Data kosong. Isi data.txt terlebih dahulu.
* Pilih huruf untuk mulai mencari.
* Tidak ada data
* Awalan
* Akhiran
* Backspace
* Reset
* Total data: X kata
* Hasil: X kata

---

## FR-16 — `summary.md` tidak Dipakai oleh Runtime

Aplikasi **tidak boleh** membaca atau menggunakan `summary.md` saat runtime.

`summary.md` hanya berfungsi sebagai:

* dokumen requirement
* catatan project
* dokumentasi internal

---

## FR-17 — `data.txt` adalah Satu-satunya Sumber Data

Tidak boleh ada sumber data lain seperti:

* localStorage
* hardcoded array besar di `app.js`
* database online
* file JSON tambahan
* spreadsheet live sync

Semua data pencarian harus berasal dari `data.txt`.

---

## 13. Non-Functional Requirements

### NFR-01 — Ringan

Aplikasi harus ringan:

* tanpa framework berat
* tanpa dependency yang tidak perlu
* cukup HTML, CSS, dan Vanilla JavaScript

### NFR-02 — Cepat

Target performa:

* untuk ratusan hingga beberapa ribu data, pencarian harus terasa instan
* perubahan hasil setelah klik huruf harus sangat cepat

Pendekatan yang cukup:

* load `data.txt` sekali saat startup
* simpan data di memori
* filter di sisi client

### NFR-03 — Sederhana

Kode harus mudah dipahami dan mudah dirawat.

### NFR-04 — Tidak Bergantung Storage Browser

Aplikasi tidak menggunakan:

* localStorage
* IndexedDB
* sessionStorage

### NFR-05 — Stabil

Aplikasi tidak boleh crash ketika:

* file kosong
* ada baris kosong
* ada duplikasi
* file gagal dimuat

### NFR-06 — Mudah Dideploy

Aplikasi harus bisa langsung di-host sebagai static files di GitHub Pages.

### NFR-07 — Tidak Mengganggu Auto Update

Karena prioritasnya data terbaru, maka:

* jangan gunakan service worker
* jangan gunakan cache agresif untuk data
* `data.txt` harus selalu dicoba diambil ulang saat load

---

## 14. Desain UI Minimum

## 14.1 Komponen UI

Urutan komponen yang direkomendasikan:

1. Judul aplikasi
2. Status data

   * total data / loading / error
3. Toggle mode

   * Awalan / Akhiran
4. Display query aktif
5. Tombol aksi

   * Backspace
   * Reset
6. Grid tombol A–Z
7. Ringkasan hasil
8. Area hasil

## 14.2 Perilaku visual

* Query aktif terlihat jelas
* Mode aktif terlihat berbeda
* Tombol disabled punya tampilan nonaktif
* Area hasil tidak terlalu tinggi di mobile agar keyboard tombol tetap terlihat

---

## 15. Batasan Teknis

1. Aplikasi harus mengakses `data.txt` menggunakan path relatif.
2. Aplikasi diutamakan berjalan dari hosting GitHub Pages.
3. Membuka `index.html` langsung via `file://` **bukan** skenario utama produksi.
4. Untuk testing lokal saat development, disarankan memakai local server / preview dari editor.
5. Tidak boleh ada backend.

---

## 16. Out of Scope

Hal-hal berikut **bukan** bagian MVP:

* APK
* backend
* database
* login
* akun user
* localStorage
* import/export dari UI
* fitur tambah/edit/hapus kata di aplikasi
* pencarian via keyboard
* realtime update tanpa refresh
* service worker / PWA
* analytics
* notifikasi
* upload file dari user
* membaca `summary.md` untuk data

---

## 17. Acceptance Criteria

Aplikasi dianggap selesai bila semua poin berikut terpenuhi:

1. Project berjalan sebagai static web app.
2. File `data.txt` dibaca dari folder yang sama dengan `index.html`.
3. Aplikasi menampilkan loading state saat startup.
4. Jika `data.txt` gagal dimuat, aplikasi menampilkan error yang jelas.
5. Jika `data.txt` kosong/tidak punya entri valid, aplikasi menampilkan state data kosong.
6. Terdapat dua mode: Awalan dan Akhiran.
7. Mode default adalah Awalan.
8. Query hanya dibentuk dari tombol A–Z di layar.
9. Query tidak diketik langsung dari keyboard.
10. Terdapat tombol Backspace.
11. Terdapat tombol Reset.
12. Saat mode diganti, query tetap ada.
13. Pencarian bersifat case-insensitive.
14. Saat query kosong, aplikasi menampilkan state idle, bukan semua data.
15. Saat ada query, aplikasi menampilkan semua hasil yang cocok.
16. Saat tidak ada hasil, aplikasi menampilkan “Tidak ada data”.
17. Hasil diurutkan alfabetis.
18. Tampilan nyaman di HP dan laptop.
19. Aplikasi tidak memakai localStorage/IndexedDB.
20. Aplikasi tidak memakai service worker.
21. Aplikasi mengambil `data.txt` terbaru saat halaman dibuka/refresh dengan anti-cache strategy.
22. `summary.md` tidak dipakai oleh runtime.
23. `data.txt` menjadi satu-satunya sumber data pencarian.

---

## 18. Skenario Uji

### Skenario 1 — Load berhasil

Isi `data.txt`:

```text
apel
anggur
makan
jalan
```

Ekspektasi:

* aplikasi sukses load
* total data = 4
* query kosong menampilkan:

  * “Pilih huruf untuk mulai mencari.”

### Skenario 2 — Mode Awalan

Query:

* `A`

Ekspektasi:

* hasil:

  * apel
  * anggur

### Skenario 3 — Mode Akhiran

Query:

* `AN`

Ekspektasi:

* hasil:

  * makan
  * jalan

### Skenario 4 — Tidak ada hasil

Query:

* `AZXC`

Ekspektasi:

* tampil:

  * “Tidak ada data”

### Skenario 5 — Duplikasi

Isi `data.txt`:

```text
Apel
apel
APEL
anggur
```

Ekspektasi:

* total valid unik = 2
* hasil pencarian tidak menampilkan apel tiga kali

### Skenario 6 — Baris kosong

Isi `data.txt`:

```text
apel

anggur


makan
```

Ekspektasi:

* baris kosong diabaikan
* total valid unik = 3

### Skenario 7 — File gagal dimuat

`data.txt` tidak ada atau path salah

Ekspektasi:

* tampil pesan gagal memuat
* tombol pencarian nonaktif

---

## 19. Catatan Implementasi untuk Codex

Implementasi yang diharapkan:

* gunakan **Vanilla JavaScript**
* pisahkan file menjadi:

  * `index.html`
  * `styles.css`
  * `app.js`
* fetch `data.txt` dengan strategi anti-cache
* parse dengan aman untuk `\n` dan `\r\n`
* trim BOM UTF-8
* dedupe case-insensitive
* mode toggle tidak mereset query
* query display read-only
* hasil diurutkan alfabetis
* UI responsif mobile-first
* jangan gunakan framework
* jangan gunakan service worker
* jangan gunakan localStorage
* jangan gunakan backend

---
>>>>>>> 73444b03ef136f4075ae1fe2952e504107f831cb
