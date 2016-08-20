var mongoose = require('mongoose');

var Blog = mongoose.Schema({
    imageUrl: String,
    title: String,
    permalink: String,
    isActive: {type: Boolean, default: false},
    author: String,
    tags: Array,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    preview: String,
    content: String,
    comments: [{author: String, content: String, createdAt: Date}]
});

Blog.methods.toVM = function(){
    var _this = this;

    return {
        title: _this.title,
        author: _this.author,
        imageUrl: _this.imageUrl,
        permalink: _this.permalink,
        preview: _this.preview,
        content: _this.content,
        tags: _this.tags,
        createdAt: _this.createdAt,
        updateAt: _this.updateAt,
        comments: _this.comments
    };
};

Blog.statics.getBlogs = function (query, limit) {
    const _this = this;

    return new Promise((resolve, reject) => {
        _this.find(query).sort({'createdAt': -1}).limit(limit || 10).exec((err, data) => {
            
            if (err) return reject(err);
            
            return resolve(data);
        });
    });
};

Blog.statics.getBlog = function (query) {
    const _this = this;

    return new Promise((resolve, reject) => {
        _this.findOne(query).sort({'createdAt': -1}).exec((err, data) => {
            
            if (err) return reject(err);
            
            return resolve(data.toVM());
        });
    });
};

module.exports = mongoose.model('blogs', Blog);