const userData = require('../db/database');

const getAllData = async (req, res) => {
    try {
        var data = await userData.find({});
        res.json(data);
    } catch (error) {
        console.log(error)
    }
}

const getSingleData = async (req, res) => {
    try {
        var q = req.params;
        var data;
        if(q.id.length > 16){
            data = await userData.findOne({ _id: q.id });
        }else{
            data = await userData.findOne({username: q.id})
        }
        res.json(data);
    } catch (error) {
        console.log(error)
    }
}

const insertData = async (req, res) => {
    try {
        var new_data = await userData.create(req.body);

        res.json(new_data);
    } catch (error) {
        console.log(error)
    }
}

const updateData = async (req, res) => {
    try {
        var q = req.params;
        var body = req.body;

        var data;
        if (body.password) {
            data = await userData.findOneAndUpdate({ _id: q.id }, { password: body.password });
        } else if (body.posts) {
            data = await userData.findOneAndUpdate({ _id: q.id }, { $push: { posts: {name: body.posts.name} } });
        } else if (body.follower) {
            var check = await userData.findOne({_id: q.id, followers: {$in: [body.follower]}});
            
            if(check == null) {
                data = await userData.findOneAndUpdate({ _id: q.id }, { $push: { followers: body.follower } });
            }else {
                data = "already exists";
            }

        } else if (body.follow) {
            var check = await userData.findOne({_id: q.id, follows: {$in: [body.follow]}});

            if(check == null){
                data = await userData.findOneAndUpdate({ _id: q.id }, { $push: { follows: body.follow } });
            }else{
                data = "alreay exist";
            }
        }else if(body.email){
            data = await userData.findOneAndUpdate({ _id: q.id }, {  email: body.email });
        } else if(body.like){
            data = await userData.findOneAndUpdate({ _id: q.id }, { $push: { likes: body.like }});
        } else if(body.getLikes){
            data = await userData.findOneAndUpdate({ _id: q.id }, { $push: { getLikes: {user: body.getLikes.user, post: body.getLikes.post} }});
        }
        //console.log(data);
        res.json(data);
    } catch (error) {
        console.log(error)
    }
}

const postData = async (req, res) => {
    try {
        var imageName = '1102051.jpg';
        var body = req.body;
        var data = await userData.findOneAndUpdate({ _id: body.id }, { $push: { posts: {name: imageName, data: ''} } })

        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const deletePostData = async (req, res) => {
    try {
        var q = req.params;
        var data = await userData.updateOne({ _id: q.id }, { $unset: { posts: 0 } })

        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async (req, res) => {
    try {

        res.json({ msg: "delete data" });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAllData, getSingleData, insertData, updateData, deleteData, postData, deletePostData };