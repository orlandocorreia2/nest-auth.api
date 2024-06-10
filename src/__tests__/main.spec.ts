import * as main from '../main';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

describe('Main', () => {
  beforeEach(async () => {
    jest
      .spyOn(NestFactory, 'create')
      .mockImplementation(
        jest
          .fn()
          .mockResolvedValue({ useGlobalPipes: jest.fn(), listen: jest.fn() }),
      );
    jest
      .spyOn(SwaggerModule, 'createDocument')
      .mockImplementationOnce(jest.fn());
    jest.spyOn(SwaggerModule, 'setup').mockImplementationOnce(jest.fn());
  });
  it('should be iniatilized', async () => {
    await main.bootstrap();

    expect(NestFactory.create).toHaveBeenCalledTimes(1);
    expect(SwaggerModule.createDocument).toHaveBeenCalledTimes(1);
    expect(SwaggerModule.setup).toHaveBeenCalledTimes(1);
  });
});
