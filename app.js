const STORAGE = 'contrack_hangingsense_v3';
const RTL_LANGS = new Set(['ar','fa']);
const APP_NAME = 'ConTrack @ HangingSense';

const themes = {
  hanging: {
    name:'HangingSense / Calm', desc:'Warm cream · clay · earth',
    vars:{bg:'#F7F1E6',surface:'#FFFCF7',surface2:'#F2E9DC',earth:'#574A43',text:'#302A27',muted:'#7D716B',accent:'#B86F4F',accentStrong:'#A95F43',sand:'#D9B5A0',dune:'#E9DDCE'}
  },
  bloom: {
    name:'Bloom', desc:'Soft blush · warm berry',
    vars:{bg:'#FAF2EF',surface:'#FFFDFC',surface2:'#F4E2DE',earth:'#624B4D',text:'#352A2B',muted:'#816E71',accent:'#C4776A',accentStrong:'#A95C54',sand:'#E5B8AE',dune:'#ECD9D4'}
  },
  serenity: {
    name:'Serenity', desc:'Sage · mineral · clay',
    vars:{bg:'#F3F3EC',surface:'#FCFCF7',surface2:'#E6EBE2',earth:'#4E5A51',text:'#29302B',muted:'#6F7A72',accent:'#A36C56',accentStrong:'#895743',sand:'#C9D0C2',dune:'#DDE1D7'}
  },
  minimal: {
    name:'Minimal', desc:'Quiet neutral · high clarity',
    vars:{bg:'#F5F3EF',surface:'#FFFFFF',surface2:'#ECE9E4',earth:'#44413F',text:'#242321',muted:'#706D69',accent:'#8A6250',accentStrong:'#704D3F',sand:'#D6CEC6',dune:'#E4E0DA'}
  },
  night: {
    name:'Night', desc:'Deep cacao · low-glare clay',
    vars:{bg:'#201C1A',surface:'#2B2522',surface2:'#342B27',earth:'#E9DCCF',text:'#F5EEE7',muted:'#BBAEA4',accent:'#D48769',accentStrong:'#C46E50',sand:'#7A6155',dune:'#433934'}
  }
};

const I18N = {
en: {
 trackNow:'Track now',tapStart:'Tap when a contraction begins. Timing stays on this device.',start:'Start contraction',end:'End contraction',
 rhythm:'Rhythm',recentTiming:'Recent timing — no prediction',lastContraction:'Last contraction',duration:'Duration',startToStart:'Start → start',
 safety:'ConTrack records timing and self-reported intensity. It does not diagnose labor stage or replace advice from your maternity team.',
 track:'Track',history:'History',summary:'Summary',more:'More',historySub:'Review timing, add intensity later, or correct notes without changing the original timestamp.',
 summarySub:'A factual snapshot of the current session.',pattern:'Contraction pattern',chartNote:'Duration bars · intensity dots',contractions:'Contractions',
 avgDuration:'Avg duration',avgInterval:'Avg start interval',avgRest:'Avg rest',intensitySummary:'Intensity',moreSub:'Language, visual style, session and local data.',
 language:'Language',designStudio:'Design studio',sessionData:'Session & data',exportCsv:'Export CSV',exportCsvSub:'Timing, rest, intensity and notes',
 exportJson:'Export JSON',exportJsonSub:'Full local session backup',newSession:'New session',newSessionSub:'Clears the current contraction list on this device',
 export:'Export',reset:'Reset',brandLine:'Calm labor preparation · factual timing · local-first',
 privacy:'Your session is stored in this browser only unless you export it. No account or cloud connection is required.',
 painTitle:'How intense did it feel?',painSub:'Optional self-rating from 0–10. You can add or change it later in History.',
 notePlaceholder:'Optional note',notRated:'Not rated',save:'Save',contractionRunning:'Contraction running',tapToEnd:'tap to end'
},
de: {
 trackNow:'Jetzt erfassen',tapStart:'Tippen, wenn eine Wehe beginnt. Die Daten bleiben auf diesem Gerät.',start:'Wehe starten',end:'Wehe beenden',
 rhythm:'Rhythmus',recentTiming:'Letzte Zeiten — keine Prognose',lastContraction:'Letzte Wehe',duration:'Dauer',startToStart:'Start → Start',
 safety:'ConTrack zeichnet Zeiten und subjektive Intensität auf. Es diagnostiziert keine Geburtsphase und ersetzt nicht die Beratung durch das Geburtsteam.',
 track:'Track',history:'Verlauf',summary:'Übersicht',more:'Mehr',historySub:'Zeiten prüfen, Intensität später ergänzen oder Notizen korrigieren, ohne den Originalzeitpunkt zu verändern.',
 summarySub:'Sachliche Momentaufnahme der aktuellen Sitzung.',pattern:'Wehenmuster',chartNote:'Dauerbalken · Intensitätspunkte',contractions:'Wehen',
 avgDuration:'Ø Dauer',avgInterval:'Ø Startintervall',avgRest:'Ø Pause',intensitySummary:'Intensität',moreSub:'Sprache, Design, Sitzung und lokale Daten.',
 language:'Sprache',designStudio:'Design Studio',sessionData:'Sitzung & Daten',exportCsv:'CSV exportieren',exportCsvSub:'Zeiten, Pausen, Intensität und Notizen',
 exportJson:'JSON exportieren',exportJsonSub:'Vollständige lokale Sicherung',newSession:'Neue Sitzung',newSessionSub:'Löscht die aktuelle Wehenliste auf diesem Gerät',
 export:'Export',reset:'Zurücksetzen',brandLine:'Ruhige Geburtsvorbereitung · sachliche Zeiterfassung · lokal',
 privacy:'Die Sitzung wird nur in diesem Browser gespeichert, sofern du sie nicht exportierst. Kein Konto und keine Cloud sind erforderlich.',
 painTitle:'Wie intensiv fühlte es sich an?',painSub:'Optionale Selbsteinschätzung von 0–10. Später im Verlauf änderbar.',
 notePlaceholder:'Optionale Notiz',notRated:'Nicht bewertet',save:'Speichern',contractionRunning:'Wehe läuft',tapToEnd:'tippen zum Beenden'
},
fr: {
 trackNow:'Suivre maintenant',tapStart:'Touchez lorsque la contraction commence. Les données restent sur cet appareil.',start:'Démarrer la contraction',end:'Terminer la contraction',
 rhythm:'Rythme',recentTiming:'Temps récents — sans prédiction',lastContraction:'Dernière contraction',duration:'Durée',startToStart:'Début → début',
 safety:'ConTrack enregistre le temps et l’intensité déclarée. Il ne diagnostique pas le stade du travail et ne remplace pas votre équipe de maternité.',
 track:'Suivi',history:'Historique',summary:'Résumé',more:'Plus',historySub:'Vérifiez les temps, ajoutez l’intensité plus tard ou corrigez les notes.',
 summarySub:'Vue factuelle de la session en cours.',pattern:'Schéma des contractions',chartNote:'Barres de durée · points d’intensité',contractions:'Contractions',
 avgDuration:'Durée moy.',avgInterval:'Intervalle moy.',avgRest:'Repos moy.',intensitySummary:'Intensité',moreSub:'Langue, style visuel, session et données locales.',
 language:'Langue',designStudio:'Studio de design',sessionData:'Session et données',exportCsv:'Exporter CSV',exportCsvSub:'Temps, repos, intensité et notes',
 exportJson:'Exporter JSON',exportJsonSub:'Sauvegarde locale complète',newSession:'Nouvelle session',newSessionSub:'Efface la liste actuelle sur cet appareil',
 export:'Exporter',reset:'Réinitialiser',brandLine:'Préparation calme · timing factuel · local',
 privacy:'Votre session reste dans ce navigateur sauf export. Aucun compte ni cloud requis.',
 painTitle:'Quelle était l’intensité ?',painSub:'Auto-évaluation facultative de 0 à 10, modifiable plus tard.',
 notePlaceholder:'Note facultative',notRated:'Non évalué',save:'Enregistrer',contractionRunning:'Contraction en cours',tapToEnd:'touchez pour terminer'
},
es: {
 trackNow:'Registrar ahora',tapStart:'Toca cuando empiece una contracción. Los datos permanecen en este dispositivo.',start:'Iniciar contracción',end:'Finalizar contracción',
 rhythm:'Ritmo',recentTiming:'Tiempos recientes — sin predicción',lastContraction:'Última contracción',duration:'Duración',startToStart:'Inicio → inicio',
 safety:'ConTrack registra tiempos e intensidad percibida. No diagnostica la fase del parto ni sustituye la orientación del equipo de maternidad.',
 track:'Registrar',history:'Historial',summary:'Resumen',more:'Más',historySub:'Revisa tiempos, añade intensidad después o corrige notas sin cambiar la hora original.',
 summarySub:'Resumen factual de la sesión actual.',pattern:'Patrón de contracciones',chartNote:'Barras de duración · puntos de intensidad',contractions:'Contracciones',
 avgDuration:'Duración prom.',avgInterval:'Intervalo prom.',avgRest:'Descanso prom.',intensitySummary:'Intensidad',moreSub:'Idioma, estilo visual, sesión y datos locales.',
 language:'Idioma',designStudio:'Estudio de diseño',sessionData:'Sesión y datos',exportCsv:'Exportar CSV',exportCsvSub:'Tiempo, descanso, intensidad y notas',
 exportJson:'Exportar JSON',exportJsonSub:'Copia local completa',newSession:'Nueva sesión',newSessionSub:'Borra la lista actual en este dispositivo',
 export:'Exportar',reset:'Reiniciar',brandLine:'Preparación serena · tiempo factual · local',
 privacy:'La sesión se guarda solo en este navegador salvo que la exportes. No se requiere cuenta ni nube.',
 painTitle:'¿Qué intensidad tuvo?',painSub:'Valoración opcional de 0–10. Puedes añadirla o cambiarla después.',
 notePlaceholder:'Nota opcional',notRated:'Sin valorar',save:'Guardar',contractionRunning:'Contracción activa',tapToEnd:'toca para finalizar'
},
zh: {
 trackNow:'开始记录',tapStart:'宫缩开始时点击。数据仅保存在此设备。',start:'开始宫缩',end:'结束宫缩',
 rhythm:'节律',recentTiming:'近期时间 — 不作预测',lastContraction:'最近一次宫缩',duration:'持续时间',startToStart:'开始 → 开始',
 safety:'ConTrack 仅记录时间和自评强度，不诊断产程阶段，也不能替代产科团队建议。',
 track:'记录',history:'历史',summary:'摘要',more:'更多',historySub:'查看时间、稍后补充强度或修改备注，不改变原始时间戳。',
 summarySub:'当前记录的客观摘要。',pattern:'宫缩节律',chartNote:'持续时间柱 · 强度点',contractions:'宫缩次数',
 avgDuration:'平均持续',avgInterval:'平均间隔',avgRest:'平均休息',intensitySummary:'强度',moreSub:'语言、视觉样式、记录与本地数据。',
 language:'语言',designStudio:'设计主题',sessionData:'记录与数据',exportCsv:'导出 CSV',exportCsvSub:'时间、休息、强度和备注',
 exportJson:'导出 JSON',exportJsonSub:'完整本地备份',newSession:'新记录',newSessionSub:'清除此设备上的当前宫缩列表',
 export:'导出',reset:'重置',brandLine:'平静待产 · 客观计时 · 本地优先',
 privacy:'除非导出，记录仅保存在此浏览器中。无需账户或云端连接。',
 painTitle:'这次感觉有多强？',painSub:'可选 0–10 自评，可稍后在历史中补充或修改。',
 notePlaceholder:'可选备注',notRated:'未评分',save:'保存',contractionRunning:'宫缩进行中',tapToEnd:'点击结束'
},
fa: {
 trackNow:'ثبت اکنون',tapStart:'با شروع انقباض لمس کنید. داده‌ها روی همین دستگاه می‌مانند.',start:'شروع انقباض',end:'پایان انقباض',
 rhythm:'ریتم',recentTiming:'زمان‌های اخیر — بدون پیش‌بینی',lastContraction:'آخرین انقباض',duration:'مدت',startToStart:'شروع ← شروع',
 safety:'ConTrack فقط زمان و شدت خوداظهاری را ثبت می‌کند و مرحله زایمان را تشخیص نمی‌دهد.',
 track:'ثبت',history:'تاریخچه',summary:'خلاصه',more:'بیشتر',historySub:'زمان‌ها را مرور کنید و شدت یا یادداشت را بعداً اضافه کنید.',
 summarySub:'نمای واقعی از جلسه فعلی.',pattern:'الگوی انقباض',chartNote:'میله مدت · نقطه شدت',contractions:'انقباض‌ها',
 avgDuration:'میانگین مدت',avgInterval:'میانگین فاصله',avgRest:'میانگین استراحت',intensitySummary:'شدت',moreSub:'زبان، ظاهر، جلسه و داده محلی.',
 language:'زبان',designStudio:'استودیو طراحی',sessionData:'جلسه و داده',exportCsv:'خروجی CSV',exportCsvSub:'زمان، استراحت، شدت و یادداشت',
 exportJson:'خروجی JSON',exportJsonSub:'پشتیبان کامل محلی',newSession:'جلسه جدید',newSessionSub:'فهرست فعلی را روی این دستگاه پاک می‌کند',
 export:'خروجی',reset:'بازنشانی',brandLine:'آمادگی آرام · زمان‌بندی واقعی · محلی',
 privacy:'جلسه فقط در همین مرورگر ذخیره می‌شود مگر اینکه آن را خروجی بگیرید.',
 painTitle:'شدت آن چقدر بود؟',painSub:'امتیاز اختیاری ۰ تا ۱۰؛ بعداً قابل تغییر است.',
 notePlaceholder:'یادداشت اختیاری',notRated:'بدون امتیاز',save:'ذخیره',contractionRunning:'انقباض فعال',tapToEnd:'برای پایان لمس کنید'
},
ar: {
 trackNow:'التسجيل الآن',tapStart:'المسي عند بدء الانقباض. تبقى البيانات على هذا الجهاز.',start:'بدء الانقباض',end:'إنهاء الانقباض',
 rhythm:'الإيقاع',recentTiming:'التوقيت الأخير — دون تنبؤ',lastContraction:'آخر انقباض',duration:'المدة',startToStart:'بداية ← بداية',
 safety:'يسجل ConTrack التوقيت والشدة الذاتية فقط. لا يشخّص مرحلة المخاض ولا يستبدل نصيحة فريق الولادة.',
 track:'تسجيل',history:'السجل',summary:'الملخص',more:'المزيد',historySub:'راجعي التوقيت وأضيفي الشدة لاحقاً أو صححي الملاحظات.',
 summarySub:'ملخص واقعي للجلسة الحالية.',pattern:'نمط الانقباضات',chartNote:'أعمدة المدة · نقاط الشدة',contractions:'الانقباضات',
 avgDuration:'متوسط المدة',avgInterval:'متوسط الفاصل',avgRest:'متوسط الراحة',intensitySummary:'الشدة',moreSub:'اللغة، النمط، الجلسة والبيانات المحلية.',
 language:'اللغة',designStudio:'استوديو التصميم',sessionData:'الجلسة والبيانات',exportCsv:'تصدير CSV',exportCsvSub:'التوقيت والراحة والشدة والملاحظات',
 exportJson:'تصدير JSON',exportJsonSub:'نسخة محلية كاملة',newSession:'جلسة جديدة',newSessionSub:'يمسح قائمة الانقباضات الحالية على هذا الجهاز',
 export:'تصدير',reset:'إعادة ضبط',brandLine:'استعداد هادئ · توقيت واقعي · محلي',
 privacy:'تبقى الجلسة في هذا المتصفح فقط ما لم تقومي بتصديرها.',
 painTitle:'ما شدة الإحساس؟',painSub:'تقييم اختياري من 0 إلى 10 ويمكن تعديله لاحقاً.',
 notePlaceholder:'ملاحظة اختيارية',notRated:'غير مقيّم',save:'حفظ',contractionRunning:'انقباض جارٍ',tapToEnd:'المسي للإنهاء'
},
hi: {
 trackNow:'अभी ट्रैक करें',tapStart:'संकुचन शुरू होते ही टैप करें। डेटा इसी डिवाइस पर रहता है।',start:'संकुचन शुरू करें',end:'संकुचन समाप्त करें',
 rhythm:'लय',recentTiming:'हाल का समय — कोई भविष्यवाणी नहीं',lastContraction:'पिछला संकुचन',duration:'अवधि',startToStart:'शुरू → शुरू',
 safety:'ConTrack केवल समय और स्वयं बताई गई तीव्रता दर्ज करता है। यह प्रसव चरण का निदान नहीं करता।',
 track:'ट्रैक',history:'इतिहास',summary:'सारांश',more:'अधिक',historySub:'समय देखें, बाद में तीव्रता जोड़ें या नोट सुधारें।',
 summarySub:'वर्तमान सत्र का तथ्यात्मक सारांश।',pattern:'संकुचन पैटर्न',chartNote:'अवधि बार · तीव्रता बिंदु',contractions:'संकुचन',
 avgDuration:'औसत अवधि',avgInterval:'औसत अंतराल',avgRest:'औसत आराम',intensitySummary:'तीव्रता',moreSub:'भाषा, दृश्य शैली, सत्र और स्थानीय डेटा।',
 language:'भाषा',designStudio:'डिज़ाइन स्टूडियो',sessionData:'सत्र और डेटा',exportCsv:'CSV निर्यात',exportCsvSub:'समय, आराम, तीव्रता और नोट',
 exportJson:'JSON निर्यात',exportJsonSub:'पूरा स्थानीय बैकअप',newSession:'नया सत्र',newSessionSub:'इस डिवाइस की वर्तमान सूची साफ करता है',
 export:'निर्यात',reset:'रीसेट',brandLine:'शांत तैयारी · तथ्यात्मक समय · स्थानीय',
 privacy:'निर्यात के बिना सत्र केवल इसी ब्राउज़र में रहता है।',
 painTitle:'यह कितना तीव्र लगा?',painSub:'0–10 का वैकल्पिक स्व-मूल्यांकन; बाद में बदला जा सकता है।',
 notePlaceholder:'वैकल्पिक नोट',notRated:'रेट नहीं किया',save:'सहेजें',contractionRunning:'संकुचन चल रहा है',tapToEnd:'समाप्त करने के लिए टैप करें'
},
ru: {
 trackNow:'Записать сейчас',tapStart:'Нажмите при начале схватки. Данные остаются на устройстве.',start:'Начать схватку',end:'Завершить схватку',
 rhythm:'Ритм',recentTiming:'Последние интервалы — без прогнозов',lastContraction:'Последняя схватка',duration:'Длительность',startToStart:'Начало → начало',
 safety:'ConTrack записывает время и субъективную интенсивность. Он не определяет стадию родов и не заменяет советы родильной команды.',
 track:'Трек',history:'История',summary:'Сводка',more:'Ещё',historySub:'Проверяйте время, добавляйте интенсивность позже или исправляйте заметки.',
 summarySub:'Фактический снимок текущей сессии.',pattern:'Паттерн схваток',chartNote:'Столбцы длительности · точки интенсивности',contractions:'Схватки',
 avgDuration:'Средняя длит.',avgInterval:'Средний интервал',avgRest:'Средний отдых',intensitySummary:'Интенсивность',moreSub:'Язык, оформление, сессия и локальные данные.',
 language:'Язык',designStudio:'Дизайн',sessionData:'Сессия и данные',exportCsv:'Экспорт CSV',exportCsvSub:'Время, отдых, интенсивность и заметки',
 exportJson:'Экспорт JSON',exportJsonSub:'Полная локальная копия',newSession:'Новая сессия',newSessionSub:'Очищает текущий список на устройстве',
 export:'Экспорт',reset:'Сброс',brandLine:'Спокойная подготовка · фактический тайминг · локально',
 privacy:'Сессия хранится только в этом браузере, пока вы её не экспортируете.',
 painTitle:'Насколько интенсивно?',painSub:'Необязательная оценка 0–10, которую можно изменить позже.',
 notePlaceholder:'Необязательная заметка',notRated:'Без оценки',save:'Сохранить',contractionRunning:'Схватка идёт',tapToEnd:'нажмите для завершения'
},
ko: {
 trackNow:'지금 기록',tapStart:'수축이 시작될 때 누르세요. 데이터는 이 기기에만 저장됩니다.',start:'수축 시작',end:'수축 종료',
 rhythm:'리듬',recentTiming:'최근 타이밍 — 예측 없음',lastContraction:'최근 수축',duration:'지속 시간',startToStart:'시작 → 시작',
 safety:'ConTrack은 시간과 본인 평가 강도만 기록합니다. 분만 단계를 진단하지 않으며 의료진의 조언을 대신하지 않습니다.',
 track:'기록',history:'기록 목록',summary:'요약',more:'더보기',historySub:'시간을 확인하고 강도를 나중에 추가하거나 메모를 수정할 수 있습니다.',
 summarySub:'현재 세션의 사실 기반 요약입니다.',pattern:'수축 패턴',chartNote:'지속 시간 막대 · 강도 점',contractions:'수축 횟수',
 avgDuration:'평균 지속',avgInterval:'평균 간격',avgRest:'평균 휴식',intensitySummary:'강도',moreSub:'언어, 시각 스타일, 세션 및 로컬 데이터.',
 language:'언어',designStudio:'디자인 스튜디오',sessionData:'세션 및 데이터',exportCsv:'CSV 내보내기',exportCsvSub:'시간, 휴식, 강도, 메모',
 exportJson:'JSON 내보내기',exportJsonSub:'전체 로컬 백업',newSession:'새 세션',newSessionSub:'이 기기의 현재 수축 목록을 지웁니다',
 export:'내보내기',reset:'초기화',brandLine:'차분한 준비 · 사실 기반 타이밍 · 로컬 우선',
 privacy:'내보내지 않는 한 세션은 이 브라우저에만 저장됩니다.',
 painTitle:'얼마나 강하게 느껴졌나요?',painSub:'선택적 0–10 자기 평가이며 나중에 수정할 수 있습니다.',
 notePlaceholder:'선택 메모',notRated:'평가 안 함',save:'저장',contractionRunning:'수축 진행 중',tapToEnd:'눌러 종료'
},
ja: {
 trackNow:'今すぐ記録',tapStart:'陣痛が始まったらタップ。データはこの端末に保存されます。',start:'陣痛を開始',end:'陣痛を終了',
 rhythm:'リズム',recentTiming:'最近のタイミング — 予測なし',lastContraction:'直近の陣痛',duration:'持続時間',startToStart:'開始 → 開始',
 safety:'ConTrack は時間と自己評価の強さを記録します。分娩段階を診断せず、医療チームの助言に代わるものではありません。',
 track:'記録',history:'履歴',summary:'概要',more:'その他',historySub:'時間を確認し、強さを後から追加したりメモを修正できます。',
 summarySub:'現在のセッションの事実ベースの概要です。',pattern:'陣痛パターン',chartNote:'持続時間バー · 強度ドット',contractions:'陣痛回数',
 avgDuration:'平均持続',avgInterval:'平均間隔',avgRest:'平均休息',intensitySummary:'強度',moreSub:'言語、表示スタイル、セッション、ローカルデータ。',
 language:'言語',designStudio:'デザインスタジオ',sessionData:'セッションとデータ',exportCsv:'CSV 書き出し',exportCsvSub:'時間、休息、強度、メモ',
 exportJson:'JSON 書き出し',exportJsonSub:'完全なローカルバックアップ',newSession:'新しいセッション',newSessionSub:'この端末の現在の陣痛一覧を消去します',
 export:'書き出し',reset:'リセット',brandLine:'穏やかな準備 · 事実ベースの計時 · ローカル優先',
 privacy:'書き出さない限り、セッションはこのブラウザだけに保存されます。',
 painTitle:'どのくらい強く感じましたか？',painSub:'任意の 0–10 自己評価。後から変更できます。',
 notePlaceholder:'任意のメモ',notRated:'未評価',save:'保存',contractionRunning:'陣痛進行中',tapToEnd:'タップで終了'
}
};

let state = {
  contractions: [],
  activeStart: null,
  theme: 'hanging',
  language: 'en',
  sessionStartedAt: Date.now()
};
let pendingPainId = null;
let selectedPain = null;
let editId = null;
let tickHandle = null;
let currentPage = 'track';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE) || 'null');
    if (saved && typeof saved === 'object') state = {...state,...saved};
  } catch(e) {}
}
function saveState() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
function formatClock(ms) {
  const s = Math.max(0, Math.floor(ms/1000));
  const m = Math.floor(s/60), r=s%60;
  return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0');
}
function formatShort(sec) {
  if (sec == null || !isFinite(sec)) return '—';
  sec = Math.max(0,Math.round(sec));
  if (sec < 60) return sec+'s';
  return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');
}
function timeOf(ts) { return new Intl.DateTimeFormat(state.language==='zh'?'zh-CN':state.language,{hour:'2-digit',minute:'2-digit'}).format(new Date(ts)); }
function toast(msg) {
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1700);
}
function t(key) { return (I18N[state.language]||I18N.en)[key] || I18N.en[key] || key; }

function applyLanguage() {
  const lang = state.language;
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.has(lang)?'rtl':'ltr';
  document.getElementById('app').classList.toggle('rtl',RTL_LANGS.has(lang));
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent=t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ el.placeholder=t(el.dataset.i18nPlaceholder); });
  document.getElementById('languageSelect').value = lang;
  updateTimerUI();
  renderAll();
}
function applyTheme(name) {
  state.theme = themes[name]?name:'hanging';
  const th=themes[state.theme].vars, root=document.documentElement;
  for (const [k,v] of Object.entries(th)) {
    const map={surface2:'--surface-2',accentStrong:'--accent-strong'};
    root.style.setProperty(map[k]||'--'+k,v);
  }
  document.querySelector('meta[name="theme-color"]').setAttribute('content',th.bg);
  document.querySelectorAll('.theme-card').forEach(x=>x.classList.toggle('active',x.dataset.theme===state.theme));
  saveState(); setTimeout(drawCharts,30);
}
function renderThemes() {
  const grid=document.getElementById('themeGrid'); grid.innerHTML='';
  Object.entries(themes).forEach(([key,th])=>{
    const b=document.createElement('button'); b.className='theme-card'; b.dataset.theme=key;
    b.innerHTML=`<div class="theme-preview" style="background:${th.vars.bg};color:${th.vars.earth};border:1px solid ${th.vars.dune}">
      <div class="minirow"><i class="a"></i><i class="b" style="background:${th.vars.accent}"></i></div>
      <div style="height:26px;border-radius:10px;background:${th.vars.surface};border:1px solid ${th.vars.dune}"></div>
    </div><div class="theme-name">${th.name}</div><div class="theme-desc">${th.desc}</div>`;
    b.onclick=()=>applyTheme(key); grid.appendChild(b);
  });
}
function switchPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+page));
  document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  if(page==='summary'||page==='track') setTimeout(drawCharts,40);
  window.scrollTo({top:0,behavior:'smooth'});
}
function startContraction() {
  if(state.activeStart) return;
  state.activeStart=Date.now(); saveState(); startTick(); updateTimerUI(); renderAll();
}
function endContraction() {
  if(!state.activeStart) return;
  const end=Date.now(), start=state.activeStart;
  const prev=state.contractions[state.contractions.length-1];
  const item={
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    start,end,
    duration:(end-start)/1000,
    interval:prev ? (start-prev.start)/1000 : null,
    rest:prev ? (start-prev.end)/1000 : null,
    pain:null,note:''
  };
  state.contractions.push(item); state.activeStart=null; saveState(); stopTick(); updateTimerUI(); renderAll();
  openPain(item.id,false);
}
function startTick() {
  clearInterval(tickHandle); tickHandle=setInterval(()=>{updateTimerUI();},250);
}
function stopTick() { clearInterval(tickHandle); tickHandle=null; }
function updateTimerUI() {
  const active=!!state.activeStart, elapsed=active?Date.now()-state.activeStart:0;
  const timer=document.getElementById('timer'), btn=document.getElementById('toggleTimer'), txt=document.getElementById('toggleText');
  timer.textContent=formatClock(elapsed); timer.classList.toggle('active',active);
  btn.classList.toggle('active',active); txt.textContent=active?t('end'):t('start');
  btn.setAttribute('aria-label',active?t('end'):t('start'));
  document.getElementById('activeBar').classList.toggle('show',active);
  document.getElementById('activeBarTime').textContent=formatClock(elapsed);
}
function openPain(id,isEdit) {
  editId=isEdit?id:null; pendingPainId=id;
  const item=state.contractions.find(x=>x.id===id);
  selectedPain=item?.pain ?? null;
  document.querySelectorAll('.pain-btn').forEach(b=>b.classList.toggle('selected',Number(b.dataset.pain)===selectedPain));
  document.getElementById('noteInput').value=item?.note||'';
  document.getElementById('painSheet').classList.add('open');
}
function closePain() { document.getElementById('painSheet').classList.remove('open'); pendingPainId=null; editId=null; selectedPain=null; }
function savePain(useRating=true) {
  const item=state.contractions.find(x=>x.id===pendingPainId);
  if(item) { item.pain=useRating?selectedPain:null; item.note=document.getElementById('noteInput').value.trim(); saveState(); }
  closePain(); renderAll();
}
function renderPainGrid() {
  const g=document.getElementById('painGrid'); g.innerHTML='';
  for(let i=0;i<=10;i++) {
    const b=document.createElement('button'); b.className='pain-btn'; b.textContent=i; b.dataset.pain=i;
    b.onclick=()=>{selectedPain=i; document.querySelectorAll('.pain-btn').forEach(x=>x.classList.toggle('selected',x===b));};
    g.appendChild(b);
  }
}
function renderLast() {
  const arr=state.contractions, last=arr[arr.length-1];
  document.getElementById('rhythmCount').textContent=arr.length?arr.length+' total':'0';
  document.getElementById('lastTime').textContent=last?timeOf(last.start):'—';
  document.getElementById('lastDuration').textContent=last?formatShort(last.duration):'—';
  document.getElementById('lastInterval').textContent=last?formatShort(last.interval):'—';
}
function renderHistory() {
  const host=document.getElementById('historyList'); host.innerHTML='';
  const arr=[...state.contractions].reverse();
  if(!arr.length) { host.innerHTML=`<div class="panel empty">${t('historySub')}</div>`; return; }
  arr.forEach((c,idx)=>{
    const el=document.createElement('article'); el.className='history-item';
    const pain=c.pain==null?t('notRated'):c.pain+'/10';
    el.innerHTML=`<div class="history-top"><div><div class="history-time">${timeOf(c.start)}</div><div class="history-meta">#${state.contractions.length-idx} · ${new Date(c.start).toLocaleDateString(state.language)}</div></div><div class="pain-badge">${pain}</div></div>
      <div class="history-stats">
        <div class="history-stat"><b>${formatShort(c.duration)}</b><span>${t('duration')}</span></div>
        <div class="history-stat"><b>${formatShort(c.interval)}</b><span>${t('startToStart')}</span></div>
        <div class="history-stat"><b>${formatShort(c.rest)}</b><span>Rest</span></div>
      </div>
      ${c.note?`<div style="margin-top:11px;font-size:13px;color:var(--muted)">${escapeHtml(c.note)}</div>`:''}
      <button class="text-btn" data-edit="${c.id}">${c.pain==null?t('painTitle'):'Edit intensity / note'}</button>`;
    host.appendChild(el);
  });
  host.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openPain(b.dataset.edit,true));
}
function escapeHtml(s) { return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function avg(values) {
  const a=values.filter(v=>typeof v==='number'&&isFinite(v)); return a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
}
function renderSummary() {
  const a=state.contractions;
  document.getElementById('kpiCount').textContent=a.length;
  document.getElementById('kpiDuration').textContent=formatShort(avg(a.map(x=>x.duration)));
  document.getElementById('kpiInterval').textContent=formatShort(avg(a.map(x=>x.interval)));
  document.getElementById('kpiRest').textContent=formatShort(avg(a.map(x=>x.rest)));
  const pains=a.map(x=>x.pain).filter(x=>x!=null);
  const ps=document.getElementById('painSummary');
  if(!pains.length) ps.textContent='No intensity ratings yet.';
  else ps.textContent=`${pains.length} rated · average ${avg(pains).toFixed(1)}/10 · range ${Math.min(...pains)}–${Math.max(...pains)}`;
  const first=a[0], last=a[a.length-1];
  document.getElementById('sessionRange').textContent=first&&last?`${timeOf(first.start)}–${timeOf(last.end)}`:'—';
}
function fitCanvas(canvas) {
  const dpr=Math.max(1,window.devicePixelRatio||1), rect=canvas.getBoundingClientRect();
  canvas.width=Math.floor(rect.width*dpr); canvas.height=Math.floor(rect.height*dpr);
  const ctx=canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); return {ctx,w:rect.width,h:rect.height};
}
function drawRoundedRect(ctx,x,y,w,h,r) {
  r=Math.min(r,w/2,h/2); ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}
function drawRhythm() {
  const canvas=document.getElementById('rhythmCanvas'); if(!canvas.offsetParent)return;
  const {ctx,w,h}=fitCanvas(canvas), arr=state.contractions.slice(-10);
  ctx.clearRect(0,0,w,h);
  const dune=cssVar('--dune'), accent=cssVar('--accent'), earth=cssVar('--earth'), muted=cssVar('--muted');
  ctx.strokeStyle=dune; ctx.lineWidth=1; ctx.beginPath();ctx.moveTo(0,h-13);ctx.lineTo(w,h-13);ctx.stroke();
  if(!arr.length){ctx.fillStyle=muted;ctx.font='12px '+getComputedStyle(document.body).fontFamily;ctx.fillText('No contractions recorded yet',6,h/2);return;}
  const max=Math.max(80,...arr.map(x=>x.duration)); const gap=8, bw=Math.max(10,(w-gap*(arr.length-1))/arr.length);
  arr.forEach((c,i)=>{const bh=Math.max(10,(c.duration/max)*(h-23)); const x=i*(bw+gap), y=h-13-bh; ctx.fillStyle=accent;drawRoundedRect(ctx,x,y,bw,bh,6);ctx.fill(); if(c.pain!=null){ctx.fillStyle=earth;ctx.beginPath();ctx.arc(x+bw/2,Math.max(6,y-6),3.4,0,Math.PI*2);ctx.fill();}});
}
function drawSummary() {
  const canvas=document.getElementById('summaryCanvas'); if(!canvas.offsetParent)return;
  const {ctx,w,h}=fitCanvas(canvas), arr=state.contractions.slice(-12);
  ctx.clearRect(0,0,w,h);
  const dune=cssVar('--dune'), accent=cssVar('--accent'), earth=cssVar('--earth'), muted=cssVar('--muted'), surface=cssVar('--surface');
  ctx.strokeStyle=dune; ctx.lineWidth=1;
  for(let i=0;i<4;i++){const y=20+i*(h-44)/3;ctx.beginPath();ctx.moveTo(4,y);ctx.lineTo(w-4,y);ctx.stroke();}
  if(!arr.length){ctx.fillStyle=muted;ctx.font='13px '+getComputedStyle(document.body).fontFamily;ctx.textAlign='center';ctx.fillText('No data yet',w/2,h/2);ctx.textAlign='start';return;}
  const max=Math.max(90,...arr.map(x=>x.duration)); const gap=8, innerW=w-12; const bw=Math.max(11,(innerW-gap*(arr.length-1))/arr.length);
  arr.forEach((c,i)=>{const bh=(c.duration/max)*(h-64);const x=6+i*(bw+gap),y=h-30-bh;ctx.fillStyle=accent;drawRoundedRect(ctx,x,y,bw,bh,6);ctx.fill();if(c.pain!=null){const py=18+(10-c.pain)/10*(h-62);ctx.fillStyle=earth;ctx.beginPath();ctx.arc(x+bw/2,py,4.2,0,Math.PI*2);ctx.fill();ctx.strokeStyle=surface;ctx.lineWidth=2;ctx.stroke();}ctx.fillStyle=muted;ctx.font='10px '+getComputedStyle(document.body).fontFamily;ctx.textAlign='center';ctx.fillText(String(state.contractions.indexOf(c)+1),x+bw/2,h-10);});
  ctx.textAlign='start';
}
function drawCharts() { drawRhythm(); drawSummary(); }
function renderAll() { renderLast(); renderHistory(); renderSummary(); drawCharts(); }
function exportBlob(content,name,type) {
  const blob=new Blob([content],{type}), url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function exportCsv() {
  const head=['id','start_iso','end_iso','duration_s','start_interval_s','rest_s','pain_0_10','note'];
  const rows=state.contractions.map(c=>[c.id,new Date(c.start).toISOString(),new Date(c.end).toISOString(),c.duration.toFixed(1),c.interval?.toFixed(1)||'',c.rest?.toFixed(1)||'',c.pain??'',c.note||'']);
  const esc=v=>`"${String(v).replaceAll('"','""')}"`;
  exportBlob([head,...rows].map(r=>r.map(esc).join(',')).join('\n'),'ConTrack_HangingSense_session.csv','text/csv');
}
function exportJson() { exportBlob(JSON.stringify({app:'ConTrack @ HangingSense',version:'3.0',...state},null,2),'ConTrack_HangingSense_session.json','application/json'); }

function downloadCanvas(canvas,name) {
  canvas.toBlob(blob=>{ if(blob) exportBlob(blob,name,'image/png'); }, 'image/png');
}
function fileStamp() {
  const d=new Date();
  const pad=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}
function localIsoDay(ts) {
  const d=new Date(ts), pad=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
function createExportSurface(width=1400,height=1800) {
  const canvas=document.createElement('canvas');
  canvas.width=width; canvas.height=height;
  const ctx=canvas.getContext('2d');
  const bg=cssVar('--bg'), sand=cssVar('--sand');
  const grad=ctx.createLinearGradient(0,0,width,height);
  grad.addColorStop(0,bg); grad.addColorStop(1,'#fffdf8');
  ctx.fillStyle=grad; ctx.fillRect(0,0,width,height);
  ctx.fillStyle='rgba(217,181,160,0.16)';
  ctx.beginPath(); ctx.arc(width*0.16, height*0.1, 180, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(width*0.88, height*0.06, 130, 0, Math.PI*2); ctx.fill();
  return {canvas,ctx,width,height};
}
function roundRectPath(ctx,x,y,w,h,r){
  const rr=Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr,y);
  ctx.arcTo(x+w,y,x+w,y+h,rr);
  ctx.arcTo(x+w,y+h,x,y+h,rr);
  ctx.arcTo(x,y+h,x,y,rr);
  ctx.arcTo(x,y,x+w,y,rr);
  ctx.closePath();
}
function fillRoundRect(ctx,x,y,w,h,r,fill,stroke=null){
  roundRectPath(ctx,x,y,w,h,r);
  if(fill){ctx.fillStyle=fill;ctx.fill();}
  if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
}
function drawExportHeader(ctx,w,title,subtitle,rightText=''){ 
  ctx.fillStyle=cssVar('--text');
  ctx.font='700 52px Manrope, sans-serif';
  ctx.fillText('ConTrack', 80, 104);
  ctx.fillStyle=cssVar('--muted');
  ctx.font='600 24px Manrope, sans-serif';
  ctx.fillText(subtitle, 82, 142);
  if(rightText){
    fillRoundRect(ctx,w-320,56,240,74,36,'rgba(255,252,247,0.9)',cssVar('--dune'));
    ctx.fillStyle=cssVar('--earth');
    ctx.font='600 28px Manrope, sans-serif';
    ctx.fillText(rightText, w-275, 103);
  }
  ctx.fillStyle=cssVar('--muted');
  ctx.font='700 20px Manrope, sans-serif';
  ctx.fillText(title.toUpperCase(), 80, 208);
}
function drawInfoCard(ctx,x,y,w,h,title,bodyLines){
  fillRoundRect(ctx,x,y,w,h,34,'rgba(255,252,247,0.96)',cssVar('--dune'));
  ctx.fillStyle=cssVar('--text');
  ctx.font='700 28px Manrope, sans-serif';
  ctx.fillText(title, x+28, y+44);
  ctx.fillStyle=cssVar('--muted');
  ctx.font='500 22px Manrope, sans-serif';
  bodyLines.forEach((line,i)=>ctx.fillText(line, x+28, y+82+i*30));
}
function drawMetricCard(ctx,x,y,w,h,label,value){
  fillRoundRect(ctx,x,y,w,h,28,'rgba(255,252,247,0.96)',cssVar('--dune'));
  ctx.fillStyle=cssVar('--muted');
  ctx.font='500 24px Manrope, sans-serif';
  ctx.fillText(label, x+28, y+50);
  ctx.fillStyle=cssVar('--text');
  ctx.font='700 62px Manrope, sans-serif';
  ctx.fillText(value, x+28, y+128);
}
function drawMiniBars(ctx,x,y,w,h,data,pains=[]){
  fillRoundRect(ctx,x,y,w,h,36,'rgba(255,252,247,0.96)',cssVar('--dune'));
  ctx.fillStyle=cssVar('--text');
  ctx.font='700 30px Manrope, sans-serif';
  ctx.fillText('Contraction pattern', x+28, y+44);
  ctx.fillStyle=cssVar('--muted');
  ctx.font='500 20px Manrope, sans-serif';
  ctx.fillText('Duration bars · intensity dots', x+28, y+74);
  const inner={x:x+28,y:y+96,w:w-56,h:h-132};
  ctx.strokeStyle=cssVar('--dune'); ctx.lineWidth=2;
  for(let i=0;i<4;i++){
    const gy=inner.y + i*(inner.h/3);
    ctx.beginPath(); ctx.moveTo(inner.x,gy); ctx.lineTo(inner.x+inner.w,gy); ctx.stroke();
  }
  if(!data.length){
    ctx.fillStyle=cssVar('--muted'); ctx.font='500 24px Manrope, sans-serif';
    ctx.fillText('No contractions recorded yet', inner.x, inner.y+inner.h/2); return;
  }
  const max=Math.max(90,...data.map(d=>d.duration||0));
  const gap=16, bw=Math.max(34,(inner.w-gap*(data.length-1))/data.length);
  data.forEach((d,i)=>{
    const bh=(d.duration/max)*(inner.h-34); const bx=inner.x+i*(bw+gap), by=inner.y+inner.h-bh;
    fillRoundRect(ctx,bx,by,bw,bh,14,cssVar('--accent'));
    if(d.pain!=null){
      const py=inner.y + (10-d.pain)/10*(inner.h-24);
      ctx.fillStyle=cssVar('--earth'); ctx.beginPath(); ctx.arc(bx+bw/2, py, 7, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle='rgba(255,252,247,0.95)'; ctx.lineWidth=3; ctx.stroke();
    }
    ctx.fillStyle=cssVar('--muted'); ctx.font='500 18px Manrope, sans-serif'; ctx.textAlign='center';
    ctx.fillText(String(i+1), bx+bw/2, inner.y+inner.h+28);
  });
  ctx.textAlign='left';
}
function drawHistoryCards(ctx,x,y,w,items){
  drawInfoCard(ctx,x,y,w,120,'Recent history',['Latest contractions · time, duration, interval and intensity']);
  let yy=y+140;
  if(!items.length){ drawInfoCard(ctx,x,yy,w,150,'No history',['No contractions recorded yet.']); return; }
  items.forEach((item,idx)=>{
    fillRoundRect(ctx,x,yy,w,126,28,'rgba(255,252,247,0.96)',cssVar('--dune'));
    ctx.fillStyle=cssVar('--text'); ctx.font='700 26px Manrope, sans-serif';
    ctx.fillText(`#${items.length-idx}  ${timeOf(item.start)}`, x+24, yy+40);
    ctx.fillStyle=cssVar('--muted'); ctx.font='500 20px Manrope, sans-serif';
    ctx.fillText(`Duration ${formatShort(item.duration)}   ·   Start interval ${formatShort(item.interval)}   ·   Rest ${formatShort(item.rest)}`, x+24, yy+74);
    ctx.fillText(`Intensity ${item.pain==null?'Not rated':item.pain+'/10'}${item.note?`   ·   ${item.note}`:''}`, x+24, yy+102);
    yy += 144;
  });
}
function drawMoreExport(ctx,w){
  drawInfoCard(ctx,80,230,w-160,140,'More',['Design, creator and support contact overview']);
  drawInfoCard(ctx,80,390,w-160,180,'App creator',['BenYima AI','Engineering what comes next']);
}
function loadImage(src){
  return new Promise((resolve,reject)=>{
    const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=src;
  });
}
async function exportCurrentScreenPng() {
  const page=document.querySelector('.page.active')?.id?.replace('page-','') || currentPage || 'track';
  const {canvas,ctx,width,height}=createExportSurface(1400, page==='history'?1900:1800);
  drawExportHeader(ctx,width, page, 'by HangingSense · V3.0', 'Local · Offline');
  if(page==='track'){
    ctx.fillStyle=cssVar('--text'); ctx.font='700 120px Manrope, sans-serif';
    const timeText=document.getElementById('timer').textContent || '00:00';
    ctx.fillText(timeText,80,360);
    ctx.fillStyle=cssVar('--muted'); ctx.font='500 28px Manrope, sans-serif';
    ctx.fillText(t('tapStart'),80,408);
    drawMiniBars(ctx,80,460,width-160,430,state.contractions.slice(-8));
    drawMetricCard(ctx,80,928,(width-184)/2,170,t('lastContraction'), document.getElementById('lastTime').textContent || '—');
    drawMetricCard(ctx,104+(width-184)/2,928,(width-184)/2,170,t('duration'), document.getElementById('lastDuration').textContent || '—');
    drawInfoCard(ctx,80,1128,width-160,180,'Safety note',[t('safety')]);
  } else if(page==='summary'){
    drawMiniBars(ctx,80,230,width-160,520,state.contractions.slice(-8));
    const gridY=782, cardW=(width-196)/2;
    drawMetricCard(ctx,80,gridY,cardW,170,t('contractions'), String(state.contractions.length));
    drawMetricCard(ctx,104+cardW,gridY,cardW,170,t('avgDuration'), document.getElementById('kpiDuration').textContent || '—');
    drawMetricCard(ctx,80,gridY+190,cardW,170,t('avgInterval'), document.getElementById('kpiInterval').textContent || '—');
    drawMetricCard(ctx,104+cardW,gridY+190,cardW,170,t('avgRest'), document.getElementById('kpiRest').textContent || '—');
    drawInfoCard(ctx,80,gridY+392,width-160,140,'Intensity',[(document.getElementById('painSummary').textContent || 'No intensity ratings yet.')]);
  } else if(page==='history'){
    drawHistoryCards(ctx,80,230,width-160,[...state.contractions].slice(-6).reverse());
  } else {
    drawMoreExport(ctx,width);
    try{
      const [brand,creator,wechat,telegram] = await Promise.all([
        loadImage('./logo-lockup.png'), loadImage('./benyima-logo.png'), loadImage('./doula-silvana-wechat.jpg'), loadImage('./doula-silvana-telegram.jpg')
      ]);
      ctx.drawImage(brand, 160, 460, width-320, 170);
      fillRoundRect(ctx,80,680,width-160,170,32,'rgba(255,252,247,0.96)',cssVar('--dune'));
      ctx.drawImage(creator, 110, 710, 110, 110);
      ctx.fillStyle=cssVar('--text'); ctx.font='700 30px Manrope, sans-serif'; ctx.fillText('BenYima AI', 250, 760);
      ctx.fillStyle=cssVar('--muted'); ctx.font='500 22px Manrope, sans-serif'; ctx.fillText('App creator · Engineering what comes next', 250, 798);
      drawInfoCard(ctx,80,884,width-160,120,'Doula Silvana',['Support contact · save or scan the QR images']);
      fillRoundRect(ctx,80,1028,(width-188)/2,470,32,'rgba(255,252,247,0.96)',cssVar('--dune'));
      fillRoundRect(ctx,108+(width-188)/2,1028,(width-188)/2,470,32,'rgba(255,252,247,0.96)',cssVar('--dune'));
      ctx.drawImage(wechat, 116, 1068, (width-252)/2, (width-252)/2);
      ctx.drawImage(telegram, 144+(width-188)/2, 1068, (width-252)/2, (width-252)/2);
      ctx.fillStyle=cssVar('--text'); ctx.font='700 28px Manrope, sans-serif'; ctx.fillText('WeChat', 116, 1460); ctx.fillText('Telegram', 144+(width-188)/2, 1460);
      ctx.fillStyle=cssVar('--muted'); ctx.font='500 20px Manrope, sans-serif'; ctx.fillText('Long-press to save or scan', 116, 1490); ctx.fillText('Long-press to save or scan', 144+(width-188)/2, 1490);
    } catch(e){
      drawInfoCard(ctx,80,460,width-160,220,'Assets unavailable',['Open the More page online to refresh assets, then try again.']);
    }
  }
  downloadCanvas(canvas, `ConTrack_${page}_${fileStamp()}.png`);
  toast('PNG export created');
}
function groupByDay(){
  const days = new Map();
  state.contractions.forEach(c=>{
    const key=localIsoDay(c.start);
    if(!days.has(key)) days.set(key, {day:key,count:0,durations:[],intervals:[],rests:[],pains:[]});
    const d=days.get(key);
    d.count++; d.durations.push(c.duration); if(c.interval!=null) d.intervals.push(c.interval); if(c.rest!=null) d.rests.push(c.rest); if(c.pain!=null) d.pains.push(c.pain);
  });
  return [...days.values()].map(d=>({
    day:d.day,
    count:d.count,
    avgDuration:avg(d.durations),
    avgInterval:avg(d.intervals),
    avgRest:avg(d.rests),
    avgPain:avg(d.pains)
  }));
}
function drawDailyOverviewChart(ctx,x,y,w,h,days){
  fillRoundRect(ctx,x,y,w,h,36,'rgba(255,252,247,0.96)',cssVar('--dune'));
  ctx.fillStyle=cssVar('--text'); ctx.font='700 30px Manrope, sans-serif'; ctx.fillText('Daily overview', x+28, y+44);
  ctx.fillStyle=cssVar('--muted'); ctx.font='500 20px Manrope, sans-serif'; ctx.fillText('Contractions per day · gold line = avg duration', x+28, y+74);
  const inner={x:x+28,y:y+100,w:w-56,h:h-160};
  ctx.strokeStyle=cssVar('--dune'); ctx.lineWidth=2;
  for(let i=0;i<4;i++){
    const gy=inner.y + i*(inner.h/3);
    ctx.beginPath(); ctx.moveTo(inner.x,gy); ctx.lineTo(inner.x+inner.w,gy); ctx.stroke();
  }
  if(!days.length){
    ctx.fillStyle=cssVar('--muted'); ctx.font='500 24px Manrope, sans-serif'; ctx.fillText('No contractions recorded yet', inner.x, inner.y+inner.h/2); return;
  }
  const maxCount=Math.max(1,...days.map(d=>d.count));
  const maxDuration=Math.max(60,...days.map(d=>d.avgDuration||0));
  const gap=18, bw=Math.max(70,(inner.w-gap*(days.length-1))/days.length);
  let prev=null;
  days.forEach((d,i)=>{
    const bx=inner.x+i*(bw+gap), bh=(d.count/maxCount)*(inner.h-40), by=inner.y+inner.h-bh;
    fillRoundRect(ctx,bx,by,bw,bh,16,cssVar('--accent'));
    const py=inner.y+inner.h-((d.avgDuration||0)/maxDuration)*(inner.h-40);
    ctx.fillStyle='#D1A65B'; ctx.beginPath(); ctx.arc(bx+bw/2, py, 7, 0, Math.PI*2); ctx.fill();
    if(prev){ ctx.strokeStyle='#D1A65B'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(bx+bw/2, py); ctx.stroke(); }
    prev={x:bx+bw/2,y:py};
    ctx.fillStyle=cssVar('--muted'); ctx.font='500 18px Manrope, sans-serif'; ctx.textAlign='center';
    ctx.fillText(d.day.slice(5), bx+bw/2, inner.y+inner.h+28);
  });
  ctx.textAlign='left';
}
function exportDailyOverviewPng(){
  const days=groupByDay();
  const extra=Math.max(0, days.length-4)*92;
  const {canvas,ctx,width,height}=createExportSurface(1500, 1600 + extra);
  drawExportHeader(ctx,width,'daily overview','by HangingSense · V3.0','PNG');
  drawDailyOverviewChart(ctx,80,230,width-160,560,days);
  const total=state.contractions.length;
  const avgDurationText=formatShort(avg(state.contractions.map(x=>x.duration)));
  drawMetricCard(ctx,80,822,(width-208)/3,170,'Total contractions', String(total));
  drawMetricCard(ctx,104+(width-208)/3,822,(width-208)/3,170,'Avg duration', avgDurationText);
  drawMetricCard(ctx,128+2*(width-208)/3,822,(width-208)/3,170,'Tracked days', String(days.length));
  let y=1032;
  if(!days.length){
    drawInfoCard(ctx,80,y,width-160,140,'No data',['Track contractions first, then export again.']);
  } else {
    days.forEach(d=>{
      fillRoundRect(ctx,80,y,width-160,120,28,'rgba(255,252,247,0.96)',cssVar('--dune'));
      ctx.fillStyle=cssVar('--text'); ctx.font='700 28px Manrope, sans-serif'; ctx.fillText(d.day, 108, y+44);
      ctx.fillStyle=cssVar('--muted'); ctx.font='500 22px Manrope, sans-serif';
      ctx.fillText(`Count ${d.count}   ·   Avg duration ${formatShort(d.avgDuration)}   ·   Avg interval ${formatShort(d.avgInterval)}   ·   Avg rest ${formatShort(d.avgRest)}${d.avgPain!=null?`   ·   Avg intensity ${d.avgPain.toFixed(1)}/10`:''}`,108,y+84);
      y+=136;
    });
  }
  downloadCanvas(canvas, `ConTrack_daily_overview_${fileStamp()}.png`);
  toast('Daily overview PNG created');
}

loadState();
renderThemes();
renderPainGrid();
applyTheme(state.theme);
applyLanguage();
if(state.activeStart) startTick(); else stopTick();
updateTimerUI();

document.getElementById('toggleTimer').onclick=()=>state.activeStart?endContraction():startContraction();
document.getElementById('activeStop').onclick=endContraction;
document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>switchPage(b.dataset.page));
document.getElementById('painSave').onclick=()=>savePain(true);
document.getElementById('painSkip').onclick=()=>savePain(false);
document.getElementById('painSheet').onclick=e=>{if(e.target.id==='painSheet')closePain();};
document.getElementById('languageSelect').onchange=e=>{state.language=e.target.value;saveState();applyLanguage();};
document.getElementById('exportCsvBtn').onclick=exportCsv;
document.getElementById('exportJsonBtn').onclick=exportJson;
document.getElementById('exportScreenBtn').onclick=exportCurrentScreenPng;
document.getElementById('exportDailyBtn').onclick=exportDailyOverviewPng;
document.getElementById('newSessionBtn').onclick=()=>{
  if(confirm('Start a new session and clear the current contraction list?')) {
    state.contractions=[];state.activeStart=null;state.sessionStartedAt=Date.now();saveState();stopTick();updateTimerUI();renderAll();toast('New session started');
  }
};
window.addEventListener('resize',()=>requestAnimationFrame(drawCharts));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateTimerUI();});
