export type Gambar = {
  korea: string;
  indonesia: string;
  emoji: string;
  tahun: "2015" | "2024";
  bab: number;
};

export const tahunGambar = ["2015", "2024"] as const;

export const daftarGambar: Gambar[] = [
  // ===== Buku 2015 =====
  { korea: "의사", indonesia: "Dokter", emoji: "🧑‍⚕️", tahun: "2015", bab: 1 },
  { korea: "학생", indonesia: "Pelajar", emoji: "🧑‍🎓", tahun: "2015", bab: 1 },
  { korea: "동티모르", indonesia: "Timor Leste", emoji: "🇹🇱", tahun: "2015", bab: 1 },
  { korea: "태국", indonesia: "Thailand", emoji: "🇹🇭", tahun: "2015", bab: 1 },

  { korea: "가족", indonesia: "Keluarga", emoji: "👨‍👩‍👧‍👦", tahun: "2015", bab: 2 },
  { korea: "아버지", indonesia: "Ayah", emoji: "👨", tahun: "2015", bab: 2 },
  { korea: "어머니", indonesia: "Ibu", emoji: "👩", tahun: "2015", bab: 2 },
  { korea: "아기", indonesia: "Bayi", emoji: "👶", tahun: "2015", bab: 2 },

  { korea: "시계", indonesia: "Jam", emoji: "🕐", tahun: "2015", bab: 3 },
  { korea: "달력", indonesia: "Kalender", emoji: "📅", tahun: "2015", bab: 3 },
  { korea: "숫자", indonesia: "Angka", emoji: "🔢", tahun: "2015", bab: 3 },

  { korea: "회사", indonesia: "Perusahaan", emoji: "🏢", tahun: "2015", bab: 4 },
  { korea: "공장", indonesia: "Pabrik", emoji: "🏭", tahun: "2015", bab: 4 },
  { korea: "사무실", indonesia: "Kantor", emoji: "🖥️", tahun: "2015", bab: 4 },

  { korea: "망치", indonesia: "Palu", emoji: "🔨", tahun: "2015", bab: 5 },
  { korea: "장갑", indonesia: "Sarung tangan", emoji: "🧤", tahun: "2015", bab: 5 },
  { korea: "드라이버", indonesia: "Obeng", emoji: "🪛", tahun: "2015", bab: 5 },
  { korea: "사다리", indonesia: "Tangga", emoji: "🪜", tahun: "2015", bab: 5 },

  { korea: "안전모", indonesia: "Helm keselamatan", emoji: "⛑️", tahun: "2015", bab: 6 },
  { korea: "소화기", indonesia: "Alat pemadam api", emoji: "🧯", tahun: "2015", bab: 6 },
  { korea: "경고", indonesia: "Peringatan", emoji: "⚠️", tahun: "2015", bab: 6 },

  { korea: "아침", indonesia: "Pagi", emoji: "🌅", tahun: "2015", bab: 7 },
  { korea: "세수", indonesia: "Cuci muka", emoji: "🚿", tahun: "2015", bab: 7 },
  { korea: "잠", indonesia: "Tidur", emoji: "😴", tahun: "2015", bab: 7 },

  { korea: "시장", indonesia: "Pasar", emoji: "🏪", tahun: "2015", bab: 8 },
  { korea: "돈", indonesia: "Uang", emoji: "💵", tahun: "2015", bab: 8 },
  { korea: "과일", indonesia: "Buah", emoji: "🍎", tahun: "2015", bab: 8 },

  { korea: "지하철", indonesia: "Kereta bawah tanah", emoji: "🚇", tahun: "2015", bab: 9 },
  { korea: "버스", indonesia: "Bus", emoji: "🚌", tahun: "2015", bab: 9 },
  { korea: "자전거", indonesia: "Sepeda", emoji: "🚲", tahun: "2015", bab: 9 },

  { korea: "병원", indonesia: "Rumah sakit", emoji: "🏥", tahun: "2015", bab: 10 },
  { korea: "약", indonesia: "Obat", emoji: "💊", tahun: "2015", bab: 10 },
  { korea: "주사", indonesia: "Suntik", emoji: "💉", tahun: "2015", bab: 10 },

  // ===== Buku 2024 =====
  { korea: "여권", indonesia: "Paspor", emoji: "🛂", tahun: "2024", bab: 1 },
  { korea: "비행기", indonesia: "Pesawat", emoji: "✈️", tahun: "2024", bab: 1 },
  { korea: "인도네시아", indonesia: "Indonesia", emoji: "🇮🇩", tahun: "2024", bab: 1 },

  { korea: "친구", indonesia: "Teman", emoji: "🧑‍🤝‍🧑", tahun: "2024", bab: 2 },
  { korea: "기숙사", indonesia: "Asrama", emoji: "🏠", tahun: "2024", bab: 2 },
  { korea: "전화", indonesia: "Telepon", emoji: "📞", tahun: "2024", bab: 2 },

  { korea: "밥", indonesia: "Nasi", emoji: "🍚", tahun: "2024", bab: 3 },
  { korea: "김치", indonesia: "Kimchi", emoji: "🥬", tahun: "2024", bab: 3 },
  { korea: "물", indonesia: "Air", emoji: "💧", tahun: "2024", bab: 3 },

  { korea: "용접", indonesia: "Las", emoji: "🔥", tahun: "2024", bab: 4 },
  { korea: "기계", indonesia: "Mesin", emoji: "⚙️", tahun: "2024", bab: 4 },
  { korea: "상자", indonesia: "Kardus", emoji: "📦", tahun: "2024", bab: 4 },

  { korea: "농장", indonesia: "Peternakan", emoji: "🐄", tahun: "2024", bab: 5 },
  { korea: "논", indonesia: "Sawah", emoji: "🌾", tahun: "2024", bab: 5 },
  { korea: "트랙터", indonesia: "Traktor", emoji: "🚜", tahun: "2024", bab: 5 },

  { korea: "어선", indonesia: "Kapal nelayan", emoji: "🚢", tahun: "2024", bab: 6 },
  { korea: "생선", indonesia: "Ikan", emoji: "🐟", tahun: "2024", bab: 6 },
  { korea: "그물", indonesia: "Jaring", emoji: "🕸️", tahun: "2024", bab: 6 },

  { korea: "은행", indonesia: "Bank", emoji: "🏦", tahun: "2024", bab: 7 },
  { korea: "카드", indonesia: "Kartu", emoji: "💳", tahun: "2024", bab: 7 },
  { korea: "우체국", indonesia: "Kantor pos", emoji: "📮", tahun: "2024", bab: 7 },

  { korea: "비", indonesia: "Hujan", emoji: "🌧️", tahun: "2024", bab: 8 },
  { korea: "눈", indonesia: "Salju", emoji: "❄️", tahun: "2024", bab: 8 },
  { korea: "바람", indonesia: "Angin", emoji: "🌬️", tahun: "2024", bab: 8 },

  { korea: "축구", indonesia: "Sepak bola", emoji: "⚽", tahun: "2024", bab: 9 },
  { korea: "등산", indonesia: "Mendaki gunung", emoji: "🥾", tahun: "2024", bab: 9 },
  { korea: "음악", indonesia: "Musik", emoji: "🎵", tahun: "2024", bab: 9 },

  { korea: "한복", indonesia: "Pakaian tradisional Korea", emoji: "👘", tahun: "2024", bab: 10 },
  { korea: "설날", indonesia: "Tahun baru Korea", emoji: "🎎", tahun: "2024", bab: 10 },
  { korea: "태극기", indonesia: "Bendera Korea", emoji: "🇰🇷", tahun: "2024", bab: 10 },
];

export function gambarBuku(tahun: string, bab?: number) {
  return daftarGambar.filter(
    (item) => item.tahun === tahun && (bab === undefined || item.bab === bab),
  );
}

export function babGambar(tahun: string) {
  return [...new Set(gambarBuku(tahun).map((item) => item.bab))].sort((a, b) => a - b);
}
