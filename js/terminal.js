// =========================================================
// Animation du terminal hero — effet de frappe
// =========================================================

const sequence = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'leo_carboni — étudiant en informatique' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'BTS SIO · front & back · toujours curieux' },
  { type: 'cmd', text: 'cat contact.md' },
  { type: 'out', text: 'leocarboni76@gmail.com ·  github.com/leoc76' },
];

const lineWrap = document.querySelector('#terminal-lines');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(container, text, speed = 38) {
  for (let i = 0; i < text.length; i++) {
    container.textContent += text[i];
    await sleep(speed);
  }
}

async function runTerminal() {
  if (!lineWrap) return;

  for (const step of sequence) {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (step.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = 'leo@portfolio:~$';
      const cmd = document.createElement('span');
      cmd.className = 'terminal-cmd';
      line.appendChild(prompt);
      line.appendChild(cmd);
      lineWrap.appendChild(line);
      await typeLine(cmd, step.text);
      await sleep(280);
    } else {
      const out = document.createElement('span');
      out.className = 'terminal-out';
      out.innerHTML = step.text;
      line.appendChild(out);
      line.style.paddingLeft = '0';
      lineWrap.appendChild(line);
      await sleep(420);
    }
  }

  // Ligne finale avec curseur clignotant
  const finalLine = document.createElement('div');
  finalLine.className = 'terminal-line';
  const prompt = document.createElement('span');
  prompt.className = 'terminal-prompt';
  prompt.textContent = 'leo@portfolio:~$';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  finalLine.appendChild(prompt);
  finalLine.appendChild(cursor);
  lineWrap.appendChild(finalLine);
}

document.addEventListener('DOMContentLoaded', () => {
  if (lineWrap) runTerminal();
});
