Front-End taken from website.
Back-End
    -Dynamic Logic
        -load all posts available on database of every user.
        -update follow list in db on click of follow button.
        -update follower list on follow request.
    -Database
        -username
            -type: String
            -minLength: 8
            -maxLength: 16
        -email
            -type: String
        -password
            -type: String
            -minLength: 8
            -maxLength: 12
        -follow
            -type: Array
        -follower
            -type: Array
        -like
            -type: Array //containing object of to-user, post-id
        -getLiked
            -type: Array //containing object of from-user, post-id
        -comment
            -type: Array //containing object of to-user, post-id
        -posts
            -type: Array //Containing object of ----------

***One important notice the image aleardy downloaded in public/image folder.
***And we upload image from this public/image folder only.