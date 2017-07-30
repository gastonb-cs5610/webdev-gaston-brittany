var mongoose = require("mongoose");

var PageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "pages"});

module.exports = PageSchema;