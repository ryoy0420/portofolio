// quill-writing.js - 羽ペンで高速にテキストを書くアニメーション

document.addEventListener('DOMContentLoaded', function() {
    // テキスト内容と要素の定義
    const textLines = [
      { elem: document.getElementById('line1'), text: '伝わらない悩みを、', delay: 300 },
      { elem: document.getElementById('line2'), text: '響く言葉に変える。', delay: 1000 },
      { elem: document.getElementById('line3'), text: '専門性と創造性で', delay: 1700 },
      { elem: document.getElementById('line4'), text: 'あなたのビジョンを読者の体験へ。', delay: 2300 }
    ];
    
    // CTAボタン
    const ctaButton = document.querySelector('.hero-cta');
    
    // 羽ペン要素
    const quillContainer = document.querySelector('.quill-container');
    
    // エレガントな筆記音（オプション）
    const writeSound = new Audio();
    writeSound.src = 'https://assets.codepen.io/127738/fountain_pen.mp3'; // 筆記音
    writeSound.volume = 0.2;
    writeSound.loop = true;
    
    // アニメーション開始
    setTimeout(startAnimation, 300);
    
    // アニメーション開始関数
    function startAnimation() {
      quillContainer.style.opacity = '1';
      animateSequentially(0);
    }
    
    // テキストを順番にアニメーション
    function animateSequentially(index) {
      if (index >= textLines.length) {
        // すべてのテキストアニメーション完了後、CTAボタンを表示
        setTimeout(() => {
          writeSound.pause();
          ctaButton.style.opacity = '1';
          ctaButton.style.transition = 'opacity 0.8s ease';
        }, 500);
        return;
      }
      
      const lineObj = textLines[index];
      const elem = lineObj.elem;
      
      // テキストを空にして一文字ずつ追加
      elem.textContent = '';
      
      // 羽ペンの初期位置を設定
      const elemRect = elem.getBoundingClientRect();
      const contentRect = document.querySelector('.hero-content').getBoundingClientRect();
      
      quillContainer.style.top = (elemRect.top - contentRect.top - 10) + 'px';
      quillContainer.style.left = (elemRect.left - contentRect.left - 30) + 'px'; // 少し左から始める
      
      // 音を再生（ブラウザの自動再生制限に注意）
      try {
        writeSound.currentTime = 0;
        writeSound.play().catch(e => console.log('Auto-play prevented:', e));
      } catch (err) {
        console.log('Sound play error:', err);
      }
      
      // 各文字を追加するアニメーション
      let charIndex = 0;
      const text = lineObj.text;
      let lastTimestamp = null;
      
      // 下線アニメーション準備
      if (elem.querySelector('.underline')) {
        elem.removeChild(elem.querySelector('.underline'));
      }
      
      // アニメーションの実行
      function animateText(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        
        // より高速な文字表示（15〜25msのランダムな間隔）
        if (elapsed > (Math.random() * 10 + 15)) {
          lastTimestamp = timestamp;
          
          if (charIndex < text.length) {
            // 文字を追加
            elem.textContent += text[charIndex];
            
            // 羽ペンの位置を更新
            const totalWidth = elem.getBoundingClientRect().width;
            const progress = (charIndex + 1) / text.length;
            const newLeft = elemRect.left - contentRect.left + totalWidth * progress - 25;
            quillContainer.style.left = newLeft + 'px';
            
            // エレガントな筆記動作のランダム動き
            const randomY = Math.sin(charIndex * 0.5) * 2;
            const randomRotation = (Math.random() - 0.5) * 5;
            quillContainer.style.transform = `translateY(${randomY}px) rotate(${30 + randomRotation}deg)`;
            
            // インクのしぶきエフェクト（10%の確率）
            if (Math.random() < 0.1) {
              createInkSplash(newLeft, elemRect.top - contentRect.top);
            }
            
            // 下線アニメーション進行
            elem.style.setProperty('--underline-width', `${progress * 100}%`);
            if (elem.querySelector('.underline')) {
              elem.querySelector('.underline').style.width = `${progress * 100}%`;
            }
            
            charIndex++;
            requestAnimationFrame(animateText);
          } else {
            // 下線エフェクト
            elem.style.setProperty('--underline-width', '100%');
            elem.querySelector('::after').style.width = '100%';
            
            // 次のテキストへ
            setTimeout(() => {
              animateSequentially(index + 1);
            }, 200); // 次の行への移行を早める
          }
        } else {
          requestAnimationFrame(animateText);
        }
      }
      
      // アニメーション開始
      setTimeout(() => {
        requestAnimationFrame(animateText);
        
        // 下線アニメーション開始
        elem.style.setProperty('--underline-width', '0%');
        const underline = document.createElement('div');
        underline.className = 'underline';
        elem.appendChild(underline);
        
        // 完了時に下線を表示
        setTimeout(() => {
          elem.querySelector('::after').style.width = '100%';
        }, text.length * 20 + 300);
      }, lineObj.delay);
    }
    
    // インクのしぶきエフェクト
    function createInkSplash(x, y) {
      const splash = document.createElement('div');
      splash.className = 'ink-trail';
      splash.style.left = `${x}px`;
      splash.style.top = `${y + 20}px`;
      splash.style.width = `${Math.random() * 3 + 2}px`;
      splash.style.height = `${Math.random() * 3 + 2}px`;
      
      document.querySelector('.text-container').appendChild(splash);
      
      // アニメーション終了後に削除
      setTimeout(() => {
        if (splash.parentNode) {
          splash.parentNode.removeChild(splash);
        }
      }, 500);
    }
  });