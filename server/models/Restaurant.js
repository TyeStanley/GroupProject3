const { Schema, model } = require('mongoose');

const RestSchema = new Schema ({
    restName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    dishName: {
        type: String,
        required: true
    },
    restCity: {
        type: String
    },
    restState: {
        type: String
    },
    dishCost: {
        type: Number
    },
    foodPhoto: [],
    foodDescript: {
        type: String
    },
    comments: {
        type: String
    }
  }, 
  {
    toJSON: {
        getters: true
    },
    id: false
  }
);

// Create the Restaurant model using RestSchema
const Rest = model('Rest', RestSchema);

// Export the Restaurnt model
module.exports = Rest;
