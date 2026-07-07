import { localeString, localeText, localeBlock, localeSlug } from "./objects/locale";
import { seoImage } from "./objects/seoImage";
import { branch } from "./documents/branch";
import { tuitionTable } from "./documents/tuition";
import {
  newsPost,
  schoolEvent,
  galleryAlbum,
  testimonial,
  faqItem,
  careerOpening,
} from "./documents/content";
import { siteSettings } from "./documents/siteSettings";

export const schemaTypes = [
  // objects
  localeString,
  localeText,
  localeBlock,
  localeSlug,
  seoImage,
  // documents
  siteSettings,
  branch,
  tuitionTable,
  newsPost,
  schoolEvent,
  galleryAlbum,
  testimonial,
  faqItem,
  careerOpening,
];
