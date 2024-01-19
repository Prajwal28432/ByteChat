const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {accessChat,fetchChats,createGroupChat,renamegroup,addToGroup,removeFromGroup} =require('../controllers/chatController')
const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect,renamegroup);
router.route('/groupadd').put(protect,addToGroup);
router.route('/groupremove').put(protect,removeFromGroup);

module.exports = router;
