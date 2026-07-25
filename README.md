# Kanban Task Management System

Dinamik board yapısına, sürükle-bırak desteğine ve fullstack mimariye sahip modern bir iş yönetim sistemidir. Kullanıcılar kendi board'larını oluşturabilir, görevlerini organize edebilir ve tüm verileri kalıcı olarak MongoDB üzerinde saklayabilir.

## 📸 Ekran Görüntüleri

<img width="1827" height="527" alt="Ekran görüntüsü 2026-07-26 011103" src="https://github.com/user-attachments/assets/ab4f7b8f-be31-466e-aa6f-f46f5413f86d" />
<img width="1867" height="592" alt="Ekran görüntüsü 2026-07-26 011128" src="https://github.com/user-attachments/assets/ca8185ea-ee6c-482c-a5b8-58d017e35db7" />
<img width="1891" height="636" alt="Ekran görüntüsü 2026-07-26 011218" src="https://github.com/user-attachments/assets/f1fbeed1-566f-4cc7-bd57-8fc8d122dc97" />
<img width="1770" height="690" alt="Ekran görüntüsü 2026-07-26 011232" src="https://github.com/user-attachments/assets/ad484c0c-5c2c-4675-9a50-8e3c9c98ec07" />
<img width="723" height="748" alt="Ekran görüntüsü 2026-07-26 011252" src="https://github.com/user-attachments/assets/f41db13d-6497-49f9-aaa1-92bd877e1df4" />


## ✨ Özellikler

* **Fullstack Mimari:** Frontend ve Backend entegre çalışır. Veriler MongoDB Atlas üzerinde güvenle saklanır.
* **Dinamik Board Sistemi:** Her kullanıcı URL üzerinden benzersiz bir Board ID (Slug) ile kendi çalışma alanını oluşturabilir.
* **Sürükle & Bırak (DnD):** `@dnd-kit` kullanılarak görevler hem sütunlar arası hem de liste içi taşınabilir.
* **Sabit 4'lü Kanban Yapısı:** İş akışı; Backlog, To Do, In Progress ve Done sütunları üzerinden yönetilir.
* **Modern UI/UX:** Tailwind CSS ile responsive, modern ve kullanıcı dostu bir arayüz.
* **Son Gezilenler:** `localStorage` entegrasyonu sayesinde ziyaret edilen son board'lar ana sayfada listelenir.

## 🛠 Kullanılan Teknolojiler

| Katman | Teknoloji |
| :--- | :--- |
| **Frontend** | React 18, Next.js 14 (App Router) |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Database** | MongoDB Atlas |
| **ORM** | Prisma ORM |
| **Language** | TypeScript |
| **State & DnD** | @dnd-kit |

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Projeyi Klonlayın

```bash
git clone [https://github.com/BerfinnSadebal/kanban-task-management.git](https://github.com/BerfinnSadebal/kanban-task-management.git)
cd kanban-task-management
