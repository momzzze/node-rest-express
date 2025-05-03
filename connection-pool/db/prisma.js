const {
    PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
// This file creates a Prisma client instance that can be used to interact with the database.