const { chromium } = require('playwright');
const SP = process.env.SP || '/tmp';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 900, height: 640 } });
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  p.on('dialog', d => d.accept('Léo'));
  await p.addInitScript(() => { window.TEST_CALM = true; });
  await p.goto('file://' + require('path').resolve(__dirname, '..', 'index.html'));
  console.log('introSeen inicial', await p.evaluate(() => S.introSeen));
  await p.evaluate(() => { askName(); startIntro(); });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: SP + '/story1.png' });
  let shots = 0, choices = 0;
  for (let i = 0; i < 80 && await p.isVisible('#story'); i++) {
    if (await p.isVisible('#st-choices button')) { await p.click('#st-choices button'); choices++; continue; }
    await p.click('#st-text'); await p.click('#st-text').catch(() => {});
    if (i === 12 && !shots++) { await p.waitForTimeout(900); await p.screenshot({ path: SP + '/story2.png' }); }
  }
  const r = await p.evaluate(() => ({ seen: S.introSeen, name: S.playerName, style: S.introStyle }));
  console.log(r, 'escolhas', choices);
  await p.evaluate(() => { window.TEST_STORY = true; S.followers = 1500; Hooks.run('daily'); });
  await p.waitForTimeout(1500);
  console.log('cena extra', await p.isVisible('#story'));
  await p.screenshot({ path: SP + '/story3.png' });
  console.log('errors', errors);
  await b.close();
})();
