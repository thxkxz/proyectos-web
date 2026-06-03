/**
 * ================================================================
 * PLANTILLA LANDING PAGE — main.js
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
   ================================================================
   Cambia estos valores por los del cliente.
   El script actualizará automáticamente todos los links de WhatsApp
   y el año del copyright en el footer.
   ================================================================ */
const CONFIG = {
  /**
   * Número de WhatsApp SIN el signo +, en formato internacional.
   * México: 521 + 10 dígitos (ej: 5215512345678)
   * Argentina: 549 + código de área + número (ej: 5491112345678)
   * Colombia: 57 + número (ej: 573001234567)
   */
  whatsappNumber: '521XXXXXXXXXX',         // REEMPLAZAR: número real del cliente

  /**
   * Mensaje predeterminado al abrir WhatsApp (URL-encoded).
   * Puedes probarlo en: https://www.urlencoder.org/
   */
  whatsappMessage: 'Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n',

  /**
   * Año del copyright en el footer (normalmente el año actual).
   * Puedes dejarlo en 'auto' para que use el año del sistema.
   */
  copyrightYear: 'auto',
};


/* ================================================================
   INICIALIZACIÓN
   Espera a que el DOM esté listo antes de ejecutar cualquier cosa.
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initCopyrightYear();
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initFabEntrance();
});


/* ================================================================
   1. ACTUALIZAR LINKS DE WHATSAPP
   Busca todos los elementos con ID que contienen "whatsapp-link"
   y actualiza su href con el número y mensaje configurados.
   ================================================================ */
function initWhatsAppLinks() {
  const waBase = `https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`;

  // Selectores de todos los links de WhatsApp en la página
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
    if (el) {
      // Conserva el mensaje específico si ya tiene uno propio
      // (solo actualiza el número)
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
   Añade la clase .header--scrolled cuando el scroll supera 40px,
   lo que activa la sombra definida en CSS.
   ================================================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  // Usamos requestAnimationFrame para no sobrecargar el scroll
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

  // Comprobar estado inicial (por si recarga con scroll)
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

  // Abrir / cerrar al clic en el botón hamburguesa
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

  // Cerrar al presionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus(); // Devuelve el foco al botón
    }
  });

  // Cerrar si se hace clic fuera del menú
  document.addEventListener('click', (e) => {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      setMenuState(false);
    }
  });

  /**
   * Cambia el estado del menú.
   * @param {boolean} open - true para abrir, false para cerrar
   */
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
   Intercepta los clicks en links internos (#ancla) y hace
   scroll suave, respetando la altura del header sticky.
   ================================================================ */
function initSmoothScroll() {
  // Solo aplicar si el navegador NO soporta scroll-behavior nativo
  // (prácticamente todos los modernos sí lo soportan, pero por compatibilidad)

  document.addEventListener('click', (e) => {
    // Buscar el <a> más cercano al elemento clickeado
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // Calcular el offset del header sticky
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    // Respetar preferencia de movimiento reducido
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });

    // Actualizar el foco para accesibilidad (screen readers)
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
   Anima elementos con la clase .reveal cuando entran al viewport.
   NO aplica a elementos above-the-fold (hero).
   ================================================================ */
function initScrollReveal() {
  // Si el navegador no soporta IntersectionObserver, mostrar todo
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Respetar preferencia de movimiento reducido
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,       // viewport
    rootMargin: '0px 0px -60px 0px', // activar un poco antes del borde inferior
    threshold: 0.1,   // 10% visible es suficiente para activar
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Dejar de observar una vez visible (no reanimar al volver a scroll)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos los elementos con clase .reveal
  // EXCLUIR los que estén en el hero (above-the-fold)
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => {
    observer.observe(el);
  });
}


/* ================================================================
   7. FAB WHATSAPP — LÓGICA ADICIONAL
   El FAB se oculta temporalmente cuando el usuario hace scroll
   hacia arriba muy rápido (UX opcional, puedes eliminar esto).
   También asegura la animación de entrada.
   ================================================================ */
function initFabEntrance() {
  const fab = document.getElementById('fab-whatsapp-link');
  if (!fab) return;

  // La animación de entrada ya está en CSS con @keyframes fab-enter.
  // Aquí solo añadimos el comportamiento de ocultamiento al hacer scroll.

  let lastScrollY   = window.scrollY;
  let fabVisible    = true;
  let scrollTicking = false;

  function handleFabScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollingDown  = currentScrollY > lastScrollY;
        const scrolledPastHero = currentScrollY > 200;

        // Ocultar FAB al hacer scroll rápido hacia abajo (solo en móvil)
        // y mostrarlo en desktop siempre
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
   UTILIDADES INTERNAS
   ================================================================ */

/**
 * Genera la URL de WhatsApp con número y mensaje.
 * Útil si necesitas crear links de WA dinámicamente desde JS.
 *
 * @param {string} [msg] - Mensaje personalizado (URL-encoded)
 * @returns {string} URL completa de wa.me
 */
function buildWhatsAppUrl(msg) {
  const message = msg || CONFIG.whatsappMessage;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
}

// Exportar por si se usa como módulo en el futuro
// (No afecta el comportamiento en script tag normal)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, buildWhatsAppUrl };
}
