// Helpers for Gurmukhi script: convert to Devanagari (for Hindi voices) and to simple romanized text.

const TIPPI = 'ੰ';
const ADDAK = 'ੱ';
const BINDI = 'ਂ';
const HALANT = '੍';
const NUKTA = '਼';

const isGurmukhiConsonant = (c: string) => {
  const n = c.charCodeAt(0);
  return (n >= 0x0a15 && n <= 0x0a39) || (n >= 0x0a59 && n <= 0x0a5e);
};

/** Gurmukhi -> Devanagari. The two Unicode blocks line up, so most letters shift by 0x100. */
export function gurmukhiToDevanagari(s: string): string {
  let out = '';
  const chars = [...s];
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const n = c.charCodeAt(0);
    if (c === TIPPI) out += 'ं';
    else if (c === ADDAK) {
      const next = chars[i + 1];
      if (next && isGurmukhiConsonant(next)) out += String.fromCharCode(next.charCodeAt(0) - 0x100) + '्';
    } else if (n >= 0x0a00 && n <= 0x0a6f) out += String.fromCharCode(n - 0x100);
    else out += c;
  }
  return out.normalize('NFC').replace(/\u0938\u093C/g, '\u0936');
}

const CONS: Record<string, string> = {
  ਕ: 'k', ਖ: 'kh', ਗ: 'g', ਘ: 'gh', ਙ: 'ng', ਚ: 'ch', ਛ: 'chh', ਜ: 'j', ਝ: 'jh', ਞ: 'ny',
  ਟ: 't', ਠ: 'th', ਡ: 'd', ਢ: 'dh', ਣ: 'n', ਤ: 't', ਥ: 'th', ਦ: 'd', ਧ: 'dh', ਨ: 'n',
  ਪ: 'p', ਫ: 'ph', ਬ: 'b', ਭ: 'bh', ਮ: 'm', ਯ: 'y', ਰ: 'r', ਲ: 'l', ਵ: 'v', ੜ: 'd',
  ਸ: 's', ਹ: 'h', ਸ਼: 'sh', ਖ਼: 'kh', ਗ਼: 'g', ਜ਼: 'z', ਫ਼: 'f', ਲ਼: 'l',
};
const VOWELS: Record<string, string> = { ਅ: 'a', ਆ: 'aa', ਇ: 'i', ਈ: 'ee', ਉ: 'u', ਊ: 'oo', ਏ: 'e', ਐ: 'ai', ਓ: 'o', ਔ: 'au' };
const MATRA: Record<string, string> = { 'ਾ': 'aa', 'ਿ': 'i', 'ੀ': 'ee', 'ੁ': 'u', 'ੂ': 'oo', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au' };
const DIGITS = '੦੧੨੩੪੫੬੭੮੯';

interface Syl { c: string; v: string; inherent: boolean; nasal: boolean; double: boolean }

const NUKTA_MAP: Record<string, string> = { s: 'sh', j: 'z', ph: 'f', kh: 'kh', g: 'g', l: 'l' };
const LABIAL = new Set(['m', 'p', 'b', 'bh', 'ph']);

function romanizeWord(w: string): string {
  const syls: Syl[] = [];
  let pendingDouble = false;
  const chars = [...w.normalize('NFD')];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const last = syls[syls.length - 1];
    if (CONS[ch] !== undefined) {
      syls.push({ c: CONS[ch], v: 'a', inherent: true, nasal: false, double: pendingDouble });
      pendingDouble = false;
    } else if (ch === NUKTA && last) last.c = NUKTA_MAP[last.c] ?? last.c;
    else if (VOWELS[ch]) syls.push({ c: '', v: VOWELS[ch], inherent: false, nasal: false, double: false });
    else if (MATRA[ch] && last) Object.assign(last, { v: MATRA[ch], inherent: false });
    else if (ch === HALANT && last) {
      // Subjoined ਹ (as in ਥੋੜ੍ਹਾ) only marks tone: skip it. Others (ਸ੍ਰੀ): drop the vowel before.
      if (chars[i + 1] === 'ਹ') i++;
      else Object.assign(last, { v: '', inherent: false });
    } else if ((ch === TIPPI || ch === BINDI) && last) last.nasal = true;
    else if (ch === ADDAK) pendingDouble = true;
    else if (DIGITS.includes(ch)) syls.push({ c: String(DIGITS.indexOf(ch)), v: '', inherent: false, nasal: false, double: false });
    else syls.push({ c: ch, v: '', inherent: false, nasal: false, double: false });
  }
  // Schwa deletion: final inherent "a" is silent; a middle one is silent between two pronounced vowels.
  const n = syls.length;
  if (n > 1 && syls[n - 1].inherent) syls[n - 1].v = '';
  for (let i = 1; i < n - 1; i++) {
    const s = syls[i];
    if (s.inherent && s.c && syls[i - 1].v && syls[i + 1].v && syls[i + 1].c) s.v = '';
  }
  let out = '';
  syls.forEach((s, i) => {
    let v = s.v;
    const isLast = i === n - 1;
    const next = syls[i + 1];
    if ((v === 'ee' || v === 'i') && next && !next.c) v = 'iy';
    else if (isLast && v === 'ee') v = 'i';
    else if (isLast && v === 'oo') v = 'u';
    else if (isLast && v === 'aa' && (s.c || i > 0) && !s.nasal) v = 'a';
    let nasal = '';
    if (s.nasal) {
      if (isLast && /^(i|u|ee|oo)$/.test(s.v)) nasal = '';
      else if (next && LABIAL.has(next.c) && !s.v.match(/^(ee|oo|e|o|ai|au)$/)) nasal = next.c === 'm' ? '' : 'm';
      else nasal = 'n';
    }
    const dbl = s.double && s.c && !(isLast && !v) && (s.c.length === 1 || s.c === 'th') ? s.c[0] : '';
    out += dbl + s.c + v + nasal;
  });
  return out;
}

/** Gurmukhi -> everyday romanized Punjabi (approximate). */
export function romanizeGurmukhi(s: string): string {
  const parts = s.split(/(\s+|[?!.,।॥"'()]+)/);
  const r = parts.map((p) => (/[਀-੿]/.test(p) ? romanizeWord(p) : p.replace('।', '.'))).join('');
  return r.charAt(0).toUpperCase() + r.slice(1);
}

export const hasGurmukhi = (s: string) => /[਀-੿]/.test(s);

// ---------------------------------------------------------------------------
// Romanized Punjabi -> Gurmukhi (approximate). Never shown to the user: it's only
// fed to the Punjabi voice so romanized-only content can still be read aloud well.

const R_CONS: [string, string][] = [
  ['chh', 'ਛ'], ['kh', 'ਖ'], ['gh', 'ਘ'], ['ch', 'ਚ'], ['jh', 'ਝ'], ['th', 'ਥ'], ['dh', 'ਧ'], ['ph', 'ਫ'], ['bh', 'ਭ'], ['sh', 'ਸ਼'],
  ['k', 'ਕ'], ['g', 'ਗ'], ['j', 'ਜ'], ['t', 'ਤ'], ['d', 'ਦ'], ['n', 'ਨ'], ['p', 'ਪ'], ['b', 'ਬ'], ['m', 'ਮ'], ['y', 'ਯ'],
  ['r', 'ਰ'], ['l', 'ਲ'], ['v', 'ਵ'], ['w', 'ਵ'], ['s', 'ਸ'], ['h', 'ਹ'], ['z', 'ਜ਼'], ['f', 'ਫ਼'], ['q', 'ਕ'], ['c', 'ਕ'], ['x', 'ਕਸ'],
];
// [roman, independent letter, matra]
const R_VOW: [string, string, string][] = [
  ['aa', 'ਆ', 'ਾ'], ['ai', 'ਐ', 'ੈ'], ['au', 'ਔ', 'ੌ'], ['ee', 'ਈ', 'ੀ'], ['ii', 'ਈ', 'ੀ'], ['oo', 'ਊ', 'ੂ'], ['ou', 'ਊ', 'ੂ'],
  ['a', 'ਅ', ''], ['i', 'ਇ', 'ਿ'], ['u', 'ਉ', 'ੁ'], ['e', 'ਏ', 'ੇ'], ['o', 'ਓ', 'ੋ'],
];
const LONG = new Set(['aa', 'ai', 'au', 'ee', 'ii', 'oo', 'ou', 'e', 'o']);

function romanWordToGurmukhi(w: string): string {
  let out = '';
  let i = 0;
  let prev: 'start' | 'cons' | 'vowel' = 'start';
  let lastVowel = '';
  while (i < w.length) {
    // nasal n: after a vowel, before a consonant or at the end (after a long vowel)
    if (w[i] === 'n' && prev === 'vowel') {
      const rest = w.slice(i + 1);
      const nextIsVowel = /^[aeiou]/.test(rest);
      const atEnd = rest === '';
      if (!nextIsVowel && !rest.startsWith('n') && (rest.length > 0 ? !/^[h]/.test(rest) : true) && (!atEnd || LONG.has(lastVowel))) {
        out += LONG.has(lastVowel) ? 'ਂ' : 'ੰ';
        i++;
        continue;
      }
    }
    const v = R_VOW.find(([r]) => w.startsWith(r, i));
    if (v) {
      const [r, ind, matra] = v;
      let m = matra;
      // a word-final short "a" after a consonant is usually a long "aa" in Punjabi (mera, da, kha)
      if (r === 'a' && prev === 'cons' && i + 1 === w.length) m = 'ਾ';
      // final "i" / "u" sound long
      if (r === 'i' && prev === 'cons' && i + 1 === w.length) m = 'ੀ';
      if (r === 'u' && prev === 'cons' && i + 1 === w.length) m = 'ੂ';
      out += prev === 'cons' ? m : ind;
      prev = 'vowel';
      lastVowel = r;
      i += r.length;
      continue;
    }
    const c = R_CONS.find(([r]) => w.startsWith(r, i));
    if (c) {
      const [r, g] = c;
      // doubled consonant -> addak
      if (w.startsWith(r, i + r.length) || (r.length === 2 && w[i] === w[i - 1] && prev === 'cons')) {
        if (w.startsWith(r, i + r.length)) {
          out += 'ੱ' + g;
          i += r.length * 2;
          prev = 'cons';
          continue;
        }
      }
      out += g;
      prev = 'cons';
      i += r.length;
      continue;
    }
    out += w[i];
    prev = 'start';
    i++;
  }
  return out;
}

// Common words (incl. English loanwords) with known spellings; the rules above handle the rest.
export const KNOWN_WORDS: Record<string, string> = { aa: 'ਆ', main: 'ਮੈਂ', haan: 'ਹਾਂ', kar: 'ਕਰ', na: 'ਨਾ', karna: 'ਕਰਨਾ', ji: 'ਜੀ', kal: 'ਕੱਲ੍ਹ', mere: 'ਮੇਰੇ', meri: 'ਮੇਰੀ', de: 'ਦੇ', chal: 'ਚੱਲ', ho: 'ਹੋ', roti: 'ਰੋਟੀ', koi: 'ਕੋਈ', mera: 'ਮੇਰਾ', hauli: 'ਹੌਲੀ', apna: 'ਆਪਣਾ', di: 'ਦੀ', fer: 'ਫੇਰ', jaldi: 'ਜਲਦੀ', aao: 'ਆਓ', kha: 'ਖਾ', nu: 'ਨੂੰ', das: 'ਦਸ', sir: 'ਸਿਰ', khatam: 'ਖ਼ਤਮ', sakde: 'ਸਕਦੇ', bas: 'ਬੱਸ', da: 'ਦਾ', kade: 'ਕਦੇ', jao: 'ਜਾਓ', mehsoos: 'ਮਹਿਸੂਸ', hona: 'ਹੋਣਾ', karni: 'ਕਰਨੀ', band: 'ਬੰਦ', kitta: 'ਕੀਤਾ', karde: 'ਕਰਦੇ', rahi: 'ਰਹੀ', dedh: 'ਡੇਢ', zyada: 'ਜ਼ਿਆਦਾ', pata: 'ਪਤਾ', ja: 'ਜਾ', meenh: 'ਮੀਂਹ', milde: 'ਮਿਲਦੇ', chaliye: 'ਚੱਲੀਏ', kariye: 'ਕਰੀਏ', papa: 'ਪਾਪਾ', aunty: 'ਆਂਟੀ', dhaai: 'ਢਾਈ', hune: 'ਹੁਣੇ', shaam: 'ਸ਼ਾਮ', raat: 'ਰਾਤ', somvaar: 'ਸੋਮਵਾਰ', bahar: 'ਬਾਹਰ', door: 'ਦੂਰ', ganda: 'ਗੰਦਾ', rajj: 'ਰੱਜ', swaad: 'ਸੁਆਦ', deyo: 'ਦਿਓ', chaabi: 'ਚਾਬੀ', dhidd: 'ਢਿੱਡ', dawai: 'ਦਵਾਈ', sona: 'ਸੌਣਾ', karda: 'ਕਰਦਾ', san: 'ਸਨ', gussa: 'ਗੁੱਸਾ', garmi: 'ਗਰਮੀ', rab: 'ਰੱਬ', thakk: 'ਥੱਕ', samajh: 'ਸਮਝ', sunao: 'ਸੁਣਾਓ', khaas: 'ਖ਼ਾਸ', pakka: 'ਪੱਕਾ', par: 'ਪਰ', 'do': 'ਦੋ', nau: 'ਨੌਂ', hazaar: 'ਹਜ਼ਾਰ', aitvaar: 'ਐਤਵਾਰ', ander: 'ਅੰਦਰ', pind: 'ਪਿੰਡ', chaah: 'ਚਾਹ', makhan: 'ਮੱਖਣ', namkeen: 'ਨਮਕੀਨ', le: 'ਲੈ', paise: 'ਪੈਸੇ', pai: 'ਪੈ', chhatri: 'ਛੱਤਰੀ', lao: 'ਲਓ', sat: 'ਸਤਿ', shukriya: 'ਸ਼ੁਕਰੀਆ', tickets: 'ਟਿਕਟਾਂ', book: 'ਬੁੱਕ', bhej: 'ਭੇਜ', vaar: 'ਵਾਰ', boli: 'ਬੋਲੀ', punjabi: 'ਪੰਜਾਬੀ', sikh: 'ਸਿੱਖ', raste: 'ਰਸਤੇ', karvaya: 'ਕਰਵਾਇਆ', pasand: 'ਪਸੰਦ', tuhadi: 'ਤੁਹਾਡੀ', saadi: 'ਸਾਡੀ', dost: 'ਦੋਸਤ', bhra: 'ਭਰਾ', mummy: 'ਮੰਮੀ', bapu: 'ਬਾਪੂ', parivaar: 'ਪਰਿਵਾਰ', family: 'ਫੈਮਿਲੀ', puttar: 'ਪੁੱਤਰ', dhee: 'ਧੀ', nyaane: 'ਨਿਆਣੇ', gharwala: 'ਘਰਵਾਲਾ', pati: 'ਪਤੀ', gharwali: 'ਘਰਵਾਲੀ', vohti: 'ਵਹੁਟੀ', daadi: 'ਦਾਦੀ', bebe: 'ਬੇਬੇ', daada: 'ਦਾਦਾ', baapu: 'ਬਾਪੂ', naani: 'ਨਾਨੀ', naana: 'ਨਾਨਾ', taaya: 'ਤਾਇਆ', uncle: 'ਅੰਕਲ', guaandi: 'ਗੁਆਂਢੀ', kihda: 'ਕਿਹਦਾ', kisda: 'ਕਿਸਦਾ', ya: 'ਜਾਂ', kyonki: 'ਕਿਉਂਕਿ', 'is': 'ਇਸ', haanji: 'ਹਾਂਜੀ', shayad: 'ਸ਼ਾਇਦ', sirf: 'ਸਿਰਫ਼', dobara: 'ਦੁਬਾਰਾ', hale: 'ਹਾਲੇ', chaar: 'ਚਾਰ', gyaaran: 'ਗਿਆਰਾਂ', baaran: 'ਬਾਰਾਂ', tehran: 'ਤੇਰਾਂ', chaudan: 'ਚੌਦਾਂ', pandran: 'ਪੰਦਰਾਂ', solaan: 'ਸੋਲਾਂ', sataaran: 'ਸਤਾਰਾਂ', athaaran: 'ਅਠਾਰਾਂ', unni: 'ਉੱਨੀ', pachchi: 'ਪੱਚੀ', tih: 'ਤੀਹ', chaali: 'ਚਾਲੀ', panjaah: 'ਪੰਜਾਹ', satth: 'ਸੱਠ', sattar: 'ਸੱਤਰ', assi: 'ਅੱਸੀ', nabbe: 'ਨੱਬੇ', lakh: 'ਲੱਖ', pehla: 'ਪਹਿਲਾ', dooja: 'ਦੂਜਾ', teeja: 'ਤੀਜਾ', parson: 'ਪਰਸੋਂ', dupehar: 'ਦੁਪਹਿਰ', din: 'ਦਿਨ', hafta: 'ਹਫ਼ਤਾ', mahina: 'ਮਹੀਨਾ', saal: 'ਸਾਲ', ghanta: 'ਘੰਟਾ', der: 'ਦੇਰ', hamesha: 'ਹਮੇਸ਼ਾ', mangalvaar: 'ਮੰਗਲਵਾਰ', budhvaar: 'ਬੁੱਧਵਾਰ', veervaar: 'ਵੀਰਵਾਰ', shukarvaar: 'ਸ਼ੁੱਕਰਵਾਰ', shanivaar: 'ਸ਼ਨੀਵਾਰ', sanichharvaar: 'ਸਨਿੱਚਰਵਾਰ', sava: 'ਸਵਾ', saadhe: 'ਸਾਢੇ', paune: 'ਪੌਣੇ', bazaar: 'ਬਾਜ਼ਾਰ', daftar: 'ਦਫ਼ਤਰ', gali: 'ਗਲੀ', dukaan: 'ਦੁਕਾਨ', shop: 'ਸ਼ਾਪ', haspataal: 'ਹਸਪਤਾਲ', mandir: 'ਮੰਦਰ', gurdwara: 'ਗੁਰਦੁਆਰਾ', shehar: 'ਸ਼ਹਿਰ', mudna: 'ਮੁੜਨਾ', saahmne: 'ਸਾਹਮਣੇ', pichhe: 'ਪਿੱਛੇ', mud: 'ਮੁੜ', dahi: 'ਦਹੀਂ', phulka: 'ਫੁਲਕਾ', sarson: 'ਸਰ੍ਹੋਂ', saag: 'ਸਾਗ', makki: 'ਮੱਕੀ', namak: 'ਨਮਕ', cheeni: 'ਚੀਨੀ', khand: 'ਖੰਡ', mirch: 'ਮਿਰਚ', pyaaz: 'ਪਿਆਜ਼', aalu: 'ਆਲੂ', amb: 'ਅੰਬ', anda: 'ਆਂਡਾ', loona: 'ਲੂਣਾ', pyaas: 'ਪਿਆਸ', sawaadi: 'ਸੁਆਦੀ', work: 'ਵਰਕ', kitaab: 'ਕਿਤਾਬ', darvaaza: 'ਦਰਵਾਜ਼ਾ', boohaa: 'ਬੂਹਾ', baari: 'ਬਾਰੀ', rasoi: 'ਰਸੋਈ', kitchen: 'ਕਿਚਨ', manja: 'ਮੰਜਾ', bed: 'ਬੈੱਡ', bag: 'ਬੈਗ', jhola: 'ਝੋਲਾ', car: 'ਕਾਰ', bike: 'ਬਾਈਕ', bijli: 'ਬਿਜਲੀ', akh: 'ਅੱਖ', kann: 'ਕੰਨ', nakk: 'ਨੱਕ', munh: 'ਮੂੰਹ', dand: 'ਦੰਦ', hath: 'ਹੱਥ', pair: 'ਪੈਰ', latt: 'ਲੱਤ', pet: 'ਪੇਟ', pith: 'ਪਿੱਠ', khangh: 'ਖੰਘ', zukaam: 'ਜ਼ੁਕਾਮ', peena: 'ਪੀਣਾ', dekhna: 'ਦੇਖਣਾ', bolna: 'ਬੋਲਣਾ', puchhna: 'ਪੁੱਛਣਾ', sunna: 'ਸੁਣਨਾ', samajhna: 'ਸਮਝਣਾ', likhna: 'ਲਿਖਣਾ', milna: 'ਮਿਲਣਾ', baithna: 'ਬੈਠਣਾ', khada: 'ਖੜ੍ਹਾ', khareedna: 'ਖ਼ਰੀਦਣਾ', vechna: 'ਵੇਚਣਾ', dena: 'ਦੇਣਾ', liauna: 'ਲਿਆਉਣਾ', rakhna: 'ਰੱਖਣਾ', nikalna: 'ਨਿਕਲਣਾ', pahunchna: 'ਪਹੁੰਚਣਾ', chauna: 'ਚਾਹੁਣਾ', turna: 'ਤੁਰਨਾ', bhajjna: 'ਭੱਜਣਾ', khedna: 'ਖੇਡਣਾ', hassna: 'ਹੱਸਣਾ', rona: 'ਰੋਣਾ', dhona: 'ਧੋਣਾ', pakauna: 'ਪਕਾਉਣਾ', kholna: 'ਖੋਲ੍ਹਣਾ', bhullna: 'ਭੁੱਲਣਾ', yaad: 'ਯਾਦ', sikhna: 'ਸਿੱਖਣਾ', sikhauna: 'ਸਿਖਾਉਣਾ', madad: 'ਮਦਦ', help: 'ਹੈਲਪ', uthna: 'ਉੱਠਣਾ', nahauna: 'ਨਹਾਉਣਾ', tayyar: 'ਤਿਆਰ', badalna: 'ਬਦਲਣਾ', kardi: 'ਕਰਦੀ', ohna: 'ਉਹਨਾਂ', janda: 'ਜਾਂਦਾ', gaye: 'ਗਏ', khaanda: 'ਖਾਂਦਾ', khaadha: 'ਖਾਧਾ', khaavanga: 'ਖਾਵਾਂਗਾ', khush: 'ਖ਼ੁਸ਼', udaas: 'ਉਦਾਸ', pareshaan: 'ਪਰੇਸ਼ਾਨ', darr: 'ਡਰ', chhota: 'ਛੋਟਾ', puraana: 'ਪੁਰਾਣਾ', saukha: 'ਸੌਖਾ', aukha: 'ਔਖਾ', tez: 'ਤੇਜ਼', saaf: 'ਸਾਫ਼', sardi: 'ਸਰਦੀ', dhupp: 'ਧੁੱਪ', hava: 'ਹਵਾ', baddal: 'ਬੱਦਲ', dhund: 'ਧੁੰਦ', dhanvaad: 'ਧੰਨਵਾਦ', maaf: 'ਮਾਫ਼', meharbani: 'ਮਿਹਰਬਾਨੀ', milange: 'ਮਿਲਾਂਗੇ', dhyaan: 'ਧਿਆਨ', rakhi: 'ਰੱਖੀਂ', rakha: 'ਰਾਖਾ', vadhaiyan: 'ਵਧਾਈਆਂ', happy: 'ਹੈਪੀ', kitte: 'ਕੀਤੇ', check: 'ਚੈੱਕ', dittaa: 'ਦਿੱਤਾ', khaan: 'ਖਾਣ', deyi: 'ਦੇਈਂ', mil: 'ਮਿਲ', dekh: 'ਦੇਖ', bana: 'ਬਣਾ', baitho: 'ਬੈਠੋ', mehnga: 'ਮਹਿੰਗਾ', hai: 'ਹੈ', sakda: 'ਸਕਦਾ', mehar: 'ਮਿਹਰ', sachi: 'ਸੱਚੀ', phatte: 'ਫੱਟੇ', rehan: 'ਰਹਿਣ', so: 'ਸੋ', pahunch: 'ਪਹੁੰਚ', dinda: 'ਦਿੰਦਾ', rupaye: 'ਰੁਪਏ', karo: 'ਕਰੋ', chalo: 'ਚੱਲੋ', mitthi: 'ਮਿੱਠੀ', silent: 'ਸਾਈਲੈਂਟ', bol: 'ਬੋਲ', sab: 'ਸਭ', karan: 'ਕਰਨ', khulli: 'ਖੁੱਲ੍ਹੀ', chalde: 'ਚੱਲਦੇ', tere: 'ਤੇਰੇ', karaan: 'ਕਰਾਂ', beta: 'ਬੇਟਾ', peeoge: 'ਪੀਓਗੇ', jahi: 'ਜਿਹੀ', ke: 'ਕੇ', dekho: 'ਦੇਖੋ', design: 'ਡਿਜ਼ਾਈਨ', baara: 'ਬਾਰਾਂ', mehngi: 'ਮਹਿੰਗੀ', chalda: 'ਚੱਲਦਾ', bhaaji: 'ਭਾਜੀ', chaloge: 'ਚੱਲੋਗੇ', bai: 'ਬਹਿ', jaange: 'ਜਾਵਾਂਗੇ', sunday: 'ਸੰਡੇ', aavenga: 'ਆਵੇਂਗਾ', laavaan: 'ਲਿਆਵਾਂ', parothe: 'ਪਰੌਂਠੇ', zaroor: 'ਜ਼ਰੂਰ', paa: 'ਪਾ', dekhan: 'ਦੇਖਣ', pahunchoge: 'ਪਹੁੰਚੋਗੇ', achha: 'ਅੱਛਾ', kol: 'ਕੋਲ', busy: 'ਬਿਜ਼ੀ', free: 'ਫ੍ਰੀ', college: 'ਕਾਲਜ', dinner: 'ਡਿਨਰ', tv: 'ਟੀਵੀ', phone: 'ਫ਼ੋਨ', call: 'ਕਾਲ', plan: 'ਪਲੈਨ', order: 'ਆਰਡਰ', online: 'ਆਨਲਾਈਨ', sorry: 'ਸੌਰੀ', wait: 'ਵੇਟ', late: 'ਲੇਟ', office: 'ਆਫ਼ਿਸ', market: 'ਮਾਰਕੀਟ', burger: 'ਬਰਗਰ', cold: 'ਕੋਲਡ', drink: 'ਡ੍ਰਿੰਕ', spicy: 'ਸਪਾਈਸੀ', pay: 'ਪੇ', haircut: 'ਹੇਅਰਕੱਟ', makeover: 'ਮੇਕਓਵਰ', look: 'ਲੁੱਕ', restaurant: 'ਰੈਸਟੋਰੈਂਟ', assignment: 'ਅਸਾਈਨਮੈਂਟ', complete: 'ਕੰਪਲੀਟ', food: 'ਫ਼ੂਡ', tension: 'ਟੈਨਸ਼ਨ', meeting: 'ਮੀਟਿੰਗ', boss: 'ਬੌਸ', class: 'ਕਲਾਸ', exam: 'ਐਗਜ਼ਾਮ', time: 'ਟਾਈਮ', please: 'ਪਲੀਜ਼', thanks: 'ਥੈਂਕਸ', thank: 'ਥੈਂਕ', you: 'ਯੂ', okay: 'ਓਕੇ', ok: 'ਓਕੇ', bye: 'ਬਾਏ', hello: 'ਹੈਲੋ', hi: 'ਹਾਏ', party: 'ਪਾਰਟੀ', movie: 'ਮੂਵੀ', mobile: 'ਮੋਬਾਈਲ', message: 'ਮੈਸੇਜ', chat: 'ਚੈਟ', bus: 'ਬੱਸ', train: 'ਟ੍ਰੇਨ', ticket: 'ਟਿਕਟ', station: 'ਸਟੇਸ਼ਨ', airport: 'ਏਅਰਪੋਰਟ', hotel: 'ਹੋਟਲ', room: 'ਰੂਮ', hospital: 'ਹਸਪਤਾਲ', doctor: 'ਡਾਕਟਰ', medicine: 'ਮੈਡੀਸਨ', gym: 'ਜਿਮ', job: 'ਜੌਬ', salary: 'ਸੈਲਰੀ', weekend: 'ਵੀਕੈਂਡ', mint: 'ਮਿੰਟ', mintaan: 'ਮਿੰਟਾਂ', sure: 'ਸ਼ਿਓਰ', actually: 'ਐਕਚੁਅਲੀ', really: 'ਰੀਅਲੀ', already: 'ਆਲਰੈਡੀ', lunch: 'ਲੰਚ', breakfast: 'ਬ੍ਰੇਕਫਾਸਟ', coffee: 'ਕੌਫ਼ੀ', juice: 'ਜੂਸ', shopping: 'ਸ਼ਾਪਿੰਗ', mall: 'ਮਾਲ', shirt: 'ਸ਼ਰਟ', size: 'ਸਾਈਜ਼', discount: 'ਡਿਸਕਾਊਂਟ', bill: 'ਬਿੱਲ', cash: 'ਕੈਸ਼', card: 'ਕਾਰਡ', upi: 'ਯੂਪੀਆਈ', auto: 'ਆਟੋ', cab: 'ਕੈਬ', traffic: 'ਟ੍ਰੈਫ਼ਿਕ', jam: 'ਜੈਮ', signal: 'ਸਿਗਨਲ', left: 'ਲੈਫ਼ਟ', right: 'ਰਾਈਟ', wifi: 'ਵਾਈਫ਼ਾਈ', password: 'ਪਾਸਵਰਡ', battery: 'ਬੈਟਰੀ', charge: 'ਚਾਰਜ', charger: 'ਚਾਰਜਰ', photo: 'ਫ਼ੋਟੋ', video: 'ਵੀਡੀਓ', status: 'ਸਟੇਟਸ', birthday: 'ਬਰਥਡੇ', cake: 'ਕੇਕ', gift: 'ਗਿਫ਼ਟ', friend: 'ਫ੍ਰੈਂਡ', best: 'ਬੈਸਟ', nice: 'ਨਾਈਸ', cool: 'ਕੂਲ', super: 'ਸੁਪਰ', full: 'ਫੁੱਲ', enjoy: 'ਇਨਜੌਏ', miss: 'ਮਿਸ', fit: 'ਫ਼ਿੱਟ', smart: 'ਸਮਾਰਟ', tired: 'ਟਾਇਰਡ', bore: 'ਬੋਰ', boring: 'ਬੋਰਿੰਗ', fever: 'ਫ਼ੀਵਰ', ac: 'ਏਸੀ', fan: 'ਫ਼ੈਨ', light: 'ਲਾਈਟ', switch: 'ਸਵਿੱਚ', start: 'ਸਟਾਰਟ', done: 'ਡਨ', change: 'ਚੇਂਜ', problem: 'ਪ੍ਰੌਬਲਮ', matlab: 'ਮਤਲਬ', delivery: 'ਡਿਲੀਵਰੀ', address: 'ਐਡਰੈੱਸ', location: 'ਲੋਕੇਸ਼ਨ', share: 'ਸ਼ੇਅਰ', send: 'ਸੈਂਡ', reply: 'ਰਿਪਲਾਈ', week: 'ਵੀਕ', month: 'ਮੰਥ', minute: 'ਮਿੰਟ', second: 'ਸੈਕੰਡ', tusi: 'ਤੁਸੀਂ', sri: 'ਸ੍ਰੀ', akal: 'ਅਕਾਲ', bhain: 'ਭੈਣ', ajj: 'ਅੱਜ', hun: 'ਹੁਣ', padh: 'ਪੜ੍ਹ', padhna: 'ਪੜ੍ਹਨਾ', padhai: 'ਪੜ੍ਹਾਈ', reha: 'ਰਿਹਾ', riha: 'ਰਿਹਾ', rahe: 'ਰਹੇ', kithe: 'ਕਿੱਥੇ', kitthe: 'ਕਿੱਥੇ', itthe: 'ਇੱਥੇ', othe: 'ਓਥੇ', javanga: 'ਜਾਵਾਂਗਾ', javangi: 'ਜਾਵਾਂਗੀ', javange: 'ਜਾਵਾਂਗੇ', karanga: 'ਕਰਾਂਗਾ', karangi: 'ਕਰਾਂਗੀ', lavanga: 'ਲਵਾਂਗਾ', hovanga: 'ਹੋਵਾਂਗਾ', aavanga: 'ਆਵਾਂਗਾ', kaun: 'ਕੌਣ', khaana: 'ਖਾਣਾ', khana: 'ਖਾਣਾ', paani: 'ਪਾਣੀ', vich: 'ਵਿੱਚ', naal: 'ਨਾਲ', layi: 'ਲਈ', mainu: 'ਮੈਨੂੰ', tainu: 'ਤੈਨੂੰ', tuhanu: 'ਤੁਹਾਨੂੰ', saanu: 'ਸਾਨੂੰ', ohnu: 'ਉਹਨੂੰ', vadda: 'ਵੱਡਾ', thalle: 'ਥੱਲੇ', utte: 'ਉੱਤੇ', kehda: 'ਕਿਹੜਾ', kehdi: 'ਕਿਹੜੀ', vajje: 'ਵਜੇ', vaje: 'ਵਜੇ', ain: 'ਐਂ', chaunda: 'ਚਾਹੁੰਦਾ', chaundi: 'ਚਾਹੁੰਦੀ', ton: 'ਤੋਂ', nahi: 'ਨਹੀਂ', nahin: 'ਨਹੀਂ', panj: 'ਪੰਜ', chhe: 'ਛੇ', satt: 'ਸੱਤ', atth: 'ਅੱਠ', tinn: 'ਤਿੰਨ', ik: 'ਇੱਕ', veeh: 'ਵੀਹ', sau: 'ਸੌ', gall: 'ਗੱਲ', kamm: 'ਕੰਮ', dass: 'ਦੱਸ', dasso: 'ਦੱਸੋ', puchh: 'ਪੁੱਛ', pehlan: 'ਪਹਿਲਾਂ', baad: 'ਬਾਅਦ', ghar: 'ਘਰ', karke: 'ਕਰਕੇ', hoya: 'ਹੋਇਆ', aaya: 'ਆਇਆ', aayi: 'ਆਈ', gaya: 'ਗਿਆ', giya: 'ਗਿਆ', kithon: 'ਕਿੱਥੋਂ', kitthon: 'ਕਿੱਥੋਂ', si: 'ਸੀ', ne: 'ਨੇ', te: 'ਤੇ', je: 'ਜੇ', taan: 'ਤਾਂ', jaan: 'ਜਾਂ', lainde: 'ਲੈਂਦੇ', theek: 'ਠੀਕ', thik: 'ਠੀਕ', tikha: 'ਤਿੱਖਾ', mittha: 'ਮਿੱਠਾ', changa: 'ਚੰਗਾ', changi: 'ਚੰਗੀ', maada: 'ਮਾੜਾ', thanda: 'ਠੰਢਾ', thand: 'ਠੰਢ', garam: 'ਗਰਮ', thoda: 'ਥੋੜ੍ਹਾ', thodi: 'ਥੋੜ੍ਹੀ', bahut: 'ਬਹੁਤ', dudh: 'ਦੁੱਧ', chaul: 'ਚੌਲ', kapde: 'ਕੱਪੜੇ', vaal: 'ਵਾਲ', sadak: 'ਸੜਕ', kamra: 'ਕਮਰਾ', khabbe: 'ਖੱਬੇ', sajje: 'ਸੱਜੇ', sidha: 'ਸਿੱਧਾ', nere: 'ਨੇੜੇ', savere: 'ਸਵੇਰੇ', kadon: 'ਕਦੋਂ', kyon: 'ਕਿਉਂ', kinna: 'ਕਿੰਨਾ', kinne: 'ਕਿੰਨੇ', yaar: 'ਯਾਰ', oye: 'ਓਏ', veer: 'ਵੀਰ', pyo: 'ਪਿਓ', maa: 'ਮਾਂ', asi: 'ਅਸੀਂ', oh: 'ਉਹ', eh: 'ਇਹ', ehda: 'ਇਹਦਾ', saada: 'ਸਾਡਾ', tuhada: 'ਤੁਹਾਡਾ', tu: 'ਤੂੰ', tera: 'ਤੇਰਾ', teri: 'ਤੇਰੀ', vadhiya: 'ਵਧੀਆ', haal: 'ਹਾਲ', ki: 'ਕੀ', kiven: 'ਕਿਵੇਂ', chahida: 'ਚਾਹੀਦਾ', chahidi: 'ਚਾਹੀਦੀ', laggi: 'ਲੱਗੀ', lagg: 'ਲੱਗ', bhukh: 'ਭੁੱਖ', kujh: 'ਕੁਝ', hor: 'ਹੋਰ', vi: 'ਵੀ', ikatthe: 'ਇਕੱਠੇ', fikar: 'ਫ਼ਿਕਰ', udeek: 'ਉਡੀਕ', mukauna: 'ਮੁਕਾਉਣਾ', vehla: 'ਵਿਹਲਾ', thakkya: 'ਥੱਕਿਆ', nava: 'ਨਵਾਂ', navi: 'ਨਵੀਂ', loon: 'ਲੂਣ', auna: 'ਆਉਣਾ', banauna: 'ਬਣਾਉਣਾ', dassna: 'ਦੱਸਣਾ', laina: 'ਲੈਣਾ', lai: 'ਲੈ', kari: 'ਕਰੀਂ', kariyo: 'ਕਰੀਓ', aaja: 'ਆਜਾ', hove: 'ਹੋਵੇ', hovein: 'ਹੋਵੇਂ', jadon: 'ਜਦੋਂ', tabiyat: 'ਤਬੀਅਤ', bukhar: 'ਬੁਖਾਰ', dard: 'ਦਰਦ', araam: 'ਆਰਾਮ', ohda: 'ਉਹਦਾ', ohdi: 'ਉਹਦੀ', jaana: 'ਜਾਣਾ', paina: 'ਪੈਣਾ', mangwa: 'ਮੰਗਵਾ', kidda: 'ਕਿੱਦਾਂ', kiddan: 'ਕਿੱਦਾਂ', chak: 'ਚੱਕ', shabaash: 'ਸ਼ਾਬਾਸ਼', balle: 'ਬੱਲੇ', sohna: 'ਸੋਹਣਾ', sohni: 'ਸੋਹਣੀ', munda: 'ਮੁੰਡਾ', kudi: 'ਕੁੜੀ', bachche: 'ਬੱਚੇ', nani: 'ਨਾਨੀ', dadi: 'ਦਾਦੀ', chacha: 'ਚਾਚਾ', mama: 'ਮਾਮਾ', bhua: 'ਭੂਆ', massi: 'ਮਾਸੀ', ghatt: 'ਘੱਟ', vadh: 'ਵੱਧ', rotti: 'ਰੋਟੀ', sabzi: 'ਸਬਜ਼ੀ', daal: 'ਦਾਲ', lassi: 'ਲੱਸੀ', parontha: 'ਪਰੌਂਠਾ', paratha: 'ਪਰੌਂਠਾ', gaddi: 'ਗੱਡੀ', raah: 'ਰਾਹ', mod: 'ਮੋੜ', neend: 'ਨੀਂਦ', soun: 'ਸੌਣ', savera: 'ਸਵੇਰਾ' };

export function romanToGurmukhi(s: string): string {
  return s
    .toLowerCase()
    .split(/(\s+|[?!.,;:'"()/…-]+)/)
    .map((p) => (/^[a-z]+$/.test(p) ? KNOWN_WORDS[p] ?? romanWordToGurmukhi(p) : p))
    .join('');
}

/** Devanagari -> Gurmukhi (lines up by 0x100), so Hindi speech results can be romanized too. */
export function devanagariToGurmukhi(s: string): string {
  return [...s.normalize('NFD')]
    .map((c) => {
      const n = c.charCodeAt(0);
      if (c === 'ष') return 'ਸ਼';
      if (c === 'ऋ' || c === 'ृ') return 'ਰਿ';
      if (c === 'ॉ') return 'ੌ';
      if (c === 'ऑ') return 'ਔ';
      if (c === 'ॅ' || c === 'ँ') return 'ਂ';
      if (n >= 0x0900 && n <= 0x097f) return String.fromCharCode(n + 0x100);
      return c;
    })
    .join('');
}

let reverse: Map<string, string> | null = null;
/** Romanized form of known words -> our usual spelling (bizi -> busy, kaalaj -> college). */
function friendlySpelling(word: string): string {
  if (!reverse) {
    reverse = new Map();
    for (const [roman, g] of Object.entries(KNOWN_WORDS)) {
      const r = romanizeGurmukhi(g).toLowerCase();
      if (!reverse.has(r)) reverse.set(r, roman);
    }
  }
  return reverse.get(word.toLowerCase()) ?? word;
}

/** Any script -> romanized text. */
export function toRoman(s: string): string {
  if (/[ऀ-ॿ]/.test(s)) s = devanagariToGurmukhi(s);
  if (!/[਀-੿]/.test(s)) return s;
  const r = romanizeGurmukhi(s).replace(/[A-Za-z]+/g, (w) => friendlySpelling(w));
  return r.charAt(0).toUpperCase() + r.slice(1);
}
