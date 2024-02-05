import { prisma } from '../services/prisma.js';

async function main() {
    const projects = await prisma.project.findMany();
    console.log('Project Count: ', projects.length);
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
