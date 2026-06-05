/**
 * HerVoice - 评论翻译
 * 在每条 Cusdis 留言下方添加「翻译」按钮
 */
(function () {
  'use strict';

  var PROCESSED = 'data-hv-translate-done';
  var CACHE = {};

  function getTargetLang() {
    return window.HV_I18N ? HV_I18N.getLang() : 'en';
  }

  function getTranslateCode(lang) {
    var meta = window.HV_I18N && HV_I18N.LANG_META[lang];
    return meta ? meta.translate : 'en';
  }

  function t(key) {
    return window.HV_I18N ? HV_I18N.t(key) : key;
  }

  function getCusdisRoots() {
    var thread = document.getElementById('cusdis_thread');
    if (!thread) return [];
    var roots = [thread];
    if (thread.shadowRoot) roots.push(thread.shadowRoot);
    return roots;
  }

  /** 查找评论正文节点（兼容 Cusdis 不同版本 DOM） */
  function findCommentBodies(root) {
    var found = [];
    var selectors = [
      '.cusdis-comment-content',
      '.cusdis-comment-body',
      '.markdown',
      '.prose',
      '[class*="comment-content"]',
      '[class*="CommentContent"]'
    ];

    selectors.forEach(function (sel) {
      root.querySelectorAll(sel).forEach(function (el) {
        if (el.closest('[' + PROCESSED + ']') || el.closest('.hv-translate-wrap')) return;
        var text = (el.innerText || '').trim();
        if (text.length > 2) found.push(el);
      });
    });

    /* 兜底：评论区域内的段落 */
    if (!found.length) {
      root.querySelectorAll('p, [class*="comment"], [class*="Comment"]').forEach(function (el) {
        if (el.querySelector('form, input, textarea, button')) return;
        if (el.closest('.hv-translate-wrap')) return;
        var text = (el.innerText || '').trim();
        if (text.length > 8) found.push(el);
      });
    }

    return found;
  }

  function translateText(text, targetLang) {
    var tl = getTranslateCode(targetLang);
    var cacheKey = text + '::' + tl;
    if (CACHE[cacheKey]) return Promise.resolve(CACHE[cacheKey]);

    var url = 'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(text.slice(0, 450)) +
      '&langpair=auto|' + encodeURIComponent(tl);

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var translated = data && data.responseData && data.responseData.translatedText;
        if (!translated || translated === text) throw new Error('empty');
        CACHE[cacheKey] = translated;
        return translated;
      });
  }

  function attachTranslateButton(contentEl) {
    var container = contentEl.closest('.cusdis-comment') || contentEl.parentElement;
    if (!container || container.querySelector('.hv-translate-wrap')) return;

    container.setAttribute(PROCESSED, '1');

    var wrap = document.createElement('div');
    wrap.className = 'hv-translate-wrap';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hv-translate-btn';
    btn.textContent = t('translate.btn');

    var result = document.createElement('div');
    result.className = 'hv-translated-text';
    result.hidden = true;

    var originalText = (contentEl.innerText || '').trim();

    btn.addEventListener('click', function () {
      if (result.hidden === false && !result.classList.contains('is-error')) {
        result.hidden = true;
        btn.textContent = t('translate.btn');
        return;
      }

      btn.disabled = true;
      btn.textContent = t('translate.loading');

      translateText(originalText, getTargetLang())
        .then(function (translated) {
          result.textContent = translated;
          result.hidden = false;
          result.classList.remove('is-error');
          btn.textContent = t('translate.showOriginal');
          btn.disabled = false;
        })
        .catch(function () {
          result.textContent = t('translate.error');
          result.hidden = false;
          result.classList.add('is-error');
          btn.textContent = t('translate.btn');
          btn.disabled = false;
        });
    });

    wrap.appendChild(btn);
    wrap.appendChild(result);

    if (contentEl.nextSibling) {
      contentEl.parentNode.insertBefore(wrap, contentEl.nextSibling);
    } else {
      contentEl.parentNode.appendChild(wrap);
    }
  }

  function scanComments() {
    getCusdisRoots().forEach(function (root) {
      findCommentBodies(root).forEach(attachTranslateButton);
    });
  }

  function initObserver() {
    var thread = document.getElementById('cusdis_thread');
    if (!thread) return;

    scanComments();

    var observer = new MutationObserver(function () {
      scanComments();
    });

    observer.observe(thread, { childList: true, subtree: true });

    if (thread.shadowRoot) {
      observer.observe(thread.shadowRoot, { childList: true, subtree: true });
    }

    /* Cusdis 异步加载，定时补扫 */
    var tries = 0;
    var interval = setInterval(function () {
      scanComments();
      tries += 1;
      if (tries > 30) clearInterval(interval);
    }, 1000);
  }

  function updateButtons() {
    document.querySelectorAll('.hv-translate-btn').forEach(function (btn) {
      if (!btn.disabled) btn.textContent = t('translate.btn');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('cusdis_thread')) {
      initObserver();
    }
  });

  window.addEventListener('hervoice:langchange', function () {
    CACHE = {};
    document.querySelectorAll('.hv-translated-text').forEach(function (el) {
      el.hidden = true;
      el.textContent = '';
    });
    updateButtons();
  });
})();
