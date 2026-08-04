/* eslint-disable prettier/prettier */
// Content constants — edit these to swap out images, videos, and project copy.
// All images use the Unsplash URL helper from placeholders.ts; you can also paste
// any direct image/video URL string here.

const BTS1 = "/assets/BTS1.jpeg";
const BTS2 = "/assets/BTS2.jpeg";
const BTS3 = "/assets/BTS3.jpeg";
const BTS5 = "/assets/BTS_N1.jpg";
const BTS6 = "/assets/BTS_N2.jpg";
const BTS7 = "/assets/BTS_N3.jpg";
const BTS8 = "/assets/BTS_N4.jpeg";

// ---------- Types ----------

// ---------- Hero / Reel ----------

const BTS4 = "/assets/hero1.png";
export const HERO_BG = BTS4;
export const REEL_IMG =
  "https://image.mux.com/NJDikpikz5B4vnFx1GK7IHmXHqcH9y7D2n1Owi02Dg6A/thumbnail.png?time=1";

// Replace with your real Mux playback ID, e.g.
// "https://stream.mux.com/abc123XYZ.m3u8"
export const REEL_VIDEO_SRC =
  "https://stream.mux.com/NJDikpikz5B4vnFx1GK7IHmXHqcH9y7D2n1Owi02Dg6A.m3u8";

// ---------- Videography projects ----------

const SAMPLE_VIDEO =
  "https://stream.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE.m3u8";
export const PROJECTS_VIDEOS = [
  {
    id: 1,
    title: "Taasis",
    description:
      "A commercial video produced for Taasis, showcasing the brand's products and services through a clean, stylish, and modern visual approach.",
    thumbnail:
      "https://image.mux.com/4WJv01TlxMqF01uqgYAq7ian139GsViF4wpuQdF5Kw6qA/thumbnail.png?time=2",
    videoURL:
      "https://stream.mux.com/4WJv01TlxMqF01uqgYAq7ian139GsViF4wpuQdF5Kw6qA.m3u8",
    duration: "2:07",
    client: "Taasis",
    year: "2026",
  },
  
  {
    id: 2,
    title: "Patient Feedback",
    description: "Patient reviews of the Crystal Shine experience",
    thumbnail:
      "https://image.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE/thumbnail.png?time=2",
    videoURL:
      "https://stream.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE.m3u8",
    duration: "0:21",
    client: "Crystal Shine Clinic",
    year: "2025",
  },
  {
    id: 3,
    title: "88 Cups v60",
    description:
      "A peaceful morning routine filled with simple moments, warm light, and the quiet energy of a new day.",
    thumbnail:
      "https://image.mux.com/cU5KUutFEIIidssqmaOw6Cpcj02z02ZUaR2UsE01zRqbmg/thumbnail.png?time=13",
    videoURL:
      "https://stream.mux.com/cU5KUutFEIIidssqmaOw6Cpcj02z02ZUaR2UsE01zRqbmg.m3u8",
    duration: "0:24",
    client: "88 Cups",
    year: "2026",
  },
  {
    id: 4,
    title: "IMG_4491",
    description:
      "_",
    thumbnail:
      "https://image.mux.com/vsKJcNLPg7APGZ6IHBeFVzf5wTZHaEWfi26wDSt38XE/thumbnail.png?time=7",
    videoURL:
      "https://stream.mux.com/vsKJcNLPg7APGZ6IHBeFVzf5wTZHaEWfi26wDSt38XE.m3u8",
    duration: "1:15",
    client: "_",
    year: "2026",
  },
  {
    id: 5,
    title: "Fashion",
    description:
      "Commercial video produced for Sorbino’s Summer Collection, showcasing the season’s latest menswear through a clean, stylish, and modern visual approach.",
    thumbnail:
      "https://image.mux.com/8q9AqAmWKSZcENObQkRPZKTaYj1500pUC7gQY401MuZ02I/thumbnail.png?time=3",
    videoURL:
      "https://stream.mux.com/8q9AqAmWKSZcENObQkRPZKTaYj1500pUC7gQY401MuZ02I.m3u8",
    duration: "0:04",
    client: "Sorbino",
    year: "2025",
  },
  {
    id: 6,
    title: "Gym",
    description:
      "“It’s not about how heavy you lift, it’s about how well you lift ✨Perfect your form, protect you",
    thumbnail:
      "https://image.mux.com/c02vU28021LbKmA5LHvRi02TfYUHTs02EjCtp5WPiM02E1io/thumbnail.png?time=7",
    videoURL:
      "https://stream.mux.com/c02vU28021LbKmA5LHvRi02TfYUHTs02EjCtp5WPiM02E1io.m3u8",
    duration: "0:28",
    client: "Fitness Repablic",
    year: "2026",
  },
  {
    id: 7,
    title: "Gym",
    description: "This time is yours",
    thumbnail:
      "https://image.mux.com/Z011nHPAX00ajm6D02SnZzUiu5DMMmrp01PM8CEXmNQlpGk/thumbnail.png?time=6",
    videoURL:
      "https://stream.mux.com/Z011nHPAX00ajm6D02SnZzUiu5DMMmrp01PM8CEXmNQlpGk.m3u8",
    duration: "0:24",
    client: "Fitness Repablic",
    year: "2026",
  },
  {
    id: 8,
    title: "Dr.Youmna Ahmed",
    description:
      "ترتيب فطارك صح في رمضان بيخليك تستفيد بكل الفوايد الصحية للصيام ويخلّصك من الخمول اللي بيجيلك بعد الفطار",
    thumbnail:
      "https://image.mux.com/d2LJMgoLJANCL5zARCG5MMFeEcA8EbfAQBImnW01zFyQ/thumbnail.png?time=1",
    videoURL:
      "https://stream.mux.com/d2LJMgoLJANCL5zARCG5MMFeEcA8EbfAQBImnW01zFyQ.m3u8",
    duration: "0:45",
    client: "Crystal Shine clinic",
    year: "2026",
  },
  {
    id: 9,
    title: "Gym",
    description:
      "Ramadan offers you don’t want to miss Discounts on Gym Memberships Personal Training",
    thumbnail:
      "https://image.mux.com/xwkgNx1pUcZ67md4f6ZP009vyhGrqQsYPK3cO00MbCYkc/thumbnail.png?time=8",
    videoURL:
      "https://stream.mux.com/xwkgNx1pUcZ67md4f6ZP009vyhGrqQsYPK3cO00MbCYkc.m3u8",
    duration: "0:32",
    client: "Fitiness Republic",
    year: "2026",
  },
  {
    id: 10,
    title: "Gym",
    description: "They don’t just coach",
    thumbnail:
      "https://image.mux.com/fuHHj7seRoRRMVMdMgLy009uKMpxVacn31URrL9VwcW00/thumbnail.png?time=4",
    videoURL:
      "https://stream.mux.com/fuHHj7seRoRRMVMdMgLy009uKMpxVacn31URrL9VwcW00.m3u8",
    duration: "0:19",
    client: "Fitness Republic",
    year: "2026",
  },
  {
    id: 11,
    title: "Sophie", //lesa
    description: "Not everyone who speaks Deutsch can teach Deutsch",
    thumbnail:
      "https://image.mux.com/liVK5LUxwji2NgFNSa22OKyUgT5SC81BtzZXnK9u1ws/thumbnail.png?time=7",
    videoURL:
      "https://stream.mux.com/liVK5LUxwji2NgFNSa22OKyUgT5SC81BtzZXnK9u1ws.m3u8",
    duration: "0:29",
    client: "ADK",
    year: "2026",
  },
  {
    id: 12,
    title: "Sophie", //lesa
    description: "في ألمانيا محدش بيتكلم من سكربت",
    thumbnail:
      "https://image.mux.com/mas00zWZ02xcqaWF4WezwrqOnbS6fEg1CWnrk00YOy26mw/thumbnail.png?time=5",
    videoURL:
      "https://stream.mux.com/mas00zWZ02xcqaWF4WezwrqOnbS6fEg1CWnrk00YOy26mw.m3u8",
    duration: "0:22",
    client: "ADK",
    year: "2026",
  },
  {
    id: 13,
    title: "Shellos Burger",
    description:
      "Commercial food video produced for Shellos, capturing the freshness, texture, and visual appeal of their signature burger.",
    thumbnail:
      "https://image.mux.com/tJS3aiS8NtMUFBVrW2mRCG4IN7bFJL00oYJynAcCR94w/thumbnail.png?time=6",
    videoURL:
      "https://stream.mux.com/tJS3aiS8NtMUFBVrW2mRCG4IN7bFJL00oYJynAcCR94w.m3u8",
    duration: "0:24",
    client: "Shellos",
    year: "2024",
  },
  {
    id: 14,
    title: "88 Cups",
    description: "Details are always seen in slow motion.",
    thumbnail:
      "https://image.mux.com/1FK00g01Vhn9D3qb3YWc1DWQsRIFrdlEV36wKYwPV9k6s/thumbnail.png?time=4",
    videoURL:
      "https://stream.mux.com/1FK00g01Vhn9D3qb3YWc1DWQsRIFrdlEV36wKYwPV9k6s.m3u8",
    duration: "0:16",
    client: "88 Cups",
    year: "2024",
  },
  {
    id: 15,
    title: "Medical Conference",
    description:
      "Cutting edge approaches in the Management of Prostate Cancer ", //lesa
    thumbnail:
      "https://image.mux.com/NJDikpikz5B4vnFx1GK7IHmXHqcH9y7D2n1Owi02Dg6A/thumbnail.png?time=16",
    videoURL:
      "https://stream.mux.com/NJDikpikz5B4vnFx1GK7IHmXHqcH9y7D2n1Owi02Dg6A.m3u8",
    duration: "1:04",
    client: "",
    year: "2022",
  },
  {
    id: 16,
    title: "Dr.Reham Kamal",
    description: "التصريف اللمفاوى",
    thumbnail:
      "https://image.mux.com/H79U1DGPeDb02MapstC6DGOw4eE202qFENs01jfM41TTBM/thumbnail.png?time=16",
    videoURL:
      "https://stream.mux.com/H79U1DGPeDb02MapstC6DGOw4eE202qFENs01jfM41TTBM.m3u8",
    duration: "1:04",
    client: "Crystal Shine Clinic",
    year: "2025",
  },
  {
    id: 17,
    title: "Coffee Machine",
    description:
      "Product commercial showcasing a coffee machine through clean visuals, detailed product shots, and a focus on design, functionality, and the coffee-making experience",
    thumbnail:
      "https://image.mux.com/02dWghE5zrTp00n5OpgSaMMmgJZD5ookpl9CRbsVU33dY/thumbnail.png?time=17",
    videoURL:
      "https://stream.mux.com/02dWghE5zrTp00n5OpgSaMMmgJZD5ookpl9CRbsVU33dY.m3u8",
    duration: "1:08",
    client: "88 Cups",
    year: "2026",
  },
  {
    id: 18,
    title: "Owner Vision",
    description:
      "The owner's vision of his project and the details he experienced in order to establish the project",
    thumbnail:
      "https://image.mux.com/KsMucygYDHdzm8B00pru9we2gFIN5JFSkk75GgMqFkBg/thumbnail.png?time=14",
    videoURL:
      "https://stream.mux.com/KsMucygYDHdzm8B00pru9we2gFIN5JFSkk75GgMqFkBg.m3u8",
    duration: "0:58",
    client: "Play Thru",
    year: "2026",
  },
  {
    id: 19,
    title: "Medical Conference",
    description:
      "Documenting conference attendance and showcasing new products to attendees",
    thumbnail:
      "https://image.mux.com/1vzmUvphXaU8azVnhNJ8022aQ7SdOHXEVeO5EFMAJao8/thumbnail.png?time=25",
    videoURL:
      "https://stream.mux.com/1vzmUvphXaU8azVnhNJ8022aQ7SdOHXEVeO5EFMAJao8.m3u8",
    duration: "1:43",
    client: "ALI BEN ALI",
    year: "2024",
  },
  {
    id: 20,
    title: "Coffee Routine",
    description: "Morning Vibe to the Coffee Shop",
    thumbnail:
      "https://image.mux.com/Eq028YJYZR5cjDqgeuuZtNnr2gVvKNUNzdAMu01F6A2n8/thumbnail.png?time=10",
    videoURL:
      "https://stream.mux.com/Eq028YJYZR5cjDqgeuuZtNnr2gVvKNUNzdAMu01F6A2n8.m3u8",
    duration: "0:40",
    client: "88 Cups",
    year: "2025",
  },
  {
    id: 21,
    title: "Daily Coffee",
    description:
      "The Love of the coffe is always present in the details of its preparation",
    thumbnail:
      "https://image.mux.com/agu88gVSyyTRz7u5XQciuHHcGRReNtEaUbgHXWOm3UE/thumbnail.png?time=0",
    videoURL:
      "https://stream.mux.com/agu88gVSyyTRz7u5XQciuHHcGRReNtEaUbgHXWOm3UE.m3u8",
    duration: "0:16",
    client: "88 Cups",
    year: "2025",
  },
  {
    id: 22,
    title: "Behine the Scene",
    description:
      "Documenting the filming of the 'Our Heritage' exhibition advertisement and the advertisement for the Micro, Small and Medium Enterprises Development Agency, directed by Tamer Ragab.",
    thumbnail:
      "https://image.mux.com/ikp1iiKHdiaafTA3M5QIhksAYi1900CyuL02jGApU1yDM/thumbnail.png?time=0",
    videoURL:
      "https://stream.mux.com/ikp1iiKHdiaafTA3M5QIhksAYi1900CyuL02jGApU1yDM.m3u8",
    duration: "0:50",
    client: "Director Tamer Ragab",
    year: "2024",
  },
  {
    id: 23,
    title: "ASMR",
    description: "Documenting the important moments of a dentist's day at work",
    thumbnail:
      "https://image.mux.com/tCl02LY4sbKlGSDmNFZcj90201NXPiTlAeBmZSp01SNABhM/thumbnail.png?time=5",
    videoURL:
      "https://stream.mux.com/tCl02LY4sbKlGSDmNFZcj90201NXPiTlAeBmZSp01SNABhM.m3u8",
    duration: "0:21",
    client: "Pure Clinic",
    year: "2025",
  },
  {
    id: 24,
    title: "Accessories",
    description:
      "Accessories are part of our daily lives; they complete a person's elegance, and without them, our daily routine would be lacking.",
    thumbnail:
      "https://image.mux.com/IqqBV3DkNXABKHxzmtgNeFU6gj02tk01J024M014jcqwqfM/thumbnail.png?time=20",
    videoURL:
      "https://stream.mux.com/IqqBV3DkNXABKHxzmtgNeFU6gj02tk01J024M014jcqwqfM.m3u8",
    duration: "1:21",
    client: "Junky",
    year: "2024",
  },
  {
    id: 25,
    title: "Accessories",
    description:
      "Accessories are part of our daily lives; they complete a person's elegance, and without them, our daily routine would be lacking.",
    thumbnail:
      "https://image.mux.com/YozQ02TldMwM5n1VWX00LK4302h7dGXcLr02ttleQl6FxLQ/thumbnail.png?time=7",
    videoURL:
      "https://stream.mux.com/YozQ02TldMwM5n1VWX00LK4302h7dGXcLr02ttleQl6FxLQ.m3u8",
    duration: "0:28",
    client: "junky",
    year: "2024",
  },
];

export const PROJECTS_PHOTOS = [
  {
    id: 1,
    title: "Black Fox",
    description: "this is a description.",
    thumbnail: "/assets/blackfoxcover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988784/IMG_6912_copy_qrbqag.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988783/IMG_6915_copy_ukxp4s.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988779/IMG_6920_copy_vupitr.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988778/IMG_7045_copy_vgmrqi.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988776/IMG_0218_copy_lyvi8u.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988775/DSC01937_copy_q9kj7b.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988774/DSC01960_copy_r4wboz.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988773/DSC01969_copy_cjsbuq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988772/DSC01975_copy_gkwpaj.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988770/DSC07630_pypgmq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988770/DSC07616_akfj3c.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988768/DSC05616_copy_jkwxlr.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988767/DSC05628_copy_fynwd6.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988766/DSC05687_copy_opejtb.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988765/DSC05601_copy_rva5cg.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "F&B",
  },
  {
    id: 2,
    title: "88 breakfast",
    description: "this is a description.",
    thumbnail: "/assets/eightycover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988797/DSC00877_copy_udqkf8.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988796/DSC00962_nii1x4.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988795/DSC00942_sa8jf1.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988794/DSC00903_pdwtwq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988792/DSC00893_jfspzl.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988791/DSC00890_br9d7g.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988790/DSC00870_rb8ryx.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988790/DSC00848_lavuja.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988788/DSC00856_rlx4yz.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988788/DSC00845_fv6lyr.webp",
    ],
    location: "Egypt",
    year: "2025",
    category: "F&B",
  },
  {
    id: 4,
    title: "Eye Town",
    description: "this is a description.",
    thumbnail: "/assets/eyetowncover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988578/IMG_5634_ceyb2y.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988578/IMG_5629_yowxgl.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5625_oc1byc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5635_xqvdu0.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5612_bxahwn.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5611_jejnqf.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5652_ivzohg.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988576/IMG_5618_lakc9j.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988576/IMG_5645_bnxoni.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5647_giwgnd.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5642_ucxp0l.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5631_stpzmx.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5664_hnzfav.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5606_nrn32s.webp",
    ],
    location: "Egypt",
    year: "2023",
    category: "Commercial",
  },
  {
    id: 3,
    title: "Jewelry",
    description: "this is a description.",
    thumbnail: "/assets/jewelerycover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988683/IMG_5038_chxuih.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988683/IMG_5037_issazi.webp",
    ],
    location: "Egypt",
    //lesa
    year: "2023",
    category: "Jewelry",
  },
  {
    id: 5,
    title: "Honda Car",
    description: "this is a description.",
    thumbnail: "/assets/hondacover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988616/IMG_5343_e4bwp8.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988614/IMG_5346_mnogy2.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988614/IMG_5339_klpbug.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988614/IMG_5344_zf7xhi.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988613/IMG_5341_azzn3d.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988613/IMG_5342_ncevlm.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988615/IMG_5347_ovey5n.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "Commercial",
  },

  {
    id: 6,
    title: "Mimet Cafe",
    description: "this is a description.",
    thumbnail: "/assets/idkcover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988647/2_g9g1z5.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988646/1_wtawnp.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988645/DSC00318_rgjttc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988644/3_ixjuh3.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988643/4_rnakdy.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988643/DSC00367_bgtqdz.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "F&B",
  },

  {
    id: 7,
    title: "Black Fox",
    description: "this is a description.",
    thumbnail: "/assets/bbcover.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988937/DSC01444_copy_kzv7aw.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988936/%D9%83%D9%88%D8%B1%D8%AA%D8%A7%D8%AF%D9%88_izb9sh.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988935/DSC07151_nfbzxc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988934/DSC07125_xgrimv.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988932/DSC07120_b5jzoz.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988931/DSC07118_ynxa7n.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988930/DSC07112_rarfmu.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988928/DSC07115_asajxe.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988927/DSC07110_k68fww.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988926/DSC07105_py9fg0.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988865/DSC07038_mpn5cq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988864/DSC07542_hxfw7f.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988862/DSC07530_gnohdq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988861/DSC07531_jmxfmo.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988860/DSC07533_hevude.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988859/DSC07536_qscute.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988858/DSC07528_hfvnk9.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988856/DSC07525_lypgdw.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988855/DSC07526_djkkix.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988854/DSC07484_ymofcj.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988853/DSC07487_pqg0xm.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988852/DSC07256_tcqwtf.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988851/DSC07480_ychf2a.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988848/DSC07240_vesp4f.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988849/DSC07233_urmurw.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988846/DSC07218_fmmztn.webp",
    ],
    location: "Egypt",
    year: "2025",
    category: "F&B",
  },

  {
    id: 8,
    title: "88 Cups",
    description: "this is a description.",
    thumbnail: "/assets/idkk.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988711/DSC01482_kzoebq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988710/DSC01484_fatulc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988710/DSC01487_qjahbc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988708/DSC01490_cuzoaa.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988707/DSC01492_prniox.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988705/DSC01521_br03d3.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "F&B",
  },
  {
    id: 9,
    title: "Picnic",
    description: "this is a description.",
    thumbnail: "/assets/picnic.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988732/DSC01871_copy_pv9wo5.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988731/DSC01836_copy_mq6nrk.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988729/DSC01876_copy_v8hvmw.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988728/DSC01878_copy_jnbu12.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "F&B",
  },
  {
    id: 10,
    title: "88 Cups",
    description: "this is a description.",
    thumbnail: "/assets/kkk.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988844/DSC07381_rftxxl.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988843/DSC02539_tylx3l.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988842/DSC02525_svdaio.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988841/DSC02526_xypr2n.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988839/DSC02524_ykzgtc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988838/DSC02510_aqmmpk.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988837/DSC02273_gm3fcj.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988833/DSC02256_bgtt8m.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988832/DSC02252_aermie.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988831/DSC02254_x5fwzv.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "F&B",
  },

  {
    id: 11,
    title: "Shellos",
    description: "this is a description.",
    thumbnail: "/assets/shilos.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988755/DSC00551_ct2a1y.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988753/DSC00575_tvxjpl.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988752/DSC02586_k5vad5.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988750/DSC02594_jgovqe.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988756/DSC00528_bovksd.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988758/DSC00463_ji1adk.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988748/DSC02732_tvjksu.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988757/DSC00507_rgglot.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988753/DSC00609_vb6vql.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988761/DSC00455_d6uxuc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988762/DSC00422_aghkaw.webp",
    ],
    location: "Egypt",
    year: "2024",
    category: "F&B",
  },
  {
    id: 13,
    title: "R2",
    description: "this is a description.",
    thumbnail: "/assets/jjjj.jpg",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901179/c3890f124563095.6106f43b426a2_itsdv9.jpg",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901178/14e98e124563095.6106f43b434e9_igpxwn.jpg",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901177/631dcd124563095.6106f43b41a60_kliwfp.jpg",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901176/3d8ec7124563095.6106f43b42cbf_f6ug4g.jpg",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901176/6d77df124563095.6106f43b42187_pjfuxf.jpg",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901175/f24eb4124563095.6106f43b4124e_fgks37.jpg",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784901174/f8128d124563095.6106f43b40d3b_qkon7v.jpg",
    ],
    location: "Egypt",
    year: "2026",
    category: "Jewelry",
  },

  {
    id: 14,
    title: "Sababa",
    description: "this is a description.",
    thumbnail: "/assets/cvrr.webp",
    images: [
      "/assets/kkmca.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902214/2_x8593e.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902214/1_k6u1qi.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902214/3_du9foq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902212/7_joj47o.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902210/4_uunptq.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902210/5_vrgxt1.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902209/9_ivlpkd.webp",
    ],
    location: "Egypt",
    year: "2026",
    category: "F&B",
  },
  {
    id: 15,
    title: "Mokhito",
    description: "this is a description.",
    thumbnail: "/assets/asx.webp",
    images: [
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902231/1_veyaoi.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902230/2_yk5so3.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902228/3_dc29tc.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902228/4_g0pebl.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902227/5_hutyki.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902227/6_ruprgg.webp",
      "https://res.cloudinary.com/dozykhkhe/image/upload/v1784902227/7_ws15f2.webp",
    ],
    location: "Egypt",
    year: "2026",
    category: "F&B",
  },
];

// ---------- Behind The Lens ----------

export const BTS_PHOTOS = [
  {
    id: 1,
    src: BTS1,
    caption: "On set — Cairo",
    location: "EGY",
  },
  {
    id: 2,
    src: BTS5,
    caption: "Lighting check",
    location: "LDN",
  },
  {
    id: 3,
    src: BTS8,
    caption: "Camera A-cam roll",
    location: "TYO",
  },
  {
    id: 4,
    src: BTS6,
    caption: "Reviewing the take",
    location: "MAR",
  },
  {
    id: 5,
    src: BTS3,
    caption: "Taking the Shot",
    location: "PRS",
  },
  {
    id: 6,
    src: BTS7,
    caption: "Setup",
    location: "PTS",
  },
];
