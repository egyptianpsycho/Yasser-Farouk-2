/* eslint-disable prettier/prettier */
// Content constants — edit these to swap out images, videos, and project copy.
// All images use the Unsplash URL helper from placeholders.ts; you can also paste
// any direct image/video URL string here.

import { IMG as u } from "@/lib/placeholders";
const BTS1 = "/assets/BTS1.jpeg";
const BTS2 = "/assets/BTS2.jpeg";
const BTS3 = "/assets/BTS3.jpeg";

// ---------- Types ----------

// ---------- Hero / Reel ----------

export const HERO_BG = u("photo-1518709268805-4e9042af2176", 1920);
export const REEL_IMG = u("photo-1485846234645-a62644f84728", 1800);

// Replace with your real Mux playback ID, e.g.
// "https://stream.mux.com/abc123XYZ.m3u8"
export const REEL_VIDEO_SRC = "https://stream.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE.m3u8";

// ---------- Videography projects ----------

const SAMPLE_VIDEO = "https://stream.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE.m3u8";
export const PROJECTS_VIDEOS = [{
  id: 1,
  title: "Dr Magdy review",
  description: "----",
  //lesa
  thumbnail: "https://image.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE/thumbnail.png?time=5",
  videoURL: "https://stream.mux.com/KJjvVmi00uCpHAHzFl6vmazdi0201ojanOJxP8g9t01YMuE.m3u8",
  duration: "0:21",
  client: "Dr Magdy",
  year: "2024" //lesa
}, {
  id: 2,
  title: "88 Cubs v60",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/cU5KUutFEIIidssqmaOw6Cpcj02z02ZUaR2UsE01zRqbmg/thumbnail.png?time=6",
  videoURL: "https://stream.mux.com/cU5KUutFEIIidssqmaOw6Cpcj02z02ZUaR2UsE01zRqbmg.m3u8",
  duration: "0:24",
  client: "88 Cubs",
  year: "2024" //lesa
}, {
  id: 3,
  title: "3",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/8q9AqAmWKSZcENObQkRPZKTaYj1500pUC7gQY401MuZ02I/thumbnail.png?time=3",
  videoURL: "https://stream.mux.com/8q9AqAmWKSZcENObQkRPZKTaYj1500pUC7gQY401MuZ02I.m3u8",
  duration: "0:04",
  client: "3",
  year: "2024"
}, {
  id: 4,
  title: "“It’s not about how heavy you lift, it’s about how well you lift ✨Perfect your form, protect you",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/c02vU28021LbKmA5LHvRi02TfYUHTs02EjCtp5WPiM02E1io/thumbnail.png?time=7",
  videoURL: "https://stream.mux.com/c02vU28021LbKmA5LHvRi02TfYUHTs02EjCtp5WPiM02E1io.m3u8",
  duration: "0:28",
  client: "lesa",
  year: "2024" //lesa
}, {
  id: 5,
  title: "This time is yours",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/Z011nHPAX00ajm6D02SnZzUiu5DMMmrp01PM8CEXmNQlpGk/thumbnail.png?time=6",
  videoURL: "https://stream.mux.com/Z011nHPAX00ajm6D02SnZzUiu5DMMmrp01PM8CEXmNQlpGk.m3u8",
  duration: "0:24",
  client: "lesa",
  year: "2023" //lesa
}, {
  id: 6,
  title: "ترتيب فطارك صح في رمضان بيخليك تستفيد بكل الفوايد الصحية للصيام ويخلّصك من الخمول اللي بيجيلك بعد الفطار",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/d2LJMgoLJANCL5zARCG5MMFeEcA8EbfAQBImnW01zFyQ/thumbnail.png?time=11",
  videoURL: "https://stream.mux.com/d2LJMgoLJANCL5zARCG5MMFeEcA8EbfAQBImnW01zFyQ.m3u8",
  duration: "0:45",
  client: "lesa",
  year: "2023" //lesa
}, {
  id: 7,
  title: "Ramadan offers you don’t want to miss 🌙🔥💥 Discounts on-✔ Gym Memberships✔ Personal Training ",
  description: "this is a description",
  thumbnail: "https://image.mux.com/xwkgNx1pUcZ67md4f6ZP009vyhGrqQsYPK3cO00MbCYkc/thumbnail.png?time=8",
  videoURL: "https://stream.mux.com/xwkgNx1pUcZ67md4f6ZP009vyhGrqQsYPK3cO00MbCYkc.m3u8",
  duration: "0:32",
  client: "lesa",
  year: "2023" //lesa
}, {
  id: 8,
  title: "They don’t just coach",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/fuHHj7seRoRRMVMdMgLy009uKMpxVacn31URrL9VwcW00/thumbnail.png?time=4",
  videoURL: "https://stream.mux.com/fuHHj7seRoRRMVMdMgLy009uKMpxVacn31URrL9VwcW00.m3u8",
  duration: "0:19",
  client: "lesa",
  year: "2023" //lesa
}, {
  id: 9,
  title: "Not everyone who speaks Deutsch can teach Deutsch",
  description: "Patagonia documentary on coastal communities and a vanishing trade.",
  //lesa
  thumbnail: "https://image.mux.com/liVK5LUxwji2NgFNSa22OKyUgT5SC81BtzZXnK9u1ws/thumbnail.png?time=7",
  videoURL: "https://stream.mux.com/liVK5LUxwji2NgFNSa22OKyUgT5SC81BtzZXnK9u1ws.m3u8",
  duration: "0:29",
  client: "lesa",
  year: "2023" //lesa
}, {
  id: 10,
  title: "في ألمانيا محدش بيتكلم من سكربت",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/mas00zWZ02xcqaWF4WezwrqOnbS6fEg1CWnrk00YOy26mw/thumbnail.png?time=5",
  videoURL: "https://stream.mux.com/mas00zWZ02xcqaWF4WezwrqOnbS6fEg1CWnrk00YOy26mw.m3u8",
  duration: "0:22",
  client: "lesa",
  year: "2022" //lesa
}, {
  id: 11,
  title: "shello_s",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/tJS3aiS8NtMUFBVrW2mRCG4IN7bFJL00oYJynAcCR94w/thumbnail.png?time=6",
  videoURL: "https://stream.mux.com/tJS3aiS8NtMUFBVrW2mRCG4IN7bFJL00oYJynAcCR94w.m3u8",
  duration: "0:24",
  client: "lesa",
  year: "2022" //lesa
}, {
  id: 12,
  title: "88 Cubs",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/1FK00g01Vhn9D3qb3YWc1DWQsRIFrdlEV36wKYwPV9k6s/thumbnail.png?time=4",
  videoURL: "https://stream.mux.com/1FK00g01Vhn9D3qb3YWc1DWQsRIFrdlEV36wKYwPV9k6s.m3u8",
  duration: "0:16",
  client: "88 Cubs",
  year: "2022" //lesa
}, {
  id: 13,
  title: "Orgnaization fin",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/NJDikpikz5B4vnFx1GK7IHmXHqcH9y7D2n1Owi02Dg6A/thumbnail.png?time=16",
  videoURL: "https://stream.mux.com/NJDikpikz5B4vnFx1GK7IHmXHqcH9y7D2n1Owi02Dg6A.m3u8",
  duration: "1:04",
  client: "Independent",
  //lesa
  year: "2022" //lesa
}, {
  id: 14,
  title: "التصريف اللمفاوى",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/H79U1DGPeDb02MapstC6DGOw4eE202qFENs01jfM41TTBM/thumbnail.png?time=16",
  videoURL: "https://stream.mux.com/H79U1DGPeDb02MapstC6DGOw4eE202qFENs01jfM41TTBM.m3u8",
  duration: "1:04",
  client: "Independent",
  //lesa
  year: "2022" //lesa
}, {
  id: 15,
  title: "Coffee Machine",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/02dWghE5zrTp00n5OpgSaMMmgJZD5ookpl9CRbsVU33dY/thumbnail.png?time=17",
  videoURL: "https://stream.mux.com/02dWghE5zrTp00n5OpgSaMMmgJZD5ookpl9CRbsVU33dY.m3u8",
  duration: "1:08",
  client: "Netflix",
  year: "2021"
}, {
  id: 16,
  title: "Play Thru ",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/KsMucygYDHdzm8B00pru9we2gFIN5JFSkk75GgMqFkBg/thumbnail.png?time=14",
  videoURL: "https://stream.mux.com/KsMucygYDHdzm8B00pru9we2gFIN5JFSkk75GgMqFkBg.m3u8",
  duration: "0:58",
  client: "Play Thru",
  //lesa
  year: "2021" //lesa
}, {
  id: 17,
  title: "ALI BEN ALI",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/1vzmUvphXaU8azVnhNJ8022aQ7SdOHXEVeO5EFMAJao8/thumbnail.png?time=25",
  videoURL: "https://stream.mux.com/1vzmUvphXaU8azVnhNJ8022aQ7SdOHXEVeO5EFMAJao8.m3u8",
  duration: "1:43",
  client: "lesa",
  //lesa
  year: "2021" //lesa
}, {
  id: 18,
  title: "88 Cubs",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/Eq028YJYZR5cjDqgeuuZtNnr2gVvKNUNzdAMu01F6A2n8/thumbnail.png?time=10",
  videoURL: "https://stream.mux.com/Eq028YJYZR5cjDqgeuuZtNnr2gVvKNUNzdAMu01F6A2n8.m3u8",
  duration: "0:40",
  client: "lesa",
  //lesa
  year: "2021" //lesa
}, {
  id: 19,
  title: "88 Cubs",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/agu88gVSyyTRz7u5XQciuHHcGRReNtEaUbgHXWOm3UE/thumbnail.png?time=4",
  videoURL: "https://stream.mux.com/agu88gVSyyTRz7u5XQciuHHcGRReNtEaUbgHXWOm3UE.m3u8",
  duration: "0:16",
  client: "lesa",
  //lesa
  year: "2021" //lesa
}, {
  id: 20,
  title: "BTS_2",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/ikp1iiKHdiaafTA3M5QIhksAYi1900CyuL02jGApU1yDM/thumbnail.png?time=12",
  videoURL: "https://stream.mux.com/ikp1iiKHdiaafTA3M5QIhksAYi1900CyuL02jGApU1yDM.m3u8",
  duration: "0:50",
  client: "Netflix",
  //lesa
  year: "2021" //lesa
}, {
  id: 21,
  title: "Pure Clinic",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/tCl02LY4sbKlGSDmNFZcj90201NXPiTlAeBmZSp01SNABhM/thumbnail.png?time=5",
  videoURL: "https://stream.mux.com/tCl02LY4sbKlGSDmNFZcj90201NXPiTlAeBmZSp01SNABhM.m3u8",
  duration: "0:21",
  client: "Netflix",
  //lesa
  year: "2021" //lesa
}, {
  id: 22,
  title: "Junky 3",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/IqqBV3DkNXABKHxzmtgNeFU6gj02tk01J024M014jcqwqfM/thumbnail.png?time=20",
  videoURL: "https://stream.mux.com/IqqBV3DkNXABKHxzmtgNeFU6gj02tk01J024M014jcqwqfM.m3u8",
  duration: "1:21",
  client: "Netflix",
  //lesa
  year: "2021" //lesa
}, {
  id: 23,
  title: "junky 2",
  description: "this is a description",
  //lesa
  thumbnail: "https://image.mux.com/YozQ02TldMwM5n1VWX00LK4302h7dGXcLr02ttleQl6FxLQ/thumbnail.png?time=7",
  videoURL: "https://stream.mux.com/YozQ02TldMwM5n1VWX00LK4302h7dGXcLr02ttleQl6FxLQ.m3u8",
  duration: "0:28",
  client: "Netflix",
  //lesa
  year: "2021" //lesa
}];

// ---------- Photo projects ----------

const PHOTO_POOL = [u("photo-1542038784456-1ea8e935640e"), u("photo-1496588152823-86ff7695e68f"), u("photo-1519125323398-675f0ddb6308"), u("photo-1473625247510-8ceb1760943f"), u("photo-1469474968028-56623f02e42e"), u("photo-1470770841072-f978cf4d019e"), u("photo-1447752875215-b2761acb3c5d"), u("photo-1426604966848-d7adac402bff"), u("photo-1500382017468-9049fed747ef"), u("photo-1501785888041-af3ef285b470"), u("photo-1432405972618-c60b0225b8f9"), u("photo-1465146344425-f00d5f5c8f07"), u("photo-1482938289607-e9573fc25ebb"), u("photo-1509316975850-ff9c5deb0cd9"), u("photo-1513836279014-a89f7a76ae86")];
const galleryFrom = (startIdx, count) => {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(PHOTO_POOL[(startIdx + i) % PHOTO_POOL.length]);
  }
  return arr;
};
export const PROJECTS_PHOTOS = [{
  id: 1,
  title: "Black Fox",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988767/DSC05628_copy_fynwd6.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988785/IMG_6897_copy_hsbar0.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988784/IMG_6912_copy_qrbqag.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988783/IMG_6915_copy_ukxp4s.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988779/IMG_6920_copy_vupitr.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988778/IMG_7045_copy_vgmrqi.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988776/IMG_0218_copy_lyvi8u.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988775/DSC01937_copy_q9kj7b.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988774/DSC01960_copy_r4wboz.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988773/DSC01969_copy_cjsbuq.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988772/DSC01975_copy_gkwpaj.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988770/DSC07630_pypgmq.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988770/DSC07616_akfj3c.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988768/DSC05616_copy_jkwxlr.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988767/DSC05628_copy_fynwd6.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988766/DSC05687_copy_opejtb.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988765/DSC05601_copy_rva5cg.webp"],
  location: "Portsaid",
  year: "2024",
  category: "Portrait"
}, {
  id: 2,
  title: "88 breakfast",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988797/DSC00877_copy_udqkf8.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988798/DSC00874_copy_jsaat8.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988797/DSC00877_copy_udqkf8.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988796/DSC00962_nii1x4.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988795/DSC00942_sa8jf1.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988794/DSC00903_pdwtwq.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988792/DSC00893_jfspzl.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988791/DSC00890_br9d7g.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988790/DSC00870_rb8ryx.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988790/DSC00848_lavuja.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988788/DSC00856_rlx4yz.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988788/DSC00845_fv6lyr.webp"],
  location: "Portsaid",
  year: "2024",
  category: "F&B"
}, {
  id: 3,
  title: "El Mansory",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988682/IMG_5039_dcfh1s.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988682/IMG_5039_dcfh1s.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988683/IMG_5038_chxuih.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988683/IMG_5037_issazi.webp"],
  location: "Cairo",
  //lesa
  year: "2024",
  category: "F&B"
}, {
  id: 4,
  title: "Eye Town",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988576/IMG_5619_smd8rx.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988576/IMG_5619_smd8rx.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988578/IMG_5634_ceyb2y.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988578/IMG_5629_yowxgl.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5625_oc1byc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5635_xqvdu0.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5612_bxahwn.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5611_jejnqf.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988577/IMG_5652_ivzohg.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988576/IMG_5618_lakc9j.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988576/IMG_5645_bnxoni.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5647_giwgnd.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5642_ucxp0l.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5631_stpzmx.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5664_hnzfav.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988575/IMG_5606_nrn32s.webp"],
  location: "Portsaid",
  year: "2023",
  category: "Commercial"
}, {
  id: 5,
  title: "Honda Car",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988612/IMG_5345_fw2jet.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988612/IMG_5345_fw2jet.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988616/IMG_5343_e4bwp8.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988614/IMG_5346_mnogy2.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988614/IMG_5339_klpbug.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988614/IMG_5344_zf7xhi.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988613/IMG_5341_azzn3d.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988613/IMG_5342_ncevlm.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988615/IMG_5347_ovey5n.webp"],
  location: "Portsaid",
  year: "2023",
  category: "Commercial"
}, {
  id: 6,
  title: "Mimet",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988649/DSC03159_yolhpb.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988649/DSC03159_yolhpb.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988647/2_g9g1z5.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988646/1_wtawnp.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988645/DSC00318_rgjttc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988644/3_ixjuh3.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988643/4_rnakdy.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988643/DSC00367_bgtqdz.webp"],
  location: "Portsaid",
  year: "2023",
  category: "F&B"
}, {
  id: 7,
  title: "Black Fox",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988847/DSC07225_hpipoz.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988847/DSC07225_hpipoz.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988937/DSC01444_copy_kzv7aw.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988936/%D9%83%D9%88%D8%B1%D8%AA%D8%A7%D8%AF%D9%88_izb9sh.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988935/DSC07151_nfbzxc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988934/DSC07125_xgrimv.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988932/DSC07120_b5jzoz.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988931/DSC07118_ynxa7n.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988930/DSC07112_rarfmu.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988928/DSC07115_asajxe.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988927/DSC07110_k68fww.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988926/DSC07105_py9fg0.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988865/DSC07038_mpn5cq.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988864/DSC07542_hxfw7f.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988862/DSC07530_gnohdq.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988861/DSC07531_jmxfmo.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988860/DSC07533_hevude.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988859/DSC07536_qscute.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988858/DSC07528_hfvnk9.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988856/DSC07525_lypgdw.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988855/DSC07526_djkkix.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988854/DSC07484_ymofcj.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988853/DSC07487_pqg0xm.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988852/DSC07256_tcqwtf.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988851/DSC07480_ychf2a.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988848/DSC07240_vesp4f.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988849/DSC07233_urmurw.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988846/DSC07218_fmmztn.webp"],
  location: "Portsaid",
  year: "2023",
  category: "F&B"
}, {
  id: 8,
  title: "88 Cubs",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988706/DSC01518_hgmpn9.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988706/DSC01518_hgmpn9.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988711/DSC01482_kzoebq.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988710/DSC01484_fatulc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988710/DSC01487_qjahbc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988708/DSC01490_cuzoaa.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988707/DSC01492_prniox.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988705/DSC01521_br03d3.webp", ""],
  location: "Portsaid",
  year: "2023",
  category: "F&B"
}, {
  id: 9,
  title: "88 Cubs",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988727/DSC01792_copy_sj9ow0.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988727/DSC01792_copy_sj9ow0.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988732/DSC01871_copy_pv9wo5.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988731/DSC01836_copy_mq6nrk.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988729/DSC01876_copy_v8hvmw.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988728/DSC01878_copy_jnbu12.webp"],
  location: "Paris",
  year: "2023",
  category: "F&B"
}, {
  id: 10,
  title: "88 Cubs",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988830/DSC03234_copy_u7fd8n.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988830/DSC03234_copy_u7fd8n.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988844/DSC07381_rftxxl.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988843/DSC02539_tylx3l.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988842/DSC02525_svdaio.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988841/DSC02526_xypr2n.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988839/DSC02524_ykzgtc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988838/DSC02510_aqmmpk.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988837/DSC02273_gm3fcj.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988833/DSC02256_bgtt8m.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988832/DSC02252_aermie.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988831/DSC02254_x5fwzv.webp"],
  location: "Portsaid",
  year: "2023",
  category: "F&B"
}, {
  id: 11,
  title: "Shellos",
  description: "this is a description.",
  thumbnail: "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988749/DSC02631_kliyit.webp",
  images: ["https://res.cloudinary.com/dozykhkhe/image/upload/v1781988749/DSC02631_kliyit.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988755/DSC00551_ct2a1y.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988753/DSC00575_tvxjpl.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988752/DSC02586_k5vad5.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988750/DSC02594_jgovqe.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988756/DSC00528_bovksd.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988758/DSC00463_ji1adk.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988748/DSC02732_tvjksu.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988757/DSC00507_rgglot.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988753/DSC00609_vb6vql.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988761/DSC00455_d6uxuc.webp", "https://res.cloudinary.com/dozykhkhe/image/upload/v1781988762/DSC00422_aghkaw.webp"],
  location: "Portsaid",
  year: "2022",
  category: "F&B"
}, {
  id: 12,
  title: "-",
  description: "this is a description.",
  thumbnail: PHOTO_POOL[11],
  images: galleryFrom(11, 12),
  location: "NYC",
  year: "2021",
  category: "Portrait"
}, {
  id: 13,
  title: "-",
  description: "this is a description.",
  thumbnail: PHOTO_POOL[12],
  images: galleryFrom(12, 10),
  location: "Istanbul",
  year: "2021",
  category: "Fine Art"
}, {
  id: 14,
  title: "-",
  description: "this is a description.",
  thumbnail: PHOTO_POOL[13],
  images: galleryFrom(13, 11),
  location: "Mexico City",
  year: "2021",
  category: "F&B"
}, {
  id: 15,
  title: "-",
  description: "this is a description.",
  thumbnail: PHOTO_POOL[14],
  images: galleryFrom(14, 14),
  location: "Reykjavík",
  year: "2021",
  category: "Architecture"
}];

// ---------- Behind The Lens ----------

export const BTS_PHOTOS = [{
  id: 1,
  src: BTS1,
  caption: "On set — Cairo",
  location: "EGY"
}, {
  id: 2,
  src: BTS2,
  caption: "Lighting check",
  location: "LDN"
}, {
  id: 3,
  src: BTS3,
  caption: "Camera A-cam roll",
  location: "TYO"
}, {
  id: 4,
  src: BTS1,
  caption: "Reviewing the take",
  location: "MAR"
}, {
  id: 5,
  src: BTS2,
  caption: "Dolly rehearsal",
  location: "PRS"
}, {
  id: 6,
  src: BTS3,
  caption: "Golden hour",
  location: "DXB"
}, {
  id: 7,
  src: BTS1,
  caption: "Wardrobe & cast",
  location: "BCN"
}, {
  id: 8,
  src: BTS2,
  caption: "Wrap — last frame",
  location: "NYC"
}];