/**
 * Wedding invitation content & event details.
 *
 * Update WEDDING_DETAILS below when the wedding date and times are finalized.
 */

export type Language = "en" | "ar";

/** Easy-to-edit placeholders — replace these when details are confirmed */
export const WEDDING_DETAILS = {
  date: {
    en: "Sunday, August 23, 2026",
    ar: "الأحد، ٢٣ أغسطس ٢٠٢٦",
  },
  ceremonyTime: {
    en: "3:30 PM",
    ar: "٣:٣٠ مساءً",
  },
  receptionTime: {
    en: "7:00 PM",
    ar: "٧:٠٠ مساءً",
  },
} as const;

export const invitation = {
  initials: "N & V",
  groom: {
    en: "Nader Nabil",
    ar: "نادر نبيل",
  },
  bride: {
    en: "Veronia George",
    ar: "فيرونيا جورج",
  },
  coupleNames: {
    en: "Nader Nabil & Veronia George",
    ar: "نادر نبيل وفيرونيا جورج",
  },
  meta: {
    title: {
      en: "N & V — Wedding Invitation",
      ar: "ن و ف — دعوة زفاف",
    },
    description: {
      en: "You are joyfully invited to celebrate the wedding of Nader Nabil and Veronia George.",
      ar: "تتشرف العائلتان بدعوتكم لحضور حفل زفاف نادر نبيل وفيرونيا جورج.",
    },
  },
  envelope: {
    openLabel: {
      en: "Open Invitation",
      ar: "افتح الدعوة",
    },
  },
  languageToggle: {
    enLabel: "English",
    arLabel: "العربية",
  },
  hero: {
    preamble: {
      en: "Together with their families",
      ar: "بكل الفرح والمحبة، تتشرف العائلتان بدعوتكم لحضور حفل زفاف",
    },
    invite: {
      en: "joyfully invite you to celebrate their wedding.",
      ar: "",
    },
  },
  dateSection: {
    label: {
      en: "Save the Date",
      ar: "احفظوا الموعد",
    },
    ceremonyLabel: {
      en: "Ceremony",
      ar: "الإكليل",
    },
    receptionLabel: {
      en: "Reception",
      ar: "الاستقبال",
    },
  },
  church: {
    sectionTitle: {
      en: "Church Ceremony",
      ar: "حفل الكنيسة",
    },
    name: {
      en: "Church of Archangel Michael, Moustafa Kamel",
      ar: "كنيسة رئيس الملائكة الجليل ميخائيل - مصطفى كامل",
    },
    mapUrl: "https://maps.app.goo.gl/WG4VgsdYi8Wh1yF19",
    mapButton: {
      en: "Open Church Location",
      ar: "فتح موقع الكنيسة",
    },
  },
  hall: {
    sectionTitle: {
      en: "Wedding Reception",
      ar: "قاعة الفرح",
    },
    address: {
      en: "The intersection of the far end of El Malek St. and Mustafa Kamel St., El Montazah",
      ar: "تقاطع آخر شارع الملك مع شارع مصطفى كامل - المنتزه",
    },
    mapUrl: "https://maps.app.goo.gl/3Y7KMvHEMF8VERcw6",
    mapButton: {
      en: "Open Hall Location",
      ar: "فتح موقع القاعة",
    },
    guideButton: {
      en: "View Location Guide",
      ar: "عرض صورة توضيح الموقع",
    },
  },
  locationGuide: {
    title: {
      en: "Hall Location Guide",
      ar: "صورة توضيح موقع القاعة",
    },
    close: {
      en: "Close",
      ar: "إغلاق",
    },
    placeholder: {
      en: "Add the clarification image at public/guide.jpeg",
      ar: "أضف صورة التوضيح في المسار public/guide.jpeg",
    },
    alt: {
      en: "A stylized gold and ivory map sketch showing directions to Hayat Halls in the Montazah area, featuring landmarks like the Corniche, Sheraton Montazah, and King Street.",
      ar: "رسم توضيحي أنيق يوضح الطريق إلى قاعات حياة في المنتزه مع معالم مثل الكورنيش وشيراتون المنتزه وشارع الملك.",
    },
  },
  closing: {
    en: "We cannot wait to celebrate this special day with you.",
    ar: "يسعدنا أن تشاركونا فرحتنا في هذا اليوم المميز.",
  },
  footer: {
    withLove: {
      en: "With love",
      ar: "بكل حب",
    },
  },
} as const;

export type InvitationCopy = typeof invitation;
