import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
    {
        title: {type: String, require:true}
    },
    {collection:"todos"}
);

const model  = mongoose.model.User || mongoose.model("Todos",TodoSchema);

export default model;