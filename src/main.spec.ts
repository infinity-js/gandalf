const NestApp = {
  listen: jest.fn(),
};

const NestFactory = {
  create: jest.fn().mockResolvedValue(NestApp),
};

jest.mock('@nestjs/core', () => ({
  NestFactory,
}));

import './main';

describe('main (unit)', () => {
  it('should call NestFactory.create with AppModule', () => {
    expect(NestFactory.create).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call NestApp.listen with 3000', async () => {
    expect(NestApp.listen).toHaveBeenCalledWith(3000);
  });
});
