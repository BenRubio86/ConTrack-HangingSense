(() => {
  const STORE = 'contrack_v3_1_state';
  const defaultState = {
    contractions: [],
    activeStart: null,
    theme: 'hanging',
    lang: 'en',
    pendingIntensityId: null,
    summaryRange: '60',
    historyFilter: 'today'
  };

  const THEMES = [
    { id: 'hanging', name: 'Hanging Sense', colors: ['#fff9f1', '#6d3b24', '#f2a13a'] },
    { id: 'calm', name: 'Calm', colors: ['#fff8f4', '#8f5a4b', '#cf8d72'] },
    { id: 'serenity', name: 'Serenity', colors: ['#f7faf8', '#46655b', '#9bb9ac'] },
    { id: 'minimal', name: 'Minimal', colors: ['#fbfaf8', '#37342f', '#c7a36a'] },
    { id: 'night', name: 'Night', colors: ['#171310', '#f7efe5', '#d99138'] }
  ];

  const LANGS = [
    ['en', '🇬🇧 English'],
    ['de', '🇩🇪 Deutsch'],
    ['fr', '🇫🇷 Français'],
    ['es', '🇪🇸 Español'],
    ['fa', '🇮🇷 فارسی'],
    ['zh', '🇨🇳 中文'],
    ['hi', '🇮🇳 हिन्दी'],
    ['ar', '🇸🇦 العربية'],
    ['ru', '🇷🇺 Русский'],
    ['ko', '🇰🇷 한국어'],
    ['ja', '🇯🇵 日本語']
  ];

  const I18N = {
    en: {
      companion: 'your labour companion', trackKicker: 'Contraction timer', ready: 'Ready', tapWhenBegins: 'Tap when a contraction begins',
      start: 'Start', stop: 'Stop', recording: 'Recording', inProgress: 'Contraction in progress', lastContraction: 'Last contraction',
      noneYet: 'None recorded yet', recentRhythm: 'Recent rhythm', lastFive: 'Last 5 contractions', track: 'Track', history: 'History',
      summary: 'Summary', more: 'More', historySubtitle: 'Your contraction record', today: 'Today', all: 'All', duration: 'Duration (sec)',
      interval: 'Spacing', intensity: 'Intensity', summarySubtitle: 'Your contraction activity at a glance', recentPattern: 'Recent pattern',
      lastHourDescription: 'Contractions over the selected time range', last60: 'Last 60 minutes', sessionSummary: 'Session summary',
      shareSummary: 'Share summary', exportPng: 'Export chart PNG', moreSubtitle: 'Personalise, export and learn', appearance: 'Appearance',
      language: 'Language', data: 'Data', exportCsv: 'Export CSV', backupJson: 'Backup JSON', restoreJson: 'Restore JSON', resetAll: 'Reset all data',
      brandStatement: 'A calm digital birth companion with a human identity.', saved: 'Contraction saved', howIntense: 'How intense was it?', skip: 'Skip',
      editContraction: 'Edit contraction', startTime: 'Start time', notes: 'Notes', save: 'Save', delete: 'Delete', contractions: 'contractions',
      typicalDuration: 'Typical duration', typicalSpacing: 'Typical spacing', typicalIntensity: 'Typical intensity', noData: 'No contractions recorded yet.',
      shareFallback: 'Summary copied to clipboard.', exported: 'Export created.', restored: 'Backup restored.',
      resetConfirm: 'Delete all recorded contractions and settings?', deleted: 'Contraction deleted.', savedToast: 'Saved.', invalidBackup: 'Could not restore this file.',
      legendDuration: 'Bar height = duration', legendIntensity: 'Top dot / label = intensity', creatorTitle: 'App creator', creatorLabel: 'Created by',
      creatorDescription: 'Digital product concept, AI implementation and release support.', contactTitle: 'Doula contact scans', saveImage: 'Save image'
    },
    de: {
      companion: 'dein Begleiter für die Geburt', trackKicker: 'Wehentimer', ready: 'Bereit', tapWhenBegins: 'Tippen, wenn eine Wehe beginnt', start: 'Start', stop: 'Stopp',
      recording: 'Aufzeichnung', inProgress: 'Wehe läuft', lastContraction: 'Letzte Wehe', noneYet: 'Noch keine Wehe erfasst', recentRhythm: 'Letzter Rhythmus', lastFive: 'Letzte 5 Wehen',
      track: 'Track', history: 'Verlauf', summary: 'Übersicht', more: 'Mehr', historySubtitle: 'Dein Wehenverlauf', today: 'Heute', all: 'Alle', duration: 'Dauer (Sek.)',
      interval: 'Abstand', intensity: 'Intensität', summarySubtitle: 'Deine Wehen auf einen Blick', recentPattern: 'Letztes Muster', lastHourDescription: 'Wehen im ausgewählten Zeitraum',
      last60: 'Letzte 60 Minuten', sessionSummary: 'Zusammenfassung', shareSummary: 'Übersicht teilen', exportPng: 'Diagramm als PNG', moreSubtitle: 'Personalisieren, exportieren und mehr',
      appearance: 'Design', language: 'Sprache', data: 'Daten', exportCsv: 'CSV exportieren', backupJson: 'JSON-Sicherung', restoreJson: 'JSON wiederherstellen', resetAll: 'Alle Daten löschen',
      brandStatement: 'Ein ruhiger digitaler Geburtsbegleiter mit menschlicher Identität.', saved: 'Wehe gespeichert', howIntense: 'Wie intensiv war sie?', skip: 'Überspringen',
      editContraction: 'Wehe bearbeiten', startTime: 'Startzeit', notes: 'Notizen', save: 'Speichern', delete: 'Löschen', contractions: 'Wehen', typicalDuration: 'Typische Dauer',
      typicalSpacing: 'Typischer Abstand', typicalIntensity: 'Typische Intensität', noData: 'Noch keine Wehen erfasst.', shareFallback: 'Zusammenfassung kopiert.', exported: 'Export erstellt.',
      restored: 'Sicherung wiederhergestellt.', resetConfirm: 'Alle Wehendaten und Einstellungen löschen?', deleted: 'Wehe gelöscht.', savedToast: 'Gespeichert.', invalidBackup: 'Datei konnte nicht wiederhergestellt werden.',
      legendDuration: 'Balkenhöhe = Dauer', legendIntensity: 'Punkt / Zahl oben = Intensität', creatorTitle: 'App-Ersteller', creatorLabel: 'Erstellt von', creatorDescription: 'Digitale Produktidee, KI-Umsetzung und Release-Support.',
      contactTitle: 'Doula-Kontaktcodes', saveImage: 'Bild speichern'
    },
    fr: { companion: 'votre compagnon de travail', trackKicker: 'Minuteur de contractions', ready: 'Prête', tapWhenBegins: 'Touchez quand une contraction commence', start: 'Démarrer', stop: 'Arrêter', recording: 'En cours', inProgress: 'Contraction en cours', lastContraction: 'Dernière contraction', noneYet: 'Aucune contraction enregistrée', recentRhythm: 'Rythme récent', lastFive: '5 dernières contractions', track: 'Suivi', history: 'Historique', summary: 'Résumé', more: 'Plus', historySubtitle: 'Votre historique de contractions', today: "Aujourd'hui", all: 'Tout', duration: 'Durée (s)', interval: 'Espacement', intensity: 'Intensité', summarySubtitle: 'Vos contractions en un coup d’œil', recentPattern: 'Rythme récent', lastHourDescription: 'Contractions sur la période choisie', last60: '60 dernières minutes', sessionSummary: 'Résumé de session', shareSummary: 'Partager le résumé', exportPng: 'Exporter le PNG', moreSubtitle: 'Personnaliser, exporter et apprendre', appearance: 'Apparence', language: 'Langue', data: 'Données', exportCsv: 'Exporter CSV', backupJson: 'Sauvegarde JSON', restoreJson: 'Restaurer JSON', resetAll: 'Effacer toutes les données', brandStatement: 'Un compagnon numérique calme pour la naissance.', saved: 'Contraction enregistrée', howIntense: 'Quelle était son intensité ?', skip: 'Ignorer', editContraction: 'Modifier la contraction', startTime: 'Heure de début', notes: 'Notes', save: 'Enregistrer', delete: 'Supprimer', contractions: 'contractions', typicalDuration: 'Durée typique', typicalSpacing: 'Espacement typique', typicalIntensity: 'Intensité typique', noData: 'Aucune contraction enregistrée.' },
    es: { companion: 'tu compañero para el parto', trackKicker: 'Temporizador de contracciones', ready: 'Lista', tapWhenBegins: 'Toca cuando comience una contracción', start: 'Iniciar', stop: 'Detener', recording: 'Grabando', inProgress: 'Contracción en curso', lastContraction: 'Última contracción', noneYet: 'Aún no hay contracciones', recentRhythm: 'Ritmo reciente', lastFive: 'Últimas 5 contracciones', track: 'Medir', history: 'Historial', summary: 'Resumen', more: 'Más', historySubtitle: 'Tu registro de contracciones', today: 'Hoy', all: 'Todas', duration: 'Duración (s)', interval: 'Intervalo', intensity: 'Intensidad', summarySubtitle: 'Tus contracciones de un vistazo', recentPattern: 'Patrón reciente', lastHourDescription: 'Contracciones en el período seleccionado', last60: 'Últimos 60 minutos', sessionSummary: 'Resumen de sesión', shareSummary: 'Compartir resumen', exportPng: 'Exportar gráfico PNG', moreSubtitle: 'Personaliza, exporta y aprende', appearance: 'Apariencia', language: 'Idioma', data: 'Datos', exportCsv: 'Exportar CSV', backupJson: 'Copia JSON', restoreJson: 'Restaurar JSON', resetAll: 'Borrar todos los datos', brandStatement: 'Un compañero digital y humano para el parto.', saved: 'Contracción guardada', howIntense: '¿Qué intensidad tuvo?', skip: 'Omitir', editContraction: 'Editar contracción', startTime: 'Hora de inicio', notes: 'Notas', save: 'Guardar', delete: 'Eliminar', contractions: 'contracciones', typicalDuration: 'Duración típica', typicalSpacing: 'Intervalo típico', typicalIntensity: 'Intensidad típica', noData: 'Aún no hay contracciones.' },
    zh: { companion: '你的分娩陪伴助手', trackKicker: '宫缩计时器', ready: '准备好', tapWhenBegins: '宫缩开始时点击', start: '开始', stop: '停止', recording: '记录中', inProgress: '宫缩进行中', lastContraction: '上次宫缩', noneYet: '尚未记录宫缩', recentRhythm: '近期节律', lastFive: '最近5次宫缩', track: '计时', history: '记录', summary: '总结', more: '更多', historySubtitle: '你的宫缩记录', today: '今天', all: '全部', duration: '持续时间（秒）', interval: '间隔', intensity: '强度', summarySubtitle: '一目了然查看宫缩情况', recentPattern: '近期模式', lastHourDescription: '所选时间范围的宫缩', last60: '过去60分钟', sessionSummary: '本次总结', shareSummary: '分享总结', exportPng: '导出图表PNG', moreSubtitle: '个性化、导出与了解更多', appearance: '外观', language: '语言', data: '数据', exportCsv: '导出CSV', backupJson: '备份JSON', restoreJson: '恢复JSON', resetAll: '清除全部数据', brandStatement: '一个平静而有人情味的数字分娩陪伴助手。', saved: '宫缩已保存', howIntense: '强度如何？', skip: '跳过', editContraction: '编辑宫缩', startTime: '开始时间', notes: '备注', save: '保存', delete: '删除', contractions: '次宫缩', typicalDuration: '典型持续时间', typicalSpacing: '典型间隔', typicalIntensity: '典型强度', noData: '尚未记录宫缩。' },
    ar: { companion: 'رفيقك الهادئ أثناء المخاض', trackKicker: 'مؤقت الانقباضات', ready: 'جاهزة', tapWhenBegins: 'اضغطي عند بدء الانقباض', start: 'ابدئي', stop: 'إيقاف', recording: 'جارٍ التسجيل', inProgress: 'الانقباض جارٍ', lastContraction: 'آخر انقباض', noneYet: 'لا توجد انقباضات مسجلة', recentRhythm: 'الإيقاع الأخير', lastFive: 'آخر 5 انقباضات', track: 'تتبع', history: 'السجل', summary: 'الملخص', more: 'المزيد', historySubtitle: 'سجل الانقباضات', today: 'اليوم', all: 'الكل', duration: 'المدة (ث)', interval: 'الفاصل', intensity: 'الشدة', summarySubtitle: 'نظرة سريعة على نشاط الانقباضات', recentPattern: 'النمط الأخير', lastHourDescription: 'انقباضات النطاق الزمني المحدد', last60: 'آخر 60 دقيقة', sessionSummary: 'ملخص الجلسة', shareSummary: 'مشاركة الملخص', exportPng: 'تصدير الرسم PNG', moreSubtitle: 'تخصيص وتصدير والمزيد', appearance: 'المظهر', language: 'اللغة', data: 'البيانات', exportCsv: 'تصدير CSV', backupJson: 'نسخة JSON', restoreJson: 'استعادة JSON', resetAll: 'مسح جميع البيانات', brandStatement: 'رفيق رقمي هادئ للولادة بهوية إنسانية.', saved: 'تم حفظ الانقباض', howIntense: 'ما شدة الانقباض؟', skip: 'تخطي', editContraction: 'تعديل الانقباض', startTime: 'وقت البدء', notes: 'ملاحظات', save: 'حفظ', delete: 'حذف', contractions: 'انقباضات', typicalDuration: 'المدة المعتادة', typicalSpacing: 'الفاصل المعتاد', typicalIntensity: 'الشدة المعتادة', noData: 'لا توجد انقباضات مسجلة.' },
    fa: { companion: 'همراه آرام شما در زایمان', trackKicker: 'زمان‌سنج انقباض', ready: 'آماده', tapWhenBegins: 'با شروع انقباض لمس کنید', start: 'شروع', stop: 'توقف', recording: 'در حال ثبت', inProgress: 'انقباض در حال انجام', lastContraction: 'آخرین انقباض', noneYet: 'هنوز انقباضی ثبت نشده', recentRhythm: 'ریتم اخیر', lastFive: '۵ انقباض اخیر', track: 'ثبت', history: 'تاریخچه', summary: 'خلاصه', more: 'بیشتر', historySubtitle: 'سابقه انقباض‌ها', today: 'امروز', all: 'همه', duration: 'مدت (ثانیه)', interval: 'فاصله', intensity: 'شدت', summarySubtitle: 'مروری سریع بر انقباض‌ها', recentPattern: 'الگوی اخیر', lastHourDescription: 'انقباض‌ها در بازه زمانی انتخاب‌شده', last60: '۶۰ دقیقه اخیر', sessionSummary: 'خلاصه جلسه', shareSummary: 'اشتراک‌گذاری خلاصه', exportPng: 'خروجی PNG نمودار', moreSubtitle: 'شخصی‌سازی، خروجی و بیشتر', appearance: 'ظاهر', language: 'زبان', data: 'داده‌ها', exportCsv: 'خروجی CSV', backupJson: 'پشتیبان JSON', restoreJson: 'بازیابی JSON', resetAll: 'پاک کردن همه داده‌ها', brandStatement: 'همراه دیجیتال آرام برای تولد با هویتی انسانی.', saved: 'انقباض ذخیره شد', howIntense: 'شدت چقدر بود؟', skip: 'رد کردن', editContraction: 'ویرایش انقباض', startTime: 'زمان شروع', notes: 'یادداشت', save: 'ذخیره', delete: 'حذف', contractions: 'انقباض', typicalDuration: 'مدت معمول', typicalSpacing: 'فاصله معمول', typicalIntensity: 'شدت معمول', noData: 'هنوز انقباضی ثبت نشده است.' },
    hi: { companion: 'आपका शांत प्रसव साथी', trackKicker: 'कॉन्ट्रैक्शन टाइमर', ready: 'तैयार', tapWhenBegins: 'संकुचन शुरू होने पर टैप करें', start: 'शुरू करें', stop: 'रोकें', recording: 'रिकॉर्डिंग', inProgress: 'संकुचन चल रहा है', lastContraction: 'पिछला संकुचन', noneYet: 'अभी तक कोई संकुचन दर्ज नहीं', recentRhythm: 'हाल की लय', lastFive: 'पिछले 5 संकुचन', track: 'ट्रैक', history: 'इतिहास', summary: 'सारांश', more: 'अधिक', historySubtitle: 'आपका संकुचन रिकॉर्ड', today: 'आज', all: 'सभी', duration: 'अवधि (सेकंड)', interval: 'अंतराल', intensity: 'तीव्रता', summarySubtitle: 'एक नज़र में संकुचन गतिविधि', recentPattern: 'हाल का पैटर्न', lastHourDescription: 'चुने गए समय की संकुचन गतिविधि', last60: 'पिछले 60 मिनट', sessionSummary: 'सत्र सारांश', shareSummary: 'सारांश साझा करें', exportPng: 'चार्ट PNG निर्यात करें', moreSubtitle: 'वैयक्तिकरण, निर्यात और अधिक', appearance: 'रूप', language: 'भाषा', data: 'डेटा', exportCsv: 'CSV निर्यात', backupJson: 'JSON बैकअप', restoreJson: 'JSON पुनर्स्थापित करें', resetAll: 'सभी डेटा रीसेट करें', brandStatement: 'मानवीय पहचान वाला शांत डिजिटल जन्म साथी।', saved: 'संकुचन सहेजा गया', howIntense: 'तीव्रता कितनी थी?', skip: 'छोड़ें', editContraction: 'संकुचन संपादित करें', startTime: 'शुरू समय', notes: 'नोट्स', save: 'सहेजें', delete: 'हटाएँ', contractions: 'संकुचन', typicalDuration: 'सामान्य अवधि', typicalSpacing: 'सामान्य अंतराल', typicalIntensity: 'सामान्य तीव्रता', noData: 'अभी तक कोई संकुचन दर्ज नहीं।' },
    ru: { companion: 'спокойный помощник во время родов', trackKicker: 'Таймер схваток', ready: 'Готово', tapWhenBegins: 'Нажмите, когда схватка начнётся', start: 'Старт', stop: 'Стоп', recording: 'Запись', inProgress: 'Схватка идёт', lastContraction: 'Последняя схватка', noneYet: 'Схваток пока нет', recentRhythm: 'Недавний ритм', lastFive: 'Последние 5 схваток', track: 'Таймер', history: 'История', summary: 'Сводка', more: 'Ещё', historySubtitle: 'История схваток', today: 'Сегодня', all: 'Все', duration: 'Длительность (с)', interval: 'Интервал', intensity: 'Интенсивность', summarySubtitle: 'Активность схваток с первого взгляда', recentPattern: 'Недавний рисунок', lastHourDescription: 'Схватки за выбранный период', last60: 'Последние 60 минут', sessionSummary: 'Сводка сессии', shareSummary: 'Поделиться сводкой', exportPng: 'Экспорт PNG', moreSubtitle: 'Настройка, экспорт и другое', appearance: 'Внешний вид', language: 'Язык', data: 'Данные', exportCsv: 'Экспорт CSV', backupJson: 'Резерв JSON', restoreJson: 'Восстановить JSON', resetAll: 'Сбросить данные', brandStatement: 'Спокойный цифровой помощник для родов с человеческой идентичностью.', saved: 'Схватка сохранена', howIntense: 'Насколько сильной была схватка?', skip: 'Пропустить', editContraction: 'Редактировать схватку', startTime: 'Время начала', notes: 'Заметки', save: 'Сохранить', delete: 'Удалить', contractions: 'схваток', typicalDuration: 'Типичная длительность', typicalSpacing: 'Типичный интервал', typicalIntensity: 'Типичная интенсивность', noData: 'Схваток пока нет.' },
    ko: { companion: '차분한 분만 동반자', trackKicker: '진통 타이머', ready: '준비됨', tapWhenBegins: '진통이 시작되면 탭하세요', start: '시작', stop: '정지', recording: '기록 중', inProgress: '진통 진행 중', lastContraction: '마지막 진통', noneYet: '아직 기록된 진통이 없습니다', recentRhythm: '최근 리듬', lastFive: '최근 5회 진통', track: '기록', history: '기록', summary: '요약', more: '더보기', historySubtitle: '진통 기록', today: '오늘', all: '전체', duration: '지속 시간(초)', interval: '간격', intensity: '강도', summarySubtitle: '진통 활동 한눈에 보기', recentPattern: '최근 패턴', lastHourDescription: '선택한 시간 범위의 진통', last60: '최근 60분', sessionSummary: '세션 요약', shareSummary: '요약 공유', exportPng: '차트 PNG 내보내기', moreSubtitle: '개인화, 내보내기 및 더보기', appearance: '모양', language: '언어', data: '데이터', exportCsv: 'CSV 내보내기', backupJson: 'JSON 백업', restoreJson: 'JSON 복원', resetAll: '모든 데이터 초기화', brandStatement: '인간적인 정체성을 담은 차분한 디지털 출산 동반자.', saved: '진통이 저장되었습니다', howIntense: '강도는 어느 정도였나요?', skip: '건너뛰기', editContraction: '진통 수정', startTime: '시작 시간', notes: '메모', save: '저장', delete: '삭제', contractions: '진통', typicalDuration: '일반적인 지속 시간', typicalSpacing: '일반적인 간격', typicalIntensity: '일반적인 강도', noData: '아직 기록된 진통이 없습니다.' },
    ja: { companion: 'やさしい陣痛サポーター', trackKicker: '陣痛タイマー', ready: '準備完了', tapWhenBegins: '陣痛が始まったらタップ', start: '開始', stop: '停止', recording: '記録中', inProgress: '陣痛中', lastContraction: '前回の陣痛', noneYet: 'まだ記録がありません', recentRhythm: '最近のリズム', lastFive: '最近5回の陣痛', track: '計測', history: '履歴', summary: '概要', more: 'その他', historySubtitle: '陣痛の記録', today: '今日', all: 'すべて', duration: '継続時間（秒）', interval: '間隔', intensity: '強さ', summarySubtitle: '陣痛の状況をひと目で確認', recentPattern: '最近のパターン', lastHourDescription: '選択した期間の陣痛', last60: '過去60分', sessionSummary: 'セッション概要', shareSummary: '概要を共有', exportPng: 'PNGを書き出す', moreSubtitle: '設定・書き出し・その他', appearance: '外観', language: '言語', data: 'データ', exportCsv: 'CSVを書き出す', backupJson: 'JSONバックアップ', restoreJson: 'JSONを復元', resetAll: 'すべてのデータを消去', brandStatement: '人間らしい温かさを持つ、穏やかなデジタル出産コンパニオン。', saved: '陣痛を保存しました', howIntense: '強さはどれくらいでしたか？', skip: 'スキップ', editContraction: '陣痛を編集', startTime: '開始時刻', notes: 'メモ', save: '保存', delete: '削除', contractions: '回の陣痛', typicalDuration: '一般的な継続時間', typicalSpacing: '一般的な間隔', typicalIntensity: '一般的な強さ', noData: 'まだ陣痛は記録されていません。' }
  };

  let state = load();
  let tick = null;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const els = {
    timerButton: $('#timerButton'), timerValue: $('#timerValue'), timerCaption: $('#timerCaption'), heroState: $('#heroState'), heroSub: $('#heroSub'),
    lastValue: $('#lastValue'), rhythm: $('#rhythm'), historyList: $('#historyList'), summaryChart: $('#summaryChart'), metrics: $('#metrics'), sessionSummaryText: $('#sessionSummaryText'),
    intensitySheet: $('#intensitySheet'), editSheet: $('#editSheet'), sheetBackdrop: $('#sheetBackdrop'), intensityGrid: $('#intensityGrid'), savedDuration: $('#savedDuration'),
    toast: $('#toast'), languageSelect: $('#languageSelect')
  };

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (raw) return { ...defaultState, ...raw };
    } catch {}
    return structuredClone ? structuredClone(defaultState) : JSON.parse(JSON.stringify(defaultState));
  }
  function persist() { localStorage.setItem(STORE, JSON.stringify(state)); }
  function t(key) { return I18N[state.lang]?.[key] || I18N.en[key] || key; }
  function isRTL() { return ['ar', 'fa'].includes(state.lang); }
  function toast(msg) { if (!msg) return; els.toast.textContent = msg; els.toast.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => els.toast.classList.remove('show'), 1800); }

  function fmtClock(ts) { return new Date(ts).toLocaleTimeString(state.lang, { hour: '2-digit', minute: '2-digit' }); }
  function fmtDate(ts) { return new Date(ts).toLocaleDateString(state.lang, { day: 'numeric', month: 'short', year: 'numeric' }); }
  function fmtDurationLocal(sec) {
    sec = Math.max(0, Math.round(Number(sec || 0)));
    const m = Math.floor(sec / 60), s = sec % 60;
    return m ? `${m}m ${String(s).padStart(2, '0')}s` : `${s} sec`;
  }
  function fmtAgo(ts) {
    const sec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (sec < 60) return `${sec} sec ago`;
    const m = Math.floor(sec / 60);
    if (m < 60) return `${m} min ago`;
    const h = Math.floor(m / 60);
    return `${h} h ago`;
  }
  function uid() { return `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`; }
  function sortedContractions() { return [...state.contractions].sort((a, b) => a.start - b.start); }
  function getIndex(id) { return sortedContractions().findIndex(x => x.id === id); }
  function intervalFor(item) {
    const items = sortedContractions();
    const idx = items.findIndex(x => x.id === item.id);
    if (idx <= 0) return null;
    return Math.max(0, Math.round((item.start - items[idx - 1].end) / 1000));
  }
  function median(nums) {
    if (!nums.length) return 0;
    const a = [...nums].sort((x, y) => x - y);
    const mid = Math.floor(a.length / 2);
    return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
  }
  function metricsFor(items) {
    const durations = items.map(x => x.durationSec).filter(Boolean);
    const gaps = items.map(x => intervalFor(x)).filter(v => v != null && !isNaN(v));
    const ints = items.map(x => Number(x.intensity)).filter(v => !isNaN(v));
    return {
      count: items.length,
      typicalDuration: durations.length ? median(durations) : null,
      typicalSpacing: gaps.length ? median(gaps) : null,
      typicalIntensity: ints.length ? median(ints) : null,
      durations,
      gaps,
      intensities: ints
    };
  }
  function filteredHistoryItems() {
    const items = sortedContractions().reverse();
    if (state.historyFilter === 'all') return items;
    const today = new Date();
    return items.filter(x => {
      const d = new Date(x.start);
      return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
    });
  }
  function filteredSummaryItems() {
    const items = sortedContractions();
    if (state.summaryRange === 'all') return items;
    const mins = Number(state.summaryRange || 60);
    const since = Date.now() - mins * 60 * 1000;
    return items.filter(x => x.start >= since);
  }
  function currentRangeLabel() {
    if (state.summaryRange === 'all') return t('all');
    const mins = Number(state.summaryRange || 60);
    return mins === 60 ? '1 h' : mins === 180 ? '3 h' : `${mins} min`;
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
    els.languageSelect.value = state.lang;
    renderAll();
  }

  function startTicker() {
    clearInterval(tick);
    tick = setInterval(renderTrackHero, 500);
  }
  function stopTicker() { clearInterval(tick); tick = null; }

  function toggleTimer() {
    if (!state.activeStart) {
      state.activeStart = Date.now();
      persist();
      startTicker();
      renderTrackHero();
      return;
    }
    const end = Date.now();
    const durationSec = Math.max(1, Math.round((end - state.activeStart) / 1000));
    const item = { id: uid(), start: state.activeStart, end, durationSec, intensity: null, notes: '' };
    state.activeStart = null;
    state.pendingIntensityId = item.id;
    state.contractions.push(item);
    state.contractions.sort((a, b) => a.start - b.start);
    persist();
    stopTicker();
    renderAll();
    openIntensity(item);
  }

  function renderTrackHero() {
    const active = !!state.activeStart;
    els.timerButton.classList.toggle('active', active);
    if (active) {
      const elapsed = Math.max(0, Math.round((Date.now() - state.activeStart) / 1000));
      const m = Math.floor(elapsed / 60), s = elapsed % 60;
      els.timerValue.textContent = `${m ? String(m).padStart(2, '0') : '00'}:${String(s).padStart(2, '0')}`;
      els.timerCaption.textContent = t('stop');
      els.heroState.textContent = t('recording');
      els.heroSub.textContent = t('inProgress');
    } else {
      els.timerValue.textContent = t('start').toUpperCase();
      els.timerCaption.textContent = t('start');
      els.heroState.textContent = t('ready');
      els.heroSub.textContent = t('tapWhenBegins');
    }
  }

  function renderTrack() {
    renderTrackHero();
    const items = sortedContractions();
    const last = items[items.length - 1];
    els.lastValue.textContent = last ? `${fmtDurationLocal(last.durationSec)} · ${fmtAgo(last.end)}` : t('noneYet');

    els.rhythm.innerHTML = '';
    const bars = items.slice(-5);
    if (!bars.length) {
      els.rhythm.innerHTML = `<div class="chart-empty">${t('noData')}</div>`;
    } else {
      const max = Math.max(...bars.map(x => x.durationSec), 60);
      bars.forEach(item => {
        const pulse = document.createElement('div');
        pulse.className = 'pulse';
        pulse.style.height = `${28 + (item.durationSec / max) * 56}px`;
        pulse.title = `${fmtClock(item.start)} · ${fmtDurationLocal(item.durationSec)}${item.intensity ? ` · ${t('intensity')} ${item.intensity}` : ''}`;
        els.rhythm.appendChild(pulse);
      });
    }
  }

  function renderHistory() {
    const items = filteredHistoryItems();
    els.historyList.innerHTML = '';
    $$('[data-history-filter]').forEach(btn => btn.classList.toggle('active', btn.dataset.historyFilter === state.historyFilter));
    if (!items.length) {
      els.historyList.innerHTML = `<div class="history-empty">${t('noData')}</div>`;
      return;
    }
    items.forEach(item => {
      const row = document.createElement('button');
      row.className = 'history-row';
      const interval = intervalFor(item);
      row.innerHTML = `
        <div class="history-time"><strong>${fmtClock(item.start)}</strong><small>${fmtDate(item.start)}</small></div>
        <div class="history-stats">
          <div class="stat-chip"><b>${fmtDurationLocal(item.durationSec)}</b><span>${t('duration')}</span></div>
          <div class="stat-chip"><b>${interval != null ? fmtDurationLocal(interval) : '—'}</b><span>${t('interval')}</span></div>
          <div class="stat-chip"><b>${item.intensity ?? '—'}/10</b><span>${t('intensity')}</span></div>
        </div>
        <div class="history-chevron">›</div>`;
      row.addEventListener('click', () => openEdit(item.id));
      els.historyList.appendChild(row);
    });
  }

  function renderSummary() {
    $$('[data-range]').forEach(btn => btn.classList.toggle('active', btn.dataset.range === String(state.summaryRange)));
    const items = filteredSummaryItems();
    const metrics = metricsFor(items);

    els.summaryChart.innerHTML = '';
    if (!items.length) {
      els.summaryChart.innerHTML = `<div class="chart-empty">${t('noData')}</div>`;
    } else {
      const recent = items.slice(-18);
      const max = Math.max(...recent.map(x => x.durationSec), 60);
      recent.forEach(item => {
        const col = document.createElement('div');
        col.className = 'chart-col';
        const top = document.createElement('div');
        top.className = 'chart-intensity';
        top.textContent = item.intensity ?? '•';
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${36 + (item.durationSec / max) * 104}px`;
        bar.title = `${fmtClock(item.start)} · ${fmtDurationLocal(item.durationSec)}${item.intensity ? ` · ${t('intensity')} ${item.intensity}/10` : ''}`;
        col.append(top, bar);
        els.summaryChart.appendChild(col);
      });
    }

    const displayMetrics = [
      [metrics.count, t('contractions')],
      [metrics.typicalDuration != null ? fmtDurationLocal(metrics.typicalDuration) : '—', t('typicalDuration')],
      [metrics.typicalSpacing != null ? fmtDurationLocal(metrics.typicalSpacing) : '—', t('typicalSpacing')],
      [metrics.typicalIntensity != null ? `${Math.round(metrics.typicalIntensity * 10) / 10}/10` : '—', t('typicalIntensity')]
    ];
    els.metrics.innerHTML = displayMetrics.map(([v, l]) => `<div class="metric"><div class="value">${v}</div><div class="label">${l}</div></div>`).join('');

    if (!items.length) {
      els.sessionSummaryText.textContent = t('noData');
    } else {
      els.sessionSummaryText.textContent = `${metrics.count} ${t('contractions')} · ${t('typicalDuration')}: ${metrics.typicalDuration != null ? fmtDurationLocal(metrics.typicalDuration) : '—'} · ${t('typicalSpacing')}: ${metrics.typicalSpacing != null ? fmtDurationLocal(metrics.typicalSpacing) : '—'} · ${t('typicalIntensity')}: ${metrics.typicalIntensity != null ? `${Math.round(metrics.typicalIntensity * 10) / 10}/10` : '—'} · ${currentRangeLabel()}.`;
    }
  }

  function renderThemes() {
    const grid = $('#themeGrid');
    grid.innerHTML = '';
    THEMES.forEach(th => {
      const btn = document.createElement('button');
      btn.className = `theme-card${state.theme === th.id ? ' active' : ''}`;
      btn.innerHTML = `<div class="theme-preview" style="background:${th.colors[0]};color:${th.colors[1]}"><span style="font-size:12px;font-weight:800">Aa</span><span class="mini-orb" style="background:${th.colors[2]}"></span></div><div class="theme-name">${th.name}</div>`;
      btn.addEventListener('click', () => { state.theme = th.id; persist(); applyTheme(); renderThemes(); });
      grid.appendChild(btn);
    });
  }

  function renderAll() { renderTrack(); renderHistory(); renderSummary(); renderThemes(); }

  function applyTheme() {
    if (state.theme === 'hanging') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', state.theme);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#fff9f1');
  }

  function openSheet(el) { els.sheetBackdrop.hidden = false; el.hidden = false; }
  function closeSheets() { els.sheetBackdrop.hidden = true; els.intensitySheet.hidden = true; els.editSheet.hidden = true; }

  function openIntensity(item) {
    els.savedDuration.textContent = fmtDurationLocal(item.durationSec);
    els.intensityGrid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const b = document.createElement('button');
      b.className = 'intensity-btn';
      b.textContent = i;
      b.addEventListener('click', () => {
        const target = state.contractions.find(x => x.id === item.id);
        if (target) target.intensity = i;
        state.pendingIntensityId = null;
        persist();
        closeSheets();
        renderAll();
        toast(t('savedToast'));
      });
      els.intensityGrid.appendChild(b);
    }
    openSheet(els.intensitySheet);
  }

  function openEdit(id) {
    const item = state.contractions.find(x => x.id === id);
    if (!item) return;
    $('#editId').value = id;
    $('#editStart').value = new Date(item.start - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    $('#editDuration').value = item.durationSec;
    $('#editIntensity').value = item.intensity ?? '';
    $('#editNotes').value = item.notes || '';
    openSheet(els.editSheet);
  }
  function saveEdit() {
    const item = state.contractions.find(x => x.id === $('#editId').value);
    if (!item) return;
    const dt = new Date($('#editStart').value);
    if (!isNaN(dt)) item.start = dt.getTime();
    item.durationSec = Math.max(1, Number($('#editDuration').value) || 1);
    item.end = item.start + item.durationSec * 1000;
    item.intensity = $('#editIntensity').value ? Math.max(1, Math.min(10, Number($('#editIntensity').value))) : null;
    item.notes = $('#editNotes').value.trim();
    state.contractions.sort((a, b) => a.start - b.start);
    persist();
    closeSheets();
    renderAll();
    toast(t('savedToast'));
  }
  function deleteEdit() {
    const id = $('#editId').value;
    state.contractions = state.contractions.filter(x => x.id !== id);
    persist();
    closeSheets();
    renderAll();
    toast(t('deleted'));
  }

  function navTo(name) {
    $$('.screen').forEach(s => s.classList.toggle('active', s.dataset.screen === name));
    $$('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.nav === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function summaryText() {
    const items = filteredSummaryItems();
    const m = metricsFor(items);
    return [
      'ConTrack V3.1',
      `${t('summary')} · ${currentRangeLabel()}`,
      `${m.count} ${t('contractions')}`,
      `${t('typicalDuration')}: ${m.typicalDuration != null ? fmtDurationLocal(m.typicalDuration) : '—'}`,
      `${t('typicalSpacing')}: ${m.typicalSpacing != null ? fmtDurationLocal(m.typicalSpacing) : '—'}`,
      `${t('typicalIntensity')}: ${m.typicalIntensity != null ? `${Math.round(m.typicalIntensity * 10) / 10}/10` : '—'}`
    ].join('\n');
  }
  async function shareSummary() {
    const text = summaryText();
    if (navigator.share) {
      try { await navigator.share({ title: 'ConTrack summary', text }); return; } catch {}
    }
    try { await navigator.clipboard.writeText(text); toast(t('shareFallback')); } catch {}
  }
  function downloadBlob(name, blob) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
  }
  function exportCsv() {
    const rows = [['id', 'start_iso', 'duration_sec', 'interval_sec', 'intensity', 'notes']].concat(sortedContractions().map(x => [x.id, new Date(x.start).toISOString(), x.durationSec, intervalFor(x) ?? '', x.intensity ?? '', (x.notes || '').replaceAll('"', '""')]));
    const csv = rows.map(r => r.map(v => `"${String(v)}"`).join(',')).join('\n');
    downloadBlob('ConTrack-contractions.csv', new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    toast(t('exported'));
  }
  function exportJson() {
    downloadBlob('ConTrack-backup.json', new Blob([JSON.stringify({ version: '3.1', exportedAt: new Date().toISOString(), state }, null, 2)], { type: 'application/json' }));
    toast(t('exported'));
  }
  function restoreJson(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        const incoming = data.state || data;
        state = { ...defaultState, ...incoming, activeStart: null };
        persist();
        applyTheme();
        applyI18n();
        toast(t('restored'));
      } catch { toast(t('invalidBackup')); }
    };
    r.readAsText(file);
  }
  function reset() {
    if (confirm(t('resetConfirm'))) {
      state = { ...defaultState, theme: state.theme, lang: state.lang };
      persist();
      renderAll();
    }
  }

  function roundRect(ctx, x, y, w, h, r, fill = true) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
    if (fill) ctx.fill(); else ctx.stroke();
  }
  function drawMetricCard(ctx, x, y, w, h, label, value, colors) {
    const [bg, txt] = colors;
    ctx.fillStyle = bg; roundRect(ctx, x, y, w, h, 22, true);
    ctx.fillStyle = txt; ctx.font = '700 20px Arial'; ctx.fillText(label, x + 18, y + 30);
    ctx.font = '800 34px Arial'; ctx.fillText(value, x + 18, y + 78);
  }
  function exportChartPng() {
    const items = filteredSummaryItems();
    const stats = metricsFor(items);
    const W = 1600, H = 1200;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const c = canvas.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const bg = css.getPropertyValue('--bg').trim() || '#fff9f1';
    const surface = css.getPropertyValue('--surface').trim() || '#fffdf8';
    const text = css.getPropertyValue('--text').trim() || '#3b2a22';
    const muted = css.getPropertyValue('--muted').trim() || '#8f7d70';
    const amber = css.getPropertyValue('--amber').trim() || '#f2a13a';
    const amber2 = css.getPropertyValue('--amber2').trim() || '#f7bb63';
    const wood = css.getPropertyValue('--wood').trim() || '#6d3b24';
    const wood2 = css.getPropertyValue('--wood2').trim() || '#915538';
    const border = 'rgba(109,59,36,.12)';

    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.fillStyle = surface; roundRect(c, 44, 44, W - 88, H - 88, 34, true);

    c.fillStyle = text; c.font = '800 48px Arial'; c.fillText('ConTrack V3.1', 90, 120);
    c.font = '700 28px Arial'; c.fillText(`${t('summary')} · ${currentRangeLabel()}`, 90, 164);
    c.fillStyle = muted; c.font = '24px Arial'; c.fillText(new Date().toLocaleString(state.lang), 90, 200);

    // KPI cards
    drawMetricCard(c, 90, 240, 320, 120, t('contractions'), String(stats.count), ['#f7eadc', text]);
    drawMetricCard(c, 430, 240, 320, 120, t('typicalDuration'), stats.typicalDuration != null ? fmtDurationLocal(stats.typicalDuration) : '—', ['#fff3df', text]);
    drawMetricCard(c, 770, 240, 320, 120, t('typicalSpacing'), stats.typicalSpacing != null ? fmtDurationLocal(stats.typicalSpacing) : '—', ['#f6efe3', text]);
    drawMetricCard(c, 1110, 240, 320, 120, t('typicalIntensity'), stats.typicalIntensity != null ? `${Math.round(stats.typicalIntensity * 10) / 10}/10` : '—', ['#f7eadc', text]);

    // Chart area
    const x = 110, y = 470, w = 1320, h = 520;
    c.fillStyle = '#fffdfa'; roundRect(c, 70, 400, 1400, 630, 28, true);
    c.strokeStyle = border; c.lineWidth = 2; c.strokeRect(70, 400, 1400, 630);
    c.fillStyle = text; c.font = '700 30px Arial'; c.fillText(t('recentPattern'), 110, 445);
    c.fillStyle = muted; c.font = '22px Arial'; c.fillText(`${t('legendDuration')} · ${t('legendIntensity')}`, 110, 1010);

    const maxDur = Math.max(60, ...(items.map(i => i.durationSec)));
    const yTicks = 4;
    c.strokeStyle = 'rgba(109,59,36,.10)'; c.lineWidth = 1;
    c.fillStyle = muted; c.font = '20px Arial';
    for (let i = 0; i <= yTicks; i++) {
      const value = Math.round((maxDur / yTicks) * i);
      const yy = y + h - (h * i / yTicks);
      c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke();
      c.fillText(`${value}s`, 78, yy + 6);
    }

    if (!items.length) {
      c.fillStyle = muted; c.font = '30px Arial'; c.fillText(t('noData'), x, y + 100);
    } else {
      const recent = items.slice(-12);
      const gap = 18;
      const barW = Math.min(78, (w - gap * (recent.length - 1)) / recent.length);
      recent.forEach((it, idx) => {
        const bh = Math.max(46, (it.durationSec / maxDur) * (h - 80));
        const bx = x + idx * (barW + gap);
        const by = y + h - bh;
        const grad = c.createLinearGradient(0, by, 0, y + h);
        grad.addColorStop(0, wood2);
        grad.addColorStop(1, amber2);
        c.fillStyle = grad; roundRect(c, bx, by, barW, bh, barW / 2, true);
        c.fillStyle = amber; c.beginPath(); c.arc(bx + barW / 2, by - 14, 9, 0, Math.PI * 2); c.fill();
        c.fillStyle = text; c.font = '700 18px Arial';
        const intText = it.intensity != null ? String(it.intensity) : '—';
        const tw = c.measureText(intText).width;
        c.fillText(intText, bx + barW / 2 - tw / 2, by - 24);
        c.fillText(`${it.durationSec}s`, bx + Math.max(0, barW / 2 - c.measureText(`${it.durationSec}s`).width / 2), by - 44);
        c.fillStyle = muted; c.font = '18px Arial';
        const timeText = fmtClock(it.start);
        c.fillText(timeText, bx + Math.max(0, barW / 2 - c.measureText(timeText).width / 2), y + h + 26);
      });
    }

    canvas.toBlob(blob => downloadBlob('ConTrack-summary-v3.1.png', blob), 'image/png');
    toast(t('exported'));
  }

  // Events
  els.timerButton.addEventListener('click', toggleTimer);
  $$('.nav-item').forEach(btn => btn.addEventListener('click', () => navTo(btn.dataset.nav)));
  $('#quickSettings').addEventListener('click', () => navTo('more'));
  els.sheetBackdrop.addEventListener('click', closeSheets);
  $('#skipIntensity').addEventListener('click', () => { state.pendingIntensityId = null; persist(); closeSheets(); });
  $('#saveEdit').addEventListener('click', saveEdit);
  $('#deleteEdit').addEventListener('click', deleteEdit);
  $$('#summary [data-range]').forEach(btn => btn.addEventListener('click', () => { state.summaryRange = btn.dataset.range; persist(); renderSummary(); }));
  $$('[data-history-filter]').forEach(btn => btn.addEventListener('click', () => { state.historyFilter = btn.dataset.historyFilter; persist(); renderHistory(); }));
  $('#shareSummary').addEventListener('click', shareSummary);
  $('#exportPng').addEventListener('click', exportChartPng);
  $('#exportCsv').addEventListener('click', exportCsv);
  $('#exportJson').addEventListener('click', exportJson);
  $('#restoreJson').addEventListener('change', e => e.target.files[0] && restoreJson(e.target.files[0]));
  $('#resetData').addEventListener('click', reset);

  LANGS.forEach(([id, label]) => {
    const o = document.createElement('option'); o.value = id; o.textContent = label; els.languageSelect.appendChild(o);
  });
  els.languageSelect.value = state.lang;
  els.languageSelect.addEventListener('change', () => { state.lang = els.languageSelect.value; persist(); applyI18n(); });

  applyTheme();
  applyI18n();
  if (state.activeStart) startTicker();
  if (state.pendingIntensityId) {
    const pending = state.contractions.find(c => c.id === state.pendingIntensityId);
    if (pending) openIntensity(pending);
  }
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
})();
