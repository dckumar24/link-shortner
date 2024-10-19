const express=require('express');
const { handleGenerateShortURL,handleGetAllShortURLInCollection, handleGetShortURLById, handleGetVisitHistoryById } = require('../controllers/url');

const router=express.Router();

router
    .route('/')
        .post(handleGenerateShortURL)
        .get(handleGetAllShortURLInCollection)

router.get('/:shortId',handleGetShortURLById)

router.get('/analytics/:shortId',handleGetVisitHistoryById)


module.exports=router