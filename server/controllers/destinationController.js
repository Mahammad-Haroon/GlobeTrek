// ============================================================
// Destinations Controller - Sample destination data
// ============================================================

// Sample destination data (no DB needed for this)
const destinations = [
  {
    id: 1,
    country: 'Japan',
    code: 'JP',
    continent: 'Asia',
    description: 'A mesmerizing blend of ancient temples, futuristic cities, and breathtaking natural landscapes. Japan offers a unique cultural experience unlike anywhere on earth.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    rating: 4.9,
    bestTime: 'March–May, Oct–Nov',
    currency: 'JPY',
    language: 'Japanese',
    topPlaces: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Mount Fuji', 'Nara'],
    avgBudget: { budget: 80, mid: 150, luxury: 350 },
    tags: ['culture', 'temples', 'food', 'technology', 'nature'],
  },
  {
    id: 2,
    country: 'France',
    code: 'FR',
    continent: 'Europe',
    description: 'The land of romance, world-class cuisine, and artistic masterpieces. From the Eiffel Tower to the French Riviera, France enchants every traveler.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    rating: 4.8,
    bestTime: 'April–June, Sept–Oct',
    currency: 'EUR',
    language: 'French',
    topPlaces: ['Paris', 'Nice', 'Lyon', 'Bordeaux', 'Versailles', 'Mont Saint-Michel'],
    avgBudget: { budget: 90, mid: 180, luxury: 400 },
    tags: ['romance', 'art', 'food', 'fashion', 'history'],
  },
  {
    id: 3,
    country: 'Italy',
    code: 'IT',
    continent: 'Europe',
    description: 'Home to the world\'s greatest concentration of art, history, and culinary tradition. Italy\'s timeless cities and stunning coastlines make it a perennial favorite.',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800',
    rating: 4.8,
    bestTime: 'April–June, Sept–Oct',
    currency: 'EUR',
    language: 'Italian',
    topPlaces: ['Rome', 'Venice', 'Florence', 'Amalfi Coast', 'Milan', 'Cinque Terre'],
    avgBudget: { budget: 85, mid: 170, luxury: 380 },
    tags: ['history', 'art', 'food', 'architecture', 'coastline'],
  },
  {
    id: 4,
    country: 'Thailand',
    code: 'TH',
    continent: 'Asia',
    description: 'The Land of Smiles captivates with golden temples, tropical beaches, vibrant street food, and warm hospitality that makes every visitor feel at home.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    rating: 4.7,
    bestTime: 'Nov–April',
    currency: 'THB',
    language: 'Thai',
    topPlaces: ['Bangkok', 'Chiang Mai', 'Phuket', 'Koh Samui', 'Pai', 'Ayutthaya'],
    avgBudget: { budget: 40, mid: 80, luxury: 200 },
    tags: ['beaches', 'temples', 'food', 'nightlife', 'culture'],
  },
  {
    id: 5,
    country: 'USA',
    code: 'US',
    continent: 'North America',
    description: 'From the Grand Canyon to New York City, the United States offers an unparalleled diversity of landscapes, cultures, and experiences across its vast expanse.',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800',
    rating: 4.7,
    bestTime: 'Year-round (varies by region)',
    currency: 'USD',
    language: 'English',
    topPlaces: ['New York', 'Los Angeles', 'San Francisco', 'Miami', 'Las Vegas', 'Grand Canyon'],
    avgBudget: { budget: 100, mid: 200, luxury: 500 },
    tags: ['nature', 'cities', 'road trips', 'culture', 'entertainment'],
  },
  {
    id: 6,
    country: 'India',
    code: 'IN',
    continent: 'Asia',
    description: 'An ancient civilization with a kaleidoscope of cultures, colors, and traditions. India\'s diversity — from the Himalayas to tropical beaches — is simply unmatched.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    rating: 4.6,
    bestTime: 'October–March',
    currency: 'INR',
    language: 'Hindi, English',
    topPlaces: ['Taj Mahal', 'Jaipur', 'Kerala', 'Goa', 'Varanasi', 'Ladakh'],
    avgBudget: { budget: 25, mid: 60, luxury: 150 },
    tags: ['culture', 'temples', 'food', 'mountains', 'beaches'],
  },
  {
    id: 7,
    country: 'Australia',
    code: 'AU',
    continent: 'Oceania',
    description: 'A continent of extraordinary wildlife, vast outback, and stunning coastlines. Australia blends outdoor adventure with vibrant cosmopolitan cities.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.8,
    bestTime: 'Sept–Nov, March–May',
    currency: 'AUD',
    language: 'English',
    topPlaces: ['Sydney', 'Melbourne', 'Great Barrier Reef', 'Uluru', 'Brisbane', 'Cairns'],
    avgBudget: { budget: 100, mid: 200, luxury: 450 },
    tags: ['wildlife', 'beaches', 'adventure', 'cities', 'nature'],
  },
  {
    id: 8,
    country: 'Brazil',
    code: 'BR',
    continent: 'South America',
    description: 'The land of samba, carnival, and the Amazon. Brazil pulsates with energy, from its stunning beaches and rainforests to its passionate culture and world-famous festivals.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    rating: 4.6,
    bestTime: 'June–September',
    currency: 'BRL',
    language: 'Portuguese',
    topPlaces: ['Rio de Janeiro', 'São Paulo', 'Amazon Rainforest', 'Iguazu Falls', 'Salvador', 'Florianópolis'],
    avgBudget: { budget: 50, mid: 100, luxury: 250 },
    tags: ['beaches', 'nature', 'culture', 'adventure', 'festivals'],
  },
  {
    id: 9,
    country: 'Greece',
    code: 'GR',
    continent: 'Europe',
    description: 'Birthplace of democracy and Western civilization, Greece enchants with whitewashed villages, azure seas, ancient ruins, and legendary Mediterranean hospitality.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    rating: 4.8,
    bestTime: 'May–Oct',
    currency: 'EUR',
    language: 'Greek',
    topPlaces: ['Santorini', 'Athens', 'Mykonos', 'Crete', 'Rhodes', 'Meteora'],
    avgBudget: { budget: 70, mid: 140, luxury: 320 },
    tags: ['islands', 'history', 'food', 'beaches', 'culture'],
  },
  {
    id: 10,
    country: 'Morocco',
    code: 'MA',
    continent: 'Africa',
    description: 'A sensory feast of ancient medinas, Saharan dunes, colorful souks, and mountain ranges. Morocco is where Africa, Arabia, and Europe converge in magical harmony.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800',
    rating: 4.5,
    bestTime: 'March–May, Sept–Nov',
    currency: 'MAD',
    language: 'Arabic, French',
    topPlaces: ['Marrakech', 'Fes', 'Sahara Desert', 'Chefchaouen', 'Casablanca', 'Essaouira'],
    avgBudget: { budget: 40, mid: 80, luxury: 200 },
    tags: ['culture', 'desert', 'history', 'food', 'architecture'],
  },
  {
    id: 11,
    country: 'Maldives',
    code: 'MV',
    continent: 'Asia',
    description: 'A paradise of overwater bungalows, crystal-clear lagoons, and vibrant coral reefs. The Maldives represents the ultimate luxury tropical escape.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    rating: 4.9,
    bestTime: 'Nov–April',
    currency: 'MVR',
    language: 'Dhivehi, English',
    topPlaces: ['Malé', 'Baa Atoll', 'Ari Atoll', 'North Male Atoll', 'Addu Atoll'],
    avgBudget: { budget: 150, mid: 350, luxury: 1000 },
    tags: ['luxury', 'beaches', 'diving', 'snorkeling', 'romance'],
  },
  {
    id: 12,
    country: 'Peru',
    code: 'PE',
    continent: 'South America',
    description: 'Home to the majestic Machu Picchu and the ancient Inca Empire. Peru blends incredible archaeological wonders with Amazon jungle, Pacific coast, and Andean peaks.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    rating: 4.7,
    bestTime: 'May–September',
    currency: 'PEN',
    language: 'Spanish',
    topPlaces: ['Machu Picchu', 'Cusco', 'Lima', 'Amazon Jungle', 'Lake Titicaca', 'Arequipa'],
    avgBudget: { budget: 45, mid: 90, luxury: 220 },
    tags: ['history', 'adventure', 'nature', 'culture', 'trekking'],
  },
];

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const { search, continent, tag } = req.query;
    let filtered = [...destinations];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.country.toLowerCase().includes(q) ||
          d.topPlaces.some((p) => p.toLowerCase().includes(q)) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (continent) {
      filtered = filtered.filter((d) => d.continent === continent);
    }

    if (tag) {
      filtered = filtered.filter((d) => d.tags.includes(tag.toLowerCase()));
    }

    res.json({ success: true, count: filtered.length, destinations: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
const getDestination = async (req, res) => {
  try {
    const dest = destinations.find((d) => d.id === parseInt(req.params.id));
    if (!dest) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }
    res.json({ success: true, destination: dest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDestinations, getDestination };
