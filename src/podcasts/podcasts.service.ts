import { Injectable, NotFoundException } from '@nestjs/common';
import { MutationOutput } from 'src/common/dtos/output.dto';
import {
  CreatePodcastsOutput,
  CreatePodcastsInput,
} from './dtos/create-podcasts.dtos';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  getAll(): Podcast[] {
    return this.podcasts;
  }
  getOne(id: Number): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast is Not Found By Id: ${id}`);
    } else {
      return podcast;
    }
  }
  create(podcastData): CreatePodcastsOutput {
    try {
      let id = this.podcasts.length + 1;
      const isExistId = this.podcasts.find((podcast) => podcast.id === id);
      if (isExistId) {
        id += 1;
      }
      if (!podcastData.episodes) {
        podcastData.episodes = [];
      }
      this.podcasts.push({
        id,
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
  delete(id: Number) {
    try {
      this.getOne(id);
      this.podcasts = this.podcasts.filter((podcast) => podcast.id !== +id);
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
  update(updateData: UpdatePodcastInput) {
    try {
      const id = updateData.id;
      const podcast = this.getOne(id);
      this.delete(id);
      this.podcasts.push({
        ...podcast,
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
  getEpisodes(podcastId: Number): Episode[] {
    const podcast = this.getOne(podcastId);
    return podcast.episodes;
  }
  createEpisodes(podcastId: Number, episodeData): MutationOutput {
    try {
      this.getOne(podcastId);
      const episodes = this.getEpisodes(podcastId);
      let id;
      if (episodeData.id) {
        id = episodeData.id;
      } else {
        id = episodes.length + 1;
      }
      const isExistId = episodes.find((episode) => episode.id === id);
      if (isExistId) {
        id = episodes.length + 1;
      }
      episodes.push({
        id,
        title: episodeData.title,
        rating: episodeData.rating,
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
  getEpisode(podcastId: Number, episodeId: Number): Episode {
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
  deleteEpisode(podcastId: Number, episodeId: Number) {
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
  updateEpisode(podcastId: Number, episodeId: Number, updateData) {
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
