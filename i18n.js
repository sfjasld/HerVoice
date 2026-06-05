/**
 * HerVoice - 多语言支持
 * 语言：中文、English、العربية、Français、Deutsch
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'hervoice_lang';

  var LANG_META = {
    zh: { label: '中文', cusdis: 'zh-CN', translate: 'zh-CN', dir: 'ltr' },
    en: { label: 'English', cusdis: 'en', translate: 'en', dir: 'ltr' },
    ar: { label: 'العربية', cusdis: 'ar', translate: 'ar', dir: 'rtl' },
    fr: { label: 'Français', cusdis: 'fr', translate: 'fr', dir: 'ltr' },
    de: { label: 'Deutsch', cusdis: 'de', translate: 'de', dir: 'ltr' }
  };

  var STRINGS = {
    'nav.home': { zh: '首页', en: 'Home', ar: 'الرئيسية', fr: 'Accueil', de: 'Start' },
    'nav.sex': { zh: '懂·性', en: 'Know·Sex', ar: 'معرفة·الجنس', fr: 'Savoir·Sex', de: 'Wissen·Sex' },
    'nav.youth': { zh: '青芽', en: 'Youth', ar: 'براعم', fr: 'Jeunesse', de: 'Jugend' },
    'nav.pregnancy': { zh: '孕悦', en: 'Pregnancy', ar: 'حمل', fr: 'Grossesse', de: 'Schwangerschaft' },
    'nav.feedback': { zh: '留言板', en: 'Feedback', ar: 'رسائل', fr: 'Messages', de: 'Feedback' },
    'footer.copy': {
      zh: '© 2026 HerVoice. 让女性的声音被听见。',
      en: '© 2026 HerVoice. Let women\'s voices be heard.',
      ar: '© 2026 HerVoice. لنجعل أصوات النساء مسموعة.',
      fr: '© 2026 HerVoice. Que les voix des femmes soient entendues.',
      de: '© 2026 HerVoice. Damit Frauenstimmen gehört werden.'
    },
    'lang.label': { zh: '语言', en: 'Language', ar: 'اللغة', fr: 'Langue', de: 'Sprache' },
    'index.tagline': {
      zh: '被忽略的女性需求，在这里被看见、被讨论、被改进。',
      en: 'Overlooked women\'s needs—seen, discussed, and improved here.',
      ar: 'احتياجات النساء التي غالبًا ما يتم تجاهلها—تُرى وتُناقَش وتتحسّن هنا.',
      fr: 'Les besoins des femmes, trop souvent ignorés—vus, discutés et améliorés ici.',
      de: 'Übersehene Bedürfnisse von Frauen—hier sichtbar, besprochen und verbessert.'
    },
    'index.commentsSoon': {
      zh: '💬 前往留言板分享你的想法 →',
      en: '💬 Share your thoughts on the feedback board →',
      ar: '💬 شاركي أفكارك في لوحة الرسائل →',
      fr: '💬 Partagez vos idées sur le mur de messages →',
      de: '💬 Teile deine Gedanken im Feedback-Board →'
    },
    'index.pinnedTitle': {
      zh: '创建者寄语 · 来自 kkkkk',
      en: 'A Message from the Founder · kkkkk',
      ar: 'رسالة من المؤسسة · kkkkk',
      fr: 'Message de la fondatrice · kkkkk',
      de: 'Wort der Gründerin · kkkkk'
    },
    'index.pinnedP1': {
      zh: '我是 HerVoice 的创建者 kkkkk。',
      en: 'I\'m kkkkk, the creator of HerVoice.',
      ar: 'أنا kkkkk، مؤسسة HerVoice.',
      fr: 'Je suis kkkkk, la créatrice de HerVoice.',
      de: 'Ich bin kkkkk, die Gründerin von HerVoice.'
    },
    'index.pinnedP2': {
      zh: '创建这个网站的初衷，是想为女性提供一个可以安心表达需求、分享感受、提出建议的空间——那些在日常生活中常常被忽略的声音，值得被看见、被讨论，更值得被认真对待。',
      en: 'I created this site to give women a safe space to express their needs, share their feelings, and offer suggestions—voices that are often overlooked in daily life, yet deserve to be seen, discussed, and taken seriously.',
      ar: 'هدفي من إنشاء هذا الموقع أن أوفّر للنساء مساحة آمنة للتعبير عن احتياجاتهن ومشاركة مشاعرهن واقتراحاتهن—أصوات كثيرًا ما يُتجاهَل في الحياة اليومية، لكنها تستحق أن تُرى وتُناقَش وتُؤخَذ بجدية.',
      fr: 'J\'ai créé ce site pour offrir aux femmes un espace sûr où exprimer leurs besoins, partager leurs ressentis et proposer leurs idées—des voix trop souvent ignorées au quotidien, mais qui méritent d\'être vues, discutées et prises au sérieux.',
      de: 'Ich habe diese Website geschaffen, um Frauen einen sicheren Raum zu geben, in dem sie Bedürfnisse, Gefühle und Vorschläge teilen können—Stimmen, die im Alltag oft übersehen werden, aber gesehen, besprochen und ernst genommen werden sollten.'
    },
    'index.pinnedP3': {
      zh: '欢迎你在这里留下你的声音：可以是产品体验、生活细节，或是任何你希望我们共同关注的话题。请尊重他人的分享，带着善意发言，和我们一起维护一个温暖、包容、彼此支持的社区。',
      en: 'You\'re welcome to leave your voice here—product experiences, everyday details, or any topic you hope we can pay attention to together. Please respect others, speak with kindness, and help us build a warm, inclusive, supportive community.',
      ar: 'نرحّب بكِ لترك صوتك هنا: تجربة منتج، تفاصيل من الحياة، أو أي موضوع تريدين أن نهتم به معًا. نرجو احترام مشاركات الآخرين والتحدث بلطف، وبناء مجتمع دافئ وشامل ومتضامن.',
      fr: 'Vous êtes les bienvenues pour laisser votre voix ici : expérience produit, détails du quotidien, ou tout sujet que nous devrions regarder ensemble. Merci de respecter les autres, de parler avec bienveillance, et de construire une communauté chaleureuse et inclusive.',
      de: 'Du bist eingeladen, hier deine Stimme zu hinterlassen—Produkterfahrungen, Alltagsdetails oder Themen, denen wir gemeinsam Aufmerksamkeit schenken sollten. Bitte respektiere andere, sprich mit Freundlichkeit und hilf uns, eine warme, inklusive Gemeinschaft zu gestalten.'
    },
    'index.pinnedP4': {
      zh: '同时，我也希望 HerVoice 能为各行各业的设计者、开发者和决策者，提供来自女性真实、具体且有力量的视角。愿这些声音不仅被听见，更能被真正纳入思考与改变之中。',
      en: 'I also hope HerVoice can offer designers, developers, and decision-makers across every industry authentic, concrete, and powerful perspectives from women—so these voices are not only heard, but truly considered in thought and change.',
      ar: 'آمل أيضًا أن يوفّر HerVoice للمصممين والمطوّرين وصنّاع القرار في مختلف المجالات رؤى حقيقية وملموسة وقوية من النساء—حتى تُسمَع هذه الأصوات وتُؤخَذ بعين الاعتبار في التفكير والتغيير.',
      fr: 'J\'espère aussi que HerVoice pourra offrir aux designers, développeurs et décideurs de tous les secteurs des perspectives authentiques, concrètes et puissantes venant des femmes—afin que ces voix soient non seulement entendues, mais réellement intégrées à la réflexion et au changement.',
      de: 'Ich hoffe auch, dass HerVoice Designerinnen, Designern, Entwicklerinnen, Entwicklern und Entscheidungsträgerinnen und -trägern authentische, konkrete und kraftvolle Perspektiven von Frauen bieten kann—damit diese Stimmen nicht nur gehört, sondern wirklich in Denken und Veränderung einfließen.'
    },
    'index.pinnedP5': {
      zh: '感谢你的到来。期待你的留言。',
      en: 'Thank you for being here. I look forward to your message.',
      ar: 'شكرًا لوجودك معنا. أتطلّع إلى رسالتك.',
      fr: 'Merci d\'être ici. J\'attends votre message avec impatience.',
      de: 'Danke, dass du da bist. Ich freue mich auf deine Nachricht.'
    },
    'index.communityGuidelines': {
      zh: '请文明发言、友善探讨，共建温暖有爱的社区。期待你的声音。',
      en: 'Please speak respectfully and kindly. Let\'s build a warm, caring community together.',
      ar: 'نرجو التحدث بلطف واحترام. لنبنِ مجتمعًا دافئًا ومحبًا معًا.',
      fr: 'Merci de parler avec respect et bienveillance. Construisons une communauté chaleureuse.',
      de: 'Bitte sprich respektvoll und freundlich. Gestalten wir gemeinsam eine warme Community.'
    },
    'comments.title': {
      zh: '留言讨论',
      en: 'Discussion',
      ar: 'نقاش',
      fr: 'Discussion',
      de: 'Diskussion'
    },
    'comments.hint': {
      zh: '欢迎分享你的经历与建议，留言审核后显示。',
      en: 'Share your experiences and suggestions. Messages appear after review.',
      ar: 'شاركي تجربتك واقتراحاتك. تُعرض الرسائل بعد المراجعة.',
      fr: 'Partagez vos expériences. Les messages apparaissent après modération.',
      de: 'Teile deine Erfahrungen. Beiträge erscheinen nach Prüfung.'
    },
    'feedback.compactNotice': {
      zh: '留言审核后显示 · 请文明发言 · 任意语言均可 · 评论下方可点「翻译」',
      en: 'Moderated · Be respectful · Any language · Tap「Translate」under comments',
      ar: 'تُراجع الرسائل · تحدثي بلطف · أي لغة · اضغطي «ترجمة» أسفل التعليق',
      fr: 'Modéré · Soyez respectueuse · Toute langue · « Traduire » sous chaque commentaire',
      de: 'Moderiert · Respektvoll · Jede Sprache · «Übersetzen» unter Kommentaren'
    },
    'index.modulesTitle': {
      zh: '探索板块',
      en: 'Explore Sections',
      ar: 'استكشفي الأقسام',
      fr: 'Explorer les sections',
      de: 'Bereiche entdecken'
    },
    'index.moduleSexDesc': {
      zh: '成年人性健康科普与产品改进建议',
      en: 'Adult sexual health & product feedback',
      ar: 'صحة جنسية للبالغات وتحسين المنتجات',
      fr: 'Santé sexuelle adulte & amélioration produits',
      de: 'Sexuelle Gesundheit & Produktverbesserung'
    },
    'index.moduleYouthDesc': {
      zh: '12–18 岁青少年性教育常识',
      en: 'Sex education for teens aged 12–18',
      ar: 'تثقيف جنسي للمراهقات 12–18',
      fr: 'Éducation sexuelle pour les 12–18 ans',
      de: 'Sexualaufklärung für Jugendliche 12–18'
    },
    'index.modulePregnancyDesc': {
      zh: '孕期及产后的需求与产品改进',
      en: 'Pregnancy & postpartum needs & products',
      ar: 'احتياجات الحمل وما بعد الولادة',
      fr: 'Besoins grossesse & post-partum',
      de: 'Bedürfnisse in Schwangerschaft & Wochenbett'
    },
    'index.enter': {
      zh: '进入 →',
      en: 'Enter →',
      ar: 'ادخلي →',
      fr: 'Entrer →',
      de: 'Öffnen →'
    },
    'feedback.title': { zh: '留言板', en: 'Feedback Board', ar: 'لوحة الرسائل', fr: 'Mur de messages', de: 'Feedback-Board' },
    'feedback.tagline': {
      zh: '分享你的想法，一起推动改变。',
      en: 'Share your thoughts and help drive change together.',
      ar: 'شاركي أفكارك وساهمي في التغيير معًا.',
      fr: 'Partagez vos idées et faisons avancer le changement ensemble.',
      de: 'Teile deine Gedanken und gestalte Veränderung mit uns.'
    },
    'feedback.notice': {
      zh: '所有留言需经过审核后显示，请文明发言。',
      en: 'All messages are moderated before publishing. Please be respectful.',
      ar: 'تُعرض الرسائل بعد المراجعة. نرجو اللطف في التعبير.',
      fr: 'Les messages sont modérés avant publication. Merci de rester respectueuse.',
      de: 'Beiträge werden vor der Veröffentlichung geprüft. Bitte respektvoll bleiben.'
    },
    'feedback.welcome': {
      zh: '🌍 欢迎来自世界各地的女性留言。你可以用任何语言书写，点击评论下方的「翻译」即可阅读其他语言的留言。',
      en: '🌍 Women from every country are welcome. Write in any language—tap "Translate" under each comment to read others.',
      ar: '🌍 نرحّب بالنساء من كل أنحاء العالم. اكتبي بأي لغة—اضغطي «ترجمة» أسفل كل تعليق لقراءة اللغات الأخرى.',
      fr: '🌍 Les femmes du monde entier sont les bienvenues. Écrivez dans n\'importe quelle langue—cliquez sur « Traduire » sous chaque commentaire.',
      de: '🌍 Frauen aus aller Welt sind willkommen. Schreib in jeder Sprache—tippe unter jedem Kommentar auf „Übersetzen“.'
    },
    'feedback.sectionTitle': {
      zh: '在线留言',
      en: 'Leave a Message',
      ar: 'اتركي رسالة',
      fr: 'Laisser un message',
      de: 'Nachricht hinterlassen'
    },
    'feedback.translateHint': {
      zh: '评论将翻译为：',
      en: 'Translate comments to:',
      ar: 'ترجمة التعليقات إلى:',
      fr: 'Traduire les commentaires en :',
      de: 'Kommentare übersetzen in:'
    },
    'feedback.hintNote': {
      zh: '（可在右上角切换语言）',
      en: '(change language in the top-right corner)',
      ar: '(غيّري اللغة في الزاوية العلوية)',
      fr: '(changez la langue en haut à droite)',
      de: '(Sprache oben rechts wechseln)'
    },
    'translate.btn': { zh: '🌐 翻译', en: '🌐 Translate', ar: '🌐 ترجمة', fr: '🌐 Traduire', de: '🌐 Übersetzen' },
    'translate.loading': { zh: '翻译中…', en: 'Translating…', ar: 'جارٍ الترجمة…', fr: 'Traduction…', de: 'Wird übersetzt…' },
    'translate.error': { zh: '翻译失败，请重试', en: 'Translation failed', ar: 'فشلت الترجمة', fr: 'Échec de la traduction', de: 'Übersetzung fehlgeschlagen' },
    'translate.showOriginal': { zh: '显示原文', en: 'Show original', ar: 'عرض الأصل', fr: 'Voir l\'original', de: 'Original anzeigen' }
  };

  function detectLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANG_META[saved]) return saved;
    var browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (LANG_META[browser]) return browser;
    if (browser === 'zh') return 'zh';
    return 'en';
  }

  function getLang() {
    return detectLang();
  }

  function t(key, lang) {
    var l = lang || getLang();
    var entry = STRINGS[key];
    if (!entry) return key;
    return entry[l] || entry.en || entry.zh || key;
  }

  function setLang(lang) {
    if (!LANG_META[lang]) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
    global.dispatchEvent(new CustomEvent('hervoice:langchange', { detail: { lang: lang } }));
  }

  function applyTranslations(lang) {
    var l = lang || getLang();
    var meta = LANG_META[l];

    document.documentElement.lang = l === 'zh' ? 'zh-CN' : l;
    document.documentElement.dir = meta.dir;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key, l);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'), l));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      document.title = t(el.getAttribute('data-i18n-title'), l);
    });

    var switcher = document.querySelector('.lang-switcher select');
    if (switcher) switcher.value = l;
  }

  function createLangSwitcher() {
    if (document.querySelector('.lang-switcher')) return;

    var wrap = document.createElement('div');
    wrap.className = 'lang-switcher';
    wrap.innerHTML =
      '<label class="lang-switcher-label">' +
      '<span data-i18n="lang.label">' + t('lang.label') + '</span>' +
      '<select aria-label="Language"></select>' +
      '</label>';

    var select = wrap.querySelector('select');
    Object.keys(LANG_META).forEach(function (code) {
      var opt = document.createElement('option');
      opt.value = code;
      opt.textContent = LANG_META[code].label;
      select.appendChild(opt);
    });
    select.value = getLang();
    select.addEventListener('change', function () {
      setLang(select.value);
    });

    var nav = document.querySelector('.nav-inner');
    if (nav) nav.appendChild(wrap);
  }

  function init() {
    createLangSwitcher();
    applyTranslations();
  }

  global.HV_I18N = {
    getLang: getLang,
    setLang: setLang,
    t: t,
    applyTranslations: applyTranslations,
    LANG_META: LANG_META,
    init: init
  };

  document.addEventListener('DOMContentLoaded', init);
})(window);
