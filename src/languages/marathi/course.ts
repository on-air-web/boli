import type { Course, Phrase } from '../types';
import { handbook } from './handbook';
import { dialogues } from './dialogues';

// Marathi v1: casual, everyday conversation in romanized text (Pune / Mumbai style).
// Romanization follows common everyday spelling: aa = long a, z = झ (zala, maza), n/l also cover ण/ळ.
// `alt` lists other spellings people commonly use, so typing answers are forgiving.

const p = (id: string, text: string, en: string, extra: Omit<Phrase, 'id' | 'text' | 'en'> = {}): Phrase => ({
  id: `mr-${id}`,
  text,
  en,
  ...extra,
});

// Devanagari for each phrase. Never shown; it only feeds the voice so it sounds natural.
const devanagari: Record<string, string> = {
  'mr-namaskar': 'नमस्कार',
  'mr-kasa-aahes': 'कसा आहेस?',
  'mr-mi-majet': 'मी मजेत आहे',
  'mr-tumhi-kase': 'तुम्ही कसे आहात?',
  'mr-ho': 'हो',
  'mr-nahi': 'नाही',
  'mr-dhanyavaad': 'धन्यवाद',
  'mr-kahi-harkat-nahi': 'काही हरकत नाही',
  'mr-ekdam-mast': 'एकदम मस्त',
  'mr-tu-sang': 'तू सांग?',
  'mr-parat-bhetu': 'परत भेटू',
  'mr-yeto': 'येतो मी',
  'mr-naav-kay': 'तुमचं नाव काय आहे?',
  'mr-maza-naav': 'माझं नाव रोहन आहे',
  'mr-bhetun-anand': 'तुम्हाला भेटून आनंद झाला',
  'mr-mala-pan': 'मला पण',
  'mr-kuthun': 'तुम्ही कुठून आहात?',
  'mr-punyacha': 'मी पुण्याचा आहे',
  'mr-kay-karta': 'तुम्ही काय करता?',
  'mr-job-karto': 'मी जॉब करतो',
  'mr-shikat-aahe': 'मी मराठी शिकत आहे',
  'mr-thodi-marathi': 'मला थोडी मराठी येते',
  'mr-halu-bola': 'जरा हळू बोला',
  'mr-samajla-nahi': 'मला समजलं नाही',
  'mr-chaha-ghenar': 'चहा घेणार का?',
  'mr-ho-nakki': 'हो, नक्की',
  'mr-pani-dya': 'थोडं पाणी द्या',
  'mr-bas-nako': 'बस, आता नको',
  'mr-bhook': 'मला भूक लागली आहे',
  'mr-jevan-karuya': 'चला, जेवण करूया',
  'mr-chhan-zalay': 'जेवण खूप छान झालंय',
  'mr-ajun-pahije': 'मला अजून पाहिजे',
  'mr-kay-zala': 'काय झालं?',
  'mr-sagla-thik': 'सगळं ठीक आहे',
  'mr-kay-chalu': 'काय चालू आहे?',
  'mr-kahi-nahi': 'काही नाही',
  'mr-khup-chhan': 'खूप छान!',
  'mr-khara': 'खरं?',
  'mr-jau-de': 'जाऊ दे',
  'mr-samajla': 'समजलं',
  'mr-kuthe-challa': 'कुठे चालला आहेस?',
  'mr-ghari-challo': 'मी घरी चाललो आहे',
  'mr-chala-jauya': 'चला, जाऊया',
  'mr-kiti-vajle': 'किती वाजले?',
  'mr-kitila': 'हे कितीला आहे?',
  'mr-mahag': 'खूप महाग आहे',
  'mr-kami-kara': 'जरा कमी करा',
  'mr-thik-dya': 'ठीक आहे, द्या',
  'mr-mi-busy': 'मी बिझी आहे',
  'mr-tu-free': 'तू फ्री आहेस का?',
  'mr-call-kar': 'मला कॉल कर',
  'mr-kay-plan': 'काय प्लॅन आहे?',
  'mr-sorry-late': 'सॉरी यार, लेट झालं',
  'mr-tension-nako': 'टेन्शन घेऊ नकोस',
  'mr-wait-karat': 'मी वेट करत आहे',
  'mr-online-order': 'ऑनलाइन ऑर्डर करूया',
};

// Hindi equivalents: [Hindi sentence, words that differ as [Marathi, Hindi]].
// The lessons show each word pair once, the first time it appears, so comparisons don't repeat.
const hindi: Record<string, [string, [string, string][]]> = {
  'mr-namaskar': ['Namaste', []],
  'mr-kasa-aahes': ['Kaise ho?', [['kasa', 'kaisa'], ['aahes', 'ho (you are)']]],
  'mr-mi-majet': ['Main mazze mein hoon', [['mi', 'main'], ['aahe', 'hoon / hai']]],
  'mr-tumhi-kase': ['Aap kaise hain?', [['tumhi', 'aap'], ['aahat', 'hain']]],
  'mr-ho': ['Haan', [['ho', 'haan']]],
  'mr-nahi': ['Nahi', []],
  'mr-dhanyavaad': ['Dhanyavaad', []],
  'mr-kahi-harkat-nahi': ['Koi baat nahi', [['kahi', 'koi / kuch'], ['harkat', 'aapatti (objection)']]],
  'mr-ekdam-mast': ['Ekdum mast', []],
  'mr-tu-sang': ['Tum batao?', [['tu', 'tum / tu'], ['sang', 'batao']]],
  'mr-parat-bhetu': ['Phir milenge', [['parat', 'phir'], ['bhetu', 'milenge']]],
  'mr-yeto': ['Chalta hoon', [['yeto', 'aata hoon (said for bye)']]],
  'mr-naav-kay': ['Aapka naam kya hai?', [['tumcha', 'aapka'], ['naav', 'naam'], ['kay', 'kya']]],
  'mr-maza-naav': ['Mera naam Rohan hai', [['maza', 'mera']]],
  'mr-bhetun-anand': ['Aapse milkar khushi hui', [['tumhala', 'aapko / aapse'], ['bhetun', 'milkar'], ['anand', 'khushi'], ['zala', 'hua / hui']]],
  'mr-mala-pan': ['Mujhe bhi', [['mala', 'mujhe'], ['pan', 'bhi']]],
  'mr-kuthun': ['Aap kahan se ho?', [['kuthun', 'kahan se']]],
  'mr-punyacha': ['Main Pune se hoon', [['punyacha', 'Pune ka (from Pune)']]],
  'mr-kay-karta': ['Aap kya karte ho?', [['karta', 'karte ho']]],
  'mr-job-karto': ['Main job karta hoon', [['karto', 'karta hoon']]],
  'mr-shikat-aahe': ['Main Marathi seekh raha hoon', [['shikat aahe', 'seekh raha hoon']]],
  'mr-thodi-marathi': ['Mujhe thodi Marathi aati hai', [['yete', 'aati hai']]],
  'mr-halu-bola': ['Zara dheere boliye', [['halu', 'dheere'], ['bola', 'boliye']]],
  'mr-samajla-nahi': ['Mujhe samajh nahi aaya', [['samajla', 'samajh aaya']]],
  'mr-chaha-ghenar': ['Chai loge?', [['chaha', 'chai'], ['ghenar', 'loge'], ['ka', 'kya (question word, at the end)']]],
  'mr-ho-nakki': ['Haan, zaroor', [['nakki', 'zaroor / pakka']]],
  'mr-pani-dya': ['Thoda paani dijiye', [['dya', 'dijiye / do']]],
  'mr-bas-nako': ['Bas, ab nahi', [['ata', 'ab'], ['nako', "nahi chahiye (don't want)"]]],
  'mr-bhook': ['Mujhe bhookh lagi hai', [['lagli', 'lagi']]],
  'mr-jevan-karuya': ['Chalo, khana khaate hain', [['jevan', 'khana (meal)'], ['karuya', "karte hain (let's do)"]]],
  'mr-chhan-zalay': ['Khana bahut achha bana hai', [['khup', 'bahut'], ['chhan', 'achha']]],
  'mr-ajun-pahije': ['Mujhe aur chahiye', [['ajun', 'aur'], ['pahije', 'chahiye']]],
  'mr-kay-zala': ['Kya hua?', []],
  'mr-sagla-thik': ['Sab theek hai', [['sagla', 'sab']]],
  'mr-kay-chalu': ['Kya chal raha hai?', [['chalu aahe', 'chal raha hai']]],
  'mr-kahi-nahi': ['Kuch nahi', []],
  'mr-khup-chhan': ['Bahut badhiya!', []],
  'mr-khara': ['Sach mein?', [['khara', 'sach']]],
  'mr-jau-de': ['Jaane do', [['jau de', 'jaane do']]],
  'mr-samajla': ['Samajh gaya', []],
  'mr-kuthe-challa': ['Kahan ja rahe ho?', [['kuthe', 'kahan'], ['challa aahes', 'ja rahe ho']]],
  'mr-ghari-challo': ['Main ghar ja raha hoon', [['ghari', 'ghar (to home)']]],
  'mr-chala-jauya': ['Chalo, chalte hain', [['jauya', "chalein (let's go)"]]],
  'mr-kiti-vajle': ['Kitne baje?', [['kiti', 'kitne'], ['vajle', 'baje']]],
  'mr-kitila': ['Yeh kitne ka hai?', [['he', 'yeh'], ['kitila', 'kitne ka']]],
  'mr-mahag': ['Bahut mehnga hai', [['mahag', 'mehnga']]],
  'mr-kami-kara': ['Thoda kam karo', [['jara', 'zara / thoda'], ['kami', 'kam']]],
  'mr-thik-dya': ['Theek hai, de do', []],
  'mr-mi-busy': ['Main busy hoon', []],
  'mr-tu-free': ['Tum free ho?', []],
  'mr-call-kar': ['Mujhe call karna', [['kar', 'karo / karna']]],
  'mr-kay-plan': ['Kya plan hai?', []],
  'mr-sorry-late': ['Sorry yaar, late ho gaya', []],
  'mr-tension-nako': ['Tension mat lo', [['gheu nakos', "mat lo (don't take)"]]],
  'mr-wait-karat': ['Main wait kar raha hoon', [['karat aahe', 'kar raha hoon']]],
  'mr-online-order': ['Online order karte hain', []],
};

export const marathi: Course = {
  languageId: 'mr',
  languageName: 'Marathi',
  nativeName: 'Marathi',
  flag: '🪔',
  available: true,
  praise: ['Khup chhan!', 'Ekdam bhari!', 'Shabbas!'],
  voiceSample: { text: 'Namaskar, kasa aahes?', script: 'नमस्कार, कसा आहेस?' },
  translateExample: 'Kasa aahes?',
  handbook,
  dialogues,
  tips: [
    '"Tumhi" is the respectful "you". Use it with elders and people you just met; "tu" is for friends.',
    'Put "ka" at the end to make a yes/no question: "Chaha ghenar ka?" (Will you have tea?)',
    'Some verbs change for men and women: "karto" (m) / "karte" (f), "yeto" / "yete".',
    'Spelling in romanized Marathi is flexible. "Maza" and "majha" are both fine.',
    '"Bara" and "thik aahe" both mean "okay". "Bara" sounds softer and more homely.',
  ],
  hiPatterns: [
    { when: 'aahe', text: 'Pattern: Hindi "hai / hoon" is "aahe". Mi ... aahe (I am), to ... aahe (he is), tumhi ... aahat (you are).' },
    { when: 'mala', text: 'Pattern: Hindi "mujhe" (to me) is "mala". Mujhe bhookh lagi hai ➜ Mala bhook lagli aahe.' },
    { when: 'tumcha', text: 'Pattern: "your / my" end in -cha: tumcha (your), maza (my), aapla (our). They change with the thing: maza bhau, mazi bahin.' },
    { when: 'ka', text: 'Pattern: Hindi starts a question with "kya"; Marathi puts "ka" at the end: Tum free ho? ➜ Tu free aahes ka?' },
    { when: 'nako', text: 'Pattern: "nako" means "don\'t want / don\'t". Hindi "mat karo" ➜ "karu nako".' },
    { when: 'karto', text: 'Pattern: Hindi "karta hoon" is one word in Marathi: "karto" (men) / "karte" (women).' },
    { when: 'kuthe', text: 'Pattern: Hindi "kahan" (where) is "kuthe"; "kahan se" (from where) is "kuthun".' },
  ],
  units: [
    {
      id: 'mr-greetings',
      title: 'Greetings',
      emoji: '👋',
      description: 'Say hello, ask how someone is, and say bye.',
      lessons: [
        {
          id: 'mr-greetings-1',
          title: 'Saying hello',
          phrases: [
            p('namaskar', 'Namaskar', 'Hello', {
              enAlt: ['Hi', 'Greetings', 'Namaste'],
              alt: ['Namaskaar', 'Namaste'],
              note: 'The everyday respectful greeting. With friends, "Hi" or "Kay re?" is just as common.',
            }),
            p('kasa-aahes', 'Kasa aahes?', 'How are you? (to a man)', {
              enAlt: ['How are you?', "How's it going?", 'How are you'],
              alt: ['Kasa ahes', 'Kasa aahe', 'Kasa aahes ka', 'Kashi aahes'],
              words: [['Kasa', 'how'], ['aahes', 'you are']],
              note: 'To a woman: "Kashi aahes?" Casual, for friends and people your age.',
            }),
            p('mi-majet', 'Mi majet aahe', "I'm doing well", {
              enAlt: ["I'm fine", "I'm good", 'I am fine', 'I am good', 'I am doing well'],
              alt: ['Mi mazet aahe', 'Mi majet ahe', 'Majet aahe'],
              words: [['Mi', 'I'], ['majet', 'happy, well'], ['aahe', 'am']],
              note: 'Also common: "Mi thik aahe" (I\'m okay) and "Ekdam mast" (totally great).',
            }),
            p('tumhi-kase', 'Tumhi kase aahat?', 'How are you? (polite)', {
              enAlt: ['How are you?', 'How are you'],
              alt: ['Tumhi kase ahat', 'Tumhi kase aahet', 'Aapan kase aahat'],
              words: [['Tumhi', 'you (respectful)'], ['kase', 'how'], ['aahat', 'are']],
              note: '"Tumhi" is the respectful "you". Use this with elders or people you just met.',
            }),
          ],
        },
        {
          id: 'mr-greetings-2',
          title: 'Polite basics',
          phrases: [
            p('ho', 'Ho', 'Yes', {
              enAlt: ['Yeah', 'Yes please'],
              alt: ['Hoy', 'Haan', 'Ho na'],
              note: '"Ho" is the Marathi yes. "Hoy" and "haan" are heard casually too.',
            }),
            p('nahi', 'Nahi', 'No', {
              enAlt: ['No thanks', 'Not'],
              alt: ['Naahi', 'Nai'],
              note: 'Say it with a long first "a": naa-hi.',
            }),
            p('dhanyavaad', 'Dhanyavaad', 'Thank you', {
              enAlt: ['Thanks'],
              alt: ['Dhanyawad', 'Dhanyavad', 'Thank you'],
              note: 'A bit formal. Friends just say "thank you" or "thanks".',
            }),
            p('kahi-harkat-nahi', 'Kahi harkat nahi', "No problem, I don't mind", {
              enAlt: ['No problem', "I don't mind", "It's okay", 'No issue'],
              alt: ['Kahi harkat naahi', 'Kahich harkat nahi'],
              words: [['Kahi', 'any'], ['harkat', 'objection'], ['nahi', 'not']],
            }),
          ],
        },
        {
          id: 'mr-greetings-3',
          title: 'Chatting and saying bye',
          phrases: [
            p('ekdam-mast', 'Ekdam mast', 'Totally great', {
              enAlt: ['Really great', 'Super good', "I'm great", 'All great'],
              alt: ['Ekdum mast', 'Ekdam masta'],
              words: [['Ekdam', 'totally'], ['mast', 'great']],
            }),
            p('tu-sang', 'Tu sang?', 'And you?', {
              enAlt: ['How about you?', 'What about you?', 'You tell me?'],
              alt: ['Tu saang', 'Tu sang na'],
              words: [['Tu', 'you (casual)'], ['sang', 'tell']],
              note: 'Literally "you tell". A friendly way to bounce the question back.',
            }),
            p('parat-bhetu', 'Parat bhetu', 'See you again', {
              enAlt: ['See you later', 'See you', 'We will meet again'],
              alt: ['Parat bhetoo', 'Punha bhetu'],
              words: [['Parat', 'again'], ['bhetu', "we'll meet"]],
            }),
            p('yeto', 'Yeto mi', 'Bye, I am off', {
              enAlt: ['Bye', 'I am leaving', "I'm off", 'Goodbye'],
              alt: ['Yeto', 'Mi yeto', 'Yete mi'],
              words: [['Yeto', "I'll come (back)"], ['mi', 'I']],
              note: 'Marathi says "I\'ll come" when leaving, never "I\'m going". Women say "Yete mi".',
            }),
          ],
        },
      ],
    },
    {
      id: 'mr-about-me',
      title: 'About me',
      emoji: '🙋',
      description: 'Names, where you are from, and what you do.',
      lessons: [
        {
          id: 'mr-about-me-1',
          title: 'Names',
          phrases: [
            p('naav-kay', 'Tumcha naav kay aahe?', "What's your name?", {
              enAlt: ['What is your name?', "What's your name"],
              alt: ['Tumcha nav kay aahe', 'Tumcha naav kay ahe', 'Tuza naav kay aahe'],
              words: [['Tumcha', 'your (polite)'], ['naav', 'name'], ['kay', 'what'], ['aahe', 'is']],
              note: 'With a friend: "Tuza naav kay?"',
            }),
            p('maza-naav', 'Maza naav Rohan aahe', 'My name is Rohan', {
              enAlt: ["I'm Rohan", 'I am Rohan'],
              alt: ['Majha naav Rohan aahe', 'Maza nav Rohan aahe', 'Maza naav Rohan ahe'],
              words: [['Maza', 'my'], ['naav', 'name'], ['Rohan', '(name)'], ['aahe', 'is']],
            }),
            p('bhetun-anand', 'Tumhala bhetun anand zala', 'Nice to meet you', {
              enAlt: ['Pleased to meet you', 'Happy to meet you', 'Glad to meet you'],
              alt: ['Tumhala bhetun aanand zala', 'Tumhala bhetun anand jhala', 'Bhetun anand zala'],
              words: [['Tumhala', 'to you'], ['bhetun', 'having met'], ['anand', 'joy'], ['zala', 'happened']],
            }),
            p('mala-pan', 'Mala pan', 'Me too', {
              enAlt: ['Same here', 'Likewise'],
              alt: ['Mala pann', 'Mala suddha'],
              words: [['Mala', 'to me'], ['pan', 'also']],
              note: '"Pan" means both "also" and "but". The context tells you which.',
            }),
          ],
        },
        {
          id: 'mr-about-me-2',
          title: 'Where from, what you do',
          phrases: [
            p('kuthun', 'Tumhi kuthun aahat?', 'Where are you from?', {
              enAlt: ['Where are you from', 'Where do you come from?'],
              alt: ['Tumhi kuthun ahat', 'Tu kuthun aahes'],
              words: [['Tumhi', 'you'], ['kuthun', 'from where'], ['aahat', 'are']],
            }),
            p('punyacha', 'Mi Punyacha aahe', "I'm from Pune", {
              enAlt: ['I am from Pune'],
              alt: ['Mi Punyachi aahe', 'Mi Puneacha aahe', 'Mi Punyacha ahe'],
              words: [['Mi', 'I'], ['Punyacha', 'of Pune'], ['aahe', 'am']],
              note: 'Women say "Punyachi". Try your own city: Mi Mumbaicha / Dillicha aahe.',
            }),
            p('kay-karta', 'Tumhi kay karta?', 'What do you do?', {
              enAlt: ['What do you do for work?', 'What is your job?'],
              alt: ['Tumhi kaay karta', 'Tu kay kartos'],
              words: [['Tumhi', 'you'], ['kay', 'what'], ['karta', 'do']],
            }),
            p('job-karto', 'Mi job karto', 'I have a job', {
              enAlt: ['I work', 'I do a job', 'I am working'],
              alt: ['Mi job karte', 'Mi naukri karto', 'Mi kaam karto'],
              words: [['Mi', 'I'], ['job', 'job'], ['karto', 'do (man)']],
              note: 'Women say "karte". English words like "job" are totally normal in Marathi.',
            }),
          ],
        },
        {
          id: 'mr-about-me-3',
          title: 'Learning Marathi',
          phrases: [
            p('shikat-aahe', 'Mi Marathi shikat aahe', "I'm learning Marathi", {
              enAlt: ['I am learning Marathi'],
              alt: ['Mi Marathi shikto aahe', 'Mi Marathi shikat ahe', 'Mi Marathi shiktoy'],
              words: [['Mi', 'I'], ['Marathi', 'Marathi'], ['shikat aahe', 'am learning']],
              note: '"-at aahe" is the "-ing" form, and it is the same for men and women.',
            }),
            p('thodi-marathi', 'Mala thodi Marathi yete', 'I know a little Marathi', {
              enAlt: ['I speak a little Marathi', 'I know some Marathi'],
              alt: ['Mala thodi Marathi yete na', 'Mala thodi thodi Marathi yete'],
              words: [['Mala', 'to me'], ['thodi', 'a little'], ['yete', 'comes']],
              note: 'Literally "a little Marathi comes to me", just like Hindi "aati hai".',
            }),
            p('halu-bola', 'Jara halu bola', 'Please speak slowly', {
              enAlt: ['Speak slowly please', 'Please talk slowly', 'Speak slowly'],
              alt: ['Jara halu bola na', 'Halu bola', 'Jara hallu bola'],
              words: [['Jara', 'a bit'], ['halu', 'slowly'], ['bola', 'speak (polite)']],
            }),
            p('samajla-nahi', 'Mala samajla nahi', "I didn't understand", {
              enAlt: ["I don't understand", 'I did not understand'],
              alt: ['Mala samajla naahi', 'Mala kalla nahi', 'Samajla nahi'],
              words: [['Mala', 'to me'], ['samajla', 'understood'], ['nahi', 'not']],
              note: '"Mala kalla nahi" means the same and is very common too.',
            }),
          ],
        },
      ],
    },
    {
      id: 'mr-chai-food',
      title: 'Chaha & food',
      emoji: '☕',
      description: 'Tea time, water, and eating together.',
      lessons: [
        {
          id: 'mr-chai-food-1',
          title: 'Chaha time',
          phrases: [
            p('chaha-ghenar', 'Chaha ghenar ka?', 'Will you have tea?', {
              enAlt: ['Would you like tea?', 'Do you want tea?', 'Tea?'],
              alt: ['Chaha ghenaar ka', 'Chaha ghena ka', 'Chaha pinar ka'],
              words: [['Chaha', 'tea'], ['ghenar', 'will take'], ['ka', '(question)']],
              note: 'In Marathi you "take" tea (ghene), you don\'t "drink" it.',
            }),
            p('ho-nakki', 'Ho, nakki', 'Yes, sure', {
              enAlt: ['Yes, of course', 'Sure', 'Definitely'],
              alt: ['Ho nakki', 'Haan nakki', 'Nakki'],
              words: [['Ho', 'yes'], ['nakki', 'surely']],
            }),
            p('pani-dya', 'Thoda pani dya', 'Some water please', {
              enAlt: ['Give me some water', 'Please give me some water', 'A little water please'],
              alt: ['Thoda paani dya', 'Thoda pani dya na', 'Pani dya'],
              words: [['Thoda', 'a little'], ['pani', 'water'], ['dya', 'give (polite)']],
            }),
            p('bas-nako', 'Bas, ata nako', "That's enough, no more", {
              enAlt: ['Enough, no more', "No more, that's enough", "That's enough"],
              alt: ['Bas, aata nako', 'Bas ata nako', 'Bas, nako'],
              words: [['Bas', 'enough'], ['ata', 'now'], ['nako', "don't want"]],
              note: 'Be ready: hosts will offer you more food at least three times!',
            }),
          ],
        },
        {
          id: 'mr-chai-food-2',
          title: 'At the table',
          phrases: [
            p('bhook', 'Mala bhook lagli aahe', "I'm hungry", {
              enAlt: ['I am hungry'],
              alt: ['Mala bhuk lagli aahe', 'Mala bhook lagliye', 'Mala bhook lagli ahe'],
              words: [['Mala', 'to me'], ['bhook', 'hunger'], ['lagli aahe', 'has struck']],
            }),
            p('jevan-karuya', 'Chala, jevan karuya', "Let's eat", {
              enAlt: ["Come on, let's eat", "Let's have food", "Let's have a meal"],
              alt: ['Chala jevan karuya', 'Chala, jevuya', 'Chal, jevan karuya'],
              words: [['Chala', 'come on'], ['jevan', 'meal'], ['karuya', "let's do"]],
            }),
            p('chhan-zalay', 'Jevan khup chhan zalay', 'The food is really good', {
              enAlt: ['The food is very good', 'The food is delicious', 'The food is great'],
              alt: ['Jevan khup chan zalay', 'Jevan khup chhan zala aahe', 'Jevan mast zalay'],
              words: [['Jevan', 'food'], ['khup', 'very'], ['chhan', 'nice'], ['zalay', 'has turned out']],
              note: 'Say this to whoever cooked. It makes their day.',
            }),
            p('ajun-pahije', 'Mala ajun pahije', 'I want more', {
              enAlt: ['I need more', 'I would like more', 'More please'],
              alt: ['Mala aajun pahije', 'Mala ajun hava', 'Ajun pahije'],
              words: [['Mala', 'to me'], ['ajun', 'more'], ['pahije', 'is needed']],
            }),
          ],
        },
      ],
    },
    {
      id: 'mr-chit-chat',
      title: 'Chit-chat',
      emoji: '💬',
      description: "What's up, reactions, and keeping a chat going.",
      lessons: [
        {
          id: 'mr-chit-chat-1',
          title: "What's up?",
          phrases: [
            p('kay-zala', 'Kay zala?', 'What happened?', {
              enAlt: ["What's wrong?", "What's the matter?"],
              alt: ['Kay jhala', 'Kaay zala', 'Kay zala re'],
              words: [['Kay', 'what'], ['zala', 'happened']],
            }),
            p('sagla-thik', 'Sagla thik aahe', 'Everything is fine', {
              enAlt: ["Everything's fine", 'All is well', "It's all good"],
              alt: ['Sagla theek aahe', 'Sagla thik ahe', 'Sagla barobar aahe'],
              words: [['Sagla', 'everything'], ['thik', 'fine'], ['aahe', 'is']],
            }),
            p('kay-chalu', 'Kay chalu aahe?', "What's going on?", {
              enAlt: ["What's up?", 'What are you up to?', "What's happening?"],
              alt: ['Kay chalu ahe', 'Kay chaluye', 'Kay chalay'],
              words: [['Kay', 'what'], ['chalu aahe', 'is going on']],
            }),
            p('kahi-nahi', 'Kahi nahi', 'Nothing much', {
              enAlt: ['Nothing', 'Not much'],
              alt: ['Kahi naahi', 'Kahich nahi', 'Kai nahi'],
              words: [['Kahi', 'anything'], ['nahi', 'not']],
            }),
          ],
        },
        {
          id: 'mr-chit-chat-2',
          title: 'Reactions',
          phrases: [
            p('khup-chhan', 'Khup chhan!', 'Very nice!', {
              enAlt: ['Great!', 'Wonderful!', 'Very good!'],
              alt: ['Khup chan', 'Khoop chhan', 'Mast'],
              words: [['Khup', 'very'], ['chhan', 'nice']],
            }),
            p('khara', 'Khara?', 'Really?', {
              enAlt: ['Is it true?', 'Seriously?'],
              alt: ['Kharach', 'Khara ka', 'Kharach ka'],
              note: '"Kharach?" adds extra surprise: "No way, really?"',
            }),
            p('jau-de', 'Jau de', 'Let it go', {
              enAlt: ['Forget it', 'Leave it', 'Never mind'],
              alt: ['Jaau de', 'Jaude', 'Sod de'],
              words: [['Jau', 'to go'], ['de', 'let']],
            }),
            p('samajla', 'Samajla', 'Got it', {
              enAlt: ['I understood', 'Understood', 'I get it'],
              alt: ['Samajla mala', 'Kalla', 'Samajle'],
              note: 'Also: "Kalla" (got it). Both are the same for men and women.',
            }),
          ],
        },
      ],
    },
    {
      id: 'mr-out-about',
      title: 'Out & about',
      emoji: '🛺',
      description: 'Going places, time, and shopping at the market.',
      lessons: [
        {
          id: 'mr-out-about-1',
          title: 'Going places',
          phrases: [
            p('kuthe-challa', 'Kuthe challa aahes?', 'Where are you going?', {
              enAlt: ['Where are you off to?', 'Where are you headed?'],
              alt: ['Kuthe challas', 'Kuthe chalali aahes', 'Kuthe jaat aahes'],
              words: [['Kuthe', 'where'], ['challa aahes', 'are you going (to a man)']],
              note: 'To a woman: "Kuthe challi aahes?" Friends shorten it to "Kuthe challas?"',
            }),
            p('ghari-challo', 'Mi ghari challo aahe', "I'm going home", {
              enAlt: ['I am going home', "I'm heading home"],
              alt: ['Mi ghari challoy', 'Mi ghari challe aahe', 'Mi ghari jaat aahe'],
              words: [['Mi', 'I'], ['ghari', 'to home'], ['challo aahe', 'am going (man)']],
              note: 'Women say "challe aahe". "Ghari" means "(to / at) home".',
            }),
            p('chala-jauya', 'Chala, jauya', "Come on, let's go", {
              enAlt: ["Let's go", "Come on, let's go"],
              alt: ['Chala jauya', 'Chal, jauya', 'Chala nighuya'],
              words: [['Chala', 'come on'], ['jauya', "let's go"]],
            }),
            p('kiti-vajle', 'Kiti vajle?', 'What time is it?', {
              enAlt: ["What's the time?", 'What time is it'],
              alt: ['Kiti vaajle', 'Kiti wajle', 'Kiti vajlet'],
              words: [['Kiti', 'how many'], ['vajle', 'struck (o’clock)']],
            }),
          ],
        },
        {
          id: 'mr-out-about-2',
          title: 'At the market',
          phrases: [
            p('kitila', 'He kitila aahe?', 'How much is this?', {
              enAlt: ['How much does this cost?', "What's the price?", 'How much is it?'],
              alt: ['He kevdhyala aahe', 'He kitila ahe', 'Kitila aahe he'],
              words: [['He', 'this'], ['kitila', 'for how much'], ['aahe', 'is']],
              note: 'In Pune you will also hear "He kevdhyala?"',
            }),
            p('mahag', 'Khup mahag aahe', "It's too expensive", {
              enAlt: ['Very expensive', "It's very expensive", 'Too expensive'],
              alt: ['Khup mahaag aahe', 'Khupach mahag aahe', 'Khup mahag ahe'],
              words: [['Khup', 'very'], ['mahag', 'expensive'], ['aahe', 'is']],
            }),
            p('kami-kara', 'Jara kami kara', 'Lower it a bit', {
              enAlt: ['Reduce it a little', 'Give me a discount', 'Make it a bit less'],
              alt: ['Jara kami kara na', 'Thoda kami kara', 'Kami kara'],
              words: [['Jara', 'a bit'], ['kami', 'less'], ['kara', 'do (polite)']],
            }),
            p('thik-dya', 'Thik aahe, dya', 'Okay, give it to me', {
              enAlt: ["Okay, I'll take it", 'Fine, give it', 'Okay, give it'],
              alt: ['Theek aahe, dya', 'Bara, dya', 'Thik ahe dya'],
              words: [['Thik aahe', 'okay'], ['dya', 'give (polite)']],
            }),
          ],
        },
      ],
    },
    {
      id: 'mr-english-mix',
      title: 'Marathi + English',
      emoji: '🔀',
      description: 'How people really talk: Marathi with English words mixed in.',
      lessons: [
        {
          id: 'mr-english-mix-1',
          title: 'Busy or free?',
          phrases: [
            p('mi-busy', 'Mi busy aahe', "I'm busy", {
              enAlt: ['I am busy'],
              alt: ['Mi busy ahe', 'Mi busy aahe re'],
              words: [['Mi', 'I'], ['busy', 'busy'], ['aahe', 'am']],
              note: 'English words slot straight into Marathi sentences. This is completely normal!',
            }),
            p('tu-free', 'Tu free aahes ka?', 'Are you free?', {
              enAlt: ['Are you free', 'You free?'],
              alt: ['Tu free ahes ka', 'Free aahes ka', 'Tu free aahes'],
              words: [['Tu', 'you (casual)'], ['free', 'free'], ['aahes', 'are'], ['ka', '(question)']],
              note: 'With elders: "Tumhi free aahat ka?"',
            }),
            p('call-kar', 'Mala call kar', 'Give me a call', {
              enAlt: ['Call me', 'Give me a call later'],
              alt: ['Mala call kar na', 'Mala phone kar', 'Mala call kara'],
              words: [['Mala', 'to me'], ['call kar', 'do a call']],
              note: 'Any English verb + "kar" works: wait kar, book kar, check kar.',
            }),
            p('kay-plan', 'Kay plan aahe?', "What's the plan?", {
              enAlt: ['What is the plan?', "What's the plan"],
              alt: ['Kay plan ahe', 'Kay planning aahe', 'Kay plan'],
              words: [['Kay', 'what'], ['plan', 'plan'], ['aahe', 'is']],
            }),
          ],
        },
        {
          id: 'mr-english-mix-2',
          title: 'Real-life mix',
          phrases: [
            p('sorry-late', 'Sorry yaar, late zala', 'Sorry man, I got late', {
              enAlt: ["Sorry, I'm late", 'Sorry, I got late', 'Sorry man, I am late'],
              alt: ['Sorry yaar, mala late zala', 'Sorry yaar late jhala', 'Sorry re, late zala'],
              words: [['yaar', 'buddy'], ['late zala', 'got late']],
            }),
            p('tension-nako', 'Tension gheu nakos', "Don't worry", {
              enAlt: ["Don't take tension", "Don't stress", 'Do not worry'],
              alt: ['Tension nako gheu', 'Tension gheu nako', 'Tension nako re'],
              words: [['Tension', 'stress'], ['gheu', 'take'], ['nakos', "don't (you)"]],
            }),
            p('wait-karat', 'Mi wait karat aahe', "I'm waiting", {
              enAlt: ['I am waiting'],
              alt: ['Mi wait kartoy', 'Mi wait karat ahe', 'Mi vaat baghat aahe'],
              words: [['Mi', 'I'], ['wait karat aahe', 'am waiting']],
              note: 'The pure Marathi way is "Mi vaat baghat aahe" (I am watching the road).',
            }),
            p('online-order', 'Online order karuya', "Let's order online", {
              enAlt: ["Let's just order online", 'We will order online'],
              alt: ['Chal, online order karuya', 'Online order karu', 'Online order karuyat'],
              words: [['order', 'order'], ['karuya', "let's do"]],
            }),
          ],
        },
      ],
    },
  ],
};

for (const u of marathi.units) for (const l of u.lessons) for (const ph of l.phrases) {
  if (devanagari[ph.id]) ph.script = devanagari[ph.id];
  [ph.hi, ph.hiWords] = hindi[ph.id] ?? [undefined, undefined];
}
