import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// simplified version without Auth
const personSchema = new Schema({
  cuid: { type: 'String', index: true, unique: true, required: true },
  name: { type: 'String', index: true, unique: true, required: true }, // long full name
  moniker: { type: 'String', default: '' }, // how we should address you - eg. Andrew
  about: { type: 'String', default: '' }, // person description
  email: { type: 'String', index: true, required: true }, // person@example.com
  phone: { type: 'String', required: true }, // +64 27 7031007
  gender: { type: 'String', default: '' }, // whatever they want to write.
  password: { type: 'String' }, // encoded
  language: { type: String, default: 'EN', lowercase: true }, // en, mi, fr etc
  avatar: String,   // url to image
  role: {
    type: [String],
    required: true,
    default: ['volunteer'],
    enum: ['admin', 'op-provider', 'volunteer', 'content-provider', 'tester'],
  },
  // used to indicate whether people show up in searches.
  status: {
    type: 'String',
    required: true,
    default: 'active',
    enum: ['active', 'inactive', 'hold'],
  },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});


/*
const authTypes = ['github', 'twitter', 'facebook', 'google'];
// mongoose.Promise = require('bluebird');

const AdditionalDataSchema = new Schema({
  address: { type: String, uppercase: true },
  phoneNumber: { type: String },
  country: { type: String, default: 'COLOMBIA', uppercase: true },
  city: { type: String, default: 'MEDELLIN', uppercase: true },
  language: { type: String, default: 'ES', uppercase: true },
  timeZone: { type: String, default: 'America/Bogota' },
  picture: { type: String, lowercase: true },
}, { _id: false });

const personSchema = new Schema({
  name: { type: String, uppercase: true, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: (() => {
      if (authTypes.indexOf(this.provider) === -1) {
        return true;
      }
      return false;
    }, this),
  },
  role: { type: String, default: 'label' },
  password: {
    type: String,
    required: (() => {
      if (authTypes.indexOf(this.provider) === -1) {
        return true;
      }
      return false;
    }, this),
  },
  additionalData: AdditionalDataSchema,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {},
  active: { type: Boolean, default: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, { timestamps: true });
*/

export default mongoose.model('Person', personSchema);
