/* =========================================================
   Portfolio Data
   هذا الملف يُدار تلقائياً عبر admin.html
   لا تعدّله يدوياً إلا إن كنت تعرف ما تفعل
   ========================================================= */

window.SITE = {
  meta: {
    title: "زيد قداح — مصمم منتجات 3D ومطور ويب",
    description: "بورتفوليو زيد قداح: تصميم منتجات ثلاثية الأبعاد وتطوير أنظمة ويب.",
    brandInitial: "Z",
    brandName: "زيد قداح",
    brandSub: "ZAID QADDAH"
  },

  /* ترتيب الأقسام في الصفحة — يمكن تغييره من لوحة التحكم */
  order: ["hero", "about", "products3d", "webProjects", "contact"],

  hero: {
    badge: "متاح للعمل الحر",
    titleHtml: "أصمّم منتجات <span class=\"grad\">ثلاثية الأبعاد</span> وأبني <span class=\"grad\">أنظمة ويب</span> متكاملة.",
    subtitle: "طالب هندسة حواسيب وأتمتة — أصنع نماذج منتجات واقعية في Blender، وأطوّر مواقع وأنظمة إدارة بقواعد بيانات MySQL.",
    ctaPrimary:   { label: "شاهد منتجات 3D", href: "#products3d", icon: "fa-cube" },
    ctaSecondary: { label: "المشاريع البرمجية", href: "#webProjects", icon: "fa-code" },
    stats: [
      { value: "8+",   label: "مشاريع على GitHub" },
      { value: "2",    label: "مجال: 3D + Web" },
      { value: "100%", label: "تعلّم ذاتي" }
    ],
    metaLinks: [
      { icon: "fa-envelope",  label: "zaidqaddah@gmail.com", href: "mailto:zaidqaddah@gmail.com" },
      { icon: "fa-github",    label: "TheraLaugh",           href: "https://github.com/TheraLaugh" },
      { icon: "fa-phone-alt", label: "+963 940 891 715",     href: "tel:+963940891715" }
    ]
  },

  about: {
    eyebrow: "نبذة",
    title: "من أنا",
    bio: "طالب هندسة حواسيب وأتمتة في جامعة دمشق، أعمل على تصميم المنتجات ثلاثية الأبعاد وبناء أنظمة الويب. أدمج بين الإبداع البصري والمنطق البرمجي لإنتاج أعمال قابلة للاستخدام التجاري.",
    blocks: [
      {
        id: "skills3d",
        icon: "fa-cube",
        title: "أدوات 3D",
        type: "chips",
        items: ["Blender", "Cycles", "EEVEE", "UV Mapping", "PBR Materials", "HDRI Lighting", "Product Render"]
      },
      {
        id: "skillsWeb",
        icon: "fa-laptop-code",
        title: "تطوير الويب",
        type: "chips",
        items: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "C++", "Git / GitHub", "AI-assisted Dev"]
      },
      {
        id: "education",
        icon: "fa-university",
        title: "التعليم",
        type: "list",
        items: [
          { title: "جامعة دمشق", subtitle: "هندسة الحواسيب والأتمتة — السنة الثانية" },
          { title: "تعلّم ذاتي مستمر", subtitle: "3D · Web · AI Tools" }
        ]
      },
      {
        id: "languages",
        icon: "fa-language",
        title: "اللغات",
        type: "languages",
        items: [
          { name: "العربية",   level: "أم",  percent: 100 },
          { name: "الإنجليزية", level: "70%", percent: 70 },
          { name: "الروسية",   level: "60%", percent: 60 }
        ]
      },
      {
        id: "softSkills",
        icon: "fa-user-check",
        title: "مهارات شخصية",
        type: "chips",
        items: ["تعلّم ذاتي", "حل المشكلات", "العمل ضمن فريق", "تفكير تجاري", "إدارة وقت"]
      }
    ]
  },

  products3d: {
    eyebrow: "معرض الأعمال / 3D",
    title: "منتجات ثلاثية الأبعاد",
    subtitle: "نمذجة، خامات، إضاءة ورندر — جاهزة للاستخدام التجاري والإعلاني."
  },

  webProjects: {
    eyebrow: "معرض الأعمال / Web",
    title: "مشاريع الويب",
    subtitle: "تطبيقات وأنظمة متكاملة — من الواجهة إلى قاعدة البيانات."
  },

  contact: {
    title: "لنتحدث عن مشروعك",
    subtitle: "سواء كان نموذج منتج 3D أو موقع ويب متكامل — أرسل تفاصيلك وسأعود إليك.",
    email: "zaidqaddah@gmail.com",
    whatsapp: "963940891715",
    github: "TheraLaugh",
    website: "theralaugh.github.io/two"
  },

  /* أصناف منتجات 3D — يمكن إضافة/حذف/تعديل */
  categories3d: [
    { id: "perfume", label: "عطور" },
    { id: "audio",   label: "صوتيات" },
    { id: "product", label: "منتجات" }
  ],

  /* أصناف مشاريع الويب */
  categoriesWeb: [
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend",  label: "واجهات" },
    { id: "tools",     label: "أدوات" }
  ]
};

/* =========================================================
   منتجات 3D
   ========================================================= */
window.PRODUCTS_3D = [];

/* =========================================================
   مشاريع الويب
   ========================================================= */
window.WEB_PROJECTS = [];
