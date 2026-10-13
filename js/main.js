/* =========================================================
   1) بناء بطاقات منتجات 3D
   ========================================================= */
const grid3d = document.getElementById("grid-3d");
const products = window.PRODUCTS_3D || [];

function build3DCard(p) {
  const card = document.createElement("article");
  card.className = "card-3d";
  card.dataset.category = p.category;

  card.innerHTML = `
    <div class="card-3d-media">
      <span class="card-3d-tag">${p.tag}</span>
      <img src="${p.cover}" alt="${p.name}" loading="lazy"
           onerror="this.style.opacity=0.15" />
    </div>
    <div class="card-3d-body">
      <h3 class="card-3d-title">${p.name}</h3>
      <p class="card-3d-desc">${p.short}</p>
      <div class="card-3d-tools">
        ${p.software.map((s) => `<span>${s}</span>`).join("")}
      </div>
    </div>
  `;

  card.addEventListener("click", () => openProductModal(p));
  return card;
}

products.forEach((p) => grid3d.appendChild(build3DCard(p)));

/* =========================================================
   2) بناء بطاقات مشاريع الويب
   ========================================================= */
const gridWeb = document.getElementById("grid-web");
const webProjects = window.WEB_PROJECTS || [];

function buildWebCard(p) {
  const card = document.createElement("article");
  card.className = "card-web";
  card.dataset.category = p.category;

  const linksHtml = `
    <div class="card-web-links">
      ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> عرض</a>` : ""}
      ${p.links.github ? `<a href="${p.links.github}" target="_blank" rel="noopener"><i class="fab fa-github"></i> كود</a>` : ""}
    </div>
  `;

  const badge = p.private
    ? `<span class="card-badge-private"><i class="fas fa-lock"></i> خاص</span>`
    : "";

  card.innerHTML = `
    <div class="card-web-head">
      <div class="card-web-icon"><i class="fas ${p.icon}"></i></div>
      ${badge || linksHtml}
    </div>
    <h3 class="card-web-title">${p.name}</h3>
    <p class="card-web-sub">${p.subtitle}</p>
    <p class="card-web-desc">${p.desc}</p>
    <ul class="card-web-bullets">
      ${p.bullets.slice(0, 3).map((b) => `<li>${b}</li>`).join("")}
    </ul>
    <div class="card-web-tech">
      ${p.tech.map((t) => `<span>${t}</span>`).join("")}
    </div>
    ${p.private ? linksHtml : ""}
  `;

  return card;
}

webProjects.forEach((p) => gridWeb.appendChild(buildWebCard(p)));

/* =========================================================
   3) Intersection Observer — ظهور تدريجي
   ========================================================= */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-visible"), (i % 6) * 70);
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".card-3d, .card-web").forEach((c) => io.observe(c));

/* =========================================================
   4) الفلاتر
   ========================================================= */
document.querySelectorAll(".filters").forEach((filterGroup) => {
  const target = filterGroup.dataset.target;
  const cards = document.querySelectorAll(
    target === "3d" ? ".card-3d" : ".card-web"
  );

  filterGroup.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterGroup.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;

      cards.forEach((card) => {
        const match = f === "all" || card.dataset.category === f;
        card.style.display = match ? "" : "none";
      });
    });
  });
});

/* =========================================================
   5) Modal منتجات 3D
   ========================================================= */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

function openProductModal(p) {
  const galleryHtml = p.gallery && p.gallery.length
    ? `
      <div class="modal-gallery">
        <img class="modal-gallery-main" id="modal-main-img" src="${p.gallery[0]}" alt="${p.name}"
             onerror="this.style.opacity=0.15" />
        ${
          p.gallery.length > 1
            ? `<div class="modal-gallery-thumbs">
                ${p.gallery
                  .map(
                    (src, i) =>
                      `<img src="${src}" data-index="${i}" class="${i === 0 ? "is-active" : ""}"
                            onerror="this.style.opacity=0.2" alt="عرض ${i + 1}" />`
                  )
                  .join("")}
              </div>`
            : ""
        }
      </div>
    `
    : "";

  modalBody.innerHTML = `
    <span class="modal-tag">${p.tag}</span>
    <h3 class="modal-title">${p.name}</h3>
    <p class="modal-sub">${p.short}</p>

    ${galleryHtml}

    <div class="modal-meta">
      <div><strong>البرامج</strong><span>${p.software.join(" · ")}</span></div>
      <div><strong>الرندر</strong><span>${p.render}</span></div>
      <div><strong>عدد المضلعات</strong><span>${p.polys}</span></div>
      <div><strong>مدة العمل</strong><span>${p.time}</span></div>
    </div>

    <div class="modal-section">
      <h4>عن المشروع</h4>
      <p>${p.description}</p>
    </div>

    <div class="modal-section">
      <h4>تفاصيل تقنية</h4>
      <ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
    </div>
  `;

  // تفاعل مع الصور المصغّرة
  const mainImg = document.getElementById("modal-main-img");
  modalBody.querySelectorAll(".modal-gallery-thumbs img").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = p.gallery[parseInt(thumb.dataset.index, 10)];
      if (mainImg && src) {
        mainImg.src = src;
        modalBody
          .querySelectorAll(".modal-gallery-thumbs img")
          .forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
      }
    });
  });

  openModal();
}

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close]").forEach((el) =>
  el.addEventListener("click", closeModal)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* =========================================================
   6) قائمة الجوال
   ========================================================= */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("is-open"))
  );
}

/* =========================================================
   7) السنة في الفوتر
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
