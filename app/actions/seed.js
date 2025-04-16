const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // إنشاء مستخدم تجريبي
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        hashedPassword: "test123",
      },
    });

    // إنشاء قوائم تجريبية
    const listings = [
      {
        title: "شقة فاخرة في الرياض",
        description: "شقة فاخرة في حي النخيل، الرياض",
        imageSrc: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        category: "شقق",
        roomCount: 3,
        bathroomCount: 2,
        guestCount: 4,
        locationValue: "riyadh",
        price: 500,
        userId: user.id,
      },
      {
        title: "فيلا في جدة",
        description: "فيلا فاخرة مع مسبح خاص في جدة",
        imageSrc: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff",
        category: "فلل",
        roomCount: 5,
        bathroomCount: 4,
        guestCount: 8,
        locationValue: "jeddah",
        price: 1000,
        userId: user.id,
      },
      {
        title: "شاليه في الطائف",
        description: "شاليه جميل مع إطلالة على الجبال",
        imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        category: "شاليهات",
        roomCount: 2,
        bathroomCount: 1,
        guestCount: 4,
        locationValue: "taif",
        price: 300,
        userId: user.id,
      },
    ];

    for (const listing of listings) {
      await prisma.listing.create({
        data: listing,
      });
    }

    console.log("تم إضافة البيانات التجريبية بنجاح!");
  } catch (error) {
    console.error("حدث خطأ أثناء إضافة البيانات التجريبية:", error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 