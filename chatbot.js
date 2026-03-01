/**
 * AI Restart Club - チャットボット UI
 * Dify iframe を使用したフローティングチャットウィジェット
 */

(function () {
  'use strict';

  // =========================================
  // 設定
  // =========================================
  const CONFIG = {
    // Difyアプリの埋め込みURL（後から差し替え）
    difyUrl: 'https://dify.airestartlab.site/chat/ULWgYJKCOp6acqJm', // 例: 'https://udify.app/chatbot/xxxxxxxxxx'
    // UI設定
    title: 'AI Restart Club',
    subtitle: 'AIに関するご質問にお答えします',
    triggerText: 'AIに質問する',
    welcomeMessage: 'こんにちは！AI Restart Clubへようこそ。\nAIの活用やコースについて、お気軽にご質問ください。',
    // 初期質問の選択肢
    quickQuestions: [
      'AI Restart Clubについて知りたい',
      'コースの内容を教えてください',
      '無料相談はどうすればいいですか？',
      'AIを仕事に活かす方法を知りたい'
    ]
  };

  // =========================================
  // チャットボットHTML生成
  // =========================================
  function createChatbotHTML() {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.innerHTML = `
      <!-- トリガーボタン -->
      <button id="chatbot-trigger" class="chatbot-trigger" aria-label="チャットボットを開く">
        <span class="chatbot-trigger-icon">
          <i class="fas fa-comments"></i>
        </span>
        <span class="chatbot-trigger-text">${CONFIG.triggerText}</span>
      </button>

      <!-- チャットウィンドウ -->
      <div id="chatbot-window" class="chatbot-window">
        <!-- ヘッダー -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="chatbot-header-text">
              <div class="chatbot-title">${CONFIG.title}</div>
              <div class="chatbot-subtitle">${CONFIG.subtitle}</div>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button id="chatbot-minimize" class="chatbot-header-btn" aria-label="最小化">
              <i class="fas fa-minus"></i>
            </button>
            <button id="chatbot-close" class="chatbot-header-btn" aria-label="閉じる">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- チャットエリア -->
        <div id="chatbot-body" class="chatbot-body">
          <!-- Dify未接続時のウェルカム画面 -->
          <div id="chatbot-welcome" class="chatbot-welcome">
            <div class="chatbot-message bot">
              <div class="chatbot-message-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="chatbot-message-bubble">
                ${CONFIG.welcomeMessage.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="chatbot-quick-questions">
              ${CONFIG.quickQuestions.map(q => `
                <button class="chatbot-quick-btn" data-question="${q}">
                  <i class="fas fa-circle" style="font-size: 0.5rem; color: var(--accent);"></i>
                  ${q}
                </button>
              `).join('')}
            </div>
          </div>
          <!-- Dify iframe（接続時に表示） -->
          <div id="chatbot-iframe-wrapper" class="chatbot-iframe-wrapper" style="display:none;">
            <iframe id="chatbot-iframe" class="chatbot-iframe" allow="microphone"></iframe>
          </div>
        </div>

        <!-- フッター -->
        <div class="chatbot-footer">
          <span>Powered by <strong>Dify</strong> × AI Restart Club</span>
        </div>
      </div>
    `;
    document.body.appendChild(chatbotContainer);
  }

  // =========================================
  // イベントリスナー設定
  // =========================================
  function setupEventListeners() {
    const trigger = document.getElementById('chatbot-trigger');
    const window_ = document.getElementById('chatbot-window');
    const minimizeBtn = document.getElementById('chatbot-minimize');
    const closeBtn = document.getElementById('chatbot-close');
    const iframe = document.getElementById('chatbot-iframe');
    const welcome = document.getElementById('chatbot-welcome');
    const iframeWrapper = document.getElementById('chatbot-iframe-wrapper');

    // トリガーボタンクリック → ウィンドウ開く
    trigger.addEventListener('click', () => {
      window_.classList.add('active');
      trigger.classList.add('hidden');

      // Dify URLが設定済みの場合、iframeをロード
      if (CONFIG.difyUrl && !iframe.src) {
        iframe.src = CONFIG.difyUrl;
        iframeWrapper.style.display = 'block';
        welcome.style.display = 'none';
      }
    });

    // 最小化ボタン
    minimizeBtn.addEventListener('click', () => {
      window_.classList.remove('active');
      trigger.classList.remove('hidden');
    });

    // 閉じるボタン
    closeBtn.addEventListener('click', () => {
      window_.classList.remove('active');
      trigger.classList.remove('hidden');
    });

    // クイック質問ボタン
    const quickBtns = document.querySelectorAll('.chatbot-quick-btn');
    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        // Dify URLが設定済みの場合、iframeに切り替え
        if (CONFIG.difyUrl) {
          iframe.src = CONFIG.difyUrl;
          iframeWrapper.style.display = 'block';
          welcome.style.display = 'none';
        } else {
          // Dify未接続時はCTAセクションへ誘導
          window_.classList.remove('active');
          trigger.classList.remove('hidden');
          const ctaSection = document.querySelector('#cta') || document.querySelector('.cta-card');
          if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            window.location.href = 'index.html#cta';
          }
        }
      });
    });
  }

  // =========================================
  // 初期化
  // =========================================
  function init() {
    // Font Awesomeが読み込まれているか確認
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        createChatbotHTML();
        setupEventListeners();
      });
    } else {
      createChatbotHTML();
      setupEventListeners();
    }
  }

  init();
})();
