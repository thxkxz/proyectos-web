/**
 * ================================================================
 * CARLY'S RESTO BAR — main.js
 * JavaScript vanilla, sin dependencias externas.
 * ================================================================
 *
 * PERSONALIZACIÓN RÁPIDA:
 * Edita las constantes de la sección "CONFIGURACIÓN" debajo.
 * Solo necesitas cambiar los valores en ese bloque.
 */

'use strict';

/* ================================================================
   CONFIGURACIÓN DEL NEGOCIO
   ================================================================ */
const CONFIG = {
  /**
   * Número de WhatsApp SIN el signo +, en formato internacional.
   * Colombia: 57 + número (ej: 573001234567)
   */
  whatsappNumber: '573145320685',

  /**
   * Mensaje predeterminado al abrir WhatsApp (URL-encoded).
   */
  whatsappMessage: 'Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Carly%27s%20Resto%20Bar%20en%20Turbaco',

  /**
   * Año del copyright en el footer.
   * 'auto' usa el año actual del sistema.
   */
  copyrightYear: 'auto',
};


/* ================================================================
   INICIALIZACIÓN
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initCopyrightYear();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initFabEntrance();
  initMenuFilter();
  initActiveNavHighlight();
});


/* ================================================================
   1. ACTUALIZAR LINKS DE WHATSAPP
   Busca los elementos por ID y actualiza su href conservando
   el mensaje específico de cada link si ya tenía uno propio.
   ================================================================ */
function initWhatsAppLinks() {
  const waLinkIds = [
    'header-whatsapp-link',
    'mobile-whatsapp-link',
    'hero-whatsapp-link',
    'servicios-whatsapp-link',
    'footer-whatsapp-link',
    'fab-whatsapp-link',
  ];

  waLinkIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const existingHref = el.getAttribute('href') || '';
    const existingMsg = existingHref.includes('?text=')
      ? existingHref.split('?text=')[1]
      : CONFIG.whatsappMessage;

    el.setAttribute(
      'href',
      `https://wa.me/${CONFIG.whatsappNumber}?text=${existingMsg}`
    );
  });
}


/* ================================================================
   2. AÑO DE COPYRIGHT DINÁMICO
   ================================================================ */
function initCopyrightYear() {
  const yearEl = document.getElementById('footer-year');
  if (!yearEl) return;

  const year =
    CONFIG.copyrightYear === 'auto'
      ? new Date().getFullYear()
      : CONFIG.copyrightYear;

  yearEl.textContent = year;
}


/* ================================================================
   3. EFECTO DEL HEADER AL HACER SCROLL
   Añade .header--scrolled cuando scroll > 40px.
   ================================================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* ================================================================
   4. MENÚ MÓVIL (hamburguesa)
   ================================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  const menuLinks = menu.querySelectorAll('.mobile-menu__link');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      setMenuState(false);
    }
  });

  function setMenuState(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));

    if (open) {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-label', 'Cerrar menú');
    } else {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }
  }
}


/* ================================================================
   5. SMOOTH SCROLL PARA ANCLAS
   ================================================================ */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });

    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener(
      'blur',
      () => target.removeAttribute('tabindex'),
      { once: true }
    );
  });
}


/* ================================================================
   6. SCROLL REVEAL CON IntersectionObserver
   ================================================================ */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
}


/* ================================================================
   7. FAB WHATSAPP — COMPORTAMIENTO DE SCROLL
   ================================================================ */
function initFabEntrance() {
  const fab = document.getElementById('fab-whatsapp-link');
  if (!fab) return;

  let lastScrollY   = window.scrollY;
  let fabVisible    = true;
  let scrollTicking = false;

  function handleFabScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollingDown  = currentScrollY > lastScrollY;
        const scrolledPastHero = currentScrollY > 200;
        const isMobile = window.innerWidth < 1024;

        if (isMobile && scrollingDown && scrolledPastHero && fabVisible) {
          fab.style.transform = 'scale(0)';
          fab.style.opacity   = '0';
          fab.style.pointerEvents = 'none';
          fabVisible = false;
        } else if ((!scrollingDown || !scrolledPastHero) && !fabVisible) {
          fab.style.transform = '';
          fab.style.opacity   = '';
          fab.style.pointerEvents = '';
          fabVisible = true;
        }

        lastScrollY   = currentScrollY;
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', handleFabScroll, { passive: true });
}


/* ================================================================
   8. FILTRO DE MENÚ POR CATEGORÍAS
   Al hacer clic en un tab de categoría, marca .is-active en el
   tab y muestra/oculta las tarjetas según data-categoria vs
   data-cat del tab. Un tab "todos" muestra todas las tarjetas.
   Si la categoría no tiene platos, muestra mensaje informativo.
   ================================================================ */
function initMenuFilter() {
  const tabsContainer = document.querySelector('.menu-tabs');
  const dishGrid      = document.querySelector('.menu-grid');
  if (!tabsContainer || !dishGrid) return;

  const tabs  = tabsContainer.querySelectorAll('.menu-tab');
  const cards = dishGrid.querySelectorAll('.card--dish');

  // Mensaje de "sin platos" — se reutiliza
  let emptyMsg = dishGrid.querySelector('.menu-empty-msg');
  if (!emptyMsg) {
    emptyMsg = document.createElement('p');
    emptyMsg.className = 'menu-empty-msg';
    emptyMsg.textContent = 'Pronto más platos en esta categoría.';
    emptyMsg.setAttribute('aria-live', 'polite');
    dishGrid.appendChild(emptyMsg);
  }
  emptyMsg.hidden = true;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Actualizar tabs
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-pressed', 'false');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-pressed', 'true');
      tab.setAttribute('aria-selected', 'true');

      const selectedCat = tab.getAttribute('data-cat');
      let visibleCount = 0;

      cards.forEach((card) => {
        const cardCat = card.getAttribute('data-categoria');
        const show = selectedCat === 'todos' || cardCat === selectedCat;

        if (show) {
          card.hidden = false;
          visibleCount++;
        } else {
          card.hidden = true;
        }
      });

      // Mostrar mensaje si no hay platos visibles
      emptyMsg.hidden = visibleCount > 0;
    });
  });
}


/* ================================================================
   9. RESALTADO DE LINK DE NAV ACTIVO SEGÚN SECCIÓN VISIBLE
   ================================================================ */
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('.header__nav-link');
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks)
    .map((link) => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#') ? href.slice(1) : null;
    })
    .filter(Boolean);

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('is-active'));
          const activeLink = document.querySelector(
            `.header__nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add('is-active');
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}


/* ================================================================
   UTILIDADES INTERNAS
   ================================================================ */

/**
 * Genera la URL de WhatsApp con número y mensaje.
 * @param {string} [msg] - Mensaje personalizado (URL-encoded)
 * @returns {string} URL completa de wa.me
 */
function buildWhatsAppUrl(msg) {
  const message = msg || CONFIG.whatsappMessage;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
}

// Exportar por si se usa como módulo en el futuro
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, buildWhatsAppUrl };
}
