import { rows, type HbSection } from '../handbook-types';
import { dialogues } from './dialogues';

// Everyday Punjabi handbook: English | Hindi | Punjabi, all in Roman letters.
// Informal Indian Punjabi; spellings vary and English mixing is intentional.
// Where gender matters, examples use a male speaker (reha → rahi, chaunda → chaundi, javanga → javangi for women).

export const handbook: HbSection[] = [
  {
    id: 'how-to-read',
    title: 'How to read this',
    emoji: '📘',
    notes: [
      { title: 'Long and short sounds', body: '"aa" is a long a (as in father), "a" is short (as in about). "ee" or a final "i" is long (see), "oo" or a final "u" is long (food).' },
      { title: 'h after a letter', body: '"kh", "gh", "chh", "th", "dh", "bh" add a puff of air. Try "kh" in "khaana" by saying "k" with a breath.' },
      { title: 'Doubled letters', body: '"laggi", "kamm", "ajj": hold the doubled sound a little longer. It is very typical of Punjabi.' },
      { title: 'Spelling is flexible', body: 'mainu/menu, bhukh/bhookh, reha/riha, kithe/kitthe are all fine. Roman Punjabi has no single official spelling.' },
      { title: 'aa vs hai', body: 'In casual speech "hai" (is) often becomes "aa": "Ki haal aa?", "Theek aa". Both are correct; "aa" sounds more relaxed.' },
      { title: 'Men and women', body: 'Some words change with the speaker: reha/rahi (doing), karda/kardi (do), chaunda/chaundi (want), javanga/javangi (will go).' },
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
I | main | main
me / to me | mujhe | mainu
you (casual) | tu | tu
you (polite / plural) | aap / tum | tusi
to you (casual) | tujhe | tainu
to you (polite) | aapko | tuhanu
we | hum | asi
to us | humein | saanu
he / she / that | woh | oh
this | yeh | eh
to him / her | use | ohnu
my (for a masculine thing) | mera | mera
my (for a feminine thing) | meri | meri
your (casual) | tera / teri | tera / teri
your (polite) | aapka | tuhada / tuhadi
our | hamara | saada / saadi
his / her | uska | ohda / ohdi
own | apna | apna
`),
      },
      {
        title: 'Family and people',
        rows: rows(`
friend | dost | dost / yaar | "Yaar" is like "buddy"
brother | bhai | veer / bhra | Older brothers are often called "bhaaji"
sister | behen | bhain | Older sisters are often called "didi" or "bhenji"
mother | maa | maa / mummy
father | pita / papa | pyo / papa / bapu ji
family | parivaar | parivaar / family
son | beta | puttar / munda
daughter | beti | dhee / kudi
boy | ladka | munda
girl | ladki | kudi
children | bachche | bachche / nyaane
husband | pati | gharwala / pati
wife | patni | gharwali / vohti
grandmother (father's side) | daadi | daadi / bebe
grandfather (father's side) | daada | daada / baapu
grandmother (mother's side) | naani | naani
grandfather (mother's side) | naana | naana
father's younger brother | chacha | chacha
father's elder brother | taaya | taaya
mother's brother | maama | mama
mother's sister | mausi | massi
father's sister | bua | bhua
aunty / uncle (any elder) | aunty / uncle | aunty ji / uncle ji
neighbour | padosi | guaandi
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
what | kya | ki
who | kaun | kaun
where | kahaan | kithe
from where | kahaan se | kithon
when | kab | kadon
why | kyon | kyon
how | kaise | kiven / kidda
how much / how many | kitna / kitne | kinna / kinne
which | kaun sa | kehda / kehdi
whose | kiska | kihda / kisda
`),
      },
      {
        title: 'Connectors and small words',
        rows: rows(`
and | aur | te
but | lekin | par
or | ya | ya / jaan
if | agar | je
then | toh | taan
because | kyonki | kyonki
so / therefore | isliye | is karke
also | bhi | vi
not | nahin | nahi
yes | haan | haan / haanji
no | nahin | nahi / na
okay | theek hai | theek aa
maybe | shayad | shayad
only | sirf | sirf / bas
with | saath | naal
in / inside | mein | vich
on | par | te / utte
to / at (someone) | ko | nu
for | ke liye | layi
of | ka / ki / ke | da / di / de
from | se | ton
after | baad | ton baad
before | pehle | ton pehlan
again | phir se | fer / dobara
still | abhi bhi | hale vi
already | pehle hi | pehlan hi / already
`),
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    emoji: '🔢',
    intro: 'Punjabi numbers are close to Hindi, with a few sound changes: ek → ik, teen → tinn, paanch → panj, saat → satt, bees → veeh.',
    tables: [
      {
        title: '1 to 20',
        rows: rows(`
one | ek | ik
two | do | do
three | teen | tinn
four | chaar | chaar
five | paanch | panj
six | chhah | chhe
seven | saat | satt
eight | aath | atth
nine | nau | nau
ten | das | das
eleven | gyaarah | gyaaran
twelve | baarah | baaran
thirteen | terah | tehran
fourteen | chaudah | chaudan
fifteen | pandrah | pandran
sixteen | solah | solaan
seventeen | satrah | sataaran
eighteen | athaarah | athaaran
nineteen | unnees | unni
twenty | bees | veeh
`),
      },
      {
        title: 'Bigger numbers',
        rows: rows(`
twenty-five | pachchees | pachchi
thirty | tees | tih
forty | chaalees | chaali
fifty | pachaas | panjaah
sixty | saath | satth
seventy | sattar | sattar
eighty | assi | assi
ninety | nabbe | nabbe
hundred | sau | sau
one and a half (150) | dedh (sau) | dedh (sau)
two and a half (250) | dhaai (sau) | dhaai (sau)
thousand | hazaar | hazaar
lakh (100,000) | laakh | lakh
first | pehla | pehla
second | doosra | dooja
third | teesra | teeja
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
today | aaj | ajj
tomorrow / yesterday | kal | kal | Same word; the verb tense tells you which
day after tomorrow | parson | parson
now | ab | hun
right now | abhi | hune
later | baad mein | baad vich
morning | subah | savere
afternoon | dopahar | dupehar
evening | shaam | shaam
night | raat | raat
day | din | din
week | hafta | hafta / week
month | mahina | mahina
year | saal | saal
minute | minute | mint
hour | ghanta | ghanta
early / quickly | jaldi | jaldi
late | der | late / der
always | hamesha | hamesha
sometimes | kabhi kabhi | kade kade
never | kabhi nahi | kade nahi
`),
      },
      {
        title: 'Days of the week',
        rows: rows(`
Monday | Somvaar | Somvaar
Tuesday | Mangalvaar | Mangalvaar
Wednesday | Budhvaar | Budhvaar
Thursday | Guruvaar | Veervaar
Friday | Shukravaar | Shukarvaar
Saturday | Shanivaar | Shanivaar / Sanichharvaar
Sunday | Ravivaar | Aitvaar
`),
      },
      {
        title: 'Telling the time',
        rows: rows(`
What time is it? | Kitne baje hain? | Kinne vajje ne?
It's five o'clock. | Paanch baje hain. | Panj vajje ne.
5:15 | sava paanch | sava panj
5:30 | saadhe paanch | saadhe panj
4:45 | paune paanch | paune panj
1:30 | dedh | dedh
2:30 | dhaai | dhaai
at seven | saat baje | satt vajje
in the morning at eight | subah aath baje | savere atth vajje
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
home | ghar | ghar
outside | baahar | bahar
inside | andar | ander
here | yahaan | itthe
there | wahaan | othe
market | bazaar | bazaar / market
college | college | college
office | daftar | office / daftar
room | kamra | kamra / room
road | sadak | sadak
street / lane | gali | gali
shop | dukaan | dukaan / shop
hospital | aspataal | hospital / haspataal
temple / gurdwara | mandir / gurudwara | mandir / gurdwara
village | gaon | pind
city | shehar | shehar
station | station | station
`),
      },
      {
        title: 'Directions',
        rows: rows(`
near | paas | nere
far | door | door
up / on top | upar | utte
down / below | neeche | thalle
left | baayein | khabbe / left
right | daayein | sajje / right
straight | seedha | sidha
turn | mudna | mudna
in front | saamne | saahmne
behind | peeche | pichhe
next to | bagal mein | naal
Where is the station? | Station kahaan hai? | Station kithe aa?
Go straight, then turn left. | Seedha jao, phir left mudo. | Sidha jao, fer khabbe mud jao.
Is it far? | Kya yeh door hai? | Door aa?
It's nearby. | Paas mein hai. | Nere hi aa.
`),
      },
    ],
  },
  {
    id: 'food',
    title: 'Food and drink',
    emoji: '🍲',
    tables: [
      {
        rows: rows(`
food | khaana | khaana / roti | "Roti" often means a whole meal
water | paani | paani
tea | chai | chaah
milk | doodh | dudh
yoghurt | dahi | dahi
butter | makkhan | makhan
bread / roti | roti | roti / phulka
paratha | paratha | parontha / paratha
rice | chaawal | chaul
lentils | daal | daal
vegetables | sabzi | sabzi
mustard greens | sarson ka saag | sarson da saag
corn flatbread | makke ki roti | makki di roti
salt | namak | loon / namak
sugar | cheeni | cheeni / khand
chilli | mirch | mirch
onion | pyaaz | ganda / pyaaz
potato | aalu | aalu
mango | aam | amb
egg | anda | anda
sweet | meetha | mittha
salty | namkeen | namkeen / loona
spicy | teekha | tikha / spicy
hungry | bhookh lagi | bhukh laggi
thirsty | pyaas lagi | pyaas laggi
full (after eating) | pet bhar gaya | rajj gaya
tasty | swaadisht | swaad / sawaadi
`),
      },
      {
        title: 'At the table',
        rows: rows(`
I'm hungry. | Mujhe bhookh lagi hai. | Mainu bhukh laggi aa.
I'm full. | Mera pet bhar gaya. | Main rajj gaya.
Give me some more. | Thoda aur do. | Thoda hor deyo.
Not too spicy, please. | Zyada teekha nahi. | Zyada tikha na hove.
This is very tasty. | Yeh bahut swaadisht hai. | Eh bahut swaad aa.
Bring the bill. | Bill le aao. | Bill le aao.
`),
      },
    ],
  },
  {
    id: 'daily',
    title: 'Home and daily life',
    emoji: '🏠',
    tables: [
      {
        rows: rows(`
sleep | neend | neend
work | kaam | kamm / work
study (noun) | padhaai | padhai
book | kitaab | kitaab
phone | phone | phone
money | paise | paise
clothes | kapde | kapde
hair | baal | vaal
door | darwaaza | darvaaza / boohaa
window | khidki | baari
kitchen | rasoi | rasoi / kitchen
bed | bistar | manja / bed
key | chaabi | chaabi
bag | thaila | bag / jhola
car | gaadi | gaddi / car
bike | bike | bike
light / electricity | bijli | bijli / light
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
head | sir | sir
eye | aankh | akh
ear | kaan | kann
nose | naak | nakk
mouth | munh | munh
teeth | daant | dand
hand | haath | hath
foot / leg | pair / taang | pair / latt
stomach | pet | dhidd / pet
back | peeth | pith
`),
      },
      {
        title: 'Feeling unwell',
        rows: rows(`
pain | dard | dard
fever | bukhaar | bukhar / fever
cough | khaansi | khangh
cold (illness) | zukaam | zukaam
medicine | dawai | dawai / medicine
doctor | doctor | doctor
I have a headache. | Mere sir mein dard hai. | Mere sir vich dard aa.
I have a fever. | Mujhe bukhaar hai. | Mainu bukhar aa.
My stomach hurts. | Mere pet mein dard hai. | Mere dhidd vich dard aa.
I'm not feeling well. | Meri tabiyat theek nahi. | Meri tabiyat theek nahi.
I feel better now. | Ab main behtar hoon. | Hun main changa mehsoos kar reha haan.
I need some rest. | Mujhe aaraam chahiye. | Mainu araam chahida aa.
`),
      },
    ],
  },
  {
    id: 'verbs',
    title: 'Common verbs',
    emoji: '🏃',
    intro: 'Most Punjabi verbs end in -na, like Hindi. Many swap a sound: aana → auna, bataana → dassna, bhaagna → bhajjna, chalna (walk) → turna.',
    tables: [
      {
        rows: rows(`
to go | jaana | jaana
to come | aana | auna
to eat | khaana | khaana
to drink | peena | peena
to do | karna | karna
to make | banaana | banauna
to see / watch | dekhna | dekhna
to speak | bolna | bolna
to say / tell | bataana | dassna
to ask | poochhna | puchhna
to listen | sunna | sunna
to understand | samajhna | samajhna
to read / study | padhna | padhna
to write | likhna | likhna
to meet | milna | milna
to sleep | sona | sona
to sit | baithna | baithna
to stand | khada hona | khada hona
to wait | intezaar karna | wait karna / udeek karni
to finish | khatam karna | khatam karna / mukauna
to buy | khareedna | khareedna
to sell | bechna | vechna
to give | dena | dena
to take | lena | laina
to bring | laana | liauna
to keep / put | rakhna | rakhna
to call | phone karna | call karna
to leave | nikalna | nikalna
to arrive | pahunchna | pahunchna
to want | chaahna | chauna
to feel | mehsoos karna | mehsoos karna
to walk | chalna | turna
to run | bhaagna | bhajjna
to play | khelna | khedna
to laugh | hasna | hassna
to cry | rona | rona
to wash | dhona | dhona
to cook | pakaana | pakauna / banauna
to open | kholna | kholna
to close | band karna | band karna
to forget | bhoolna | bhullna
to remember | yaad karna | yaad karna
to know | pata hona | pata hona
to learn | seekhna | sikhna
to teach | sikhaana | sikhauna
to help | madad karna | madad karni / help karni
to wake up | uthna | uthna
to bathe | nahaana | nahauna
to get ready | taiyaar hona | tayyar hona
to change | badalna | badalna / change karna
`),
      },
    ],
  },
  {
    id: 'tenses',
    title: 'Verb forms (tenses)',
    emoji: '🔁',
    intro: 'Three verbs in all the everyday forms. For a woman speaking, swap -da → -di, reha → rahi, -anga → -angi, gaya → gayi.',
    tables: [
      {
        title: 'karna (to do)',
        rows: rows(`
I do | main karta hoon | main karda haan
I am doing | main kar raha hoon | main kar reha haan
I did | maine kiya | main kitta
I will do | main karunga | main karanga
we do | hum karte hain | asi karde haan
you do (polite) | aap karte ho | tusi karde ho
he / she does | woh karta / karti hai | oh karda / kardi aa
they did | unhone kiya | ohna ne kitta
`),
      },
      {
        title: 'jaana (to go)',
        rows: rows(`
I go | main jaata hoon | main janda haan
I am going | main ja raha hoon | main ja reha haan
I went | main gaya | main gaya
I will go | main jaaunga | main javanga
we will go | hum jaayenge | asi javange
you went (casual) | tu gaya | tu gaya
did you go? (polite) | aap gaye? | tusi gaye?
`),
      },
      {
        title: 'khaana (to eat)',
        rows: rows(`
I eat | main khaata hoon | main khaanda haan
I am eating | main kha raha hoon | main kha reha haan
I ate | maine khaaya | main khaadha
I will eat | main khaaunga | main khaavanga
have you eaten? | khaana kha liya? | roti kha layi?
`),
      },
      {
        title: 'Was / were / will be',
        rows: rows(`
was / were | tha / the | si / san
I was at home. | Main ghar par tha. | Main ghar si.
They were here. | Woh yahaan the. | Oh itthe san.
will be (I) | hoonga | hovanga
I'll be free after five. | Main paanch baje ke baad free hoonga. | Main panj vajje ton baad free hovanga.
`),
      },
    ],
  },
  {
    id: 'describe',
    title: 'Feelings and descriptions',
    emoji: '😊',
    tables: [
      {
        rows: rows(`
good / fine | achha / theek | changa / theek
great | badhiya | vadhiya
bad | bura | maada
beautiful / nice | sundar | sohna / sohni
happy | khush | khush
sad | udaas | udaas
angry | gussa | gussa
tired | thaka hua | thakkya hoya / tired
worried | pareshaan | pareshaan / tension vich
scared | dara hua | darr gaya
bored | bore | bore
busy | vyast | busy
free / available | khaali | vehla / free
big | bada | vadda
small | chhota | chhota
new | naya | nava / navi
old (thing) | puraana | puraana
easy | aasaan | saukha
difficult | mushkil | aukha
fast | tez | tez
slow | dheere | hauli
clean | saaf | saaf
dirty | ganda | ganda
hot | garam | garam
cold | thanda | thanda
very | bahut | bahut
a little / some | thoda | thoda
nothing | kuchh nahin | kujh nahi
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
heat / summer | garmi | garmi
cold / winter | sardi / thand | sardi / thand
rain | baarish | meenh
sun / sunshine | dhoop | dhupp
wind | hawa | hava
cloud | baadal | baddal
fog | kohra | dhund
It's very hot today. | Aaj bahut garmi hai. | Ajj bahut garmi aa.
It's raining. | Baarish ho rahi hai. | Meenh pai reha aa.
It's very cold. | Bahut thand hai. | Bahut thand aa.
Take an umbrella. | Chhaata le lo. | Chhatri lai lao.
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
hello | namaste | Sat Sri Akal / hello
how are you? | kaise ho? | ki haal aa? / kiven ho?
no problem | koi baat nahin | koi gall nahi / koi na
thank you | dhanyavaad / shukriya | shukriya / dhanvaad / thank you
sorry | maaf karna | sorry / maaf karna
please | kripya | please / meharbani karke
don't worry | chinta mat karo | fikar na kar / tension na lai
come quickly | jaldi aao | jaldi aaja
see you | phir milenge | fer milange
take care | dhyaan rakhna | apna dhyaan rakhi
bye | alvida / bye | rab rakha / bye
congratulations | badhaai ho | vadhaiyan
happy birthday | janamdin mubarak | happy birthday
welcome (come in) | aaiye | aao ji
`),
      },
    ],
  },
  {
    id: 'english-mix',
    title: 'Punjabi + English (how people really talk)',
    emoji: '🔀',
    intro: 'Casual Punjabi uses lots of English words. The Punjabi grammar stays, and the English word slots in. You will sound more natural (not less) if you mix like this.',
    notes: [
      { title: 'English verb + karna', body: 'Take any English verb and add karna (to do): call karna, wait karna, order karna, book karna, check karna, cancel karna, share karna, reply karna, download karna, enjoy karna.' },
      { title: 'English describing word + aa / haan', body: 'Main busy haan (I am busy). Oh free aa (she is free). Eh boring aa (this is boring). Movie super aa (the movie is great).' },
      { title: 'English place or thing + Punjabi small words', body: 'office vich (in the office), college ton (from college), phone te (on the phone), meeting ton baad (after the meeting), weekend te (on the weekend).' },
      { title: 'Words people almost always say in English', body: 'phone, call, message, plan, order, online, late, sorry, please, thank you, tension, problem, office, college, class, exam, party, weekend, ticket, bill, traffic, station, TV, movie, already, actually, sure.' },
    ],
    tables: [
      {
        title: 'Mixed sentences',
        rows: rows(`
I'm busy right now. | Main abhi busy hoon. | Main hune busy haan.
Are you free? | Kya tum free ho? | Tu free ain?
Give me a call. | Mujhe call karna. | Mainu call kari.
I'll message you. | Main tumhe message karunga. | Main tainu message karanga.
What's the plan? | Kya plan hai? | Ki plan aa?
Let's order online. | Chalo online order karte hain. | Chal, online order kar lainde haan.
Sorry, I got late. | Sorry, mujhe late ho gaya. | Sorry, mainu late ho gaya.
Don't take tension. | Tension mat lo. | Tension na lai.
There's no problem. | Koi problem nahi hai. | Koi problem nahi.
Wait five minutes. | Paanch minute wait karo. | Panj mint wait kar.
Did you book the tickets? | Tickets book kiye? | Tickets book kitte?
Check your phone. | Apna phone check karo. | Apna phone check kar.
Finish the assignment. | Assignment complete kar lo. | Assignment complete kar lai.
The movie was super. | Movie super thi. | Movie super si.
I already told you. | Maine pehle hi bataaya tha. | Main already dass dittaa si.
Actually, I'm tired. | Actually, main thak gaya hoon. | Actually, main thakk gaya haan.
Send me the location. | Location bhej do. | Location bhej de.
The restaurant is closed. | Restaurant band hai. | Restaurant band aa.
My phone's battery is dead. | Mere phone ki battery khatam hai. | Mere phone di battery khatam aa.
See you at the party. | Party mein milte hain. | Party te milde haan.
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
I am ... | main ... hoon | Main ... haan.
We are ... | hum ... hain | Asi ... haan.
He / she is ... | woh ... hai | Oh ... aa.
You are ... (polite) | aap ... ho | Tusi ... ho.
I want to ... | main ... karna chahta hoon | Main ... karna chaunda haan.
She wants to ... | woh ... karna chahti hai | Oh ... karna chaundi aa.
I am doing ... | main ... kar raha hoon | Main ... kar reha haan.
She is doing ... | woh ... kar rahi hai | Oh ... kar rahi aa.
I will go | main jaaunga | Main javanga.
We can go | hum ja sakte hain | Asi ja sakde haan.
Can you ...? | kya aap ... sakte ho? | Ki tusi ... sakde ho?
I have to go | mujhe jaana hai | Mainu jaana paina aa.
I need ... | mujhe ... chahiye | Mainu ... chahida aa.
I have ... | mere paas ... hai | Mere kol ... aa.
I like ... | mujhe ... pasand hai | Mainu ... pasand aa.
I don't like ... | mujhe ... pasand nahi | Mainu ... pasand nahi.
I don't know. | mujhe nahi pata | Mainu nahi pata.
Let's ... | chalo ... karte hain | Chal, ... kariye.
Don't ... | ... mat karo | ... na kar.
If ..., then ... | agar ..., toh ... | Je ..., taan ...
I am hungry | mujhe bhookh lagi hai | Mainu bhukh laggi aa.
I am sleepy | mujhe neend aa rahi hai | Mainu neend aa rahi aa.
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
How are you? | Tum kaise ho? | Tu kiven ain? / Ki haal aa?
I am fine. | Main theek hoon. | Main theek haan.
What are you doing? | Tum kya kar rahe ho? | Tu ki kar reha ain?
I am at home. | Main ghar par hoon. | Main ghar vich haan.
Where are you? | Tum kahaan ho? | Tu kithe ain?
What does this mean? | Iska kya matlab hai? | Ehda ki matlab aa?
I don't understand. | Mujhe samajh nahin aaya. | Mainu samajh nahi aayi.
Say that again. | Phir se bolo. | Ik vaar fer dass.
Speak a little slowly. | Thoda dheere bolo. | Thoda hauli boli.
I'm learning Punjabi. | Main Punjabi seekh raha hoon. | Main Punjabi sikh reha haan.
Let's talk later. | Baad mein baat karte hain. | Baad vich gall karde haan.
What's new? | Aur sunao? | Hor sunao?
Nothing much. | Kuchh khaas nahi. | Kujh khaas nahi.
I missed you. | Maine tumhe miss kiya. | Main tainu miss kitta.
`),
      },
      {
        title: 'Food and plans',
        rows: rows(`
I am hungry. | Mujhe bhookh lagi hai. | Mainu bhukh laggi aa.
Are you hungry? | Kya tumhein bhookh lagi hai? | Tainu bhukh laggi aa?
I need water. | Mujhe paani chahiye. | Mainu paani chahida aa.
Let's go eat. | Chalo khaana khaane chalte hain. | Chal, khaana khaan chaliye.
What should we order? | Hum kya order karein? | Asi ki order kariye?
Order something for me. | Mere liye kuchh order kar do. | Mere layi kujh order kar deyi.
Don't make it too spicy. | Zyada teekha mat banaana. | Zyada spicy na hove.
I'll pay today. | Aaj main paise doonga. | Ajj main pay karanga.
We can meet tomorrow. | Hum kal mil sakte hain. | Asi kal mil sakde haan.
Are you free tomorrow? | Kya tum kal free ho? | Tu kal free ain?
I'll be free after five. | Main paanch baje ke baad free ho jaaunga. | Main panj vajje ton baad free hovanga.
Call me when you are free. | Free hone par mujhe call karna. | Jadon tu free hovein, mainu call kari.
I'll come in ten minutes. | Main das minute mein aaunga. | Main das mintaan vich aa javanga.
I am on my way. | Main raaste mein hoon. | Main raste vich haan.
We will go together. | Hum saath jaayenge. | Asi ikatthe javange.
If you are free, call me. | Agar tum free ho, toh mujhe call karna. | Je tu free ain, taan mainu call kari.
Let's order online. | Chalo online order karte hain. | Chal, online order kar lainde haan.
`),
      },
      {
        title: 'Work, study and health',
        rows: rows(`
Don't be angry. | Gussa mat hona. | Gussa na kariyo.
I am studying now. | Main abhi padh raha hoon. | Main hun padh reha haan.
I have work today. | Aaj mujhe kaam hai. | Ajj mera kamm aa.
I'll finish my work first. | Main pehle apna kaam khatam karunga. | Main pehlan apna kamm khatam kar lavanga.
I will go to college tomorrow. | Main kal college jaaunga. | Main kal college javanga.
Why didn't you come yesterday? | Tum kal kyon nahin aaye? | Tu kal kyon nahi aaya?
I wasn't feeling well. | Meri tabiyat theek nahin thi. | Meri tabiyat theek nahi si.
I have a headache. | Mere sir mein dard hai. | Mere sir vich dard aa.
I am feeling better now. | Ab main behtar mehsoos kar raha hoon. | Hun main thoda changa mehsoos kar reha haan.
I have a meeting at ten. | Das baje meri meeting hai. | Das vajje meri meeting aa.
My exam is on Monday. | Mera exam Somvaar ko hai. | Mera exam Somvaar nu aa.
I'm very tired today. | Aaj main bahut thak gaya hoon. | Ajj main bahut thakk gaya haan.
`),
      },
      {
        title: 'Family and home',
        rows: rows(`
My sister is at home. | Meri behen ghar par hai. | Meri bhain ghar vich aa.
My brother is watching TV. | Mera bhai TV dekh raha hai. | Mera veer TV dekh reha aa.
My mother is cooking. | Meri maa khaana bana rahi hai. | Meri maa khaana bana rahi aa.
My father is at work. | Mere papa kaam par hain. | Mere papa kamm te ne.
I want to go outside. | Main baahar jaana chahta hoon. | Main bahar jaana chaunda haan.
She wants to sleep. | Woh sona chahti hai. | Oh sona chaundi aa.
Have you eaten? | Khaana kha liya? | Roti kha layi?
Come, sit. | Aao, baitho. | Aao, baitho.
Where are the keys? | Chaabi kahaan hai? | Chaabi kithe aa?
Switch off the light. | Light band kar do. | Light band kar de.
`),
      },
      {
        title: 'Looks and shopping',
        rows: rows(`
I got a haircut. | Maine baal katvaaye hain. | Main haircut karvaya aa.
How do I look? | Main kaisa lag raha hoon? | Main kiven lagg reha haan?
Your new look is nice. | Tumhaara naya look achha hai. | Teri navi look vadhiya aa.
How much is this? | Yeh kitne ka hai? | Eh kinne da aa?
It's too expensive. | Bahut mehnga hai. | Bahut mehnga aa.
Do you have a bigger size? | Bada size hai? | Vadda size hai?
Can I pay by UPI? | UPI se pay kar sakta hoon? | UPI naal pay kar sakda haan?
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
hey! | arre! | oye! | Friendly between friends; avoid with elders
buddy / man | yaar | yaar
how's it going? (very casual) | kya haal? | kidda? / ki haal aa? | "Kidda" is common in Malwa
what's new? | aur sunao | hor sunao
all good (by God's grace) | sab badhiya | rab di mehar aa
for sure? / promise? | pakka? | pakka?
really? | sach mein? | sachi?
go for it! | lage raho! | chak de phatte!
hooray! | waah! | balle balle!
well done! | shaabaash! | shabaash!
no worries | koi baat nahi | koi na / chal koi na
leave it | rehne do | rehan de
stop it | bas karo | bas kar
hurry up | jaldi karo | jaldi kar
slowly, slowly | dheere dheere | hauli hauli
alright then | chalo theek hai | chal theek aa
don't take tension | tension mat lo | tension na lai
what to do! | kya karein! | ki kariye!
it's nothing | kuchh nahi | kujh nahi
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
      { title: 'Main vs mainu', body: 'Main = I (doing something): Main ghar vich haan. Mainu = to me (something happens to me): Mainu bhukh laggi aa.' },
      { title: 'Mera vs meri', body: 'Mera veer (my brother), meri bhain (my sister). The thing owned decides the form, not the owner.' },
      { title: 'Reha vs rahi', body: 'Main padh reha haan (man). Main padh rahi haan (woman). Oh padh reha aa / Oh padh rahi aa.' },
      { title: 'Chaunda vs chaundi', body: 'Main jaana chaunda haan (man). Main jaana chaundi haan (woman).' },
      { title: 'Haan, aa, ho, ne', body: 'Main ... haan; asi ... haan; tusi ... ho; oh ... aa (one person) or oh ... ne (several people / respect). Casually, people also say "aa" with main/asi.' },
      { title: 'Si and san (was, were)', body: 'Main ghar si (I was home). Oh othe san (they were there). Hindi: tha / the.' },
      { title: 'Nu, naal, vich, layi, ton, te', body: 'Ohnu call kar (call him/her), mere naal (with me), ghar vich (at home), mere layi (for me), college ton (from college), phone te (on the phone).' },
      { title: 'Da, di, de (of)', body: 'Like Hindi ka/ki/ke: Simran da phone (Simran’s phone), mummy di gaddi (Mum’s car), dosta de ghar (at friends’ place).' },
      { title: 'Past, present, future', body: 'Main aaya si = I came. Main aa reha haan = I am coming. Main aavanga = I will come (man), aavangi (woman).' },
      { title: 'Requests', body: 'Mainu call kar = call me. Mainu call kari = give me a call (softer, for later). Gussa na kariyo = don’t get angry, okay. Add "ji" to be polite.' },
      { title: 'Questions', body: 'Just raise your voice at the end: "Tu free ain?" You can also start with "ki": "Ki tusi free ho?"' },
      { title: 'Saying no', body: 'Put nahi before the verb: Main nahi ja reha (I am not going). "Na" is used in commands: Na kar (don’t).' },
    ],
  },
  {
    id: 'practice',
    title: 'Self-practice',
    emoji: '✍️',
    intro: 'Say or write each one in Punjabi, then tap to reveal an answer. Other answers can be right too!',
    practice: [
      { en: 'I am busy now, but I will call you tonight.', pa: 'Main hun busy haan, par ajj raat tainu call karanga.' },
      { en: 'If you are hungry, we can order food.', pa: 'Je tainu bhukh laggi aa, taan asi food order kar sakde haan.' },
      { en: 'My sister is studying, and my brother is sleeping.', pa: 'Meri bhain padh rahi aa, te mera veer so reha aa.' },
      { en: 'Where are you going tomorrow?', pa: 'Tu kal kithe ja reha ain?' },
      { en: 'I will finish my work before six.', pa: 'Main chhe vajje ton pehlan apna kamm khatam kar lavanga.' },
      { en: 'I got a haircut yesterday. How do I look?', pa: 'Main kal haircut karvaya si. Main kiven lagg reha haan?' },
      { en: 'Please wait for five minutes.', pa: 'Please panj mint wait kar lai.' },
      { en: "I don't understand; say it again.", pa: 'Mainu samajh nahi aayi; ik vaar fer dass.' },
      { en: 'I am not feeling well today.', pa: 'Ajj meri tabiyat theek nahi aa.' },
      { en: "Let's meet after dinner.", pa: 'Chal, dinner ton baad milde haan.' },
      { en: 'What time is it?', pa: 'Kinne vajje ne?' },
      { en: 'My phone is on silent.', pa: 'Mera phone silent te aa.' },
      { en: 'Do you know where the station is?', pa: 'Tainu pata station kithe aa?' },
      { en: "I don't like spicy food.", pa: 'Mainu spicy khaana pasand nahi.' },
      { en: 'We will go to the village on Sunday.', pa: 'Asi Aitvaar nu pind javange.' },
      { en: 'Can you speak a little slowly?', pa: 'Ki tusi thoda hauli bol sakde ho?' },
      { en: 'It is raining, take an umbrella.', pa: 'Meenh pai reha aa, chhatri lai lao.' },
      { en: 'I was at home yesterday.', pa: 'Main kal ghar si.' },
      { en: 'Did you eat?', pa: 'Roti kha layi?' },
      { en: "Don't worry, everything is fine.", pa: 'Fikar na kar, sab theek aa.' },
    ],
  },
];
