import axios from 'axios';
import { HistoricalEvent } from '../types/index.js';

/**
 * Fetches historical events that happened on today's date
 */
export class HistoricalFactsService {
  private readonly BASE_URL = 'https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday';

  /**
   * Get events that happened on the current date in history
   */
  async getTodayInHistory(): Promise<HistoricalEvent[]> {
    // Get current date in PST (UTC-8) / PDT (UTC-7)
    const now = new Date();

    // Convert to PST/PDT by using Los Angeles timezone
    const pstDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

    const month = pstDate.getMonth() + 1; // JavaScript months are 0-indexed
    const day = pstDate.getDate();

    return this.getEventsForDate(month, day);
  }

  /**
   * Get events for a specific date
   */
  async getEventsForDate(month: number, day: number): Promise<HistoricalEvent[]> {
    try {
      const url = `${this.BASE_URL}/events/${month}/${day}`;
      const response = await axios.get(url);

      const events: HistoricalEvent[] = response.data.events.map((event: any) => {
        const location = this.extractLocation(event.text);
        return {
          year: event.year,
          text: event.text,
          date: `${month}/${day}`,
          ...location
        };
      });

      // Select a diverse range of events across different time periods
      return this.selectDiverseEvents(events);
    } catch (error) {
      console.warn('⚠️  Unable to fetch live historical events. Using sample data instead.\n');
      return this.getSampleEvents();
    }
  }

  /**
   * Select a diverse mix of events from different eras
   */
  private selectDiverseEvents(events: HistoricalEvent[]): HistoricalEvent[] {
    // Group events by era
    const byEra: { [key: string]: HistoricalEvent[] } = {
      'ancient': [],      // Before 1800
      'industrial': [],   // 1800-1899
      'early1900s': [],   // 1900-1949
      'midcentury': [],   // 1950-1979
      'modern': [],       // 1980-1999
      'recent': []        // 2000-2020
    };

    events.forEach(event => {
      if (event.year < 1800) byEra.ancient.push(event);
      else if (event.year < 1900) byEra.industrial.push(event);
      else if (event.year < 1950) byEra.early1900s.push(event);
      else if (event.year < 1980) byEra.midcentury.push(event);
      else if (event.year < 2000) byEra.modern.push(event);
      else if (event.year <= 2020) byEra.recent.push(event);
    });

    // Select events from each era (prioritize recent events)
    const selected: HistoricalEvent[] = [];

    // Take 2 recent events (2000-2020)
    selected.push(...byEra.recent.slice(0, 2));

    // Take 2 modern events (1980-1999)
    selected.push(...byEra.modern.slice(0, 2));

    // Take 1-2 midcentury events (1950-1979)
    selected.push(...byEra.midcentury.slice(0, 2));

    // Take 1-2 early 1900s events (1900-1949)
    selected.push(...byEra.early1900s.slice(0, 2));

    // Take 1 industrial era event (1800-1899)
    selected.push(...byEra.industrial.slice(0, 1));

    // Take 1 ancient event (before 1800)
    selected.push(...byEra.ancient.slice(0, 1));

    // Sort by year (newest first for better engagement)
    selected.sort((a, b) => b.year - a.year);

    // Return up to 12 events
    return selected.slice(0, 12);
  }

  /**
   * Get sample events for demonstration purposes
   */
  private getSampleEvents(): HistoricalEvent[] {
    return [
      {
        year: 1935,
        text: 'Elvis Presley, American singer and actor, "The King of Rock and Roll", was born in Tupelo, Mississippi',
        date: '1/8',
        country: 'United States',
        region: 'North America'
      },
      {
        year: 1642,
        text: 'Galileo Galilei, Italian astronomer, physicist and engineer, dies in Florence, Italy at age 77',
        date: '1/8',
        country: 'Italy',
        region: 'Europe'
      },
      {
        year: 1959,
        text: 'Charles de Gaulle is inaugurated as President of France',
        date: '1/8',
        country: 'France',
        region: 'Europe'
      },
      {
        year: 1918,
        text: 'US President Woodrow Wilson outlines his Fourteen Points for peace after World War I',
        date: '1/8',
        country: 'United States',
        region: 'North America'
      },
      {
        year: 1815,
        text: 'Battle of New Orleans: American forces under Andrew Jackson defeat the British',
        date: '1/8',
        country: 'United States',
        region: 'North America'
      },
      {
        year: 1964,
        text: 'President Lyndon B. Johnson declares a "War on Poverty" in his State of the Union address',
        date: '1/8',
        country: 'United States',
        region: 'North America'
      },
      {
        year: 1889,
        text: 'Herman Hollerith receives a patent for his electric tabulating machine',
        date: '1/8',
        country: 'United States',
        region: 'North America'
      },
      {
        year: 1926,
        text: 'Abdul Aziz ibn Saud becomes King of Hejaz and renames it Saudi Arabia',
        date: '1/8',
        country: 'Saudi Arabia',
        region: 'Middle East'
      }
    ];
  }

  /**
   * Extract location information from event text
   * This is a simple heuristic-based approach
   */
  private extractLocation(text: string): { location?: string; region?: string; country?: string } {
    const result: { location?: string; region?: string; country?: string } = {};

    // Common country patterns
    const countryPatterns = [
      { pattern: /\b(United States|America|U\.S\.)\b/i, country: 'United States', region: 'North America' },
      { pattern: /\b(United Kingdom|Britain|England|UK)\b/i, country: 'United Kingdom', region: 'Europe' },
      { pattern: /\b(France|French)\b/i, country: 'France', region: 'Europe' },
      { pattern: /\b(Germany|German)\b/i, country: 'Germany', region: 'Europe' },
      { pattern: /\b(Italy|Italian)\b/i, country: 'Italy', region: 'Europe' },
      { pattern: /\b(Spain|Spanish)\b/i, country: 'Spain', region: 'Europe' },
      { pattern: /\b(Russia|Russian|Soviet)\b/i, country: 'Russia', region: 'Eastern Europe' },
      { pattern: /\b(China|Chinese)\b/i, country: 'China', region: 'East Asia' },
      { pattern: /\b(Japan|Japanese)\b/i, country: 'Japan', region: 'East Asia' },
      { pattern: /\b(India|Indian)\b/i, country: 'India', region: 'South Asia' },
      { pattern: /\b(Brazil|Brazilian)\b/i, country: 'Brazil', region: 'South America' },
      { pattern: /\b(Mexico|Mexican)\b/i, country: 'Mexico', region: 'Latin America' },
      { pattern: /\b(Egypt|Egyptian)\b/i, country: 'Egypt', region: 'Middle East' },
      { pattern: /\b(Africa|African)\b/i, country: 'Africa', region: 'Africa' },
      { pattern: /\b(Australia|Australian)\b/i, country: 'Australia', region: 'Oceania' },
      { pattern: /\b(Canada|Canadian)\b/i, country: 'Canada', region: 'North America' },
      { pattern: /\b(Ireland|Irish)\b/i, country: 'Ireland', region: 'Europe' },
      { pattern: /\b(Greece|Greek)\b/i, country: 'Greece', region: 'Europe' },
      { pattern: /\b(Turkey|Turkish|Ottoman)\b/i, country: 'Turkey', region: 'Middle East' },
      { pattern: /\b(Poland|Polish)\b/i, country: 'Poland', region: 'Eastern Europe' },
      { pattern: /\b(Argentina|Argentinian)\b/i, country: 'Argentina', region: 'South America' },
      { pattern: /\b(Cuba|Cuban)\b/i, country: 'Cuba', region: 'Caribbean' },
      { pattern: /\b(Jamaica|Jamaican)\b/i, country: 'Jamaica', region: 'Caribbean' },
      { pattern: /\b(Nigeria|Nigerian)\b/i, country: 'Nigeria', region: 'West Africa' },
      { pattern: /\b(South Africa)\b/i, country: 'South Africa', region: 'Southern Africa' },
    ];

    for (const { pattern, country, region } of countryPatterns) {
      if (pattern.test(text)) {
        result.country = country;
        result.region = region;
        break;
      }
    }

    return result;
  }
}
