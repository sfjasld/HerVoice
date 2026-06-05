/**
 * HerVoice - 全局脚本
 * 功能：导航栏移动端切换、孕悦页支持按钮计数（localStorage）
 */

(function () {
  'use strict';

  /* ---------- 1. 移动端导航菜单 ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // 点击链接后自动收起菜单
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. 高亮当前页面的导航项 ---------- */
  function highlightCurrentNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ---------- 3. 孕悦页：支持按钮 + localStorage 计数 ---------- */
  var STORAGE_KEY = 'hervoice_pregnancy_support';

  function getSupportCounts() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveSupportCounts(counts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch (e) {
      console.warn('无法保存到 localStorage', e);
    }
  }

  function initSupportButtons() {
    var buttons = document.querySelectorAll('[data-support-id]');
    if (!buttons.length) return;

    var counts = getSupportCounts();

    buttons.forEach(function (btn) {
      var id = btn.getAttribute('data-support-id');
      var countEl = document.querySelector('[data-count-for="' + id + '"]');

      // 初始化显示计数
      if (!counts[id]) counts[id] = 0;
      if (countEl) {
        countEl.textContent = counts[id];
      }

      // 如果用户已支持过，显示已支持状态
      var supportedKey = STORAGE_KEY + '_user_' + id;
      if (localStorage.getItem(supportedKey)) {
        btn.classList.add('supported');
        btn.textContent = '已支持 ✓';
        btn.disabled = true;
      }

      btn.addEventListener('click', function () {
        if (btn.disabled) return;

        counts[id] = (counts[id] || 0) + 1;
        saveSupportCounts(counts);

        if (countEl) {
          countEl.textContent = counts[id];
        }

        localStorage.setItem(supportedKey, '1');
        btn.classList.add('supported');
        btn.textContent = '已支持 ✓';
        btn.disabled = true;
      });
    });
  }

  /* ---------- 4. 占位按钮提示（懂·性页） ---------- */
  function initPlaceholderButtons() {
    document.querySelectorAll('[data-placeholder-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        alert('建议提交功能即将开放，敬请期待！');
      });
    });
  }

  /* ---------- 初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    highlightCurrentNav();
    initSupportButtons();
    initPlaceholderButtons();
  });
})();
