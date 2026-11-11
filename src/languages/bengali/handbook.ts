import { rows, type HbSection } from '../handbook-types';
import { dialogues } from './dialogues';

// Everyday Bengali handbook: English | Hindi | Bengali, all in Roman letters.
// Casual Kolkata Bangla; spellings vary and English mixing is intentional.

export const handbook: HbSection[] = [
  {
    id: 'how-to-read',
    title: 'How to read this',
    emoji: '📘',
    notes: [
      { title: 'a and o', body: '"a" is always the open "aa" of father (ami, bhalo). "o" is the rounded sound in "bhalo", "kemon", "jol". Bengali uses that "o" where Hindi has a short "a": Hindi "kal" sounds "kol" in jol, mon, kotha.' },
      { title: 'sh, chh, j', body: 'Bengali "s" is mostly "sh" (shob, shotti, ashchhi). "chh" is a breathy ch (achi / achhi). "j" also covers the Bengali "y" letter (jabo, jodi).' },
      { title: 'b and v', body: 'Bengali has no "v": "bhalo" is sometimes typed "valo". Both mean good, and the checker accepts both.' },
      { title: 'Spelling is flexible', body: 'acho/achho, kichhu/kichu, shotti/sotti, bhalo/valo are all fine. Roman Bengali has no single official spelling.' },
      { title: 'No "is" needed', body: 'Bengali often drops "is / am": "Amar naam Rohan" (my name Rohan), "Eta koto?" (this how much?). "Ache" is used for "is there / is (in a state)": "Sob thik ache".' },
      { title: 'No he / she, no gendered verbs', body: '"O" means he or she, and verbs are the same for men and women: Ami jachchhi, o jachchhe. One less thing to learn!' },
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
I | main | ami
me / to me | mujhe | amake
you (very close friends) | tu | tui
you (casual) | tum | tumi
to you (casual) | tumhe | tomake
you (polite) | aap | apni
to you (polite) | aapko | apnake
we | hum | amra
to us | humein | amader
he / she (casual) | woh | o / she
he / she (polite) | woh (aadar se) | uni / tini
this | yeh | eta / ei
that | woh | ota / oi
to him / her | use | oke
my | mera / meri | amar
your (casual) | tumhara | tomar
your (polite) | aapka | apnar
our | hamara | amader
his / her | uska | or / tar
own | apna | nijer
`),
      },
      {
        title: 'Family and people',
        rows: rows(`
friend | dost | bondhu
brother | bhai | bhai | An elder brother is called "dada"
sister | behen | bon | An elder sister is called "didi"
mother | maa | ma
father | pita / papa | baba
family | parivaar | poribar / family
son | beta | chhele
daughter | beti | meye
boy | ladka | chhele
girl | ladki | meye
children | bachche | bachcha / chhelemeye
husband | pati | bor / swami
wife | patni | bou / stri
grandmother (father's side) | daadi | thakuma
grandfather (father's side) | daada | thakurda / dadu
grandmother (mother's side) | naani | didima
grandfather (mother's side) | naana | dadu
father's younger brother | chacha | kaka / kaku
his wife | chachi | kakima
mother's brother | maama | mama
mother's sister | mausi | mashi | A friend's mother is "mashima"
father's sister | bua | pishi
aunty / uncle (any elder) | aunty / uncle | kakima / kaku, mashima / mesho
neighbour | padosi | protibeshi
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
who | kaun | ke
where | kahaan | kothay
from where | kahaan se | kotha theke
when | kab | kokhon
why | kyon | keno
how (in what way) | kaise | kibhabe
how (state) | kaisa | kemon
how much / how many | kitna / kitne | koto / kota
which | kaun sa | kon ta
whose | kiska | kar
`),
      },
      {
        title: 'Connectors and small words',
        rows: rows(`
and | aur | ar / ebong
but | lekin | kintu
or | ya | ba / naki
if | agar | jodi
then | toh | tahole
because | kyonki | karon
so / therefore | isliye | tai
also / too | bhi | -o (amio = me too)
not | nahin | na
there isn't | nahin hai | nei
yes | haan | hyan
no | nahin | na
okay | theek hai | thik ache / accha
maybe | shayad | hoyto
only | sirf | shudhu
with | saath | sathe
in / inside | mein | -e / bhetore
on / above | par / upar | opore
to (someone) | ko | -ke
for | ke liye | jonno
of | ka / ki / ke | -er / -r
from | se | theke
after | baad | pore
before | pehle | age
again | phir se | abar
still / more | abhi bhi / aur | ekhono / aro
`),
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    emoji: '🔢',
    intro: 'Bengali numbers are close to Hindi with an "o" sound: do → dui, das → dosh, sau → eksho. After a number, add "-ta" when counting things: duto cha (two teas), ekta roll (one roll).',
    tables: [
      {
        title: '1 to 20',
        rows: rows(`
one | ek | ek
two | do | dui
three | teen | tin
four | chaar | char
five | paanch | panch
six | chhah | chhoy
seven | saat | saat
eight | aath | aat
nine | nau | noy
ten | das | dosh
eleven | gyaarah | egaro
twelve | baarah | baro
thirteen | terah | tero
fourteen | chaudah | choddo
fifteen | pandrah | ponero
sixteen | solah | sholo
seventeen | satrah | sotero
eighteen | athaarah | atharo
nineteen | unnees | unish
twenty | bees | kuri
`),
      },
      {
        title: 'Bigger numbers',
        rows: rows(`
twenty-five | pachchees | pochish
thirty | tees | tirish
forty | chaalees | chollish
fifty | pachaas | ponchash
sixty | saath | shat
seventy | sattar | shottor
eighty | assi | ashi
ninety | nabbe | nobboi
hundred | sau | eksho
one and a half (150) | dedh (sau) | dersho
two and a half (250) | dhaai (sau) | araisho
thousand | hazaar | hajar
lakh (100,000) | laakh | lakh
first | pehla | prothom
second | doosra | ditiyo
third | teesra | tritiyo
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
today | aaj | aj
tomorrow / yesterday | kal | kal | Same word; the verb tense tells you which
day after tomorrow | parson | porshu
now | ab | ekhon
right now | abhi | ekhuni
later | baad mein | pore
morning | subah | sokal
afternoon | dopahar | dupur
late afternoon | shaam | bikel
evening | shaam | sondhe
night | raat | raat
early / quickly | jaldi | taratari
late | der se | deri kore / late
always | hamesha | sobsomoy
sometimes | kabhi kabhi | majhe majhe
every day | roz | roj
week | hafta | soptaho
month | mahina | mash
year | saal | bochhor
`),
      },
      {
        title: 'Days of the week',
        rows: rows(`
Monday | Somvaar | Sombar
Tuesday | Mangalvaar | Mongolbar
Wednesday | Budhvaar | Budhbar
Thursday | Guruvaar | Brihoshpotibar
Friday | Shukravaar | Shukrobar
Saturday | Shanivaar | Shonibar
Sunday | Ravivaar | Robibar
`),
      },
      {
        title: 'Telling the time',
        rows: rows(`
What time is it? | Kitne baje hain? | Kota baje?
It's two o'clock. | Do baje hain. | Duto baje.
at seven | saat baje | saat tay
half past three | saadhe teen | sare tinte
quarter past four | sawa chaar | sowa charte
quarter to five | paune paanch | pone panchta
half past one | dedh | derta
half past two | dhaai | araite
in ten minutes | das minute mein | dosh minite
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
house / home | ghar | bari
at home | ghar par | barite
market | bazaar | bajar
shop | dukaan | dokan
school | school | ishkul / school
office | office | office / aphish
hospital | aspataal | haspatal
station | station | station
road | sadak | rasta
temple | mandir | mondir
village | gaon | gram
city | shehar | shohor
`),
      },
      {
        title: 'Directions',
        rows: rows(`
here | yahaan | ekhane
there | wahaan | okhane
near | paas | kachhe
far | door | dure
left | baayein | bam dike
right | daayein | dan dike
straight | seedha | soja
in front | saamne | samne
behind | peeche | pechhone
up / upstairs | upar | opore
down / downstairs | neeche | niche
inside | andar | bhetore
outside | bahar | baire
Where is the station? | Station kahaan hai? | Station ta kothay?
Go straight. | Seedha jaao. | Soja jan.
Turn left. | Left mudo. | Bam dike ghurun.
Is it near here? | Kya yeh paas mein hai? | Ekhan theke kachhe?
Stop here. | Yahaan roko. | Ekhane thamun.
Drop me here. | Mujhe yahaan chhod do. | Amake ekhane namiye din.
How far is it? | Kitna door hai? | Koto dur?
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
water | paani | jol
tea | chai | cha
milk | doodh | dudh
coffee | coffee | coffee
food | khaana | khabar
breakfast / snack | naashta | jolkhabar
rice | chaawal | bhaat
flatbread | roti | ruti
vegetable dish | sabzi | torkari
lentils | daal | dal
sweet / sweets | meetha / mithai | mishti
spicy (hot) | teekha | jhal
salt | namak | nun
sugar | cheeni | chini
fruit | phal | phol
egg | anda | dim
fish | machhli | maachh
tasty | swaadisht | sushadu / darun
`),
      },
      {
        title: 'At the table',
        rows: rows(`
I'm hungry. | Mujhe bhookh lagi hai. | Amar khide peyechhe.
I'm thirsty. | Mujhe pyaas lagi hai. | Amar tesh peyechhe.
Have you eaten? | Khana kha liya? | Kheyechho?
Take a little more. | Thoda aur lo. | Aro ektu nao.
It's very spicy. | Bahut teekha hai. | Khub jhal.
It's delicious. | Bahut swaadisht hai. | Khub bhalo khete.
I'm full. | Mera pet bhar gaya. | Amar pet bhore gechhe.
One more cup of tea, please. | Ek aur chai dena. | Ar ek cup cha din.
Bring the bill. | Bill laana. | Bill ta din.
I'm vegetarian. | Main shakahaari hoon. | Ami niramish khai.
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
I wake up at seven. | Main saat baje uthta hoon. | Ami saat tay uthi.
I have a bath. | Main nahaata hoon. | Ami chan kori.
I have breakfast. | Main naashta karta hoon. | Ami jolkhabar khai.
I go to the office. | Main office jaata hoon. | Ami office jai.
I come home in the evening. | Main shaam ko ghar aata hoon. | Ami sondhe bela bari phiri.
I cook food. | Main khaana banaata hoon. | Ami ranna kori.
I watch TV. | Main TV dekhta hoon. | Ami TV dekhi.
I go to sleep at eleven. | Main gyaarah baje sota hoon. | Ami egarotay ghumote jai.
I'm sleepy. | Mujhe neend aa rahi hai. | Amar ghum pachchhe.
I'm going to the gym. | Main gym ja raha hoon. | Ami gym e jachchhi.
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
head | sir | matha
eye | aankh | chokh
ear | kaan | kan
nose | naak | nak
mouth | munh | mukh
tooth | daant | daat
hair | baal | chul
hand | haath | haat
leg / foot | pair | pa
stomach | pet | pet
back | peeth | pith
`),
      },
      {
        title: 'Health',
        rows: rows(`
fever | bukhaar | jor
cold | zukaam | thanda lege jaoa / sordi
cough | khaansi | kashi
pain | dard | byatha
medicine | dawai | oshudh
I'm not feeling well. | Meri tabiyat theek nahi hai. | Amar shorir ta bhalo nei.
I have a headache. | Mere sir mein dard hai. | Amar matha byatha korchhe.
My stomach hurts. | Mere pet mein dard hai. | Amar pet byatha korchhe.
I have a fever. | Mujhe bukhaar hai. | Amar jor hoyechhe.
Let's go to the doctor. | Doctor ke paas chalte hain. | Cholo, daktarer kachhe jai.
Take rest. | Aaraam karo. | Bisram nao.
Take care. | Dhyaan rakhna. | Nijer kheyal rekho.
`),
      },
    ],
  },
  {
    id: 'verbs',
    title: 'Common verbs',
    emoji: '🏃',
    intro: 'Bengali verbs are listed by their "-a" form (kora = doing). Add endings for who does it: ami kori, tumi koro, apni koren, o kore.',
    tables: [
      {
        rows: rows(`
to do | karna | kora
to go | jaana | jaoa
to come | aana | asha
to eat / drink | khaana / peena | khaoa
to see / watch | dekhna | dekha
to give | dena | deoa
to take | lena | neoa
to say / tell | bolna / batana | bola
to ask | poochhna | jiggesh kora
to listen | sunna | shona
to sit | baithna | bosha
to sleep | sona | ghumono
to get up | uthna | otha
to read / study | padhna | pora
to write | likhna | lekha
to learn | seekhna | shekha
to teach | sikhaana | shekhano
to understand | samajhna | bojha
to know | jaanna | jana
to buy | khareedna | kena
to sell | bechna | bikri kora
to meet | milna | dekha kora
to wait | intezaar karna | opekkha kora / wait kora
to help | madad karna | sahajjo kora
to forget | bhoolna | bhule jaoa
to laugh | hansna | hasha
to play | khelna | khela
to walk | chalna | hata
to run | daudna | dourono
to open | kholna | khola
to close | band karna | bondho kora
`),
      },
    ],
  },
  {
    id: 'tenses',
    title: 'Verb tenses',
    emoji: '⏳',
    intro: 'Using "jaoa" (to go) and "kora" (to do). No changes for men and women.',
    tables: [
      {
        rows: rows(`
I go (usually) | main jaata hoon | ami jai
I am going | main ja raha hoon | ami jachchhi
I went | main gaya | ami gelam
I will go | main jaaunga | ami jabo
we will go | hum jaayenge | amra jabo
he / she goes | woh jaata / jaati hai | o jay
he / she went | woh gaya / gayi | o gelo
I do | main karta hoon | ami kori
I am doing | main kar raha hoon | ami korchhi
I did it | maine kiya | ami korlam / korechhi
I will do it | main karunga | ami korbo
let's do it | chalo karte hain | cholo kori
will you come? (casual) | tum aaoge? | tumi ashbe?
will you come? (polite) | aap aayenge? | apni ashben?
I had eaten | maine kha liya tha | ami kheyechhilam
I can go | main ja sakta hoon | ami jete pari
I have to go | mujhe jaana hai | amake jete hobe
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
good | achha | bhalo
bad | bura | kharap
big | bada | boro
small | chhota | chhoto
hot | garam | gorom
cold | thanda | thanda
new | naya | notun
old (thing) | puraana | purono
beautiful | sundar | sundor
easy | aasaan | sohoj
difficult | mushkil | kothin
fast | tez | taratari / jore
slow | dheere | aste
a lot / very | bahut | khub / bhishon
a little | thoda | ektu
expensive | mehnga | dami
cheap | sasta | sosta
happy | khush | khushi
sad | udaas | mon kharap
tired | thaka hua | klanto
ready | taiyaar | toiri / ready
wrong | galat | bhul
right / correct | sahi | thik
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
rain | baarish | brishti
It's raining. | Baarish ho rahi hai. | Brishti porchhe.
sunshine | dhoop | rod
It's very sunny. | Bahut dhoop hai. | Khub rod.
It's very hot. | Bahut garmi hai. | Khub gorom.
It's very cold. | Bahut thand hai. | Khub thanda.
wind | hawa | haoa
cloud | baadal | megh
umbrella | chhaata | chhata
Take an umbrella. | Chhaata le lo. | Chhata ta nao.
The weather is lovely today. | Aaj mausam achha hai. | Aj abhaoa ta darun.
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
hello | namaste | nomoskar / hello
how are you? | kaise ho? | kemon acho?
no problem | koi baat nahin | kono byapar na
thank you | dhanyavaad / shukriya | dhonnobad / thank you
sorry | maaf karna | sorry / kichhu mone koro na
please | kripya | please / doya kore
don't worry | chinta mat karo | chinta koro na
come quickly | jaldi aao | taratari esho
see you | phir milenge | abar dekha hobe
take care | dhyaan rakhna | bhalo theko
bye | alvida / bye | ashchhi / tata
congratulations | badhaai ho | obhinondon
happy birthday | janamdin mubarak | shubho jonmodin / happy birthday
welcome (come in) | aaiye | esho, esho / ashun
good night | shubh raatri | shubho ratri / good night
`),
      },
    ],
  },
  {
    id: 'english-mix',
    title: 'Bengali + English (how people really talk)',
    emoji: '🔀',
    intro: 'Kolkata Bengali uses lots of English words. The Bengali grammar stays, and the English word slots in. Mixing makes you sound more natural, not less.',
    notes: [
      { title: 'English verb + kora', body: 'Take any English verb and add kora (to do): call kora, wait kora, order kora, book kora, check kora, cancel kora, share kora, reply kora, download kora, enjoy kora.' },
      { title: 'English describing word + achi / ache', body: 'Ami busy achi (I am busy). O free ache (she is free). Eta boring (this is boring). Cinema ta super chhilo (the film was great).' },
      { title: 'English place or thing + Bengali endings', body: 'office e (in the office), college theke (from college), phone e (on the phone), meeting er pore (after the meeting), weekend e (at the weekend).' },
      { title: 'Words people almost always say in English', body: 'phone, call, message, plan, order, online, late, sorry, please, thank you, tension, problem, office, college, class, exam, party, weekend, ticket, bill, traffic, station, TV, actually.' },
    ],
    tables: [
      {
        title: 'Mixed sentences',
        rows: rows(`
I'm busy right now. | Main abhi busy hoon. | Ami ekhon busy achi.
Are you free? | Kya tum free ho? | Tumi free acho?
Give me a call. | Mujhe call karna. | Amake call koro.
I'll message you. | Main tumhe message karunga. | Ami tomake message korbo.
What's the plan? | Kya plan hai? | Ki plan?
Let's order online. | Chalo online order karte hain. | Cholo, online order kori.
Sorry, I got late. | Sorry, mujhe late ho gaya. | Sorry, late hoye gelo.
Don't take tension. | Tension mat lo. | Tension nio na.
There's no problem. | Koi problem nahi hai. | Kono problem nei.
Wait five minutes. | Paanch minute wait karo. | Panch minit wait koro.
Did you book the tickets? | Tickets book kiye? | Ticket book korechho?
Check your phone. | Apna phone check karo. | Tomar phone ta check koro.
The movie was super. | Movie super thi. | Cinema ta super chhilo.
I already told you. | Maine pehle hi bataaya tha. | Ami already bolechhilam.
Actually, I'm tired. | Actually, main thak gaya hoon. | Actually, ami klanto.
Send me the location. | Location bhej do. | Location ta pathao.
The restaurant is closed. | Restaurant band hai. | Restaurant ta bondho.
My phone's battery is dead. | Mere phone ki battery khatam hai. | Amar phone er charge shesh.
See you at the party. | Party mein milte hain. | Party te dekha hobe.
I have a meeting at ten. | Mera das baje meeting hai. | Amar dosh tay meeting ache.
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
I am ... | main ... hoon | Ami ...
I am (in a state) ... | main ... hoon | Ami ... achi.
He / she is ... | woh ... hai | O ... ache.
You are ... (polite) | aap ... hain | Apni ... achen.
I want to ... | main ... karna chahta hoon | Ami ... korte chai.
I am doing ... | main ... kar raha hoon | Ami ... korchhi.
I will go | main jaaunga | Ami jabo.
We can go | hum ja sakte hain | Amra jete pari.
Can you ...? | kya aap ... sakte ho? | Apni ki ... parben?
I have to go | mujhe jaana hai | Amake jete hobe.
I need ... | mujhe ... chahiye | Amar ... lagbe.
I have ... | mere paas ... hai | Amar ... ache.
I like ... | mujhe ... pasand hai | Amar ... bhalo lage.
I don't like ... | mujhe ... pasand nahi | Amar ... bhalo lage na.
I don't know. | mujhe nahi pata | Ami jani na.
Let's ... | chalo ... karte hain | Cholo, ... kori.
Don't ... | ... mat karo | ... koro na.
If ..., then ... | agar ..., toh ... | Jodi ..., tahole ...
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
How are you? | Tum kaise ho? | Kemon acho? / Ki khobor?
I am fine. | Main theek hoon. | Ami bhalo achi.
What are you doing? | Tum kya kar rahe ho? | Tumi ki korchho?
I am at home. | Main ghar par hoon. | Ami barite achi.
Where are you? | Tum kahaan ho? | Tumi kothay?
What does this mean? | Iska kya matlab hai? | Etar mane ki?
I don't understand. | Mujhe samajh nahin aaya. | Ami bujhte parchhi na.
Say it again, please. | Phir se boliye. | Abar bolun.
I don't know. | Mujhe nahi pata. | Ami jani na.
That's right. | Sahi hai. | Thik bolechho.
`),
      },
      {
        title: 'Plans',
        rows: rows(`
What are you doing tomorrow? | Kal kya kar rahe ho? | Kal ki korchho?
Let's meet in the evening. | Shaam ko milte hain. | Sondhe bela dekha kori.
I'll come at six. | Main chhe baje aaunga. | Ami chhoy tay ashbo.
Shall we go for a movie? | Movie chalein? | Cinema dekhte jabe?
I can't come today. | Main aaj nahi aa sakta. | Ami aj aste parbo na.
Let's go together. | Saath mein chalte hain. | Ekshathe jai.
`),
      },
      {
        title: 'Work and study',
        rows: rows(`
I'm going to the office. | Main office ja raha hoon. | Ami office jachchhi.
I have a lot of work today. | Aaj bahut kaam hai. | Aj onek kaj ache.
My exam is tomorrow. | Kal mera exam hai. | Kal amar exam.
I'm studying. | Main padh raha hoon. | Ami porchhi.
I'll finish it today. | Main aaj khatam kar dunga. | Ami aj shesh kore debo.
`),
      },
      {
        title: 'Family and home',
        rows: rows(`
My mother is at home. | Meri maa ghar par hai. | Amar ma barite ache.
My brother lives in Delhi. | Mera bhai Dilli mein rehta hai. | Amar bhai Dillite thake.
How many people are in your family? | Tumhare ghar mein kitne log hain? | Tomar barite kojon ache?
Come to our house. | Hamare ghar aao. | Amader barite esho.
Food is ready. | Khaana taiyaar hai. | Khabar toiri.
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
hey! / what's up? | arre! kya haal? | ki re? / ki khobor? | Very casual, between friends
awesome! | zabardast! | fatafati! / darun!
bro | bhai | bhai / bro
right? / isn't it? | hai na? | tai na?
really? | sach mein? | sotti?
for sure? | pakka? | pakka?
don't stress | tension mat lo | chap nis na
what a hassle! | kya jhanjhat hai! | ki jhamela!
ugh! / come on! | uff! | dhur!
I'm feeling lazy | aalas aa raha hai | lyadh lagchhe
hanging out and chatting | gappe maarna | adda
oh no! | arre nahi! | jah!
it'll do / fine | chalega | cholbe
slowly, slowly | dheere dheere | aste aste
leave it | rehne do | thak
stop it now | ab bas karo | ebar thamo
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
      { title: 'Ami vs amar vs amake', body: 'Ami = I (Ami jachchhi). Amar = my, and also "to me" for feelings and needs (Amar khide peyechhe, Amar eta lagbe). Amake = me as the object (Amake call koro).' },
      { title: 'Three "you"s', body: 'Tui (very close friends), tumi (friends, family, people your age), apni (elders, strangers). The verb changes too: tui jabi, tumi jabe, apni jaben.' },
      { title: 'Verb endings', body: 'Ami kori, tumi koro, apni koren, o kore. Present -ing: korchhi / korchho / korchhen / korchhe. Future: korbo / korbe / korben / korbe.' },
      { title: 'No gender', body: 'Bengali verbs and "o" (he/she) never change for men or women. Ami bhalo achi works for everyone.' },
      { title: '"Na" after the verb', body: 'Ami jani na (I don\'t know), Ami jabo na (I won\'t go). For the past use "ni": Ami jaini (I didn\'t go), Kheyechho? Na, khaini.' },
      { title: 'Endings instead of separate words', body: 'barite (at home), office e (in the office), amake (to me), Kolkata theke (from Kolkata), tomar jonno (for you), tebil er opore (on the table).' },
      { title: '-ta / -ti (the)', body: 'Add -ta to mean "the": boi ta (the book), cha ta (the tea). After numbers it counts things: ekta, duto, tinte.' },
      { title: 'Ache and nei', body: '"Ache" = there is / is (in a state): Amar gari ache (I have a car). "Nei" = there isn\'t: Somoy nei (no time).' },
      { title: "Let's ...", body: 'Use "cholo" + the ami-form: Cholo jai (let\'s go), Cholo kheye nii (let\'s eat), Cholo dekha kori (let\'s meet).' },
      { title: 'Polite requests', body: 'With apni, end in -un / -en: Bosun (please sit), Ashun (please come), Din (please give), Bolun (please tell). With tumi: bosho, esho, dao, bolo.' },
    ],
  },
  {
    id: 'practice',
    title: 'Self-practice',
    emoji: '✍️',
    intro: 'Say or write each one in Bengali, then tap to reveal an answer. Other answers can be right too!',
    practice: [
      { en: 'I am busy now, but I will call you tonight.', pa: 'Ami ekhon busy, kintu aj rate tomake call korbo.' },
      { en: 'If you are hungry, we can order food.', pa: 'Jodi tomar khide peye thake, amra khabar order korte pari.' },
      { en: 'My sister is studying, and my brother is sleeping.', pa: 'Amar bon porchhe, ar amar bhai ghumochchhe.' },
      { en: 'Where are you going tomorrow?', pa: 'Tumi kal kothay jachchho?' },
      { en: 'I will finish my work before six.', pa: 'Ami chhoy tar age amar kaj shesh korbo.' },
      { en: 'Please wait for five minutes.', pa: 'Please panch minit wait koro.' },
      { en: "I don't understand; say it again.", pa: 'Bujhlam na; abar bolo.' },
      { en: 'I am not feeling well today.', pa: 'Aj amar shorir ta bhalo nei.' },
      { en: "Let's meet after dinner.", pa: 'Rater khabar er pore dekha kori.' },
      { en: 'What time is it?', pa: 'Kota baje?' },
      { en: 'Do you know where the station is?', pa: 'Tumi jano station ta kothay?' },
      { en: "I don't like spicy food.", pa: 'Amar jhal khabar bhalo lage na.' },
      { en: 'We will go to the village on Sunday.', pa: 'Amra Robibar grame jabo.' },
      { en: 'Can you speak a little slowly?', pa: 'Apni ki ektu aste bolte parben?' },
      { en: 'It is raining, take an umbrella.', pa: 'Brishti porchhe, chhata ta nao.' },
      { en: 'I was at home yesterday.', pa: 'Ami kal barite chhilam.' },
      { en: 'Did you eat?', pa: 'Kheyechho?' },
      { en: "Don't worry, everything is fine.", pa: 'Chinta koro na, sob thik ache.' },
    ],
  },
];
