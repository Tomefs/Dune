import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:6001";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    const db = client.db("data");
    const collection = db.collection("myCollection");

    let data = [
      {
        key: "home",
        title: "Dune",
        body: [
          "Dune is set in the distant future in a feudal interstellar society, descended from terrestrial humans, in which various noble houses control planetary fiefs. It tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis. While the planet is an inhospitable and sparsely populated desert wasteland, it is the only source of melange, or 'spice', a drug that extends life and enhances mental abilities. Melange is also necessary for space navigation, which requires a kind of multidimensional awareness and foresight that only the drug provides. As melange can only be produced on Arrakis, control of the planet is a coveted and dangerous undertaking. The story explores the multilayered interactions of politics, religion, ecology, technology, and human emotion as the factions of the empire confront each other in a struggle for the control of Arrakis and its spice.",
        ],
        image: [
          {
            src: "images/dunas.webp",
          },
        ],
      },
      {
        key: "author",
        title: "Frank Herbert",
        body: [
          "Frank Herbert (1920-1986) was born in Tacoma, Washington, and studied at the University of Washington, Seattle. He had a wide variety of jobs before becoming a full-time writer, including TV cameraman, radio commentator, oyster diver, jungle survival instructor, psychoanalyst, creative writing teacher, reporter, and editor for several West Coast newspapers. In 1952, Herbert began publishing science fiction with 'Looking for Something?' in Startling Stories. However, his breakthrough as a major writer came in 1965 with the publication of Dune, followed by five sequels: Dune Messiah, Children of Dune, God Emperor of Dune, Heretics of Dune, and Chapterhouse: Dune. The saga is considered one of the most significant achievements in the genre, praised for its complex world-building and exploration of ecological, political, and philosophical themes.",
        ],
        image: [
          {
            src: "images/Frank-Herbert.webp",
          },
        ],
      },
      {
        key: "books",
        title: "Book Planner",
        image: [
          {
            src: "images/cover1.webp",
            title: "Dune",
            sinopse: [
              "Dune tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence a commodity capable of unlocking humanity's greatest potential only those who can conquer their fear will survive.",
            ],
            pagesRead:0,
            totalpages:444,
          },
          {
            src: "images/cover2.webp",
            title: "Dune Messiah",
            sinopse: [
              "Dune Messiah continues the story of Paul Atreides, better known—and feared—as the man christened Muad’Dib. As Emperor of the known universe, he possesses more power than a single man was ever meant to wield. Worshipped as a religious icon by the fanatical Fremen, Paul faces the enmity of the political houses he displaced when he assumed the throne—and a conspiracy conducted within his own sphere of influence.",
            ],
          },
          {
            src: "images/cover3.webp",
            title: "Children of Dune",
            sinopse: [
              "The Children of Dune are twin siblings Leto and Ghanima Atreides, whose father, the Emperor Paul Muad’Dib, disappeared in the desert wastelands of Arrakis nine years ago. Like their father, the twins possess supernormal abilities making them valuable to their manipulative aunt Alia, who rules the Empire in the name of House Atreides. Alia believes that by obtaining the secrets of the twins’ prophetic visions, she can maintain control over her dynasty.",
            ],
          },
          {
            src: "images/cover4.webp",
            title: "God Emperor of Dune",
            sinopse: [
              "3,500 years have passed since Paul Atreides became the messiah of the Fremen and the Emperor of the universe. His son, Leto II, sees the path his father Muad'dib saw, a future that avoided the extinction of human life.",
            ],
          },
          {
            src: "images/cover5.webp",
            title: "Heretics of Dune",
            sinopse: [
              "Leto Atreides, the God Emperor of Dune, is dead. In the fifteen hundred years since his passing, the Empire has fallen into ruin. The great Scattering saw millions abandon the crumbling civilization and spread out beyond the reaches of known space. The planet Arrakis-now called Rakis-has reverted to its desert climate, and its great sandworms are dying. Now, the Lost Ones are returning home in pursuit of power. And as factions vie for control over the remnants of the Empire, a girl named Sheeana rises to prominence in the wastelands of Rakis, sending religious fervor throughout the galaxy. For she possesses the abilities of the Fremen sandriders-fulfilling a prophecy foretold by the late God Emperor.",
            ],
          },
          {
            src: "images/cover6.webp",
            title: "Chapterhouse Dune",
            sinopse: [
              "The desert planet Arrakis, called Dune, has been destroyed. The remnants of the Old Empire have been consumed by the violent matriarchal cult known as the Honored Matres. Only one faction remains a viable threat to their total conquest—the Bene Gesserit, heirs to Dune’s power. Under the leadership of Mother Superior Darwi Odrade, the Bene Gesserit have colonized a green world on the planet Chapterhouse and are turning it into a desert, mile by scorched mile. And once they’ve mastered breeding sandworms, the Sisterhood will control the production of the greatest commodity in the known galaxy—the spice melange. But their true weapon remains a man who has lived countless lifetimes—a man who served under the God Emperor Paul Muad’Dib.",
            ],
          },
        ],
      },
      {
        key: "movies",
        title: "Movie Planner",
        image: [
          {
            src: "images/dune1984.webp",
            title: "Dune",
            sinopse: [
              "In 10,190 AD, a duke and his family are sent by the Emperor to Arrakis,",
              "an arid planet known as Dune, which has a material essential for interplanetary travel: Spice.",
              "The reason for this move is that the Emperor plans to destroy the duke and his family, but his",
              "son escapes and seeks revenge using the ecology of this world as one of his weapons.",
            ],
          },
          {
            src: "images/Dune.webp",
            title: "Dune Part One",
            sinopse: [
              "Dune: Part One (2021) follows Paul Atreides, a young noble, as his family takes control of Arrakis,",
              "the galaxy's only source of the valuable spice. Betrayal and war force Paul to confront his destiny",
              "among the planet’s native Fremen, while exploring themes of power and survival in a hostile desert world.",
            ],
          },
          {
            src: "images/dune2.webp",
            title: "Dune Part Two",
            sinopse: [
              "Dune: Part Two (2024) continues Paul Atreides' journey as he allies with Chani and the Fremen to avenge his",
              "family's downfall. Facing a choice between his love for Chani and the fate of the universe,",
              "Paul endeavors to prevent a terrible future only he can foresee.",
            ],
          },
        ],
      },
    ];
    await collection.insertMany(data);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
