
// Map 
export const map = new Map();

export const createShortUrl = (req,res)=>{
        const {originalUrl} = req.body;
        if(!originalUrl ) return res.status(400).json({error : "Invalid Input"});
        var shortenUrl = map.size + 1;
        map.set(shortenUrl,originalUrl);
        return res.status(200).json({result : "completed successfully",  shortenUrl});
}
export const redirectToOriginalUrl = (req,res)=>{
       const{shortUrl} = req.params;
       const originalUrl = map.get(Number(shortUrl));
       const redirectUrl = 'https://' + originalUrl;
       return res.status(301).redirect(redirectUrl);
}
export const giveAllMapEntries = (req,res)=>{
        const result = Object.fromEntries(map);
        return res.status(200).json(result)
}

export default {redirectToOriginalUrl,createShortUrl,giveAllMapEntries , map};