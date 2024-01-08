# WarPet (Warung Petualang)


<br clear="both">

## Feature :


* **Menampilkan Daftar Restoran**,
Anda dapat melihat daftar restoran pada halaman home, dan memilih salah satu atau lain nya untuk melihat detail dan menambahkan nya sebagai favorit.

* **Menampilkan Detail Restoran**,
Ketika anda klik nama restoran anda akan diarahkan ke halaman detail yang berisi informasi lengkap dari restoran tersebut mulai dari nama, alamat, deskripsi, menu, rating dan ulasan dari pelanggan lain.

* **Meyimpan Dan Menghapus Restoran Favorit**,
Anda dapat menyimpan dan menghapus restoran favorit Anda dengan satu klik, restorarn favorit Anda akan ditampilkan pada halaman favorit.

* **Cari Restoran Favorit**,
Jangan khawatir ketika ada banyak restoran yang anda favoritkan dan ingin mencari salah satunya dengan cepat, Anda dapat mencari nya hanya dengan mengetikan keyword nama restoran yang ingin anda cari.

* **Responsibilitas Tampilan**,
Tampilan web app sudah responsif dari berbagai ukuran layar mulai dari mobile, tablet, laptop ataupun dekstop.

* **Aksebilitas Website**,
Seluruh fungsionalitas website app dapat dilakukan dengan menggunakan keyboard dan terbaca oleh screen readerr. Contohnya mengakses detail dari restoran menggunakan tab untuk navigasi dan enter untuk memilih restoran yang ingin diakses ke halaman detail.

* **Optimasi Website**,
Aplikasi mendapat skor yang cukup baik ketika pada tampilan dekstop ataupun mobile, bisa dilihat menggunakan lighthouse.

* **Install Aplikasi**,
Anda dapat meng-install aplikasi ini hanya dengan satu klik tanpa harus kerepotan untuk mengetikan url ketika ingin membuka nya kembali.

* **Tersedia Secara Offline**,
Aplikasi dapat diakses dalam keadaan offline tanpa koneksi internet dan aset yang gagal dimuat (pastikan Anda telah memuat web minimal 1 kali sebelumnya).

<br clear="both">

## Webpack bundle :

Web app ini dibuat dengan menggunakan JavaScript *bundler* **Webpack** dengan berbagai teknologi yang di pakai, antara lain :

1. *PWA - Progressive Web Application* dengan menggunakan `Workbox-InjectManifest` dan `WebpackPwaManifest`
2. *Responsivitas dan optimasi gambar* dengan menggunakan `responsive-loader`.
3. *Minifikasi CSS* dengan menggunakan `MiniCssExtractPlugin` dan `CssMinimizerPlugin`.
4. *Preload* assets untuk mempercepat pemuatan file-file krusial dengan menggunakan `HtmlWebpackInjectPreload`.
5. *Transpiling* dengan menggunakan `babal-loader`.
6. *Integration Testing* menggunakan `karma-jasmine`.
7. *End To End Testing* menggunakan `codeceptjs`.
8. *Code Quality* menggunakan `ESLint` sebagai linter ketika menuliskan kode JavaScript.
9. *Dan lainnya yang ada pada berkas*`package.json`.

<br clear="both">

## Development vs Build Production

*Webpack config* untuk *development* dibuat agar dapat dengan cepat me-reload saat terjadi perubahan pada suatu file, sehingga tidak semua plugin, loader, dan fitur disertakan di dalam konfigurasi tersebut. Untuk melihat susunan konfigurasi yang digunakan, silahkan lihat tabel di bawah ini :

### Loader dan Plugin

| Loader/Plugin              | Development | Production |
| -------------------------- | :---------: | :--------: |
| `HtmlWebpackPlugin`        | ✔          | ✔          |
| `responsive-loader`        | ✔          | ✔          |
| `sass-loader`              | ✔          | ✔          |
| `css-loader`               | ✔          | ✔          |
| `style-loader`             | ✔          | ❌          |
| `MiniCssExtractPlugin`     | ❌          | ✔          |
| `babel-loader`             | ❌          | ✔          |
| `BundleAnalyzerPlugin`     | ❌          | ✔          |
| `HtmlWebpackInjectPreload` | ❌          | ✔          |
| `WebpackPwaManifest`       | ❌          | ✔          |
| `InjectManifest`           | ❌          | ✔          |
| `CssMinimizerPlugin`       | ❌          | ✔          |
  
### Feature

| Feature           | Development | Production |
| ----------------- | :---------: | :--------: |
| `Image Optimizer` | ✔           | ✔          |
| `Service Worker`  | ❌          | ✔          |
| `Web Manifest`    | ❌          | ✔          |
| `Split chunks`    | ❌          | ✔          |
| `PWA`             | ❌          | ✔          |

<br clear="both">

## Usage NPM

*Untuk memulai, Install npm lalu jalankan beberapa perintah di bawah ini untuk memulainya, folder dist akan dibuat setelah itu.*

1. Install NPM
   
   `npm install`

2. Build production

   `npm run build`
   
3. Starting development server

   `npm run start-dev`

4. Integration testing

   `npm run test`

5. End to End (E2E) testing

   `npm run e2e`

   > Sebelum memulai e2e test, server development harus dijalankan dan pastikan internet anda menyala.

6. Starting production server

   `npm run serve`

   > Sebelum memulai server production sebaiknya dilakukan build dan testing terlebih dahulu.

<br clear="both">
