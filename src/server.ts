import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PlaylistGenerator } from './playlistGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to generate playlist
app.get('/api/generate-playlist', async (req, res) => {
  try {
    const developerToken = process.env.APPLE_DEVELOPER_TOKEN;
    const userToken = process.env.APPLE_USER_TOKEN;

    // Always run in demo mode for web version (unless user has credentials)
    const demoMode = !developerToken;

    const generator = new PlaylistGenerator(developerToken, userToken);
    const result = await generator.generatePlaylist(demoMode);

    res.json({
      success: true,
      data: {
        playlistName: result.playlistName,
        playlistDescription: result.playlistDescription,
        events: result.events,
        genres: result.genres,
        tracks: result.tracks,
        demoMode
      }
    });
  } catch (error) {
    console.error('Error generating playlist:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎵 Historical Facts Music Playlist - Web App`);
  console.log(`============================================`);
  console.log(`\n🌐 Server running at: http://localhost:${PORT}`);
  console.log(`\n📱 Open this URL on your iPhone (if on same network):`);
  console.log(`   - Find your computer's local IP address`);
  console.log(`   - Open http://[YOUR_IP]:${PORT} in Safari\n`);
  console.log(`💡 Press Ctrl+C to stop the server\n`);
});
