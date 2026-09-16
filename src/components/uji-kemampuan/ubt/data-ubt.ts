import { UbtKategori, SoalUbt } from "./types";

function createSetSoal(): SoalUbt[] {
  const soalList: SoalUbt[] = [];

  // Soal 1-20: Soal Bacaan (Reading)
  const bacaanDefs: Omit<SoalUbt, "nomor" | "bagian">[] = [
    {
      jenisSoal: "[1~2] 다음 그림을 보고 맞는 단어나 문장을 고르십시오.",
      soal: "그림을 보고 알맞은 단어를 고르십시오.\n[그림: 모자 / Topi]",
      pilihan: [
        { id: "A", teks: "모자입니다." },
        { id: "B", teks: "안경입니다." },
        { id: "C", teks: "가방입니다." },
        { id: "D", teks: "구두입니다." },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA gambar menunjukkan sebuah topi (모자). Pilihan B (안경/kacamata), C (가방/tas), dan D (구두/sepatu) tidak sesuai dengan gambar.",
    },
    {
      jenisSoal: "[1~2] 다음 그림을 보고 맞는 단어나 문장을 고르십시오.",
      soal: "그림을 보고 사람이 무엇을 하고 있는지 고르십시오.\n[그림: 청소를 하고 있습니다 / Sedang bersih-bersih]",
      pilihan: [
        { id: "A", teks: "빨래를 하고 있습니다." },
        { id: "B", teks: "요리를 하고 있습니다." },
        { id: "C", teks: "청소를 하고 있습니다." },
        { id: "D", teks: "운전을 하고 있습니다." },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA orang di gambar sedang menyapu/membersihkan ruangan (청소하다). Bukan mencuci baju (A), memasak (B), atau menyetir (D).",
    },
    {
      jenisSoal: "[3~4] 다음 질문에 답하십시오.",
      soal: "다음 단어들과 관계있는 것은 무엇입니까?\n[ 봄, 여름, 가을, 겨울 ]",
      pilihan: [
        { id: "A", teks: "계절" },
        { id: "B", teks: "날씨" },
        { id: "C", teks: "요일" },
        { id: "D", teks: "시간" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA 봄 (musim semi), 여름 (musim panas), 가을 (musim gugur), dan 겨울 (musim dingin) adalah nama-nama musim (계절).",
    },
    {
      jenisSoal: "[3~4] 다음 질문에 답하십시오.",
      soal: "다음 단어의 반대말은 무엇입니까?\n[ 가깝다 (Dekat) ]",
      pilihan: [
        { id: "A", teks: "멀다" },
        { id: "B", teks: "좁다" },
        { id: "C", teks: "넓다" },
        { id: "D", teks: "높다" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA lawan kata (반대말) dari 가깝다 (dekat) adalah 멀다 (jauh). Pilihan B (sempit), C (luas), D (tinggi).",
    },
    {
      jenisSoal: "[5~8] 빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
      soal: "한국에 갈 때 비행기 표가 필요합니다. 내일 여행사에 가서 표를 ________.",
      pilihan: [
        { id: "A", teks: "샀습니다" },
        { id: "B", teks: "살 겁니다" },
        { id: "C", teks: "삽니다" },
        { id: "D", teks: "사지 않았습니다" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA ada penanda waktu masa depan '내일' (besok), sehingga bentuk yang tepat adalah ~(으)ㄹ 겁니다 (살 겁니다 / akan membeli).",
    },
    {
      jenisSoal: "[5~8] 빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
      soal: "식당에서 음식을 다 먹은 후에 카드로 계산을 했습니다. 직원이 저에게 ________을/를 주었습니다.",
      pilihan: [
        { id: "A", teks: "영수증" },
        { id: "B", teks: "지갑" },
        { id: "C", teks: "메뉴판" },
        { id: "D", teks: "주문서" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA setelah membayar, staf memberikan bukti pembayaran berupa struk/nota (영수증).",
    },
    {
      jenisSoal: "[5~8] 빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
      soal: "공장에서 일할 때는 항상 안전모와 안전화를 ________ 합니다.",
      pilihan: [
        { id: "A", teks: "타야" },
        { id: "B", teks: "입어야" },
        { id: "C", teks: "착용해야" },
        { id: "D", teks: "마셔야" },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA untuk peralatan pelindung diri (APD) seperti helm dan sepatu keselamatan, kosakata yang tepat adalah 착용하다 (mengenakan/memakai APD).",
    },
    {
      jenisSoal: "[5~8] 빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
      soal: "가: 어디에서 살아요?\n나: 회사 ________에 살아요. 회사와 가까워서 걸어서 출퇴근합니다.",
      pilihan: [
        { id: "A", teks: "기숙사" },
        { id: "B", teks: "병원" },
        { id: "C", teks: "우체국" },
        { id: "D", teks: "은행" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA tempat tinggal dekat perusahaan tempat pekerja menginap adalah asrama (기숙사).",
    },
    {
      jenisSoal: "[9~12] 다음 질문에 답하십시오.",
      soal: "이 표지판은 무슨 뜻입니까?\n[표지판: 물로 씻지 마시오 / Dilarang menyiram dengan air]",
      pilihan: [
        { id: "A", teks: "물을 마시면 안 됩니다." },
        { id: "B", teks: "물을 사용해서 씻으면 안 됩니다." },
        { id: "C", teks: "물을 버리십시오." },
        { id: "D", teks: "물에 손을 넣으십시오." },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA tanda tersebut melarang membersihkan/mencuci menggunakan air (물로 씻으면 안 됩니다), biasanya untuk mencegah korsleting atau kerusakan bahan.",
    },
    {
      jenisSoal: "[9~12] 다음 질문에 답하십시오.",
      soal: "다음 안내문의 내용과 다른 것을 고르십시오.\n[외국인 근로자 무료 진료 안내: 매월 둘째 주 일요일 14:00~17:00, 장소: 주민센터 2층]",
      pilihan: [
        { id: "A", teks: "진료비는 무료입니다." },
        { id: "B", teks: "일요일에 진료를 받을 수 있습니다." },
        { id: "C", teks: "진료는 오전 9시부터 시작합니다." },
        { id: "D", teks: "외국인 근로자를 위한 프로그램입니다." },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA pengumuman menuliskan jadwal mulai pukul 14:00, bukan pukul 9 pagi (오전 9시). Jadi pernyataan C berbeda dengan isi pengumuman.",
    },
    {
      jenisSoal: "[9~12] 다음 질문에 답하십시오.",
      soal: "다음 그래프를 보고 맞지 않는 것을 고르십시오.\n[좋아하는 한국 음식: 불고기 45%, 비빔밥 30%, 삼겹살 15%, 김치찌개 10%]",
      pilihan: [
        { id: "A", teks: "불고기를 가장 좋아합니다." },
        { id: "B", teks: "김치찌개를 좋아하는 사람이 가장 적습니다." },
        { id: "C", teks: "비빔밥보다 삼겹살을 더 좋아합니다." },
        { id: "D", teks: "두 번째로 인기가 많은 음식은 비빔밥입니다." },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA persentase 삼겹살 (15%) lebih rendah daripada 비빔밥 (30%), sehingga pernyataan 'lebih menyukai samgyeopsal daripada bibimbap' tidak sesuai grafik.",
    },
    {
      jenisSoal: "[9~12] 다음 질문에 답하십시오.",
      soal: "다음 약 봉투를 보고 복약 방법에 대한 설명으로 맞는 것을 고르십시오.\n[약 봉투: 하루 3회, 식후 30분, 1회 1포, 3일분]",
      pilihan: [
        { id: "A", teks: "밥을 먹기 전에 약을 먹어야 합니다." },
        { id: "B", teks: "하루에 세 번 먹습니다." },
        { id: "C", teks: "한 번에 두 포씩 먹습니다." },
        { id: "D", teks: "일주일 동안 먹는 약입니다." },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA '하루 3회' berarti diminum tiga kali sehari. Pilihan A salah karena '식후 30분' berarti 30 menit setelah makan.",
    },
    {
      jenisSoal: "[13~14] 빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
      soal: "프레스 작업을 할 때에는 집중해야 합니다. 방심하면 손을 크게 다칠 수 ________.",
      pilihan: [
        { id: "A", teks: "있기 때문입니다" },
        { id: "B", teks: "없기 때문입니다" },
        { id: "C", teks: "있도록 합니다" },
        { id: "D", teks: "없도록 합니다" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA alasan harus berkonsentrasi adalah karena tangan bisa terluka parah jika lengah (~ㄹ 수 있기 때문입니다).",
    },
    {
      jenisSoal: "[13~14] 빈칸에 들어갈 가장 알맞은 것을 고르십시오.",
      soal: "월급날에는 통장으로 기본급과 연장근로수당이 함께 ________.",
      pilihan: [
        { id: "A", teks: "출금됩니다" },
        { id: "B", teks: "입금됩니다" },
        { id: "C", teks: "환전됩니다" },
        { id: "D", teks: "송금됩니다" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA gaji yang masuk ke rekening bank disebut 입금되다 (ter-setor/masuk). 출금 berarti keluar (penarikan).",
    },
    {
      jenisSoal: "[15~16] 다음 글을 읽고 무엇에 대한 글인지 고르십시오.",
      soal: "저는 인도네시아에서 온 리키입니다. 작년에 한국에 와서 자동차 부품 공장에서 일하고 있습니다. 한국어 공부도 열심히 하고 주말에는 친구들과 축구를 합니다.",
      pilihan: [
        { id: "A", teks: "자기소개" },
        { id: "B", teks: "취미 활동" },
        { id: "C", teks: "휴일 계획" },
        { id: "D", teks: "회사 규칙" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA teks memperkenalkan nama, asal negara, pekerjaan, dan kegiatan sehari-hari, yang merupakan perkenalan diri (자기소개).",
    },
    {
      jenisSoal: "[15~16] 다음 글을 읽고 무엇에 대한 글인지 고르십시오.",
      soal: "물건을 만든 후에는 불량품이 없는지 꼼꼼히 확인해야 합니다. 만약 이상이 있는 제품을 발견하면 반장님께 바로 보고하고 따로 분류해 두어야 합니다.",
      pilihan: [
        { id: "A", teks: "품질 검사 및 보고" },
        { id: "B", teks: "출퇴근 관리" },
        { id: "C", teks: "기계 청소 방법" },
        { id: "D", teks: "급여 계산 방법" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA teks membahas pengecekan produk cacat (불량품 확인) dan pelaporan ke pengawas, yaitu pemeriksaan kualitas dan pelaporan.",
    },
    {
      jenisSoal: "[17~18] 다음 글을 읽고 내용과 같은 것을 고르십시오.",
      soal: "한국의 추석은 음력 8월 15일로 큰 명절 중 하나입니다. 가족들이 다 함께 모여 송편을 만들고 차례를 지냅니다. 또한 보름달을 보며 소원을 빕니다.",
      pilihan: [
        { id: "A", teks: "추석에는 떡국을 먹습니다." },
        { id: "B", teks: "추석은 양력 8월 15일입니다." },
        { id: "C", teks: "가족들과 함께 송편을 만듭니다." },
        { id: "D", teks: "추석에는 해를 보며 소원을 빕니다." },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA di teks tertulis langsung '가족들이 다 함께 모여 송편을 만들고' (keluarga berkumpul membuat songpyeon).",
    },
    {
      jenisSoal: "[17~18] 다음 글을 읽고 내용과 같은 것을 고르십시오.",
      soal: "외국인 근로자가 질병이나 부상으로 일을 할 수 없을 때는 병가를 신청할 수 있습니다. 병가를 신청할 때에는 병원에서 발급받은 진단서를 회사에 제출해야 합니다.",
      pilihan: [
        { id: "A", teks: "아플 때에도 병가를 낼 수 없습니다." },
        { id: "B", teks: "병가 신청 시 진단서가 필요합니다." },
        { id: "C", teks: "병가는 은행에 제출해야 합니다." },
        { id: "D", teks: "다쳤을 때는 연차 휴가만 가능합니다." },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA teks menyatakan '진단서를 회사에 제출해야 합니다' (harus menyerahkan surat keterangan dokter ke perusahaan saat cuti sakit).",
    },
    {
      jenisSoal: "[19~20] 다음 글을 읽고 물음에 답하십시오.",
      soal: "[19] 다음 글의 빈칸에 들어갈 알맞은 말을 고르십시오.\n작업장에서는 안전사고를 예방하기 위해 정리정돈이 중요합니다. 사용한 공구는 제자리에 두고 바닥에 떨어진 기름이나 물은 즉시 닦아야 합니다. 그렇지 않으면 작업자가 넘어져서 (   ) 위험이 있습니다.",
      pilihan: [
        { id: "A", teks: "다칠" },
        { id: "B", teks: "성공할" },
        { id: "C", teks: "기뻐할" },
        { id: "D", teks: "쉬어갈" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA jika ada minyak/air dan pekerja terpeleset (넘어져서), resikonya adalah terluka (다칠 위험).",
    },
    {
      jenisSoal: "[19~20] 다음 글을 읽고 물음에 답하십시오.",
      soal: "[20] 이 글의 중심 내용으로 가장 알맞은 것은 무엇입니까?\n(글 내용: 작업장 안전사고 예방과 정리정돈의 중요성)",
      pilihan: [
        { id: "A", teks: "공구를 새로 구입하는 법" },
        { id: "B", teks: "작업장 정리정돈과 안전 예방" },
        { id: "C", teks: "기름을 안전하게 보관하는 법" },
        { id: "D", teks: "작업장 휴식 시간의 활용" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA gagasan utama paragraf adalah menjaga kerapian area kerja untuk mencegah kecelakaan kerja.",
    },
  ];

  // Soal 21-40: Soal Pendengaran (Listening)
  const pendengaranDefs: Omit<SoalUbt, "nomor" | "bagian">[] = [
    {
      jenisSoal: "[21~24] 들은 것을 고르십시오.",
      soal: "다음 음성을 듣고 들은 단어를 고르십시오.\n[오디오를 재생하여 발음을 들으세요]",
      teksAudio: "공장",
      pilihan: [
        { id: "A", teks: "공장" },
        { id: "B", teks: "극장" },
        { id: "C", teks: "통장" },
        { id: "D", teks: "동장" },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA audio memperdengarkan kata '공장' (pabrik).",
    },
    {
      jenisSoal: "[21~24] 들은 것을 고르십시오.",
      soal: "다음 음성을 듣고 들은 단어를 고르십시오.\n[오디오를 재생하여 발음을 들으세요]",
      teksAudio: "받침",
      pilihan: [
        { id: "A", teks: "아침" },
        { id: "B", teks: "받침" },
        { id: "C", teks: "마침" },
        { id: "D", teks: "붙임" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA audio membacakan kata '받침' (konsonan akhir/받침).",
    },
    {
      jenisSoal: "[21~24] 들은 것을 고르십시오.",
      soal: "다음 음성을 듣고 들은 날짜를 고르십시오.\n[오디오를 재생하여 발음을 들으세요]",
      teksAudio: "오월 십오일",
      pilihan: [
        { id: "A", teks: "5월 5일" },
        { id: "B", teks: "5월 15일" },
        { id: "C", teks: "6월 15일" },
        { id: "D", teks: "4월 25일" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA suara melafalkan '오월 십오일' yang berarti tanggal 15 Mei (5월 15일).",
    },
    {
      jenisSoal: "[21~24] 들은 것을 고르십시오.",
      soal: "다음 음성을 듣고 들은 문장을 고르십시오.\n[오디오를 재생하여 발음을 들으세요]",
      teksAudio: "창문을 닫으세요",
      pilihan: [
        { id: "A", teks: "문을 여세요" },
        { id: "B", teks: "창문을 닫으세요" },
        { id: "C", teks: "창문을 닦으세요" },
        { id: "D", teks: "불을 끄세요" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA kalimat yang diucapkan adalah '창문을 닫으세요' (Tutuplah jendela).",
    },
    {
      jenisSoal: "[25~29] 그림을 보고 알맞은 대답을 고르십시오.",
      soal: "이것은 무엇입니까? 오디오를 듣고 번호를 고르십시오.\n[그림: 지게차 / Forklift]\n① 삽입니다 ② 지게차입니다 ③ 사다리입니다 ④ 크레인입니다",
      teksAudio: "1번 삽입니다. 2번 지게차입니다. 3번 사다리입니다. 4번 크레인입니다.",
      pilihan: [
        { id: "A", teks: "①" },
        { id: "B", teks: "②" },
        { id: "C", teks: "③" },
        { id: "D", teks: "④" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B (Nomor 2) KARENA forklift dalam bahasa Korea adalah '지게차', diucapkan pada pilihan ke-2.",
    },
    {
      jenisSoal: "[25~29] 그림을 보고 알맞은 대답을 고르십시오.",
      soal: "여기는 어디입니까? 오디오를 듣고 번호를 고르십시오.\n[그림: 기숙사 / Asrama]\n① 은행입니다 ② 기숙사입니다 ③ 우체국입니다 ④ 주유소입니다",
      teksAudio: "1번 은행입니다. 2번 기숙사입니다. 3번 우체국입니다. 4번 주유소입니다.",
      pilihan: [
        { id: "A", teks: "①" },
        { id: "B", teks: "②" },
        { id: "C", teks: "③" },
        { id: "D", teks: "④" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B (Nomor 2) KARENA gambar menunjukkan kamar asrama (기숙사), diucapkan pada pilihan ke-2.",
    },
    {
      jenisSoal: "[25~29] 그림을 보고 알맞은 대답을 고르십시오.",
      soal: "사람들이 무엇을 하고 있습니까? 오디오를 듣고 고르십시오.\n[그림: 식사를 하고 있습니다 / Sedang makan]\n① 잠을 잡니다 ② 밥을 먹습니다 ③ 운동을 합니다 ④ 노래를 합니다",
      teksAudio: "1번 잠을 잡니다. 2번 밥을 먹습니다. 3번 운동을 합니다. 4번 노래를 합니다.",
      pilihan: [
        { id: "A", teks: "①" },
        { id: "B", teks: "②" },
        { id: "C", teks: "③" },
        { id: "D", teks: "④" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B (Nomor 2) KARENA orang-orang pada gambar sedang makan (밥을 먹습니다).",
    },
    {
      jenisSoal: "[25~29] 그림을 보고 알맞은 대답을 고르십시오.",
      soal: "사과가 얼마나 있습니까? 오디오를 듣고 고르십시오.\n[그림: 사과 5개 / 5 buah apel]\n① 세 개 있습니다 ② 네 개 있습니다 ③ 다섯 개 있습니다 ④ 여섯 개 있습니다",
      teksAudio: "1번 세 개 있습니다. 2번 네 개 있습니다. 3번 다섯 개 있습니다. 4번 여섯 개 있습니다.",
      pilihan: [
        { id: "A", teks: "①" },
        { id: "B", teks: "②" },
        { id: "C", teks: "③" },
        { id: "D", teks: "④" },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C (Nomor 3) KARENA jumlah apel pada gambar berjumlah lima (다섯 개).",
    },
    {
      jenisSoal: "[25~29] 그림을 보고 알맞은 대답을 고르십시오.",
      soal: "모자가 어디에 있습니까? 오디오를 듣고 고르십시오.\n[그림: 의자 위에 모자가 있습니다 / Topi di atas kursi]\n① 의자 밑에 있습니다 ② 의자 위에 있습니다 ③ 의자 옆에 있습니다 ④ 의자 뒤에 있습니다",
      teksAudio: "1번 의자 밑에 있습니다. 2번 의자 위에 있습니다. 3번 의자 옆에 있습니다. 4번 의자 뒤에 있습니다.",
      pilihan: [
        { id: "A", teks: "①" },
        { id: "B", teks: "②" },
        { id: "C", teks: "③" },
        { id: "D", teks: "④" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B (Nomor 2) KARENA posisi topi tepat berada di atas kursi (의자 위에 있습니다).",
    },
    {
      jenisSoal: "[30~33] 질문을 듣고 알맞은 대답을 고르십시오.",
      soal: "질문을 듣고 알맞은 대답을 고르십시오.\n질문: '한국에 언제 왔어요?'",
      teksAudio: "한국에 언제 왔어요?",
      pilihan: [
        { id: "A", teks: "작년 3월에 왔어요." },
        { id: "B", teks: "비행기로 왔어요." },
        { id: "C", teks: "친구하고 같이 왔어요." },
        { id: "D", teks: "일하러 왔어요." },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA pertanyaan menanyakan kapan ('언제'), sehingga jawaban yang tepat menerangkan waktu (Maret tahun lalu).",
    },
    {
      jenisSoal: "[30~33] 질문을 듣고 알맞은 대답을 고르십시오.",
      soal: "질문을 듣고 알맞은 대답을 고르십시오.\n질문: '반장님, 오늘 잔업이 있어요?'",
      teksAudio: "반장님, 오늘 잔업이 있어요?",
      pilihan: [
        { id: "A", teks: "네, 내일은 휴일이에요." },
        { id: "B", teks: "네, 주문이 많아서 2시간 해야 해요." },
        { id: "C", teks: "아니요, 출근을 안 했어요." },
        { id: "D", teks: "네, 월급을 받았어요." },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA menanggapi pertanyaan kerja lembur (잔업) dengan konfirmasi lembur 2 jam karena pesanan banyak.",
    },
    {
      jenisSoal: "[30~33] 질문을 듣고 알맞은 대답을 고르십시오.",
      soal: "질문을 듣고 알맞은 대답을 고르십시오.\n질문: '신분증 좀 보여 주시겠어요?'",
      teksAudio: "신분증 좀 보여 주시겠어요?",
      pilihan: [
        { id: "A", teks: "여기 있습니다." },
        { id: "B", teks: "네, 잘 알겠습니다." },
        { id: "C", teks: "아니요, 제가 하겠습니다." },
        { id: "D", teks: "죄송하지만 모릅니다." },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA saat diminta memperlihatkan kartu identitas, ungkapan sopan saat menyerahkannya adalah '여기 있습니다' (Ini dia).",
    },
    {
      jenisSoal: "[30~33] 질문을 듣고 알맞은 대답을 고르십시오.",
      soal: "질문을 듣고 알맞은 대답을 고르십시오.\n질문: '주말에 보통 뭐 해요?'",
      teksAudio: "주말에 보통 뭐 해요?",
      pilihan: [
        { id: "A", teks: "한국 사람이 아니에요." },
        { id: "B", teks: "기숙사에서 푹 쉬어요." },
        { id: "C", teks: "어제 영화를 봤어요." },
        { id: "D", teks: "주말은 토요일과 일요일이에요." },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA pertanyaannya tentang kebiasaan di akhir pekan, sehingga jawabannya beristirahat di asrama (기숙사에서 푹 쉬어요).",
    },
    {
      jenisSoal: "[34~35] 다음을 듣고 이어지는 말을 고르십시오.",
      soal: "다음을 듣고 이어지는 말을 고르십시오.\n남: '민수 씨, 오늘 저녁에 삼겹살 먹으러 갈래요?'",
      teksAudio: "민수 씨, 오늘 저녁에 삼겹살 먹으러 갈래요?",
      pilihan: [
        { id: "A", teks: "좋아요. 같이 가요." },
        { id: "B", teks: "맛있게 드세요." },
        { id: "C", teks: "어제 먹었어요." },
        { id: "D", teks: "이미 다 먹었어요." },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA merespons ajakan makan malam dengan persetujuan: '좋아요. 같이 가요' (Boleh, ayo pergi bersama).",
    },
    {
      jenisSoal: "[34~35] 다음을 듣고 이어지는 말을 고르십시오.",
      soal: "다음을 듣고 이어지는 말을 고르십시오.\n여: '반장님, 이 기계 어떻게 작동하는지 알려주세요.'",
      teksAudio: "반장님, 이 기계 어떻게 작동하는지 알려주세요.",
      pilihan: [
        { id: "A", teks: "기계가 고장 났습니다." },
        { id: "B", teks: "먼저 여기 초록색 전원 버튼을 누르세요." },
        { id: "C", teks: "퇴근 시간에 끕시다." },
        { id: "D", teks: "내일 수리할 겁니다." },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA saat ditanya cara mengoperasikan mesin, jawaban yang tepat adalah instruksi pengoperasian, misalnya menekan tombol daya hijau dulu.",
    },
    {
      jenisSoal: "[36~37] 이야기를 듣고 질문에 답하십시오.",
      soal: "대화를 듣고 남자는 오늘 무엇을 할 것인지 고르십시오.\n남: '내일 출하할 상자들을 다 포장했나요?'\n여: '아직 50개 정도 남았어요.'\n남: '그럼 제가 도와서 같이 포장할게요.'",
      teksAudio: "남자: 내일 출하할 상자들을 다 포장했나요? 여자: 아직 50개 정도 남았어요. 남자: 그럼 제가 도와서 같이 포장할게요.",
      pilihan: [
        { id: "A", teks: "상자를 포장합니다." },
        { id: "B", teks: "물건을 출하합니다." },
        { id: "C", teks: "퇴근을 합니다." },
        { id: "D", teks: "청소를 합니다." },
      ],
      kunciJawaban: "A",
      penjelasan: "JAWABAN BENAR ADALAH A KARENA pria berkata '제가 도와서 같이 포장할게요' (Saya akan ikut membantu mengemas kotaknya).",
    },
    {
      jenisSoal: "[36~37] 이야기를 듣고 질문에 답하십시오.",
      soal: "대화를 듣고 두 사람이 만날 시간을 고르십시오.\n여: '우리 몇 시에 만날까요? 6시에 볼까요?'\n남: '6시는 좀 이르고, 7시는 어때요?'\n여: '네, 좋아요. 그럼 7시에 봐요.'",
      teksAudio: "여자: 우리 몇 시에 만날까요? 6시에 볼까요? 남자: 6시는 좀 이르고, 7시는 어때요? 여자: 네, 좋아요. 그럼 7시에 봐요.",
      pilihan: [
        { id: "A", teks: "오후 5시" },
        { id: "B", teks: "오후 6시" },
        { id: "C", teks: "오후 7시" },
        { id: "D", teks: "오후 8시" },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA kedua orang sepakat bertemu pukul 7 (7시에 봐요).",
    },
    {
      jenisSoal: "[38~40] 하나의 이야기를 듣고 두 개의 질문에 답하십시오.",
      soal: "[38] 남자는 왜 병원에 가려고 합니까?",
      teksAudio: "남자: 아야! 허리가 너무 아파요. 여자: 왜 그래요? 괜찮아요? 남자: 무거운 짐을 들다가 허리를 삐끗한 것 같아요. 여자: 빨리 정형외과에 가 보세요.",
      pilihan: [
        { id: "A", teks: "감기에 걸려서" },
        { id: "B", teks: "허리를 다쳐서" },
        { id: "C", teks: "눈이 아파서" },
        { id: "D", teks: "치아가 아파서" },
      ],
      kunciJawaban: "B",
      penjelasan: "JAWABAN BENAR ADALAH B KARENA pria tersebut mengalami cedera pinggang saat mengangkat barang berat (허리를 삐끗해서).",
    },
    {
      jenisSoal: "[38~40] 하나의 이야기를 듣고 두 개의 질문에 답하십시오.",
      soal: "[39] 남자는 어느 병원에 가야 합니까?",
      teksAudio: "남자: 아야! 허리가 너무 아파요. 여자: 왜 그래요? 괜찮아요? 남자: 무거운 짐을 들다가 허리를 삐끗한 것 같아요. 여자: 빨리 정형외과에 가 보세요.",
      pilihan: [
        { id: "A", teks: "안과" },
        { id: "B", teks: "치과" },
        { id: "C", teks: "정형외과" },
        { id: "D", teks: "이비인후과" },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA untuk keluhan pinggang, tulang, dan sendi, klinik yang disarankan adalah poli ortopedi (정형외과).",
    },
    {
      jenisSoal: "[38~40] 하나의 이야기를 듣고 두 개의 질문에 답하십시오.",
      soal: "[40] 대화의 내용과 일치하는 것을 고르십시오.",
      teksAudio: "남자: 아야! 허리가 너무 아파요. 여자: 왜 그래요? 괜찮아요? 남자: 무거운 짐을 들다가 허리를 삐끗한 것 같아요. 여자: 빨리 정형외과에 가 보세요.",
      pilihan: [
        { id: "A", teks: "남자는 가벼운 짐을 들었습니다." },
        { id: "B", teks: "여자가 다쳤습니다." },
        { id: "C", teks: "남자는 지금 허리가 아픕니다." },
        { id: "D", teks: "두 사람은 이미 병원에 도착했습니다." },
      ],
      kunciJawaban: "C",
      penjelasan: "JAWABAN BENAR ADALAH C KARENA sesuai percakapan, pria tersebut sedang kesakitan di bagian pinggang saat ini (허리가 너무 아파요).",
    },
  ];

  for (let i = 0; i < 20; i++) {
    soalList.push({ nomor: i + 1, bagian: "bacaan", ...bacaanDefs[i] });
  }
  for (let i = 0; i < 20; i++) {
    soalList.push({ nomor: 21 + i, bagian: "pendengaran", ...pendengaranDefs[i] });
  }
  return soalList;
}

export const daftarKategoriUbt: UbtKategori[] = [
  {
    id: "ubt-2026",
    judul: "UBT Tahun 2026",
    deskripsi: "Paket simulasi ujian EPS-TOPIK standar terbaru tahun 2026",
    sets: [
      { id: "2026-set-1", kategoriId: "ubt-2026", judul: "SET 1", tahun: "2026", durasiMenit: 50, daftarSoal: createSetSoal() },
      { id: "2026-set-2", kategoriId: "ubt-2026", judul: "SET 2", tahun: "2026", durasiMenit: 50, daftarSoal: createSetSoal() },
      { id: "2026-set-3", kategoriId: "ubt-2026", judul: "SET 3", tahun: "2026", durasiMenit: 50, daftarSoal: createSetSoal() },
    ],
  },
  {
    id: "ubt-2025",
    judul: "UBT Tahun 2025",
    deskripsi: "Paket simulasi ujian EPS-TOPIK tahun 2025",
    sets: [
      { id: "2025-set-1", kategoriId: "ubt-2025", judul: "SET 1", tahun: "2025", durasiMenit: 50, daftarSoal: createSetSoal() },
      { id: "2025-set-2", kategoriId: "ubt-2025", judul: "SET 2", tahun: "2025", durasiMenit: 50, daftarSoal: createSetSoal() },
      { id: "2025-set-3", kategoriId: "ubt-2025", judul: "SET 3", tahun: "2025", durasiMenit: 50, daftarSoal: createSetSoal() },
    ],
  },
  {
    id: "ubt-komunitas",
    judul: "UBT Dari Komunitas",
    deskripsi: "Paket soal latihan UBT kontribusi pengajar & komunitas",
    sets: [
      { id: "komunitas-set-1", kategoriId: "ubt-komunitas", judul: "SET 1", durasiMenit: 50, daftarSoal: createSetSoal() },
      { id: "komunitas-set-2", kategoriId: "ubt-komunitas", judul: "SET 2", durasiMenit: 50, daftarSoal: createSetSoal() },
      { id: "komunitas-set-3", kategoriId: "ubt-komunitas", judul: "SET 3", durasiMenit: 50, daftarSoal: createSetSoal() },
    ],
  },
];
