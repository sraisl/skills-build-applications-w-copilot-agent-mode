import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model('User', userSchema);
