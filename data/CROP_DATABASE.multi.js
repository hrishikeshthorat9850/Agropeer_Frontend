// path: /data/CROP_DATABASE.multi.js
import { CROP_DATABASE as CROP_DATABASE_EN } from "./CROP_DATABASE";
import { CROP_DATABASE as CROP_DATABASE_HI } from "./CROP_DATABASE.hi";
import { CROP_DATABASE as CROP_DATABASE_MR } from "./CROP_DATABASE.mr";

// ✅ Combined multilingual database
export const CROP_DATABASE = {
  en: CROP_DATABASE_EN,
  hi: CROP_DATABASE_HI,
  mr: CROP_DATABASE_MR,
};
