# Rast Mobile Kanban Task Management System

Dinamik board yapısına, sürükle-bırak desteğine ve fullstack mimariye sahip bir iş yönetim sistemidir. Kullanıcılar kendi board'larını oluşturabilir, görevlerini organize edebilir ve tüm verileri kalıcı olarak MongoDB üzerinde saklayabilir.

## Özellikler

*   **Fullstack Mimari:** Frontend ve Backend entegre çalışır. Veriler MongoDB üzerinde güvenle saklanır.
*   **Dinamik Board Sistemi:** Her kullanıcı URL üzerinden benzersiz bir Board ID (Slug) ile kendi çalışma alanını oluşturabilir.
*   **Sürükle & Bırak (DnD):** `@dnd-kit` kullanılarak görevler hem sütunlar arası hem de liste içi taşınabilir.
*   **Sabit 4'lü Kanban Yapısı:** İş akışı; Backlog, To Do, In Progress ve Done sütunları üzerinden yönetilir.
*   **Modern UI/UX:** Tailwind CSS ile responsive, modern ve Figma tasarımına sadık kalınarak geliştirilmiştir.
*   **Son Gezilenler:** `localStorage` entegrasyonu sayesinde ziyaret edilen son board'lar ana sayfada listelenir.

## Kullanılan Teknolojiler

| Katman | Teknoloji |
| :--- | :--- |
| **Frontend** | React 18, Next.js 14 (App Router) |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Database** | MongoDB Atlas |
| **ORM** | Prisma ORM |
| **Language** | TypeScript |
| **State & DnD** | @dnd-kit |

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/BerfinSadebal/rast-mobile-kanban-case.git
cd rast-mobile-kanban-case
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

Kök dizinde bir `.env` dosyası oluşturun ve MongoDB bağlantı adresinizi ekleyin:

```env
DATABASE_URL="mongodb+srv://KULLANICI_ADIN:SIFREN@cluster.mongodb.net/rast-kanban"
```

### 4. Veritabanı Şemasını Senkronize Edin

```bash
npx prisma db push
npx prisma generate
```

### 5. (Opsiyonel) Örnek Verileri Yükleyin

Veritabanını hazır görevlerle doldurmak için:

```bash
npx prisma db seed
```

### 6. Uygulamayı Başlatın

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## Proje Yapısı

```text
src/
├── app/            # Next.js App Router (Dinamik [id] yapısı)
├── components/     # Atomik UI bileşenleri (Board, Column, Card)
├── services/       # API ve Veritabanı iletişim katmanı
└── prisma/         # Veritabanı şeması ve Seed dosyası
```
