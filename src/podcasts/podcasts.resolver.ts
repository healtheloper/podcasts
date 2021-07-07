import {
  EpisodeOutput,
  EpisodesOutput,
  PodcastOutput,
  PodcastsOutput,
} from './dtos/podcast.dto';
import { MutationOutput } from 'src/common/dtos/output.dto';
import {
  CreatePodcastsInput,
  CreatePodcastsOutput,
} from './dtos/create-podcasts.dtos';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { CreateEpisodesInput } from './dtos/create-episodes.dtos';
import { Episode } from './entities/episode.entity';
import { UpdateEpisodesInput } from './dtos/update-episodes.dtos';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => PodcastsOutput)
  getAllPodcasts(): Promise<PodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }
  @Query((returns) => PodcastOutput)
  getPodcast(@Args('id') podcastId: number): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastId);
  }
  @Mutation((returns) => CreatePodcastsOutput)
  createPodcast(
    @Args('input') podcastData: CreatePodcastsInput,
  ): Promise<CreatePodcastsOutput> {
    return this.podcastsService.createPodcast(podcastData);
  }
  @Mutation((returns) => MutationOutput)
  deletePodcast(@Args('id') podcastId: number): Promise<MutationOutput> {
    return this.podcastsService.deletePodcast(podcastId);
  }
  @Mutation((returns) => MutationOutput)
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<MutationOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }
  @Query((returns) => EpisodesOutput)
  getEpisodes(@Args('podcastId') podcastId: number): Promise<EpisodesOutput> {
    return this.podcastsService.getEpisodes(podcastId);
  }
  @Mutation((returns) => MutationOutput)
  createEpisodes(
    @Args('podcastId') podcastId: number,
    @Args('input') episodeData: CreateEpisodesInput,
  ): Promise<MutationOutput> {
    return this.podcastsService.createEpisodes(podcastId, episodeData);
  }
  @Query((returns) => EpisodeOutput)
  getEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<EpisodeOutput> {
    return this.podcastsService.getEpisode(podcastId, episodeId);
  }
  @Mutation((returns) => MutationOutput)
  deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<MutationOutput> {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
  @Mutation((returns) => MutationOutput)
  updateEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateData: UpdateEpisodesInput,
  ): Promise<MutationOutput> {
    return this.podcastsService.updateEpisode(podcastId, episodeId, updateData);
  }
}
