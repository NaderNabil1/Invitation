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

/** Countdown target as Africa/Cairo wall-clock time (no offset suffix). */
export const WEDDING_COUNTDOWN_AT = "2026-08-23T16:00:00";

export const invitation = {
  initials: "N & V",
  initialsWord: {
    en: "Nader & Veronia",
    ar: "نادر وفيرونيا",
  },
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
      ar: "نادر وفيرونيا — دعوة زفاف",
    },
    description: {
      en: "You are joyfully invited to celebrate the wedding of Nader Nabil and Veronia George.",
      ar: "تتشرف العائلتان بدعوتكم لحضور حفل زفاف نادر نبيل وفيرونيا جورج.",
    },
  },
  envelope: {
    eyebrow: {
      en: "Society News",
      ar: "خبر سعيد",
    },
    headline: {
      en: "An Unmissable Event",
      ar: "مناسبة لا تُفوَّت",
    },
    subhead: {
      en: "The Union of Nader & Veronia",
      ar: "زفاف نادر وفيرونيا",
    },
    openLabel: {
      en: "Tap the seal to open",
      ar: "اضغط على الختم لفتح الدعوة",
    },
  },
  languageToggle: {
    enLabel: "English",
    arLabel: "العربية",
  },
  hero: {
    scripture: {
      en: [
        "For now I have chosen and sanctified this house, that My name may be there forever; and My eyes and My heart will be there perpetually. (2 Chronicles 7:16)",
      ],
      ar: [
        "الآنَ قَدِ اخْتَرْتُ وَقَدَّسْتُ هذَا الْبَيْتَ لِيَكُونَ اسْمِي فِيهِ إِلَى الأَبَدِ، وَتَكُونُ عَيْنَايَ وَقَلْبِي هُنَاكَ كُلَّ الأَيَّامِ (سفر أخبار الأيام الثاني 7: 16)",
      ],
    },
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
  countdown: {
    label: {
      en: "Counting Down",
      ar: "العد التنازلي",
    },
    days: {
      en: "Days",
      ar: "أيام",
    },
    hours: {
      en: "Hours",
      ar: "ساعات",
    },
    minutes: {
      en: "Minutes",
      ar: "دقائق",
    },
    seconds: {
      en: "Seconds",
      ar: "ثوانٍ",
    },
    arrivedLabel: {
      en: "It's Time",
      ar: "حان الموعد",
    },
    arrived: {
      en: "The celebration begins",
      ar: "بدأت الفرحة",
    },
    arrivedSub: {
      en: "Today, love takes the aisle",
      ar: "اليوم يكتمل الفرح",
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
