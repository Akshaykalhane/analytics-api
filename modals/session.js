const  mongoose = require('mongoose');

// Device Info Schema
const deviceInfoSchema = new mongoose.Schema({
  device: {
    type: String,
    required: false,
  },
  browser: {
    type: String,
    required: false,
  },
  os: {
    type: String,
    required: false,
  },
  geo: {
    country: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
});

// Session Schema
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    // ID for the whole day
    sessionId: {
      type: String,
      required: false,
    },
    // ID for each visit
    visitId: {
      type: String,
      required: false,
    },
    page: {
      type: String,
      required: false, // now a direct property in the session document
    },
    // goals like download share or faceswap done 
    goals: [
      {
        goal: {
          type: String,
          required: false,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        timestamp: {
          type: Number,
          required:false
        },
      },
    ],
    //template select photo upload image
    actions: [
      {
        action: {
          type: String,
          required: false,
        },
        timestamp: {
          type: Number,
          required:false
        },
      },
    ],
    deviceInfo: deviceInfoSchema, // embedded device information schema
    timestamp:{
        type:Number,
        required:false
    },
    visitStart: {
        type: Number,  
        required: false,
      },
      visitEnd: {
        type: Number,  
        required: false,
      },
  }
);

// Create Session Model
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
