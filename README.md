# Historical Facts Music Playlist Generator

A Node.js tool that creates Apple Music playlists based on daily historical facts, featuring music genres from the regions where the events occurred.

## Features

- Fetches historical events that happened on today's date
- Analyzes the geographic location and time period of each event
- Maps events to appropriate music genres based on region and era
- Searches Apple Music for tracks matching those genres
- Generates a curated playlist with a description of the historical context

## How It Works

1. **Fetch Historical Facts**: Uses Wikipedia's "On This Day" API to get events from history
2. **Location Analysis**: Extracts geographic information (country/region) from event descriptions
3. **Genre Mapping**: Maps regions and time periods to culturally relevant music genres
   - Example: Events from 1960s Jamaica → reggae, ska
   - Example: Events from 1920s USA → jazz, blues, swing
4. **Music Search**: Searches Apple Music for tracks in the identified genres
5. **Playlist Creation**: Generates a playlist with metadata describing the historical connection

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd claude

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

## Usage

### 🌐 Web App (Best for iPhone/Mobile)

The easiest way to use this tool, especially on iPhone or mobile devices:

```bash
npm install
npm run web
```

Then:
- **On your computer**: Open http://localhost:3000 in your browser
- **On your iPhone** (same WiFi network):
  1. Find your computer's local IP address
     - Mac: System Preferences → Network
     - Windows: Run `ipconfig` in terminal
     - Linux: Run `hostname -I`
  2. Open Safari on your iPhone
  3. Go to `http://[YOUR_IP]:3000` (e.g., `http://192.168.1.100:3000`)
  4. Tap "Generate Today's Playlist"
  5. Add to home screen for app-like experience (Safari → Share → Add to Home Screen)

The web interface is mobile-optimized and works great on iPhone!

### 💻 Command Line Mode

Run the tool without Apple Music API credentials to see how it works:

```bash
npm run dev
```

This will:
- Fetch real historical events
- Map them to music genres
- Display sample track data (mock data, not real Apple Music tracks)

### Full Mode (With Apple Music API)

To use the full Apple Music integration:

1. **Get Apple Music API Credentials**:
   - Join the [Apple Developer Program](https://developer.apple.com)
   - Create a MusicKit identifier and key at [developer.apple.com/account](https://developer.apple.com/account/)
   - Download your private key (.p8 file)

2. **Generate Developer Token**:

   Install the JWT library:
   ```bash
   npm install jsonwebtoken
   ```

   Create a token generation script:
   ```javascript
   import jwt from 'jsonwebtoken';
   import fs from 'fs';

   const teamId = 'YOUR_TEAM_ID';
   const keyId = 'YOUR_KEY_ID';
   const privateKey = fs.readFileSync('path/to/AuthKey_KEYID.p8', 'utf8');

   const token = jwt.sign({}, privateKey, {
     algorithm: 'ES256',
     expiresIn: '180d',
     issuer: teamId,
     header: {
       alg: 'ES256',
       kid: keyId
     }
   });

   console.log('Developer Token:', token);
   ```

3. **Configure Environment**:

   Edit `.env` and add your token:
   ```
   APPLE_DEVELOPER_TOKEN=your_generated_jwt_token
   ```

4. **Run the Tool**:
   ```bash
   npm run dev
   ```

## Example Output

```
🎵 Historical Facts Music Playlist Generator

📅 Fetching historical events for today...

Found 8 historical events:

1. 1776: The United States Declaration of Independence is signed...
   📍 Region: North America (United States)

2. 1865: Alice's Adventures in Wonderland is published in the United Kingdom...
   📍 Region: Europe (United Kingdom)

3. 1954: Elvis Presley records "That's All Right" at Sun Studio...
   📍 Region: North America (United States)

🎵 Mapping events to music genres...

Selected 12 music genres:

1. folk (early)
2. rock and roll (1950s-1960s)
3. british rock (1960s-1970s)
...

🔍 Searching for tracks...

Found 24 tracks:

1. "This Land Is Your Land" by Woody Guthrie
2. "That's All Right" by Elvis Presley
3. "A Day in the Life" by The Beatles
...

📝 Playlist: "History in Music: January 8"

✅ Playlist generation complete!
```

## Project Structure

```
claude/
├── src/
│   ├── services/
│   │   ├── historicalFacts.ts    # Wikipedia API integration
│   │   ├── genreMapping.ts       # Region/era to genre mapping
│   │   └── appleMusicService.ts  # Apple Music API client
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── tokenGenerator.ts     # Token generation utilities
│   ├── playlistGenerator.ts      # Main playlist generation logic
│   └── index.ts                  # CLI entry point
├── package.json
├── tsconfig.json
└── .env.example
```

## Genre Mapping

The tool includes curated mappings for various regions and eras:

- **North America**: jazz, blues, rock and roll, hip hop, country
- **Latin America**: salsa, bossa nova, reggaeton, tango
- **Caribbean**: reggae, ska, dancehall, calypso
- **Europe**: classical, progressive rock, electronic, britpop
- **Africa**: afrobeat, highlife, afropop, amapiano
- **Asia**: k-pop, j-pop, bollywood, traditional
- And many more...

Each region has era-specific genres (1920s-1940s, 1950s-1960s, etc.) to match the historical period.

## API References

- **Wikipedia "On This Day" API**: [wikimedia.org/api/rest_v1](https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday)
- **Apple Music API**: [developer.apple.com/documentation/applemusicapi](https://developer.apple.com/documentation/applemusicapi/)
- **MusicKit**: [developer.apple.com/musickit](https://developer.apple.com/musickit/)

## Limitations

- Apple Music API requires a paid Apple Developer account ($99/year)
- Creating playlists requires user authorization (Music User Token)
- Location extraction is heuristic-based and may not catch all geographic references
- Genre mapping is curated and may not cover all regional music traditions
- Rate limiting on Apple Music API (handled with delays between requests)

## Future Enhancements

- Support for Spotify and other music services
- More sophisticated location extraction (NLP/entity recognition)
- User preferences for genre selection
- Playlist customization options (track count, genre weights)
- Web interface for easier use
- Scheduled daily playlist creation
- Integration with calendar apps

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
