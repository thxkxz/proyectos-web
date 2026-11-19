/**
 * ================================================================
 * WAKAVA CAFÉ RESTOBAR — main.js
 * JavaScript vanilla, sin dependencias externas.
 * Turbaco, Bolívar, Colombia
 * ================================================================
 */

'use strict';

/* ================================================================
   CONFIGURACIÓN DEL NEGOCIO
   ================================================================ */
const CONFIG = {
  /**
   * Número de WhatsApp SIN el signo +, en formato internacional.
   * Colombia: 57 + número (ej: 573006967608)
   */
  whatsappNumber: '573182239183',

  /**
   * Mensaje predeterminado al abrir WhatsApp (URL-encoded).
   */
  whatsappMessage: 'Hola%20Wakava%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n',

  /**
   * Año del copyright. 'auto' usa el año del sistema.
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
   ================================================================ */
function initWhatsAppLinks() {
  const waBase = `https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`;

  // IDs de todos los links de WhatsApp en la página
  const waLinkIds = [
    'header-whatsapp-link',
    'mobile-whatsapp-link',
    'hero-whatsapp-link',
    'carta-whatsapp-link',    // antes: servicios-whatsapp-link
    'footer-whatsapp-link',
    'fab-whatsapp-link',
  ];

  waLinkIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      // Conservar mensaje específico si ya tiene uno propio
      const existingHref = el.getAttribute('href') || '';
      const existingMsg = existingHref.includes('?text=')
        ? existingHref.split('?text=')[1]
        : CONFIG.whatsappMessage;

      el.setAttribute(
        'href',
        `https://wa.me/${CONFIG.whatsappNumber}?text=${existingMsg}`
      );
    }
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
   Añade .header--scrolled cuando scrollY > 60px (vidrio esmerilado
   con tinte roast, definido en CSS §5.1 DESIGN.md).
   ================================================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 60) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  onScroll(); // Estado inicial
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

  // Cerrar al hacer clic en un link del menú móvil
  const menuLinks = menu.querySelectorAll('.mobile-menu__link');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });

  // Cerrar al clic fuera
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
      // Bloquear scroll del body mientras el menú esté abierto
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-label', 'Abrir menú');
      document.body.style.overflow = '';
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

    // Accesibilidad: mover el foco al destino
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
   7. FAB WHATSAPP — COMPORTAMIENTO DE VISIBILIDAD EN SCROLL
   El FAB se oculta al hacer scroll rápido hacia abajo en móvil,
   y reaparece al ir hacia arriba o llegar cerca del footer.
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
   8. FILTRO DE MENÚ POR CATEGORÍA (tabs)
   Muestra/oculta tarjetas según el tab activo.
   Maneja estado aria-selected y clase .is-active en tabs.
   Muestra mensaje de estado vacío si la categoría no tiene platos.
   ================================================================ */
function initMenuFilter() {
  const tabs    = document.querySelectorAll('.menu-tab');
  const cards   = document.querySelectorAll('.card--dish[data-categoria]');
  const emptyMsg = document.getElementById('menu-empty');

  if (!tabs.length || !cards.length) return;

  /**
   * Aplica el filtro para la categoría dada.
   * @param {string} cat - Valor del data-cat del tab activo
   */
  function filterByCategory(cat) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCat = card.getAttribute('data-categoria');
      if (cardCat === cat) {
        card.style.display = '';
        // Reanimar la entrada si el elemento ya estaba visible
        card.classList.remove('is-visible');
        // Pequeño timeout para que el IntersectionObserver no lo ignore
        setTimeout(() => {
          card.classList.add('is-visible');
        }, 30);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Mostrar u ocultar el mensaje de categoría vacía
    if (emptyMsg) {
      if (visibleCount === 0) {
        emptyMsg.style.display = 'block';
        emptyMsg.classList.add('is-visible');
      } else {
        emptyMsg.style.display = 'none';
        emptyMsg.classList.remove('is-visible');
      }
    }
  }

  // Activar el tab inicial (el que tiene .is-active al cargar)
  const initialTab = document.querySelector('.menu-tab.is-active');
  if (initialTab) {
    filterByCategory(initialTab.getAttribute('data-cat'));
  }

  // Escuchar clicks en los tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Quitar estado activo de todos los tabs
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      // Activar el tab clickeado
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      // Aplicar filtro
      filterByCategory(tab.getAttribute('data-cat'));
    });

    // Navegación con teclado (flechas izquierda/derecha entre tabs)
    tab.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(tab);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextTab = tabArray[(currentIndex + 1) % tabArray.length];
        nextTab.focus();
        nextTab.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevTab = tabArray[(currentIndex - 1 + tabArray.length) % tabArray.length];
        prevTab.focus();
        prevTab.click();
      }
    });
  });
}


/* ================================================================
   9. RESALTADO ACTIVO DE NAV (IntersectionObserver)
   Resalta el enlace de nav correspondiente a la sección visible.
   ================================================================ */
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('.header__nav-link');
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks)
    .map((link) => link.getAttribute('href'))
    .filter((href) => href && href.startsWith('#'))
    .map((href) => href.slice(1));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, observerOptions);

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
