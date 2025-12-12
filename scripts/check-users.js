const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: { 
      id: true, 
      email: true, 
      name: true, 
      plan: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  
  console.log('\\n=== Users in Database ===');
  if (users.length === 0) {
    console.log('No users found!');
  } else {
    users.forEach(u => {
      console.log(`Email: ${u.email}`);
      console.log(`Name: ${u.name}`);
      console.log(`Plan: ${u.plan}`);
      console.log(`Created: ${u.createdAt}`);
      console.log('---');
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
