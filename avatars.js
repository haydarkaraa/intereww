// avatars.js - Yerel Avatar Veritabanımız
// Hata düzeltmesi: Dicebear v9 API standartlarına göre saç ve aksesuar isimleri (top=, mouth= vb.) güncellendi.

export const avatars = {
    // 1. Mülakat Modu (Maceracı Stili - Sorunsuz)
    interview: [
        "Felix", "Aneka", "Jude", "Leo", "Mia", 
        "Zoe", "James", "Max", "Sam", "Ivy"
    ].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    
    // 2. Flört Modu (Özgüvensiz, ezik, komik tipler)
    redflag: [
        "Insec1&top=frizzle&mouth=concerned&eyes=dizzy&accessories=prescription01", 
        "Insec2&top=shaggyMullet&mouth=sad&eyes=cry",                               
        "Insec3&top=fro&mouth=disbelief&eyes=surprised",                             
        "Weirdo&mouth=vomit",                                                                
        "Insec5&top=noHair&facialHair=moustacheFancy&mouth=grimace&eyes=eyeRoll",            
        "Insec6&top=shortFlat&mouth=sad&accessories=kurt&eyes=close",               
        "Insec7&top=straightAndStrand&mouth=concerned&eyes=squint",                     
        "Snob&accessories=sunglasses",                                                       
        "Insec9&top=theCaesar&facialHair=beardLight&mouth=screamOpen&eyes=dizzy",   
        "Keko&mouth=grimace"                                                                 
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 3. Zaman Yolcusu Modu (Zeki, gözlüklü, dağınık saçlı tipler)
    timetravel: [
        "Smart1&top=frizzle&accessories=round&mouth=disbelief",                     
        "Cleo",                                                                              
        "Smart3&top=shaggyMullet&accessories=prescription02&facialHair=moustacheMagnum",
        "Smart4&top=frida&accessories=round&eyes=surprised&mouth=sad",               
        "Smart5&top=sides&accessories=kurt&mouth=grimace",                          
        "Smart6&top=curly&accessories=prescription01&eyes=dizzy&mouth=tongue",       
        "Smart7&top=noHair&facialHair=beardMajestic&accessories=round&mouth=disbelief",      
        "Smart8&top=dreads01&eyes=squint&mouth=screamOpen",                         
        "Smart9&top=longButNotTooLong&clothing=hoodie&accessories=wayfarers",               
        "Smart10&top=froBand&accessories=prescription02&mouth=concerned"             
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 4. Fenomen Modu (Asosyal, kapüşonlu, koca gözlüklü, utangaç/komik tipler)
    influencer: [
        "Anti1&top=winterHat3&clothing=hoodie&mouth=sad&eyes=cry",
        "Anti2&top=shaggyMullet&accessories=prescription02&mouth=concerned&eyes=dizzy",
        "Anti3&top=straightAndStrand&clothing=hoodie&mouth=grimace&eyes=squint",
        "Anti4&top=noHair&accessories=kurt&mouth=disbelief&clothing=collarSweater",
        "Anti5&top=frizzle&accessories=round&mouth=vomit",
        "Anti6&top=winterHat1&clothing=hoodie&eyes=close&mouth=sad",
        "Anti7&top=theCaesar&accessories=wayfarers&mouth=screamOpen",
        "Anti8&top=miaWallace&accessories=prescription01&mouth=concerned",
        "Anti9&top=hat&clothing=hoodie&facialHair=beardLight&mouth=grimace",
        "Anti10&top=dreads&accessories=round&eyes=eyeRoll&mouth=sad"
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    // 5. Ajan Modu (Altı takım elbise, üstü alakasız ve komik kamuflajlı tipler)
    agent: [
        "Bond",                                                   
        "Disg2&top=turban&facialHair=moustacheMagnum",            
        "Disg3&top=hijab",                                        
        "Disg4&top=winterHat2&facialHair=beardMajestic",          
        "Disg5&top=hat&facialHair=moustacheFancy",                
        "Disg6&top=frida",                                
        "Disg7&top=shavedSides&facialHair=beardLight",    
        "Disg8&top=winterHat4",                                   
        "Disg9&top=fro&facialHair=moustacheMagnum",       
        "Disg10&top=noHair&facialHair=beardMedium"                
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&accessories=sunglasses&clothing=blazerAndShirt`),
    
    // 6. Aile Yemeği Modu (Endişeli, huzursuz, gergin tipler)
    family: [
        "Anx1&top=noHair&mouth=concerned&eyes=cry",               
        "Anx2&top=bun&mouth=sad&eyes=dizzy",              
        "Anx3&top=shortWaved&mouth=grimace&eyes=squint", 
        "Uncle&facialHair=moustacheMagnum",                       
        "Anx4&top=curly&mouth=disbelief&eyes=surprised",  
        "Anx5&top=shortFlat&mouth=concerned&eyes=close", 
        "Anx6&top=theCaesar&mouth=sad&eyes=eyeRoll",     
        "Dad&facialHair=beardMedium",                             
        "Anx7&top=straightAndStrand&mouth=screamOpen&eyes=cry",
        "Anx8&top=frizzle&mouth=grimace&eyes=dizzy"      
    ].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`)
};