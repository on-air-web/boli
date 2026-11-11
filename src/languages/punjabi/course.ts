import type { Course, Phrase } from '../types';
import { handbook } from './handbook';
import { dialogues } from './dialogues';

// Punjabi v1: casual, everyday conversation in romanized text.
// Romanization follows common everyday spelling (aa = long a, ee = long i, kh/gh/dh = aspirated).
// `alt` lists other spellings people commonly use, so typing answers are forgiving.

const p = (id: string, text: string, en: string, extra: Omit<Phrase, 'id' | 'text' | 'en'> = {}): Phrase => ({
  id: `pa-${id}`,
  text,
  en,
  ...extra,
});

// Gurmukhi script for each phrase. Used for text-to-speech now, and for script lessons later.
const gurmukhi: Record<string, string> = {
  'pa-sat-sri-akal': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'pa-ki-haal': 'ਕੀ ਹਾਲ ਹੈ?',
  'pa-theek-haan': 'ਮੈਂ ਠੀਕ ਹਾਂ',
  'pa-tusi-kiven': 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
  'pa-haan-ji': 'ਹਾਂ ਜੀ',
  'pa-nahi-ji': 'ਨਹੀਂ ਜੀ',
  'pa-shukriya': 'ਸ਼ੁਕਰੀਆ',
  'pa-koi-gall-nahi': 'ਕੋਈ ਗੱਲ ਨਹੀਂ',
  'pa-vadhiya': 'ਮੈਂ ਵਧੀਆ ਹਾਂ',
  'pa-tusi-daso': 'ਤੁਸੀਂ ਦੱਸੋ?',
  'pa-phir-milange': 'ਫਿਰ ਮਿਲਾਂਗੇ',
  'pa-rab-rakha': 'ਰੱਬ ਰਾਖਾ',
  'pa-naam-ki': 'ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?',
  'pa-mera-naam': 'ਮੇਰਾ ਨਾਮ ਸਿਮਰਨ ਹੈ',
  'pa-mil-ke-khushi': 'ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ',
  'pa-mainu-vi': 'ਮੈਨੂੰ ਵੀ',
  'pa-kitthon': 'ਤੁਸੀਂ ਕਿੱਥੋਂ ਹੋ?',
  'pa-dilli-ton': 'ਮੈਂ ਦਿੱਲੀ ਤੋਂ ਹਾਂ',
  'pa-ki-karde': 'ਤੁਸੀਂ ਕੀ ਕਰਦੇ ਹੋ?',
  'pa-kamm-karda': 'ਮੈਂ ਕੰਮ ਕਰਦਾ ਹਾਂ',
  'pa-sikh-reha': 'ਮੈਂ ਪੰਜਾਬੀ ਸਿੱਖ ਰਿਹਾ ਹਾਂ',
  'pa-thodi-punjabi': 'ਮੈਨੂੰ ਥੋੜ੍ਹੀ ਪੰਜਾਬੀ ਆਉਂਦੀ ਹੈ',
  'pa-hauli-bolo': 'ਹੌਲੀ ਬੋਲੋ ਜੀ',
  'pa-samajh-nahi': 'ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਈ',
  'pa-chaah': 'ਚਾਹ ਪੀਓਗੇ?',
  'pa-zaroor': 'ਹਾਂ ਜੀ, ਜ਼ਰੂਰ',
  'pa-paani': 'ਥੋੜ੍ਹਾ ਪਾਣੀ ਦਿਓ',
  'pa-bas-hor-nahi': 'ਬੱਸ, ਹੋਰ ਨਹੀਂ',
  'pa-bhukh': 'ਮੈਨੂੰ ਭੁੱਖ ਲੱਗੀ ਹੈ',
  'pa-roti-kha-lao': 'ਰੋਟੀ ਖਾ ਲਓ',
  'pa-swaad': 'ਖਾਣਾ ਬਹੁਤ ਸੁਆਦ ਹੈ',
  'pa-hor-chahida': 'ਮੈਨੂੰ ਹੋਰ ਚਾਹੀਦਾ ਹੈ',
  'pa-ki-gall': 'ਕੀ ਗੱਲ ਹੈ?',
  'pa-sab-theek': 'ਸਭ ਠੀਕ ਹੈ',
  'pa-ki-kar-rahe': 'ਕੀ ਕਰ ਰਹੇ ਹੋ?',
  'pa-kujh-nahi': 'ਕੁਝ ਨਹੀਂ',
  'pa-bahut-vadhiya': 'ਬਹੁਤ ਵਧੀਆ!',
  'pa-sachi': 'ਸੱਚੀ?',
  'pa-chal-koi-na': 'ਚੱਲ ਕੋਈ ਨਾ',
  'pa-samajh-gaya': 'ਮੈਂ ਸਮਝ ਗਿਆ',
  'pa-kitthe-ja': 'ਕਿੱਥੇ ਜਾ ਰਹੇ ਹੋ?',
  'pa-ghar-ja': 'ਮੈਂ ਘਰ ਜਾ ਰਿਹਾ ਹਾਂ',
  'pa-chaliye': 'ਚਲੋ, ਚੱਲੀਏ',
  'pa-ki-time': 'ਕੀ ਟਾਈਮ ਹੋਇਆ ਹੈ?',
  'pa-kinne-da': 'ਇਹ ਕਿੰਨੇ ਦਾ ਹੈ?',
  'pa-mehnga': 'ਬਹੁਤ ਮਹਿੰਗਾ ਹੈ',
  'pa-ghatt-karo': 'ਥੋੜ੍ਹਾ ਘੱਟ ਕਰੋ',
  'pa-de-deyo': 'ਠੀਕ ਹੈ, ਦੇ ਦਿਓ',
};

// Hindi equivalents: [Hindi sentence, words that differ as [Punjabi, Hindi]].
// The lessons show each word pair once, the first time it appears, so comparisons don't repeat.
const hindi: Record<string, [string, [string, string][]]> = {
  'pa-main-busy': ['Main busy hoon', []],
  'pa-tu-free': ['Tum free ho?', [['ain', 'ho']]],
  'pa-call-kari': ['Mujhe call karna', [['kari', 'karna']]],
  'pa-ki-plan': ['Kya plan hai?', [['aa', 'hai']]],
  'pa-sorry-late': ['Sorry yaar, late ho gaya', []],
  'pa-tension-na': ['Tension mat lo', [['na', 'mat'], ['lai', 'lo']]],
  'pa-wait-kar': ['Main wait kar raha hoon', []],
  'pa-online-order': ['Online order kar lete hain', [['lainde', 'lete']]],
  'pa-sat-sri-akal': ['Namaste', []],
  'pa-ki-haal': ['Kya haal hai?', [['ki', 'kya']]],
  'pa-theek-haan': ['Main theek hoon', [['haan', 'hoon']]],
  'pa-tusi-kiven': ['Aap kaise ho?', [['tusi', 'aap'], ['kiven', 'kaise']]],
  'pa-haan-ji': ['Haan ji', []],
  'pa-nahi-ji': ['Nahi ji', []],
  'pa-shukriya': ['Shukriya', []],
  'pa-koi-gall-nahi': ['Koi baat nahi', [['gall', 'baat']]],
  'pa-vadhiya': ['Main badhiya hoon', [['vadhiya', 'badhiya']]],
  'pa-tusi-daso': ['Aap batao?', [['daso', 'batao']]],
  'pa-phir-milange': ['Phir milenge', [['milange', 'milenge']]],
  'pa-rab-rakha': ['Alvida', []],
  'pa-naam-ki': ['Aapka naam kya hai?', [['tuhada', 'aapka']]],
  'pa-mera-naam': ['Mera naam Simran hai', []],
  'pa-mil-ke-khushi': ['Aapse milkar khushi hui', [['tuhanu', 'aapse / aapko'], ['mil ke', 'milkar'], ['hoi', 'hui']]],
  'pa-mainu-vi': ['Mujhe bhi', [['mainu', 'mujhe'], ['vi', 'bhi']]],
  'pa-kitthon': ['Aap kahan se ho?', [['kitthon', 'kahan se']]],
  'pa-dilli-ton': ['Main Dilli se hoon', [['ton', 'se']]],
  'pa-ki-karde': ['Aap kya karte ho?', [['karde', 'karte']]],
  'pa-kamm-karda': ['Main kaam karta hoon', [['kamm', 'kaam'], ['karda', 'karta']]],
  'pa-sikh-reha': ['Main Punjabi seekh raha hoon', [['reha', 'raha']]],
  'pa-thodi-punjabi': ['Mujhe thodi Punjabi aati hai', [['aundi', 'aati']]],
  'pa-hauli-bolo': ['Dheere boliye', [['hauli', 'dheere']]],
  'pa-samajh-nahi': ['Mujhe samajh nahi aaya', []],
  'pa-chaah': ['Chai piyoge?', [['chaah', 'chai']]],
  'pa-zaroor': ['Haan ji, zaroor', []],
  'pa-paani': ['Thoda paani do', [['deyo', 'do / dijiye']]],
  'pa-bas-hor-nahi': ['Bas, aur nahi', [['hor', 'aur']]],
  'pa-bhukh': ['Mujhe bhookh lagi hai', []],
  'pa-roti-kha-lao': ['Khana kha lo', [['roti (meal)', 'khana']]],
  'pa-swaad': ['Khana bahut swaadisht hai', [['swaad', 'swaadisht']]],
  'pa-hor-chahida': ['Mujhe aur chahiye', [['chahida', 'chahiye']]],
  'pa-ki-gall': ['Kya baat hai?', []],
  'pa-sab-theek': ['Sab theek hai', []],
  'pa-ki-kar-rahe': ['Kya kar rahe ho?', []],
  'pa-kujh-nahi': ['Kuch nahi', [['kujh', 'kuch']]],
  'pa-bahut-vadhiya': ['Bahut badhiya!', []],
  'pa-sachi': ['Sach mein?', [['sachi', 'sach mein']]],
  'pa-chal-koi-na': ['Chalo, koi baat nahi', []],
  'pa-samajh-gaya': ['Main samajh gaya', []],
  'pa-kitthe-ja': ['Kahan ja rahe ho?', [['kitthe', 'kahan']]],
  'pa-ghar-ja': ['Main ghar ja raha hoon', []],
  'pa-chaliye': ['Chalo, chalein', [['chaliye', 'chalein']]],
  'pa-ki-time': ['Kya time hua hai?', [['hoya', 'hua']]],
  'pa-kinne-da': ['Yeh kitne ka hai?', [['eh', 'yeh'], ['kinne da', 'kitne ka']]],
  'pa-mehnga': ['Bahut mehnga hai', []],
  'pa-ghatt-karo': ['Thoda kam karo', [['ghatt', 'kam']]],
  'pa-de-deyo': ['Theek hai, de do', []],
};

export const punjabi: Course = {
  languageId: 'pa',
  languageName: 'Punjabi',
  nativeName: 'Punjabi',
  flag: '🌾',
  available: true,
  praise: ['Bahut vadhiya!', 'Shabaash!', 'Balle balle!'],
  voiceSample: { text: 'Sat Sri Akal ji, ki haal aa? Main Punjabi sikh reha haan.' },
  translateExample: 'Ki haal aa?',
  handbook,
  dialogues,
  tips: [
    '"Ji" makes anything polite. "Haan ji" = yes, "Nahi ji" = no.',
    '"Tusi" is the respectful "you". Use it with elders and new people.',
    'Some verbs change for men and women: "karda" (m) / "kardi" (f).',
    'Spelling in romanized Punjabi is flexible. "Kiven" and "kiwen" are both fine.',
  ],
  hiPatterns: [
    { when: 'haan', text: 'Careful: "haan" also means "yes". At the end of a sentence after "main", it means "am".' },
    { when: 'tusi', text: 'Pattern: Hindi "aap" is "tusi" in Punjabi, and "aapka" (your) is "tuhada".' },
    { when: 'karde', text: 'Pattern: many Hindi verbs with "t" use "d" in Punjabi. karta ➜ karda, karte ➜ karde.' },
    { when: 'mainu', text: 'Pattern: Hindi "mujhe" (to me) is "mainu". Mujhe bhookh lagi hai ➜ Mainu bhukh laggi hai.' },
    { when: 'reha', text: 'Pattern: the "-ing" helper "raha" becomes "reha" in Punjabi (women: "rahi" in both).' },
    { when: 'kitthe', text: 'Pattern: Hindi "kahan" (where) is "kitthe"; "kahan se" (from where) is "kitthon".' },
  ],
  units: [
    {
      id: 'greetings',
      title: 'Greetings',
      emoji: '👋',
      description: 'Say hello, ask how someone is, and say bye.',
      lessons: [
        {
          id: 'greetings-1',
          title: 'Saying hello',
          phrases: [
            p('sat-sri-akal', 'Sat Sri Akal', 'Hello', {
              enAlt: ['Hi', 'Greetings'],
              alt: ['Sat Shri Akal', 'Sat Sri Akaal'],
              words: [['Sat', 'truth'], ['Sri', 'great'], ['Akal', 'timeless one']],
              note: 'The most common Punjabi greeting. Works any time of day, and for goodbye too.',
            }),
            p('ki-haal', 'Ki haal hai?', 'How are you?', {
              enAlt: ["How's it going?", 'How are things?'],
              alt: ['Kee haal hai', 'Ki hal hai', 'Ki haal ae'],
              words: [['Ki', 'what'], ['haal', 'condition'], ['hai', 'is']],
              note: 'Casual and friendly. Great with friends and people your age.',
            }),
            p('theek-haan', 'Main theek haan', "I'm fine", {
              enAlt: ['I am fine', "I'm good", 'I am good', "I'm okay"],
              alt: ['Mai theek haan', 'Main thik haan', 'Main theek aan', 'Main theek han'],
              words: [['Main', 'I'], ['theek', 'fine'], ['haan', 'am']],
            }),
            p('tusi-kiven', 'Tusi kiven ho?', 'How are you? (polite)', {
              enAlt: ['How are you?', 'How are you'],
              alt: ['Tusi kiwen ho', 'Tussi kiven ho', 'Tusin kiven ho', 'Tusi kive ho'],
              words: [['Tusi', 'you (respectful)'], ['kiven', 'how'], ['ho', 'are']],
              note: '"Tusi" is the respectful "you". Use this with elders or people you just met.',
            }),
          ],
        },
        {
          id: 'greetings-2',
          title: 'Polite basics',
          phrases: [
            p('haan-ji', 'Haan ji', 'Yes', {
              enAlt: ['Yes please', 'Yes sir', "Yes ma'am"],
              alt: ['Haanji', 'Han ji', 'Ha ji'],
              words: [['Haan', 'yes'], ['ji', '(respect word)']],
              note: 'Adding "ji" makes almost anything sound polite.',
            }),
            p('nahi-ji', 'Nahi ji', 'No', {
              enAlt: ['No thanks', 'No sir'],
              alt: ['Nahin ji', 'Nai ji', 'Nahi'],
              words: [['Nahi', 'no'], ['ji', '(respect word)']],
            }),
            p('shukriya', 'Shukriya', 'Thank you', {
              enAlt: ['Thanks'],
              alt: ['Shukria', 'Shukriyaa'],
              note: '"Dhanvaad" also means thank you, and sounds a bit more formal.',
            }),
            p('koi-gall-nahi', 'Koi gall nahi', 'No problem', {
              enAlt: ["It's okay", 'Never mind', 'No worries', "It's fine"],
              alt: ['Koi gal nahi', 'Koi gall nai', 'Koi gal nai'],
              words: [['Koi', 'any'], ['gall', 'matter'], ['nahi', 'not']],
            }),
          ],
        },
        {
          id: 'greetings-3',
          title: 'Chatting and saying bye',
          phrases: [
            p('vadhiya', 'Main vadhiya haan', "I'm great", {
              enAlt: ['I am great', "I'm doing great", "I'm very well"],
              alt: ['Main wadhiya haan', 'Main vadia haan', 'Mai vadhiya haan'],
              words: [['Main', 'I'], ['vadhiya', 'great'], ['haan', 'am']],
            }),
            p('tusi-daso', 'Tusi daso?', 'And you?', {
              enAlt: ['How about you?', 'What about you?'],
              alt: ['Tusi dasso', 'Tussi daso'],
              words: [['Tusi', 'you'], ['daso', 'tell']],
              note: 'Literally "you tell". A friendly way to bounce the question back.',
            }),
            p('phir-milange', 'Phir milange', 'See you again', {
              enAlt: ['See you later', 'See you', 'We will meet again'],
              alt: ['Fir milange', 'Phir milaange'],
              words: [['Phir', 'again'], ['milange', 'will meet']],
            }),
            p('rab-rakha', 'Rab rakha', 'Goodbye', {
              enAlt: ['Bye', 'Take care', 'God bless'],
              alt: ['Rabb rakha', 'Rab raakha'],
              words: [['Rab', 'God'], ['rakha', 'protector']],
              note: 'Literally "God is your protector". A warm way to say bye.',
            }),
          ],
        },
      ],
    },
    {
      id: 'about-me',
      title: 'About me',
      emoji: '🙋',
      description: 'Names, where you are from, and what you do.',
      lessons: [
        {
          id: 'about-me-1',
          title: 'Names',
          phrases: [
            p('naam-ki', 'Tuhada naam ki hai?', 'What is your name?', {
              enAlt: ["What's your name?"],
              alt: ['Tuhaada naam ki hai', 'Tuhada naa ki hai', 'Tuhada naam ki ae'],
              words: [['Tuhada', 'your'], ['naam', 'name'], ['ki', 'what'], ['hai', 'is']],
            }),
            p('mera-naam', 'Mera naam Simran hai', 'My name is Simran', {
              alt: ['Mera naa Simran hai'],
              words: [['Mera', 'my'], ['naam', 'name'], ['hai', 'is']],
              note: 'Swap "Simran" for your own name when you use it for real.',
            }),
            p('mil-ke-khushi', 'Tuhanu mil ke khushi hoi', 'Nice to meet you', {
              enAlt: ['Pleased to meet you', 'Glad to meet you', 'Happy to meet you'],
              alt: ['Tuhanu mil ke khushi hoyi', 'Tuhanu mil ke khushi hui', 'Tuhanu milke khushi hoi'],
              words: [['Tuhanu', 'you'], ['mil ke', 'meeting'], ['khushi', 'happiness'], ['hoi', 'happened']],
            }),
            p('mainu-vi', 'Mainu vi', 'Me too', {
              enAlt: ['Same here', 'Me as well'],
              alt: ['Menu vi', 'Mainu v'],
              words: [['Mainu', 'to me'], ['vi', 'also']],
              note: 'Reply with this when someone says it was nice to meet you.',
            }),
          ],
        },
        {
          id: 'about-me-2',
          title: 'Where from, what you do',
          phrases: [
            p('kitthon', 'Tusi kitthon ho?', 'Where are you from?', {
              alt: ['Tusi kithon ho', 'Tusi kitho ho', 'Tussi kitthon ho'],
              words: [['Tusi', 'you'], ['kitthon', 'from where'], ['ho', 'are']],
            }),
            p('dilli-ton', 'Main Dilli ton haan', 'I am from Delhi', {
              enAlt: ["I'm from Delhi"],
              alt: ['Main Dilli toh haan', 'Main Dilli ton aan', 'Main Dilli to haan'],
              words: [['Main', 'I'], ['Dilli', 'Delhi'], ['ton', 'from'], ['haan', 'am']],
            }),
            p('ki-karde', 'Tusi ki karde ho?', 'What do you do?', {
              enAlt: ['What do you do for work?', 'What work do you do?'],
              alt: ['Tussi ki karde ho', 'Tusi ki karde o'],
              words: [['Tusi', 'you'], ['ki', 'what'], ['karde', 'do'], ['ho', 'are']],
            }),
            p('kamm-karda', 'Main kamm karda haan', 'I work', {
              enAlt: ['I have a job', 'I do work'],
              alt: ['Main kamm kardi haan', 'Main kam karda haan', 'Main kam kardi haan'],
              words: [['Main', 'I'], ['kamm', 'work'], ['karda', 'do (male)'], ['haan', 'am']],
              note: 'Women say "kardi": Main kamm kardi haan.',
            }),
          ],
        },
        {
          id: 'about-me-3',
          title: 'Learning Punjabi',
          phrases: [
            p('sikh-reha', 'Main Punjabi sikh reha haan', 'I am learning Punjabi', {
              enAlt: ["I'm learning Punjabi"],
              alt: ['Main Punjabi sikh rahi haan', 'Main Punjabi sikh riha haan', 'Main Punjabi seekh reha haan'],
              words: [['Main', 'I'], ['sikh', 'learn'], ['reha', '-ing (male)'], ['haan', 'am']],
              note: 'Women say "rahi": Main Punjabi sikh rahi haan.',
            }),
            p('thodi-punjabi', 'Mainu thodi Punjabi aundi hai', 'I know a little Punjabi', {
              enAlt: ['I speak a little Punjabi'],
              alt: ['Mainu thori Punjabi aundi hai', 'Menu thodi Punjabi aundi hai', 'Mainu thodi Punjabi aundi ae'],
              words: [['Mainu', 'to me'], ['thodi', 'a little'], ['aundi hai', 'comes']],
              note: 'Literally "a little Punjabi comes to me".',
            }),
            p('hauli-bolo', 'Hauli bolo ji', 'Please speak slowly', {
              enAlt: ['Speak slowly please', 'Speak slowly', 'Slowly please'],
              alt: ['Hauli boleyo ji', 'Hauli bolo', 'Holi bolo ji'],
              words: [['Hauli', 'slowly'], ['bolo', 'speak'], ['ji', '(polite)']],
            }),
            p('samajh-nahi', 'Mainu samajh nahi aayi', "I didn't understand", {
              enAlt: ["I don't understand", 'I did not understand'],
              alt: ['Mainu samajh nahi aai', 'Mainu samajh nai aayi', 'Menu samajh nahi aayi', 'Mainu samaj nahi aayi'],
              words: [['Mainu', 'to me'], ['samajh', 'understanding'], ['nahi', 'not'], ['aayi', 'came']],
              note: 'Literally "understanding didn\'t come to me".',
            }),
          ],
        },
      ],
    },
    {
      id: 'chai-food',
      title: 'Chai & food',
      emoji: '☕',
      description: 'Tea, water, hunger, and complimenting the cook.',
      lessons: [
        {
          id: 'chai-food-1',
          title: 'Chai time',
          phrases: [
            p('chaah', 'Chaah peeoge?', 'Will you have tea?', {
              enAlt: ['Would you like tea?', 'Will you drink tea?', 'Want some tea?'],
              alt: ['Chah peeoge', 'Chaa peeoge', 'Chaah pioge', 'Chah pioge'],
              words: [['Chaah', 'tea'], ['peeoge', 'will you drink']],
              note: 'In Punjabi, tea is "chaah".',
            }),
            p('zaroor', 'Haan ji, zaroor', 'Yes, sure', {
              enAlt: ['Yes, of course', 'Yes, definitely', 'Sure'],
              alt: ['Haan ji, jaroor', 'Haanji zaroor', 'Haan ji zarur'],
              words: [['Haan ji', 'yes'], ['zaroor', 'surely']],
            }),
            p('paani', 'Thoda paani deyo', 'Please give me some water', {
              enAlt: ['Some water please', 'Give me some water please', 'A little water please'],
              alt: ['Thoda pani deyo', 'Thoda paani dio', 'Thoda paani de deyo'],
              words: [['Thoda', 'a little'], ['paani', 'water'], ['deyo', 'give (polite)']],
            }),
            p('bas-hor-nahi', 'Bas, hor nahi', "That's enough, no more", {
              enAlt: ['Enough, no more', 'No more, thanks'],
              alt: ['Bas hor nahi', 'Bas, hor nai'],
              words: [['Bas', 'enough'], ['hor', 'more'], ['nahi', 'no']],
              note: 'You will need this when an aunty keeps refilling your plate.',
            }),
          ],
        },
        {
          id: 'chai-food-2',
          title: 'At the table',
          phrases: [
            p('bhukh', 'Mainu bhukh laggi hai', "I'm hungry", {
              enAlt: ['I am hungry'],
              alt: ['Mainu bhukh lagi hai', 'Menu bhukh laggi hai', 'Mainu bhuk laggi hai'],
              words: [['Mainu', 'to me'], ['bhukh', 'hunger'], ['laggi hai', 'has struck']],
              note: 'Literally "hunger has struck me".',
            }),
            p('roti-kha-lao', 'Roti kha lao', 'Come eat', {
              enAlt: ['Have food', 'Come and eat', 'Eat food', 'Come have food'],
              alt: ['Roti kha lo', 'Roti kha laao'],
              words: [['Roti', 'meal'], ['kha lao', 'eat']],
              note: '"Roti" often just means "a meal", not only bread.',
            }),
            p('swaad', 'Khaana bahut swaad hai', 'The food is very tasty', {
              enAlt: ['The food is delicious', 'The food is really tasty', 'Food is very tasty'],
              alt: ['Khana bahut swaad hai', 'Khana bahut sawaad hai', 'Khaana bahut swad hai'],
              words: [['Khaana', 'food'], ['bahut', 'very'], ['swaad', 'tasty']],
            }),
            p('hor-chahida', 'Mainu hor chahida hai', 'I want more', {
              enAlt: ['I need more', "I'd like more", 'I want some more'],
              alt: ['Mainu hor chaida hai', 'Menu hor chahida hai', 'Mainu hor chaahida hai'],
              words: [['Mainu', 'to me'], ['hor', 'more'], ['chahida hai', 'is needed']],
            }),
          ],
        },
      ],
    },
    {
      id: 'chit-chat',
      title: 'Chit-chat',
      emoji: '💬',
      description: "What's up, reactions, and keeping a chat going.",
      lessons: [
        {
          id: 'chit-chat-1',
          title: "What's up?",
          phrases: [
            p('ki-gall', 'Ki gall hai?', "What's the matter?", {
              enAlt: ["What's up?", 'What happened?'],
              alt: ['Ki gal hai', 'Ki gall ae'],
              words: [['Ki', 'what'], ['gall', 'matter'], ['hai', 'is']],
            }),
            p('sab-theek', 'Sab theek hai', 'Everything is fine', {
              enAlt: ['All good', 'Everything is okay', "Everything's fine"],
              alt: ['Sab thik hai', 'Sab theek ae'],
              words: [['Sab', 'everything'], ['theek', 'fine'], ['hai', 'is']],
            }),
            p('ki-kar-rahe', 'Ki kar rahe ho?', 'What are you doing?', {
              enAlt: ['What are you up to?'],
              alt: ['Ki kar rahe o', 'Ki kar rahe ho ji'],
              words: [['Ki', 'what'], ['kar rahe', 'doing'], ['ho', 'are']],
            }),
            p('kujh-nahi', 'Kujh nahi', 'Nothing', {
              enAlt: ['Nothing much', 'Not much'],
              alt: ['Kuch nahi', 'Kujh nai', 'Kuj nahi'],
              words: [['Kujh', 'something'], ['nahi', 'not']],
              note: 'Punjabi says "kujh" where Hindi says "kuch".',
            }),
          ],
        },
        {
          id: 'chit-chat-2',
          title: 'Reactions',
          phrases: [
            p('bahut-vadhiya', 'Bahut vadhiya!', 'Awesome!', {
              enAlt: ['Very good!', 'Great!', 'Very nice!'],
              alt: ['Bahut wadhiya', 'Bohat vadhiya', 'Bahut vadia'],
              words: [['Bahut', 'very'], ['vadhiya', 'good']],
            }),
            p('sachi', 'Sachi?', 'Really?', {
              enAlt: ['Is it true?', 'Seriously?'],
              alt: ['Sach', 'Sachchi'],
              words: [['Sachi', 'truly']],
            }),
            p('chal-koi-na', 'Chal koi na', 'Oh well, never mind', {
              enAlt: ['Never mind', 'Oh well', "It's okay", 'No worries'],
              alt: ['Chal koi nahi', 'Chal koi ni'],
              words: [['Chal', 'come on'], ['koi na', "it's nothing"]],
              note: 'Very casual. Used to shrug something off.',
            }),
            p('samajh-gaya', 'Main samajh gaya', 'I understood', {
              enAlt: ['I understand', 'I got it', 'Got it'],
              alt: ['Main samajh gayi', 'Main samaj gaya', 'Mai samajh gaya'],
              words: [['Main', 'I'], ['samajh', 'understand'], ['gaya', '(done, male)']],
              note: 'Women say "gayi": Main samajh gayi.',
            }),
          ],
        },
      ],
    },
    {
      id: 'out-about',
      title: 'Out & about',
      emoji: '🛺',
      description: 'Going places, the time, and the market.',
      lessons: [
        {
          id: 'out-about-1',
          title: 'Going places',
          phrases: [
            p('kitthe-ja', 'Kitthe ja rahe ho?', 'Where are you going?', {
              alt: ['Kithe ja rahe ho', 'Kitthe ja rahe o'],
              words: [['Kitthe', 'where'], ['ja rahe', 'going'], ['ho', 'are']],
            }),
            p('ghar-ja', 'Main ghar ja reha haan', "I'm going home", {
              enAlt: ['I am going home'],
              alt: ['Main ghar ja rahi haan', 'Main ghar ja riha haan', 'Main ghar ja reha aan'],
              words: [['Main', 'I'], ['ghar', 'home'], ['ja reha', 'going (male)'], ['haan', 'am']],
              note: 'Women say "rahi": Main ghar ja rahi haan.',
            }),
            p('chaliye', 'Chalo, chaliye', "Come on, let's go", {
              enAlt: ["Let's go", "Okay, let's go"],
              alt: ['Chalo chaliye', 'Chalo, chaliyey'],
              words: [['Chalo', 'come on'], ['chaliye', "let's go"]],
            }),
            p('ki-time', 'Ki time hoya hai?', 'What time is it?', {
              alt: ['Ki time ho gaya hai', 'Ki time hoyea hai', 'Ki time hoya ae'],
              words: [['Ki', 'what'], ['time', 'time'], ['hoya hai', 'has become']],
            }),
          ],
        },
        {
          id: 'out-about-2',
          title: 'At the market',
          phrases: [
            p('kinne-da', 'Eh kinne da hai?', 'How much is this?', {
              enAlt: ['How much does this cost?', 'What does this cost?'],
              alt: ['Ih kinne da hai', 'Eh kitne da hai', 'Eh kinne da ae'],
              words: [['Eh', 'this'], ['kinne da', 'for how much'], ['hai', 'is']],
            }),
            p('mehnga', 'Bahut mehnga hai', "It's too expensive", {
              enAlt: ["It's very expensive", 'Too expensive', 'It is very expensive'],
              alt: ['Bahut mahinga hai', 'Bahut mehenga hai', 'Bohat mehnga hai'],
              words: [['Bahut', 'very'], ['mehnga', 'expensive'], ['hai', 'is']],
            }),
            p('ghatt-karo', 'Thoda ghatt karo', 'Lower it a little', {
              enAlt: ['Reduce it a little', 'Make it a bit cheaper', 'Lower the price a little'],
              alt: ['Thoda ghat karo', 'Thora ghatt karo'],
              words: [['Thoda', 'a little'], ['ghatt', 'less'], ['karo', 'do']],
              note: 'Handy for friendly bargaining at the market.',
            }),
            p('de-deyo', 'Theek hai, de deyo', 'Okay, give it to me', {
              enAlt: ["Okay, I'll take it", 'Fine, give it'],
              alt: ['Theek hai, de do', 'Thik hai de deyo', 'Theek hai de dio'],
              words: [['Theek hai', 'okay'], ['de deyo', 'give (it)']],
            }),
          ],
        },
      ],
    },
    {
      id: 'english-mix',
      title: 'Punjabi + English',
      emoji: '🔀',
      description: 'How people really talk: Punjabi with English words mixed in.',
      lessons: [
        {
          id: 'english-mix-1',
          title: 'Busy or free?',
          phrases: [
            p('main-busy', 'Main busy haan', "I'm busy", {
              enAlt: ['I am busy'],
              alt: ['Main busy aa', 'Mai busy haan'],
              words: [['Main', 'I'], ['busy', 'busy'], ['haan', 'am']],
              note: 'English words slot straight into Punjabi sentences. This is completely normal!',
            }),
            p('tu-free', 'Tu free ain?', 'Are you free? (casual)', {
              enAlt: ['Are you free?', 'Are you free'],
              alt: ['Tu free hain', 'Tu free aa', 'Tu free ae'],
              words: [['Tu', 'you (casual)'], ['free', 'free'], ['ain', 'are']],
              note: '"Tu" is for close friends and younger people. With elders say "Tusi free ho?"',
            }),
            p('call-kari', 'Mainu call kari', 'Give me a call', {
              enAlt: ['Call me', 'Give me a call later'],
              alt: ['Mainu call karin', 'Menu call kari', 'Mainu call kar'],
              words: [['Mainu', 'to me'], ['call kari', 'do a call']],
              note: 'Any English verb + "karna" works: call karna, wait karna, book karna.',
            }),
            p('ki-plan', 'Ki plan aa?', "What's the plan?", {
              enAlt: ['What is the plan?', "What's the plan"],
              alt: ['Ki plan hai', 'Kee plan aa'],
              words: [['Ki', 'what'], ['plan', 'plan'], ['aa', 'is']],
              note: 'Casual Punjabi often says "aa" instead of "hai".',
            }),
          ],
        },
        {
          id: 'english-mix-2',
          title: 'Real-life mix',
          phrases: [
            p('sorry-late', 'Sorry yaar, late ho gaya', 'Sorry man, I got late', {
              enAlt: ["Sorry, I'm late", 'Sorry man, I am late', 'Sorry, I got late'],
              alt: ['Sorry yaar, main late ho gaya', 'Sorry yaar late ho gya'],
              words: [['yaar', 'buddy'], ['late ho gaya', 'became late']],
            }),
            p('tension-na', 'Tension na lai', "Don't worry", {
              enAlt: ["Don't take tension", "Don't stress", 'Do not worry'],
              alt: ['Tension na lo', 'Tension na lay', 'Tension na lai'],
              words: [['Tension', 'stress'], ['na', "don't"], ['lai', 'take']],
            }),
            p('wait-kar', 'Main wait kar reha haan', "I'm waiting", {
              enAlt: ['I am waiting'],
              alt: ['Main wait kar rahi haan', 'Main wait kar riha haan', 'Main wait kar reha aa'],
              words: [['Main', 'I'], ['wait kar reha', 'waiting (male)'], ['haan', 'am']],
              note: 'Women say "rahi". The pure Punjabi word for wait is "udeek".',
            }),
            p('online-order', 'Online order kar lainde haan', "Let's order online", {
              enAlt: ["Let's just order online", 'We will order online'],
              alt: ['Chal, online order kar lainde haan', 'Online order kar lende haan', 'Online order kar lainde aa'],
              words: [['order kar', 'order'], ['lainde haan', "let's (we'll take)"]],
            }),
          ],
        },
      ],
    },
  ],
};

for (const u of punjabi.units) for (const l of u.lessons) for (const ph of l.phrases) {
  if (gurmukhi[ph.id]) ph.script = gurmukhi[ph.id];
  [ph.hi, ph.hiWords] = hindi[ph.id] ?? [undefined, undefined];
}
