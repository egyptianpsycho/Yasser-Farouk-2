// Unsplash placeholders — stable photo IDs, neutral/cinematic
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const HERO_BG = u("photo-1518709268805-4e9042af2176", 1920);
export const REEL_IMG = u("photo-1485846234645-a62644f84728", 1800);
export const VIDEO_IMAGES = [u("photo-1492144534655-ae79c964c9d7"), u("photo-1505735050841-d0918b3b6dab"), u("photo-1517457373958-b7bdd4587205"), u("photo-1517604931442-7e0c8ed2963c"), u("photo-1478720568477-152d9b164e26"), u("photo-1493804714600-6edb1cd93080"), u("photo-1500964757637-c85e8a162699"), u("photo-1506794778202-cad84cf45f1d"), u("photo-1519681393784-d120267933ba"), u("photo-1502082553048-f009c37129b9"), u("photo-1526478806334-5fd488fcaabc"), u("photo-1499781350541-7783f6c6a0c8"), u("photo-1524985069026-dd778a71c7b4"), u("photo-1485846234645-a62644f84728")];
export const STILL_IMAGES = [u("photo-1506794778202-cad84cf45f1d"), u("photo-1519681393784-d120267933ba"), u("photo-1500964757637-c85e8a162699"), u("photo-1502082553048-f009c37129b9")];
export const BTS_IMAGES = [{
  src: u("photo-1485846234645-a62644f84728", 1400),
  caption: "On set — Cairo",
  loc: "EGY"
}, {
  src: u("photo-1492691527719-9d1e07e534b4", 1400),
  caption: "Lighting check",
  loc: "LDN"
}, {
  src: u("photo-1518930259200-3e5b34c2b58a", 1400),
  caption: "Camera A-cam roll",
  loc: "TYO"
}, {
  src: u("photo-1500210600040-aaa173a40bc7", 1400),
  caption: "Reviewing the take",
  loc: "MAR"
}, {
  src: u("photo-1524024973431-2ad916746881", 1400),
  caption: "Dolly rehearsal",
  loc: "PRS"
}, {
  src: u("photo-1505686994434-e3cc5abf1330", 1400),
  caption: "Golden hour",
  loc: "DXB"
}, {
  src: u("photo-1496559249665-c7e2874707ea", 1400),
  caption: "Wardrobe & cast",
  loc: "BCN"
}, {
  src: u("photo-1542038784456-1ea8e935640e", 1400),
  caption: "Wrap — last frame",
  loc: "NYC"
}];
export const PHOTO_PROJECT_IMAGES = [u("photo-1542038784456-1ea8e935640e"), u("photo-1496588152823-86ff7695e68f"), u("photo-1519125323398-675f0ddb6308"), u("photo-1473625247510-8ceb1760943f"), u("photo-1469474968028-56623f02e42e"), u("photo-1470770841072-f978cf4d019e"), u("photo-1447752875215-b2761acb3c5d"), u("photo-1426604966848-d7adac402bff"), u("photo-1500382017468-9049fed747ef"), u("photo-1501785888041-af3ef285b470"), u("photo-1432405972618-c60b0225b8f9"), u("photo-1465146344425-f00d5f5c8f07"), u("photo-1482938289607-e9573fc25ebb"), u("photo-1509316975850-ff9c5deb0cd9"), u("photo-1513836279014-a89f7a76ae86")];
export const IMG = u;