/* =========================================================
   CV Renderer — يقرأ data.js + options من URL
   ========================================================= */
(function () {
  'use strict';

  const SITE = window.SITE || {};
  const PRODUCTS_3D = window.PRODUCTS_3D || [];
  const WEB_PROJECTS = window.WEB_PROJECTS || [];

  const $ = (s, r) => (r || document).querySelector(s);

  /* ---------- قراءة الخيارات من URL ---------- */
  function getOptions() {
    const params = new URLSearchParams(location.search);
    const defaults = {
      hero: true, bio: true,
      skills3d: true, skillsWeb: true,
      education: true, languages: true, soft: true,
      products: false, projects: true,
      photo: false, color: true,
      print: false
    };
    const opts = {};
    Object.keys(defaults).forEach((k) => {
      const v = params.get(k);
      if (v === null) opts[k] = defaults[k];
      else opts[k] = v === 'true' || v === '1';
    });
    return opts;
  }

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const strip = (s) => String(s || '').replace(/<[^>]*>/g, '');

  /* ---------- استخراج بلوك من about ---------- */
  function findBlock(idOrType) {
    const blocks = (SITE.about && SITE.about.blocks) || [];
    return blocks.find((b) => b.id === idOrType) || null;
  }

  /* ---------- رأس السيرة ---------- */
  function renderHeader(opts) {
    const m = SITE.meta || {};
    const c = SITE.contact || {};
    const h = SITE.hero || {};

    const name = m.brandName || 'الاسم';
    const nameEn = m.brandSub || '';
    const tagline = h.badge || 'مصمم 3D ومطور ويب';

    // نأخذ من metaLinks في hero أو نبني من contact
    const metaLinks = h.metaLinks || [];
    const contacts = [];
    if (c.email)   contacts.push({ icon:'fa-envelope', text: c.email });
    if (c.whatsapp) contacts.push({ icon:'fa-phone-alt', text: '+' + c.whatsapp });
    if (c.github)  contacts.push({ icon:'fa-github', text: c.github });
    if (c.website) contacts.push({ icon:'fa-globe', text: c.website });
    // إذا لا يوجد بيانات في contact، استخدم metaLinks
    const finalContacts = contacts.length ? contacts :
      metaLinks.map((l) => ({ icon: l.icon || 'fa-link', text: strip(l.label) }));

    const photoHtml = opts.photo
      ? `<div class="cv-photo"><img src="assets/photo.jpg" alt="" onerror="this.parentNode.innerHTML='<i class=&quot;fas fa-user&quot;></i>'" /></div>`
      : '';

    const contactsHtml = finalContacts.length
      ? `<div class="cv-contacts">
          ${finalContacts.map((ct) =>
            `<span class="cv-contacts-item"><i class="fas ${esc(ct.icon)}"></i><span>${esc(ct.text)}</span></span>`).join('')}
        </div>`
      : '';

    return `
      <header class="cv-header">
        <div class="cv-header-inner">
          ${photoHtml}
          <div class="cv-header-info">
            <h1 class="cv-name">${esc(name)}</h1>
            ${nameEn ? `<div class="cv-name-en">${esc(nameEn)}</div>` : ''}
            ${tagline ? `<span class="cv-tagline">${esc(tagline)}</span>` : ''}
            ${contactsHtml}
          </div>
        </div>
      </header>
    `;
  }

  /* ---------- Sidebar ---------- */
  function renderChipsBlock(block, fallbackTitle) {
    if (!block || !block.items || !block.items.length) return '';
    return `
      <div class="cv-side-block">
        <h3 class="cv-side-title">
          ${block.icon ? `<i class="fas ${esc(block.icon)}"></i>` : ''}
          ${esc(block.title || fallbackTitle || '')}
        </h3>
        <div class="cv-chips">
          ${block.items.map((it) => `<span class="cv-chip">${esc(it)}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function renderLanguages(block) {
    if (!block || !block.items || !block.items.length) return '';
    return `
      <div class="cv-side-block">
        <h3 class="cv-side-title">
          <i class="fas ${esc(block.icon || 'fa-language')}"></i>
          ${esc(block.title || 'اللغات')}
        </h3>
        ${block.items.map((l) => `
          <div class="cv-lang">
            <div class="cv-lang-head">
              <span class="cv-lang-name">${esc(l.name || '')}</span>
              <span class="cv-lang-level">${esc(l.level || (l.percent + '%'))}</span>
            </div>
            <div class="cv-lang-bar"><i style="width:${Math.max(0, Math.min(100, l.percent || 0))}%"></i></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderEducation(block) {
    if (!block || !block.items || !block.items.length) return '';
    return `
      <div class="cv-side-block">
        <h3 class="cv-side-title">
          <i class="fas ${esc(block.icon || 'fa-university')}"></i>
          ${esc(block.title || 'التعليم')}
        </h3>
        ${block.items.map((e) => `
          <div class="cv-edu-item">
            <div class="cv-edu-title">${esc(e.title || e.school || '')}</div>
            ${(e.subtitle || e.degree) ? `<div class="cv-edu-sub">${esc(e.subtitle || e.degree || '')}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSidebar(opts) {
    const out = [];
    if (opts.skills3d) {
      const b = findBlock('skills3d') || {
        title: 'أدوات 3D', icon: 'fa-cube',
        items: (SITE.about && SITE.about.skills3d) || []
      };
      const html = renderChipsBlock(b);
      if (html) out.push(html);
    }
    if (opts.skillsWeb) {
      const b = findBlock('skillsWeb') || {
        title: 'تطوير الويب', icon: 'fa-laptop-code',
        items: (SITE.about && SITE.about.skillsWeb) || []
      };
      const html = renderChipsBlock(b);
      if (html) out.push(html);
    }
    if (opts.languages) {
      const b = findBlock('languages') || {
        title: 'اللغات', icon: 'fa-language',
        items: (SITE.about && SITE.about.languages) || []
      };
      const html = renderLanguages(b);
      if (html) out.push(html);
    }
    if (opts.education) {
      const b = findBlock('education') || {
        title: 'التعليم', icon: 'fa-university',
        items: (SITE.about && SITE.about.education) || []
      };
      const html = renderEducation(b);
      if (html) out.push(html);
    }
    if (opts.soft) {
      const b = findBlock('softSkills') || {
        title: 'مهارات شخصية', icon: 'fa-user-check',
        items: (SITE.about && SITE.about.softSkills) || []
      };
      const html = renderChipsBlock(b);
      if (html) out.push(html);
    }
    return out.join('');
  }

  /* ---------- Bio ---------- */
  function renderBio() {
    const a = SITE.about || {};
    if (!a.bio) return '';
    return `
      <section class="cv-section">
        <h2 class="cv-section-title">
          <i class="fas fa-quote-right"></i>
          نبذة
        </h2>
        <p class="cv-bio">${esc(a.bio)}</p>
      </section>
    `;
  }

  /* ---------- Projects (Web) ---------- */
  function renderProjects() {
    if (!WEB_PROJECTS.length) return '';
    return `
      <section class="cv-section">
        <h2 class="cv-section-title">
          <i class="fas fa-code"></i>
          المشاريع البرمجية
        </h2>
        ${WEB_PROJECTS.map((p) => `
          <div class="cv-proj">
            <div class="cv-proj-head">
              <div class="cv-proj-name">${esc(p.name || '')}</div>
              ${p.links && p.links.demo
                ? `<span class="cv-proj-link">${esc(p.links.demo.replace(/^https?:\/\//, ''))}</span>`
                : (p.private ? `<span class="cv-proj-link">مشروع خاص</span>` : '')}
            </div>
            ${p.subtitle ? `<div class="cv-proj-sub">${esc(p.subtitle)}</div>` : ''}
            ${p.desc ? `<div class="cv-proj-desc">${esc(p.desc)}</div>` : ''}
            ${(p.bullets && p.bullets.length) ? `
              <ul class="cv-proj-bullets">
                ${p.bullets.slice(0, 4).map((b) => `<li>${esc(b)}</li>`).join('')}
              </ul>` : ''}
            ${(p.tech && p.tech.length) ? `
              <div class="cv-proj-tech">
                ${p.tech.map((t) => `<span>${esc(t)}</span>`).join('')}
              </div>` : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  /* ---------- Products (3D) ---------- */
  function renderProducts() {
    if (!PRODUCTS_3D.length) return '';
    return `
      <section class="cv-section">
        <h2 class="cv-section-title">
          <i class="fas fa-cube"></i>
          منتجات 3D
        </h2>
        ${PRODUCTS_3D.map((p) => `
          <div class="cv-proj">
            <div class="cv-proj-head">
              <div class="cv-proj-name">${esc(p.name || '')}</div>
              ${p.tag ? `<span class="cv-proj-link">${esc(p.tag)}</span>` : ''}
            </div>
            ${p.short ? `<div class="cv-proj-desc">${esc(p.short)}</div>` : ''}
            ${(p.software && p.software.length) ? `
              <div class="cv-proj-tech">
                ${p.software.map((t) => `<span>${esc(t)}</span>`).join('')}
              </div>` : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  /* ---------- Main ---------- */
  function renderMain(opts) {
    const parts = [];
    if (opts.bio) parts.push(renderBio());
    if (opts.projects) parts.push(renderProjects());
    if (opts.products) parts.push(renderProducts());
    return parts.filter(Boolean).join('');
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const name = (SITE.meta && SITE.meta.brandName) || '';
    const site = (SITE.contact && SITE.contact.website) || '';
    return `
      <footer class="cv-footer">
        ${esc(name)} ${site ? `· ${esc(site)}` : ''} · ${new Date().getFullYear()}
      </footer>
    `;
  }

  /* ---------- التطبيق ---------- */
  function applyColorTheme(on) {
    if (on) return;
    // نمط أحادي (رمادي) إذا اختار المستخدم إيقاف اللون
    const style = document.createElement('style');
    style.textContent = `
      .cv-header{background:#1e293b !important}
      .cv-name{color:#fff !important}
      .cv-side-title{color:#0f172a !important;border-bottom-color:#cbd5e1 !important}
      .cv-section-title{color:#0f172a !important;border-bottom-color:#1e293b !important}
      .cv-section-title i{color:#1e293b !important}
      .cv-chip{background:#f1f5f9 !important;color:#334155 !important}
      .cv-lang-bar i{background:#1e293b !important}
      .cv-contacts-item i{color:rgba(255,255,255,.7) !important}
      .cv-tagline{background:rgba(255,255,255,.15) !important}
      .cv-proj-link{color:#334155 !important;background:#f1f5f9 !important}
      .cv-proj-tech span{color:#334155 !important}
      .cv-proj-bullets li::before{color:#1e293b !important}
    `;
    document.head.appendChild(style);
  }

  /* ---------- Boot ---------- */
  function boot() {
    const opts = getOptions();
    const root = $('#cvRoot');
    if (!root) return;

    if (!opts.color) applyColorTheme(false);

    root.innerHTML = [
      opts.hero ? renderHeader(opts) : '',
      '<div class="cv-body">',
      `<aside class="cv-side">${renderSidebar(opts)}</aside>`,
      `<main class="cv-main">${renderMain(opts)}</main>`,
      '</div>',
      renderFooter()
    ].join('');

    // تحديث عنوان الصفحة
    const name = (SITE.meta && SITE.meta.brandName) || 'CV';
    document.title = `${name} — السيرة الذاتية`;

    // طباعة تلقائية إذا طُلب
    if (opts.print) {
      setTimeout(() => window.print(), 400);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
