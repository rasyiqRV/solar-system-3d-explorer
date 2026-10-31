// Data Astronomi Tata Surya dan Fakta Edukasi
const CELESTIAL_DATA = {
    sun: {
        id: "sun",
        name: "Matahari",
        type: "Bintang Deret Utama (Tipe Spektral G2V)",
        radiusKm: 696340,
        diameter: "1.392.700 km (109 kali diameter Bumi)",
        mass: "1,989 x 10^30 kg (333.000 kali massa Bumi, mencakup 99,86% massa seluruh Tata Surya)",
        surfaceTemp: "5.500 derajat Celsius (Inti: ~15.000.000 derajat Celsius)",
        gravity: "274 m/s2 (28 kali gravitasi Bumi)",
        composition: "73,46% Hidrogen, 24,85% Helium, 0,77% Oksigen, 0,29% Karbon, unsur lain",
        rotationPeriod: "25 hari di ekuator, hingga 35 hari di kutub (rotasi diferensial)",
        description: "Matahari adalah pusat Tata Surya dan sumber energi utama bagi kehidupan di Bumi. Energi matahari dihasilkan melalui proses fusi nuklir di intinya, di mana hidrogen diubah menjadi helium dengan melepaskan radiasi foton dalam jumlah raksasa.",
        facts: [
            "Cahaya dari Matahari membutuhkan waktu sekitar 8 menit 20 detik untuk mencapai Bumi.",
            "Setiap detik, Matahari mengubah sekitar 600 juta ton hidrogen menjadi helium melalui fusi nuklir.",
            "Medan magnet Matahari yang berputar memicu angin matahari (solar wind) yang membentang hingga batas heliosfer.",
            "Aktivitas bintik matahari (sunspots) mengikuti siklus magnetik sekitar 11 tahunan."
        ]
    },
    mercury: {
        id: "mercury",
        name: "Merkurius",
        type: "Planet Kebumian (Terestrial)",
        distanceFromSun: "57,9 juta km (0,39 SA)",
        diameter: "4.879 km (0,38 kali Bumi)",
        mass: "3,30 x 10^23 kg (0,055 massa Bumi)",
        orbitalPeriod: "88 hari Bumi",
        rotationPeriod: "58,6 hari Bumi",
        surfaceTemp: "-180 derajat Celsius (malam) hingga 430 derajat Celsius (siang)",
        gravity: "3,7 m/s2 (0,38 g)",
        atmosphere: "Sangat tipis (eksosfer) terdiri dari Oksigen, Natrium, Hidrogen, Helium, Kalium",
        moons: 0,
        description: "Merkurius adalah planet terkecil dan terdekat dengan Matahari. Tanpa atmosfer tebal untuk menahan panas, planet ini mengalami variasi suhu siang dan malam paling ekstrem di Tata Surya.",
        facts: [
            "Satu hari di Merkurius (dari matahari terbit ke terbit berikutnya) setara dengan 176 hari Bumi karena rotasi lambat dan orbit cepat.",
            "Kawah Caloris Basin di Merkurius berdiameter 1.550 km, salah satu kawah tubrukan terbesar di Tata Surya.",
            "Inti besi Merkurius sangat besar, mencakup sekitar 75% dari radius planet dan 85% volumenya.",
            "Meskipun dekat dengan Matahari, es abadi ditemukan di dasar kawah-kawah kutub yang berada dalam bayang-bayang permanen."
        ]
    },
    venus: {
        id: "venus",
        name: "Venus",
        type: "Planet Kebumian (Terestrial)",
        distanceFromSun: "108,2 juta km (0,72 SA)",
        diameter: "12.104 km (0,95 kali Bumi)",
        mass: "4,87 x 10^24 kg (0,815 massa Bumi)",
        orbitalPeriod: "224,7 hari Bumi",
        rotationPeriod: "243 hari Bumi (Retrograde / Terbalik)",
        surfaceTemp: "465 derajat Celsius (Planet terpanas di Tata Surya)",
        gravity: "8,87 m/s2 (0,90 g)",
        atmosphere: "96,5% Karbondioksida, 3,5% Nitrogen, awan asam sulfat tebal",
        moons: 0,
        description: "Venus sering disebut kembaran Bumi karena ukuran dan massanya yang mirip, namun kondisinya sangat beracun dan mematikan. Efek rumah kaca tak terkendali menjadikan permukaannya lebih panas dari timbal cair.",
        facts: [
            "Venus berputar berlawanan arah jarum jam (retrograde). Di Venus, Matahari terbit di barat dan terbenam di timur.",
            "Satu hari di Venus lebih panjang daripada satu tahunnya (rotasi 243 hari vs orbit 224,7 hari).",
            "Tekanan udara di permukaan Venus mencapai 92 bar, setara dengan berada 900 meter di bawah permukaan laut Bumi.",
            "Hujan asam sulfat turun di atmosfer atas Venus, tetapi menguap sebelum sempat menyentuh permukaan panasnya."
        ]
    },
    earth: {
        id: "earth",
        name: "Bumi",
        type: "Planet Kebumian (Terestrial)",
        distanceFromSun: "149,6 juta km (1,00 SA)",
        diameter: "12.742 km",
        mass: "5,97 x 10^24 kg",
        orbitalPeriod: "365,25 hari",
        rotationPeriod: "23 jam 56 menit 4 detik",
        surfaceTemp: "Rata-rata 15 derajat Celsius (-89 hingga 58 derajat Celsius)",
        gravity: "9,81 m/s2 (1,00 g)",
        atmosphere: "78,08% Nitrogen, 20,95% Oksigen, 0,93% Argon, 0,04% Karbondioksida",
        moons: 1,
        description: "Bumi adalah satu-satunya dunia yang diketahui menopang kehidupan dan satu-satunya planet yang memiliki air cair stabil di permukaannya. Medan magnet kuat melindungi atmosfer dari radiasi kosmik.",
        facts: [
            "Sekitar 71% permukaan Bumi tertutup oleh air, dengan lautan menampung 96,5% dari seluruh cadangan air.",
            "Kemiringan sumbu Bumi sebesar 23,5 derajat bertanggung jawab atas pergantian musim sepanjang tahun.",
            "Inti besi-nikel cair di lapisan luar menghasilkan medan geomagnetik melalui efek dinamo.",
            "Litosfer Bumi terpecah menjadi lempeng tektonik yang terus bergerak beberapa sentimeter per tahun."
        ]
    },
    moon: {
        id: "moon",
        name: "Bulan",
        type: "Satelit Alami Bumi",
        distanceFromEarth: "384.400 km (0,00257 SA)",
        diameter: "3.474 km (0,27 kali Bumi)",
        mass: "7,35 x 10^22 kg (0,0123 massa Bumi)",
        orbitalPeriod: "27,3 hari (Terkunci Gravitasi)",
        rotationPeriod: "27,3 hari (Rotasi Sinkron)",
        surfaceTemp: "-130 derajat Celsius (malam) hingga 120 derajat Celsius (siang)",
        gravity: "1,62 m/s2 (0,166 g)",
        atmosphere: "Nyaris hampa (eksosfer tipis)",
        moons: 0,
        description: "Bulan adalah satelit alami terbesar kelima di Tata Surya. Tarikan gravitasinya menstabilkan kemiringan sumbu rotasi Bumi dan mengatur pasang surut air laut global.",
        facts: [
            "Karena penguncian pasang surut (tidal locking), sisi yang sama dari Bulan selalu menghadap ke Bumi.",
            "Bulan diperkirakan terbentuk dari serpihan tubrukan proto-planet seukuran Mars bernama Theia dengan proto-Bumi 4,5 miliar tahun lalu.",
            "Jejak kaki para astronot Apollo di regolit Bulan dapat bertahan jutaan tahun karena ketiadaan angin dan erosi atmosfer.",
            "Bulan menjauh dari Bumi dengan laju sekitar 3,8 sentimeter setiap tahun."
        ]
    },
    mars: {
        id: "mars",
        name: "Mars",
        type: "Planet Kebumian (Terestrial)",
        distanceFromSun: "227,9 juta km (1,52 SA)",
        diameter: "6.779 km (0,53 kali Bumi)",
        mass: "6,42 x 10^23 kg (0,107 massa Bumi)",
        orbitalPeriod: "687 hari Bumi",
        rotationPeriod: "24 jam 37 menit (hampir sama dengan Bumi)",
        surfaceTemp: "Rata-rata -63 derajat Celsius (-140 hingga 20 derajat Celsius)",
        gravity: "3,72 m/s2 (0,38 g)",
        atmosphere: "95,3% Karbondioksida, 2,6% Nitrogen, 1,9% Argon",
        moons: 2,
        description: "Mars dikenal sebagai Planet Merah karena kandungan besi oksida (karat) melimpah di permukaannya. Mars memiliki gunung berapi terbesar dan ngarai terdalam di seluruh Tata Surya.",
        facts: [
            "Olympus Mons adalah gunung berapi perisai tertinggi di Tata Surya dengan ketinggian 21,9 km, hampir tiga kali tinggi Gunung Everest.",
            "Valles Marineris adalah sistem ngarai raksasa sepanjang 4.000 km dan sedalam 7 km, membentang selebar benua Amerika Serikat.",
            "Dua satelit kecil Mars bernama Phobos dan Deimos kemungkinan merupakan asteroid yang tertangkap gravitasi.",
            "Bukti geologis menunjukkan bahwa miliaran tahun lalu Mars memiliki sungai, danau, dan lautan air cair purba."
        ]
    },
    asteroidBelt: {
        id: "asteroidBelt",
        name: "Sabuk Asteroid Utama",
        type: "Zona Puing Sisa Pembentukan Planet",
        distanceFromSun: "329 - 478 juta km (2,2 - 3,2 SA)",
        diameter: "Membentang selebar 150 juta km",
        mass: "Sekitar 4% dari massa Bulan Bumi",
        surfaceTemp: "-73 hingga -108 derajat Celsius",
        gravity: "Bervariasi per objek (Ceres: 0,28 m/s2)",
        composition: "Batuan silikat, nikel-besi, dan senyawa karbon",
        majorObjects: "Ceres (planet katai), Vesta, Pallas, Hygiea",
        description: "Sabuk asteroid terletak di antara orbit Mars dan Jupiter. Wilayah ini berisi jutaan pecahan batuan dan logam sisa masa awal Tata Surya yang gagal menyatu menjadi planet akibat gangguan gravitasi masif Jupiter.",
        facts: [
            "Ceres adalah objek terbesar di sabuk asteroid dan diklasifikasikan sebagai planet katai dengan diameter sekitar 940 km.",
            "Jarak rata-rata antar asteroid di sabuk asteroid sangat renggang (sekitar 1 juta km), bukan padat seperti di film fiksi ilmiah.",
            "Sekitar setengah dari total massa seluruh sabuk asteroid terkonsentrasi hanya pada empat objek terbesar: Ceres, Vesta, Pallas, dan Hygiea.",
            "Wahana antariksa seperti Voyager, Cassini, dan New Horizons dapat melintasinya dengan aman tanpa risiko tabrakan berarti."
        ]
    },
    jupiter: {
        id: "jupiter",
        name: "Yupiter",
        type: "Raksasa Gas (Gas Giant)",
        distanceFromSun: "778,5 juta km (5,20 SA)",
        diameter: "139.820 km (11 kali diameter Bumi)",
        mass: "1,90 x 10^27 kg (318 kali massa Bumi, 2,5 kali gabungan seluruh planet lain)",
        orbitalPeriod: "11,86 tahun Bumi",
        rotationPeriod: "9 jam 55 menit (rotasi tercepat dari semua planet)",
        surfaceTemp: "-110 derajat Celsius pada puncak awan",
        gravity: "24,79 m/s2 (2,53 g)",
        atmosphere: "89,8% Hidrogen, 10,2% Helium, jejak Metana dan Amonia",
        moons: 95,
        description: "Yupiter adalah planet terbesar di Tata Surya. Tidak memiliki permukaan padat sejati, melainkan atmosfer gas tebal yang secara bertahap bertransisi menjadi hidrogen cair dan hidrogen metalik bertekanan luar biasa.",
        facts: [
            "Bintik Merah Raksasa (Great Red Spot) adalah badai antisiklon raksasa yang telah bergejolak selama lebih dari 350 tahun dan berukuran lebih besar dari Bumi.",
            "Yupiter memiliki empat satelit Galilea utama: Io (vulkanik aktif), Europa (samudra bawah es), Ganymede (satelit terbesar di Tata Surya), dan Callisto.",
            "Medan magnet Yupiter 20.000 kali lebih kuat dari medan magnet Bumi dan menghasilkan sabuk radiasi mematikan.",
            "Rotasi cepat Yupiter menyebabkan bentuknya pepat di kutub dan menggembung di ekuator."
        ]
    },
    saturn: {
        id: "saturn",
        name: "Saturnus",
        type: "Raksasa Gas (Gas Giant)",
        distanceFromSun: "1,43 miliar km (9,58 SA)",
        diameter: "116.460 km (9,4 kali diameter Bumi)",
        mass: "5,68 x 10^26 kg (95 kali massa Bumi)",
        orbitalPeriod: "29,45 tahun Bumi",
        rotationPeriod: "10 jam 33 menit",
        surfaceTemp: "-140 derajat Celsius pada puncak awan",
        gravity: "10,44 m/s2 (1,06 g)",
        atmosphere: "96,3% Hidrogen, 3,25% Helium, jejak Metana",
        moons: 146,
        description: "Saturnus terkenal dengan sistem cincin spektakuler yang paling luas dan mencolok di Tata Surya. Planet ini memiliki kerapatan rata-rata paling rendah; bahkan lebih ringan daripada air.",
        facts: [
            "Cincin Saturnus membentang hingga 282.000 km dari planet, tetapi rata-rata tebalnya hanya sekitar 10 hingga 100 meter.",
            "Materi cincin terdiri dari 99% pecahan es air murni dengan ukuran mulai dari butiran debu mikro hingga bongkahan seukuran rumah.",
            "Titan, satelit terbesar Saturnus, adalah satu-satunya satelit dengan atmosfer tebal dan danau hidrokarbon cair (metana dan etana).",
            "Di kutub utara Saturnus terdapat formasi awan badai berbentuk heksagonal misterius yang stabil selama puluhan tahun."
        ]
    },
    uranus: {
        id: "uranus",
        name: "Uranus",
        type: "Raksasa Es (Ice Giant)",
        distanceFromSun: "2,87 miliar km (19,2 SA)",
        diameter: "50.724 km (4 kali diameter Bumi)",
        mass: "8,68 x 10^25 kg (14,5 kali massa Bumi)",
        orbitalPeriod: "84 tahun Bumi",
        rotationPeriod: "17 jam 14 menit (Rotasi Retrograde)",
        surfaceTemp: "-195 hingga -224 derajat Celsius (Atmosfer terdingin)",
        gravity: "8,69 m/s2 (0,89 g)",
        atmosphere: "82,5% Hidrogen, 15,2% Helium, 2,3% Metana (memberi warna biru kehijauan)",
        moons: 28,
        description: "Uranus adalah raksasa es yang berotasi pada sisinya dengan kemiringan ekstrem 97,77 derajat. Gas metana di atmosfernya menyerap cahaya merah dan memantulkan rona biru-cyan khas.",
        facts: [
            "Karena kemiringan sumbunya yang ekstrem, kutub Uranus menghadap hampir langsung ke Matahari, menyebabkan siklus siang dan malam masing-masing selama 42 tahun Bumi.",
            "Uranus memancarkan sangat sedikit panas internal dibanding raksasa gas lainnya, menjadikannya planet dengan atmosfer terdingin di Tata Surya.",
            "Uranus memiliki 13 cincin redup dan sempit yang sebagian besar terdiri dari partikel gelap berukuran sentimeter hingga meter.",
            "Satelit Miranda di orbit Uranus memiliki tebing curam Verona Rupes setinggi 20 km, tebing tegak tertinggi yang diketahui di Tata Surya."
        ]
    },
    neptune: {
        id: "neptune",
        name: "Neptunus",
        type: "Raksasa Es (Ice Giant)",
        distanceFromSun: "4,50 miliar km (30,1 SA)",
        diameter: "49.244 km (3,9 kali diameter Bumi)",
        mass: "1,02 x 10^26 kg (17,1 kali massa Bumi)",
        orbitalPeriod: "164,8 tahun Bumi",
        rotationPeriod: "16 jam 6 menit",
        surfaceTemp: "-200 derajat Celsius",
        gravity: "11,15 m/s2 (1,14 g)",
        atmosphere: "80% Hidrogen, 19% Helium, 1,5% Metana",
        moons: 16,
        description: "Neptunus adalah planet terjauh dari Matahari di Tata Surya kita. Planet biru pekat ini memiliki angin supersonik tercepat di Tata Surya, mencapai kecepatan lebih dari 2.100 km/jam.",
        facts: [
            "Neptunus adalah satu-satunya planet di Tata Surya yang ditemukan melalui prediksi perhitungan matematika sebelum diamati secara visual pada tahun 1846.",
            "Triton, satelit terbesar Neptunus, mengorbit dengan arah berlawanan (retrograde) dan memiliki geyser nitrogen cair aktif yang menyembur ke luar angkasa.",
            "Neptunus membutuhkan waktu hampir 165 tahun Bumi untuk menyelesaikan satu putaran orbit penuh mengelilingi Matahari.",
            "Tekanan dan suhu ekstrem di mantel dalam Neptunus diduga mampu memampatkan metana menjadi kristal berlian padat yang menghujani intinya."
        ]
    }
};

// Misi Penjelajahan Terpandu
const EXPLORATION_MISSIONS = [
    {
        id: 1,
        title: "Pusat Energi Tata Surya",
        target: "sun",
        scanDistance: 350,
        objective: "Terbangkan pesawat menuju Matahari hingga jarak aman dan lakukan pemindaian radiasi korona.",
        reward: "Data Radiasi Bintang",
        completed: false
    },
    {
        id: 2,
        title: "Dunia Terdekat yang Membara",
        target: "mercury",
        scanDistance: 120,
        objective: "Dekati planet Merkurius untuk memindai kawah Caloris Basin dan mengukur variasi suhu ekstrem.",
        reward: "Peta Topografi Merkurius",
        completed: false
    },
    {
        id: 3,
        title: "Tungku Asam Venus",
        target: "venus",
        scanDistance: 140,
        objective: "Lakukan penerbangan orbit dekat di atas awan asam sulfat tebal Venus dan teliti efek rumah kaca.",
        reward: "Data Atmosfer Ekstrem",
        completed: false
    },
    {
        id: 4,
        title: "Satu-Satunya Rumah Kehidupan",
        target: "earth",
        scanDistance: 150,
        objective: "Kunjungi planet Bumi untuk memindai hidrosfer dan medan magnet pelindung biosfer.",
        reward: "Analisis Biosfer Stabil",
        completed: false
    },
    {
        id: 5,
        title: "Satelit Penjaga Bumi",
        target: "moon",
        scanDistance: 80,
        objective: "Dekati Bulan untuk memindai kawah tubrukan purba dan fenomena penguncian pasang surut.",
        reward: "Sampel Regolit Bulan",
        completed: false
    },
    {
        id: 6,
        title: "Lembah Karat Planet Merah",
        target: "mars",
        scanDistance: 130,
        objective: "Lintasi orbit Mars dan amati gunung tertinggi Olympus Mons serta palung raksasa Valles Marineris.",
        reward: "Spektrometri Besi Oksida",
        completed: false
    },
    {
        id: 7,
        title: "Puing Sisa Pembentukan Planet",
        target: "asteroidBelt",
        scanDistance: 200,
        objective: "Arahkan kapal melintasi Sabuk Asteroid di antara orbit Mars dan Yupiter, pindai komposisi batuan silikat.",
        reward: "Katalog Mineral Asteroid",
        completed: false
    },
    {
        id: 8,
        title: "Raja Gravitasi Tata Surya",
        target: "jupiter",
        scanDistance: 260,
        objective: "Jelajahi medan magnetik dahsyat Yupiter dan lakukan pemindaian mendalam pada Bintik Merah Raksasa.",
        reward: "Telemetri Badai Antisiklon",
        completed: false
    },
    {
        id: 9,
        title: "Mahkota Cincin Es Megah",
        target: "saturn",
        scanDistance: 240,
        objective: "Terbangkan pesawat melintas di atas piringan cincin es Saturnus dan rekam struktur partikel es murninya.",
        reward: "Analisis Kristalografi Cincin",
        completed: false
    },
    {
        id: 10,
        title: "Raksasa Es yang Terbalik",
        target: "uranus",
        scanDistance: 160,
        objective: "Telusuri atmosfer metana dingin Uranus dan pelajari alasan sumbu rotasinya yang miring rebah.",
        reward: "Diagram Kemiringan Sumbu",
        completed: false
    },
    {
        id: 11,
        title: "Badai Supersonik Terluar",
        target: "neptune",
        scanDistance: 160,
        objective: "Capai batas terluar orbit planet dan rekam kecepatan angin supersonik ekstrem di atmosfer Neptunus.",
        reward: "Lencana Penjelajah Tata Surya Penuh",
        completed: false
    }
];

// Soal Kuis Interaktif Edukasi Astronomi
const ASTRONOMY_QUIZ = [
    {
        question: "Berapa lama waktu yang dibutuhkan cahaya dari Matahari untuk tiba di permukaan Bumi?",
        options: [
            "Sekitar 8 menit 20 detik",
            "Sekitar 1 detik",
            "Sekitar 1 jam",
            "Sekitar 24 jam"
        ],
        correct: 0,
        explanation: "Dengan kecepatan cahaya sekitar 300.000 km/detik dan jarak rata-rata Bumi-Matahari 149,6 juta km, foton membutuhkan waktu kurang lebih 8 menit 20 detik."
    },
    {
        question: "Mengapa Venus adalah planet terpanas di Tata Surya, meskipun posisinya tidak paling dekat ke Matahari?",
        options: [
            "Karena inti logamnya terus membelah secara radioaktif",
            "Karena efek rumah kaca tak terkendali dari atmosfer tebal CO2",
            "Karena terus menerus dihantam badai meteorit aktif",
            "Karena Venus tidak memiliki kutub dingin"
        ],
        correct: 1,
        explanation: "Atmosfer Venus mengandung 96,5% karbondioksida dengan tekanan 92 kali Bumi, menjebak panas inframerah hingga suhu permukaan mencapai 465 derajat Celsius."
    },
    {
        question: "Gunung tertinggi di seluruh Tata Surya yang berada di Mars bernama:",
        options: [
            "Mauna Kea",
            "Verona Rupes",
            "Olympus Mons",
            "Caloris Mons"
        ],
        correct: 2,
        explanation: "Olympus Mons adalah gunung berapi perisai raksasa di Mars dengan ketinggian hampir 22 kilometer di atas datum rata-rata permukaan Mars."
    },
    {
        question: "Apa komposisi utama dari cincin spektakuler planet Saturnus?",
        options: [
            "Batu besi padat seberat jutaan ton",
            "99% pecahan es air murni berbagai ukuran",
            "Awan gas hidrogen dan amonia yang membeku",
            "Debu intan mikro yang berpendar"
        ],
        correct: 1,
        explanation: "Cincin Saturnus terdiri dari miliaran partikel es air dengan ukuran dari butiran debu mikro hingga bongkahan seukuran bangunan."
    },
    {
        question: "Planet manakah yang sumbu rotasinya sangat miring (97,8 derajat) hingga tampak menggelinding di orbitnya?",
        options: [
            "Neptunus",
            "Merkurius",
            "Uranus",
            "Mars"
        ],
        correct: 2,
        explanation: "Uranus memiliki kemiringan sumbu ekstrem 97,77 derajat, diduga akibat tabrakan masif dengan protoplanet seukuran Bumi pada masa awal Tata Surya."
    },
    {
        question: "Planet apakah yang keberadaannya pertama kali diprediksi secara matematis sebelum diobservasi melalui teleskop?",
        options: [
            "Neptunus",
            "Yupiter",
            "Saturnus",
            "Venus"
        ],
        correct: 0,
        explanation: "Neptunus ditemukan pada September 1846 setelah para astronom menghitung anomali gravitasi yang mengganggu lintasan orbit Uranus."
    },
    {
        question: "Fenomena apa yang menyebabkan satu sisi Bulan selalu menghadap ke Bumi?",
        options: [
            "Efek Coriolis atmosfer Bumi",
            "Penguncian Pasang Surut (Tidal Locking)",
            "Medan magnet kuat di inti Bulan",
            "Tarikan gravitasi Matahari yang berlawanan"
        ],
        correct: 1,
        explanation: "Interaksi pasang surut gravitasi Bumi selama miliaran tahun menyamakan periode rotasi Bulan pada porosnya dengan periode revolusi orbitnya mengelilingi Bumi."
    },
    {
        question: "Di manakah lokasi Sabuk Asteroid Utama berada?",
        options: [
            "Di antara Merkurius dan Venus",
            "Di antara Bumi dan Mars",
            "Di antara Mars dan Yupiter",
            "Di luar orbit Neptunus"
        ],
        correct: 2,
        explanation: "Sabuk Asteroid Utama membentang antara orbit Mars dan Yupiter (jarak 2,2 hingga 3,2 Satuan Astronomi dari Matahari)."
    }
];
