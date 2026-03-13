// avatars.js - Yerel Avatar Veritabanımız
export const avatars = {
    interview: ["Felix", "Aneka", "Jude", "Aiden", "Chase", "Destiny", "James", "Leah", "Oliver", "Sadie"].map(s => `https://api.dicebear.com/9.x/adventurer/svg?seed=${s}`),
    
    redflag: ["Dayi&top=noHair&facialHair=moustacheMagnum", "Macho&top=shortHairShortFlat&accessories=sunglasses", "Zibidi&top=shortHairShaggyMullet&mouth=sad", "Weirdo&mouth=vomit", "Punk&hairColor=Pink", "Goth&hairColor=Black", "Art&hairColor=Purple", "Snob&accessories=sunglasses", "Asi&hairColor=Blue", "Keko&mouth=grimace"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    timetravel: ["Doc", "Marty", "Tardis", "Cyber", "Neo", "Trinity", "Viking", "Pharaoh", "Cowboy", "Einstein"].map(s => `https://api.dicebear.com/9.x/pixel-art/svg?seed=${s}`),
    
    influencer: ["Star&accessories=sunglasses", "Fame&mouth=smile", "Trendy&hairColor=Blonde", "Viral&top=longHairCurvy", "Gamer&accessories=kurt", "Vlogger&hairColor=Pink", "Model&mouth=twinkle", "Hype&top=shortHairShortFlat", "Clout&facialHair=beardLight", "Streamer&eyes=wink"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`),
    
    agent: ["Bond", "Bourne", "Hunt", "Spy", "Secret", "Sniper", "Intel", "Ghost", "Shadow", "Phantom"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&accessories=sunglasses&clothing=blazerAndShirt`),
    
    family: ["Grandpa&top=noHair", "Grandma&top=longHairBun", "Aunt&top=longHairCurly", "Uncle&facialHair=moustacheMagnum", "Cousin&mouth=smirk", "Nephew&top=shortHairShortFlat", "Niece&hairColor=Blonde", "Dad&facialHair=beardMedium", "Mom&top=longHairStraight", "InLaw&eyes=squint"].map(s => `https://api.dicebear.com/9.x/avataaars/svg?seed=${s}`)
};