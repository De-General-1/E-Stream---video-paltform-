import mongoose from 'mongoose';
import dotenv from "dotenv"
import bcrypt from 'bcryptjs';
import User from './models/User.js'; 

dotenv.config()

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const hashedPassword = await bcrypt.hash('adminpassword', 10);

  const admin = new User({
    name: "Admin1",
    email: 'meadmin@admin.com',
    password: hashedPassword,
    isAdmin: true
  });

  try {
    await admin.save();
    console.log('Admin user created');
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin().catch(err => console.error('Error in script:', err));
