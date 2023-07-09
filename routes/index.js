const express = require('express');
const router = express.Router();
const { getAllData, getSingleData, insertData, updateData, deleteData, postData, deletePostData } = require('./controller');

router.route('/').get(getAllData).post(insertData);
router.route('/:id').patch(getSingleData).put(updateData).delete(deleteData);

router.route('/Post').post(postData);
router.route('/Post/:id').delete(deletePostData)

module.exports = router;