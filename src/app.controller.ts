import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

import { GithubInfoResponse } from './app.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('github/:username/:repo')
  async getGithubRepo(
    @Param('username') username: string,
    @Param('repo') repo: string,
  ): Promise<GithubInfoResponse | string> {
    //check username has a value
    if (username.length === 0) {
      return 'Username is required';
    }
    //check repo has a value
    if (repo.length === 0) {
      return 'Repo is required';
    }
    //using github api to get repo info
    const response = await this.appService.getGithubRepoInfo(username, repo);
    if (response === undefined) {
      return 'Repo not found';
    }
    return response;
  }
}
