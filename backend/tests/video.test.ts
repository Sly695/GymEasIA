import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import User from '../src/models/User.model';
import Video from '../src/models/Video.model';
import jwt from 'jsonwebtoken';

describe('Video API', () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gymeasia_test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Video.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Video.deleteMany({});

    const bcrypt = require('bcryptjs');
    const user = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: await bcrypt.hash('password123', 10)
    });

    userId = user._id.toString();
    authToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'secret'
    );
  });

  describe('POST /api/videos/upload', () => {
    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/videos/upload');

      expect(res.status).toBe(401);
    });

    it('should reject request without file', async () => {
      const res = await request(app)
        .post('/api/videos/upload')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/videos', () => {
    it('should return user videos', async () => {
      await Video.create({
        userId,
        filename: 'test.mp4',
        path: '/test/path.mp4'
      });

      const res = await request(app)
        .get('/api/videos')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.videos).toHaveLength(1);
    });
  });
});
