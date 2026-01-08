import { HistoricalFactsService } from './services/historicalFacts.js';
import { GenreMappingService } from './services/genreMapping.js';
import { AppleMusicService } from './services/appleMusicService.js';
import { HistoricalEvent, MusicGenre, AppleMusicTrack } from './types/index.js';

/**
 * Main class for generating Apple Music playlists from historical facts
 */
export class PlaylistGenerator {
  private historicalService: HistoricalFactsService;
  private genreService: GenreMappingService;
  private musicService: AppleMusicService;

  constructor(appleMusicToken?: string, userToken?: string) {
    this.historicalService = new HistoricalFactsService();
    this.genreService = new GenreMappingService();
    this.musicService = new AppleMusicService(appleMusicToken, userToken);
  }

  /**
   * Generate a playlist based on today's historical facts
   */
  async generatePlaylist(demoMode: boolean = false): Promise<{
    events: HistoricalEvent[];
    genres: MusicGenre[];
    tracks: AppleMusicTrack[];
    playlistName: string;
    playlistDescription: string;
  }> {
    console.log('📅 Fetching historical events for today...\n');

    // Step 1: Get historical events
    const events = await this.historicalService.getTodayInHistory();

    console.log(`Found ${events.length} historical events:\n`);
    events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.year}: ${event.text.substring(0, 100)}...`);
      if (event.region) {
        console.log(`   📍 Region: ${event.region}${event.country ? ` (${event.country})` : ''}`);
      }
      console.log('');
    });

    // Step 2: Map events to music genres
    console.log('🎵 Mapping events to music genres...\n');
    const genres = this.genreService.getAllGenresFromEvents(events);

    console.log(`Selected ${genres.length} music genres:\n`);
    genres.forEach((genre, index) => {
      console.log(`${index + 1}. ${genre.genre} (${genre.era})`);
    });
    console.log('');

    // Step 3: Search for tracks
    console.log('🔍 Searching for tracks...\n');
    let tracks: AppleMusicTrack[];

    if (demoMode) {
      console.log('Running in DEMO MODE (no Apple Music API credentials)\n');
      tracks = await this.musicService.getSampleTracks(genres);
    } else {
      tracks = await this.musicService.getTracksForGenres(genres);
    }

    console.log(`Found ${tracks.length} tracks:\n`);
    tracks.forEach((track, index) => {
      console.log(`${index + 1}. "${track.attributes.name}" by ${track.attributes.artistName}`);
    });
    console.log('');

    // Step 4: Generate playlist metadata
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const playlistName = `History in Music: ${dateString}`;
    const playlistDescription = this.generatePlaylistDescription(events, genres);

    console.log(`📝 Playlist: "${playlistName}"\n`);
    console.log(`Description: ${playlistDescription}\n`);

    return {
      events,
      genres,
      tracks,
      playlistName,
      playlistDescription
    };
  }

  /**
   * Generate a playlist and create it in Apple Music (requires user token)
   */
  async createPlaylistInAppleMusic(): Promise<string> {
    const { tracks, playlistName, playlistDescription } = await this.generatePlaylist(false);

    console.log('Creating playlist in Apple Music...\n');

    const playlistId = await this.musicService.createPlaylist({
      name: playlistName,
      description: playlistDescription,
      trackIds: tracks.map(t => t.id)
    });

    console.log(`✅ Playlist created with ID: ${playlistId}\n`);

    return playlistId;
  }

  /**
   * Generate a description for the playlist
   */
  private generatePlaylistDescription(events: HistoricalEvent[], genres: MusicGenre[]): string {
    const regions = [...new Set(events.filter(e => e.region).map(e => e.region))];
    const years = events.map(e => e.year).sort((a, b) => a - b);
    const yearRange = years.length > 0 ? `${years[0]}-${years[years.length - 1]}` : 'various eras';

    let description = `A musical journey through history! `;
    description += `This playlist celebrates events from ${yearRange} `;

    if (regions.length > 0) {
      description += `across ${regions.slice(0, 3).join(', ')}`;
      if (regions.length > 3) {
        description += `, and more`;
      }
    }

    description += `. Featuring ${genres.slice(0, 3).map(g => g.genre).join(', ')}`;
    if (genres.length > 3) {
      description += `, and other genres`;
    }
    description += ` inspired by the places and times where history was made.`;

    return description;
  }
}
