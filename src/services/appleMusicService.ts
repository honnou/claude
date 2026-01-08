import axios from 'axios';
import { MusicGenre, AppleMusicTrack, PlaylistConfig } from '../types/index.js';

/**
 * Service for interacting with Apple Music API
 * Note: This requires Apple Music API credentials (Team ID, Key ID, and Private Key)
 */
export class AppleMusicService {
  private developerToken?: string;
  private userToken?: string;
  private readonly API_BASE = 'https://api.music.apple.com/v1';

  constructor(developerToken?: string, userToken?: string) {
    this.developerToken = developerToken;
    this.userToken = userToken;
  }

  /**
   * Set the developer token (JWT)
   */
  setDeveloperToken(token: string): void {
    this.developerToken = token;
  }

  /**
   * Set the user token (Music User Token)
   */
  setUserToken(token: string): void {
    this.userToken = token;
  }

  /**
   * Search for tracks based on a genre
   */
  async searchTracksByGenre(genre: MusicGenre, limit: number = 5): Promise<AppleMusicTrack[]> {
    if (!this.developerToken) {
      throw new Error('Developer token not set. Cannot access Apple Music API.');
    }

    try {
      const response = await axios.get(`${this.API_BASE}/catalog/us/search`, {
        params: {
          term: genre.searchTerm,
          types: 'songs',
          limit: limit
        },
        headers: {
          'Authorization': `Bearer ${this.developerToken}`,
          'Music-User-Token': this.userToken || ''
        }
      });

      if (response.data.results?.songs?.data) {
        return response.data.results.songs.data;
      }

      return [];
    } catch (error: any) {
      console.error(`Error searching for genre "${genre.genre}":`, error.response?.data || error.message);
      return [];
    }
  }

  /**
   * Get tracks for multiple genres
   */
  async getTracksForGenres(genres: MusicGenre[]): Promise<AppleMusicTrack[]> {
    const allTracks: AppleMusicTrack[] = [];

    for (const genre of genres) {
      const tracks = await this.searchTracksByGenre(genre, 3);
      allTracks.push(...tracks);

      // Add a small delay to avoid rate limiting
      await this.sleep(300);
    }

    return allTracks;
  }

  /**
   * Create a playlist (requires user token)
   */
  async createPlaylist(config: PlaylistConfig): Promise<string> {
    if (!this.developerToken || !this.userToken) {
      throw new Error('Both developer token and user token are required to create playlists.');
    }

    try {
      const response = await axios.post(
        `${this.API_BASE}/me/library/playlists`,
        {
          attributes: {
            name: config.name,
            description: config.description
          },
          relationships: {
            tracks: {
              data: config.trackIds.map(id => ({
                id,
                type: 'songs'
              }))
            }
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.developerToken}`,
            'Music-User-Token': this.userToken,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.data[0].id;
    } catch (error: any) {
      console.error('Error creating playlist:', error.response?.data || error.message);
      throw new Error('Failed to create playlist');
    }
  }

  /**
   * Sleep helper for rate limiting
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get sample tracks (mock data for testing without API credentials)
   */
  async getSampleTracks(genres: MusicGenre[]): Promise<AppleMusicTrack[]> {
    // This is a mock implementation for demonstration
    const sampleTracks: AppleMusicTrack[] = genres.map((genre, index) => ({
      id: `mock-track-${index}`,
      type: 'songs',
      attributes: {
        name: `Sample ${genre.genre} Song ${index + 1}`,
        artistName: `${genre.genre} Artist`,
        albumName: `${genre.genre} Album`
      }
    }));

    return sampleTracks;
  }
}
