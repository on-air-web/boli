import { rows, type HbSection } from '../handbook-types';
import { dialogues } from './dialogues';

// Everyday Marathi handbook: English | Hindi | Marathi, all in Roman letters.
// Casual Pune / Mumbai Marathi; spellings vary and English mixing is intentional.
// Where gender matters, examples use a male speaker (karto → karte, gelo → geli, aalo → aale for women).

export const handbook: HbSection[] = [
  {
    id: 'how-to-read',
    title: 'How to read this',
    emoji: '📘',
    notes: [
      { title: 'Long and short sounds', body: '"aa" is a long a (as in father), "a" is short (as in about). "ee" or a final "i" is long (see), "oo" or a final "u" is long (food).' },
      { title: 'z and ch', body: 'Marathi "z" (zala, maza) is a soft "dz", and "ch" in chaha or chala is closer to "ts". Saying a plain z and ch is fine, people will understand you.' },
      { title: 'n and l', body: 'Marathi has a hard "n" (pani) and a hard "l" (halu, sagla) made with the tongue curled back. In English letters they are written as plain n and l.' },
      { title: 'Spelling is flexible', body: 'maza/majha, aahe/ahe, khup/khoop, thik/theek are all fine. Roman Marathi has no single official spelling.' },
      { title: 'aahe and its family', body: 'Mi ... aahe (I am), tu ... aahes (you are), to / ti ... aahe (he / she is), aamhi / tumhi / te ... aahot / aahat / aahet. Casually it shrinks: "kartoy" = karto aahe.' },
      { title: 'Men and women', body: 'Many verbs change with the speaker: karto / karte (I do), gelo / geli (I went), aalo / aale (I came), challo / challe (I am going).' },
    ],
  },
  {
    id: 'people',
    title: 'Pronouns and people',
    emoji: '👪',
    tables: [
      {
        title: 'Pronouns',
        rows: rows(`
I | main | mi
me / to me | mujhe | mala
you (casual) | tu | tu
to you (casual) | tujhe | tula
you (polite / plural) | aap / tum | tumhi
to you (polite) | aapko | tumhala
we (including you) | hum | aapan | Use when the listener is included
we (not you) | hum | aamhi
to us | humein | aamhala / aaplyala
he / that | woh | to
she | woh | ti
they | woh log | te
this | yeh | he
to him | use | tyala
to her | use | tila
my (masculine thing) | mera | maza
my (feminine thing) | meri | mazi
your (casual) | tera / teri | tuza / tuzi
your (polite) | aapka | tumcha / tumchi
our | hamara | aapla / aamcha
his | uska | tyacha / tyachi
her | uska | ticha / tichi
own | apna | swatacha / aapla
`),
      },
      {
        title: 'Family and people',
        rows: rows(`
friend | dost | mitra / dost | A female friend is "maitrin"
brother | bhai | bhau | An elder brother is called "dada"
sister | behen | bahin | An elder sister is called "tai"
mother | maa | aai
father | pita / papa | baba / vadil
family | parivaar | ghar / family / kutumb
son | beta | mulga
daughter | beti | mulgi
boy | ladka | mulga
girl | ladki | mulgi
children | bachche | mula
husband | pati | navra
wife | patni | bayko
grandmother | daadi / naani | aaji
grandfather | daada / naana | aajoba
father's brother | chacha | kaka
father's brother's wife | chachi | kaku | Also any aunty you know
mother's brother | maama | mama
mother's sister | mausi | mavshi
father's sister | bua | aatya
aunty / uncle (any elder) | aunty / uncle | kaku / kaka
older man (respectful) | bhaiya | dada / kaka
neighbour | padosi | shejari
`),
      },
    ],
  },
  {
    id: 'questions',
    title: 'Question words and connectors',
    emoji: '❓',
    tables: [
      {
        title: 'Question words',
        rows: rows(`
what | kya | kay
who | kaun | kon
where | kahaan | kuthe
from where | kahaan se | kuthun
when | kab | kadhi
why | kyon | ka / kashala
how | kaise | kasa / kashi
how much / how many | kitna / kitne | kiti
which | kaun sa | konta / konti
whose | kiska | kunacha
yes/no question | kya ...? | ... ka? | "ka" goes at the end: Tu yetos ka?
`),
      },
      {
        title: 'Connectors and small words',
        rows: rows(`
and | aur | ani
but | lekin | pan
or | ya | kiva
if | agar | jar
then | toh | tar
because | kyonki | karan
so / therefore | isliye | mhanun
also | bhi | pan / suddha
not | nahin | nahi
yes | haan | ho
no | nahin | nahi
okay | theek hai | thik aahe / bara / chalel
maybe | shayad | kadachit
only | sirf | fakt
with | saath | barobar / sobat
in / inside | mein | madhe
on | par | var
to (someone) | ko | -la
for | ke liye | -sathi
of | ka / ki / ke | -cha / -chi / -che
from | se | -pasun / -kadun
after | baad | nantar
before | pehle | aadhi
again | phir se | parat / punha
still / more | abhi bhi / aur | ajun
that is / I mean | matlab | mhanje
`),
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    emoji: '🔢',
    intro: 'Marathi numbers are close to Hindi, with a few changes: do → don, paanch → paach, chhah → saha, das → daha, sau → shambhar.',
    tables: [
      {
        title: '1 to 20',
        rows: rows(`
one | ek | ek
two | do | don
three | teen | teen
four | chaar | chaar
five | paanch | paach
six | chhah | saha
seven | saat | saat
eight | aath | aath
nine | nau | nau
ten | das | daha
eleven | gyaarah | akra
twelve | baarah | baara
thirteen | terah | tera
fourteen | chaudah | chauda
fifteen | pandrah | pandhra
sixteen | solah | sola
seventeen | satrah | satra
eighteen | athaarah | athra
nineteen | unnees | ekonees
twenty | bees | vees
`),
      },
      {
        title: 'Bigger numbers',
        rows: rows(`
twenty-five | pachchees | pachvees
thirty | tees | tees
thirty-five | paintees | pastis
forty | chaalees | chaalis
fifty | pachaas | pannas
sixty | saath | saath
seventy | sattar | sattar
eighty | assi | aishi
ninety | nabbe | navvad
hundred | sau | shambhar
one and a half (150) | dedh (sau) | deed (shambhar)
two and a half (250) | dhaai (sau) | adich (shey)
thousand | hazaar | hajaar
lakh (100,000) | laakh | laakh
first | pehla | pahila
second | doosra | dusra
third | teesra | tisra
`),
      },
    ],
  },
  {
    id: 'time',
    title: 'Time, days and dates',
    emoji: '🕰️',
    tables: [
      {
        title: 'Time words',
        rows: rows(`
today | aaj | aaj
tomorrow | kal | udya | Marathi has separate words for tomorrow and yesterday
yesterday | kal | kaal
day after tomorrow | parson | parva
now | ab | aata
right now / at once | abhi | aatach / lagech
later | baad mein | nantar
morning / in the morning | subah | sakal / sakali
afternoon | dopahar | dupar / dupari
evening / in the evening | shaam | sandhyakal / sandhyakali
night / at night | raat | ratra / ratri
early / quickly | jaldi | lavkar
late | der se | ushira / late
always | hamesha | nehmi
sometimes | kabhi kabhi | kadhi kadhi
every day | roz | roj
week | hafta | aathavda
month | mahina | mahina
year | saal | varsha
`),
      },
      {
        title: 'Days of the week',
        rows: rows(`
Monday | Somvaar | Somvar
Tuesday | Mangalvaar | Mangalvar
Wednesday | Budhvaar | Budhvar
Thursday | Guruvaar | Guruvar
Friday | Shukravaar | Shukravar
Saturday | Shanivaar | Shanivar
Sunday | Ravivaar | Ravivar
`),
      },
      {
        title: 'Telling the time',
        rows: rows(`
What time is it? | Kitne baje hain? | Kiti vajle?
It's two o'clock. | Do baje hain. | Don vajle.
at seven | saat baje | saat vajta
half past three | saadhe teen | saade teen
quarter past four | sawa chaar | sava chaar
quarter to five | paune paanch | paune paach
half past one | dedh | deed
half past two | dhaai | adich
in ten minutes | das minute mein | daha minitat
`),
      },
    ],
  },
  {
    id: 'places',
    title: 'Places and directions',
    emoji: '🧭',
    tables: [
      {
        title: 'Places',
        rows: rows(`
house / home | ghar | ghar
at home / to home | ghar par | ghari
market | bazaar | bajar / market
shop | dukaan | dukaan
school | school | shala
office | office | office
hospital | aspataal | davakhana / hospital
station | station | station
road | sadak | rasta
temple | mandir | mandir / deool
village | gaon | gaav
city | shehar | shahar
`),
      },
      {
        title: 'Directions',
        rows: rows(`
here | yahaan | ithe
there | wahaan | tithe
near | paas | javal
far | door | laamb
left | baayein | davikade
right | daayein | ujvikade
straight | seedha | saral
in front | saamne | samor
behind | peeche | maage
up / upstairs | upar | var / varti
down / downstairs | neeche | khali
inside | andar | aat
outside | bahar | baher
Where is the station? | Station kahaan hai? | Station kuthe aahe?
Go straight. | Seedha jaao. | Saral ja.
Turn left. | Left mudo. | Davikade vala.
Is it near here? | Kya yeh paas mein hai? | Ithun javal aahe ka?
Stop here. | Yahaan roko. | Ithe thamba.
Drop me here. | Mujhe yahaan chhod do. | Mala ithe sodaa.
How far is it? | Kitna door hai? | Kiti laamb aahe?
`),
      },
    ],
  },
  {
    id: 'food',
    title: 'Food and drink',
    emoji: '🍛',
    tables: [
      {
        title: 'Food words',
        rows: rows(`
water | paani | pani
tea | chai | chaha
milk | doodh | doodh
coffee | coffee | coffee
food / meal | khaana | jevan
breakfast / snack | naashta | nashta
rice | chaawal | bhaat
flatbread | roti | poli / chapati
vegetable dish | sabzi | bhaaji
lentils | daal | varan / aamti
sweet | meetha | god
spicy | teekha | tikhat
salt | namak | meeth
sugar | cheeni | sakhar
fruit | phal | phal
egg | anda | anda
fish | machhli | masa
tasty | swaadisht | chavishta / mast
`),
      },
      {
        title: 'At the table',
        rows: rows(`
I'm hungry. | Mujhe bhookh lagi hai. | Mala bhook lagli aahe.
I'm thirsty. | Mujhe pyaas lagi hai. | Mala tahan lagli aahe.
Have you eaten? | Khana kha liya? | Jevan zala ka?
Take a little more. | Thoda aur lo. | Ajun thoda ghya.
It's very spicy. | Bahut teekha hai. | Khup tikhat aahe.
It's delicious. | Bahut swaadisht hai. | Khup chavishta aahe.
I'm full. | Mera pet bhar gaya. | Maza pot bharla.
One more cup of tea, please. | Ek aur chai dena. | Ajun ek chaha dya.
Bring the bill. | Bill laana. | Bill aana.
I'm vegetarian. | Main shakahaari hoon. | Mi shakahari aahe.
`),
      },
    ],
  },
  {
    id: 'daily',
    title: 'Daily routine',
    emoji: '☀️',
    tables: [
      {
        rows: rows(`
I wake up at seven. | Main saat baje uthta hoon. | Mi saat vajta uthto.
I have a bath. | Main nahaata hoon. | Mi anghol karto.
I have breakfast. | Main naashta karta hoon. | Mi nashta karto.
I go to the office. | Main office jaata hoon. | Mi office la jato.
I come home in the evening. | Main shaam ko ghar aata hoon. | Mi sandhyakali ghari yeto.
I cook food. | Main khaana banaata hoon. | Mi swayampak karto.
I watch TV. | Main TV dekhta hoon. | Mi TV baghto.
I go to sleep at eleven. | Main gyaarah baje sota hoon. | Mi akra vajta zopto.
I'm sleepy. | Mujhe neend aa rahi hai. | Mala zop yetey.
I'm going to the gym. | Main gym ja raha hoon. | Mi gym la challo aahe.
`),
      },
    ],
  },
  {
    id: 'body',
    title: 'Body and health',
    emoji: '🩺',
    tables: [
      {
        title: 'Body',
        rows: rows(`
head | sir | doka
eye | aankh | dola
ear | kaan | kaan
nose | naak | naak
mouth | munh | tond
tooth | daant | daat
hair | baal | kes
hand | haath | haat
leg / foot | pair | paay
stomach | pet | pot
back | peeth | paath
`),
      },
      {
        title: 'Health',
        rows: rows(`
fever | bukhaar | taap
cold | zukaam | sardi
cough | khaansi | khokla
pain | dard | dukhna
medicine | dawai | aushadh / medicine
I'm not feeling well. | Meri tabiyat theek nahi hai. | Mala bara vatat nahi.
I have a headache. | Mere sir mein dard hai. | Maza doka dukhtay.
My stomach hurts. | Mere pet mein dard hai. | Maza pot dukhtay.
I have a fever. | Mujhe bukhaar hai. | Mala taap aahe.
Let's go to the doctor. | Doctor ke paas chalte hain. | Doctor kade jauya.
Take rest. | Aaraam karo. | Aaram kar.
Take care. | Dhyaan rakhna. | Kalji ghe.
`),
      },
    ],
  },
  {
    id: 'verbs',
    title: 'Common verbs',
    emoji: '🏃',
    intro: 'Marathi verbs end in -na / -ne (karna, jaana). Drop it and add endings: kar → karto (I do, man), karte (woman), kar! (do it).',
    tables: [
      {
        rows: rows(`
to do | karna | karna
to go | jaana | jaana
to come | aana | yena
to eat | khaana | khaana / jevna
to drink | peena | pina
to see / watch | dekhna | baghna
to give | dena | dena
to take | lena | ghena
to say / tell | bolna / batana | bolna / sangna
to ask | poochhna | vicharna
to listen | sunna | aikna
to sit | baithna | basna
to sleep | sona | zopna
to wake up | uthna | uthna
to read | padhna | vachna
to write | likhna | lihina
to learn | seekhna | shikna
to teach | sikhaana | shikavna
to understand | samajhna | samajna / kalna
to know | pata hona | mahit asna
to speak | bolna | bolna
to buy | khareedna | vikat ghena
to sell | bechna | vikna
to meet | milna | bhetna
to wait | intezaar karna | vaat baghna / wait karna
to help | madad karna | madat karna
to forget | bhoolna | visarna
to laugh | hansna | hasna
to play | khelna | khelna
to walk | chalna | chalna
to run | daudna | palna
to open | kholna | ughadna
to close | band karna | band karna
`),
      },
    ],
  },
  {
    id: 'tenses',
    title: 'Verb tenses',
    emoji: '⏳',
    intro: 'Using "jaana" (to go) and "karna" (to do). Women: change -o to -e (jato → jate, gelo → geli).',
    tables: [
      {
        rows: rows(`
I go (usually) | main jaata hoon | mi jato
I am going | main ja raha hoon | mi jaat aahe / mi challo aahe
I went | main gaya | mi gelo
I will go | main jaaunga | mi jaain
we will go | hum jaayenge | aapan jau
he goes | woh jaata hai | to jato
she went | woh gayi | ti geli
I do | main karta hoon | mi karto
I am doing | main kar raha hoon | mi karat aahe / mi kartoy
I did it | maine kiya | mi kela
I will do it | main karunga | mi karin
let's do it | chalo karte hain | karuya
you (casual) will come? | tum aaoge? | tu yeshil ka?
you (polite) will come? | aap aayenge? | tumhi yaal ka?
I had eaten | maine kha liya tha | mi khalla hota
I can go | main ja sakta hoon | mi jau shakto
I have to go | mujhe jaana hai | mala jaycha aahe
`),
      },
    ],
  },
  {
    id: 'describe',
    title: 'Describing things',
    emoji: '🎨',
    tables: [
      {
        rows: rows(`
good | achha | chaangla / chhan
bad | bura | vaait
big | bada | motha
small | chhota | lahaan
hot | garam | garam
cold | thanda | thanda
new | naya | nava
old (thing) | puraana | juna
beautiful | sundar | sundar / chhan
easy | aasaan | sopa
difficult | mushkil | avghad
fast | tez | jorat / fast
slow | dheere | halu
a lot / very | bahut | khup
a little | thoda | thoda / jara
expensive | mehnga | mahag
cheap | sasta | swasta
happy | khush | khush
sad | udaas | dukhi
tired | thaka hua | thaklo (m) / thakle (f)
ready | taiyaar | tayaar
wrong | galat | chuk
right / correct | sahi | barobar
`),
      },
    ],
  },
  {
    id: 'weather',
    title: 'Weather',
    emoji: '🌦️',
    tables: [
      {
        rows: rows(`
rain | baarish | paus
It's raining. | Baarish ho rahi hai. | Paus padtoy.
sunshine | dhoop | oon
It's very sunny. | Bahut dhoop hai. | Khup oon aahe.
It's very hot. | Bahut garmi hai. | Khup garmi aahe.
It's very cold. | Bahut thand hai. | Khup thandi aahe.
wind | hawa | vaara
cloud | baadal | dhag
umbrella | chhaata | chhatri
Take an umbrella. | Chhaata le lo. | Chhatri ghe.
The weather is lovely today. | Aaj mausam achha hai. | Aaj hava mast aahe.
`),
      },
    ],
  },
  {
    id: 'social',
    title: 'Social phrases',
    emoji: '💬',
    tables: [
      {
        rows: rows(`
hello | namaste | namaskar / hello
how are you? | kaise ho? | kasa aahes? / kashi aahes?
no problem | koi baat nahin | kahi harkat nahi / chalta
thank you | dhanyavaad / shukriya | dhanyavaad / thank you
sorry | maaf karna | sorry / maaf kara
please | kripya | please / krupaya
don't worry | chinta mat karo | kalji karu nakos / tension gheu nakos
come quickly | jaldi aao | lavkar ye
see you | phir milenge | parat bhetu
take care | dhyaan rakhna | kalji ghe
bye | alvida / bye | yeto / bye
congratulations | badhaai ho | abhinandan
happy birthday | janamdin mubarak | vadhdivsachya shubhechha / happy birthday
welcome (come in) | aaiye | ya, ya!
it's okay / it works | chalega | chalel
good night | shubh raatri | shubh ratri / good night
`),
      },
    ],
  },
  {
    id: 'english-mix',
    title: 'Marathi + English (how people really talk)',
    emoji: '🔀',
    intro: 'Casual Marathi, especially in Pune and Mumbai, uses lots of English words. The Marathi grammar stays, and the English word slots in. Mixing makes you sound more natural, not less.',
    notes: [
      { title: 'English verb + karna', body: 'Take any English verb and add kar / karna: call kar, wait kar, order kar, book kar, check kar, cancel kar, share kar, reply kar, download kar, enjoy kar.' },
      { title: 'English describing word + aahe', body: 'Mi busy aahe (I am busy). Ti free aahe (she is free). He boring aahe (this is boring). Movie super aahe (the movie is great).' },
      { title: 'English place or thing + Marathi endings', body: 'office madhe (in the office), college pasun (from college), phone var (on the phone), meeting nantar (after the meeting), weekend la (at the weekend).' },
      { title: 'Words people almost always say in English', body: 'phone, call, message, plan, order, online, late, sorry, please, thank you, tension, problem, office, college, class, exam, party, weekend, ticket, bill, traffic, station, TV, movie, already, actually.' },
    ],
    tables: [
      {
        title: 'Mixed sentences',
        rows: rows(`
I'm busy right now. | Main abhi busy hoon. | Mi aata busy aahe.
Are you free? | Kya tum free ho? | Tu free aahes ka?
Give me a call. | Mujhe call karna. | Mala call kar.
I'll message you. | Main tumhe message karunga. | Mi tula message karto.
What's the plan? | Kya plan hai? | Kay plan aahe?
Let's order online. | Chalo online order karte hain. | Online order karuya.
Sorry, I got late. | Sorry, mujhe late ho gaya. | Sorry, mala late zala.
Don't take tension. | Tension mat lo. | Tension gheu nakos.
There's no problem. | Koi problem nahi hai. | Kahi problem nahi.
Wait five minutes. | Paanch minute wait karo. | Paach minute wait kar.
Did you book the tickets? | Tickets book kiye? | Tickets book kelis ka?
Check your phone. | Apna phone check karo. | Tuza phone check kar.
The movie was super. | Movie super thi. | Movie super hoti.
I already told you. | Maine pehle hi bataaya tha. | Mi already sangitla hota.
Actually, I'm tired. | Actually, main thak gaya hoon. | Actually, mi thaklo aahe.
Send me the location. | Location bhej do. | Location pathav.
The restaurant is closed. | Restaurant band hai. | Restaurant band aahe.
My phone's battery is dead. | Mere phone ki battery khatam hai. | Mazya phone chi battery sampli.
See you at the party. | Party mein milte hain. | Party madhe bhetu.
I have a meeting at ten. | Mera das baje meeting hai. | Mazi daha vajta meeting aahe.
`),
      },
    ],
  },
  {
    id: 'patterns',
    title: 'Sentence patterns',
    emoji: '🧩',
    tables: [
      {
        rows: rows(`
I am ... | main ... hoon | Mi ... aahe.
We are ... | hum ... hain | Aamhi ... aahot.
He / she is ... | woh ... hai | To / ti ... aahe.
You are ... (polite) | aap ... ho | Tumhi ... aahat.
I want to ... | main ... karna chahta hoon | Mala ... karaycha aahe.
I am doing ... | main ... kar raha hoon | Mi ... karat aahe.
I will go | main jaaunga | Mi jaain.
We can go | hum ja sakte hain | Aapan jau shakto.
Can you ...? | kya aap ... sakte ho? | Tumhi ... shakta ka?
I have to go | mujhe jaana hai | Mala jaycha aahe.
I need ... | mujhe ... chahiye | Mala ... pahije.
I have ... | mere paas ... hai | Mazyakade ... aahe.
I like ... | mujhe ... pasand hai | Mala ... aavadta.
I don't like ... | mujhe ... pasand nahi | Mala ... aavadat nahi.
I don't know. | mujhe nahi pata | Mala mahit nahi.
Let's ... | chalo ... karte hain | Chala, ... karuya.
Don't ... | ... mat karo | ... karu nakos.
If ..., then ... | agar ..., toh ... | Jar ..., tar ...
`),
      },
    ],
  },
  {
    id: 'sentences',
    title: 'Example sentences',
    emoji: '📝',
    intro: 'Real everyday sentences. Tap 🔊 to hear one, or 🎤 to practise saying it.',
    tables: [
      {
        title: 'Chatting',
        rows: rows(`
How are you? | Tum kaise ho? | Tu kasa aahes? / Kay mhantos?
I am fine. | Main theek hoon. | Mi thik aahe.
What are you doing? | Tum kya kar rahe ho? | Tu kay kartoys?
I am at home. | Main ghar par hoon. | Mi ghari aahe.
Where are you? | Tum kahaan ho? | Tu kuthe aahes?
What does this mean? | Iska kya matlab hai? | Yacha artha kay?
I don't understand. | Mujhe samajh nahin aaya. | Mala samajla nahi.
Say it again, please. | Phir se boliye. | Parat sanga na.
I don't know. | Mujhe nahi pata. | Mala mahit nahi.
That's right. | Sahi hai. | Barobar aahe.
`),
      },
      {
        title: 'Plans',
        rows: rows(`
What are you doing tomorrow? | Kal kya kar rahe ho? | Udya kay karnar aahes?
Let's meet in the evening. | Shaam ko milte hain. | Sandhyakali bhetuya.
I'll come at six. | Main chhe baje aaunga. | Mi saha vajta yeto.
Shall we go for a movie? | Movie chalein? | Movie la jaycha ka?
I can't come today. | Main aaj nahi aa sakta. | Mala aaj yeta yenar nahi.
Let's go together. | Saath mein chalte hain. | Ekatra jauya.
`),
      },
      {
        title: 'Work and study',
        rows: rows(`
I'm going to the office. | Main office ja raha hoon. | Mi office la challo aahe.
I have a lot of work today. | Aaj bahut kaam hai. | Aaj khup kaam aahe.
My exam is tomorrow. | Kal mera exam hai. | Udya maza exam aahe.
I'm studying. | Main padh raha hoon. | Mi abhyas karat aahe.
I'll finish it today. | Main aaj khatam kar dunga. | Mi aaj sampavto.
`),
      },
      {
        title: 'Family and home',
        rows: rows(`
My mother is at home. | Meri maa ghar par hai. | Mazi aai ghari aahe.
My brother lives in Mumbai. | Mera bhai Mumbai mein rehta hai. | Maza bhau Mumbait rahto.
How many people are in your family? | Tumhare ghar mein kitne log hain? | Tumchya gharat kiti jan aahet?
Come to our house. | Hamare ghar aao. | Aamchya ghari ye.
Dinner is ready. | Khaana taiyaar hai. | Jevan tayaar aahe.
`),
      },
    ],
  },
  {
    id: 'slang',
    title: 'Slang and expressions',
    emoji: '🎉',
    tables: [
      {
        rows: rows(`
hey! / what's up? | arre! kya haal? | kay re? / kay mhantos? | Very casual, between friends
awesome! | zabardast! | bhari! / lay bhari!
super cool (Mumbai) | mast | jhakaas!
bro | bhai | bhava / bhau
right? / isn't it? | hai na? | ho na?
really? | sach mein? | kharach?
for sure? | pakka? | nakki?
I swear! | kasam se! | aai shappath!
we're in trouble / it's ruined | vaat lag gayi | vaat lagli
whatever / nonsense | kuchh bhi | kahi pan
annoying headache (a pain) | sir dard | dokyala taap
relax / chill | chill karo | chill maar
stop it | bas karo | bas kar
hurry up | jaldi karo | lavkar kar
slowly, slowly | dheere dheere | halu halu
let it go | jaane do | jau de
oh my God! | hey bhagwaan! | arre deva!
it works / fine by me | chalega | chalel
`),
      },
    ],
  },
  {
    id: 'dialogues',
    title: 'Mini-dialogues',
    emoji: '🗣️',
    intro: 'Short real conversations. Practise them out loud in the Speak tab, where you play speaker B.',
    dialogues,
  },
  {
    id: 'grammar',
    title: 'Grammar quick reference',
    emoji: '📐',
    notes: [
      { title: 'Mi vs mala', body: 'Mi = I (doing something): Mi ghari aahe. Mala = to me (something happens to me): Mala bhook lagli aahe. Same as Hindi main / mujhe.' },
      { title: 'Maza, mazi, maza (my)', body: 'It follows the thing owned: maza bhau (my brother), mazi bahin (my sister), maza ghar (my house). Same for tuza / tumcha / aapla.' },
      { title: 'Men and women', body: 'Mi karto (man) / mi karte (woman). Mi gelo / mi geli (I went). Mi aalo / mi aale (I came). The "-at aahe" form (karat aahe) is the same for both.' },
      { title: 'Aahe, aahes, aahot, aahat, aahet', body: 'Mi aahe, tu aahes, to/ti aahe, aamhi aahot, tumhi aahat, te aahet. Past: hoto / hoti (was), future: asel (will be).' },
      { title: 'Questions with ka', body: 'Put "ka" at the end for a yes/no question: Tu yetos ka? (Are you coming?) With a question word you don\'t need it: Tu kuthe aahes?' },
      { title: 'Endings instead of separate words', body: 'Marathi glues small words to the end: ghari (at home), office madhe (in the office), tula (to you), aai sathi (for mum), Mumbaihun (from Mumbai), tablevar (on the table).' },
      { title: 'Aapan vs aamhi', body: 'Both mean "we". "Aapan" includes the person you are talking to (aapan jauya = let\'s go). "Aamhi" leaves them out (aamhi jatoy = we are going, without you).' },
      { title: 'Saying no', body: '"Nahi" negates: Mi jaat nahi (I am not going). "Nako" means "don\'t want / don\'t": Mala nako (I don\'t want it), Karu nakos (don\'t do it).' },
      { title: 'Let\'s ...', body: 'Add "-uya" to the verb: karuya (let\'s do), jauya (let\'s go), khauya (let\'s eat), bhetuya (let\'s meet).' },
      { title: 'Polite requests', body: 'Use the tumhi form, ending in -a: Basa (please sit), Ya (please come), Dya (please give), Sanga (please tell). With friends: bas, ye, de, sang.' },
    ],
  },
  {
    id: 'practice',
    title: 'Self-practice',
    emoji: '✍️',
    intro: 'Say or write each one in Marathi, then tap to reveal an answer. Other answers can be right too!',
    practice: [
      { en: 'I am busy now, but I will call you tonight.', pa: 'Mi aata busy aahe, pan aaj ratri tula call karto.' },
      { en: 'If you are hungry, we can order food.', pa: 'Jar tula bhook lagli asel, tar aapan food order karu shakto.' },
      { en: 'My sister is studying, and my brother is sleeping.', pa: 'Mazi bahin abhyas karat aahe, ani maza bhau zoplay.' },
      { en: 'Where are you going tomorrow?', pa: 'Tu udya kuthe jaat aahes?' },
      { en: 'I will finish my work before six.', pa: 'Mi saha vajaychya aadhi maza kaam sampavin.' },
      { en: 'Please wait for five minutes.', pa: 'Please paach minute wait kar.' },
      { en: "I don't understand; say it again.", pa: 'Mala samajla nahi; parat sang.' },
      { en: 'I am not feeling well today.', pa: 'Mala aaj bara vatat nahi.' },
      { en: "Let's meet after dinner.", pa: 'Jevan zalyavar bhetuya.' },
      { en: 'What time is it?', pa: 'Kiti vajle?' },
      { en: 'Do you know where the station is?', pa: 'Tula mahit aahe ka station kuthe aahe?' },
      { en: "I don't like spicy food.", pa: 'Mala tikhat jevan aavadat nahi.' },
      { en: 'We will go to the village on Sunday.', pa: 'Aapan Ravivari gaavi jau.' },
      { en: 'Can you speak a little slowly?', pa: 'Tumhi jara halu bolu shakta ka?' },
      { en: 'It is raining, take an umbrella.', pa: 'Paus padtoy, chhatri ghe.' },
      { en: 'I was at home yesterday.', pa: 'Mi kaal ghari hoto.' },
      { en: 'Did you eat?', pa: 'Jevan zala ka?' },
      { en: "Don't worry, everything is fine.", pa: 'Kalji karu nakos, sagla thik aahe.' },
    ],
  },
];
