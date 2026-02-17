const mockPrisma = {
  todo: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    createMany: jest.fn(),
  },
};

export default mockPrisma;
