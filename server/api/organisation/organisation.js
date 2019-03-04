import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const organisationSchema = new Schema({
  cuid: { type: 'String', required: true },
  name: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  about: { type: 'String', required: true },
  type: { type: 'String',
    required: true,
    enum: ['admin', 'corporate', 'school', 'charity', 'content-provider'],
  },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Organisation', organisationSchema);
