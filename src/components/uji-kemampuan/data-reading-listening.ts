// src/components/uji-kemampuan/data-reading-listening.ts
// Bank soal Reading & Listening format mirip UBT EPS-TOPIK

export type Soal = {
  id: number;
  pertanyaan: string;
  gambarKeterangan?: string;
  audioTeks?: string;
  pilihan: string[];
  jawaban: number; // index 0-3
  pembahasan?: string;
};

export type KategoriSoal = {
  id: string;
  judul: string;
  tipe: "reading" | "listening";
  ringkas: string;
  durasiDetik: number;
  soal: Soal[];
};

export const kategoriReading: KategoriSoal[] = [
  {
    id: "reading-kosakata",
    judul: "Kosakata Dasar (어휘)",
    tipe: "reading",
    ringkas: "Pilih arti kata yang tepat sesuai gambar atau kalimat.",
    durasiDetik: 600,
    soal: [
      {
        id: 1,
        pertanyaan: "다음 그림을 보고 알맞은 것을 고르십시오. (Gambar: helm keselamatan)",
        gambarKeterangan: "Helm keselamatan kerja",
        pilihan: ["안전모", "장갑", "작업복", "안전화"],
        jawaban: 0,
        pembahasan: "안전모 = helm keselamatan.",
      },
      {
        id: 2,
        pertanyaan: "빈칸에 알맞은 것을 고르십시오. 저는 공장에서 ( ) 합니다.",
        pilihan: ["일을", "밥을", "잠을", "옷을"],
        jawaban: 0,
        pembahasan: "일을 하다 = bekerja.",
      },
      {
        id: 3,
        pertanyaan: "'월급' 의 뜻은 무엇입니까?",
        pilihan: ["Upah bulanan", "Lembur", "Cuti", "Kontrak"],
        jawaban: 0,
      },
      {
        id: 4,
        pertanyaan: "빈칸에 알맞은 것을 고르십시오. 기계를 ( ) 전에 전원을 끄십시오.",
        pilihan: ["수리하기", "먹기", "입기", "자기"],
        jawaban: 0,
      },
    ],
  },
  {
    id: "reading-tata-bahasa",
    judul: "Tata Bahasa (문법)",
    tipe: "reading",
    ringkas: "Lengkapi kalimat dengan partikel dan akhiran yang benar.",
    durasiDetik: 600,
    soal: [
      {
        id: 1,
        pertanyaan: "저는 인도네시아( ) 왔습니다.",
        pilihan: ["에서", "에게", "으로", "와"],
        jawaban: 0,
        pembahasan: "에서 menyatakan asal tempat.",
      },
      {
        id: 2,
        pertanyaan: "일이 많아서 어제 늦게까지 ( ).",
        pilihan: ["일했습니다", "일하겠습니다", "일할까요", "일하십시오"],
        jawaban: 0,
      },
      {
        id: 3,
        pertanyaan: "비가 오( ) 우산을 가져가세요.",
        pilihan: ["니까", "지만", "거나", "면서"],
        jawaban: 0,
      },
      {
        id: 4,
        pertanyaan: "이 기계는 위험하( ) 조심하십시오.",
        pilihan: ["니까", "고요", "는데요", "잖아요"],
        jawaban: 0,
      },
    ],
  },
  {
    id: "reading-bacaan",
    judul: "Pemahaman Bacaan (독해)",
    tipe: "reading",
    ringkas: "Baca pengumuman singkat lalu jawab pertanyaannya.",
    durasiDetik: 720,
    soal: [
      {
        id: 1,
        pertanyaan:
          "[공지] 이번 주 토요일은 안전 교육이 있습니다. 오전 9시에 3층 회의실로 오십시오. — 안전 교육은 언제 합니까?",
        pilihan: ["토요일 오전 9시", "금요일 오후 3시", "일요일 오전 10시", "월요일 오전 8시"],
        jawaban: 0,
      },
      {
        id: 2,
        pertanyaan: "위 공지에서 교육 장소는 어디입니까?",
        pilihan: ["3층 회의실", "1층 식당", "공장 앞", "사무실"],
        jawaban: 0,
      },
      {
        id: 3,
        pertanyaan:
          "[안내] 기계 점검으로 오늘 오후 2시부터 4시까지 작업을 멈춥니다. — 작업은 몇 시간 멈춥니까?",
        pilihan: ["2시간", "1시간", "3시간", "4시간"],
        jawaban: 0,
      },
    ],
  },
];

export const kategoriListening: KategoriSoal[] = [
  {
    id: "listening-gambar",
    judul: "Dengar & Pilih Gambar (그림 듣기)",
    tipe: "listening",
    ringkas: "Dengarkan kalimat lalu pilih gambar/jawaban yang sesuai.",
    durasiDetik: 600,
    soal: [
      {
        id: 1,
        pertanyaan: "잘 듣고 알맞은 것을 고르십시오.",
        audioTeks: "남자가 안전모를 쓰고 있습니다.",
        pilihan: [
          "Pria memakai helm keselamatan",
          "Pria memakai sarung tangan",
          "Pria sedang makan",
          "Pria sedang tidur",
        ],
        jawaban: 0,
      },
      {
        id: 2,
        pertanyaan: "잘 듣고 알맞은 것을 고르십시오.",
        audioTeks: "여자가 상자를 옮기고 있습니다.",
        pilihan: [
          "Wanita memindahkan kardus",
          "Wanita menyapu lantai",
          "Wanita menelepon",
          "Wanita mengendarai forklift",
        ],
        jawaban: 0,
      },
      {
        id: 3,
        pertanyaan: "잘 듣고 알맞은 것을 고르십시오.",
        audioTeks: "기계에서 연기가 납니다.",
        pilihan: ["Mesin mengeluarkan asap", "Mesin mati", "Mesin baru", "Mesin bersih"],
        jawaban: 0,
      },
    ],
  },
  {
    id: "listening-percakapan",
    judul: "Percakapan Kerja (대화 듣기)",
    tipe: "listening",
    ringkas: "Dengarkan percakapan di tempat kerja lalu jawab pertanyaan.",
    durasiDetik: 720,
    soal: [
      {
        id: 1,
        pertanyaan: "대화를 듣고 질문에 답하십시오. 남자는 무엇을 부탁했습니까?",
        audioTeks: "남: 이 상자를 창고로 옮겨 주세요. 여: 네, 알겠습니다.",
        pilihan: ["상자 옮기기", "청소하기", "전화하기", "기계 고치기"],
        jawaban: 0,
      },
      {
        id: 2,
        pertanyaan: "대화를 듣고 질문에 답하십시오. 여자는 왜 병원에 갑니까?",
        audioTeks: "여: 어제 손을 다쳐서 병원에 가야 합니다.",
        pilihan: ["손을 다쳤기 때문에", "감기 때문에", "건강검진 때문에", "약을 사려고"],
        jawaban: 0,
      },
      {
        id: 3,
        pertanyaan: "대화를 듣고 질문에 답하십시오. 작업은 몇 시에 시작합니까?",
        audioTeks: "남: 내일 작업은 아침 8시에 시작합니다.",
        pilihan: ["8시", "9시", "7시", "10시"],
        jawaban: 0,
      },
    ],
  },
];

export function getKategoriSoal(id: string) {
  return [...kategoriReading, ...kategoriListening].find((k) => k.id === id);
}
