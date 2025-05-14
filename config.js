// d:\OLD PC\F\Projects\display\config.js
const TMDB_API_KEY = 'b7a017453d8409bb5be3785f80dbe8b4'; // <-- IMPORTANT: Replace with your TMDB API Key

// Add TMDB IDs of TV shows or movies you've watched
// Example K-Drama TV Show IDs: 60735 (Crash Landing on You), 96102 (Vincenzo), 70571 (Strong Woman Do Bong Soon)
// Example Movie IDs: 496243 (Parasite)
const ITEMS_TO_DISPLAY = [
    { id: 60735, type: 'tv' },    // Example: Crash Landing on You (TV)
    { id: 96102, type: 'tv' },    // Example: Vincenzo (TV)
    { id: 496243, type: 'movie' }, // Example: Parasite (Movie)
    { id: 86848, type: 'tv' },   // Hotel Del Luna
    { id: 65158, type: 'tv' },   // Descendants of the Sun
    { id: 70813, type: 'tv' },   // Fight For My Way
    { id: 90296, type: 'tv' },   // Itaewon Class
    { id: 87784, type: 'tv' },   // Vagabond
    { id: 70571, type: 'tv' },   // Strong Woman Do Bong Soon
    { id: 69805, type: 'tv' },   // Weightlifting Fairy Kim Bok-joo
    { id: 126019, type: 'tv' },  // Hometown Cha-Cha-Cha
    { id: 131541, type: 'tv' },  // Ordinary Day (One Ordinary Day)
    { id: 130542, type: 'tv' },  // Innocent Defendant (Defendant)
    { id: 96102, type: 'tv' },   // Vincenzo
    { id: 117376, type: 'tv' },  // Sweet Home
    { id: 131541, type: 'tv' },  // Happiness
    { id: 83121, type: 'tv' },   // Kingdom
    { id: 67177, type: 'tv' },   // Goblin
    { id: 65494, type: 'tv' },   // My Love From The Star
    { id: 77148, type: 'tv' },   // What's Wrong With Secretary Kim
    { id: 131541, type: 'tv' },  // The Silent Sea
    { id: 112888, type: 'tv' },  // Start-Up
    { id: 91784, type: 'tv' },   // Strangers From Hell
    { id: 100088, type: 'tv' },  // Extracurricular
    { id: 79903, type: 'tv' },   // Wok of Love
    { id: 72750, type: 'tv' },   // Because This Is My First Life
    { id: 125870, type: 'tv' },  // My Name
    { id: 72684, type: 'tv' },   // While You Were Sleeping
    { id: 120089, type: 'tv' },  // Mouse
    { id: 123013, type: 'tv' },  // My Roommate Is a Gumiho
    { id: 77034, type: 'tv' },   // Welcome to Waikiki
    { id: 79673, type: 'tv' },   // My ID Is Gangnam Beauty
    { id: 70824, type: 'tv' },   // Suspicious Partner
    { id: 128888, type: 'tv' },  // Yumi’s Cells
    { id: 134519, type: 'tv' },  // Our Beloved Summer
    { id: 85702, type: 'tv' },   // Touch Your Heart
    { id: 131541, type: 'tv' },  // Snowdrop
    { id: 133372, type: 'tv' },  // Dali and the Cocky Prince
    { id: 117376, type: 'tv' },  // She Would Never Know
    { id: 85937, type: 'tv' },   // Romance Is a Bonus Book
    { id: 106651, type: 'tv' },  // 18 Again
    { id: 157368, type: 'tv' },  // Ghost Doctor
    { id: 117376, type: 'tv' },  // D.P.
    { id: 70128, type: 'tv' },   // Page Turner
    { id: 70735, type: 'tv' },   // Chicago Typewriter
    { id: 68198, type: 'tv' },   // 1% of Something
    { id: 116422, type: 'tv' },  // Mr. Queen
    { id: 84958, type: 'tv' },   // The Beauty Inside
    { id: 110534, type: 'tv' },  // Do Do Sol Sol La La Sol
    { id: 111803, type: 'tv' },  // It's Okay to Not Be Okay
    { id: 157368, type: 'tv' },  // A Business Proposal
    { id: 157368, type: 'tv' },  // Soundtrack #1
    { id: 88040, type: 'tv' },   // Her Private Life
    { id: 125870, type: 'tv' },  // The Sound of Magic
    { id: 157368, type: 'tv' },  // Pachinko
    { id: 106651, type: 'tv' },  // Do You Like Brahms?
    { id: 157368, type: 'tv' },  // Tomorrow
    { id: 123013, type: 'tv' },  // Doom at Your Service
    { id: 157368, type: 'tv' },  // Shooting Stars
    { id: 157368, type: 'tv' },  // If You Wish Upon Me
    { id: 65790, type: 'tv' },   // The K2
    { id: 157368, type: 'tv' },  // Little Women
    { id: 157368, type: 'tv' },  // Gaus Electronics
    { id: 157368, type: 'tv' },  // Attorney Woo
    { id: 157368, type: 'tv' },  // The Uncanny Counter
    { id: 157368, type: 'tv' },  // Rookie Cops
    { id: 157368, type: 'tv' },  // Grid
    { id: 120089, type: 'tv' },  // Taxi Driver
    { id: 157368, type: 'tv' },  // Twenty Five Twenty One
    { id: 157368, type: 'tv' },  // My Demon
    { id: 157368, type: 'tv' },  // A Shop For Killers
    { id: 157368, type: 'tv' },  // Queen of Tears
    { id: 157368, type: 'tv' },  // Vigilante
    { id: 157368, type: 'tv' },  // Hidden Love
    { id: 157368, type: 'tv' },  // Moving
    { id: 157368, type: 'tv' }   // Gyeongsang Creature
];