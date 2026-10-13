/* =========================================================
   بيانات الموقع — عدّل هنا فقط لإضافة/تعديل المشاريع
   ========================================================= */

/* ===== منتجات 3D ===== */
window.PRODUCTS_3D = [
  {
    "id": "عطر-thera-الفاخر",
    "name": "عطر thera الفاخر",
    "category": "perfume",
    "tag": "زجاج - تأثير رخامي",
    "cover": "assets/3d/عطر-thera-الفاخر/cover.jpg",
    "gallery": [
      "assets/3d/عطر-thera-الفاخر/cover.jpg"
    ],
    "short": "زجاجة عطر بتأثير رخامي على الغطاء",
    "description": "زجاجة عطر فاخرة بتأثير رخامي على الغطاء.\nمراعاة الطبلوجيا\nمراعاة IOR للزجاج والمادة العطرية\nمراعاة سماكة الزجاج",
    "software": [
      "Blender"
    ],
    "render": "Cycles · 4K",
    "polys": "—",
    "time": "—",
    "details": []
  },
  {
    id: "perfume-noir",
    name: "عطر Noir — زجاج ومعدن",
    category: "perfume",
    tag: "عطر · زجاج",
    cover: "assets/3d/perfume-noir/cover.jpg",
    gallery: [
      "assets/3d/perfume-noir/cover.jpg",
      "assets/3d/perfume-noir/view-1.jpg",
      "assets/3d/perfume-noir/view-2.jpg"
    ],
    short: "زجاجة عطر بتصميم فاخر، خامات زجاج ومعدن مع انعكاسات دقيقة.",
    description:
      "مشروع نمذجة منتج تجاري: زجاجة عطر بتصميم فاخر. ركّزت فيه على محاكاة الزجاج الواقعي عبر IOR مناسب، خامات المعدن المصقول، وإضاءة استوديو ثلاثية النقاط لإبراز التفاصيل.",
    software: ["Blender", "Cycles"],
    render: "Cycles · 4K",
    polys: "~42K",
    time: "3 أيام",
    details: [
      "محاكاة زجاج مع IOR 1.45 ورفراكشن واقعي.",
      "خامة معدنية مصقولة للغطاء (Anisotropic).",
      "إضاءة استوديو: Key + Fill + Rim.",
      "3 خلفيات مختلفة للعرض التجاري."
    ]
  },
  {
    id: "microphone-studio",
    name: "مايكروفون استوديو احترافي",
    category: "audio",
    tag: "مايكروفون · صوتيات",
    cover: "assets/3d/microphone-studio/cover.jpg",
    gallery: [
      "assets/3d/microphone-studio/cover.jpg",
      "assets/3d/microphone-studio/view-1.jpg",
      "assets/3d/microphone-studio/view-2.jpg"
    ],
    short: "مايكروفون بودكاست بتفاصيل دقيقة، شبك معدني وهيكل مطفي.",
    description:
      "نمذجة مايكروفون بودكاست احترافي. التحدي كان في الشبك المعدني (Mesh Grid) الذي يتطلب نمذجة دقيقة دون ثقل المجسم، مع خامات مطفي للمعدن لتفادي الانعكاسات المزعجة.",
    software: ["Blender", "Cycles"],
    render: "Cycles · 4K",
    polys: "~68K",
    time: "4 أيام",
    details: [
      "شبك معدني مُنمذج بالكامل بدون Textures.",
      "خامة Metal Rough للهيكل الرئيسي.",
      "تفاصيل البراغي والمفصلات الدقيقة.",
      "رندر بخلفية بيضاء للأغراض التجارية."
    ]
  },
  {
    id: "perfume-amber",
    name: "عطر Amber — تصميم كلاسيكي",
    category: "perfume",
    tag: "عطر · فاخر",
    cover: "assets/3d/perfume-amber/cover.jpg",
    gallery: [
      "assets/3d/perfume-amber/cover.jpg",
      "assets/3d/perfume-amber/view-1.jpg"
    ],
    short: "زجاجة عطر بتصميم كلاسيكي فاخر، زوايا هندسية دقيقة.",
    description:
      "زجاجة عطر بتصميم كلاسيكي يعتمد على الزوايا الهندسية والقبة الزجاجية. عملت على التوازن بين الشكل الجذاب والبساطة التجارية.",
    software: ["Blender", "Cycles"],
    render: "Cycles · 4K",
    polys: "~35K",
    time: "يومان",
    details: [
      "نمذجة دقيقة بالـ Subdivision Surface.",
      "خامة زجاج ملوّن مع Transmission.",
      "غطاء ذهبي بخامة عالية الانعكاس.",
      "إضاءة دافئة تبرز الطابع الفاخر."
    ]
  },
  {
    id: "headphones-pro",
    name: "سماعات Pro",
    category: "audio",
    tag: "سماعات · صوتيات",
    cover: "assets/3d/headphones-pro/cover.jpg",
    gallery: [
      "assets/3d/headphones-pro/cover.jpg",
      "assets/3d/headphones-pro/view-1.jpg"
    ],
    short: "سماعات احترافية بخامات جلدية ومعدنية، تفاصيل واقعية.",
    description:
      "سماعات رأس احترافية، ركّزت فيها على الخامات الواقعية: جلد مطفي للوسائد، معدن مصقول للهيكل، وبلاستيك ناعم للأجزاء الخارجية.",
    software: ["Blender", "Cycles"],
    render: "Cycles · 4K",
    polys: "~80K",
    time: "5 أيام",
    details: [
      "خامة جلد إجرائي (Procedural Leather).",
      "تفاصيل الخياطة على الوسائد.",
      "مفصلات ميكانيكية قابلة للطي.",
      "3 زوايا عرض مختلفة."
    ]
  },
  {
    id: "watch-luxury",
    name: "ساعة فاخرة",
    category: "product",
    tag: "منتج · فاخر",
    cover: "assets/3d/watch-luxury/cover.jpg",
    gallery: [
      "assets/3d/watch-luxury/cover.jpg",
      "assets/3d/watch-luxury/view-1.jpg"
    ],
    short: "ساعة يد فاخرة بتفاصيل ميكانيكية دقيقة وخامات معدنية.",
    description:
      "ساعة يد كلاسيكية بخامات ذهبية وزجاج ياقوتي. النمذجة الدقيقة للتاج والعقارب كانت الجزء الأكثر تحدياً.",
    software: ["Blender", "Cycles"],
    render: "Cycles · 4K",
    polys: "~55K",
    time: "3 أيام",
    details: [
      "خامة ذهب مع خصائص فريزnel.",
      "زجاج الياقوت بشفافية كاملة.",
      "تفاصيل الأرقام والعقارب بدقة عالية.",
      "إضاءة Softbox لمحاكاة الاستوديو."
    ]
  },
  {
    id: "cosmetic-bottle",
    name: "زجاجة مستحضرات تجميل",
    category: "product",
    tag: "منتج · تجميل",
    cover: "assets/3d/cosmetic-bottle/cover.jpg",
    gallery: [
      "assets/3d/cosmetic-bottle/cover.jpg",
      "assets/3d/cosmetic-bottle/view-1.jpg"
    ],
    short: "عبوة مستحضرات تجميل عصرية بخامات بلاستيكية ناعمة.",
    description:
      "عبوة سيروم بتصميم عصري بسيط. اعتمدت على لون الباستيل وخامات ناعمة لخلق إحساس بالنقاء والجودة.",
    software: ["Blender", "EEVEE"],
    render: "EEVEE · 4K",
    polys: "~28K",
    time: "يوم واحد",
    details: [
      "نمذجة دقيقة بالـ Bezier Curves.",
      "خامة بلاستيك ناعم مع Subsurface.",
      "غطاء قطارة بتفاصيل واقعية.",
      "رندر سريع بـ EEVEE."
    ]
  }
];

/* ===== مشاريع الويب ===== */
window.WEB_PROJECTS = [
  {
    id: "therawork",
    name: "TheraWork",
    subtitle: "نظام إدارة المواعيد",
    icon: "fa-calendar-check",
    category: "frontend",
    tech: ["HTML", "CSS", "JavaScript", "Local Storage"],
    desc: "تطبيق ويب تفاعلي (SPA) لإدارة المواعيد مع كشف تلقائي للصراعات.",
    bullets: [
      "جدول ديناميكي مع إضافة/حذف الصفوف والأعمدة.",
      "نظام ألوان ذكي يكشف 8 أنواع من التعارضات.",
      "تنبيهات صوتية وزمنية، حفظ محلي، تصدير/استيراد."
    ],
    links: { github: "https://github.com/TheraLaugh/TheraWork", demo: null }
  },
  {
    id: "therafollowers",
    name: "TheraFollowers",
    subtitle: "منصة زيادة متابعين إنستغرام",
    icon: "fa-users",
    category: "fullstack",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    desc: "منصة متكاملة لإدارة طلبات المتابعة، بنظام حسابات وصلاحيات.",
    bullets: [
      "طريقتان: يدوي (باستخدام حساباتي) ونظام تبادل بين المستخدمين.",
      "نظام حسابات متكامل (تسجيل دخول وإنشاء حسابات).",
      "لوحة تحكم للمستخدم لإدارة الطلبات."
    ],
    links: { github: "https://github.com/TheraLaugh", demo: "https://theralaugh.kesug.com" }
  },
  {
    id: "kids-center",
    name: "نظام إدارة مراكز الأطفال",
    subtitle: "نظام إداري احترافي",
    icon: "fa-child",
    category: "fullstack",
    tech: ["PHP", "MySQL", "JavaScript", "Excel / PDF"],
    desc: "نظام إداري كامل لإدارة المركز والموظفين مع تقارير مالية.",
    bullets: [
      "إحصائيات يومية وشهرية للأطفال والإيرادات وصافي الأرباح.",
      "نظام صلاحيات (أداري ينشئ حسابات للموظفين).",
      "مقارنة الأشهر، تصدير تقارير Excel و PDF.",
      "قابل لإعادة الاستخدام كنموذج اشتراك شهري (SaaS)."
    ],
    links: { github: null, demo: null },
    private: true
  },
  {
    id: "theraqr",
    name: "TheraQR",
    subtitle: "مولّد رموز QR",
    icon: "fa-qrcode",
    category: "tools",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "أداة سريعة لتوليد رموز QR لأي نص أو رابط مع إمكانية التحميل.",
    bullets: [
      "واجهة بسيطة وسريعة.",
      "تخصيص الحجم واللون.",
      "تحميل فوري بصيغة PNG."
    ],
    links: { github: "https://github.com/TheraLaugh", demo: null }
  },
  {
    id: "theragym",
    name: "TheraGYM",
    subtitle: "مساعد التمارين الرياضية",
    icon: "fa-dumbbell",
    category: "tools",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "تطبيق لتنظيم التمارين ومتابعة التقدم اليومي.",
    bullets: [
      "جدول تمارين قابل للتخصيص.",
      "تتبع التقدم اليومي.",
      "واجهة عربية نظيفة."
    ],
    links: { github: "https://github.com/TheraLaugh", demo: null }
  },
  {
    id: "therastat",
    name: "TheraStat",
    subtitle: "أدوات إحصائية",
    icon: "fa-chart-line",
    category: "tools",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "مجموعة أدوات إحصائية بسيطة للمستخدم العربي.",
    bullets: [
      "حسابات إحصائية متعددة.",
      "واجهة بسيطة وواضحة.",
      "نتائج فورية."
    ],
    links: { github: "https://github.com/TheraLaugh", demo: null }
  }
];
