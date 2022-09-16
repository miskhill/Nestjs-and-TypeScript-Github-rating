import { Injectable } from '@nestjs/common';
import { GithubInfoResponse } from './app.types';
import { Octokit } from '@octokit/rest';

@Injectable()
export class AppService {
  async getGithubRepoInfo(
    owner: string,
    repo: string,
  ): Promise<GithubInfoResponse | undefined> {
    const octokit = new Octokit();
    try {
      const repoDetails = await octokit.rest.repos.get({
        owner,
        repo,
      });
      const stars = repoDetails.data.stargazers_count;
      const starsValue = stars > 1000 ? 2 : stars / 500;
      const watchers = repoDetails.data.watchers_count;
      const watchersValue = watchers > 100 ? 1 : watchers / 100;
      const forks = repoDetails.data.forks_count;
      const forksValue = forks > 100 ? 2 : forks / 50;
      return {
        name: repoDetails.data.name,
        stars,
        forks,
        watchers,
        popularity: Math.floor(starsValue + watchersValue + forksValue),
      };
    } catch (e) {
      return undefined;
    }
  }
}
