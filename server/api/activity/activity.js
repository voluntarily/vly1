import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  cuid: String,       // "5c951c0a-3e91-436a-81ae-59ede453672a",
  title: String,    // "Growing in the garden",
  subtitle: String, // "Growing digitally in the garden",
  imgUrl: String,   // "https://image.flaticon.com/icons/svg/206/206857.svg",
  description: String, // "Project to grow something in the garden",
  duration: String,   // "15 Minutes",
  location: String,   // "Newmarket, Auckland",
  status: String,     // "draft",
  contentUrls: [String],   // ["https://youtube.com/123", "https://coolwebsite"],
  categoryTags: {
    resourceType: String, // "projectOriented",
    topics: [String],    // ["garden", "robots"]
  },
  qualityRatingPoints: Number, // 150,
  topicRatingPoints: Number, // 45
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Activity', activitySchema);
