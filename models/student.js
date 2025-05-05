import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  grade: {
    type: String,
    required: [true, 'Please provide grade'],
    maxlength: [10, 'Grade cannot be more than 10 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number']
  },
  address: {
    type: String,
    required: false
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);