const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DishSchema = new Schema ({
    dishName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    dishCost: {
        type: Number
    },
    dishRest: {

    },
    dishDescript: {
        type: String
    },
    dishPhotos: [],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ], 
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    hearts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Heart'
        }
    ]
  },
  // Add getter for date formatting and virtual for heartsCount
  {
    toJSON: {
        getters: true,
        virtuals: true
    }
  }
);

// Create the virtual "heartsCount" variable 
DishSchema.virtual('heartsCount').get(function() {
    return this.hearts.length;
});

// Create the User model using UserSchema
const Dish = model('Dish', DishSchema);

// Export the User mode
module.exports = Dish;