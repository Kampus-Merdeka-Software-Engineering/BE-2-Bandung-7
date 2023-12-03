const { PrismaClient } = require("@prisma/client");
// prisma connection
const prisma = new PrismaClient();
module.exports = { prisma };