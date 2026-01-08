export interface HistoricalEvent {
  year: number;
  text: string;
  date: string;
  location?: string;
  region?: string;
  country?: string;
}

export interface MusicGenre {
  genre: string;
  searchTerm: string;
  era?: string;
}

export interface RegionGenreMapping {
  region: string;
  genres: string[];
  popularGenres: { [era: string]: string[] };
}

export interface AppleMusicTrack {
  id: string;
  type: string;
  attributes: {
    name: string;
    artistName: string;
    albumName: string;
  };
}

export interface PlaylistConfig {
  name: string;
  description: string;
  trackIds: string[];
}
