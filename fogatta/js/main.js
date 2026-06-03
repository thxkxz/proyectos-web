/**
 * ================================================================
 * LA FOGATTA RESTAURANTE — main.js
 * JavaScript vanilla, sin dependencias externas.
 * Turbaco, Bolivar, Colombia
 * Arquitectura basada en Wakava main.js con initParallax() adicional.
 * ================================================================
 */

'use strict';

/* ================================================================
   CONFIGURACION DEL NEGOCIO
   ================================================================ */
const CONFIG = {
  /**
   * Numero de WhatsApp SIN el signo +, en formato internacional.
   * Colombia: 57 + numero local sin el 0 inicial.
   */
  whatsappNumber: '573016490272',

  /**
   * Mensaje predeterminado al abrir WhatsApp (URL-encoded).
   */
  whatsappMessage: 'Hola%20La%20Fogatta%2C%20quiero%20hacer%20un%20pedido',

  /**
   * Anio del copyright. 'auto' usa el anio del sistema.
   */
  copyrightYear: 'auto',
};


/* ================================================================
   INICIALIZACION
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
  initParallax();
});


/* ================================================================
   1. ACTUALIZAR LINKS DE WHATSAPP
   Recorre todos los IDs del contrato y actualiza el href.
   Si el elemento ya tiene un mensaje personalizado en ?text=,
   lo conserva y solo actualiza el numero.
   ================================================================ */
function initWhatsAppLinks() {
  const waLinkIds = [
    'header-whatsapp-link',
    'mobile-whatsapp-link',
    'hero-whatsapp-link',
    'carta-whatsapp-link',
    'footer-whatsapp-link',
    'fab-whatsapp-link',
  ];

  waLinkIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const existingHref  = el.getAttribute('href') || '';
    const existingMsg   = existingHref.includes('?text=')
      ? existingHref.split('?text=')[1]
      : CONFIG.whatsappMessage;

    el.setAttribute(
      'href',
      `https://wa.me/${CONFIG.whatsappNumber}?text=${existingMsg}`
    );
  });
}


/* ================================================================
   2. ANIO DE COPYRIGHT DINAMICO
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
   Aniade .header--scrolled cuando scrollY > 60px.
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

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* ================================================================
   4. MENU MOVIL (hamburguesa)
   ================================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu   = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Cerrar al hacer clic en un link del menu movil
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

  // Cerrar al clic fuera del menu
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
      toggle.setAttribute('aria-label', 'Cerrar menu');
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-label', 'Abrir menu');
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

    const header       = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop    = target.getBoundingClientRect().top + window.scrollY - headerHeight;

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
   Clase .reveal — estado inicial en CSS: opacity 0, translateY(28px).
   Al intersectar se aniade .is-visible.
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
    root:       null,
    rootMargin: '0px 0px -60px 0px',
    threshold:  0.1,
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
   7. FAB WHATSAPP — VISIBILIDAD EN SCROLL
   En movil (< 1024px): se oculta al bajar rapido, reaparece al subir.
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
        const currentScrollY  = window.scrollY;
        const scrollingDown   = currentScrollY > lastScrollY;
        const scrolledPastHero = currentScrollY > 200;
        const isMobile        = window.innerWidth < 1024;

        if (isMobile && scrollingDown && scrolledPastHero && fabVisible) {
          fab.style.transform    = 'scale(0)';
          fab.style.opacity      = '0';
          fab.style.pointerEvents = 'none';
          fabVisible = false;
        } else if ((!scrollingDown || !scrolledPastHero) && !fabVisible) {
          fab.style.transform    = '';
          fab.style.opacity      = '';
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
   8. FILTRO DE MENU POR CATEGORIA (tabs)
   Muestra/oculta .card--dish segun data-categoria vs data-cat del tab.
   Maneja aria-selected y clase .is-active.
   ================================================================ */
function initMenuFilter() {
  const tabs    = document.querySelectorAll('.menu-tab');
  const cards   = document.querySelectorAll('.card--dish[data-categoria]');
  const emptyMsg = document.getElementById('menu-empty');

  if (!tabs.length || !cards.length) return;

  /**
   * Aplica el filtro para la categoria dada.
   * @param {string} cat - Valor del data-cat del tab activo
   */
  function filterByCategory(cat) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCat = card.getAttribute('data-categoria');
      if (cardCat === cat) {
        card.style.display = '';
        // Reanimar la entrada
        card.classList.remove('is-visible');
        setTimeout(() => {
          card.classList.add('is-visible');
        }, 30);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

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

  // Activar el tab inicial
  const initialTab = document.querySelector('.menu-tab.is-active');
  if (initialTab) {
    filterByCategory(initialTab.getAttribute('data-cat'));
  }

  // Escuchar clicks en los tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      filterByCategory(tab.getAttribute('data-cat'));
    });

    // Navegacion con teclado (flechas izquierda/derecha)
    tab.addEventListener('keydown', (e) => {
      const tabArray    = Array.from(tabs);
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
   Resalta el .header__nav-link correspondiente a la seccion visible.
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
    root:       null,
    rootMargin: '-20% 0px -70% 0px',
    threshold:  0,
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
   10. PARALLAX DEL HERO (nuevo en Fogatta — no en Wakava)
   Fondo se desplaza al 40% de la velocidad del scroll.
   Contenido al 20%. Desactivado con prefers-reduced-motion.
   ================================================================ */
function initParallax() {
  const heroBg      = document.querySelector('.hero__bg');
  const heroContent = document.querySelector('.hero__content');
  if (!heroBg) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    });
  }, { passive: true });
}


/* ================================================================
   UTILIDADES INTERNAS
   ================================================================ */

/**
 * Genera la URL de WhatsApp con numero y mensaje.
 * @param {string} [msg] - Mensaje personalizado (URL-encoded)
 * @returns {string} URL completa de wa.me
 */
function buildWhatsAppUrl(msg) {
  const message = msg || CONFIG.whatsappMessage;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
}

// Exportar por si se usa como modulo en el futuro
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, buildWhatsAppUrl };
}
