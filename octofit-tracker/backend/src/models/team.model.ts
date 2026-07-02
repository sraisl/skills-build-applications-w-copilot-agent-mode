import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    membersCount: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

export const TeamModel = model('Team', teamSchema);
