// avatars.js - Yerel Avatar Veritabanımız
// Belirttiğin numaralar yeni karakterlerle değiştirildi, diğerleri orijinal halleriyle korundu.

export const avatars = {
    // 1. Mülakat Modu (4, 5, 6, 8, 9, 10 DEĞİŞTİRİLDİ, diğerleri orijinal)
    interview: [
        "Felix",  // 1 (Orijinal)
        "Aneka",  // 2 (Orijinal)
        "Jude",   // 3 (Orijinal)
        "Leo",    // 4 (YENİ)
        "Mia",    // 5 (YENİ)
        "Zoe",    // 6 (YENİ)
        "James",  // 7 (Orijinal)
        "Max",    // 8 (YENİ)
        "Sam",    // 9 (YENİ)
        "Ivy"     // 10 (YENİ)
    ].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    
    // 2. Flört Modu (1, 2, 3, 5, 6, 7, 9 DEĞİŞTİRİLDİ, diğerleri orijinal)
    redflag: [
        "Cringe&top=shortHairDreads01&accessories=kurt",           // 1 (YENİ)
        "Ghoster&top=eyepatch&mouth=serious",                      // 2 (YENİ)
        "Toxic&top=shortHairShaggyMullet&hairColor=Red",           // 3 (YENİ)
        "Weirdo&mouth=vomit",                                      // 4 (Orijinal)
        "Drama&top=longHairFro&hairColor=PastelPink",              // 5 (YENİ)
        "Narcissist&top=shortHairTheCaesar&accessories=sunglasses",// 6 (YENİ)
        "Stalker&top=shortHairFrizzle&eyes=surprised",             // 7 (YENİ)
        "Snob&accessories=sunglasses",                             // 8 (Orijinal)
        "Fake&top=longHairStraightStrand&hairColor=Blonde",        // 9 (YENİ)
        "Keko&mouth=grimace"                                       // 10 (Orijinal)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 3. Zaman Yolcusu Modu (Hepsi değiştirildi - Piksel Art yerine Adventurer stili kullanıldı)
    timetravel: [
        "Arthur", "Cleo", "Leonidas", "Joan", "Tesla", 
        "Ragnar", "DaVinci", "Marie", "Homer", "Saladin"
    ].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    
    // 4. Fenomen Modu (Hepsi değiştirildi - Ajan 3 tarzında gözlüklü, havalı, aykırı tiplemeler)
    influencer: [
        "Inf1&accessories=sunglasses&top=longHairShavedSides&clothing=blazerAndShirt&hairColor=SilverGray",
        "Inf2&accessories=kurt&top=shortHairDreads02&clothing=blazerAndShirt",
        "Inf3&accessories=round&top=longHairCurly&clothing=blazerAndShirt&hairColor=Red",
        "Inf4&accessories=sunglasses&top=shortHairShortFlat&clothing=blazerAndShirt&facialHair=beardMajestic",
        "Inf5&accessories=wayfarers&top=longHairStraight2&clothing=blazerAndShirt",
        "Inf6&accessories=sunglasses&top=shortHairSides&clothing=blazerAndShirt&hairColor=PastelPink",
        "Inf7&accessories=round&top=longHairFro&clothing=blazerAndShirt",
        "Inf8&accessories=kurt&top=shortHairTheCaesar&clothing=blazerAndShirt&facialHair=moustacheFancy",
        "Inf9&accessories=sunglasses&top=longHairMiaWallace&clothing=blazerAndShirt&hairColor=Purple",
        "Inf10&accessories=wayfarers&top=shortHairFrizzle&clothing=blazerAndShirt"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 5. Ajan Modu (2, 3, 4, 5, 8 DEĞİŞTİRİLDİ, diğerleri orijinal)
    agent: [
        "Bond",     // 1 (Orijinal)
        "Rogue",    // 2 (YENİ)
        "Eagle",    // 3 (YENİ)
        "Viper",    // 4 (YENİ)
        "Raven",    // 5 (YENİ)
        "Sniper",   // 6 (Orijinal)
        "Intel",    // 7 (Orijinal)
        "Cobra",    // 8 (YENİ)
        "Shadow",   // 9 (Orijinal)
        "Phantom"   // 10 (Orijinal)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&accessories=sunglasses&clothing=blazerAndShirt`),
    
    // 6. Aile Yemeği Modu (1, 2, 3, 5, 6, 7, 9 DEĞİŞTİRİLDİ, diğerleri orijinal)
    family: [
        "Kaynata&top=noHair&facialHair=moustacheMagnum",           // 1 (YENİ)
        "Kaynana&top=longHairCurly&hairColor=SilverGray",          // 2 (YENİ)
        "Yenge&top=longHairStraight&hairColor=Blonde",             // 3 (YENİ)
        "Uncle&facialHair=moustacheMagnum",                        // 4 (Orijinal)
        "Gorumce&top=shortHairShortRound&accessories=sunglasses",  // 5 (YENİ)
        "Eniste&top=shortHairShortFlat&facialHair=beardLight",     // 6 (YENİ)
        "Bacanak&top=shortHairTheCaesar&mouth=smirk",              // 7 (YENİ)
        "Dad&facialHair=beardMedium",                              // 8 (Orijinal)
        "Elti&top=longHairMiaWallace&hairColor=Red",               // 9 (YENİ)
        "InLaw&eyes=squint"                                        // 10 (Orijinal)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`)
};