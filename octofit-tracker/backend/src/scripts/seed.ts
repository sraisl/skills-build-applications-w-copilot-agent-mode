import mongoose from 'mongoose';

import { ActivityModel } from '../models/activity.model';
import { LeaderboardModel } from '../models/leaderboard.model';
import { TeamModel } from '../models/team.model';
import { UserModel } from '../models/user.model';
import { WorkoutModel } from '../models/workout.model';

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const teams = await TeamModel.insertMany([
    { name: 'Harbor Hustlers', city: 'Seattle', motto: 'Small strides, big wins', membersCount: 3 },
    { name: 'Peak Performers', city: 'Denver', motto: 'Altitude attitude', membersCount: 3 },
  ]);

  const users = await UserModel.insertMany([
    {
      username: 'mia_runner',
      email: 'mia.runner@example.com',
      age: 29,
      fitnessLevel: 'intermediate',
      team: teams[0]._id,
    },
    {
      username: 'leo_lifter',
      email: 'leo.lifter@example.com',
      age: 34,
      fitnessLevel: 'advanced',
      team: teams[0]._id,
    },
    {
      username: 'ava_cyclist',
      email: 'ava.cyclist@example.com',
      age: 26,
      fitnessLevel: 'beginner',
      team: teams[1]._id,
    },
    {
      username: 'noah_swim',
      email: 'noah.swim@example.com',
      age: 31,
      fitnessLevel: 'intermediate',
      team: teams[1]._id,
    },
  ]);

  const now = new Date();
  await ActivityModel.insertMany([
    {
      user: users[0]._id,
      type: 'run',
      durationMinutes: 42,
      caloriesBurned: 510,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 55,
      caloriesBurned: 620,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 30),
    },
    {
      user: users[2]._id,
      type: 'cycle',
      durationMinutes: 38,
      caloriesBurned: 430,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 12),
    },
    {
      user: users[3]._id,
      type: 'swim',
      durationMinutes: 47,
      caloriesBurned: 540,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 8),
    },
  ]);

  await LeaderboardModel.insertMany([
    { user: users[1]._id, points: 1280, rank: 1, weekLabel: '2026-W27' },
    { user: users[0]._id, points: 1190, rank: 2, weekLabel: '2026-W27' },
    { user: users[3]._id, points: 1115, rank: 3, weekLabel: '2026-W27' },
    { user: users[2]._id, points: 1040, rank: 4, weekLabel: '2026-W27' },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Sunrise Cardio Blast',
      focusArea: 'Cardio Endurance',
      difficulty: 'beginner',
      durationMinutes: 25,
      equipment: ['Jump Rope'],
      tags: ['morning', 'fat-burn'],
    },
    {
      title: 'Power Core Circuit',
      focusArea: 'Core Strength',
      difficulty: 'intermediate',
      durationMinutes: 35,
      equipment: ['Mat', 'Kettlebell'],
      tags: ['core', 'stability'],
    },
    {
      title: 'Elite HIIT Ladder',
      focusArea: 'Full Body',
      difficulty: 'advanced',
      durationMinutes: 40,
      equipment: ['Dumbbells', 'Resistance Bands'],
      tags: ['hiit', 'performance'],
    },
  ]);

  const [usersCount, teamsCount, activitiesCount, leaderboardCount, workoutsCount] = await Promise.all([
    UserModel.countDocuments(),
    TeamModel.countDocuments(),
    ActivityModel.countDocuments(),
    LeaderboardModel.countDocuments(),
    WorkoutModel.countDocuments(),
  ]);

  console.log('Seed complete:', {
    users: usersCount,
    teams: teamsCount,
    activities: activitiesCount,
    leaderboard: leaderboardCount,
    workouts: workoutsCount,
  });

  await mongoose.disconnect();
}

seedDatabase().catch(async (error) => {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
