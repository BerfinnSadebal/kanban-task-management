import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Veritabanı temizleniyor...');
  await prisma.task.deleteMany();
  await prisma.board.deleteMany();

  console.log('Örnek veriler ekleniyor...');

  // Örnek Board 1
  const board1 = await prisma.board.create({
    data: {
      title: 'Frontend Geliştirme',
      slug: 'frontend-gelistirme',
      tasks: {
        create: [
          {
            content: 'Ana sayfa tasarımı',
            description: 'Figma üzerindeki yeni tasarıma göre ana sayfayı güncelle.',
            status: 'TODO',
            color: '#3b82f6',
            order: 0,
          },
          {
            content: 'API Entegrasyonu',
            description: 'Board ve Task servislerini bağla.',
            status: 'IN_PROGRESS',
            color: '#eab308',
            order: 1,
          },
          {
            content: 'Dark Mode desteği',
            description: 'Tailwind CSS ile karanlık mod ekle.',
            status: 'DONE',
            color: '#22c55e',
            order: 2,
          },
        ],
      },
    },
  });

  // Örnek Board 2
  const board2 = await prisma.board.create({
    data: {
      title: 'Proje Yönetimi',
      slug: 'proje-yonetimi',
      tasks: {
        create: [
          {
            content: 'Müşteri toplantısı',
            description: 'Haftalık ilerleme raporu sunulacak.',
            status: 'BACKLOG',
            color: '#ef4444',
            order: 0,
          },
          {
            content: 'Sprint planlama',
            description: 'Gelecek hafta yapılacak işlerin belirlenmesi.',
            status: 'TODO',
            color: '#3b82f6',
            order: 1,
          },
        ],
      },
    },
  });

  console.log('Seed işlemi başarıyla tamamlandı.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
