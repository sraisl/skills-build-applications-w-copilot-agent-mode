import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    equipment: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  },
);

export const WorkoutModel = model('Workout', workoutSchema);
