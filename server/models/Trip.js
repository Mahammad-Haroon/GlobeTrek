// ============================================================
// Trip Model
// ============================================================
const mongoose = require('mongoose');

// Sub-schema for itinerary days
const activitySchema = new mongoose.Schema({
  time: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: {
    type: String,
    enum: ['sightseeing', 'food', 'transport', 'accommodation', 'activity', 'other'],
    default: 'activity',
  },
});

const itineraryDaySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  date: { type: String, default: '' },
  activities: [activitySchema],
});

// Budget sub-schema
const budgetSchema = new mongoose.Schema({
  stayPerNight: { type: Number, default: 0 },
  foodPerDay: { type: Number, default: 0 },
  travelCost: { type: Number, default: 0 },
  miscellaneous: { type: Number, default: 0 },
  totalEstimated: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
});

// Transport sub-schema
const transportSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['flight', 'train', 'bus', 'car', 'mixed'],
    default: 'flight',
  },
  estimatedCost: { type: Number, default: 0 },
  notes: { type: String, default: '' },
});

// Main Trip schema
const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    cities: {
      type: [String],
      default: [],
    },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    numberOfPeople: { type: Number, default: 1, min: 1 },
    budget: { type: budgetSchema, default: {} },
    transport: { type: transportSchema, default: {} },
    itinerary: { type: [itineraryDaySchema], default: [] },
    status: {
      type: String,
      enum: ['planning', 'confirmed', 'completed', 'cancelled'],
      default: 'planning',
    },
    coverImage: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
