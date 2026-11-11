import type { Course, Phrase } from '../types';
import { handbook } from './handbook';
import { dialogues } from './dialogues';

// Bengali v1: casual, everyday Kolkata-style Bangla in romanized text.
// Romanization follows common everyday spelling: a = আ, o = the "o" sound (inherent vowel or ও),
// sh = শ/স, chh = ছ, j = জ/য. `alt` lists other spellings people commonly use.

const p = (id: string, text: string, en: string, extra: Omit<Phrase, 'id' | 'text' | 'en'> = {}): Phrase => ({
  id: `bn-${id}`,
  text,
  en,
  ...extra,
});

// Bengali script for each phrase. Never shown; it only feeds the voice so it sounds natural.
const bangla: Record<string, string> = {
  'bn-nomoskar': 'নমস্কার',
  'bn-kemon-acho': 'কেমন আছো?',
  'bn-bhalo-achi': 'আমি ভালো আছি',
  'bn-apni-kemon': 'আপনি কেমন আছেন?',
  'bn-hyan': 'হ্যাঁ',
  'bn-na': 'না',
  'bn-dhonnobad': 'ধন্যবাদ',
  'bn-kono-byapar-na': 'কোনো ব্যাপার না',
  'bn-darun': 'দারুণ!',
  'bn-tumi-bolo': 'তুমি বলো?',
  'bn-abar-dekha': 'আবার দেখা হবে',
  'bn-ashchhi': 'আসছি',
  'bn-apnar-naam': 'আপনার নাম কী?',
  'bn-amar-naam': 'আমার নাম রোহন',
  'bn-alap': 'আপনার সাথে আলাপ করে ভালো লাগলো',
  'bn-amio': 'আমিও',
  'bn-kothakar': 'আপনি কোথাকার?',
  'bn-kolkatar': 'আমি কলকাতার',
  'bn-ki-koren': 'আপনি কী করেন?',
  'bn-chakri': 'আমি চাকরি করি',
  'bn-shikhchhi': 'আমি বাংলা শিখছি',
  'bn-ektu-bangla': 'আমি একটু একটু বাংলা বলতে পারি',
  'bn-aste-bolun': 'একটু আস্তে বলুন',
  'bn-bujhlam-na': 'বুঝলাম না',
  'bn-cha-khabe': 'চা খাবে?',
  'bn-hyan-nishchoi': 'হ্যাঁ, নিশ্চয়ই',
  'bn-jol-din': 'একটু জল দিন',
  'bn-ar-na': 'বাস, আর না',
  'bn-khide': 'আমার খিদে পেয়েছে',
  'bn-kheye-nii': 'চলো, খেয়ে নিই',
  'bn-ranna-darun': 'রান্নাটা দারুণ হয়েছে',
  'bn-aro-chai': 'আমার আরো চাই',
  'bn-ki-holo': 'কী হলো?',
  'bn-sob-thik': 'সব ঠিক আছে',
  'bn-ki-khobor': 'কী খবর?',
  'bn-kichhu-na': 'কিছু না',
  'bn-khub-bhalo': 'খুব ভালো!',
  'bn-sotti': 'সত্যি?',
  'bn-chhere-dao': 'ছেড়ে দাও',
  'bn-bujhechhi': 'বুঝেছি',
  'bn-kothay-jachchho': 'কোথায় যাচ্ছো?',
  'bn-bari-jachchhi': 'আমি বাড়ি যাচ্ছি',
  'bn-cholo-jai': 'চলো, যাই',
  'bn-kota-baje': 'কটা বাজে?',
  'bn-eta-koto': 'এটা কত?',
  'bn-khub-dam': 'খুব দাম',
  'bn-kom-korun': 'একটু কম করুন',
  'bn-thik-ache-din': 'ঠিক আছে, দিন',
  'bn-ami-busy': 'আমি বিজি আছি',
  'bn-tumi-free': 'তুমি ফ্রি আছো?',
  'bn-call-koro': 'আমাকে কল কোরো',
  'bn-ki-plan': 'কী প্ল্যান?',
  'bn-sorry-late': 'সরি, লেট হয়ে গেল',
  'bn-tension-nio-na': 'টেনশন নিও না',
  'bn-wait-korchhi': 'আমি ওয়েট করছি',
  'bn-online-order': 'চলো, অনলাইন অর্ডার করি',
};

// Hindi equivalents: [Hindi sentence, words that differ as [Bengali, Hindi]].
// The lessons show each word pair once, the first time it appears, so comparisons don't repeat.
const hindi: Record<string, [string, [string, string][]]> = {
  'bn-nomoskar': ['Namaste', []],
  'bn-kemon-acho': ['Kaise ho?', [['kemon', 'kaise'], ['acho', 'ho']]],
  'bn-bhalo-achi': ['Main achha hoon', [['ami', 'main'], ['bhalo', 'achha'], ['achi', 'hoon']]],
  'bn-apni-kemon': ['Aap kaise hain?', [['apni', 'aap'], ['achen', 'hain (polite)']]],
  'bn-hyan': ['Haan', []],
  'bn-na': ['Nahi', [['na', 'nahi']]],
  'bn-dhonnobad': ['Dhanyavaad', []],
  'bn-kono-byapar-na': ['Koi baat nahi', [['kono', 'koi'], ['byapar', 'baat (matter)']]],
  'bn-darun': ['Zabardast!', [['darun', 'zabardast / badhiya']]],
  'bn-tumi-bolo': ['Tum batao?', [['tumi', 'tum'], ['bolo', 'batao / bolo']]],
  'bn-abar-dekha': ['Phir milenge', [['abar', 'phir'], ['dekha hobe', 'milenge (lit. will be seen)']]],
  'bn-ashchhi': ['Chalta hoon', [['ashchhi', 'aa raha hoon (said for bye)']]],
  'bn-apnar-naam': ['Aapka naam kya hai?', [['apnar', 'aapka'], ['ki', 'kya']]],
  'bn-amar-naam': ['Mera naam Rohan hai', [['amar', 'mera']]],
  'bn-alap': ['Aapse milkar achha laga', [['sathe', 'saath / se'], ['alap kore', 'milkar (getting to know)'], ['laglo', 'laga']]],
  'bn-amio': ['Main bhi', [['amio', 'main bhi (-o = bhi)']]],
  'bn-kothakar': ['Aap kahan se ho?', [['kothakar', 'kahan ke / kahan se']]],
  'bn-kolkatar': ['Main Kolkata se hoon', [['kolkatar', 'Kolkata ka']]],
  'bn-ki-koren': ['Aap kya karte hain?', [['koren', 'karte hain (polite)']]],
  'bn-chakri': ['Main naukri karta hoon', [['chakri', 'naukri'], ['kori', 'karta hoon']]],
  'bn-shikhchhi': ['Main Bangla seekh raha hoon', [['shikhchhi', 'seekh raha hoon']]],
  'bn-ektu-bangla': ['Main thodi thodi Bangla bol sakta hoon', [['ektu', 'thoda'], ['bolte pari', 'bol sakta hoon']]],
  'bn-aste-bolun': ['Thoda dheere boliye', [['aste', 'dheere'], ['bolun', 'boliye']]],
  'bn-bujhlam-na': ['Samajh nahi aaya', [['bujhlam', 'samjha']]],
  'bn-cha-khabe': ['Chai piyoge?', [['cha', 'chai'], ['khabe', 'khaoge (Bengalis "eat" tea)']]],
  'bn-hyan-nishchoi': ['Haan, zaroor', [['nishchoi', 'zaroor']]],
  'bn-jol-din': ['Thoda paani dijiye', [['jol', 'paani'], ['din', 'dijiye']]],
  'bn-ar-na': ['Bas, aur nahi', [['ar', 'aur']]],
  'bn-khide': ['Mujhe bhookh lagi hai', [['khide', 'bhookh'], ['peyechhe', 'lagi hai (lit. has got)']]],
  'bn-kheye-nii': ['Chalo, kha lete hain', [['kheye nii', 'kha lete hain']]],
  'bn-ranna-darun': ['Khana bahut badhiya bana hai', [['ranna', 'khana (cooking)'], ['hoyechhe', 'hua hai / bana hai']]],
  'bn-aro-chai': ['Mujhe aur chahiye', [['aro', 'aur'], ['chai', 'chahiye (not tea!)']]],
  'bn-ki-holo': ['Kya hua?', [['holo', 'hua']]],
  'bn-sob-thik': ['Sab theek hai', [['sob', 'sab'], ['ache', 'hai']]],
  'bn-ki-khobor': ['Kya khabar?', [['khobor', 'khabar']]],
  'bn-kichhu-na': ['Kuch nahi', [['kichhu', 'kuch']]],
  'bn-khub-bhalo': ['Bahut achha!', [['khub', 'bahut']]],
  'bn-sotti': ['Sach mein?', [['sotti', 'sach']]],
  'bn-chhere-dao': ['Chhod do', [['chhere dao', 'chhod do']]],
  'bn-bujhechhi': ['Samajh gaya', [['bujhechhi', 'samajh gaya']]],
  'bn-kothay-jachchho': ['Kahan ja rahe ho?', [['kothay', 'kahan'], ['jachchho', 'ja rahe ho']]],
  'bn-bari-jachchhi': ['Main ghar ja raha hoon', [['bari', 'ghar']]],
  'bn-cholo-jai': ['Chalo, chalte hain', [['jai', "chalein (let's go)"]]],
  'bn-kota-baje': ['Kitne baje hain?', [['kota', 'kitne']]],
  'bn-eta-koto': ['Yeh kitne ka hai?', [['eta', 'yeh'], ['koto', 'kitna']]],
  'bn-khub-dam': ['Bahut mehnga hai', [['dam', 'daam (price)']]],
  'bn-kom-korun': ['Thoda kam kijiye', [['kom', 'kam'], ['korun', 'kijiye']]],
  'bn-thik-ache-din': ['Theek hai, de dijiye', []],
  'bn-ami-busy': ['Main busy hoon', []],
  'bn-tumi-free': ['Tum free ho?', []],
  'bn-call-koro': ['Mujhe call karna', [['amake', 'mujhe'], ['koro', 'karo']]],
  'bn-ki-plan': ['Kya plan hai?', []],
  'bn-sorry-late': ['Sorry, late ho gaya', [['hoye gelo', 'ho gaya']]],
  'bn-tension-nio-na': ['Tension mat lo', [['nio na', "mat lo (don't take)"]]],
  'bn-wait-korchhi': ['Main wait kar raha hoon', [['korchhi', 'kar raha hoon']]],
  'bn-online-order': ['Chalo, online order karte hain', []],
};

export const bengali: Course = {
  languageId: 'bn',
  languageName: 'Bengali',
  nativeName: 'Bangla',
  flag: '🐟',
  available: true,
  praise: ['Darun!', 'Khub bhalo!', 'Fatafati!'],
  voiceSample: { text: 'Nomoskar, kemon acho?', script: 'নমস্কার, কেমন আছো?' },
  translateExample: 'Kemon acho?',
  handbook,
  dialogues,
  tips: [
    'Good news: Bengali verbs don\'t change for men and women. "Ami jachchhi" works for everyone.',
    'There are three "you"s: "tui" (very close friends), "tumi" (friends, family), "apni" (elders, strangers).',
    'Careful with "chai": in Bengali it means "want". Tea is "cha"!',
    'Bengalis "eat" tea and water: "cha khabe?", "jol khao". It sounds funny, but it is right.',
    'Spelling in romanized Bengali is flexible. "Acho" and "achho", "bhalo" and "valo" are all fine.',
  ],
  hiPatterns: [
    { when: 'achi', text: 'Pattern: Hindi "hoon / hai" is "achi / ache": Ami bhalo achi, Sob thik ache. Often it is simply left out: "Amar naam Rohan".' },
    { when: 'amar', text: 'Pattern: Hindi "mera" is "amar", "tumhara" is "tomar", "aapka" is "apnar". "Mujhe" is "amake".' },
    { when: 'kothay', text: 'Pattern: Hindi "kahan" (where) is "kothay"; "kahan se" (from where) is "kotha theke".' },
    { when: 'jachchho', text: 'Pattern: the "-ing" form adds -chh-: jachchhi (I am going), korchhi (I am doing), shikhchhi (I am learning).' },
    { when: 'khabe', text: 'Pattern: Bengali uses "khaoa" (eat) for drinks too: cha khaoa, jol khaoa.' },
    { when: 'na', text: 'Pattern: Bengali "na" comes after the verb, not before: Hindi "nahi jaanta" ➜ "jani na".' },
  ],
  units: [
    {
      id: 'bn-greetings',
      title: 'Greetings',
      emoji: '👋',
      description: 'Say hello, ask how someone is, and say bye.',
      lessons: [
        {
          id: 'bn-greetings-1',
          title: 'Saying hello',
          phrases: [
            p('nomoskar', 'Nomoskar', 'Hello', {
              enAlt: ['Hi', 'Greetings', 'Namaste'],
              alt: ['Namaskar', 'Nomoshkar', 'Nomaskar'],
              note: 'The respectful hello, with folded hands. Friends just say "Hi" or "Ki re?"',
            }),
            p('kemon-acho', 'Kemon acho?', 'How are you?', {
              enAlt: ["How's it going?", 'How are you', 'How are things?'],
              alt: ['Kemon achho', 'Kemon achho?', 'Kemon acchho'],
              words: [['Kemon', 'how'], ['acho', 'are you']],
              note: 'Uses "tumi" (casual you). Great with friends and people your age.',
            }),
            p('bhalo-achi', 'Ami bhalo achi', "I'm fine", {
              enAlt: ['I am fine', "I'm good", 'I am good', "I'm well"],
              alt: ['Ami valo achi', 'Ami bhalo achhi', 'Bhalo achi'],
              words: [['Ami', 'I'], ['bhalo', 'good'], ['achi', 'am']],
            }),
            p('apni-kemon', 'Apni kemon achen?', 'How are you? (polite)', {
              enAlt: ['How are you?', 'How are you'],
              alt: ['Apni kemon achhen', 'Apni kemon achen'],
              words: [['Apni', 'you (respectful)'], ['kemon', 'how'], ['achen', 'are']],
              note: '"Apni" is the respectful "you". Use it with elders and people you just met.',
            }),
          ],
        },
        {
          id: 'bn-greetings-2',
          title: 'Polite basics',
          phrases: [
            p('hyan', 'Hyan', 'Yes', {
              enAlt: ['Yeah', 'Yes please'],
              alt: ['Haan', 'Han', 'Hya'],
              note: 'Said like "hyaa", with a slight nasal sound.',
            }),
            p('na', 'Na', 'No', {
              enAlt: ['No thanks', 'Not'],
              alt: ['Naa', 'Nah'],
            }),
            p('dhonnobad', 'Dhonnobad', 'Thank you', {
              enAlt: ['Thanks'],
              alt: ['Dhonyobad', 'Dhanyabad', 'Thank you'],
              note: 'Quite formal. Friends just say "thank you" or "thanks".',
            }),
            p('kono-byapar-na', 'Kono byapar na', 'No problem', {
              enAlt: ["It's okay", 'No worries', 'Never mind', "It's nothing"],
              alt: ['Kono bepar na', 'Kono byapaar na', 'Kono byapar nei'],
              words: [['Kono', 'any'], ['byapar', 'matter'], ['na', 'not']],
            }),
          ],
        },
        {
          id: 'bn-greetings-3',
          title: 'Chatting and saying bye',
          phrases: [
            p('darun', 'Darun!', 'Great!', {
              enAlt: ['Awesome!', 'Wonderful!', 'Fantastic!'],
              alt: ['Daroon', 'Darun', 'Daarun'],
              note: '"Darun" is everywhere: darun khabar (great food), darun cinema (great film).',
            }),
            p('tumi-bolo', 'Tumi bolo?', 'And you?', {
              enAlt: ['How about you?', 'What about you?', 'You tell me?'],
              alt: ['Tumi bolo', 'Tui bol'],
              words: [['Tumi', 'you'], ['bolo', 'tell']],
              note: 'Literally "you tell". A friendly way to bounce the question back.',
            }),
            p('abar-dekha', 'Abar dekha hobe', 'See you again', {
              enAlt: ['See you later', 'See you', 'We will meet again'],
              alt: ['Abar dekha hobe', 'Pore dekha hobe'],
              words: [['Abar', 'again'], ['dekha hobe', 'will meet (lit. be seen)']],
            }),
            p('ashchhi', 'Ashchhi', 'Bye, I am off', {
              enAlt: ['Bye', "I'm off", 'Goodbye', 'I am leaving'],
              alt: ['Ashi', 'Aschi', 'Ashchi'],
              note: 'Literally "I\'m coming". Bengalis never say "I\'m going" when leaving: it sounds like forever!',
            }),
          ],
        },
      ],
    },
    {
      id: 'bn-about-me',
      title: 'About me',
      emoji: '🙋',
      description: 'Names, where you are from, and what you do.',
      lessons: [
        {
          id: 'bn-about-me-1',
          title: 'Names',
          phrases: [
            p('apnar-naam', 'Apnar naam ki?', "What's your name?", {
              enAlt: ['What is your name?', "What's your name"],
              alt: ['Apnar nam ki', 'Tomar naam ki', 'Apnar naam ki?'],
              words: [['Apnar', 'your (polite)'], ['naam', 'name'], ['ki', 'what']],
              note: 'With a friend: "Tomar naam ki?" No "is" needed in Bengali.',
            }),
            p('amar-naam', 'Amar naam Rohan', 'My name is Rohan', {
              enAlt: ["I'm Rohan", 'I am Rohan'],
              alt: ['Amar nam Rohan', 'Aamar naam Rohan'],
              words: [['Amar', 'my'], ['naam', 'name'], ['Rohan', '(name)']],
            }),
            p('alap', 'Apnar sathe alap kore bhalo laglo', 'Nice to meet you', {
              enAlt: ['Pleased to meet you', 'Glad to meet you', 'Happy to meet you'],
              alt: ['Alap kore bhalo laglo', 'Tomar sathe alap kore bhalo laglo'],
              words: [['Apnar sathe', 'with you'], ['alap kore', 'getting to know'], ['bhalo laglo', 'felt good']],
            }),
            p('amio', 'Amio', 'Me too', {
              enAlt: ['Same here', 'Likewise'],
              alt: ['Aamio', 'Amio tai'],
              words: [['Ami', 'I'], ['-o', 'too']],
              note: 'Add "-o" to any word to mean "too / also": tumio (you too), ajo (today too).',
            }),
          ],
        },
        {
          id: 'bn-about-me-2',
          title: 'Where from, what you do',
          phrases: [
            p('kothakar', 'Apni kothakar?', 'Where are you from?', {
              enAlt: ['Where are you from', 'Where do you come from?'],
              alt: ['Apni kotha theke', 'Tumi kothakar', 'Apni kothakar lok'],
              words: [['Apni', 'you'], ['kothakar', 'from where']],
            }),
            p('kolkatar', 'Ami Kolkatar', "I'm from Kolkata", {
              enAlt: ['I am from Kolkata'],
              alt: ['Ami Kolkata theke', 'Ami Kolkatar chhele', 'Ami Kolkatar meye'],
              words: [['Ami', 'I'], ['Kolkatar', 'of Kolkata']],
              note: 'Try your own city: Ami Dillir, Ami Mumbair.',
            }),
            p('ki-koren', 'Apni ki koren?', 'What do you do?', {
              enAlt: ['What do you do for work?', 'What is your job?'],
              alt: ['Apni ki koren', 'Tumi ki koro'],
              words: [['Apni', 'you'], ['ki', 'what'], ['koren', 'do (polite)']],
            }),
            p('chakri', 'Ami chakri kori', 'I have a job', {
              enAlt: ['I work', 'I do a job', 'I am working'],
              alt: ['Ami job kori', 'Ami chakri kori'],
              words: [['Ami', 'I'], ['chakri', 'job'], ['kori', 'do']],
              note: '"Ami job kori" is just as common.',
            }),
          ],
        },
        {
          id: 'bn-about-me-3',
          title: 'Learning Bengali',
          phrases: [
            p('shikhchhi', 'Ami Bangla shikhchhi', "I'm learning Bengali", {
              enAlt: ['I am learning Bengali', "I'm learning Bangla", 'I am learning Bangla'],
              alt: ['Ami Bangla shikhchi', 'Ami Bangla sikhchhi', 'Ami Bengali shikhchhi'],
              words: [['Ami', 'I'], ['Bangla', 'Bengali'], ['shikhchhi', 'am learning']],
              note: 'Bengalis call their language "Bangla".',
            }),
            p('ektu-bangla', 'Ami ektu ektu Bangla bolte pari', 'I speak a little Bengali', {
              enAlt: ['I can speak a little Bengali', 'I know a little Bengali', 'I speak a little Bangla'],
              alt: ['Ami ektu Bangla bolte pari', 'Ektu ektu Bangla bolte pari'],
              words: [['ektu ektu', 'a little'], ['bolte', 'to speak'], ['pari', 'can']],
            }),
            p('aste-bolun', 'Ektu aste bolun', 'Please speak slowly', {
              enAlt: ['Speak slowly please', 'Please talk slowly', 'Speak slowly'],
              alt: ['Ektu aaste bolun', 'Aste bolun', 'Ektu aste bolo'],
              words: [['Ektu', 'a bit'], ['aste', 'slowly'], ['bolun', 'speak (polite)']],
            }),
            p('bujhlam-na', 'Bujhlam na', "I didn't understand", {
              enAlt: ["I don't understand", 'I did not understand', "I didn't get it"],
              alt: ['Bujhte parlam na', 'Bujhini', 'Bujhlam naa'],
              words: [['Bujhlam', 'I understood'], ['na', 'not']],
              note: 'The "not" comes after the verb: bujhlam na = understood not.',
            }),
          ],
        },
      ],
    },
    {
      id: 'bn-chai-food',
      title: 'Cha & food',
      emoji: '☕',
      description: 'Tea time, water, and eating together.',
      lessons: [
        {
          id: 'bn-chai-food-1',
          title: 'Cha time',
          phrases: [
            p('cha-khabe', 'Cha khabe?', 'Will you have tea?', {
              enAlt: ['Would you like tea?', 'Do you want tea?', 'Tea?'],
              alt: ['Cha khaabe', 'Cha khaben', 'Cha khabi'],
              words: [['Cha', 'tea'], ['khabe', 'will (you) have']],
              note: 'Polite version: "Cha khaben?"',
            }),
            p('hyan-nishchoi', 'Hyan, nishchoi', 'Yes, sure', {
              enAlt: ['Yes, of course', 'Sure', 'Definitely'],
              alt: ['Hyan nishchoi', 'Haan, nishchoy', 'Nishchoi'],
              words: [['Hyan', 'yes'], ['nishchoi', 'surely']],
            }),
            p('jol-din', 'Ektu jol din', 'Some water please', {
              enAlt: ['Give me some water', 'Please give me some water', 'A little water please'],
              alt: ['Ektu jol den', 'Jol din', 'Ektu pani din'],
              words: [['Ektu', 'a little'], ['jol', 'water'], ['din', 'give (polite)']],
              note: 'In West Bengal water is "jol"; in Bangladesh it is "pani".',
            }),
            p('ar-na', 'Bas, ar na', "That's enough, no more", {
              enAlt: ['Enough, no more', "No more, that's enough", "That's enough"],
              alt: ['Bas ar na', 'Ar na', 'Bas, aar na'],
              words: [['Bas', 'enough'], ['ar', 'more'], ['na', 'no']],
              note: 'You will need this: a Bengali host always offers "ar ektu" (a little more).',
            }),
          ],
        },
        {
          id: 'bn-chai-food-2',
          title: 'At the table',
          phrases: [
            p('khide', 'Amar khide peyechhe', "I'm hungry", {
              enAlt: ['I am hungry'],
              alt: ['Amar khide peyeche', 'Khide peyechhe', 'Amar khub khide peyechhe'],
              words: [['Amar', 'my / to me'], ['khide', 'hunger'], ['peyechhe', 'has come']],
            }),
            p('kheye-nii', 'Cholo, kheye nii', "Let's eat", {
              enAlt: ["Come on, let's eat", "Let's have food"],
              alt: ['Cholo kheye nii', 'Cholo khete jai', 'Cholo, kheye nei'],
              words: [['Cholo', 'come on'], ['kheye nii', "let's eat (up)"]],
            }),
            p('ranna-darun', 'Rannata darun hoyechhe', 'The food is really good', {
              enAlt: ['The food is delicious', 'The cooking is great', 'The food is great'],
              alt: ['Ranna ta darun hoyechhe', 'Rannata darun hoyeche', 'Khabar ta darun'],
              words: [['Ranna', 'cooking'], ['-ta', 'the'], ['darun', 'great'], ['hoyechhe', 'has turned out']],
              note: 'Say this to whoever cooked. It makes their day.',
            }),
            p('aro-chai', 'Amar aro chai', 'I want more', {
              enAlt: ['I need more', 'I would like more', 'More please'],
              alt: ['Aro chai', 'Amar aaro chai', 'Aro ektu chai'],
              words: [['Amar', 'to me'], ['aro', 'more'], ['chai', 'want']],
              note: 'Careful: "chai" here means "want", not tea!',
            }),
          ],
        },
      ],
    },
    {
      id: 'bn-chit-chat',
      title: 'Chit-chat',
      emoji: '💬',
      description: "What's up, reactions, and keeping a chat going.",
      lessons: [
        {
          id: 'bn-chit-chat-1',
          title: "What's up?",
          phrases: [
            p('ki-holo', 'Ki holo?', 'What happened?', {
              enAlt: ["What's wrong?", "What's the matter?"],
              alt: ['Ki holo re', 'Kee holo', 'Ki hoyechhe'],
              words: [['Ki', 'what'], ['holo', 'happened']],
            }),
            p('sob-thik', 'Sob thik ache', 'Everything is fine', {
              enAlt: ["Everything's fine", 'All is well', "It's all good"],
              alt: ['Sob thik achhe', 'Shob thik ache', 'Sab thik ache'],
              words: [['Sob', 'everything'], ['thik', 'fine'], ['ache', 'is']],
            }),
            p('ki-khobor', 'Ki khobor?', "What's up?", {
              enAlt: ["What's new?", "How's it going?", "What's the news?"],
              alt: ['Ki khabor', 'Ki khobor re', 'Ki khobor bolo'],
              words: [['Ki', 'what'], ['khobor', 'news']],
            }),
            p('kichhu-na', 'Kichhu na', 'Nothing much', {
              enAlt: ['Nothing', 'Not much'],
              alt: ['Kichu na', 'Kichhu naa', 'Tamon kichhu na'],
              words: [['Kichhu', 'anything'], ['na', 'not']],
            }),
          ],
        },
        {
          id: 'bn-chit-chat-2',
          title: 'Reactions',
          phrases: [
            p('khub-bhalo', 'Khub bhalo!', 'Very good!', {
              enAlt: ['Very nice!', 'Great!', 'Very well!'],
              alt: ['Khub valo', 'Khub bhalo', 'Besh bhalo'],
              words: [['Khub', 'very'], ['bhalo', 'good']],
            }),
            p('sotti', 'Sotti?', 'Really?', {
              enAlt: ['Is it true?', 'Seriously?'],
              alt: ['Shotti', 'Sotyi', 'Sotti bolchho'],
              note: '"Sotti bolchho?" (are you telling the truth?) adds extra surprise.',
            }),
            p('chhere-dao', 'Chhere dao', 'Let it go', {
              enAlt: ['Forget it', 'Leave it', 'Never mind'],
              alt: ['Chere dao', 'Chhar', 'Chhere de'],
              words: [['Chhere', 'leaving'], ['dao', 'give']],
            }),
            p('bujhechhi', 'Bujhechhi', 'Got it', {
              enAlt: ['I understood', 'Understood', 'I get it'],
              alt: ['Bujhechi', 'Bujhlam', 'Bujhte perechhi'],
            }),
          ],
        },
      ],
    },
    {
      id: 'bn-out-about',
      title: 'Out & about',
      emoji: '🚕',
      description: 'Going places, time, and shopping at the market.',
      lessons: [
        {
          id: 'bn-out-about-1',
          title: 'Going places',
          phrases: [
            p('kothay-jachchho', 'Kothay jachchho?', 'Where are you going?', {
              enAlt: ['Where are you off to?', 'Where are you headed?'],
              alt: ['Kothay jachcho', 'Kothay jachho', 'Kothay jachchhen'],
              words: [['Kothay', 'where'], ['jachchho', 'are you going']],
            }),
            p('bari-jachchhi', 'Ami bari jachchhi', "I'm going home", {
              enAlt: ['I am going home', "I'm heading home"],
              alt: ['Ami bari jachchi', 'Bari jachchhi', 'Ami barite jachchhi'],
              words: [['Ami', 'I'], ['bari', 'home'], ['jachchhi', 'am going']],
            }),
            p('cholo-jai', 'Cholo, jai', "Come on, let's go", {
              enAlt: ["Let's go", "Come on, let's go"],
              alt: ['Cholo jai', 'Chol, jai', 'Cholo, beriye pori'],
              words: [['Cholo', 'come on'], ['jai', "let's go"]],
            }),
            p('kota-baje', 'Kota baje?', 'What time is it?', {
              enAlt: ["What's the time?", 'What time is it'],
              alt: ['Kota baaje', 'Kota baje ekhon', 'Ekhon kota baje'],
              words: [['Kota', 'how many'], ['baje', 'strikes (o’clock)']],
            }),
          ],
        },
        {
          id: 'bn-out-about-2',
          title: 'At the market',
          phrases: [
            p('eta-koto', 'Eta koto?', 'How much is this?', {
              enAlt: ['How much does this cost?', "What's the price?", 'How much is it?'],
              alt: ['Eta koto daam', 'Etar dam koto', 'Eta koto holo'],
              words: [['Eta', 'this'], ['koto', 'how much']],
            }),
            p('khub-dam', 'Khub dam', "It's too expensive", {
              enAlt: ['Very expensive', "It's very expensive", 'Too expensive'],
              alt: ['Khub daam', 'Bhishon dam', 'Khub dami'],
              words: [['Khub', 'very'], ['dam', 'price']],
              note: 'Literally "very (high) price". "Dami" means expensive.',
            }),
            p('kom-korun', 'Ektu kom korun', 'Lower it a bit', {
              enAlt: ['Reduce it a little', 'Give me a discount', 'Make it a bit less'],
              alt: ['Ektu kom koren', 'Kom korun', 'Ektu kom koro'],
              words: [['Ektu', 'a bit'], ['kom', 'less'], ['korun', 'do (polite)']],
            }),
            p('thik-ache-din', 'Thik ache, din', 'Okay, give it to me', {
              enAlt: ["Okay, I'll take it", 'Fine, give it', 'Okay, give it'],
              alt: ['Thik achhe, din', 'Accha, din', 'Thik ache din'],
              words: [['Thik ache', 'okay'], ['din', 'give (polite)']],
            }),
          ],
        },
      ],
    },
    {
      id: 'bn-english-mix',
      title: 'Bengali + English',
      emoji: '🔀',
      description: 'How people really talk: Bengali with English words mixed in.',
      lessons: [
        {
          id: 'bn-english-mix-1',
          title: 'Busy or free?',
          phrases: [
            p('ami-busy', 'Ami busy achi', "I'm busy", {
              enAlt: ['I am busy'],
              alt: ['Ami busy achhi', 'Ami ekhon busy'],
              words: [['Ami', 'I'], ['busy', 'busy'], ['achi', 'am']],
              note: 'English words slot straight into Bengali sentences. This is completely normal!',
            }),
            p('tumi-free', 'Tumi free acho?', 'Are you free?', {
              enAlt: ['Are you free', 'You free?'],
              alt: ['Tumi free achho', 'Free acho', 'Tui free achis'],
              words: [['Tumi', 'you'], ['free', 'free'], ['acho', 'are']],
            }),
            p('call-koro', 'Amake call koro', 'Give me a call', {
              enAlt: ['Call me', 'Give me a call later'],
              alt: ['Amake call korbe', 'Amake phone koro', 'Call koro'],
              words: [['Amake', 'to me'], ['call koro', 'do a call']],
              note: 'Any English verb + "kora" works: wait kora, book kora, check kora.',
            }),
            p('ki-plan', 'Ki plan?', "What's the plan?", {
              enAlt: ['What is the plan?', "What's the plan"],
              alt: ['Ki plan ache', 'Ki plan re', 'Plan ki'],
              words: [['Ki', 'what'], ['plan', 'plan']],
            }),
          ],
        },
        {
          id: 'bn-english-mix-2',
          title: 'Real-life mix',
          phrases: [
            p('sorry-late', 'Sorry, late hoye gelo', 'Sorry, I got late', {
              enAlt: ["Sorry, I'm late", 'Sorry, I am late', 'Sorry, it got late'],
              alt: ['Sorry, deri hoye gelo', 'Sorry late hoye gelo', 'Sorry re, late hoye gelo'],
              words: [['late', 'late'], ['hoye gelo', 'it became']],
            }),
            p('tension-nio-na', 'Tension nio na', "Don't worry", {
              enAlt: ["Don't take tension", "Don't stress", 'Do not worry'],
              alt: ['Tension nish na', 'Chap nio na', 'Tension niyo na'],
              words: [['Tension', 'stress'], ['nio na', "don't take"]],
              note: 'Kolkata slang: "Chap nis na" (don\'t take pressure).',
            }),
            p('wait-korchhi', 'Ami wait korchhi', "I'm waiting", {
              enAlt: ['I am waiting'],
              alt: ['Ami wait korchi', 'Ami opekkha korchhi', 'Wait korchhi'],
              words: [['Ami', 'I'], ['wait korchhi', 'am waiting']],
              note: 'The pure Bengali word for wait is "opekkha".',
            }),
            p('online-order', 'Cholo, online order kori', "Let's order online", {
              enAlt: ["Let's just order online", 'We will order online'],
              alt: ['Online order kori', 'Cholo online order kori', 'Online order kore nii'],
              words: [['Cholo', 'come on'], ['order kori', "let's order"]],
            }),
          ],
        },
      ],
    },
  ],
};

for (const u of bengali.units) for (const l of u.lessons) for (const ph of l.phrases) {
  if (bangla[ph.id]) ph.script = bangla[ph.id];
  [ph.hi, ph.hiWords] = hindi[ph.id] ?? [undefined, undefined];
}
