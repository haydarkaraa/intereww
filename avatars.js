// avatars.js - Yerel Avatar Veritabanımız
// Belirtilen spesifik seçimlere göre güncellenmiş nihai sürüm.

export const avatars = {
    // 1. Mülakat Modu: (4, 5, 6, 8, 9, 10) numaralı görseller seçildi.
    // Orijinal Liste: ["Felix", "Aneka", "Jude", "Aiden", "Chase", "Destiny", "James", "Leah", "Oliver", "Sadie"]
    interview: ["Aiden", "Chase", "Destiny", "Leah", "Oliver", "Sadie"].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    
    // 2. Flört Modu: (1, 2, 3, 5, 6, 7, 9) numaralı görseller seçildi.
    // Orijinal Liste: [Dayi, Macho, Zibidi, Weirdo, Punk, Goth, Art, Snob, Asi, Keko]
    redflag: [
        "Dayi&top=noHair&facialHair=moustacheMagnum", 
        "Macho&top=shortHairShortFlat&accessories=sunglasses", 
        "Zibidi&top=shortHairShaggyMullet&mouth=sad", 
        "Punk&hairColor=Pink", 
        "Goth&hairColor=Black", 
        "Art&hairColor=Purple", 
        "Asi&hairColor=Blue"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 3. Zaman Yolcusu Modu: Piksel art dışı bir stil (Avataaars) ile hepsi (10 görsel).
    timetravel: [
        "Tardis", "Cyber", "Neo", "Trinity", "Viking", 
        "Pharaoh", "Cowboy", "Einstein", "Dayi", "Macho"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 4. Fenomen Modu: Hepsi "daha aykırı, daha marjinal tiplemeler" (10 görsel).
    // Ajan 3 numaralı görsel tarzı (gözlüklü, ciddi/alaycı) fenomen için uygun olduğu için o tarzı baz alan uç karakterler tanımlandı.
    influencer: [
        // Gözlüklü, ciddi/alaycı ajan tarzını baz alan marjinal karakterler
        "Marjinal&accessories=sunglasses&clothing=blazerAndShirt&facialHair=beardMajestic&mouth=serious", 
        "Aykırı&accessories=round&top=shortHairShortRound&hairColor=PastelGreen&mouth=smirk",
        "Clout&accessories=kurt&top=longHairCurly&hairColor=SilverGray&mouth=smirk",
        // Uç marjinal tiplemeler
        "Clown&top=longHairShaggyMullet&mouth=grimace&eyes=surprised&hairColor=PastelPink",
        "Rebel&hairColor=Red&top=longHairCurly&mouth=serious&eyes=wink",
        "Punk&hairColor=Pink&clothing=graphicShirt&mouth=twinkle&top=longHairShavedSides",
        "Goth&hairColor=Black&clothing=graphicShirt&mouth=serious&top=longHairStraight",
        "Art&hairColor=Purple&accessories=round&mouth=tongue&top=shortHairShortRound",
        "Keko&top=shortHairTheCaesar&facialHair=beardLight&mouth=grimace&eyes=squint",
        "Aykırı2&hairColor=PastelPink&top=longHairShavedSides&mouth=serious&eyes=squint"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 5. Ajan Modu: (2, 3, 4, 5, 8) numaralı görseller seçildi.
    // Orijinal Liste: [Bond, Bourne, Hunt, Spy, Secret, Sniper, Intel, Ghost, Shadow, Phantom]
    agent: [
        "Bourne", "Hunt", "Spy", "Secret", "Ghost"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&accessories=sunglasses&clothing=blazerAndShirt`),
    
    // 6. Aile Yemeği Modu: (1, 2, 3, 5, 6, 7, 9) numaralı görseller seçildi.
    // Orijinal Liste: [Grandpa, Grandma, Aunt, Uncle, Cousin, Nephew, Niece, Dad, Mom, InLaw]
    family: [
        "Grandpa&top=noHair", 
        "Grandma&top=longHairBun", 
        "Aunt&top=longHairCurly", 
        "Cousin&mouth=smirk", 
        "Nephew&top=shortHairShortFlat", 
        "Niece&hairColor=Blonde", 
        "Mom&top=longHairStraight"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`)
};