/* =========================================================
   Portfolio — Main Renderer
   ========================================================= */
(function () {
  'use strict';

  const SITE = window.SITE || {};
  const PRODUCTS_3D = window.PRODUCTS_3D || [];
  const WEB_PROJECTS = window.WEB_PROJECTS || [];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];

  /* ---------- Utilities ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const stripHtml = (s) => String(s || '').replace(/<[^>]*>/g, '');

  /* =========================================================
     META & BRAND
     ========================================================= */
  function renderMeta() {
    const m = SITE.meta || {};
    if (m.title) document.title = m.title;
    const desc = $('meta[name="description"]');
    if (desc && m.description) desc.setAttribute('content', m.description);
    const ogT = $('meta[property="og:title"]');
    if (ogT && m.title) ogT.setAttribute('content', m.title);
    const ogD = $('meta[property="og:description"]');
    if (ogD && m.description) ogD.setAttribute('content', m.description);

    const init = $('#brandInitial'); if (init) init.textContent = m.brandInitial || '·';
    const bn = $('#brandName');
    if (bn) bn.innerHTML = `${esc(m.brandName || '')}${m.brandSub ? `<small>${esc(m.brandSub)}</small>` : ''}`;
    const fn = $('#footerName'); if (fn) fn.textContent = m.brandName || '';
    const fr = $('#footerRepo');
    if (fr && SITE.contact && SITE.contact.website) fr.textContent = SITE.contact.website;
  }

  /* =========================================================
     NAV
     ========================================================= */
  function renderNav() {
    const map = {
      hero: { label: 'الرئيسية', href: '#top' },
      about: { label: 'نبذة', href: '#about' },
      products3d: { label: 'منتجات 3D', href: '#products3d' },
      webProjects: { label: 'مشاريع الويب', href: '#webProjects' },
      contact: { label: 'تواصل', href: '#contact', cta: true }
    };
    const order = SITE.order || ['hero', 'about', 'products3d', 'webProjects', 'contact'];
    const links = $('#navLinks');
    if (!links) return;
    const visible = ['hero', 'about', 'products3d', 'webProjects', 'contact'];
    links.innerHTML = order
      .filter((k) => visible.includes(k))
      .map((k) => {
        const item = map[k];
        if (!item) return '';
        // لا تظهر رابط "الرئيسية" عادة إذا كان hero موجوداً (يكفي الشعار)
        if (k === 'hero') return '';
        // لا تظهر رابط قسم فارغ
        if (k === 'products3d' && !PRODUCTS_3D.length) return '';
        if (k === 'webProjects' && !WEB_PROJECTS.length) return '';
        return `<a href="${item.href}" class="${item.cta ? 'nav-cta' : ''}">${item.label}</a>`;
      })
      .join('');
  }

  /* =========================================================
     HERO
     ========================================================= */
  function renderHero() {
    const h = SITE.hero || {};
    const stats = (h.stats || []).map((s) =>
      `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('');
    const actions = `
      ${h.ctaPrimary ? `<a href="${esc(h.ctaPrimary.href)}" class="btn btn-primary"><i class="fas ${esc(h.ctaPrimary.icon || 'fa-arrow-left')}"></i> ${esc(h.ctaPrimary.label)}</a>` : ''}
      ${h.ctaSecondary ? `<a href="${esc(h.ctaSecondary.href)}" class="btn btn-ghost"><i class="fas ${esc(h.ctaSecondary.icon || 'fa-code')}"></i> ${esc(h.ctaSecondary.label)}</a>` : ''}
    `;
    const meta = (h.metaLinks || []).map((l) =>
      `<a href="${esc(l.href)}" target="_blank" rel="noopener"><i class="fas ${esc(l.icon)}"></i> ${esc(l.label)}</a>`).join('');

    return `
      <section class="hero" id="top">
        <div class="hero-inner">
          ${h.badge ? `<span class="hero-badge">${esc(h.badge)}</span>` : ''}
          <h1 class="hero-title">${h.titleHtml || ''}</h1>
          ${h.subtitle ? `<p class="hero-sub">${esc(h.subtitle)}</p>` : ''}
          ${actions ? `<div class="hero-actions">${actions}</div>` : ''}
          ${meta ? `<div class="hero-meta">${meta}</div>` : ''}
        </div>
        ${stats ? `<div class="hero-stats">${stats}</div>` : ''}
      </section>
    `;
  }

  /* =========================================================
     ABOUT
     ========================================================= */
  function renderAboutBlock(b) {
    if (!b || !b.type) return '';
    const head = `<h3>${b.icon ? `<i class="fas ${esc(b.icon)}"></i>` : ''} ${esc(b.title || '')}</h3>`;

    if (b.type === 'chips') {
      const chips = (b.items || []).map((c) => `<span class="chip">${esc(c)}</span>`).join('');
      return `<div class="about-card">${head}<div class="chips">${chips}</div></div>`;
    }
    if (b.type === 'list') {
      const items = (b.items || []).map((it) =>
        `<div class="edu-item"><strong>${esc(it.title)}</strong><span>${esc(it.subtitle || '')}</span></div>`).join('');
      return `<div class="about-card">${head}${items}</div>`;
    }
    if (b.type === 'languages') {
      const langs = (b.items || []).map((l) => `
        <div class="lang">
          <span class="lang-name">${esc(l.name)}</span>
          <span class="lang-bar"><i style="width:${Math.max(0, Math.min(100, l.percent || 0))}%"></i></span>
          <span class="lang-val">${esc(l.level || '')}</span>
        </div>`).join('');
      return `<div class="about-card">${head}${langs}</div>`;
    }
    if (b.type === 'text') {
      return `<div class="about-card">${head}<p style="color:var(--ink-soft);font-size:14.5px;line-height:1.9;white-space:pre-line">${esc(b.content || '')}</p></div>`;
    }
    return '';
  }

  function renderAbout() {
    const a = SITE.about || {};
    const blocks = (a.blocks || []).map(renderAboutBlock).join('');
    return `
      <section class="section" id="about">
        <div class="section-head">
          <div class="section-head-left">
            ${a.eyebrow ? `<div class="section-eyebrow"><i class="fas fa-user"></i> ${esc(a.eyebrow)}</div>` : ''}
            <h2 class="section-title">${esc(a.title || 'من أنا')}</h2>
          </div>
        </div>
        <div class="about-grid">
          ${a.bio ? `<div class="about-card about-bio"><h3><i class="fas fa-quote-right"></i> نبذة</h3><p>${esc(a.bio)}</p></div>` : ''}
          ${blocks}
        </div>
      </section>
    `;
  }

  /* =========================================================
     PRODUCTS 3D
     ========================================================= */
  function renderProducts3D() {
    const meta = SITE.products3d || {};
    const cats = SITE.categories3d || [];

    const filters = `
      <div class="filters" data-target="3d">
        <button class="filter is-active" data-filter="all">الكل</button>
        ${cats.map((c) => `<button class="filter" data-filter="${esc(c.id)}">${esc(c.label)}</button>`).join('')}
      </div>
    `;

    const cards = PRODUCTS_3D.length
      ? PRODUCTS_3D.map((p, i) => `
          <article class="card-3d" data-category="${esc(p.category || '')}" data-idx="${i}">
            <div class="card-3d-media">
              ${p.tag ? `<span class="card-3d-tag">${esc(p.tag)}</span>` : ''}
              <img src="${esc(p.cover || '')}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.opacity=.12" />
            </div>
            <div class="card-3d-body">
              <h3 class="card-3d-title">${esc(p.name)}</h3>
              <p class="card-3d-desc">${esc(p.short || '')}</p>
              <div class="card-3d-tools">
                ${(p.software || []).slice(0, 4).map((s) => `<span>${esc(s)}</span>`).join('')}
              </div>
            </div>
          </article>
        `).join('')
      : `<div class="empty"><i class="fas fa-cube"></i><strong>لا توجد منتجات بعد</strong></div>`;

    return `
      <section class="section" id="products3d">
        <div class="section-head">
          <div class="section-head-left">
            ${meta.eyebrow ? `<div class="section-eyebrow"><i class="fas fa-cube"></i> ${esc(meta.eyebrow)}</div>` : ''}
            <h2 class="section-title">${esc(meta.title || 'منتجات 3D')}</h2>
            ${meta.subtitle ? `<p class="section-sub">${esc(meta.subtitle)}</p>` : ''}
          </div>
          ${PRODUCTS_3D.length ? filters : ''}
        </div>
        <div class="grid grid-3d" id="grid-3d">${cards}</div>
      </section>
    `;
  }

  /* =========================================================
     WEB PROJECTS
     ========================================================= */
  function renderWebProjects() {
    const meta = SITE.webProjects || {};
    const cats = SITE.categoriesWeb || [];

    const filters = `
      <div class="filters" data-target="web">
        <button class="filter is-active" data-filter="all">الكل</button>
        ${cats.map((c) => `<button class="filter" data-filter="${esc(c.id)}">${esc(c.label)}</button>`).join('')}
      </div>
    `;

    const cards = WEB_PROJECTS.length
      ? WEB_PROJECTS.map((p, i) => {
          const links = `
            <div class="card-web-links">
              ${p.links && p.links.demo ? `<a href="${esc(p.links.demo)}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> عرض</a>` : ''}
              ${p.links && p.links.github ? `<a href="${esc(p.links.github)}" target="_blank" rel="noopener"><i class="fab fa-github"></i> كود</a>` : ''}
            </div>`;
          const badge = p.private ? `<span class="card-badge-private"><i class="fas fa-lock"></i> خاص</span>` : '';
          return `
            <article class="card-web" data-category="${esc(p.category || '')}" data-idx="${i}">
              <div class="card-web-head">
                <div class="card-web-icon"><i class="fas ${esc(p.icon || 'fa-code')}"></i></div>
                ${badge || links}
              </div>
              <h3 class="card-web-title">${esc(p.name)}</h3>
              <p class="card-web-sub">${esc(p.subtitle || '')}</p>
              <p class="card-web-desc">${esc(p.desc || '')}</p>
              ${(p.bullets && p.bullets.length) ? `<ul class="card-web-bullets">${p.bullets.slice(0, 3).map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
              ${(p.tech && p.tech.length) ? `<div class="card-web-tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
              ${p.private ? links : ''}
            </article>
          `;
        }).join('')
      : `<div class="empty"><i class="fas fa-code"></i><strong>لا توجد مشاريع بعد</strong></div>`;

    return `
      <section class="section section-alt" id="webProjects">
        <div class="section-inner">
          <div class="section-head">
            <div class="section-head-left">
              ${meta.eyebrow ? `<div class="section-eyebrow"><i class="fas fa-code"></i> ${esc(meta.eyebrow)}</div>` : ''}
              <h2 class="section-title">${esc(meta.title || 'مشاريع الويب')}</h2>
              ${meta.subtitle ? `<p class="section-sub">${esc(meta.subtitle)}</p>` : ''}
            </div>
            ${WEB_PROJECTS.length ? filters : ''}
          </div>
          <div class="grid grid-web" id="grid-web">${cards}</div>
        </div>
      </section>
    `;
  }

  /* =========================================================
     CONTACT
     ========================================================= */
  function renderContact() {
    const c = SITE.contact || {};
    const actions = `
      ${c.email ? `<a href="mailto:${esc(c.email)}" class="btn btn-primary"><i class="fas fa-envelope"></i> ${esc(c.email)}</a>` : ''}
      ${c.whatsapp ? `<a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="fab fa-whatsapp"></i> واتساب</a>` : ''}
    `;
    const socials = `
      ${c.github ? `<a href="https://github.com/${esc(c.github)}" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>` : ''}
      ${c.website ? `<a href="https://${esc(c.website)}" target="_blank" rel="noopener"><i class="fas fa-globe"></i> الموقع</a>` : ''}
    `;
    return `
      <section class="contact" id="contact">
        <div class="contact-inner">
          <h2>${esc(c.title || 'لنتحدث')}</h2>
          <p>${esc(c.subtitle || '')}</p>
          <div class="contact-actions">${actions}</div>
          ${socials ? `<div class="contact-socials">${socials}</div>` : ''}
        </div>
      </section>
    `;
  }

  /* =========================================================
     BUILD PAGE IN ORDER
     ========================================================= */
  function buildPage() {
    const page = $('#page');
    if (!page) return;
    const renderers = {
      hero: renderHero,
      about: renderAbout,
      products3d: renderProducts3D,
      webProjects: renderWebProjects,
      contact: renderContact
    };
    const order = SITE.order || ['hero', 'about', 'products3d', 'webProjects', 'contact'];
    page.innerHTML = order
      .filter((k) => renderers[k])
      .map((k) => renderers[k]())
      .join('');
  }

  /* =========================================================
     INTERACTIONS
     ========================================================= */
  function initFilters() {
    $$('.filters').forEach((group) => {
      const target = group.dataset.target;
      const gridSel = target === '3d' ? '.card-3d' : '.card-web';
      const cards = $$(gridSel, $('#page'));
      group.querySelectorAll('.filter').forEach((btn) => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.filter').forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const f = btn.dataset.filter;
          cards.forEach((c) => {
            c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none';
          });
        });
      });
    });
  }

  function initModal() {
    const modal = $('#modal');
    const body = $('#modalBody');
    if (!modal || !body) return;

    function open() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    $$('.card-3d').forEach((card) => {
      card.addEventListener('click', () => {
        const p = PRODUCTS_3D[+card.dataset.idx];
        if (!p) return;
        const gallery = p.gallery && p.gallery.length ? p.gallery : (p.cover ? [p.cover] : []);
        const galleryHtml = gallery.length
          ? `<div class="modal-gallery">
              <img class="modal-gallery-main" id="modalMainImg" src="${esc(gallery[0])}" onerror="this.style.opacity=.12" />
              ${gallery.length > 1 ? `<div class="modal-gallery-thumbs">${gallery.map((src, i) =>
                `<img src="${esc(src)}" data-index="${i}" class="${i === 0 ? 'is-active' : ''}" />`).join('')}</div>` : ''}
            </div>` : '';

        const metaHtml = `
          <div class="modal-meta">
            ${p.software && p.software.length ? `<div><strong>البرامج</strong><span>${esc(p.software.join(' · '))}</span></div>` : ''}
            ${p.render ? `<div><strong>الرندر</strong><span>${esc(p.render)}</span></div>` : ''}
            ${p.polys ? `<div><strong>المضلعات</strong><span>${esc(p.polys)}</span></div>` : ''}
            ${p.time ? `<div><strong>المدة</strong><span>${esc(p.time)}</span></div>` : ''}
          </div>`;

        body.innerHTML = `
          ${p.tag ? `<span class="modal-tag">${esc(p.tag)}</span>` : ''}
          <h3 class="modal-title">${esc(p.name)}</h3>
          ${p.short ? `<p class="modal-sub">${esc(p.short)}</p>` : ''}
          ${galleryHtml}
          ${metaHtml}
          ${p.description ? `<div class="modal-section"><h4>عن المشروع</h4><p>${esc(p.description)}</p></div>` : ''}
          ${(p.details && p.details.length) ? `<div class="modal-section"><h4>تفاصيل تقنية</h4><ul>${p.details.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>` : ''}
        `;

        const mainImg = $('#modalMainImg');
        body.querySelectorAll('.modal-gallery-thumbs img').forEach((t) => {
          t.addEventListener('click', () => {
            if (!mainImg) return;
            mainImg.src = gallery[+t.dataset.index];
            body.querySelectorAll('.modal-gallery-thumbs img').forEach((x) => x.classList.remove('is-active'));
            t.classList.add('is-active');
          });
        });
        open();
      });
    });
  }

  function initNav() {
    const nav = $('#siteNav');
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', () => links.classList.toggle('is-open'));
      links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('is-open')));
    }
    if (nav) {
      const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  function initReveal() {
    const cards = $$('.card-3d, .card-web');
    if (!cards.length || !('IntersectionObserver' in window)) {
      cards.forEach((c) => c.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), (i % 6) * 70);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((c) => io.observe(c));
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function boot() {
    renderMeta();
    renderNav();
    buildPage();
    initNav();
    initFilters();
    initModal();
    initReveal();

    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
