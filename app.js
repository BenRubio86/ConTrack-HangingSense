(() => {
  const STORE='contrack_v3_state';
  const defaultState={
    contractions:[], activeStart:null, theme:'hanging', lang:'en', pendingIntensityId:null, summaryRange:60, historyFilter:'today'
  };
  let state=load();
  let tick=null;

  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const els={
    timerButton:$('#timerButton'),timerValue:$('#timerValue'),timerCaption:$('#timerCaption'),heroState:$('#heroState'),heroSub:$('#heroSub'),
    lastValue:$('#lastValue'),rhythm:$('#rhythm'),historyList:$('#historyList'),summaryChart:$('#summaryChart'),metrics:$('#metrics'),sessionSummaryText:$('#sessionSummaryText'),
    intensitySheet:$('#intensitySheet'),editSheet:$('#editSheet'),sheetBackdrop:$('#sheetBackdrop'),intensityGrid:$('#intensityGrid'),savedDuration:$('#savedDuration'),toast:$('#toast')
  };

  const I18N={
    en:{companion:'your labour companion',trackKicker:'Contraction timer',ready:'Ready',tapWhenBegins:'Tap when a contraction begins',start:'Start',stop:'Stop',recording:'Recording',inProgress:'Contraction in progress',lastContraction:'Last contraction',noneYet:'None recorded yet',recentRhythm:'Recent rhythm',lastFive:'Last 5 contractions',track:'Track',history:'History',summary:'Summary',more:'More',historySubtitle:'Your contraction record',today:'Today',all:'All',duration:'Duration (sec)',interval:'Spacing',intensity:'Intensity',summarySubtitle:'Your contraction activity at a glance',recentPattern:'Recent pattern',lastHourDescription:'Contractions over the last 60 minutes',last60:'Last 60 minutes',sessionSummary:'Session summary',shareSummary:'Share summary',exportPng:'Export chart PNG',moreSubtitle:'Personalise, export and learn',appearance:'Appearance',language:'Language',data:'Data',exportCsv:'Export CSV',backupJson:'Backup JSON',restoreJson:'Restore JSON',resetAll:'Reset all data',brandStatement:'A calm digital birth companion with a human identity.',saved:'Contraction saved',howIntense:'How intense was it?',skip:'Skip',editContraction:'Edit contraction',startTime:'Start time',notes:'Notes',save:'Save',delete:'Delete',contractions:'contractions',typicalDuration:'Typical duration',typicalSpacing:'Typical spacing',typicalIntensity:'Typical intensity',noData:'No contractions recorded yet.',shareFallback:'Summary copied to clipboard.',exported:'Export created.',restored:'Backup restored.',resetConfirm:'Delete all recorded contractions and settings?',deleted:'Contraction deleted.',savedToast:'Saved.',invalidBackup:'Could not restore this file.'},
    de:{companion:'dein Begleiter für die Geburt',trackKicker:'Wehentimer',ready:'Bereit',tapWhenBegins:'Tippen, wenn eine Wehe beginnt',start:'Start',stop:'Stopp',recording:'Aufzeichnung',inProgress:'Wehe läuft',lastContraction:'Letzte Wehe',noneYet:'Noch keine Wehe erfasst',recentRhythm:'Letzter Rhythmus',lastFive:'Letzte 5 Wehen',track:'Track',history:'Verlauf',summary:'Übersicht',more:'Mehr',historySubtitle:'Dein Wehenverlauf',today:'Heute',all:'Alle',duration:'Dauer (Sek.)',interval:'Abstand',intensity:'Intensität',summarySubtitle:'Deine Wehen auf einen Blick',recentPattern:'Letztes Muster',lastHourDescription:'Wehen der letzten 60 Minuten',last60:'Letzte 60 Minuten',sessionSummary:'Zusammenfassung',shareSummary:'Übersicht teilen',exportPng:'Diagramm als PNG',moreSubtitle:'Personalisieren, exportieren und mehr',appearance:'Design',language:'Sprache',data:'Daten',exportCsv:'CSV exportieren',backupJson:'JSON-Sicherung',restoreJson:'JSON wiederherstellen',resetAll:'Alle Daten löschen',brandStatement:'Ein ruhiger digitaler Geburtsbegleiter mit menschlicher Identität.',saved:'Wehe gespeichert',howIntense:'Wie intensiv war sie?',skip:'Überspringen',editContraction:'Wehe bearbeiten',startTime:'Startzeit',notes:'Notizen',save:'Speichern',delete:'Löschen',contractions:'Wehen',typicalDuration:'Typische Dauer',typicalSpacing:'Typischer Abstand',typicalIntensity:'Typische Intensität',noData:'Noch keine Wehen erfasst.',shareFallback:'Zusammenfassung kopiert.',exported:'Export erstellt.',restored:'Sicherung wiederhergestellt.',resetConfirm:'Alle Wehendaten und Einstellungen löschen?',deleted:'Wehe gelöscht.',savedToast:'Gespeichert.',invalidBackup:'Datei konnte nicht wiederhergestellt werden.'},
    fr:{companion:'votre compagnon de travail',trackKicker:'Minuteur de contractions',ready:'Prête',tapWhenBegins:'Touchez quand une contraction commence',start:'Démarrer',stop:'Arrêter',recording:'En cours',inProgress:'Contraction en cours',lastContraction:'Dernière contraction',noneYet:'Aucune contraction enregistrée',recentRhythm:'Rythme récent',lastFive:'5 dernières contractions',track:'Suivi',history:'Historique',summary:'Résumé',more:'Plus',historySubtitle:'Votre historique de contractions',today:"Aujourd'hui",all:'Tout',duration:'Durée (s)',interval:'Espacement',intensity:'Intensité',summarySubtitle:'Vos contractions en un coup d’œil',recentPattern:'Rythme récent',lastHourDescription:'Contractions des 60 dernières minutes',last60:'60 dernières minutes',sessionSummary:'Résumé de session',shareSummary:'Partager le résumé',exportPng:'Exporter le graphique PNG',moreSubtitle:'Personnaliser, exporter et apprendre',appearance:'Apparence',language:'Langue',data:'Données',exportCsv:'Exporter CSV',backupJson:'Sauvegarde JSON',restoreJson:'Restaurer JSON',resetAll:'Effacer toutes les données',brandStatement:'Un compagnon numérique calme pour la naissance.',saved:'Contraction enregistrée',howIntense:'Quelle était son intensité ?',skip:'Ignorer',editContraction:'Modifier la contraction',startTime:'Heure de début',notes:'Notes',save:'Enregistrer',delete:'Supprimer',contractions:'contractions',typicalDuration:'Durée typique',typicalSpacing:'Espacement typique',typicalIntensity:'Intensité typique',noData:'Aucune contraction enregistrée.'},
    es:{companion:'tu compañero para el parto',trackKicker:'Temporizador de contracciones',ready:'Lista',tapWhenBegins:'Toca cuando comience una contracción',start:'Iniciar',stop:'Detener',recording:'Grabando',inProgress:'Contracción en curso',lastContraction:'Última contracción',noneYet:'Aún no hay contracciones',recentRhythm:'Ritmo reciente',lastFive:'Últimas 5 contracciones',track:'Medir',history:'Historial',summary:'Resumen',more:'Más',historySubtitle:'Tu registro de contracciones',today:'Hoy',all:'Todas',duration:'Duración (s)',interval:'Intervalo',intensity:'Intensidad',summarySubtitle:'Tus contracciones de un vistazo',recentPattern:'Patrón reciente',lastHourDescription:'Contracciones de los últimos 60 minutos',last60:'Últimos 60 minutos',sessionSummary:'Resumen de sesión',shareSummary:'Compartir resumen',exportPng:'Exportar gráfico PNG',moreSubtitle:'Personaliza, exporta y aprende',appearance:'Apariencia',language:'Idioma',data:'Datos',exportCsv:'Exportar CSV',backupJson:'Copia JSON',restoreJson:'Restaurar JSON',resetAll:'Borrar todos los datos',brandStatement:'Un compañero digital y humano para el parto.',saved:'Contracción guardada',howIntense:'¿Qué intensidad tuvo?',skip:'Omitir',editContraction:'Editar contracción',startTime:'Hora de inicio',notes:'Notas',save:'Guardar',delete:'Eliminar',contractions:'contracciones',typicalDuration:'Duración típica',typicalSpacing:'Intervalo típico',typicalIntensity:'Intensidad típica',noData:'Aún no hay contracciones.'},
    zh:{companion:'你的分娩陪伴助手',trackKicker:'宫缩计时器',ready:'准备好',tapWhenBegins:'宫缩开始时点击',start:'开始',stop:'停止',recording:'记录中',inProgress:'宫缩进行中',lastContraction:'上次宫缩',noneYet:'尚未记录宫缩',recentRhythm:'近期节律',lastFive:'最近5次宫缩',track:'计时',history:'记录',summary:'总结',more:'更多',historySubtitle:'你的宫缩记录',today:'今天',all:'全部',duration:'持续时间（秒）',interval:'间隔',intensity:'强度',summarySubtitle:'一目了然查看宫缩情况',recentPattern:'近期模式',lastHourDescription:'过去60分钟的宫缩',last60:'过去60分钟',sessionSummary:'本次总结',shareSummary:'分享总结',exportPng:'导出图表PNG',moreSubtitle:'个性化、导出与了解更多',appearance:'外观',language:'语言',data:'数据',exportCsv:'导出CSV',backupJson:'备份JSON',restoreJson:'恢复JSON',resetAll:'清除全部数据',brandStatement:'一个平静而有人情味的数字分娩陪伴助手。',saved:'宫缩已保存',howIntense:'强度如何？',skip:'跳过',editContraction:'编辑宫缩',startTime:'开始时间',notes:'备注',save:'保存',delete:'删除',contractions:'次宫缩',typicalDuration:'典型持续时间',typicalSpacing:'典型间隔',typicalIntensity:'典型强度',noData:'尚未记录宫缩。'},
    ar:{companion:'رفيقك الهادئ أثناء المخاض',trackKicker:'مؤقت الانقباضات',ready:'جاهزة',tapWhenBegins:'اضغطي عند بدء الانقباض',start:'ابدئي',stop:'إيقاف',recording:'جارٍ التسجيل',inProgress:'الانقباض جارٍ',lastContraction:'آخر انقباض',noneYet:'لا توجد انقباضات مسجلة',recentRhythm:'الإيقاع الأخير',lastFive:'آخر 5 انقباضات',track:'تتبع',history:'السجل',summary:'الملخص',more:'المزيد',historySubtitle:'سجل الانقباضات',today:'اليوم',all:'الكل',duration:'المدة (ث)',interval:'الفاصل',intensity:'الشدة',summarySubtitle:'نظرة سريعة على نشاط الانقباضات',recentPattern:'النمط الأخير',lastHourDescription:'انقباضات آخر 60 دقيقة',last60:'آخر 60 دقيقة',sessionSummary:'ملخص الجلسة',shareSummary:'مشاركة الملخص',exportPng:'تصدير الرسم PNG',moreSubtitle:'تخصيص وتصدير والمزيد',appearance:'المظهر',language:'اللغة',data:'البيانات',exportCsv:'تصدير CSV',backupJson:'نسخة JSON',restoreJson:'استعادة JSON',resetAll:'مسح جميع البيانات',brandStatement:'رفيق رقمي هادئ للولادة بهوية إنسانية.',saved:'تم حفظ الانقباض',howIntense:'ما شدة الانقباض؟',skip:'تخطي',editContraction:'تعديل الانقباض',startTime:'وقت البدء',notes:'ملاحظات',save:'حفظ',delete:'حذف',contractions:'انقباضات',typicalDuration:'المدة المعتادة',typicalSpacing:'الفاصل المعتاد',typicalIntensity:'الشدة المعتادة',noData:'لا توجد انقباضات مسجلة.'},
    fa:{companion:'همراه آرام شما در زایمان',trackKicker:'زمان‌سنج انقباض',ready:'آماده',tapWhenBegins:'با شروع انقباض لمس کنید',start:'شروع',stop:'توقف',recording:'در حال ثبت',inProgress:'انقباض در حال انجام',lastContraction:'آخرین انقباض',noneYet:'هنوز انقباضی ثبت نشده',recentRhythm:'ریتم اخیر',lastFive:'۵ انقباض اخیر',track:'ثبت',history:'تاریخچه',summary:'خلاصه',more:'بیشتر',historySubtitle:'سابقه انقباض‌ها',today:'امروز',all:'همه',duration:'مدت (ثانیه)',interval:'فاصله',intensity:'شدت',summarySubtitle:'نمای کلی فعالیت انقباض‌ها',recentPattern:'الگوی اخیر',lastHourDescription:'انقباض‌های ۶۰ دقیقه اخیر',last60:'۶۰ دقیقه اخیر',sessionSummary:'خلاصه جلسه',shareSummary:'اشتراک خلاصه',exportPng:'خروجی PNG نمودار',moreSubtitle:'شخصی‌سازی، خروجی و بیشتر',appearance:'ظاهر',language:'زبان',data:'داده‌ها',exportCsv:'خروجی CSV',backupJson:'پشتیبان JSON',restoreJson:'بازیابی JSON',resetAll:'حذف همه داده‌ها',brandStatement:'یک همراه دیجیتال آرام برای زایمان با هویتی انسانی.',saved:'انقباض ذخیره شد',howIntense:'شدت آن چقدر بود؟',skip:'رد کردن',editContraction:'ویرایش انقباض',startTime:'زمان شروع',notes:'یادداشت',save:'ذخیره',delete:'حذف',contractions:'انقباض',typicalDuration:'مدت معمول',typicalSpacing:'فاصله معمول',typicalIntensity:'شدت معمول',noData:'هنوز انقباضی ثبت نشده.'},
    hi:{companion:'प्रसव के दौरान आपका शांत साथी',trackKicker:'कॉन्ट्रैक्शन टाइमर',ready:'तैयार',tapWhenBegins:'कॉन्ट्रैक्शन शुरू होने पर टैप करें',start:'शुरू',stop:'रोकें',recording:'रिकॉर्ड हो रहा है',inProgress:'कॉन्ट्रैक्शन जारी है',lastContraction:'पिछला कॉन्ट्रैक्शन',noneYet:'अभी कोई रिकॉर्ड नहीं',recentRhythm:'हाल का रिदम',lastFive:'पिछले 5 कॉन्ट्रैक्शन',track:'ट्रैक',history:'इतिहास',summary:'सारांश',more:'और',historySubtitle:'आपका कॉन्ट्रैक्शन रिकॉर्ड',today:'आज',all:'सभी',duration:'अवधि (सेकंड)',interval:'अंतर',intensity:'तीव्रता',summarySubtitle:'आपकी गतिविधि एक नज़र में',recentPattern:'हाल का पैटर्न',lastHourDescription:'पिछले 60 मिनट के कॉन्ट्रैक्शन',last60:'पिछले 60 मिनट',sessionSummary:'सेशन सारांश',shareSummary:'सारांश साझा करें',exportPng:'चार्ट PNG निर्यात करें',moreSubtitle:'व्यक्तिगत करें, निर्यात करें और जानें',appearance:'दिखावट',language:'भाषा',data:'डेटा',exportCsv:'CSV निर्यात',backupJson:'JSON बैकअप',restoreJson:'JSON पुनर्स्थापित करें',resetAll:'सभी डेटा मिटाएँ',brandStatement:'मानवीय पहचान वाला शांत डिजिटल बर्थ साथी।',saved:'कॉन्ट्रैक्शन सेव हुआ',howIntense:'यह कितना तीव्र था?',skip:'छोड़ें',editContraction:'कॉन्ट्रैक्शन संपादित करें',startTime:'शुरू होने का समय',notes:'नोट्स',save:'सेव',delete:'हटाएँ',contractions:'कॉन्ट्रैक्शन',typicalDuration:'सामान्य अवधि',typicalSpacing:'सामान्य अंतर',typicalIntensity:'सामान्य तीव्रता',noData:'अभी कोई कॉन्ट्रैक्शन रिकॉर्ड नहीं है।'},
    ru:{companion:'ваш спокойный помощник в родах',trackKicker:'Таймер схваток',ready:'Готово',tapWhenBegins:'Нажмите, когда начнётся схватка',start:'Старт',stop:'Стоп',recording:'Запись',inProgress:'Схватка идёт',lastContraction:'Последняя схватка',noneYet:'Схваток пока нет',recentRhythm:'Недавний ритм',lastFive:'Последние 5 схваток',track:'Трек',history:'История',summary:'Сводка',more:'Ещё',historySubtitle:'История ваших схваток',today:'Сегодня',all:'Все',duration:'Длительность (с)',interval:'Интервал',intensity:'Интенсивность',summarySubtitle:'Схватки одним взглядом',recentPattern:'Недавний ритм',lastHourDescription:'Схватки за последние 60 минут',last60:'Последние 60 минут',sessionSummary:'Сводка сеанса',shareSummary:'Поделиться сводкой',exportPng:'Экспорт графика PNG',moreSubtitle:'Настройки, экспорт и информация',appearance:'Оформление',language:'Язык',data:'Данные',exportCsv:'Экспорт CSV',backupJson:'Резерв JSON',restoreJson:'Восстановить JSON',resetAll:'Удалить все данные',brandStatement:'Спокойный цифровой спутник родов с человеческим характером.',saved:'Схватка сохранена',howIntense:'Насколько сильной она была?',skip:'Пропустить',editContraction:'Изменить схватку',startTime:'Время начала',notes:'Заметки',save:'Сохранить',delete:'Удалить',contractions:'схваток',typicalDuration:'Типичная длительность',typicalSpacing:'Типичный интервал',typicalIntensity:'Типичная интенсивность',noData:'Схваток пока нет.'},
    ko:{companion:'출산을 위한 차분한 동반자',trackKicker:'진통 타이머',ready:'준비',tapWhenBegins:'진통이 시작되면 탭하세요',start:'시작',stop:'중지',recording:'기록 중',inProgress:'진통 진행 중',lastContraction:'마지막 진통',noneYet:'아직 기록이 없습니다',recentRhythm:'최근 리듬',lastFive:'최근 5회 진통',track:'기록',history:'기록',summary:'요약',more:'더보기',historySubtitle:'진통 기록',today:'오늘',all:'전체',duration:'지속시간(초)',interval:'간격',intensity:'강도',summarySubtitle:'진통 활동을 한눈에',recentPattern:'최근 패턴',lastHourDescription:'최근 60분 진통',last60:'최근 60분',sessionSummary:'세션 요약',shareSummary:'요약 공유',exportPng:'차트 PNG 내보내기',moreSubtitle:'개인화, 내보내기 및 정보',appearance:'테마',language:'언어',data:'데이터',exportCsv:'CSV 내보내기',backupJson:'JSON 백업',restoreJson:'JSON 복원',resetAll:'모든 데이터 삭제',brandStatement:'사람다운 감성을 지닌 차분한 디지털 출산 동반자.',saved:'진통 저장됨',howIntense:'강도는 어느 정도였나요?',skip:'건너뛰기',editContraction:'진통 수정',startTime:'시작 시간',notes:'메모',save:'저장',delete:'삭제',contractions:'회 진통',typicalDuration:'일반 지속시간',typicalSpacing:'일반 간격',typicalIntensity:'일반 강도',noData:'아직 진통 기록이 없습니다.'},
    ja:{companion:'出産に寄り添う穏やかなパートナー',trackKicker:'陣痛タイマー',ready:'準備完了',tapWhenBegins:'陣痛が始まったらタップ',start:'開始',stop:'停止',recording:'記録中',inProgress:'陣痛中',lastContraction:'前回の陣痛',noneYet:'まだ記録がありません',recentRhythm:'最近のリズム',lastFive:'最近5回の陣痛',track:'計測',history:'履歴',summary:'概要',more:'その他',historySubtitle:'陣痛の記録',today:'今日',all:'すべて',duration:'持続時間（秒）',interval:'間隔',intensity:'強度',summarySubtitle:'陣痛の状況をひと目で確認',recentPattern:'最近のパターン',lastHourDescription:'過去60分の陣痛',last60:'過去60分',sessionSummary:'セッション概要',shareSummary:'概要を共有',exportPng:'チャートPNGを出力',moreSubtitle:'外観、出力、情報',appearance:'外観',language:'言語',data:'データ',exportCsv:'CSV出力',backupJson:'JSONバックアップ',restoreJson:'JSON復元',resetAll:'すべてのデータを削除',brandStatement:'人の温かさを持つ穏やかなデジタル出産コンパニオン。',saved:'陣痛を保存しました',howIntense:'強さはどのくらいでしたか？',skip:'スキップ',editContraction:'陣痛を編集',startTime:'開始時刻',notes:'メモ',save:'保存',delete:'削除',contractions:'回の陣痛',typicalDuration:'代表的な持続時間',typicalSpacing:'代表的な間隔',typicalIntensity:'代表的な強度',noData:'まだ陣痛は記録されていません。'}
  };

  const LANGS=[['en','🇬🇧 English'],['de','🇩🇪 Deutsch'],['fr','🇫🇷 Français'],['es','🇪🇸 Español'],['fa','🇮🇷 فارسی'],['zh','🇨🇳 中文'],['hi','🇮🇳 हिन्दी'],['ar','🇸🇦 العربية'],['ru','🇷🇺 Русский'],['ko','🇰🇷 한국어'],['ja','🇯🇵 日本語']];
  const THEMES=[
    {id:'hanging',name:'Hanging Sense',colors:['#fff9f1','#6d3b24','#f2a13a']},
    {id:'calm',name:'Calm',colors:['#fff8f4','#8f5a4b','#cf8d72']},
    {id:'serenity',name:'Serenity',colors:['#f7faf8','#46655b','#9bb9ac']},
    {id:'minimal',name:'Minimal',colors:['#fbfaf8','#37342f','#c7a36a']},
    {id:'night',name:'Night',colors:['#171310','#d4a173','#d99138']}
  ];

  function load(){try{return {...defaultState,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch{return {...defaultState}}}
  function persist(){localStorage.setItem(STORE,JSON.stringify(state))}
  function t(k){return (I18N[state.lang]||I18N.en)[k]||I18N.en[k]||k}
  function applyI18n(){
    document.documentElement.lang=state.lang;
    document.documentElement.dir=['ar','fa'].includes(state.lang)?'rtl':'ltr';
    $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    renderAll();
  }
  function fmtDuration(sec){sec=Math.max(0,Math.round(sec));if(sec<60)return `${sec} sec`;const m=Math.floor(sec/60),s=sec%60;return `${m}m ${String(s).padStart(2,'0')}s`}
  function fmtDurationLocal(sec){ if(state.lang==='de') return sec<60?`${Math.round(sec)} Sek.`:`${Math.floor(sec/60)}m ${String(Math.round(sec)%60).padStart(2,'0')}s`; return fmtDuration(sec)}
  function fmtClock(ts){return new Intl.DateTimeFormat(state.lang,{hour:'2-digit',minute:'2-digit'}).format(new Date(ts))}
  function fmtDate(ts){return new Intl.DateTimeFormat(state.lang,{day:'2-digit',month:'short',year:'numeric'}).format(new Date(ts))}
  function relativeAgo(ts){const s=Math.max(0,Math.round((Date.now()-ts)/1000));if(s<60)return `${s} sec ago`;const m=Math.floor(s/60);if(m<60)return `${m} min ago`;const h=Math.floor(m/60);return `${h} h ago`}
  function vibrate(ms=20){if(navigator.vibrate)navigator.vibrate(ms)}
  function toast(msg){els.toast.textContent=msg;els.toast.classList.add('show');setTimeout(()=>els.toast.classList.remove('show'),1800)}

  function start(){state.activeStart=Date.now();persist();vibrate(35);startTicker();renderTrack()}
  function stop(){
    const end=Date.now(), start=state.activeStart;
    if(!start)return;
    const item={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),start,end,durationSec:Math.max(1,Math.round((end-start)/1000)),intensity:null,notes:''};
    state.contractions.push(item);state.activeStart=null;state.pendingIntensityId=item.id;persist();vibrate(20);stopTicker();renderAll();openIntensity(item);
  }
  function toggleTimer(){state.activeStart?stop():start()}
  function startTicker(){stopTicker();tick=setInterval(renderTrack,250)} function stopTicker(){if(tick)clearInterval(tick);tick=null}

  function renderTrack(){
    const active=!!state.activeStart;
    els.timerButton.classList.toggle('active',active);
    if(active){
      const sec=Math.floor((Date.now()-state.activeStart)/1000);els.timerValue.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;els.timerCaption.textContent=t('stop');els.heroState.textContent=t('recording');els.heroSub.textContent=t('inProgress');
    }else{els.timerValue.textContent='START';els.timerCaption.textContent=t('start');els.heroState.textContent=t('ready');els.heroSub.textContent=t('tapWhenBegins')}
    const last=state.contractions.at(-1);els.lastValue.textContent=last?`${fmtDurationLocal(last.durationSec)} · ${relativeAgo(last.start)}`:t('noneYet');
    renderRhythm();
  }
  function renderRhythm(){
    const items=state.contractions.slice(-5);els.rhythm.innerHTML='';
    if(!items.length){for(let i=0;i<5;i++){const d=document.createElement('div');d.className='pulse';d.style.height=`${24+i*6}px`;d.style.opacity=.18;els.rhythm.append(d)}return}
    const max=Math.max(...items.map(x=>x.durationSec),60);
    items.forEach(x=>{const d=document.createElement('div');d.className='pulse';d.style.height=`${28+Math.min(68,x.durationSec/max*68)}px`;els.rhythm.append(d)})
  }

  function intervalFor(item){const idx=state.contractions.findIndex(x=>x.id===item.id);if(idx<=0)return null;return Math.max(0,Math.round((item.start-state.contractions[idx-1].start)/1000))}
  function renderHistory(){
    const list=[...state.contractions].sort((a,b)=>b.start-a.start).filter(x=>state.historyFilter!=='today'||new Date(x.start).toDateString()===new Date().toDateString());
    els.historyList.innerHTML='';
    if(!list.length){els.historyList.innerHTML=`<div class="history-empty">${t('noData')}</div>`;return}
    list.forEach(item=>{
      const row=document.createElement('button');row.className='history-row';row.dataset.id=item.id;
      const gap=intervalFor(item);
      row.innerHTML=`<div class="history-time"><strong>${fmtClock(item.start)}</strong><small>${fmtDate(item.start)}</small></div><div class="history-stats"><div class="stat-chip"><b>${fmtDurationLocal(item.durationSec)}</b><span>${t('duration').replace(' (sec)','').replace(' (Sek.)','')}</span></div><div class="stat-chip"><b>${gap==null?'—':fmtDurationLocal(gap)}</b><span>${t('interval')}</span></div></div><div style="display:flex;align-items:center;gap:8px"><div class="intensity-badge">${item.intensity??'—'}</div><div class="history-chevron">›</div></div>`;
      row.addEventListener('click',()=>openEdit(item.id));els.historyList.append(row);
    })
  }

  function filteredSummaryItems(){
    if(state.summaryRange==='all')return state.contractions;
    const mins=Number(state.summaryRange||60);const since=Date.now()-mins*60*1000;return state.contractions.filter(x=>x.start>=since)
  }
  function median(nums){if(!nums.length)return 0;const a=[...nums].sort((x,y)=>x-y),m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2}
  function renderSummary(){
    const items=filteredSummaryItems();els.summaryChart.innerHTML='';
    if(!items.length){els.summaryChart.innerHTML=`<div class="chart-empty">${t('noData')}</div>`}else{
      const max=Math.max(...items.map(x=>x.durationSec),60);items.slice(-24).forEach(x=>{const b=document.createElement('div');b.className='chart-bar';b.style.height=`${28+Math.min(130,x.durationSec/max*130)}px`;b.title=`${fmtClock(x.start)} · ${fmtDurationLocal(x.durationSec)}${x.intensity?` · ${t('intensity')} ${x.intensity}`:''}`;els.summaryChart.append(b)})
    }
    const last60=state.contractions.filter(x=>x.start>=Date.now()-3600000);
    const durations=last60.map(x=>x.durationSec);const gaps=last60.map(x=>intervalFor(x)).filter(Boolean);const ints=last60.map(x=>x.intensity).filter(Boolean);
    const vals=[
      [last60.length,t('contractions')],[durations.length?fmtDurationLocal(median(durations)):'—',t('typicalDuration')],[gaps.length?fmtDurationLocal(median(gaps)):'—',t('typicalSpacing')],[ints.length?`${Math.round(median(ints)*10)/10}/10`:'—',t('typicalIntensity')]
    ];
    els.metrics.innerHTML=vals.map(([v,l])=>`<div class="metric"><div class="value">${v}</div><div class="label">${l}</div></div>`).join('');
    if(!last60.length){els.sessionSummaryText.textContent=t('noData')}else{els.sessionSummaryText.textContent=`${last60.length} ${t('contractions')} · ${t('typicalDuration')}: ${durations.length?fmtDurationLocal(median(durations)):'—'} · ${t('typicalSpacing')}: ${gaps.length?fmtDurationLocal(median(gaps)):'—'} · ${t('typicalIntensity')}: ${ints.length?`${Math.round(median(ints)*10)/10}/10`:'—'}.`}
  }

  function renderThemes(){
    const grid=$('#themeGrid');grid.innerHTML='';THEMES.forEach(th=>{const b=document.createElement('button');b.className='theme-card'+(state.theme===th.id?' active':'');b.dataset.theme=th.id;b.innerHTML=`<div class="theme-preview" style="background:${th.colors[0]};color:${th.colors[1]}"><span style="font-size:12px;font-weight:800">Aa</span><span class="mini-orb" style="background:${th.colors[2]}"></span></div><div class="theme-name">${th.name}</div>`;b.addEventListener('click',()=>{state.theme=th.id;persist();applyTheme();renderThemes()});grid.append(b)})
  }
  function applyTheme(){document.documentElement.dataset.theme=state.theme==='hanging'?'':state.theme;document.querySelector('meta[name="theme-color"]').content=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#fff9f1'}

  function renderAll(){renderTrack();renderHistory();renderSummary();renderThemes()}

  function openSheet(el){els.sheetBackdrop.hidden=false;el.hidden=false}
  function closeSheets(){els.sheetBackdrop.hidden=true;els.intensitySheet.hidden=true;els.editSheet.hidden=true}
  function openIntensity(item){els.savedDuration.textContent=fmtDurationLocal(item.durationSec);els.intensityGrid.innerHTML='';for(let i=1;i<=10;i++){const b=document.createElement('button');b.className='intensity-btn';b.textContent=i;b.onclick=()=>{const x=state.contractions.find(c=>c.id===item.id);if(x)x.intensity=i;state.pendingIntensityId=null;persist();closeSheets();renderAll();toast(t('savedToast'))};els.intensityGrid.append(b)}openSheet(els.intensitySheet)}

  function openEdit(id){const item=state.contractions.find(x=>x.id===id);if(!item)return;$('#editId').value=id;$('#editStart').value=new Date(item.start-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16);$('#editDuration').value=item.durationSec;$('#editIntensity').value=item.intensity??'';$('#editNotes').value=item.notes||'';openSheet(els.editSheet)}
  function saveEdit(){const id=$('#editId').value,item=state.contractions.find(x=>x.id===id);if(!item)return;const dt=new Date($('#editStart').value);if(!isNaN(dt))item.start=dt.getTime();item.durationSec=Math.max(1,Number($('#editDuration').value)||1);item.end=item.start+item.durationSec*1000;const v=$('#editIntensity').value;item.intensity=v?Math.max(1,Math.min(10,Number(v))):null;item.notes=$('#editNotes').value.trim();state.contractions.sort((a,b)=>a.start-b.start);persist();closeSheets();renderAll();toast(t('savedToast'))}
  function deleteEdit(){const id=$('#editId').value;state.contractions=state.contractions.filter(x=>x.id!==id);persist();closeSheets();renderAll();toast(t('deleted'))}

  function navTo(name){$$('.screen').forEach(s=>s.classList.toggle('active',s.dataset.screen===name));$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));window.scrollTo({top:0,behavior:'smooth'})}

  function summaryText(){return `ConTrack V3.0\n${els.sessionSummaryText.textContent}`}
  async function shareSummary(){const text=summaryText();if(navigator.share){try{await navigator.share({title:'ConTrack summary',text});return}catch{}}try{await navigator.clipboard.writeText(text);toast(t('shareFallback'))}catch{}}
  function downloadBlob(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},400)}
  function exportCsv(){const rows=[['id','start_iso','duration_sec','interval_sec','intensity','notes'],...state.contractions.map(x=>[x.id,new Date(x.start).toISOString(),x.durationSec,intervalFor(x)??'',x.intensity??'',(x.notes||'').replaceAll('"','""')])];const csv=rows.map(r=>r.map(v=>`"${String(v)}"`).join(',')).join('\n');downloadBlob('ConTrack-contractions.csv',new Blob([csv],{type:'text/csv;charset=utf-8'}));toast(t('exported'))}
  function exportJson(){downloadBlob('ConTrack-backup.json',new Blob([JSON.stringify({version:'3.0',exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'}));toast(t('exported'))}
  function restoreJson(file){const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result),incoming=data.state||data;state={...defaultState,...incoming,activeStart:null};persist();applyTheme();applyI18n();toast(t('restored'))}catch{toast(t('invalidBackup'))}};r.readAsText(file)}
  function reset(){if(confirm(t('resetConfirm'))){state={...defaultState,theme:state.theme,lang:state.lang};persist();renderAll()}}

  function exportChartPng(){
    const items=filteredSummaryItems();const W=1200,H=700,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');
    const css=getComputedStyle(document.documentElement);const bg=css.getPropertyValue('--bg').trim()||'#fff9f1',text=css.getPropertyValue('--text').trim()||'#3b2a22',muted=css.getPropertyValue('--muted').trim()||'#8f7d70',amber=css.getPropertyValue('--amber').trim()||'#f2a13a',wood=css.getPropertyValue('--wood2').trim()||'#915538';
    c.fillStyle=bg;c.fillRect(0,0,W,H);c.fillStyle=text;c.font='700 58px system-ui';c.fillText('ConTrack — '+t('summary'),70,90);c.fillStyle=muted;c.font='28px system-ui';c.fillText(t('recentPattern'),70,140);
    const x0=80,y0=570,w=1040,h=330;c.strokeStyle='rgba(120,90,70,.18)';c.lineWidth=2;c.beginPath();c.moveTo(x0,y0);c.lineTo(x0+w,y0);c.stroke();
    if(items.length){const recent=items.slice(-30),max=Math.max(...recent.map(x=>x.durationSec),60),gap=14,bw=Math.min(30,(w-gap*(recent.length-1))/recent.length);recent.forEach((it,i)=>{const bh=70+it.durationSec/max*(h-80);const x=x0+i*(bw+gap);const g=c.createLinearGradient(0,y0-bh,0,y0);g.addColorStop(0,wood);g.addColorStop(1,amber);c.fillStyle=g;roundRect(c,x,y0-bh,bw,bh,bw/2);c.fill()})}else{c.fillStyle=muted;c.font='28px system-ui';c.fillText(t('noData'),80,340)}
    c.fillStyle=muted;c.font='22px system-ui';c.fillText(new Date().toLocaleString(state.lang),80,640);canvas.toBlob(b=>downloadBlob('ConTrack-summary.png',b),'image/png');
  }
  function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):(ctx.rect(x,y,w,h))}

  // events
  els.timerButton.addEventListener('click',toggleTimer);
  $$('.nav-item').forEach(b=>b.addEventListener('click',()=>navTo(b.dataset.nav)));
  $('#quickSettings').addEventListener('click',()=>navTo('more'));
  els.sheetBackdrop.addEventListener('click',closeSheets);$('#skipIntensity').addEventListener('click',()=>{state.pendingIntensityId=null;persist();closeSheets()});
  $('#saveEdit').addEventListener('click',saveEdit);$('#deleteEdit').addEventListener('click',deleteEdit);
  $$('[data-history-filter]').forEach(b=>b.addEventListener('click',()=>{state.historyFilter=b.dataset.historyFilter;persist();$$('[data-history-filter]').forEach(x=>x.classList.toggle('active',x===b));renderHistory()}));
  $$('[data-range]').forEach(b=>b.addEventListener('click',()=>{state.summaryRange=b.dataset.range;persist();$$('[data-range]').forEach(x=>x.classList.toggle('active',x===b));renderSummary()}));
  $('#shareSummary').addEventListener('click',shareSummary);$('#exportPng').addEventListener('click',exportChartPng);$('#exportCsv').addEventListener('click',exportCsv);$('#exportJson').addEventListener('click',exportJson);$('#restoreJson').addEventListener('change',e=>e.target.files[0]&&restoreJson(e.target.files[0]));$('#resetData').addEventListener('click',reset);

  const langSelect=$('#languageSelect');LANGS.forEach(([id,label])=>{const o=document.createElement('option');o.value=id;o.textContent=label;langSelect.append(o)});langSelect.value=state.lang;langSelect.addEventListener('change',()=>{state.lang=langSelect.value;persist();applyI18n()});

  applyTheme();applyI18n();if(state.activeStart)startTicker();if(state.pendingIntensityId){const x=state.contractions.find(c=>c.id===state.pendingIntensityId);if(x)openIntensity(x)}
  if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();
