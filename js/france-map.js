/**
 * Interactive France Regional Map for Fête de la Musique
 * Contains official geographic SVG paths for all 13 metropolitan French regions,
 * vibrant colors, deep regional traditions, iconic venues, gastronomy, folklore anecdotes, and sound preview notes.
 */

const franceRegionsData = {
  "ile-de-france": {
    nameFr: "Île-de-France (Paris & Métropole)",
    nameEn: "Île-de-France (Paris & Metro Region)",
    capital: "Paris",
    badgeColor: "#FF5E7E",
    soundNote: "C4",
    musicStyleFr: "Valse Musette des bords de Seine, Chanson Réaliste de Montmartre, Jazz de Saint-Germain-des-Prés, et la mythique French Touch Électronique.",
    musicStyleEn: "Musette Waltz along the Seine, Montmartre French Chanson, Saint-Germain Jazz, and the world-renowned French Touch Electronic groove.",
    historyFr: "Berceau officiel de la Fête de la Musique le 21 juin 1982 sous l'égide de Jack Lang et Maurice Fleuret. C'est ici qu'Édith Piaf chantait dans les cours d'immeubles de Ménilmontant, que Django Reinhardt enflammait la Porte de Clignancourt et que Daft Punk, Air et Bob Sinclar ont révolutionné la musique électronique mondiale.",
    historyEn: "The official birthplace of the Fête de la Musique on June 21, 1982 under Minister Jack Lang and Maurice Fleuret. Here Édith Piaf sang in working-class Belleville courtyards, Django Reinhardt electrified swing clubs, and Daft Punk, Air, and Bob Sinclar sparked the global French Touch revolution.",
    june21TraditionFr: "Plus de 35 000 concerts gratuits spontanés envahissent les rues de midi jusqu'à l'aube. Les cours d'honneur des ministères, le Palais-Royal, l'Hôtel de Ville et la Pyramide du Louvre ouvrent leurs portes à des orchestres philharmoniques en plein air, tandis que les quais de la Seine et le canal Saint-Martin se transforment en pistes de danse géantes.",
    june21TraditionEn: "Over 35,000 spontaneous free gigs fill Paris sidewalks from noon until dawn. Courtyards of national ministries, the Palais-Royal, City Hall, and the Louvre Pyramid host majestic open-air symphonic orchestras, while the quays of the Seine and Canal Saint-Martin become open-air techno and acoustic jam parties.",
    venuesFr: "Marches du Sacré-Cœur à Montmartre, Berges de Seine (Pont des Arts), Canal Saint-Martin, Place de la République, et cour d'honneur du Palais-Royal.",
    venuesEn: "Steps of Sacré-Cœur in Montmartre, Seine Riverbanks at Pont des Arts, Canal Saint-Martin, Place de la République, and Palais-Royal courtyard.",
    gastronomyFr: "L'incontournable baguette tradition garnie de merguez grillées et sauce moutarde forte de Dijon, frites dorées sur le pouce, crêpes au caramel au beurre salé et planches de fromages partagées sur les tables de bistrots jusqu'au petit matin.",
    gastronomyEn: "The legendary street baguette stuffed with spicy grilled merguez sausages and Dijon mustard, hot golden fries, caramel crêpes, and hearty charcuterie cheese boards shared at crowded sidewalk bistro tables until dawn.",
    anecdoteFr: "Le 21 juin 1982, le compositeur Maurice Fleuret était si anxieux qu'à 17h, voyant les rues calmes, il crut à un échec cuisant. À 20h30, plus de 300 000 musiciens amateurs avaient submergé les trottoirs de Paris, créant le plus grand rassemblement musical spontané de l'histoire !",
    anecdoteEn: "On June 21, 1982, cultural director Maurice Fleuret was so terrified by quiet streets at 5 PM that he thought his career was ruined. By 8:30 PM, over 300,000 everyday musicians poured onto Paris avenues, sparking the largest spontaneous public celebration in French history!",
    instrumentsFr: "Accordéon chromatique, saxophone soprano, synthétiseur analogique vintage, guitare manouche.",
    instrumentsEn: "Chromatic accordion, soprano saxophone, vintage analog synthesizer, gypsy swing guitar."
  },
  "bretagne": {
    nameFr: "Bretagne (Brittany)",
    nameEn: "Brittany",
    capital: "Rennes / Brest",
    badgeColor: "#3A86FF",
    soundNote: "G4",
    musicStyleFr: "Fest-Noz traditionnel, Rock Celtique énergique, Musique Bretonne de bagadoù & chants de marins polyphoniques.",
    musicStyleEn: "Traditional Fest-Noz round dances, high-energy Celtic Rock, Bagadoù pipe bands & maritime sea shanties.",
    historyFr: "Terre de légendes celtiques et berceau d'Alan Stivell, Tri Yann et Dan Ar Braz. La musique bretonne a réussi à préserver une tradition orale pluriséculaire tout en l'associant magistralement aux guitares électriques et aux synthétiseurs modernes.",
    historyEn: "Ancient Celtic territory and home of Alan Stivell, Tri Yann, and Dan Ar Braz. Breton musical culture has preserved centuries of oral traditions while fusing them brilliantly with roaring electric guitars and modern synths.",
    june21TraditionFr: "Les sonneurs de binious et de bombardes mènent d'immenses rondes Fest-Noz (notamment l'An-Dro et la Gavotte) où des milliers de festivaliers se lient par le petit doigt. Sur les quais de granit de Saint-Malo et de Brest, les chants de marins résonnent au-dessus de l'océan Atlantique.",
    june21TraditionEn: "Pipers with binious and bombardes lead massive Fest-Noz circle dances (such as An-Dro and Gavotte) where thousands of partygoers link pinky fingers and swirl in unison. Along granite quays in Saint-Malo and Brest, sea shanties soar over the ocean breeze.",
    venuesFr: "Place de la Mairie à Rennes, Remparts de Saint-Malo, Port de Brest (Le Moulin Blanc), et Place Saint-Corentin à Quimper.",
    venuesEn: "City Hall Plaza in Rennes, Historic Granite Ramparts of Saint-Malo, Port of Brest marina, and Saint-Corentin Plaza in Quimper.",
    gastronomyFr: "La véritable Galette-Saucisse chaude enveloppée dans sa galette de sarrasin au beurre demi-sel, crêpe au sucre croquante, Kouign-Amann doré et bolées de cidre fermier brut bien frais.",
    gastronomyEn: "Authentic hot Galette-Saucisse (grilled pork sausage rolled in crispy buckwheat crepe), salted butter Kouign-Amann pastry, and cold bowls of bubbly Breton artisanal farm cider.",
    anecdoteFr: "En Bretagne, il est coutume que le plus jeune sonneur de cornemuse ouvre la danse sur le parvis dès 18h précises. Le Fest-Noz breton est tellement unique et fraternel qu'il est classé au Patrimoine Culturel Immatériel de l'UNESCO !",
    anecdoteEn: "In Brittany, tradition dictates that the youngest bagpiper opens the celebration at 6:00 PM sharp. The Breton Fest-Noz is celebrated with such communal joy that it is officially inscribed on UNESCO's Intangible Cultural Heritage list!",
    instrumentsFr: "Biniou coz, bombarde à anche double, harpe celtique, accordéon diatonique.",
    instrumentsEn: "Biniou bagpipe, double-reed bombarde horn, Celtic harp, diatonic accordion."
  },
  "paca": {
    nameFr: "Provence-Alpes-Côte d'Azur",
    nameEn: "Provence-Alps-French Riviera",
    capital: "Marseille / Nice / Toulon",
    badgeColor: "#FF006E",
    soundNote: "A4",
    musicStyleFr: "Rap Marseillais engagé, Jazz méditerranéen ensoleillé, Galoubet-tambourin provençal, Reggae occitan et Salsa côtière.",
    musicStyleEn: "Conscious Marseille Hip-Hop, Sun-drenched Mediterranean Jazz, Provençal pipe & tabor, Occitan Reggae, and Coastal Salsa.",
    historyFr: "Capitale légendaire du hip-hop français avec des groupes mythiques comme IAM et la Fonky Family. C'est également la terre d'inspiration de Fernandel, Gilbert Bécaud et des festivals de jazz historiques de Juan-les-Pins et Nice.",
    historyEn: "Legendary powerhouse of French hip-hop, birthing pioneer groups like IAM and Fonky Family. It is also the historic playground of classic stars like Fernandel, Gilbert Bécaud, and the world's oldest European jazz festivals in Nice and Antibes.",
    june21TraditionFr: "Le Vieux-Port de Marseille et la Promenade des Anglais à Nice se transforment en scènes à ciel ouvert face aux reflets turquoise de la Méditerranée. Les ruelles pentues du Panier et de la Vieille Ville vibrent au rythme des guitares acoustiques, percussions cajón et sonos hip-hop.",
    june21TraditionEn: "Marseille's historic Old Port and Nice's Promenade des Anglais become colossal open-air amphitheaters facing the azure Mediterranean. Stone alleyways in the historic Panier district pulse to acoustic flamenco, batucada drums, and hip-hop block parties.",
    venuesFr: "Vieux-Port de Marseille (devant l'Ombrière), Promenade des Anglais à Nice, Cours Mirabeau à Aix-en-Provence, et Palais des Papes à Avignon.",
    venuesEn: "Old Port of Marseille (under the Mirror Canopy), Promenade des Anglais in Nice, Cours Mirabeau in Aix, and Palais des Papes plaza in Avignon.",
    gastronomyFr: "Socca niçoise brûlante au poivre noir cuite au feu de bois, pissaladière aux oignons fondants et anchois, pan bagnat frais et navettes croustillantes à la fleur d'oranger.",
    gastronomyEn: "Piping hot wood-fired crispy chickpea Socca flatbread with cracked black pepper, caramelized onion Pissaladière, juicy Pan Bagnat, and orange-blossom Navette biscuits.",
    anecdoteFr: "À Marseille, une tradition veut que les pêcheurs du Vieux-Port klaxonnent tous ensemble à la tombée de la nuit en faisant résonner les sirènes de leurs bateaux au tempo des percussions de rue !",
    anecdoteEn: "In Marseille, fishermen in the Old Port have a beloved tradition of sounding all their boat horns in unison at twilight, matching the heavy rhythm of street batucada drummers!",
    instrumentsFr: "Galoubet (flûte à 3 trous) et tambourin provençal, guitare flamenca, cajón, platines vinyles.",
    instrumentsEn: "Galoubet (3-hole flute) and long tabor drum, nylon flamenco guitar, cajón, turntable decks."
  },
  "auvergne-rhone-alpes": {
    nameFr: "Auvergne-Rhône-Alpes",
    nameEn: "Auvergne-Rhône-Alps",
    capital: "Lyon / Grenoble / Clermont-Ferrand",
    badgeColor: "#8338EC",
    soundNote: "E4",
    musicStyleFr: "Électro Nuits Sonores, Vielle à roue auvergnate et bourrée traditionnelle, Rock indépendant et fanfares alpines cuivrées.",
    musicStyleEn: "Cutting-edge Nuits Sonores electronic beats, traditional Hurdy-Gurdy folk, indie rock, and Alpine brass fanfares.",
    historyFr: "Berceau de Jean-Michel Jarre, pionnier mondial de la musique électronique et des concerts lasers géants. Région également célèbre pour le festival Nuits Sonores à Lyon et le dynamisme rock de Clermont-Ferrand.",
    historyEn: "Birthplace of Jean-Michel Jarre, global forefather of synth electronic music and laser spectacles. Home to Lyon's renowned Nuits Sonores festival and Clermont-Ferrand's vibrant indie rock scene.",
    june21TraditionFr: "À Lyon, la fête s'étend sur les berges du Rhône et de la Saône, ainsi que sur les pentes bohèmes de la Croix-Rousse. Des concerts intimistes a cappella et jazz prennent place à l'intérieur des traboules secrètes Renaissance et sur la scène millénaire des théâtres romains de Fourvière.",
    june21TraditionEn: "In Lyon, celebrations line both banks of the Rhône and Saône rivers, spilling onto the artistic slopes of Croix-Rousse. Intimate acoustic recitals nestle inside secret Renaissance traboule passageways and atop Fourvière's 2,000-year-old Roman amphitheaters.",
    venuesFr: "Berges du Rhône (Fosse aux Ours) à Lyon, Place Bellecour, Théâtres Romains de Fourvière, et Place de Jaude à Clermont-Ferrand.",
    venuesEn: "Rhône Riverbanks in Lyon, Place Bellecour, Fourvière Roman Theaters, and Place de Jaude in Clermont-Ferrand.",
    gastronomyFr: "Brioche tiède à la praline rose concassée de Lyon, truffade crémeuse aux pommes de terre et tome fraîche du Cantal, saucisson sec de montagne et tarte aux myrtilles des Alpes.",
    gastronomyEn: "Warm pink sugar Praline brioche from Lyon, comforting potato and melted Cantal cheese Truffade, cured Alpine saucisson, and wild mountain blueberry tart.",
    anecdoteFr: "Dans les traboules du Vieux-Lyon, l'acoustique est si pure que de nombreux chanteurs lyriques et violoncellistes y jouent dans la pénombre, attirant des spectateurs guidés uniquement par le son !",
    anecdoteEn: "Inside Old Lyon's stone traboules, acoustics are so crystal-clear that classical cellists and opera singers perform in candlelight, guiding listeners purely by echoing harmony!",
    instrumentsFr: "Vielle à roue polyphonique, cor des Alpes en bois, accordéon chromatique, synthétiseurs modulaires.",
    instrumentsEn: "Polyphonic Hurdy-gurdy, Alpine wooden horn, chromatic accordion, modular synthesizer rigs."
  },
  "nouvelle-aquitaine": {
    nameFr: "Nouvelle-Aquitaine",
    nameEn: "New Aquitaine",
    capital: "Bordeaux / Bayonne / Limoges / Poitiers",
    badgeColor: "#06D6A0",
    soundNote: "D4",
    musicStyleFr: "Bandas cuivrées festives du Sud-Ouest, Chœurs polyphoniques basques, Jazz des quais de Garonne et rock bordelais.",
    musicStyleEn: "Festive Southwest brass Bandas, Basque Choral polyphony, Garonne riverside jazz, and Bordeaux indie rock.",
    historyFr: "Terre de fête populaire, de bandas et de convivialité. C'est la patrie de célèbres groupes de rock bordelais comme Noir Désir, ainsi que des grands chœurs d'hommes basques renommés à l'échelle internationale.",
    historyEn: "Land of spirited carnivals, marching brass bandas, and communal singing. Home to influential Bordeaux indie rock groups as well as internationally acclaimed Basque men's choirs.",
    june21TraditionFr: "Les quais de Bordeaux et le Miroir d'Eau s'animent de concerts gigantesques. Au Pays Basque et dans les Landes, les Bandas (orchestres de cuivres vêtus de blanc avec foulard rouge) font chanter des foules entières bras dessus, bras dessous.",
    june21TraditionEn: "Bordeaux river quays and the iconic Water Mirror reflect colorful festival stage lights. In the Basque Country and Landes, marching brass Bandas clad in white with red scarves lead thousands in exuberant singing.",
    venuesFr: "Quais des Chartrons & Miroir d'Eau à Bordeaux, Quai des Corsaires à Bayonne, Place de la République à Limoges, et Place d'Armes à Poitiers.",
    venuesEn: "Chartrons Quays & Water Mirror in Bordeaux, Quai des Corsaires in Bayonne, Place de la République in Limoges, and Place d'Armes in Poitiers.",
    gastronomyFr: "Canelés bordelais croustillants caramélisés au rhum et vanille de Madagascar, gâteau basque fourré à la cerise noire d'Itxassou, et cornet de jambon de Bayonne affiné.",
    gastronomyEn: "Crunchy caramelized Bordeaux canelés with Madagascar vanilla, Basque butter cake with black cherry jam, and paper cones of sliced dry-cured Bayonne ham.",
    anecdoteFr: "À Bayonne, le festival de musique commence souvent par un chant traditionnel basque 'Hegoak', entonné en parfaite polyphonie par des centaines de convives sans aucune répétition préalable !",
    anecdoteEn: "In Bayonne, celebrations often kick off with the traditional anthem 'Hegoak', harmonized spontaneously in four-part polyphony by hundreds of diners without any rehearsal!",
    instrumentsFr: "Txistu (flûte basque à trois trous), ttun-ttun (tambourin à cordes), trompette de feria, soubassophone.",
    instrumentsEn: "Txistu flute, ttun-ttun string drum, brass fanfare trumpet, marching sousaphone."
  },
  "occitanie": {
    nameFr: "Occitanie (Pyrénées-Méditerranée)",
    nameEn: "Occitanie",
    capital: "Toulouse / Montpellier / Nîmes / Perpignan",
    badgeColor: "#FFB703",
    soundNote: "F4",
    musicStyleFr: "Poésie lyrique des Troubadours, Ska-Rock festif cuivré, Chanson poétique toulousaine et Jazz manouche méditerranéen.",
    musicStyleEn: "Occitan Troubadour lyrical heritage, high-octane Ska-Rock, poetic Toulouse Chanson, and Mediterranean gypsy jazz.",
    historyFr: "Patrie du légendaire Claude Nougaro qui a immortalisé Toulouse ('Ô mon païs, ô Toulouse'), mais aussi de Zebda ('Tombé la chemise') et du célèbre guitariste manouche Biréli Lagrène.",
    historyEn: "Home of the legendary Claude Nougaro who immortalized the 'Pink City' in song, multi-platinum street band Zebda, and world-renowned gypsy guitar virtuoso Biréli Lagrène.",
    june21TraditionFr: "Sur la majestueuse Place du Capitole à Toulouse, les briques roses s'embrasent sous les projecteurs. À Montpellier, la Place de la Comédie devient un gigantesque bal populaire où étudiants et familles dansent jusqu'à 3h du matin sous les étoiles.",
    june21TraditionEn: "In Toulouse, the pink brick facades of Place du Capitole glow under blazing spotlights. In Montpellier, Place de la Comédie turns into an open dance floor where thousands of university students and families dance past 3 AM.",
    venuesFr: "Place du Capitole et Daurade à Toulouse, Place de la Comédie à Montpellier, Arènes de Nîmes, et Parvis du Castillet à Perpignan.",
    venuesEn: "Place du Capitole and Daurade quays in Toulouse, Place de la Comédie in Montpellier, Roman Arena of Nîmes, and Castillet plaza in Perpignan.",
    gastronomyFr: "Sandwich à la véritable saucisse de Toulouse grillée aux herbes, tielle sétoise tiède au poulpe épicé à la tomate, petits pâtés tièdes de Pézenas et verres de Limoux pétillant.",
    gastronomyEn: "Grilled fresh Toulouse pork sausage sandwich with herbs, spicy octopus and tomato Sète tarts, sweet-savory Pézenas pastries, and bubbly sparkling Limoux wine.",
    anecdoteFr: "Dans les années 1990, le groupe Zebda a donné un concert surprise improvisé sur une bétaillère au bord de la Garonne : l'affluence était telle que le pont Saint-Pierre a dû être réservé aux piétons pour la nuit !",
    anecdoteEn: "In the 1990s, band Zebda staged an unannounced concert from the back of a truck beside the Garonne river; the crowd grew so colossal that police converted Saint-Pierre bridge into a pedestrian dance floor!",
    instrumentsFr: "Graile (hautbois traditionnel occitan), bodega (grande cornemuse en peau de chèvre), guitare manouche, trombone.",
    instrumentsEn: "Graile (Occitan oboe), bodega (giant goat-skin bagpipe), gypsy swing guitar, brass trombone."
  },
  "grand-est": {
    nameFr: "Grand Est (Alsace, Lorraine, Champagne)",
    nameEn: "Grand Est (Alsace, Lorraine, Champagne)",
    capital: "Strasbourg / Reims / Nancy / Metz",
    badgeColor: "#7209B7",
    soundNote: "B4",
    musicStyleFr: "Harmonies symphoniques de cuivres, Grand orgue liturgique, Fanfares Klezmer et Électro franco-allemande rhénane.",
    musicStyleEn: "Symphonic wind orchestras, Cathedral pipe organs, Klezmer brass bands, and Franco-German Rhenish electro beats.",
    historyFr: "Carrefour musical entre la France et l'Europe centrale. C'est à Strasbourg que Rouget de Lisle a composé La Marseillaise en 1792. Région également reconnue pour ses manufactures historiques d'orgues et d'instruments à vent.",
    historyEn: "Historic musical crossroads between France and Central Europe. In Strasbourg, Rouget de Lisle composed the French national anthem (La Marseillaise) in 1792. Famous for centuries of pipe organ craftsmanship and orchestral wind guilds.",
    june21TraditionFr: "Sur le parvis de grès rose de la Cathédrale de Strasbourg et sur la place Stanislas dorée à Nancy, des dizaines d'harmonies municipales et d'orchestres de jeunes diplômés interprètent des pièces classiques et contemporaines sous les illuminations dorées.",
    june21TraditionEn: "In front of Strasbourg Cathedral's pink sandstone facade and Nancy's gilded Place Stanislas, dozens of municipal concert bands and youth philharmonics perform classical suites and cinematic scores beneath starlight.",
    venuesFr: "Place de la Cathédrale à Strasbourg, Place Stanislas à Nancy, Place Royale à Reims, et Centre Pompidou-Metz.",
    venuesEn: "Cathedral Square in Strasbourg, Place Stanislas in Nancy, Place Royale in Reims, and Centre Pompidou plaza in Metz.",
    gastronomyFr: "Flammekueche (tarte flambée alsacienne) servie brûlante sur planchettes en bois, bretzels tièdes aux cristaux de gros sel, parts de Kougelhopf doré et bières artisanales de brasserie.",
    gastronomyEn: "Crispy Flammekueche served straight from wood-fired ovens on wooden boards, warm salted pretzels, sweet almond Kougelhopf cake, and chilled local craft draft beers.",
    anecdoteFr: "À Strasbourg, grâce à la proximité de la frontière, des fanfares allemandes et françaises traversent le Pont de l'Europe à pied le 21 juin pour fusionner leurs répertoires en plein milieu du Rhin !",
    anecdoteEn: "In Strasbourg, German and French brass bands march across the pedestrian Bridge of Europe over the Rhine on June 21 to merge into one giant cross-border brass ensemble!",
    instrumentsFr: "Grand orgue à tuyaux, clarinette d'harmonie, cor d'harmonie, accordéon bavarois.",
    instrumentsEn: "Cathedral pipe organ, orchestral clarinet, French horn, Bavarian accordion."
  },
  "hauts-de-france": {
    nameFr: "Hauts-de-France (Lille & Flandres)",
    nameEn: "Hauts-de-France (Lille & North)",
    capital: "Lille / Amiens",
    badgeColor: "#4CC9F0",
    soundNote: "C5",
    musicStyleFr: "Carillons monumentaux des beffrois, Harmonies minières ouvrières, Folk flamand et Scène Pop-Rock indépendante.",
    musicStyleEn: "Monumental Belfry Carillons, Historic Coal-Mining Brass Harmonies, Flemish Folk & vibrant Indie Rock.",
    historyFr: "Terre de solidarité et d'harmonies ouvrières légendaires immortalisées par les chorales de mineurs. C'est aussi la patrie de Line Renaud, Raoul de Godewarsvelde et d'une scène électro-rock lilloise ultra dynamique.",
    historyEn: "Heartland of working-class solidarity and celebrated coal-miner wind orchestras. Birthplace of popular icons like Line Renaud, folk singer Raoul de Godewarsvelde, and Lille's renowned university rock scene.",
    june21TraditionFr: "Les cloches des carillons des beffrois classés à l'UNESCO sonnent des mélodies populaires pour donner le coup d'envoi de la fête à 18h. Dans la cour intérieure de la Vieille Bourse de Lille, des centaines de danseurs de tango et de swing s'élancent sur les pavés.",
    june21TraditionEn: "Carillon bells from UNESCO belfries ring out popular French tunes to officially open the festival at 6:00 PM. In the arcaded courtyard of Lille's Old Stock Exchange, hundreds dance Argentine tango and swing on cobblestones.",
    venuesFr: "Grand'Place & Vieille Bourse à Lille, Parvis de la Cathédrale d'Amiens, Place d'Armes à Valenciennes, et Port de Dunkerque.",
    venuesEn: "Grand'Place & Old Stock Exchange in Lille, Amiens Cathedral Forecourt, Place d'Armes in Valenciennes, and Dunkirk Harbor.",
    gastronomyFr: "Cornets de frites fraîches double cuisson à la mayonnaise maison, gaufres liégeoises chaudes fourrées à la vergeoise brune, et parts de tarte au fromage Maroilles gratiné.",
    gastronomyEn: "Paper cones of authentic double-fried Belgian-style fries with homemade mayo, warm caramelized brown-sugar waffles, and melted savory Maroilles cheese tart.",
    anecdoteFr: "Le carillonneur de Douai joue régulièrement les tubes de Queen et des Daft Punk sur les 62 cloches de bronze du beffroi le 21 juin, provoquant des ovations de milliers de personnes sur la place !",
    anecdoteEn: "The master carillonneur of Douai regularly plays Queen rock anthems and Daft Punk hits on the 62 bronze belfry bells on June 21, triggering huge cheers across the city square!",
    instrumentsFr: "Carillon de beffroi (clavier coup-de-poing), accordéon chromatique, caisse claire de fanfare, guitare électrique.",
    instrumentsEn: "Belfry bell carillon, chromatic accordion, marching snare drum, electric guitar."
  },
  "normandie": {
    nameFr: "Normandie (Normandy)",
    nameEn: "Normandy",
    capital: "Rouen / Caen / Le Havre",
    badgeColor: "#2EC4B6",
    soundNote: "G4",
    musicStyleFr: "Folk maritime côtier, Violon traditionnel normand, Rock indé havrais et Chorales lyriques maritimes.",
    musicStyleEn: "Coastal maritime folk, traditional Norman fiddle reels, Le Havre indie rock, and nautical choir sea shanties.",
    historyFr: "Terre de compositeurs illustres comme Erik Satie (né à Honfleur, père de la musique d'ambiance moderne) et d'Arthur Honegger. Le port du Havre est également un haut lieu historique du rock indé français.",
    historyEn: "Home of visionary composers like Erik Satie (born in Honfleur, father of ambient and minimalist piano) and Arthur Honegger. The transatlantic port of Le Havre is also a historic crucible of French indie rock.",
    june21TraditionFr: "Les vieux bassins portuaires de Honfleur, Dieppe et Granville s'illuminent de lampions colorés. Des guitaristes acoustiques et violonistes jouent sur le pont des vieux gréements amarrés, tandis que dans le Vieux Rouen les ruelles à pans de bois résonnent de jazz manouche.",
    june21TraditionEn: "Historic stone harbors of Honfleur, Dieppe, and Granville twinkle under colorful string lanterns. Acoustic guitarists and violinists perform on the decks of vintage wooden sailboats, while Rouen's half-timbered streets echo with gypsy jazz.",
    venuesFr: "Vieux Bassin d'Honfleur, Place du Vieux-Marché à Rouen, Port de Plaisance de Caen, et Bassin du Commerce au Havre.",
    venuesEn: "Old Harbor Basin in Honfleur, Place du Vieux-Marché in Rouen, Caen Marina, and Bassin du Commerce in Le Havre.",
    gastronomyFr: "Tarte normande tiède aux pommes fondantes flambées au Calvados, roue de Camembert au lait cru rôtie au barbecue sur baguette croustillante, et cidre bouché brut pétillant.",
    gastronomyEn: "Warm Norman apple tart glazed with Calvados cream, whole wheels of raw milk Camembert melted over barbecue coals with crusty baguette, and crisp sparkling cider.",
    anecdoteFr: "À Honfleur, des pianistes sortent des pianos droits sur les pavés du vieux port en hommage à Erik Satie et jouent ses célèbres 'Gymnopédies' au moment exact où le soleil se couche sur la mer !",
    anecdoteEn: "In Honfleur, upright pianos are wheeled directly onto harbor cobblestones to honor native son Erik Satie, performing his iconic 'Gymnopédies' at the exact moment the sun dips into the ocean!",
    instrumentsFr: "Violon folk normand, flûte traversière en bois, piano droit acoustique, guitare folk.",
    instrumentsEn: "Norman folk fiddle, wooden transverse flute, acoustic upright piano, dreadnought guitar."
  },
  "pays-de-la-loire": {
    nameFr: "Pays de la Loire (Nantes & Océan)",
    nameEn: "Pays de la Loire (Nantes & Coast)",
    capital: "Nantes / Angers / Le Mans",
    badgeColor: "#FB5607",
    soundNote: "D4",
    musicStyleFr: "Rock alternatif avant-gardiste, Électro de l'Estuaire, Fanfares étudiantes cuivrées et Chants de mariniers ligériens.",
    musicStyleEn: "Avant-garde alternative rock, Estuary electronic beats, university brass bands, and Loire river shanties.",
    historyFr: "Nantes est l'une des capitales les plus créatives de France, berceau du groupe de pop-rock Elmer Food Beat, du festival Hellfest à Clisson, et de la compagnie d'art urbain féérique des Machines de l'Île.",
    historyEn: "Nantes is one of France's top artistic incubators, home to legendary rock groups, the monumental Hellfest open-air festival in Clisson, and the world-famous mechanical arts collective Les Machines de l'Île.",
    june21TraditionFr: "Sous la nef des Machines de l'Île, face au Grand Éléphant mécanique de 12 mètres, des collectifs électro et des groupes de rock transforment les anciens chantiers navals en un festival futuriste. À Angers, le château médiéval s'illumine au son des percussions.",
    june21TraditionEn: "Beneath the monumental hangar of Les Machines de l'Île, facing the 40-foot mechanical Giant Elephant, indie rock and electro collectives transform the historic shipyards into a fantasy festival playground. In Angers, the medieval moat echoes with drums.",
    venuesFr: "Les Machines de l'Île (Hangar à Bananes) à Nantes, Place du Ralliement à Angers, Place des Jacobins au Mans, et Remparts de Guérande.",
    venuesEn: "Machines de l'Île (Hangar à Bananes) in Nantes, Place du Ralliement in Angers, Place des Jacobins in Le Mans, and Medieval Ramparts of Guérande.",
    gastronomyFr: "Petits pains 'Fouaces angevines' chauds garnis de rillettes pur porc du Mans, gâteau nantais parfumé aux amandes et au rhum, et verres de vin blanc sec Muscadet sur lie bien frais.",
    gastronomyEn: "Warm pocket bread 'fouaces' stuffed with savory Le Mans rillettes, glazed almond-rum Gâteau Nantais, and chilled crisp Muscadet white wine.",
    anecdoteFr: "Le Grand Éléphant de Nantes participe parfois à la fête en arrosant amicalement la foule en délire avec sa trompe mécanique au rythme des basses de DJ sets !",
    anecdoteEn: "Nantes' mechanical Giant Elephant sometimes joins the festival by spraying playful misty water jets over cheering dancers from its mechanical trunk in time with heavy DJ basslines!",
    instrumentsFr: "Guitare basse distordue, trompette de fanfare, accordéon diatonique, batterie acoustique.",
    instrumentsEn: "Distorted bass guitar, brass fanfare trumpet, diatonic accordion, acoustic drum kit."
  },
  "centre-val-de-loire": {
    nameFr: "Centre-Val de Loire (Châteaux & Fleuve)",
    nameEn: "Centre-Val de Loire (Castles & River)",
    capital: "Orléans / Tours / Blois / Bourges",
    badgeColor: "#E63946",
    soundNote: "E4",
    musicStyleFr: "Musique classique et luths de la Renaissance, Jazz fluvial ligérien, Pop-Chanson poétique et fanfares de guinguette.",
    musicStyleEn: "Renaissance lute recitals, Loire riverside swing jazz, poetic French Chanson, and open-air riverside tavern fanfares.",
    historyFr: "Cœur historique de la royauté française et berceau du Printemps de Bourges, festival mythique fondé en 1977 qui a révélé des générations d'artistes majeurs de la chanson française.",
    historyEn: "Historical royal heartland of France and birthplace of Le Printemps de Bourges, the legendary music festival founded in 1977 that launched generations of iconic French music superstars.",
    june21TraditionFr: "Les cours majestueuses des châteaux de la Loire (Blois, Chambord, Amboise) s'ouvrent gratuitement au public pour des récitals Renaissance aux chandelles. Sur les berges sauvages du fleuve, les guinguettes en bois accueillent accordéons et jazz manouche au coucher du soleil.",
    june21TraditionEn: "The courtyards of Loire Valley châteaux (Blois, Chambord, Amboise) open free to the public for candlelit Renaissance lute concerts. Along sandy riverbanks, wooden open-air guinguette taverns host accordions and swing under weeping willows.",
    venuesFr: "Place Plumereau à Tours, Parvis de la Cathédrale Sainte-Croix à Orléans, Cour du Château Royal de Blois, et Place Gordaine à Bourges.",
    venuesEn: "Place Plumereau in Tours, Sainte-Croix Cathedral forecourt in Orléans, Courtyard of the Royal Château de Blois, and Place Gordaine in Bourges.",
    gastronomyFr: "Rondelle de fromage de chèvre Sainte-Maure de Touraine AOP avec son brin de paille sur pain de campagne, rillons chauds croustillants, et authentique tarte Tatin tiède aux pommes caramélisées.",
    gastronomyEn: "Ash-coated Sainte-Maure de Touraine goat cheese on rustic sourdough, crispy warm pork rillons, and authentic warm upside-down caramelized apple Tarte Tatin.",
    anecdoteFr: "Sur la célèbre Place Plumereau à Tours, les étudiants forment chaque 21 juin une chaîne humaine qui fait le tour complet des terrasses en chantant à tue-tête des valses traditionnelles !",
    anecdoteEn: "On timber-framed Place Plumereau in Tours, university students link hands on June 21 to weave a human chain winding around all 25 café terraces, singing classic folk waltzes at the top of their lungs!",
    instrumentsFr: "Luth Renaissance, flûte à bec en bois de buis, saxophone ténor, guitare classique.",
    instrumentsEn: "Renaissance wooden lute, baroque recorder, tenor saxophone, classical acoustic guitar."
  },
  "bourgogne-franche-comte": {
    nameFr: "Bourgogne-Franche-Comté",
    nameEn: "Burgundy-Franche-Comté",
    capital: "Dijon / Besançon / Beaune / Chalon",
    badgeColor: "#9B5DE5",
    soundNote: "F4",
    musicStyleFr: "Blues chaleureux des coteaux de vignes, Clarinette jurassienne, Fanfares bachiques et Scène rock & électro des citadelles.",
    musicStyleEn: "Warm vineyard acoustic blues, Jura folk clarinets, festive harvest brass fanfares, and citadel rock & electro.",
    historyFr: "Région de grande tradition chorale, de cuivres et de festivals renommés comme les Eurockéennes de Belfort, l'un des plus grands festivals rock en plein air d'Europe.",
    historyEn: "Region with a distinguished choral and brass heritage, home to Les Eurockéennes de Belfort, one of Europe's premier open-air rock festivals set between lakes and mountains.",
    june21TraditionFr: "À Dijon, au pied du Palais des Ducs de Bourgogne illuminé, la Place de la Libération accueille des big bands de swing et des formations de jazz. Dans la citadelle fortifiée de Vauban à Besançon, les remparts de pierre renvoient l'écho de guitares électriques jusqu'à minuit passé.",
    june21TraditionEn: "In Dijon, beneath the illuminated Palace of the Dukes of Burgundy, Place de la Libération fills with swing big bands. Within Vauban's UNESCO citadel ramparts in Besançon, rock guitars echo off towering limestone ramparts past midnight.",
    venuesFr: "Place de la Libération à Dijon, Citadelle et Place de la Révolution à Besançon, Hospices de Beaune, et Presqu'île du Malsaucy.",
    venuesEn: "Place de la Libération in Dijon, Citadel & Place de la Révolution in Besançon, Hospices de Beaune, and Lake Malsaucy in Belfort.",
    gastronomyFr: "Gougères tièdes soufflées au véritable fromage Comté affiné 18 mois, tranches de pain d'épices de Dijon moelleux au miel pur, et planchette de salaisons fumées du Haut-Doubs.",
    gastronomyEn: "Warm golden cheese Gougère puffs made with 18-month aged Comté cheese, fragrant honey pain d'épices spice cake from Dijon, and smoked mountain charcuterie from the Jura.",
    anecdoteFr: "Les vignerons de Bourgogne ont pour coutume d'ouvrir leurs caves voûtées historiques aux musiciens de jazz le 21 juin, créant des concerts acoustiques souterrains uniques entourés de fûts de chêne centenaires !",
    anecdoteEn: "Burgundy winemakers historically open their stone vaulted cellars to jazz musicians on June 21, creating underground acoustic concerts lit by candles surrounded by century-old oak barrels!",
    instrumentsFr: "Clarinette jurassienne, accordéon diatonique, contrebasse jazz, cornet à pistons.",
    instrumentsEn: "Jura folk clarinet, diatonic accordion, upright jazz bass, brass cornet."
  },
  "corse": {
    nameFr: "Corse (Île de Beauté)",
    nameEn: "Corsica (Island of Beauty)",
    capital: "Ajaccio / Bastia / Corte / Calvi",
    badgeColor: "#F15BB5",
    soundNote: "A4",
    musicStyleFr: "Chants polyphoniques ancestraux (Paghjella classée UNESCO), Sérénades à la guitare corse, Violon insulaire et Chants sacrés.",
    musicStyleEn: "Ancient UNESCO-protected Choral Polyphony (Paghjella), soulful Corsican guitar serenades, and folk fiddle reels.",
    historyFr: "Terre de chant sacré et de mémoire insulaire. C'est la patrie de Tino Rossi (interprète du mythique 'Petit Papa Noël', single le plus vendu de l'histoire en France) et des groupes polyphoniques de renommée mondiale I Muvrini et A Filetta.",
    historyEn: "Sanctuary of sacred vocal music and Mediterranean memory. Birthplace of Tino Rossi (singer of the best-selling French single in history) and world-renowned polyphonic vocal groups I Muvrini and A Filetta.",
    june21TraditionFr: "Dans les chapelles millénaires en granit, les criques marines et sous les platanes des places de village, des hommes et des femmes chantent la Paghjella sans aucun microphone. La pureté et la vibration acoustique des voix a cappella résonnent au-dessus de la mer et des montagnes.",
    june21TraditionEn: "Inside granite village chapels, coastal coves, and beneath giant plane trees on village squares, men and women sing three-part Paghjella polyphony without microphones. The raw natural resonance echoes between mountains and the Mediterranean stars.",
    venuesFr: "Place Saint-Nicolas à Bastia, Port d'Ajaccio et citadelle, Citadelle perchée de Calvi, et Place Paoli à Corte.",
    venuesEn: "Place Saint-Nicolas in Bastia, Harbor and Citadel of Ajaccio, Clifftop Citadel of Calvi, and Place Paoli in Corte.",
    gastronomyFr: "Gâteau Fiadone traditionnel au fromage Brocciu frais parfumé au zeste de citron jaune, canistrelli croustillants aux éclats d'amandes, et tranches fines de lonzu et coppa artisanaux.",
    gastronomyEn: "Traditional lemon-scented Fiadone cheesecake made with fresh Brocciu cheese, crunchy almond Canistrelli cookies, and artisanal dry-cured Lonzu charcuterie.",
    anecdoteFr: "La Paghjella corse se chante traditionnellement à trois voix : le 'Bassu' (la voix basse qui représente la terre), la 'Seconda' (la voix principale qui guide le texte) et la 'Terza' (la voix aiguë qui apporte les ornements célestes) !",
    anecdoteEn: "Corsican Paghjella is traditionally sung in three distinct vocal registers: 'Bassu' (deep bass representing the earth), 'Seconda' (lead melodic voice guiding the lyrics), and 'Terza' (high tenor voice adding celestial ornamentation)!",
    instrumentsFr: "Cetera (cistre corse traditionnel à 16 cordes de métal), voix a cappella pure, violon insulaire, guitare acoustique.",
    instrumentsEn: "Cetera (traditional 16-string Corsican metal cittern), unaccompanied choral voices, folk fiddle, acoustic guitar."
  }
};

/**
 * Initializes the Interactive France Map
 */
function initFranceMap() {
  const mapContainer = document.getElementById("france-map-svg-wrapper");
  if (!mapContainer) return;

  const paths = window.FRANCE_SVG_PATHS;
  mapContainer.innerHTML = createAuthenticFranceSvgMap(paths);

  // Attach hover & click listeners to all regions
  const regions = mapContainer.querySelectorAll(".map-region");
  const tooltip = document.getElementById("map-tooltip");

  regions.forEach(region => {
    const regionId = region.getAttribute("data-region");
    const data = franceRegionsData[regionId];

    // Mouse enter tooltip
    region.addEventListener("mouseenter", (e) => {
      const currentLang = window.currentLang || 'fr';
      const name = currentLang === 'fr' ? (data ? data.nameFr : regionId) : (data ? data.nameEn : regionId);
      const cap = data ? data.capital : '';
      if (tooltip) {
        tooltip.innerHTML = `
          <div style="font-size: 1rem; font-weight: 800; color: #FFF;">${name}</div>
          <div style="font-size: 0.8rem; color: #FFD166;">🏛️ ${cap}</div>
          <div style="font-size: 0.75rem; color: #A8FF3E; margin-top: 4px;">${currentLang === 'fr' ? '👉 Cliquez pour ouvrir la fiche complète & écouter !' : '👉 Click to open full dossier & listen!'}</div>
        `;
        tooltip.classList.add("visible");
      }
    });

    region.addEventListener("mousemove", (e) => {
      if (tooltip) {
        tooltip.style.left = `${e.clientX + 16}px`;
        tooltip.style.top = `${e.clientY + 16}px`;
      }
    });

    region.addEventListener("mouseleave", () => {
      if (tooltip) {
        tooltip.classList.remove("visible");
      }
    });

    // Click to open region detail modal
    region.addEventListener("click", () => {
      openRegionModal(regionId);

    });
  });

  // Render quick pill selector buttons below the map for fast navigation
  const pillsContainer = document.getElementById("region-quick-pills");
  if (pillsContainer) {
    pillsContainer.innerHTML = Object.keys(franceRegionsData).map(key => {
      const r = franceRegionsData[key];
      const lang = window.currentLang || 'fr';
      const label = lang === 'fr' ? r.nameFr.split('(')[0].trim() : r.nameEn.split('(')[0].trim();
      return `<button class="region-pill-btn" style="border-left: 4px solid ${r.badgeColor || '#FFB703'};" onclick="openRegionModal('${key}')">📍 ${label}</button>`;
    }).join("");
  }
}

/**
 * Opens extensive detailed modal for a region with rich categories
 */
function openRegionModal(regionId) {
  const data = franceRegionsData[regionId];
  if (!data) return;

  const currentLang = window.currentLang || 'fr';
  const modal = document.getElementById("region-modal");
  const modalBody = document.getElementById("region-modal-content");

  if (!modal || !modalBody) return;
  const isFr = currentLang === 'fr';

  modalBody.innerHTML = `
    <div class="region-modal-card">
      <div class="region-header" style="border-left: 6px solid ${data.badgeColor || '#FFB703'}; padding-left: 18px; margin-bottom: 24px;">
        <div class="region-badge" style="background: ${data.badgeColor}22; color: ${data.badgeColor}; border: 1px solid ${data.badgeColor}66; display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; margin-bottom: 8px;">
          ${isFr ? 'Dossier Culturel & Musical de France' : 'Cultural & Musical Dossier of France'}
        </div>
        <h2 class="region-title" style="font-size: 2rem; color: #FFF; margin-bottom: 6px;">${isFr ? data.nameFr : data.nameEn}</h2>
        <div class="region-capital" style="color: var(--accent-gold); font-size: 1rem;">🏛️ ${isFr ? 'Capitales & Métropoles Clés :' : 'Key Capitals & Hubs:'} <strong>${data.capital}</strong></div>
      </div>

      <div class="region-grid-details">
        <!-- 1. Musical Heritage & Figures -->
        <div class="region-info-block" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">👑</span>
            <h4 style="color: #FFD166; font-size: 1.1rem; margin: 0;">${isFr ? 'Héritage & Figures Légendaires' : 'Musical Heritage & Legends'}</h4>
          </div>
          <p style="color: #E2E8F0; line-height: 1.7; font-size: 0.95rem;">${isFr ? data.historyFr : data.historyEn}</p>
        </div>

        <!-- 2. Musical Styles -->
        <div class="region-info-block" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">🎶</span>
            <h4 style="color: #00F5D4; font-size: 1.1rem; margin: 0;">${isFr ? 'Styles & Sonorités Uniques' : 'Musical Styles & Unique Sounds'}</h4>
          </div>
          <p style="color: #E2E8F0; line-height: 1.7; font-size: 0.95rem;">${isFr ? data.musicStyleFr : data.musicStyleEn}</p>
        </div>

        <!-- 3. June 21 Street Life -->
        <div class="region-info-block" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">🎷</span>
            <h4 style="color: #FF5E7E; font-size: 1.1rem; margin: 0;">${isFr ? 'Ce qui s’y passe le 21 Juin' : 'What Happens on June 21st'}</h4>
          </div>
          <p style="color: #E2E8F0; line-height: 1.7; font-size: 0.95rem;">${isFr ? data.june21TraditionFr : data.june21TraditionEn}</p>
        </div>

        <!-- 4. Iconic Venues & Gathering Spots -->
        <div class="region-info-block" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">📍</span>
            <h4 style="color: #A8FF3E; font-size: 1.1rem; margin: 0;">${isFr ? 'Lieux & Scènes Emblématiques' : 'Iconic Gathering Spots & Stages'}</h4>
          </div>
          <p style="color: #E2E8F0; line-height: 1.7; font-size: 0.95rem;">${isFr ? data.venuesFr : data.venuesEn}</p>
        </div>

        <!-- 5. Gastronomy & Snacks -->
        <div class="region-info-block" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">🥖</span>
            <h4 style="color: #FFB703; font-size: 1.1rem; margin: 0;">${isFr ? 'Gastronomie & Casse-Croûte de Rue' : 'Festival Street Gastronomy'}</h4>
          </div>
          <p style="color: #E2E8F0; line-height: 1.7; font-size: 0.95rem;">${isFr ? data.gastronomyFr : data.gastronomyEn}</p>
        </div>

        <!-- 6. Local Folklore & Anecdote -->
        <div class="region-info-block" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.5rem;">✨</span>
            <h4 style="color: #F15BB5; font-size: 1.1rem; margin: 0;">${isFr ? 'Secret & Anecdote du 21 Juin' : 'Secret & June 21st Folklore'}</h4>
          </div>
          <p style="color: #E2E8F0; line-height: 1.7; font-size: 0.95rem;">${isFr ? data.anecdoteFr : data.anecdoteEn}</p>
        </div>

        <!-- 7. Instruments -->
        <div class="region-info-block" style="grid-column: 1 / -1; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 18px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <span style="font-size: 1.5rem;">🎻</span>
            <h4 style="color: #3A86FF; font-size: 1.1rem; margin: 0;">${isFr ? 'Instruments Traditionnels & Modernes' : 'Iconic Instruments'}</h4>
          </div>
          <p style="color: #CBD5E1; line-height: 1.6; font-size: 0.95rem;">${isFr ? data.instrumentsFr : data.instrumentsEn}</p>
        </div>
      </div>

      <div class="region-modal-actions" style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
<button class="btn btn-secondary" onclick="closeRegionModal()">
          ${isFr ? 'Fermer la Fiche' : 'Close Dossier'}
        </button>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeRegionModal() {
  const modal = document.getElementById("region-modal");
  if (modal) {
    modal.classList.remove("open");
  }
}

/**
 * Builds the Authentic France Vector SVG Map using Official Paths
 */
function createAuthenticFranceSvgMap(paths) {
  if (!paths) {
    return `<div style="color: #FFB703; text-align: center; padding: 40px;">Chargement de la carte...</div>`;
  }

  return `
    <svg viewBox="0 0 710 630" class="france-interactive-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Region Glow Filter -->
        <filter id="region-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Background decorative compass rings -->
      <circle cx="360" cy="310" r="280" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="2" stroke-dasharray="8,8" />
      <circle cx="360" cy="310" r="190" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />

      <!-- 1. Hauts-de-France (Lille) -->
      <path class="map-region" data-region="hauts-de-france" fill="#4CC9F0" d="${paths['hauts-de-france']}" />

      <!-- 2. Normandie (Rouen) -->
      <path class="map-region" data-region="normandie" fill="#2EC4B6" d="${paths['normandie']}" />

      <!-- 3. Île-de-France (Paris - Star of the Festival) -->
      <path class="map-region pulse-glow" data-region="ile-de-france" fill="#FF5E7E" d="${paths['ile-de-france']}" />

      <!-- 4. Grand Est (Strasbourg) -->
      <path class="map-region" data-region="grand-est" fill="#7209B7" d="${paths['grand-est']}" />

      <!-- 5. Bretagne (Rennes) -->
      <path class="map-region" data-region="bretagne" fill="#3A86FF" d="${paths['bretagne']}" />

      <!-- 6. Pays de la Loire (Nantes) -->
      <path class="map-region" data-region="pays-de-la-loire" fill="#FB5607" d="${paths['pays-de-la-loire']}" />

      <!-- 7. Centre-Val de Loire (Tours, Orléans) -->
      <path class="map-region" data-region="centre-val-de-loire" fill="#E63946" d="${paths['centre-val-de-loire']}" />

      <!-- 8. Bourgogne-Franche-Comté (Dijon) -->
      <path class="map-region" data-region="bourgogne-franche-comte" fill="#9B5DE5" d="${paths['bourgogne-franche-comte']}" />

      <!-- 9. Nouvelle-Aquitaine (Bordeaux) -->
      <path class="map-region" data-region="nouvelle-aquitaine" fill="#06D6A0" d="${paths['nouvelle-aquitaine']}" />

      <!-- 10. Auvergne-Rhône-Alpes (Lyon) -->
      <path class="map-region" data-region="auvergne-rhone-alpes" fill="#8338EC" d="${paths['auvergne-rhone-alpes']}" />

      <!-- 11. Occitanie (Toulouse) -->
      <path class="map-region" data-region="occitanie" fill="#FFB703" d="${paths['occitanie']}" />

      <!-- 12. PACA (Marseille, Nice) -->
      <path class="map-region" data-region="paca" fill="#FF006E" d="${paths['paca']}" />

      <!-- 13. Corse (Ajaccio) -->
      <path class="map-region" data-region="corse" fill="#F15BB5" d="${paths['corse']}" />

      <!-- Labels & Visual Pins -->
      <g class="map-text-layer">
        <text x="385" y="80" class="map-label">Hauts-de-France</text>
        <text x="260" y="130" class="map-label">Normandie</text>
        <circle cx="335" cy="165" r="7" fill="#FFF" class="paris-star" />
        <text x="335" y="152" class="map-label-paris">★ PARIS (Île-de-France)</text>
        <text x="500" y="160" class="map-label">Grand Est</text>
        <text x="90" y="200" class="map-label">Bretagne</text>
        <text x="180" y="245" class="map-label">Pays de la Loire</text>
        <text x="310" y="240" class="map-label">Centre-Val de Loire</text>
        <text x="450" y="260" class="map-label">Bourgogne-Fr.-Comté</text>
        <text x="240" y="380" class="map-label">Nouvelle-Aquitaine</text>
        <text x="440" y="360" class="map-label">Auvergne-Rhône-Alpes</text>
        <text x="330" y="485" class="map-label">Occitanie</text>
        <text x="510" y="475" class="map-label">PACA</text>
        <text x="670" y="585" class="map-label">Corse</text>
      </g>
    </svg>
  `;
}
