---
description: Panduan Deployment Aplikasi Also Partners Law Firm
---

# 🚀 Panduan Deployment

Aplikasi ini adalah **React + Vite** yang siap di-deploy ke berbagai platform.

---

## Opsi 1: Deploy ke Vercel (Rekomendasi)

Vercel adalah platform paling mudah untuk deploy aplikasi React/Vite.

### Langkah-langkah:

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Hubungkan ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan akun GitHub
   - Klik **"Add New Project"**
   - Pilih repository `also-partners-lawfirm`

3. **Konfigurasi Build**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Klik **"Deploy"**
   - Tunggu proses build selesai (~1-2 menit)
   - Aplikasi akan tersedia di URL seperti: `https://also-partners-lawfirm.vercel.app`

> [!TIP]
> Setiap kali Anda push ke GitHub, Vercel akan otomatis deploy ulang (auto-deploy).

---

## Opsi 2: Deploy ke Netlify

1. **Push ke GitHub** (sama seperti di atas)

2. **Hubungkan ke Netlify**
   - Buka [netlify.com](https://netlify.com)
   - Login dengan akun GitHub
   - Klik **"Add new site"** → **"Import an existing project"**
   - Pilih repository Anda

3. **Konfigurasi Build**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

4. **Tambahkan file redirect** _(penting untuk SPA)_
   
   Buat file `public/_redirects` dengan isi:
   ```
   /*    /index.html   200
   ```

5. **Deploy** - Klik "Deploy site"

---

## Opsi 3: Deploy Manual (Static Hosting)

Untuk hosting seperti cPanel, shared hosting, atau VPS:

### Langkah-langkah:

// turbo
1. **Install dependencies**
   ```bash
   npm install
   ```

// turbo
2. **Build untuk production**
   ```bash
   npm run build
   ```

3. **Upload folder `dist`**
   - Semua file hasil build ada di folder `dist/`
   - Upload seluruh isi folder `dist/` ke root hosting Anda
   - Pastikan `index.html` berada di root

4. **Konfigurasi untuk SPA** _(opsional tapi penting)_
   
   Jika menggunakan Apache, buat file `.htaccess` di folder `dist/`:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

---

## 📋 Checklist Sebelum Deploy

- [ ] Pastikan semua fitur berfungsi di local (`npm run dev`)
- [ ] Test build production (`npm run build && npm run preview`)
- [ ] Commit semua perubahan ke Git
- [ ] Push ke repository remote (GitHub/GitLab)

---

## 🔧 Troubleshooting

### Build Error: Missing Dependencies
```bash
rm -rf node_modules
npm install
npm run build
```

### Blank Page Setelah Deploy
- Periksa konfigurasi `base` di `vite.config.js`
- Pastikan redirect/rewrite untuk SPA sudah dikonfigurasi

### 404 Error pada Refresh
- Ini karena SPA routing. Pastikan sudah menambahkan:
  - Vercel: `vercel.json` dengan rewrites ✅ (sudah ada)
  - Netlify: `_redirects` file
  - Apache: `.htaccess` file

---

## 🌐 Custom Domain

### Di Vercel:
1. Buka Settings → Domains
2. Tambahkan domain Anda (contoh: `app.alsoandpartners.com`)
3. Update DNS di registrar domain Anda sesuai instruksi Vercel

### Di Netlify:
1. Buka Site Settings → Domain Management
2. Add custom domain
3. Follow instruksi DNS configuration
