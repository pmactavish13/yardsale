// Require mongoose
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
    message: { type: String, required: true },
    product_id: { type: Schema.Types.ObjectId }, 
    member_id: { type: Schema.Types.ObjectId },
    private: { type: Boolean, default: false }
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;