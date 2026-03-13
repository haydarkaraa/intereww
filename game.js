import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDgsz9A5pAG1-fq6TQ25ezabuxh8TS8JCM",
    authDomain: "intereww-game.firebaseapp.com",
    projectId: "intereww-game",
    storageBucket: "intereww-game.firebasestorage.app",
    messagingSenderId: "693522429828",
    appId: "1:693522429828:web:ee354ce4f5c088a54f0fd1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- AUDIO ENGINE ---
let audioCtx;
let isMuted = false;
window.toggleMute = function() {
    isMuted = !isMuted;
    document.getElementById('muteBtn').innerText = isMuted ? '🔇' : '🔊';
};

function initAudio() {
    if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    if (audioCtx.state === 'suspended') { audioCtx.resume(); }
}
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });

function playTone(freq, type, duration, vol=0.1) {
    if (isMuted) return;
    try {
        if (!audioCtx) initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

function playClick() { playTone(600, 'sine', 0.1, 0.1); } 
function playSelect() { playTone(800, 'square', 0.05, 0.05); } 
function playWrong() { playTone(150, 'sawtooth', 0.3, 0.15); setTimeout(() => playTone(100, 'sawtooth', 0.4, 0.15), 150); }
function playGameOver() { playTone(300, 'triangle', 0.3, 0.15); setTimeout(() => playTone(250, 'triangle', 0.3, 0.15), 300); setTimeout(() => playTone(200, 'triangle', 0.6, 0.15), 600); }

// --- GAME MODES ---
let currentLang = 'tr';
let currentMode = 'interview';

const modes = {
    interview: { dbQuestions: "questions", dbLeaderboard: "leaderboard", icon: "👔" },
    redflag: { dbQuestions: "questions_redflag", dbLeaderboard: "leaderboard_redflag", icon: "💔" },
    timetravel: { dbQuestions: "questions_timetravel", dbLeaderboard: "leaderboard_timetravel", icon: "⏳" },
    influencer: { dbQuestions: "questions_influencer", dbLeaderboard: "leaderboard_influencer", icon: "📱" },
    agent: { dbQuestions: "questions_agent", dbLeaderboard: "leaderboard_agent", icon: "💣" },
    family: { dbQuestions: "questions_family", dbLeaderboard: "leaderboard_family", icon: "🧿" }
};

const gameData = {
    tr: {
        interview: { title: "[ MÜLAKAT ]", nameLabel: "Aday Adı:", avatarLabel: "Karakter:", startBtn: "[ İÇERİ GİR ]", candidatePrefix: "Aday: ", questionPrefix: "Soru #", gameOverTitle: "[ KOVULDUN ]", gameOverMsg: "Güvenlik geliyor.", btnLeaderboard: "[ UTANÇ TABLOSU ]", leaderboardTitle: "[ UTANÇ TABLOSU ]", btnRestart: "[ TEKRAR DENE ]", btnShare: "[ PAYLAŞ ]", shareText: "Mülakatta {score} puanla kovuldum!" },
        redflag: { title: "[ İLK BULUŞMA ]", nameLabel: "Kurban Adı:", avatarLabel: "Masken:", startBtn: "[ OTUR ]", candidatePrefix: "Flört: ", questionPrefix: "Kriz #", gameOverTitle: "[ ENGELLENDİN ]", gameOverMsg: "Romantik bir felaket.", btnLeaderboard: "[ TERK EDİLENLER ]", leaderboardTitle: "[ EN BÜYÜK RED FLAG'LER ]", btnRestart: "[ YENİ KURBAN ]", btnShare: "[ PAYLAŞ ]", shareText: "İlk buluşmada {score} puanlık fiyasko!" },
        timetravel: { title: "[ ZAMAN MAKİNESİ ]", nameLabel: "Yolcu Adı:", avatarLabel: "Kılık:", startBtn: "[ IŞINLAN ]", candidatePrefix: "Yolcu: ", questionPrefix: "Olay #", gameOverTitle: "[ PARADOKS ]", gameOverMsg: "Zamandan silindin.", btnLeaderboard: "[ KATİLLER TABLOSU ]", leaderboardTitle: "[ ZAMAN KATİLLERİ ]", btnRestart: "[ TEKRARLA ]", btnShare: "[ PAYLAŞ ]", shareText: "Zamanda {score} puanlık paradoks yarattım!" },
        influencer: { title: "[ CANLI YAYIN ]", nameLabel: "Kanal Adı:", avatarLabel: "Filtren:", startBtn: "[ YAYINI AÇ ]", candidatePrefix: "Yayıncı: ", questionPrefix: "Linç #", gameOverTitle: "[ İPTAL EDİLDİN ]", gameOverMsg: "Tüm sponsorlukların yandı.", btnLeaderboard: "[ LİNÇ YİYENLER ]", leaderboardTitle: "[ LİNÇ YİYENLER ]", btnRestart: "[ YENİ HESAP AÇ ]", btnShare: "[ PAYLAŞ ]", shareText: "Canlı yayında {score} puanlık linç yedim!" },
        agent: { title: "[ GİZLİ GÖREV ]", nameLabel: "Kod Adı:", avatarLabel: "Ajan Profilin:", startBtn: "[ GÖREVE BAŞLA ]", candidatePrefix: "Ajan: ", questionPrefix: "Hata #", gameOverTitle: "[ GÖREV BAŞARISIZ ]", gameOverMsg: "Uluslararası bir krize sebep oldun.", btnLeaderboard: "[ EMEKLİ EDİLENLER ]", leaderboardTitle: "[ AÇIĞA ÇIKANLAR ]", btnRestart: "[ YENİ KİMLİK ]", btnShare: "[ PAYLAŞ ]", shareText: "Gizli görevde {score} puanla yakalandım!" },
        family: { title: "[ AİLE YEMEĞİ ]", nameLabel: "Kurban Adı:", avatarLabel: "Ruh Halin:", startBtn: "[ MASAYA OTUR ]", candidatePrefix: "Evlat: ", questionPrefix: "Gerilim #", gameOverTitle: "[ REDDEDİLDİN ]", gameOverMsg: "Artık mirastan pay alamayacaksın.", btnLeaderboard: "[ REDDEDİLENLER ]", leaderboardTitle: "[ EVLATLIKTAN REDDEDİLENLER ]", btnRestart: "[ BAYRAM BEKLE ]", btnShare: "[ PAYLAŞ ]", shareText: "Aile yemeğinde {score} puanlık cinnet geçirdim!" }
    },
    en: {
        interview: { title: "[ INTERVIEW ]", nameLabel: "Name:", avatarLabel: "Avatar:", startBtn: "[ ENTER ]", candidatePrefix: "Candidate: ", questionPrefix: "Q #", gameOverTitle: "[ FIRED ]", gameOverMsg: "Security is coming.", btnLeaderboard: "[ SHAME WALL ]", leaderboardTitle: "[ WALL OF SHAME ]", btnRestart: "[ TRY AGAIN ]", btnShare: "[ SHARE ]", shareText: "I got fired with {score} points!" },
        redflag: { title: "[ FIRST DATE ]", nameLabel: "Name:", avatarLabel: "Mask:", startBtn: "[ SIT ]", candidatePrefix: "Date: ", questionPrefix: "Crisis #", gameOverTitle: "[ GHOSTED ]", gameOverMsg: "A romantic disaster.", btnLeaderboard: "[ REJECTS ]", leaderboardTitle: "[ BIGGEST RED FLAGS ]", btnRestart: "[ NEW DATE ]", btnShare: "[ SHARE ]", shareText: "I ruined a date with {score} points!" },
        timetravel: { title: "[ TIME MACHINE ]", nameLabel: "Traveler:", avatarLabel: "Disguise:", startBtn: "[ TELEPORT ]", candidatePrefix: "Traveler: ", questionPrefix: "Event #", gameOverTitle: "[ PARADOX ]", gameOverMsg: "You vanished.", btnLeaderboard: "[ DESTROYERS ]", leaderboardTitle: "[ TIMELINE DESTROYERS ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "I broke the timeline with {score} points!" },
        influencer: { title: "[ LIVE STREAM ]", nameLabel: "Channel:", avatarLabel: "Filter:", startBtn: "[ GO LIVE ]", candidatePrefix: "Creator: ", questionPrefix: "Scandal #", gameOverTitle: "[ CANCELLED ]", gameOverMsg: "You lost all sponsors.", btnLeaderboard: "[ CANCELLED ]", leaderboardTitle: "[ WALL OF CANCELLATIONS ]", btnRestart: "[ NEW ACCOUNT ]", btnShare: "[ SHARE ]", shareText: "I got cancelled with {score} points!" },
        agent: { title: "[ TOP SECRET ]", nameLabel: "Code Name:", avatarLabel: "Agent Profile:", startBtn: "[ START MISSION ]", candidatePrefix: "Agent: ", questionPrefix: "Blunder #", gameOverTitle: "[ MISSION FAILED ]", gameOverMsg: "You caused a global crisis.", btnLeaderboard: "[ EXPOSED ]", leaderboardTitle: "[ WALL OF BURNED AGENTS ]", btnRestart: "[ NEW IDENTITY ]", btnShare: "[ SHARE ]", shareText: "I blew my cover with {score} points!" },
        family: { title: "[ FAMILY DINNER ]", nameLabel: "Name:", avatarLabel: "Mood:", startBtn: "[ SIT AT TABLE ]", candidatePrefix: "Child: ", questionPrefix: "Drama #", gameOverTitle: "[ DISOWNED ]", gameOverMsg: "Written out of the will.", btnLeaderboard: "[ DISOWNED ]", leaderboardTitle: "[ THE DISOWNED ]", btnRestart: "[ WAIT FOR THANKSGIVING ]", btnShare: "[ SHARE ]", shareText: "I survived family drama with {score} points!" }
    },
    fr: { interview: { title: "[ ENTRETIEN ]", nameLabel: "Nom:", avatarLabel: "Avatar:", startBtn: "[ ENTRER ]", candidatePrefix: "Candidat: ", questionPrefix: "Q #", gameOverTitle: "[ VIRÉ ]", gameOverMsg: "Sécurité en route.", btnLeaderboard: "[ MUR DE LA HONTE ]", leaderboardTitle: "[ MUR DE LA HONTE ]", btnRestart: "[ RÉESSAYER ]", btnShare: "[ PARTAGER ]", shareText: "J'ai été viré avec {score} points !" }, redflag: { title: "[ RENCARD ]", nameLabel: "Nom:", avatarLabel: "Masque:", startBtn: "[ S'ASSEOIR ]", candidatePrefix: "Date: ", questionPrefix: "Crise #", gameOverTitle: "[ GHOSTÉ ]", gameOverMsg: "Désastre total.", btnLeaderboard: "[ REJETÉS ]", leaderboardTitle: "[ PIRES RED FLAGS ]", btnRestart: "[ NOUVEAU ]", btnShare: "[ PARTAGER ]", shareText: "J'ai gâché un rencard avec {score} points !" }, timetravel: { title: "[ VOYAGE TEMPOREL ]", nameLabel: "Voyageur:", avatarLabel: "Style:", startBtn: "[ GO ]", candidatePrefix: "Voyageur: ", questionPrefix: "Event #", gameOverTitle: "[ PARADOXE ]", gameOverMsg: "Effacé.", btnLeaderboard: "[ DESTRUCTEURS ]", leaderboardTitle: "[ DESTRUCTEURS ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Paradoxe : {score} points !" }, influencer: { title: "[ LIVE ]", nameLabel: "Canal:", avatarLabel: "Filtre:", startBtn: "[ GO LIVE ]", candidatePrefix: "Créateur: ", questionPrefix: "Scandale #", gameOverTitle: "[ CANCELLED ]", gameOverMsg: "Fini.", btnLeaderboard: "[ CANCELLED ]", leaderboardTitle: "[ CANCELLED ]", btnRestart: "[ NEW ]", btnShare: "[ SHARE ]", shareText: "Cancelled avec {score} points !" }, agent: { title: "[ SECRET ]", nameLabel: "Code:", avatarLabel: "Agent:", startBtn: "[ GO ]", candidatePrefix: "Agent: ", questionPrefix: "Erreur #", gameOverTitle: "[ ÉCHEC ]", gameOverMsg: "Crise.", btnLeaderboard: "[ EXPOSÉS ]", leaderboardTitle: "[ EXPOSÉS ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Échec agent : {score} points !" }, family: { title: "[ FAMILLE ]", nameLabel: "Nom:", avatarLabel: "Humeur:", startBtn: "[ MANGER ]", candidatePrefix: "Enfant: ", questionPrefix: "Drame #", gameOverTitle: "[ RENIÉ ]", gameOverMsg: "Sans héritage.", btnLeaderboard: "[ RENIÉS ]", leaderboardTitle: "[ RENIÉS ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Drame familial : {score} points !" } },
    it: { interview: { title: "[ COLLOQUIO ]", nameLabel: "Nome:", avatarLabel: "Avatar:", startBtn: "[ ENTRA ]", candidatePrefix: "Candidato: ", questionPrefix: "Q #", gameOverTitle: "[ LICENZIATO ]", gameOverMsg: "Sicurezza in arrivo.", btnLeaderboard: "[ VERGOGNA ]", leaderboardTitle: "[ MURO DELLA VERGOGNA ]", btnRestart: "[ RIPROVA ]", btnShare: "[ CONDIVIDI ]", shareText: "Licenziato con {score} punti!" }, redflag: { title: "[ APPUNTAMENTO ]", nameLabel: "Nome:", avatarLabel: "Maschera:", startBtn: "[ SIEDITI ]", candidatePrefix: "Date: ", questionPrefix: "Crisi #", gameOverTitle: "[ SCARTATO ]", gameOverMsg: "Disastro totale.", btnLeaderboard: "[ RIFIUTATI ]", leaderboardTitle: "[ PEGGIORI RED FLAG ]", btnRestart: "[ NUOVO ]", btnShare: "[ CONDIVIDI ]", shareText: "Appuntamento rovinato con {score} punti!" }, timetravel: { title: "[ TEMPO ]", nameLabel: "Viaggiatore:", avatarLabel: "Stile:", startBtn: "[ GO ]", candidatePrefix: "Viaggiatore: ", questionPrefix: "Event #", gameOverTitle: "[ PARADOSSO ]", gameOverMsg: "Cancellato.", btnLeaderboard: "[ DISTRUTTORI ]", leaderboardTitle: "[ DISTRUTTORI ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Paradosso: {score} punti!" }, influencer: { title: "[ LIVE ]", nameLabel: "Canale:", avatarLabel: "Filtro:", startBtn: "[ GO LIVE ]", candidatePrefix: "Creatore: ", questionPrefix: "Scandalo #", gameOverTitle: "[ CANCELLATO ]", gameOverMsg: "Finito.", btnLeaderboard: "[ CANCELLATI ]", leaderboardTitle: "[ CANCELLATI ]", btnRestart: "[ NEW ]", btnShare: "[ SHARE ]", shareText: "Cancellato con {score} punti!" }, agent: { title: "[ SEGRETO ]", nameLabel: "Codice:", avatarLabel: "Agente:", startBtn: "[ GO ]", candidatePrefix: "Agente: ", questionPrefix: "Errore #", gameOverTitle: "[ FALLITO ]", gameOverMsg: "Crisi.", btnLeaderboard: "[ ESPOSTI ]", leaderboardTitle: "[ ESPOSTI ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Agente fallito: {score} punti!" }, family: { title: "[ FAMIGLIA ]", nameLabel: "Nome:", avatarLabel: "Umore:", startBtn: "[ MANGIA ]", candidatePrefix: "Figlio: ", questionPrefix: "Dramma #", gameOverTitle: "[ DISEREDATO ]", gameOverMsg: "Senza eredità.", btnLeaderboard: "[ DISEREDATI ]", leaderboardTitle: "[ DISEREDATI ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Dramma familiare: {score} punti!" } },
    es: { interview: { title: "[ ENTREVISTA ]", nameLabel: "Nombre:", avatarLabel: "Avatar:", startBtn: "[ ENTRAR ]", candidatePrefix: "Candidato: ", questionPrefix: "Q #", gameOverTitle: "[ DESPEDIDO ]", gameOverMsg: "Seguridad en camino.", btnLeaderboard: "[ VERGÜENZA ]", leaderboardTitle: "[ MURO DE VERGÜENZA ]", btnRestart: "[ REINTENTAR ]", btnShare: "[ COMPARTIR ]", shareText: "¡Despedido con {score} puntos!" }, redflag: { title: "[ CITA ]", nameLabel: "Nombre:", avatarLabel: "Máscara:", startBtn: "[ SENTARSE ]", candidatePrefix: "Cita: ", questionPrefix: "Crisis #", gameOverTitle: "[ RECHAZADO ]", gameOverMsg: "Desastre total.", btnLeaderboard: "[ RECHAZADOS ]", leaderboardTitle: "[ PEORES RED FLAGS ]", btnRestart: "[ NUEVO ]", btnShare: "[ COMPARTIR ]", shareText: "¡Cita arruinada con {score} puntos!" }, timetravel: { title: "[ TIEMPO ]", nameLabel: "Viajero:", avatarLabel: "Estilo:", startBtn: "[ GO ]", candidatePrefix: "Viajero: ", questionPrefix: "Event #", gameOverTitle: "[ PARADOJA ]", gameOverMsg: "Borrado.", btnLeaderboard: "[ DESTRUCTORES ]", leaderboardTitle: "[ DESTRUCTORES ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Paradoja: {score} puntos!" }, influencer: { title: "[ LIVE ]", nameLabel: "Canal:", avatarLabel: "Filtro:", startBtn: "[ GO LIVE ]", candidatePrefix: "Creador: ", questionPrefix: "Escándalo #", gameOverTitle: "[ CANCELADO ]", gameOverMsg: "Terminado.", btnLeaderboard: "[ CANCELADOS ]", leaderboardTitle: "[ CANCELADOS ]", btnRestart: "[ NEW ]", btnShare: "[ SHARE ]", shareText: "Cancelado con {score} puntos!" }, agent: { title: "[ SECRETO ]", nameLabel: "Código:", avatarLabel: "Agente:", startBtn: "[ GO ]", candidatePrefix: "Agente: ", questionPrefix: "Error #", gameOverTitle: "[ FALLIDO ]", gameOverMsg: "Crisis.", btnLeaderboard: "[ EXPUESTOS ]", leaderboardTitle: "[ EXPUESTOS ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Agente fallido: {score} puntos!" }, family: { title: "[ FAMILIA ]", nameLabel: "Nombre:", avatarLabel: "Humor:", startBtn: "[ COMER ]", candidatePrefix: "Hijo: ", questionPrefix: "Drama #", gameOverTitle: "[ DESHEREDADO ]", gameOverMsg: "Sin herencia.", btnLeaderboard: "[ DESHEREDADOS ]", leaderboardTitle: "[ DESHEREDADOS ]", btnRestart: "[ RETRY ]", btnShare: "[ SHARE ]", shareText: "Drama familiar: {score} puntos!" } }
};

const avatars = {
    interview: ["Felix", "Aneka", "Jude", "Aiden", "Chase", "Destiny", "James", "Leah", "Oliver", "Sadie"].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    redflag: ["Dayi&top=noHair&facialHair=moustacheMagnum", "Macho&top=shortHairShortFlat&accessories=sunglasses", "Zibidi&top=shortHairShaggyMullet&mouth=sad", "Weirdo&mouth=vomit", "Punk&hairColor=Pink", "Goth&hairColor=Black", "Art&hairColor=Purple", "Snob&accessories=sunglasses", "Asi&hairColor=Blue", "Keko&mouth=grimace"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    timetravel: ["Doc", "Marty", "Tardis", "Cyber", "Neo", "Trinity", "Viking", "Pharaoh", "Cowboy", "Einstein"].map(s => `https://api.dicebear.com/9.x/pixel-art/svg?seed=${s}`),
    influencer: ["Star&accessories=sunglasses", "Fame&mouth=smile", "Trendy&hairColor=Blonde", "Viral&top=longHairCurvy", "Gamer&accessories=kurt", "Vlogger&hairColor=Pink", "Model&mouth=twinkle", "Hype&top=shortHairShortFlat", "Clout&facialHair=beardLight", "Streamer&eyes=wink"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    agent: ["Bond", "Bourne", "Hunt", "Spy", "Secret", "Sniper", "Intel", "Ghost", "Shadow", "Phantom"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&accessories=sunglasses&clothing=blazerAndShirt`),
    family: ["Grandpa&top=noHair", "Grandma&top=longHairBun", "Aunt&top=longHairCurly", "Uncle&facialHair=moustacheMagnum", "Cousin&mouth=smirk", "Nephew&top=shortHairShortFlat", "Niece&hairColor=Blonde", "Dad&facialHair=beardMedium", "Mom&top=longHairStraight", "InLaw&eyes=squint"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`)
};

let secilenAvatar = null;
let currentPlayer = { isim: "", avatar: "", puan: 0, can: 3 };
let currentQuestionIndex = 0;
let activeQuestions = [];

function renderAvatars() {
    const grid = document.getElementById('avatarGrid');
    grid.innerHTML = "";
    secilenAvatar = null; 
    avatars[currentMode].forEach(url => {
        let div = document.createElement('div');
        div.className = 'avatar-option';
        div.setAttribute('data-id', url); 
        let img = document.createElement('img');
        img.src = url;
        div.appendChild(img);
        div.onclick = function() { selectAvatar(this); };
        grid.appendChild(div);
    });
}

function updateUI() {
    const ui = gameData[currentLang][currentMode];
    document.getElementById('ui-title').innerText = ui.title;
    document.getElementById('ui-name-label').innerText = ui.nameLabel;
    document.getElementById('ui-avatar-label').innerText = ui.avatarLabel;
    document.getElementById('ui-start-btn').innerText = ui.startBtn;
    document.getElementById('ui-gameover-title').innerText = ui.gameOverTitle;
    document.getElementById('ui-gameover-msg').innerText = ui.gameOverMsg;
    document.getElementById('ui-btn-leaderboard').innerText = ui.btnLeaderboard;
    document.getElementById('ui-leaderboard-title').innerText = ui.leaderboardTitle;
    document.getElementById('ui-btn-restart').innerText = ui.btnRestart;
    document.getElementById('ui-btn-share').innerText = ui.btnShare;
}

window.setLang = function(langCode) {
    playClick(); currentLang = langCode;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    updateUI();
}

window.setMode = function(mode) {
    playClick(); currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-mode-${mode}`).classList.add('active');
    updateUI(); renderAvatars(); 
}

window.selectAvatar = function(element) {
    playSelect();
    document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    secilenAvatar = element.getAttribute('data-id');
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

window.startGame = async function() {
    playClick();
    let isim = document.getElementById('candidateName').value;
    if (isim.trim() === "" || !secilenAvatar) { alert("Lütfen isminizi ve karakterinizi seçin!"); return; }

    const startBtn = document.getElementById('ui-start-btn');
    startBtn.innerText = "[ BAĞLANILIYOR... ]";
    startBtn.disabled = true;

    try {
        const dbName = modes[currentMode].dbQuestions;
        const qSnapshot = await getDocs(collection(db, dbName));
        let fetchedQuestions = [];
        
        qSnapshot.forEach((doc) => {
            let data = doc.data();
            if(data[currentLang]) fetchedQuestions.push(data[currentLang]);
            else if(data['en']) fetchedQuestions.push(data['en']); 
            else if(data['tr']) fetchedQuestions.push(data['tr']);
        });

        if(fetchedQuestions.length === 0) {
            alert("Bu evren için henüz soru bulunamadı!");
            startBtn.disabled = false; updateUI(); return;
        }

        activeQuestions = shuffleArray(fetchedQuestions);
        currentPlayer = { isim, avatar: secilenAvatar, puan: 0, can: 3 };
        currentQuestionIndex = 0;

        document.getElementById('entryScreen').style.display = 'none';
        document.getElementById('questionScreen').style.display = 'block';
        document.getElementById('candidateDisplay').innerText = gameData[currentLang][currentMode].candidatePrefix + currentPlayer.isim;
        
        updateLives(); loadQuestion();
    } catch (error) { alert("Sunucu hatası."); startBtn.disabled = false; updateUI(); }
}

function updateLives() {
    const livesDiv = document.getElementById('livesDisplay');
    livesDiv.innerHTML = ""; 
    const icon = modes[currentMode].icon; 
    for (let i = 0; i < 3; i++) {
        let tie = document.createElement('span'); tie.innerText = icon;
        if (i >= currentPlayer.can) tie.classList.add('lost');
        livesDiv.appendChild(tie);
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= activeQuestions.length) { triggerGameOver(); return; }
    const q = activeQuestions[currentQuestionIndex];
    
    document.getElementById('questionText').innerText = gameData[currentLang][currentMode].questionPrefix + (currentQuestionIndex + 1) + ":\n\n" + (q.question || q.text);
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = ""; 

    let shuffledOptions = shuffleArray([...q.options]);
    const letters = ["A", "B", "C"];
    shuffledOptions.forEach((option, index) => {
        let btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = "[ " + letters[index] + " ] " + option.text.replace(/^\[ [A-C] \] /, "");
        btn.onclick = () => handleAnswer(option.points);
        optionsGrid.appendChild(btn);
    });
}

function handleAnswer(points) {
    playSelect();
    currentPlayer.puan += points;
    
    if (points === 0) {
        playWrong();
        currentPlayer.can--; updateLives();
        const qc = document.getElementById('questionScreen');
        qc.classList.add('shake-effect');
        setTimeout(() => qc.classList.remove('shake-effect'), 400);

        if (currentPlayer.can <= 0) { setTimeout(() => triggerGameOver(), 500); return; }
    }
    currentQuestionIndex++;
    setTimeout(() => loadQuestion(), points === 0 ? 600 : 200); 
}

async function triggerGameOver() {
    playGameOver();
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScoreDisplay').innerText = currentPlayer.puan;

    try {
        await addDoc(collection(db, modes[currentMode].dbLeaderboard), {
            name: currentPlayer.isim, avatar: currentPlayer.avatar, score: currentPlayer.puan, timestamp: serverTimestamp() 
        });
    } catch (error) {}
}

window.showLeaderboard = function() {
    playClick();
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('leaderboardScreen').style.display = 'block';
    const list = document.getElementById('leaderboardList');
    
    try {
        const q = query(collection(db, modes[currentMode].dbLeaderboard), orderBy("score", "desc"), limit(10));
        getDocs(q).then(querySnapshot => {
            list.innerHTML = ""; let rank = 1;
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let avatarUrl = data.avatar.includes('http') ? data.avatar : `https://api.dicebear.com/9.x/adventurer/svg?seed=${data.avatar}`;
                let avatarImg = `<img src="${avatarUrl}" style="width: 35px; height: 35px; border-radius: 50%; vertical-align: middle; margin-right: 10px; background-color: white; border: 1px solid var(--border-color);">`;
                let li = document.createElement('li');
                li.innerHTML = `<span style="display:flex; align-items:center;"><b>${rank}.</b> <span style="margin-left: 5px;">${avatarImg}</span> ${data.name}</span> <span><b>${data.score}</b> Puan</span>`;
                list.appendChild(li); rank++;
            });
            if (querySnapshot.empty) list.innerHTML = "<li>Henüz kimse rezil olmadı!</li>";
        });
    } catch (error) { list.innerHTML = "<li>Tablo yüklenemedi.</li>"; }
}

window.shareScore = function() {
    playClick();
    const textToShare = gameData[currentLang][currentMode].shareText.replace('{score}', currentPlayer.puan);
    const urlToShare = window.location.href; 
    if (navigator.share) { navigator.share({ text: textToShare, url: urlToShare }); } 
    else { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}&url=${encodeURIComponent(urlToShare)}`, '_blank'); }
}

document.addEventListener('DOMContentLoaded', () => { renderAvatars(); updateUI(); });