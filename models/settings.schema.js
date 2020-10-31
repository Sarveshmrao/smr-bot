import mongoose from 'mongoose';
const { Schema } = mongoose;

const prefixschema = new Schema({
  title:  'guild_prefixes'
});

const prefix = mongoose.model('prefix', prefixSchema);