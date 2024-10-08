import { prisma } from '../services/prisma.js';

async function main() {
    return prisma.project.findMany();
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
