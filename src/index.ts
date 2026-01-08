import dotenv from 'dotenv';
import { PlaylistGenerator } from './playlistGenerator.js';
import { TokenGenerator } from './utils/tokenGenerator.js';

// Load environment variables
dotenv.config();

async function main() {
  console.log('🎵 Historical Facts Music Playlist Generator\n');
  console.log('============================================\n');

  // Check for Apple Music credentials
  const developerToken = process.env.APPLE_DEVELOPER_TOKEN;
  const userToken = process.env.APPLE_USER_TOKEN;

  let demoMode = false;

  if (!developerToken) {
    console.log('⚠️  No Apple Music API credentials found.\n');
    console.log('Running in DEMO MODE - will show sample data instead of real tracks.\n');
    console.log(TokenGenerator.getTokenInstructions());
    console.log('============================================\n');
    demoMode = true;
  }

  try {
    // Create playlist generator
    const generator = new PlaylistGenerator(developerToken, userToken);

    // Generate playlist
    const result = await generator.generatePlaylist(demoMode);

    // Summary
    console.log('✅ Playlist generation complete!\n');
    console.log('📊 Summary:');
    console.log(`   - ${result.events.length} historical events`);
    console.log(`   - ${result.genres.length} music genres`);
    console.log(`   - ${result.tracks.length} tracks selected\n`);

    if (demoMode) {
      console.log('💡 To create an actual Apple Music playlist:');
      console.log('   1. Get Apple Music API credentials');
      console.log('   2. Generate a developer token');
      console.log('   3. Set APPLE_DEVELOPER_TOKEN in .env');
      console.log('   4. Optionally set APPLE_USER_TOKEN to create playlists\n');
    } else if (!userToken) {
      console.log('💡 To save this playlist to your Apple Music library:');
      console.log('   1. Get a Music User Token');
      console.log('   2. Set APPLE_USER_TOKEN in .env');
      console.log('   3. Run the tool again\n');
    } else {
      console.log('💡 Playlist can be created in Apple Music!');
      console.log('   (Automatic creation not implemented in this demo)\n');
    }

    // Display the historical events that inspired the playlist
    console.log('📜 Historical Events That Inspired This Playlist:\n');
    result.events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.year}: ${event.text.substring(0, 120)}...`);
      if (event.region) {
        console.log(`   📍 ${event.region}${event.country ? ` - ${event.country}` : ''}`);
      }
      console.log('');
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error:', error.message);
    } else {
      console.error('❌ An unexpected error occurred');
    }
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
