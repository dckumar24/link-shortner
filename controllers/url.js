const shortid=require('shortid');
const URL =require('../models/url')
const handleGenerateShortURL=async(req,res)=>{
    const url=req.body.url
    if(!url){
        return res.status(400).json({error:"URL is not passed"})
    }
    const shortID=shortid()
    await URL.create({
        shortId:shortID,
        redirectionUrl:url,
        visitHistory:[]
    })
    return res.json({msg:"Created the short URL", id: shortID})
}

const handleGetAllShortURLInCollection=async(req,res)=>{
    const result=await URL.find({})
    return res.status(200).json({data:result})
}

const handleGetShortURLById=async(req, res)=>{
    const shortId=req.params.shortId
   const entry= await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        }
    })

    if(!entry||entry.length===0){
        return res.status(404).json({error:"URL not found"})
    }

    return res.status(300).redirect(entry.redirectionUrl)

}

const handleGetVisitHistoryById=async(req, res)=>{
    const shortId=req.params.shortId
    const entry= await URL.findOne({shortId})

    if(!entry||entry.length===0){
        return res.status(404).json({error:"URL not found"})
    }

    return res.status(200).json({
        totalClicks:entry.visitHistory.length,
        analytics:entry.visitHistory
    })

}

module.exports={
    handleGenerateShortURL,
    handleGetAllShortURLInCollection,
    handleGetShortURLById,
    handleGetVisitHistoryById
}