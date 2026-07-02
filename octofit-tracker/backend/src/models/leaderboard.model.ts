import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekLabel: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
