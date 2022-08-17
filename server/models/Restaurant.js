const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const RestSchema = new Schema ({
    restName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    restAddress: {
        type: String
    },
    restCity: {
        type: String
    },
    restState: {
        type: String
    },
    restDescript: {
        type: String
    },
    restPhotos: [],
    restDescript: {
        type: String
    },
    dishes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
  }, 
  // Add getter for date formatting
  {
    toJSON: {
        getters: true
    }
  }
);

// Create the Restaurant model using RestSchema
const Rest = model('Rest', RestSchema);

// Export the Restaurnt model
module.exports = Rest;
