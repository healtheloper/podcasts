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

  @Query((returns) => [Podcast])
  getAll(): Promise<Podcast[]> {
    return this.podcastsService.getAll();
  }
  @Query((returns) => Podcast)
  getOne(@Args('id') podcastId: number): Promise<Podcast> {
    return this.podcastsService.getOne(podcastId);
  }
  @Mutation((returns) => CreatePodcastsOutput)
  create(
    @Args('input') podcastData: CreatePodcastsInput,
  ): Promise<CreatePodcastsOutput> {
    return this.podcastsService.create(podcastData);
  }
  @Mutation((returns) => MutationOutput)
  delete(@Args('id') podcastId: number): Promise<MutationOutput> {
    return this.podcastsService.delete(podcastId);
  }
  @Mutation((returns) => MutationOutput)
  update(
    @Args('podcastId') podcastId: number,
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): Promise<MutationOutput> {
    return this.podcastsService.update(podcastId, updatePodcastInput);
  }
  @Query((returns) => [Episode])
  getEpisodes(@Args('podcastId') podcastId: Number): Episode[] {
    return this.podcastsService.getEpisodes(podcastId);
  }
  @Mutation((returns) => MutationOutput)
  createEpisodes(
    @Args('podcastId') podcastId: number,
    @Args('input') episodeData: CreateEpisodesInput,
  ): MutationOutput {
    return this.podcastsService.createEpisodes(podcastId, episodeData);
  }
  @Query((returns) => Episode)
  getEpisode(
    @Args('podcastId') podcastId: Number,
    @Args('episodeId') episodeId: Number,
  ): Episode {
    return this.podcastsService.getEpisode(podcastId, episodeId);
  }
  @Mutation((returns) => MutationOutput)
  deleteEpisode(
    @Args('podcastId') podcastId: Number,
    @Args('episodeId') episodeId: Number,
  ): MutationOutput {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
  @Mutation((returns) => MutationOutput)
  updateEpisode(
    @Args('podcastId') podcastId: Number,
    @Args('episodeId') episodeId: Number,
    @Args('input') updateData: UpdateEpisodesInput,
  ): MutationOutput {
    return this.podcastsService.updateEpisode(podcastId, episodeId, updateData);
  }
}
