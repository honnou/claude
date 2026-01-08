import { HistoricalEvent, MusicGenre } from '../types/index.js';

/**
 * Maps historical events to appropriate music genres based on region and era
 */
export class GenreMappingService {
  private regionGenres: { [key: string]: { [era: string]: string[] } } = {
    'North America': {
      'early': ['blues', 'folk', 'country'],
      '1920s-1940s': ['jazz', 'swing', 'blues', 'big band'],
      '1950s-1960s': ['rock and roll', 'soul', 'motown', 'folk'],
      '1970s-1980s': ['rock', 'disco', 'funk', 'hip hop'],
      '1990s-2000s': ['hip hop', 'R&B', 'alternative rock', 'pop'],
      'modern': ['pop', 'hip hop', 'indie', 'country']
    },
    'United Kingdom': {
      'early': ['folk', 'classical'],
      '1960s-1970s': ['british rock', 'progressive rock', 'punk'],
      '1980s-1990s': ['new wave', 'britpop', 'electronic'],
      'modern': ['indie rock', 'electronic', 'grime']
    },
    'Europe': {
      'early': ['classical', 'folk', 'opera'],
      '1960s-1970s': ['euro pop', 'krautrock', 'progressive rock'],
      '1980s-1990s': ['euro dance', 'electronic', 'techno'],
      'modern': ['electronic', 'euro pop', 'house']
    },
    'Eastern Europe': {
      'early': ['folk', 'classical'],
      '1960s-1980s': ['rock', 'folk'],
      'modern': ['electronic', 'pop']
    },
    'Latin America': {
      'early': ['folk', 'traditional'],
      '1950s-1970s': ['salsa', 'bossa nova', 'tango', 'mariachi'],
      '1980s-2000s': ['latin pop', 'reggaeton', 'salsa'],
      'modern': ['reggaeton', 'latin pop', 'bachata']
    },
    'Caribbean': {
      'early': ['calypso', 'folk'],
      '1960s-1980s': ['reggae', 'ska', 'dancehall'],
      'modern': ['reggae', 'dancehall', 'soca']
    },
    'South America': {
      'early': ['folk', 'traditional'],
      '1950s-1970s': ['bossa nova', 'tango', 'samba'],
      '1980s-2000s': ['latin rock', 'latin pop'],
      'modern': ['latin pop', 'reggaeton', 'samba']
    },
    'East Asia': {
      'early': ['traditional', 'folk'],
      '1980s-1990s': ['j-pop', 'k-pop', 'city pop'],
      'modern': ['k-pop', 'j-pop', 'mandopop']
    },
    'South Asia': {
      'early': ['classical', 'traditional'],
      '1960s-1980s': ['bollywood', 'classical'],
      'modern': ['bollywood', 'bhangra', 'indie']
    },
    'Middle East': {
      'early': ['traditional', 'classical'],
      'modern': ['traditional', 'arabic pop', 'folk']
    },
    'Africa': {
      'early': ['traditional', 'folk'],
      '1960s-1980s': ['afrobeat', 'highlife', 'soukous'],
      'modern': ['afrobeat', 'afropop', 'afrohouse']
    },
    'West Africa': {
      'early': ['traditional', 'folk'],
      '1960s-1980s': ['afrobeat', 'highlife'],
      'modern': ['afrobeat', 'afropop']
    },
    'Southern Africa': {
      'early': ['traditional', 'folk'],
      '1980s-1990s': ['kwaito', 'mbaqanga'],
      'modern': ['afrohouse', 'amapiano']
    },
    'Oceania': {
      'early': ['folk', 'country'],
      '1960s-1980s': ['rock', 'pop'],
      'modern': ['indie', 'rock', 'pop']
    }
  };

  /**
   * Get music genres for a historical event
   */
  getGenresForEvent(event: HistoricalEvent): MusicGenre[] {
    const genres: MusicGenre[] = [];
    const era = this.getEra(event.year);

    // Try to get region-specific genres
    if (event.region) {
      const regionGenres = this.getGenresForRegionAndEra(event.region, era);
      genres.push(...regionGenres.map(genre => ({
        genre,
        searchTerm: this.createSearchTerm(genre, event),
        era
      })));
    }

    // If no region or few genres, add some era-appropriate defaults
    if (genres.length < 2) {
      const defaultGenres = this.getDefaultGenresForEra(era);
      genres.push(...defaultGenres.map(genre => ({
        genre,
        searchTerm: genre,
        era
      })));
    }

    // Return unique genres, limit to 3-4 per event
    const uniqueGenres = Array.from(new Map(genres.map(g => [g.genre, g])).values());
    return uniqueGenres.slice(0, 3);
  }

  /**
   * Determine the era based on year
   */
  private getEra(year: number): string {
    if (year < 1900) return 'early';
    if (year >= 1920 && year < 1950) return '1920s-1940s';
    if (year >= 1950 && year < 1970) return '1950s-1960s';
    if (year >= 1960 && year < 1980) return '1960s-1970s';
    if (year >= 1970 && year < 1990) return '1970s-1980s';
    if (year >= 1980 && year < 2000) return '1980s-1990s';
    if (year >= 1990 && year < 2010) return '1990s-2000s';
    return 'modern';
  }

  /**
   * Get genres for a specific region and era
   */
  private getGenresForRegionAndEra(region: string, era: string): string[] {
    const regionMap = this.regionGenres[region] || {};

    // Try exact era match first
    if (regionMap[era]) {
      return regionMap[era];
    }

    // Fall back to closest era or modern
    const eras = Object.keys(regionMap);
    if (eras.length > 0) {
      // Return the last (most modern) era genres
      return regionMap[eras[eras.length - 1]];
    }

    return [];
  }

  /**
   * Get default genres for an era (when region is unknown)
   */
  private getDefaultGenresForEra(era: string): string[] {
    const defaults: { [key: string]: string[] } = {
      'early': ['classical', 'folk'],
      '1920s-1940s': ['jazz', 'swing', 'blues'],
      '1950s-1960s': ['rock and roll', 'jazz', 'soul'],
      '1960s-1970s': ['rock', 'soul', 'folk'],
      '1970s-1980s': ['rock', 'disco', 'funk'],
      '1980s-1990s': ['rock', 'pop', 'electronic'],
      '1990s-2000s': ['rock', 'hip hop', 'electronic'],
      'modern': ['pop', 'indie', 'electronic']
    };

    return defaults[era] || defaults['modern'];
  }

  /**
   * Create a search term combining genre with region/country if available
   */
  private createSearchTerm(genre: string, event: HistoricalEvent): string {
    // For region-specific genres, just use the genre
    if (event.region && event.country) {
      // Some genres are already region-specific
      const regionSpecificGenres = ['k-pop', 'j-pop', 'bollywood', 'afrobeat', 'reggae'];
      if (regionSpecificGenres.some(g => genre.toLowerCase().includes(g))) {
        return genre;
      }
    }

    return genre;
  }

  /**
   * Get all unique genres from multiple events
   */
  getAllGenresFromEvents(events: HistoricalEvent[]): MusicGenre[] {
    const allGenres: MusicGenre[] = [];

    for (const event of events) {
      const eventGenres = this.getGenresForEvent(event);
      allGenres.push(...eventGenres);
    }

    // Return unique genres
    const uniqueGenres = Array.from(new Map(allGenres.map(g => [g.genre, g])).values());
    return uniqueGenres;
  }
}
