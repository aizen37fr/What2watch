export type ContentType = 'movie' | 'series' | 'anime' | 'kdrama' | 'cdrama';
export type Mood = 'Chill' | 'Excited' | 'Emotional' | 'Laugh' | 'Scared' | 'Mind-bending';
export type Language = 'English' | 'Hindi' | 'Japanese' | 'Spanish' | 'Korean' | 'French' | 'German' | 'Italian' | 'Chinese' | 'Portuguese' | 'Russian' | 'Arabic';

export interface ContentItem {
    id: string;
    title: string;
    type: ContentType;
    moods: Mood[];
    genres: string[];
    language: Language;
    rating: number;
    year: number;
    image: string; // Poster/Backdrop URL
    description: string;
    trailerUrl?: string; // Legacy full URL (optional)
    trailerKey?: string; // YouTube Video ID (e.g., "dQw4w9WgXcQ")
    watchProviders?: {
        name: string;
        logo: string;
        link: string;
    }[];
    cast?: { name: string; character: string; image: string | null }[];
}

export const db: ContentItem[] = [
    // ==================== ANIME (Comprehensive Library) ====================
    // Shonen Classics & Modern Hits
    { id: 'a1', title: 'Your Name', type: 'anime', moods: ['Emotional', 'Mind-bending', 'Chill'], genres: ['Romance', 'Fantasy'], language: 'Japanese', rating: 9.2, year: 2016, image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2000', description: "Two strangers find themselves linked in a bizarre way." },
    { id: 'a2', title: 'Jujutsu Kaisen', type: 'anime', moods: ['Excited', 'Scared'], genres: ['Action', 'Supernatural'], language: 'Japanese', rating: 8.8, year: 2020, image: 'https://images.unsplash.com/photo-1630713815164-8c8d2347963d?q=80&w=2000', description: "A boy swallows a cursed talisman and becomes cursed himself." },
    { id: 'a3', title: 'Spy x Family', type: 'anime', moods: ['Laugh', 'Chill', 'Excited'], genres: ['Action', 'Comedy'], language: 'Japanese', rating: 8.5, year: 2022, image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2000', description: "A spy, an assassin, and a telepath form a makeshift family." },
    { id: 'a4', title: 'Demon Slayer', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 8.9, year: 2019, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000', description: "Tanjiro sets out to become a demon slayer to avenge his family." },
    { id: 'a5', title: 'Attack on Titan', type: 'anime', moods: ['Scared', 'Excited', 'Mind-bending'], genres: ['Action', 'Dark Fantasy'], language: 'Japanese', rating: 9.1, year: 2013, image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=2000', description: "Humanity fights for survival against man-eating giants." },
    { id: 'a6', title: 'Death Note', type: 'anime', moods: ['Mind-bending', 'Scared'], genres: ['Thriller'], language: 'Japanese', rating: 9.0, year: 2006, image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2000', description: "A high school student discovers a supernatural notebook that kills." },
    { id: 'a7', title: 'One Piece', type: 'anime', moods: ['Excited', 'Laugh', 'Emotional'], genres: ['Adventure'], language: 'Japanese', rating: 8.9, year: 1999, image: 'https://images.unsplash.com/photo-1563482776068-4dac10f9373d?q=80&w=2000', description: "Monkey D. Luffy explores the world in search of the ultimate treasure." },
    { id: 'a8', title: 'Naruto Shippuden', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Action'], language: 'Japanese', rating: 8.7, year: 2007, image: 'https://wallpaperaccess.com/full/134446.jpg', description: "Naruto Uzumaki searches for approval and the Hokage title." },
    { id: 'a9', title: 'Fullmetal Alchemist: Brotherhood', type: 'anime', moods: ['Emotional', 'Excited'], genres: ['Adventure'], language: 'Japanese', rating: 9.1, year: 2009, image: 'https://wallpaperaccess.com/full/767175.jpg', description: "Two brothers search for a Philosopher's Stone." },
    { id: 'a10', title: 'One Punch Man', type: 'anime', moods: ['Laugh', 'Excited'], genres: ['Action', 'Comedy'], language: 'Japanese', rating: 8.7, year: 2015, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "A hero who can defeat any opponent with a single punch." },
    { id: 'a11', title: 'Bleach', type: 'anime', moods: ['Excited', 'Scared'], genres: ['Action', 'Supernatural'], language: 'Japanese', rating: 8.2, year: 2004, image: 'https://wallpaperaccess.com/full/226598.jpg', description: "Ichigo Kurosaki gains the powers of a Soul Reaper." },
    { id: 'a12', title: 'Hunter x Hunter', type: 'anime', moods: ['Excited', 'Mind-bending'], genres: ['Adventure'], language: 'Japanese', rating: 9.0, year: 2011, image: 'https://wallpaperaccess.com/full/180598.jpg', description: "Gon Freecss aspires to become a Hunter and find his father." },
    { id: 'a13', title: 'Cowboy Bebop', type: 'anime', moods: ['Chill', 'Mind-bending'], genres: ['Sci-Fi', 'Action'], language: 'Japanese', rating: 8.9, year: 1998, image: 'https://wallpaperaccess.com/full/1449179.jpg', description: "A ragtag crew of bounty hunters chases criminals across the galaxy." },
    { id: 'a14', title: 'My Hero Academia', type: 'anime', moods: ['Excited', 'Laugh'], genres: ['Action', 'Supernatural'], language: 'Japanese', rating: 8.3, year: 2016, image: 'https://wallpaperaccess.com/full/428387.jpg', description: "A boy born without superpowers enrolls in a prestigious hero academy." },
    { id: 'a15', title: 'Neon Genesis Evangelion', type: 'anime', moods: ['Mind-bending', 'Scared', 'Emotional'], genres: ['Sci-Fi', 'Psychological'], language: 'Japanese', rating: 8.5, year: 1995, image: 'https://wallpaperaccess.com/full/2040182.jpg', description: "Teenagers pilot giant mechs to protect humanity from Angels." },
    { id: 'a16', title: 'Chainsaw Man', type: 'anime', moods: ['Excited', 'Scared'], genres: ['Action', 'Horror'], language: 'Japanese', rating: 8.5, year: 2022, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "Denji is a teenage boy living with a Chainsaw Devil named Pochita." },
    { id: 'a17', title: 'Blue Lock', type: 'anime', moods: ['Excited'], genres: ['Sports'], language: 'Japanese', rating: 8.3, year: 2022, image: 'https://wallpaperaccess.com/full/180598.jpg', description: "Japan's national team needs an egoist striker." },
    { id: 'a18', title: 'Solo Leveling', type: 'anime', moods: ['Excited', 'Mind-bending'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 8.4, year: 2024, image: 'https://wallpaperaccess.com/full/226598.jpg', description: "Weakest hunter becomes the strongest." },
    { id: 'a19', title: 'Frieren: Beyond Journey\'s End', type: 'anime', moods: ['Chill', 'Emotional'], genres: ['Fantasy', 'Adventure'], language: 'Japanese', rating: 9.1, year: 2023, image: 'https://wallpaperaccess.com/full/2040182.jpg', description: "Elven mage Frieren reflects on her life after the hero party defeat the Demon King." },
    { id: 'a20', title: 'Cyberpunk: Edgerunners', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Sci-Fi', 'Action'], language: 'Japanese', rating: 8.3, year: 2022, image: 'https://wallpaperaccess.com/full/8288591.jpg', description: "A street kid tries to survive in a technology and body modification-obsessed city of the future." },

    // Romance & Slice of Life
    { id: 'a21', title: 'A Silent Voice', type: 'anime', moods: ['Emotional', 'Chill'], genres: ['Drama', 'Romance'], language: 'Japanese', rating: 8.9, year: 2016, image: 'https://wallpaperaccess.com/full/1539281.jpg', description: "A bully seeks redemption from a deaf girl he tormented." },
    { id: 'a22', title: 'Weathering With You', type: 'anime', moods: ['Emotional', 'Chill'], genres: ['Romance', 'Fantasy'], language: 'Japanese', rating: 8.2, year: 2019, image: 'https://wallpaperaccess.com/full/2265261.jpg', description: "A boy meets a girl who can manipulate the weather." },
    { id: 'a23', title: 'Violet Evergarden', type: 'anime', moods: ['Emotional', 'Chill'], genres: ['Drama'], language: 'Japanese', rating: 8.7, year: 2018, image: 'https://wallpaperaccess.com/full/1264627.jpg', description: "A former child soldier learns about emotions through writing letters." },
    { id: 'a24', title: 'Toradora!', type: 'anime', moods: ['Laugh', 'Emotional'], genres: ['Romance', 'Comedy'], language: 'Japanese', rating: 8.4, year: 2008, image: 'https://wallpaperaccess.com/full/5747372.jpg', description: "Two students team up to help each other find love." },
    { id: 'a25', title: 'Horimiya', type: 'anime', moods: ['Chill', 'Laugh'], genres: ['Romance', 'Comedy'], language: 'Japanese', rating: 8.2, year: 2021, image: 'https://wallpaperaccess.com/full/6265005.jpg', description: "Two students discover each other's hidden personas." },
    { id: 'a26', title: 'Kaguya-sama: Love Is War', type: 'anime', moods: ['Laugh', 'Mind-bending'], genres: ['Comedy', 'Romance'], language: 'Japanese', rating: 8.5, year: 2019, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "Two geniuses try to make the other confess their love first." },
    { id: 'a27', title: 'Clannad: After Story', type: 'anime', moods: ['Emotional', 'Chill'], genres: ['Drama', 'Romance'], language: 'Japanese', rating: 9.0, year: 2008, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "The continuation of Tomoya and Nagisa's love story." },
    { id: 'a28', title: 'March Comes in Like a Lion', type: 'anime', moods: ['Emotional', 'Chill'], genres: ['Drama'], language: 'Japanese', rating: 8.4, year: 2016, image: 'https://wallpaperaccess.com/full/2146954.jpg', description: "A professional shogi player struggles with depression and loneliness." },

    // Isekai & Fantasy
    { id: 'a29', title: 'Sword Art Online', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 7.6, year: 2012, image: 'https://wallpaperaccess.com/full/134446.jpg', description: "Players trapped in a virtual reality MMORPG." },
    { id: 'a30', title: 'Re:Zero', type: 'anime', moods: ['Scared', 'Emotional', 'Mind-bending'], genres: ['Fantasy', 'Thriller'], language: 'Japanese', rating: 8.5, year: 2016, image: 'https://wallpaperaccess.com/full/767175.jpg', description: "Subaru is sent to a fantasy world with the ability to return from death." },
    { id: 'a31', title: 'That Time I Got Reincarnated as a Slime', type: 'anime', moods: ['Laugh', 'Excited'], genres: ['Fantasy', 'Comedy'], language: 'Japanese', rating: 8.2, year: 2018, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "A man is reincarnated as a powerful slime in a fantasy world." },
    { id: 'a32', title: 'Overlord', type: 'anime', moods: ['Excited', 'Mind-bending'], genres: ['Fantasy', 'Action'], language: 'Japanese', rating: 7.9, year: 2015, image: 'https://wallpaperaccess.com/full/226598.jpg', description: "A player gets trapped in a game as his skeleton overlord avatar." },
    { id: 'a33', title: 'Konosuba', type: 'anime', moods: ['Laugh', 'Excited'], genres: ['Comedy', 'Fantasy'], language: 'Japanese', rating: 8.1, year: 2016, image: 'https://wallpaperaccess.com/full/180598.jpg', description: "A boy dies and is sent to a fantasy world with a useless goddess." },
    { id: 'a34', title: 'No Game No Life', type: 'anime', moods: ['Mind-bending', 'Laugh'], genres: ['Fantasy', 'Comedy'], language: 'Japanese', rating: 8.2, year: 2014, image: 'https://wallpaperaccess.com/full/1449179.jpg', description: "Genius gamer siblings are sent to a world where games decide everything." },
    { id: 'a35', title: 'Mushoku Tensei', type: 'anime', moods: ['Emotional', 'Excited'], genres: ['Fantasy', 'Drama'], language: 'Japanese', rating: 8.5, year: 2021, image: 'https://wallpaperaccess.com/full/428387.jpg', description: "A man is reincarnated in a magical world and gets a second chance at life." },

    // Psychological & Thriller
    { id: 'a36', title: 'Steins;Gate', type: 'anime', moods: ['Mind-bending', 'Scared'], genres: ['Sci-Fi', 'Thriller'], language: 'Japanese', rating: 9.1, year: 2011, image: 'https://wallpaperaccess.com/full/2040182.jpg', description: "A self-proclaimed mad scientist invents a time machine." },
    { id: 'a37', title: 'Code Geass', type: 'anime', moods: ['Mind-bending', 'Excited'], genres: ['Action', 'Mecha'], language: 'Japanese', rating: 8.7, year: 2006, image: 'https://wallpaperaccess.com/full/8288591.jpg', description: "A prince gains the power to control minds and leads a rebellion." },
    { id: 'a38', title: 'Psycho-Pass', type: 'anime', moods: ['Mind-bending', 'Scared'], genres: ['Sci-Fi', 'Thriller'], language: 'Japanese', rating: 8.4, year: 2012, image: 'https://wallpaperaccess.com/full/1539281.jpg', description: "In a dystopian future, a system can measure criminal intent." },
    { id: 'a39', title: 'Monster', type: 'anime', moods: ['Scared', 'Mind-bending'], genres: ['Thriller', 'Mystery'], language: 'Japanese', rating: 8.8, year: 2004, image: 'https://wallpaperaccess.com/full/2265261.jpg', description: "A doctor hunts down a patient he saved who became a serial killer." },
    { id: 'a40', title: 'Tokyo Ghoul', type: 'anime', moods: ['Scared', 'Excited'], genres: ['Horror', 'Action'], language: 'Japanese', rating: 7.8, year: 2014, image: 'https://wallpaperaccess.com/full/1264627.jpg', description: "A student becomes a half-ghoul after a deadly encounter." },
    { id: 'a41', title: 'Parasyte', type: 'anime', moods: ['Scared', 'Mind-bending'], genres: ['Horror', 'Sci-Fi'], language: 'Japanese', rating: 8.3, year: 2014, image: 'https://wallpaperaccess.com/full/5747372.jpg', description: "Parasitic aliens take over human brains." },
    { id: 'a42', title: 'The Promised Neverland', type: 'anime', moods: ['Scared', 'Mind-bending'], genres: ['Thriller', 'Mystery'], language: 'Japanese', rating: 8.3, year: 2019, image: 'https://wallpaperaccess.com/full/6265005.jpg', description: "Orphans discover a dark secret about their orphanage." },

    // Sports & Competition
    { id: 'a43', title: 'Haikyuu!!', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Sports'], language: 'Japanese', rating: 8.7, year: 2014, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "A short boy dreams of becoming a volleyball champion." },
    { id: 'a44', title: 'Kuroko\'s Basketball', type: 'anime', moods: ['Excited'], genres: ['Sports'], language: 'Japanese', rating: 8.2, year: 2012, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "A phantom sixth man joins a new basketball team." },
    { id: 'a45', title: 'Slam Dunk', type: 'anime', moods: ['Excited', 'Laugh'], genres: ['Sports', 'Comedy'], language: 'Japanese', rating: 8.6, year: 1993, image: 'https://wallpaperaccess.com/full/2146954.jpg', description: "A delinquent joins a basketball team to impress a girl." },
    { id: 'a46', title: 'Ping Pong the Animation', type: 'anime', moods: ['Emotional', 'Chill'], genres: ['Sports', 'Drama'], language: 'Japanese', rating: 8.6, year: 2014, image: 'https://wallpaperaccess.com/full/134446.jpg', description: "Two childhood friends compete in table tennis." },

    // Action & Adventure Expanded
    { id: 'a47', title: 'Mob Psycho 100', type: 'anime', moods: ['Excited', 'Laugh'], genres: ['Action', 'Comedy'], language: 'Japanese', rating: 8.6, year: 2016, image: 'https://wallpaperaccess.com/full/767175.jpg', description: "A psychic middle schooler tries to live a normal life." },
    { id: 'a48', title: 'Black Clover', type: 'anime', moods: ['Excited'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 8.2, year: 2017, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "A boy born without magic aims to become the Wizard King." },
    { id: 'a49', title: 'Fire Force', type: 'anime', moods: ['Excited', 'Scared'], genres: ['Action', 'Supernatural'], language: 'Japanese', rating: 7.8, year: 2019, image: 'https://wallpaperaccess.com/full/226598.jpg', description: "Firefighters with pyrokinetic abilities fight spontaneous human combustion." },
    { id: 'a50', title: 'Dr. Stone', type: 'anime', moods: ['Excited', 'Mind-bending'], genres: ['Sci-Fi', 'Adventure'], language: 'Japanese', rating: 8.3, year: 2019, image: 'https://wallpaperaccess.com/full/180598.jpg', description: "A genius boy rebuilds civilization from scratch after humanity is petrified." },
    { id: 'a51', title: 'Vinland Saga', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Action', 'Historical'], language: 'Japanese', rating: 8.8, year: 2019, image: 'https://wallpaperaccess.com/full/1449179.jpg', description: "A young Viking seeks revenge for his father's death." },
    { id: 'a52', title: 'Made in Abyss', type: 'anime', moods: ['Scared', 'Emotional'], genres: ['Adventure', 'Fantasy'], language: 'Japanese', rating: 8.6, year: 2017, image: 'https://wallpaperaccess.com/full/428387.jpg', description: "Orphans explore a mysterious abyss filled with relics and creatures." },
    { id: 'a53', title: 'The Rising of the Shield Hero', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Fantasy', 'Action'], language: 'Japanese', rating: 8.0, year: 2019, image: 'https://wallpaperaccess.com/full/2040182.jpg', description: "A hero falsely accused of a crime rises to defend the kingdom." },
    { id: 'a54', title: 'Fate/Zero', type: 'anime', moods: ['Excited', 'Mind-bending'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 8.4, year: 2011, image: 'https://wallpaperaccess.com/full/8288591.jpg', description: "Seven mages summon heroic spirits to fight for the Holy Grail." },
    { id: 'a55', title: 'Fate/stay night: Unlimited Blade Works', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 8.0, year: 2014, image: 'https://wallpaperaccess.com/full/1539281.jpg', description: "The Holy Grail War continues with new twists." },

    // Comedy & Parody
    { id: 'a56', title: 'Gintama', type: 'anime', moods: ['Laugh', 'Excited'], genres: ['Comedy', 'Action'], language: 'Japanese', rating: 8.8, year: 2006, image: 'https://wallpaperaccess.com/full/2265261.jpg', description: "A samurai and his friends take on odd jobs in an alien-invaded Edo Japan." },
    { id: 'a57', title: 'The Disastrous Life of Saiki K.', type: 'anime', moods: ['Laugh', 'Chill'], genres: ['Comedy'], language: 'Japanese', rating: 8.5, year: 2016, image: 'https://wallpaperaccess.com/full/1264627.jpg', description: "A psychic high schooler tries to live a normal life." },
    { id: 'a58', title: 'Nichijou', type: 'anime', moods: ['Laugh', 'Chill'], genres: ['Comedy', 'Slice of Life'], language: 'Japanese', rating: 8.5, year: 2011, image: 'https://wallpaperaccess.com/full/5747372.jpg', description: "The everyday lives of high school students turn absurd." },
    { id: 'a59', title: 'Grand Blue', type: 'anime', moods: ['Laugh'], genres: ['Comedy'], language: 'Japanese', rating: 8.4, year: 2018, image: 'https://wallpaperaccess.com/full/6265005.jpg', description: "College diving club filled with drinking and chaos." },
    { id: 'a60', title: 'Hinamatsuri', type: 'anime', moods: ['Laugh', 'Emotional'], genres: ['Comedy', 'Sci-Fi'], language: 'Japanese', rating: 8.2, year: 2018, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "A yakuza member becomes the caretaker of a psychic girl." },

    // Modern Additions
    { id: 'a61', title: 'Bocchi the Rock!', type: 'anime', moods: ['Laugh', 'Chill'], genres: ['Comedy', 'Music'], language: 'Japanese', rating: 8.8, year: 2022, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "A socially anxious girl joins a band." },
    { id: 'a62', title: 'My Dress-Up Darling', type: 'anime', moods: ['Chill', 'Laugh'], genres: ['Romance', 'Comedy'], language: 'Japanese', rating: 8.2, year: 2022, image: 'https://wallpaperaccess.com/full/2146954.jpg', description: "A cosplayer and a doll maker bond over their hobbies." },
    { id: 'a63', title: 'Lycoris Recoil', type: 'anime', moods: ['Excited', 'Chill'], genres: ['Action'], language: 'Japanese', rating: 8.0, year: 2022, image: 'https://wallpaperaccess.com/full/134446.jpg', description: "Two secret agents maintain peace in a futuristic Japan." },
    { id: 'a64', title: 'Ranking of Kings', type: 'anime', moods: ['Emotional', 'Excited'], genres: ['Fantasy', 'Adventure'], language: 'Japanese', rating: 8.6, year: 2021, image: 'https://wallpaperaccess.com/full/767175.jpg', description: "A deaf and weak prince strives to become a great king." },
    { id: 'a65', title: 'Oshi no Ko', type: 'anime', moods: ['Mind-bending', 'Emotional'], genres: ['Drama', 'Mystery'], language: 'Japanese', rating: 8.6, year: 2023, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "A doctor and fan are reincarnated as an idol's children." }
    ,

    // ==================== MOVIES (Hollywood Blockbusters) ====================
    { id: 'm1', title: 'Inception', type: 'movie', moods: ['Mind-bending', 'Excited'], genres: ['Sci-Fi'], language: 'English', rating: 9.3, year: 2010, image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2000', description: "Dream thieves." },
    { id: 'm2', title: 'The Dark Knight', type: 'movie', moods: ['Excited', 'Mind-bending'], genres: ['Action'], language: 'English', rating: 9.8, year: 2008, image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?q=80&w=2000', description: "Batman vs Joker." },
    { id: 'm3', title: 'Interstellar', type: 'movie', moods: ['Mind-bending', 'Emotional'], genres: ['Sci-Fi'], language: 'English', rating: 9.2, year: 2014, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000', description: "Space travel to save Earth." },
    { id: 'm4', title: 'Avengers: Endgame', type: 'movie', moods: ['Excited', 'Emotional'], genres: ['Action'], language: 'English', rating: 8.4, year: 2019, image: 'https://wallpaperaccess.com/full/1345265.jpg', description: "The Avengers assemble one last time." },
    { id: 'm5', title: 'Spider-Man: Across the Spider-Verse', type: 'movie', moods: ['Excited', 'Mind-bending'], genres: ['Animation'], language: 'English', rating: 8.7, year: 2023, image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=2000', description: "Miles Morales catapults across the Multiverse." },
    { id: 'm6', title: 'Oppenheimer', type: 'movie', moods: ['Mind-bending', 'Scared'], genres: ['Biography', 'Drama'], language: 'English', rating: 8.5, year: 2023, image: 'https://wallpaperaccess.com/full/10710606.jpg', description: "The story of American scientist J. Robert Oppenheimer." },
    { id: 'm7', title: 'Barbie', type: 'movie', moods: ['Laugh', 'Chill'], genres: ['Comedy'], language: 'English', rating: 7.0, year: 2023, image: 'https://images.unsplash.com/photo-1596525737279-0523bb80ce35?q=80&w=2000', description: "Barbie suffers a crisis that leads her to question her world." },
    { id: 'm8', title: 'John Wick 4', type: 'movie', moods: ['Excited'], genres: ['Action'], language: 'English', rating: 7.8, year: 2023, image: 'https://wallpaperaccess.com/full/8844111.jpg', description: "John Wick uncovers a path to defeating The High Table." },
    { id: 'm9', title: 'Top Gun: Maverick', type: 'movie', moods: ['Excited', 'Emotional'], genres: ['Action'], language: 'English', rating: 8.3, year: 2022, image: 'https://wallpaperaccess.com/full/8028741.jpg', description: "Maverick returns to train a new generation of pilots." },
    { id: 'm10', title: 'The Matrix', type: 'movie', moods: ['Mind-bending', 'Excited'], genres: ['Sci-Fi'], language: 'English', rating: 8.7, year: 1999, image: 'https://wallpaperaccess.com/full/279895.jpg', description: "A computer hacker learns the truth about his reality." },

    // --- Bollywood / Regional Hits ---
    { id: 'm11', title: '3 Idiots', type: 'movie', moods: ['Laugh', 'Emotional'], genres: ['Comedy', 'Drama'], language: 'Hindi', rating: 9.5, year: 2009, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "All is well." },
    { id: 'm12', title: 'Dangal', type: 'movie', moods: ['Emotional', 'Excited'], genres: ['Biography', 'Sports'], language: 'Hindi', rating: 8.3, year: 2016, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "Wrestling biopic." },
    { id: 'm13', title: 'RRR', type: 'movie', moods: ['Excited', 'Emotional'], genres: ['Action'], language: 'Hindi', rating: 8.8, year: 2022, image: 'https://images.unsplash.com/photo-1623919420556-3c2242197471?q=80&w=2000', description: "Revolutionary bromance." },
    { id: 'm14', title: 'Sholay', type: 'movie', moods: ['Excited', 'Laugh'], genres: ['Action'], language: 'Hindi', rating: 9.3, year: 1975, image: 'https://images.unsplash.com/photo-1563198804-b144dfc80be0?q=80&w=2000', description: "Classic western." },
    { id: 'm15', title: 'Gully Boy', type: 'movie', moods: ['Emotional', 'Excited'], genres: ['Drama', 'Music'], language: 'Hindi', rating: 8.0, year: 2019, image: 'https://wallpaperaccess.com/full/1922987.jpg', description: "A coming-of-age story based on the lives of street rappers in Mumbai." },
    { id: 'm16', title: 'Train to Busan', type: 'movie', moods: ['Scared', 'Emotional', 'Excited'], genres: ['Horror', 'Action'], language: 'Korean', rating: 7.6, year: 2016, image: 'https://wallpaperaccess.com/full/1098463.jpg', description: "Zombies on a train." },
    { id: 'm17', title: 'Amélie', type: 'movie', moods: ['Chill', 'Laugh'], genres: ['Romance', 'Comedy'], language: 'French', rating: 8.3, year: 2001, image: 'https://wallpaperaccess.com/full/1539281.jpg', description: "An innocent and naive girl in Paris." },

    // ==================== SERIES (Netflix / Disney+ / Prime) ====================
    // Netflix
    { id: 's1', title: 'Stranger Things', type: 'series', moods: ['Scared', 'Excited'], genres: ['Sci-Fi'], language: 'English', rating: 8.7, year: 2016, image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2000', description: "Hawkins, Indiana." },
    { id: 's2', title: 'The Crown', type: 'series', moods: ['Chill', 'Emotional'], genres: ['Drama', 'History'], language: 'English', rating: 8.6, year: 2016, image: 'https://wallpaperaccess.com/full/2265261.jpg', description: "Follows the political rivalries and romance of Queen Elizabeth II's reign." },
    { id: 's3', title: 'Black Mirror', type: 'series', moods: ['Mind-bending', 'Scared'], genres: ['Sci-Fi', 'Anthology'], language: 'English', rating: 8.8, year: 2011, image: 'https://wallpaperaccess.com/full/1264627.jpg', description: "An anthology series exploring a twisted, high-tech multiverse." },
    { id: 's4', title: 'Money Heist', type: 'series', moods: ['Excited'], genres: ['Crime'], language: 'Spanish', rating: 8.6, year: 2017, image: 'https://images.unsplash.com/photo-1550100136-e074fa43d818?q=80&w=2000', description: "La Casa de Papel." },
    { id: 's5', title: 'Squid Game', type: 'series', moods: ['Scared', 'Excited'], genres: ['Thriller'], language: 'Korean', rating: 8.3, year: 2021, image: 'https://images.unsplash.com/photo-1632296434442-9993358327d5?q=80&w=2000', description: "Deadly kids games." },
    { id: 's6', title: 'Wednesday', type: 'series', moods: ['Laugh', 'Scared'], genres: ['Fantasy', 'Comedy'], language: 'English', rating: 8.1, year: 2022, image: 'https://wallpaperaccess.com/full/8288591.jpg', description: "Follows Wednesday Addams' years as a student." },
    { id: 's7', title: 'Reacher', type: 'series', moods: ['Excited'], genres: ['Action'], language: 'English', rating: 8.1, year: 2022, image: 'https://wallpaperaccess.com/full/8028741.jpg', description: "Jack Reacher was arrested for murder and now has to prove his innocence." },
    { id: 's8', title: 'The Witcher', type: 'series', moods: ['Excited', 'Mind-bending'], genres: ['Action', 'Fantasy'], language: 'English', rating: 8.0, year: 2019, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "Geralt of Rivia, a solitary monster hunter." },

    // Disney+ / HBO
    { id: 's9', title: 'The Mandalorian', type: 'series', moods: ['Excited', 'Chill'], genres: ['Sci-Fi'], language: 'English', rating: 8.7, year: 2019, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "Star Wars series." },
    { id: 's10', title: 'Loki', type: 'series', moods: ['Mind-bending', 'Laugh'], genres: ['Sci-Fi', 'Fantasy'], language: 'English', rating: 8.2, year: 2021, image: 'https://wallpaperaccess.com/full/6265005.jpg', description: "The mercurial villain Loki resumes his role as the God of Mischief." },
    { id: 's11', title: 'Game of Thrones', type: 'series', moods: ['Excited', 'Scared'], genres: ['Fantasy'], language: 'English', rating: 9.2, year: 2011, image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2000', description: "Winter is coming." },
    { id: 's12', title: 'The Last of Us', type: 'series', moods: ['Scared', 'Emotional'], genres: ['Drama', 'Horror'], language: 'English', rating: 8.8, year: 2023, image: 'https://wallpaperaccess.com/full/9628038.jpg', description: "A hardened survivor takes charge of a 14-year-old girl." },
    { id: 's13', title: 'Chernobyl', type: 'series', moods: ['Scared', 'Emotional'], genres: ['History', 'Drama'], language: 'English', rating: 9.4, year: 2019, image: 'https://wallpaperaccess.com/full/134446.jpg', description: "Dramatization of the true story of the Chernobyl nuclear catastrophe." },

    // Comedy / Sitcoms
    { id: 's14', title: 'Friends', type: 'series', moods: ['Laugh', 'Chill'], genres: ['Comedy'], language: 'English', rating: 8.9, year: 1994, image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000', description: "PIVOT!" },
    { id: 's15', title: 'The Office', type: 'series', moods: ['Laugh', 'Chill'], genres: ['Comedy'], language: 'English', rating: 9.0, year: 2005, image: 'https://images.unsplash.com/photo-1528605205643-2642a47dd54e?q=80&w=2000', description: "Bears, Beets, Battlestar Galactica." },
    { id: 's16', title: 'Brooklyn Nine-Nine', type: 'series', moods: ['Laugh', 'Excited'], genres: ['Comedy', 'Crime'], language: 'English', rating: 8.4, year: 2013, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "Comedy series following the exploits of Det. Jake Peralta." },
    { id: 's17', title: 'Ted Lasso', type: 'series', moods: ['Laugh', 'Emotional', 'Chill'], genres: ['Comedy', 'Sports'], language: 'English', rating: 8.8, year: 2020, image: 'https://wallpaperaccess.com/full/5747372.jpg', description: "American college football coach Ted Lasso heads to London." },

    // Indian Series
    { id: 's18', title: 'Sacred Games', type: 'series', moods: ['Excited', 'Mind-bending'], genres: ['Crime'], language: 'Hindi', rating: 8.5, year: 2018, image: 'https://images.unsplash.com/photo-1560169878-a2891d77186d?q=80&w=2000', description: "Mumbai gangster saga." },
    { id: 's19', title: 'Mirzapur', type: 'series', moods: ['Excited', 'Scared'], genres: ['Crime'], language: 'Hindi', rating: 8.5, year: 2018, image: 'https://images.unsplash.com/photo-1614136209598-f584f23b7b6c?q=80&w=2000', description: "Kaleen Bhaiya." },
    { id: 's20', title: 'The Family Man', type: 'series', moods: ['Excited', 'Laugh'], genres: ['Action', 'Comedy'], language: 'Hindi', rating: 8.8, year: 2019, image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2000', description: "Spy life balance." },
    { id: 's21', title: 'Kota Factory', type: 'series', moods: ['Chill', 'Emotional'], genres: ['Drama'], language: 'Hindi', rating: 9.0, year: 2019, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "IIT preparation struggles." },
    { id: 's22', title: 'Panchayat', type: 'series', moods: ['Laugh', 'Chill'], genres: ['Comedy'], language: 'Hindi', rating: 8.9, year: 2020, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "Village Politics." },
    { id: 's23', title: 'Scam 1992', type: 'series', moods: ['Mind-bending', 'Excited'], genres: ['Biography', 'Crime'], language: 'Hindi', rating: 9.3, year: 2020, image: 'https://wallpaperaccess.com/full/2666578.jpg', description: "The rise and fall of Harshad Mehta." },

    // ==================== ASIAN DRAMAS (KDrama / CDrama) ====================
    { id: 'k1', title: 'Crash Landing on You', type: 'kdrama', moods: ['Emotional', 'Excited'], genres: ['Romance', 'Comedy'], language: 'Korean', rating: 8.7, year: 2019, image: 'https://wallpaperaccess.com/full/2146954.jpg', description: "Paragliding mishap drops heiress into North Korea." },
    { id: 'k2', title: 'Itaewon Class', type: 'kdrama', moods: ['Excited', 'Emotional'], genres: ['Drama'], language: 'Korean', rating: 8.2, year: 2020, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "Ex-con opens bar to destroy tycoon." },
    { id: 'c2', title: 'Hidden Love', type: 'cdrama', moods: ['Emotional', 'Chill'], genres: ['Romance'], language: 'Chinese', rating: 8.6, year: 2023, image: 'https://wallpaperaccess.com/full/9628038.jpg', description: "Childhood crush blossoms into love." },

    // ==================== NEW ADDITIONS (Mega Pack) ====================
    // KDrama Hits
    { id: 'k3', title: 'Goblin', type: 'kdrama', moods: ['Emotional', 'Mind-bending'], genres: ['Romance', 'Fantasy'], language: 'Korean', rating: 8.6, year: 2016, image: 'https://wallpaperaccess.com/full/3655613.jpg', description: "A legendary goblin searches for his human bride." },
    { id: 'k4', title: 'Vincenzo', type: 'kdrama', moods: ['Excited', 'Laugh'], genres: ['Crime', 'Comedy'], language: 'Korean', rating: 8.5, year: 2021, image: 'https://wallpaperaccess.com/full/5747372.jpg', description: "Italian mafia lawyer returns to Korea." },
    { id: 'k5', title: 'All of Us Are Dead', type: 'kdrama', moods: ['Scared', 'Excited'], genres: ['Horror'], language: 'Korean', rating: 7.5, year: 2022, image: 'https://wallpaperaccess.com/full/767175.jpg', description: "Zombie outbreak at a high school." },
    { id: 'k6', title: 'Twenty Five Twenty One', type: 'kdrama', moods: ['Emotional', 'Chill'], genres: ['Romance'], language: 'Korean', rating: 8.7, year: 2022, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "A fencer and a sports reporter fall in love." },

    // CDrama Hits
    { id: 'c3', title: 'Love Between Fairy and Devil', type: 'cdrama', moods: ['Mind-bending', 'Emotional'], genres: ['Fantasy', 'Romance'], language: 'Chinese', rating: 8.8, year: 2022, image: 'https://wallpaperaccess.com/full/8028741.jpg', description: "A fairy accidentally revives a powerful demon lord." },
    { id: 'c4', title: 'Falling Into Your Smile', type: 'cdrama', moods: ['Laugh', 'Chill'], genres: ['Romance', 'Comedy'], language: 'Chinese', rating: 8.4, year: 2021, image: 'https://wallpaperaccess.com/full/2261765.jpg', description: "A female gamer joins an all-male e-sports team." },

    // Global Movies & Series
    { id: 'm18', title: 'Avatar: The Way of Water', type: 'movie', moods: ['Excited', 'Mind-bending'], genres: ['Sci-Fi', 'Adventure'], language: 'English', rating: 7.6, year: 2022, image: 'https://wallpaperaccess.com/full/8844111.jpg', description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora." },
    { id: 'm19', title: 'Dune: Part Two', type: 'movie', moods: ['Excited', 'Mind-bending'], genres: ['Sci-Fi', 'Adventure'], language: 'English', rating: 8.8, year: 2024, image: 'https://wallpaperaccess.com/full/10710606.jpg', description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge." },
    { id: 's24', title: 'Shogun', type: 'series', moods: ['Excited', 'Emotional'], genres: ['History', 'Drama'], language: 'English', rating: 9.1, year: 2024, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "English sailor shipwrecked in Japan." },
    { id: 's25', title: 'The Bear', type: 'series', moods: ['Emotional', 'Excited'], genres: ['Drama', 'Comedy'], language: 'English', rating: 8.6, year: 2022, image: 'https://wallpaperaccess.com/full/1539281.jpg', description: "A young chef returns to Chicago to run his family sandwich shop." },
    { id: 's26', title: 'Fallout', type: 'series', moods: ['Excited', 'Laugh'], genres: ['Sci-Fi', 'Action'], language: 'English', rating: 8.5, year: 2024, image: 'https://wallpaperaccess.com/full/134446.jpg', description: "In a future, post-apocalyptic Los Angeles, citizens must live in underground bunkers." },

    // Anime Hits
    // Anime Hits (Expanded)
    { id: 'a16', title: 'Chainsaw Man', type: 'anime', moods: ['Excited', 'Scared'], genres: ['Action', 'Horror'], language: 'Japanese', rating: 8.5, year: 2022, image: 'https://wallpaperaccess.com/full/1126752.jpg', description: "Denji is a teenage boy living with a Chainsaw Devil named Pochita." },
    { id: 'a17', title: 'Blue Lock', type: 'anime', moods: ['Excited'], genres: ['Sports'], language: 'Japanese', rating: 8.3, year: 2022, image: 'https://wallpaperaccess.com/full/180598.jpg', description: "Japan's national team needs an egoist striker." },
    { id: 'a18', title: 'Solo Leveling', type: 'anime', moods: ['Excited', 'Mind-bending'], genres: ['Action', 'Fantasy'], language: 'Japanese', rating: 8.4, year: 2024, image: 'https://wallpaperaccess.com/full/226598.jpg', description: "Weakest hunter becomes the strongest." },
    { id: 'a19', title: 'Frieren: Beyond Journey\'s End', type: 'anime', moods: ['Chill', 'Emotional'], genres: ['Fantasy', 'Adventure'], language: 'Japanese', rating: 9.1, year: 2023, image: 'https://wallpaperaccess.com/full/2040182.jpg', description: "Elven mage Frieren reflects on her life after the hero party defeat the Demon King." },
    { id: 'a20', title: 'Cyberpunk: Edgerunners', type: 'anime', moods: ['Excited', 'Emotional'], genres: ['Sci-Fi', 'Action'], language: 'Japanese', rating: 8.3, year: 2022, image: 'https://wallpaperaccess.com/full/8288591.jpg', description: "A street kid tries to survive in a technology and body modification-obsessed city of the future." },

    // Sci-Fi Classics
    { id: 'm20', title: 'Blade Runner 2049', type: 'movie', moods: ['Mind-bending', 'Chill'], genres: ['Sci-Fi'], language: 'English', rating: 8.0, year: 2017, image: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', description: "K discovers a long-buried secret." },
    { id: 'm21', title: '2001: A Space Odyssey', type: 'movie', moods: ['Mind-bending', 'Chill'], genres: ['Sci-Fi'], language: 'English', rating: 8.3, year: 1968, image: 'https://wallpaperaccess.com/full/1264627.jpg', description: "Evolution of mankind." },
    { id: 'm22', title: 'Her', type: 'movie', moods: ['Emotional', 'Chill'], genres: ['Romance', 'Sci-Fi'], language: 'English', rating: 8.0, year: 2013, image: 'https://wallpaperaccess.com/full/1569720.jpg', description: "A lonely writer develops an unlikely relationship with an operating system." },

    // More Series
    { id: 's27', title: 'Succession', type: 'series', moods: ['Excited', 'Laugh'], genres: ['Drama'], language: 'English', rating: 8.8, year: 2018, image: 'https://wallpaperaccess.com/full/2265261.jpg', description: "Power, politics, and money." },
    { id: 's28', title: 'Severance', type: 'series', moods: ['Mind-bending', 'Scared'], genres: ['Sci-Fi', 'Thriller'], language: 'English', rating: 8.7, year: 2022, image: 'https://wallpaperaccess.com/full/6265005.jpg', description: "Mark leads a team of office workers whose memories have been surgically divided." }
];
