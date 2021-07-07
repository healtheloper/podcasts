import {
  EpisodeOutput,
  EpisodesOutput,
  PodcastOutput,
  PodcastsOutput,
} from './dtos/podcast.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import {
  CreatePodcastsOutput,
  CreatePodcastsInput,
} from './dtos/create-podcasts.dtos';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CreateEpisodesOutput } from './dtos/create-episodes.dtos';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private episodes: Repository<Episode>,
  ) {}

  async getAllPodcasts(): Promise<PodcastsOutput> {
    try {
      const podcasts = await this.podcasts.find({ relations: ['episodes'] });
      return {
        ok: true,
        podcasts,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(
        { id },
        { relations: ['episodes'] },
      );
      if (!podcast) {
        throw new NotFoundException(`Podcast is Not Found By Id: ${id}`);
      }
      return {
        ok: true,
        podcast,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async createPodcast({ title, category }): Promise<CreatePodcastsOutput> {
    try {
      const newPodcast = this.podcasts.create({
        title,
        category,
      });
      const { id } = await this.podcasts.save(newPodcast);
      return {
        ok: true,
        id,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async deletePodcast(id: number): Promise<MutationOutput> {
    try {
      await this.podcasts.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async updatePodcast({
    id,
    payload,
  }: UpdatePodcastInput): Promise<MutationOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(id);
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      const updatedPodcast: Podcast = { ...podcast, ...payload };
      await this.podcasts.save(updatedPodcast);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      const episodes = podcast.episodes;
      return {
        ok: true,
        episodes,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async getEpisode(
    podcastId: number,
    episodeId: number,
  ): Promise<EpisodeOutput> {
    try {
      const { episodes, ok, error } = await this.getEpisodes(podcastId);
      if (!ok || !episodes) {
        return {
          ok: false,
          error: "Couldn't found episode",
        };
      }
      const episode = episodes.find((episode) => episode.id === episodeId);
      if (!episode) {
        throw new NotFoundException(
          `In Podcast Id : ${podcastId}, Not Found this episode Id : ${episodeId}`,
        );
      }
      return {
        ok: true,
        episode,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async createEpisodes(
    podcastId: number,
    { title },
  ): Promise<CreateEpisodesOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      const newEpisode = this.episodes.create({ title, podcast });
      const { id } = await this.episodes.save(newEpisode);
      if (!ok || !podcast) {
        return {
          ok: false,
          error: "Couldn't create episodes",
        };
      }
      return {
        ok: true,
        id,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async deleteEpisode(
    podcastId: number,
    episodeId: number,
  ): Promise<MutationOutput> {
    try {
      const { episode, ok, error } = await this.getEpisode(
        podcastId,
        episodeId,
      );
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      await this.episodes.delete({ id: episode.id });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async updateEpisode(
    podcastId: number,
    episodeId: number,
    updateData,
  ): Promise<MutationOutput> {
    try {
      const { episode, ok, error } = await this.getEpisode(
        podcastId,
        episodeId,
      );
      if (!ok) {
        return {
          ok,
          error,
        };
      }
      await this.episodes.update({ id: episode.id }, { ...updateData });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
