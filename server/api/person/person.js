import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default mongoose.model('Person', personSchema);
