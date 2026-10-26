/* AJ the Wetland Bae — shared website script
   Supports the homepage and videos.html. Preserves slideshow filters.
   Vimeo PUBLIC and UNLISTED links are supported, including privacy hashes. */
'use strict';
const $ = sel => document.querySelector(sel);
const make = (tag, cls, content) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (content !== undefined) el.textContent = content;
  return el;
};
const safeUrl = url => {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const u = new URL(url, window.location.href);
    return ['https:', 'http:', 'mailto:'].includes(u.protocol) || u.origin === location.origin;
  } catch { return false; }
};
const setLink = (selector, url) => {
  const el = $(selector);
  if (!el || !safeUrl(url)) return false;
  el.href = url;
  el.removeAttribute('aria-disabled');
  el.classList.remove('disabled-link');
  el.target = /^https?:/i.test(url) ? '_blank' : '_self';
  if (el.target === '_blank') el.rel = 'noopener noreferrer';
  return true;
};
const addImage = (el, path, alt) => {
  if (!path) return;
  el.style.backgroundImage = `url(${JSON.stringify(path)})`;
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', alt || 'Photograph');
  el.textContent = '';
};

// Vimeo's Unlisted URLs may be either
//   https://vimeo.com/123456789/abcdef1234
//   https://player.vimeo.com/video/123456789?h=abcdef1234
// Omitting the hash causes the player to fail.
function videoEmbed(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  let url = value.trim();
  // Accept the src of a copied <iframe ...> without injecting arbitrary HTML.
  if (url.startsWith('<')) {
    const match = url.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!match) return null;
    url = match[1].replace(/&amp;/g, '&');
  }
  if (!safeUrl(url)) return null;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    const host = u.hostname.toLowerCase();
    const parts = u.pathname.split('/').filter(Boolean);
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'youtu.be'].includes(host)) {
      let id = '';
      if (host === 'youtu.be') id = parts[0] || '';
      else if (u.pathname === '/watch') id = u.searchParams.get('v') || '';
      else if (['shorts', 'embed', 'live'].includes(parts[0])) id = parts[1] || '';
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(host)) {
      const idIndex = parts.findIndex(s => /^\d+$/.test(s));
      if (idIndex === -1) return null;
      const id = parts[idIndex];
      let hash = u.searchParams.get('h') || '';
      // Unlisted vimeo.com links append /privacyhash after /videoID.
      if (!hash && parts[idIndex + 1] && /^[a-zA-Z0-9]+$/.test(parts[idIndex + 1])) {
        hash = parts[idIndex + 1];
      }
      return `https://player.vimeo.com/video/${id}${hash ? '?h=' + encodeURIComponent(hash) : ''}`;
    }
    return null;
  } catch { return null; }
}

function init() {
  const c = typeof SITE_CONTENT !== 'undefined' ? SITE_CONTENT : null;
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  const nav = $('#nav'), menu = $('.menu-button');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }
  if (!c) {
    console.error('SITE_CONTENT is missing. Check that content.js has no syntax errors and is loaded before script.js.');
    const vids = $('#video-grid');
    if (vids) vids.textContent = 'The video library could not load. Please check content.js.';
    return;
  }

  if (c.portrait) {
    const p = $('#portrait');
    if (p) {
      p.style.backgroundImage = `url(${JSON.stringify(c.portrait)})`;
      p.querySelectorAll('*').forEach(n => n.remove());
      p.setAttribute('role', 'img');
      p.setAttribute('aria-label', 'Portrait of Alexis Jackson');
    }
  }
  if (c.cv && setLink('#cv-link', c.cv)) {
    const link = $('#cv-link'), note = $('#cv-note');
    if (link) link.textContent = 'View my CV ↗';
    if (note) note.textContent = 'Public-facing CV';
  }
  setLink('#paper-link', c.paper);
  setLink('#data-link', c.dataset);

  // PRESERVE THE PHOTO SLIDESHOW AND ITS CATEGORY FILTERS.
  const galleryContainer = $('#gallery');
  if (galleryContainer && Array.isArray(c.gallery)) {
    let currentFilter = 'all';
    let currentIndex = 0;
    const filterButtons = Array.from(document.querySelectorAll('.filter'));
    function renderSlideshow() {
      galleryContainer.replaceChildren();
      const filtered = c.gallery.filter(item => currentFilter === 'all' || item.category === currentFilter);
      if (!filtered.length) { galleryContainer.textContent = 'No photos in this category yet.'; return; }
      currentIndex %= filtered.length;
      const wrapper = make('div', 'slideshow-container');
      filtered.forEach((item, i) => {
        const slide = make('div', 'slideshow-slide' + (i === currentIndex ? ' active' : ''));
        const photo = make('div', 'slideshow-photo');
        if (item.image) addImage(photo, item.image, item.alt || item.heading);
        const content = make('div', 'slideshow-content');
        content.append(make('small', 'eyebrow', item.category.toUpperCase()),
                       make('h3', '', item.heading), make('p', '', item.caption));
        slide.append(photo, content);
        wrapper.append(slide);
      });
      const controls = make('div', 'slideshow-controls');
      const buttons = make('div', 'slideshow-btns');
      const prev = make('button', 'slide-btn', '← Previous');
      const next = make('button', 'slide-btn', 'Next →');
      prev.type = 'button'; next.type = 'button';
      prev.addEventListener('click', () => { currentIndex = (currentIndex - 1 + filtered.length) % filtered.length; renderSlideshow(); });
      next.addEventListener('click', () => { currentIndex = (currentIndex + 1) % filtered.length; renderSlideshow(); });
      buttons.append(prev, next);
      controls.append(buttons, make('span', 'slide-counter', `PHOTO ${currentIndex + 1} OF ${filtered.length}`));
      wrapper.append(controls);
      galleryContainer.append(wrapper);
    }
    filterButtons.forEach(b => b.addEventListener('click', () => {
      filterButtons.forEach(k => {
        k.classList.toggle('active', k === b);
        k.setAttribute('aria-pressed', String(k === b));
      });
      currentFilter = b.dataset.filter;
      currentIndex = 0;
      renderSlideshow();
    }));
    renderSlideshow();
  }

  // THE SAME VIDEO ENTRIES RENDER ON HOMEPAGE AND videos.html.
  const vids = $('#video-grid');
  if (vids) {
    vids.replaceChildren();
    const allVideos = Array.isArray(c.videos) ? c.videos : [];
    // Set data-video-limit="2" on homepage to show a preview only.
    const limit = parseInt(vids.dataset.videoLimit, 10);
    const showing = Number.isInteger(limit) && limit > 0 ? allVideos.slice(0, limit) : allVideos;
    if (!showing.length) vids.textContent = 'Videos will be added soon.';
    showing.forEach(v => {
      const card = make('article', 'video-card');
      const thumb = make('div', 'video-thumb');
      const embed = videoEmbed(v.video);
      if (embed) {
        const iframe = make('iframe');
        iframe.src = embed;
        iframe.title = v.heading || 'Wetland Wisdom video';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        thumb.append(iframe);
      } else {
        thumb.append(make('span', '', v.video ? 'VIDEO LINK NEEDS CHECKING' : 'VIDEO COMING SOON'));
        if (v.video) console.warn('Unrecognized video URL for', v.heading, v.video);
      }
      const body = make('div', 'video-body');
      body.append(make('small', '', v.label || ''), make('h3', '', v.heading || 'Video'),
                  make('p', '', v.description || ''));
      if (v.video && safeUrl(v.video) && embed) {
        const watch = make('a', 'video-watch-link', 'Watch on video host ↗');
        watch.href = v.video;
        watch.target = '_blank';
        watch.rel = 'noopener noreferrer';
        body.append(watch);
      }
      card.append(thumb, body);
      vids.append(card);
    });
  }

  const media = $('#media-list');
  if (media && Array.isArray(c.media)) {
    c.media.forEach((m, i) => {
      const row = make('article', 'media-row');
      row.append(make('span', 'index', String(i + 1).padStart(2, '0')));
      const middle = make('div');
      middle.append(make('h3', '', m.title), make('p', '', m.detail));
      row.append(middle);
      if (m.url && safeUrl(m.url)) {
        const a = make('a', '', 'Read / watch ↗');
        a.href = m.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        row.append(a);
      } else {
        row.append(make('span', 'pending', (m.detail || '').toLowerCase().includes('future') ? 'PLANNED' : 'LINK TO BE ADDED'));
      }
      media.append(row);
    });
  }
  const contacts = $('#contact-links');
  if (contacts) {
    [['LinkedIn', c.linkedin], ['Instagram', c.instagram], ['GitHub', c.github],
     ['Email', c.email ? 'mailto:' + c.email : '']].forEach(([name, url]) => {
      if (!url || !safeUrl(url)) return;
      const a = make('a', '', name + ' ↗');
      a.href = url;
      if (url.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      contacts.append(a);
    });
  }
}
document.addEventListener('DOMContentLoaded', init);
