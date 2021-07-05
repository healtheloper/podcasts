import { PodcastOutput } from './dtos/podcast.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast) private podcasts: Repository<Podcast>,
  ) {}

  getAll(): Promise<Podcast[]> {
    return this.podcasts.find();
  }
  async getOne(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne({ id });
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
  async create(podcastData): Promise<CreatePodcastsOutput> {
    try {
      await this.podcasts.create({
        ...podcastData,
      });
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
  async delete(id: number): Promise<MutationOutput> {
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
  async update(
    podcastId: number,
    updateData: UpdatePodcastInput,
  ): Promise<MutationOutput> {
    try {
      await this.podcasts.update(podcastId, { ...updateData });
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
  async getEpisodes(podcastId: number): Promise<Episode[]> {
    const podcast = await this.getOne(podcastId);
    return podcast.episodes;
  }
  async createEpisodes(
    podcastId: number,
    episodeData,
  ): Promise<MutationOutput> {
    try {
      const { podcast, ok, error } = await this.getOne(podcastId);
      const episodes = this.getEpisodes(podcastId);
      await this.podcasts.update({});
      episodes.push({
        id,
        title: episodeData.title,
        rating: episodeData.rating,
        podcast: episodeData.podcast,
      });
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
  getEpisode(podcastId: number, episodeId: number): Episode {
    const podcast = this.getOne(podcastId);
    const episode = podcast.episodes.find(
      (episode) => episode.id === episodeId,
    );
    if (!episode) {
      throw new NotFoundException(
        `In Podcast Id : ${podcastId}, Not Found this episode Id : ${episodeId}`,
      );
    }
    return episode;
  }
  deleteEpisode(podcastId: number, episodeId: number) {
    try {
      const podcast = this.getOne(podcastId);
      this.getEpisode(podcastId, episodeId);
      podcast.episodes = podcast.episodes.filter(
        (episode) => episode.id !== +episodeId,
      );
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
  updateEpisode(podcastId: number, episodeId: number, updateData) {
    try {
      const podcast = this.getOne(podcastId);
      const episode = this.getEpisode(podcastId, episodeId);
      this.deleteEpisode(podcastId, episodeId);
      podcast.episodes.push({
        ...episode,
        ...updateData,
      });
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
