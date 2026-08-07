import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const contactStatuses = [
  "New",
  "In Progress",
  "Replied",
  "Closed",
] as const;

const quoteStatuses = [
  "New",
  "In Progress",
  "Replied",
  "Closed",
] as const;

const services = [
  "Air Freight",
  "Sea Freight",
  "Road Freight",
  "Customs Clearance",
  "Warehousing",
  "Express Courier",
];

const cargoTypes = [
  "Electronics",
  "Furniture",
  "Food Products",
  "Textiles",
  "Automotive Parts",
  "Medical Equipment",
  "Industrial Machinery",
];

const subjects = [
  "Shipping enquiry",
  "Freight quotation",
  "Delivery update",
  "Import assistance",
  "Export documentation",
  "Container booking",
  "Customs clearance",
  "Warehouse enquiry",
];

const cities = [
  "Dubai",
  "London",
  "Singapore",
  "Shanghai",
  "New York",
  "Los Angeles",
  "Hamburg",
  "Rotterdam",
  "Mumbai",
  "Chennai",
  "Colombo",
  "Sydney",
  "Toronto",
  "Hong Kong",
];

async function main() {
  console.log("Cleaning existing data...");

  await prisma.contact.deleteMany();
  await prisma.quoteRequest.deleteMany();

  console.log("Generating Contacts...");

  const contacts = Array.from({ length: 100 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    subject: faker.helpers.arrayElement(subjects),
    message: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(contactStatuses),
    createdAt: faker.date.between({
      from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      to: new Date(),
    }),
  }));

  await prisma.contact.createMany({
    data: contacts,
  });

  console.log("Generating Quote Requests...");

  const quotes = Array.from({ length: 100 }, () => ({
    fullName: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    service: faker.helpers.arrayElement(services),
    origin: faker.helpers.arrayElement(cities),
    destination: faker.helpers.arrayElement(cities),
    cargoType: faker.helpers.arrayElement(cargoTypes),
    weight: `${faker.number.int({
      min: 100,
      max: 25000,
    })} kg`,
    message: faker.lorem.sentences(2),
    status: faker.helpers.arrayElement(quoteStatuses),
    createdAt: faker.date.between({
      from: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      to: new Date(),
    }),
  }));

  await prisma.quoteRequest.createMany({
    data: quotes,
  });

  console.log("=================================");
  console.log("✅ 100 Contacts created");
  console.log("✅ 100 Quote Requests created");
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });