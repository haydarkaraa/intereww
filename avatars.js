// avatars.js - Yerel Avatar Veritabanımız

export const avatars = {
    // 1. Mülakat Modu (Daha önceki isteğine göre güncellenen haliyle kalıyor)
    interview: [
        "Felix", "Aneka", "Jude", "Leo", "Mia", 
        "Zoe", "James", "Max", "Sam", "Ivy"
    ].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    
    // 2. Flört Modu (4, 8, 10 HARİÇ HEPSİ DEĞİŞTİ -> Özgüvensiz, ezik, komik tipler)
    redflag: [
        "Insec1&top=shortHairFrizzle&mouth=concerned&eyes=dizzy&accessories=prescription01", // 1 (YENİ)
        "Insec2&top=shortHairShaggyMullet&mouth=sad&eyes=cry",                               // 2 (YENİ)
        "Insec3&top=longHairFro&mouth=disbelief&eyes=surprised",                             // 3 (YENİ)
        "Weirdo&mouth=vomit",                                                                // 4 (ORİJİNAL)
        "Insec5&top=noHair&facialHair=moustacheFancy&mouth=grimace&eyes=eyeRoll",            // 5 (YENİ)
        "Insec6&top=shortHairShortFlat&mouth=sad&accessories=kurt&eyes=close",               // 6 (YENİ)
        "Insec7&top=longHairStraightStrand&mouth=concerned&eyes=squint",                     // 7 (YENİ)
        "Snob&accessories=sunglasses",                                                       // 8 (ORİJİNAL)
        "Insec9&top=shortHairTheCaesar&facialHair=beardLight&mouth=screamOpen&eyes=dizzy",   // 9 (YENİ)
        "Keko&mouth=grimace"                                                                 // 10 (ORİJİNAL)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 3. Zaman Yolcusu Modu (2 HARİÇ HEPSİ DEĞİŞTİ -> Zeki, gözlüklü, dağınık saçlı tipler)
    timetravel: [
        "Smart1&top=shortHairFrizzle&accessories=round&mouth=disbelief",                     // 1 (YENİ)
        "Cleo",                                                                              // 2 (ORİJİNAL)
        "Smart3&top=shortHairShaggyMullet&accessories=prescription02&facialHair=moustacheMagnum",// 3 (YENİ)
        "Smart4&top=longHairFrida&accessories=round&eyes=surprised&mouth=sad",               // 4 (YENİ)
        "Smart5&top=shortHairSides&accessories=kurt&mouth=grimace",                          // 5 (YENİ)
        "Smart6&top=longHairCurly&accessories=prescription01&eyes=dizzy&mouth=tongue",       // 6 (YENİ)
        "Smart7&top=noHair&facialHair=beardMajestic&accessories=round&mouth=disbelief",      // 7 (YENİ)
        "Smart8&top=shortHairDreads01&eyes=squint&mouth=screamOpen",                         // 8 (YENİ)
        "Smart9&top=longHairNotTooLong&clothing=hoodie&accessories=wayfarers",               // 9 (YENİ)
        "Smart10&top=longHairFroBand&accessories=prescription02&mouth=concerned"             // 10 (YENİ)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 4. Fenomen Modu (HEPSİ DEĞİŞTİ -> Asosyal, kapüşonlu, koca gözlüklü, utangaç/komik tipler)
    influencer: [
        "Anti1&top=winterHat3&clothing=hoodie&mouth=sad&eyes=cry",
        "Anti2&top=shortHairShaggyMullet&accessories=prescription02&mouth=concerned&eyes=dizzy",
        "Anti3&top=longHairStraightStrand&clothing=hoodie&mouth=grimace&eyes=squint",
        "Anti4&top=noHair&accessories=kurt&mouth=disbelief&clothing=collarSweater",
        "Anti5&top=shortHairFrizzle&accessories=round&mouth=vomit",
        "Anti6&top=winterHat1&clothing=hoodie&eyes=close&mouth=sad",
        "Anti7&top=shortHairTheCaesar&accessories=wayfarers&mouth=screamOpen",
        "Anti8&top=longHairMiaWallace&accessories=prescription01&mouth=concerned",
        "Anti9&top=hat&clothing=hoodie&facialHair=beardLight&mouth=grimace",
        "Anti10&top=longHairDreads&accessories=round&eyes=eyeRoll&mouth=sad"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 5. Ajan Modu (1 HARİÇ HEPSİ DEĞİŞTİ -> Altı ajan takımı, üstü alakasız kötü kamuflajlı tipler)
    agent: [
        "Bond",                                                   // 1 (ORİJİNAL)
        "Disg2&top=turban&facialHair=moustacheMagnum",            // 2 (YENİ - Türbanlı Ajan)
        "Disg3&top=hijab",                                        // 3 (YENİ - Başörtülü Ajan)
        "Disg4&top=winterHat2&facialHair=beardMajestic",          // 4 (YENİ - Kar Bereli Sakallı Ajan)
        "Disg5&top=hat&facialHair=moustacheFancy",                // 5 (YENİ - Şapkalı Ajan)
        "Disg6&top=longHairFrida",                                // 6 (YENİ - Çiçekli Saçlı Ajan)
        "Disg7&top=longHairShavedSides&facialHair=beardLight",    // 7 (YENİ - Punk Saçlı Ajan)
        "Disg8&top=winterHat4",                                   // 8 (YENİ - Hayvan Figürlü Bereli Ajan)
        "Disg9&top=longHairFro&facialHair=moustacheMagnum",       // 9 (YENİ - Disko Saçlı Ajan)
        "Disg10&top=noHair&facialHair=beardMedium"                // 10 (YENİ - Kel ve Kirli Sakallı Ajan)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&accessories=sunglasses&clothing=blazerAndShirt`),
    
    // 6. Aile Yemeği Modu (4 ve 8 HARİÇ HEPSİ DEĞİŞTİ -> Endişeli, huzursuz, gergin tipler)
    family: [
        "Anx1&top=noHair&mouth=concerned&eyes=cry",               // 1 (YENİ)
        "Anx2&top=longHairBun&mouth=sad&eyes=dizzy",              // 2 (YENİ)
        "Anx3&top=shortHairShortWaved&mouth=grimace&eyes=squint", // 3 (YENİ)
        "Uncle&facialHair=moustacheMagnum",                       // 4 (ORİJİNAL)
        "Anx4&top=longHairCurly&mouth=disbelief&eyes=surprised",  // 5 (YENİ)
        "Anx5&top=shortHairShortFlat&mouth=concerned&eyes=close", // 6 (YENİ)
        "Anx6&top=shortHairTheCaesar&mouth=sad&eyes=eyeRoll",     // 7 (YENİ)
        "Dad&facialHair=beardMedium",                             // 8 (ORİJİNAL)
        "Anx7&top=longHairStraightStrand&mouth=screamOpen&eyes=cry",// 9 (YENİ)
        "Anx8&top=shortHairFrizzle&mouth=grimace&eyes=dizzy"      // 10 (YENİ)
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`)
};