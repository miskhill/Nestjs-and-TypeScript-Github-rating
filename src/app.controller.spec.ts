import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  describe('getGithubRepo', () => {
    it('should return that username is missing', async () => {
      expect(await appController.getGithubRepo('', '')).toBe(
        'Username is required',
      );
    });
  });
});
