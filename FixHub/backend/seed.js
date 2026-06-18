const mongoose = require("mongoose");
const { hashPassword } = require("./utils/auth.utils");

const User = require("./models/user.model");
const Service = require("./models/service.model");
const Booking = require("./models/booking.model");
const Review = require("./models/review.model");
const Earning = require("./models/earning.model");
const Notification = require("./models/notification.model");

const MONGO_URI = "mongodb+srv://Rupesh_yadaV12345:eNarQVGScqcLQnaP@cluster0.qrthelu.mongodb.net/fixhub?retryWrites=true&w=majority";

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  // Clear all collections
  await Promise.all([
    User.deleteMany(),
    Service.deleteMany(),
    Booking.deleteMany(),
    Review.deleteMany(),
    Earning.deleteMany(),
    Notification.deleteMany(),
  ]);
  console.log("Cleared all collections");

  const hashedPassword = await hashPassword("Test@1234");

  // ─── USERS ───────────────────────────────────────────────
  const admin = await User.create({
    fullname: { firstname: "Admin", lastname: "FixHub" },
    email: "admin@fixhub.com",
    password: hashedPassword,
    phone: "9000000001",
    role: "admin",
    location: "Delhi",
  });

  const customers = await User.insertMany([
    {
      fullname: { firstname: "Rahul", lastname: "Sharma" },
      email: "rahul@gmail.com",
      password: hashedPassword,
      phone: "9000000002",
      role: "customer",
      location: "Mumbai",
    },
    {
      fullname: { firstname: "Priya", lastname: "Verma" },
      email: "priya@gmail.com",
      password: hashedPassword,
      phone: "9000000003",
      role: "customer",
      location: "Pune",
    },
    {
      fullname: { firstname: "Amit", lastname: "Singh" },
      email: "amit@gmail.com",
      password: hashedPassword,
      phone: "9000000004",
      role: "customer",
      location: "Bangalore",
    },
  ]);

  const technicians = await User.insertMany([
    {
      fullname: { firstname: "Suresh", lastname: "Kumar" },
      email: "suresh@fixhub.com",
      password: hashedPassword,
      phone: "9000000005",
      role: "technician",
      location: "Mumbai",
      totalEarnings: 15000,
    },
    {
      fullname: { firstname: "Ravi", lastname: "Patel" },
      email: "ravi@fixhub.com",
      password: hashedPassword,
      phone: "9000000006",
      role: "technician",
      location: "Pune",
      totalEarnings: 12000,
    },
    {
      fullname: { firstname: "Mohan", lastname: "Das" },
      email: "mohan@fixhub.com",
      password: hashedPassword,
      phone: "9000000007",
      role: "technician",
      location: "Delhi",
      totalEarnings: 8000,
    },
  ]);

  console.log("Users created");

  // ─── SERVICES ─────────────────────────────────────────────
  const services = await Service.insertMany([
    {
      technicianId: technicians[0]._id,
      serviceName: "AC Repair",
      description: "Complete AC servicing, gas refill and repair",
      serviceCharge: 800,
      experience: 5,
      completedJobs: 120,
      isActive: true,
    },
    {
      technicianId: technicians[0]._id,
      serviceName: "Washing Machine Repair",
      description: "All brands washing machine repair",
      serviceCharge: 600,
      experience: 5,
      completedJobs: 90,
      isActive: true,
    },
    {
      technicianId: technicians[1]._id,
      serviceName: "Laptop Repair",
      description: "Hardware and software issues, screen replacement",
      serviceCharge: 1000,
      experience: 4,
      completedJobs: 75,
      isActive: true,
    },
    {
      technicianId: technicians[1]._id,
      serviceName: "Smartphone Repair",
      description: "Screen replacement, battery, charging port fix",
      serviceCharge: 500,
      experience: 4,
      completedJobs: 200,
      isActive: true,
    },
    {
      technicianId: technicians[2]._id,
      serviceName: "TV Repair",
      description: "LCD, LED, Smart TV repair all brands",
      serviceCharge: 700,
      experience: 6,
      completedJobs: 150,
      isActive: true,
    },
    {
      technicianId: technicians[2]._id,
      serviceName: "Refrigerator Repair",
      description: "Cooling issues, compressor, gas refill",
      serviceCharge: 900,
      experience: 6,
      completedJobs: 110,
      isActive: false,
    },
  ]);

  console.log("Services created");

  // ─── BOOKINGS ─────────────────────────────────────────────
  const bookings = await Booking.insertMany([
    {
      customer: customers[0]._id,
      technician: technicians[0]._id,
      serviceType: "AC Repair",
      description: "AC not cooling properly, need gas refill",
      location: "Mumbai, Andheri West",
      preferredDate: new Date("2025-07-20"),
      preferredTime: "10:00 AM",
      estimatedPrice: 800,
      actualPrice: 850,
      status: "completed",
      completedAt: new Date("2025-07-20"),
      rating: 5,
      review: "Excellent service!",
    },
    {
      customer: customers[1]._id,
      technician: technicians[1]._id,
      serviceType: "Laptop Repair",
      description: "Laptop screen cracked, need replacement",
      location: "Pune, Kothrud",
      preferredDate: new Date("2025-07-22"),
      preferredTime: "2:00 PM",
      estimatedPrice: 1000,
      actualPrice: 1200,
      status: "completed",
      completedAt: new Date("2025-07-22"),
      rating: 4,
      review: "Good service, fixed on time",
    },
    {
      customer: customers[2]._id,
      technician: technicians[2]._id,
      serviceType: "TV Repair",
      description: "TV screen flickering issue",
      location: "Delhi, Dwarka",
      preferredDate: new Date("2025-07-25"),
      preferredTime: "11:00 AM",
      estimatedPrice: 700,
      status: "accepted",
      acceptedAt: new Date(),
    },
    {
      customer: customers[0]._id,
      technician: technicians[1]._id,
      serviceType: "Smartphone Repair",
      description: "Phone not charging, charging port issue",
      location: "Mumbai, Bandra",
      preferredDate: new Date("2025-07-28"),
      preferredTime: "3:00 PM",
      estimatedPrice: 500,
      status: "pending",
    },
    {
      customer: customers[1]._id,
      technician: technicians[0]._id,
      serviceType: "Washing Machine Repair",
      description: "Machine making loud noise during spin",
      location: "Pune, Wakad",
      preferredDate: new Date("2025-07-18"),
      preferredTime: "9:00 AM",
      estimatedPrice: 600,
      status: "cancelled",
      cancelledAt: new Date("2025-07-17"),
    },
    {
      customer: customers[2]._id,
      technician: technicians[2]._id,
      serviceType: "Refrigerator Repair",
      description: "Fridge not cooling, compressor issue",
      location: "Delhi, Rohini",
      preferredDate: new Date("2025-07-26"),
      preferredTime: "1:00 PM",
      estimatedPrice: 900,
      status: "in-progress",
    },
  ]);

  console.log("Bookings created");

  // ─── REVIEWS ──────────────────────────────────────────────
  await Review.insertMany([
    {
      customerId: customers[0]._id,
      technicianId: technicians[0]._id,
      bookingId: bookings[0]._id,
      rating: 5,
      review: "Suresh was very professional and fixed AC quickly!",
    },
    {
      customerId: customers[1]._id,
      technicianId: technicians[1]._id,
      bookingId: bookings[1]._id,
      rating: 4,
      review: "Ravi did a great job repairing my laptop screen.",
    },
  ]);

  console.log("Reviews created");

  // ─── EARNINGS ─────────────────────────────────────────────
  await Earning.insertMany([
    {
      technician: technicians[0]._id,
      booking: bookings[0]._id,
      totalAmount: 850,
      adminCut: 85,
      technicianAmount: 765,
      status: "paid",
    },
    {
      technician: technicians[1]._id,
      booking: bookings[1]._id,
      totalAmount: 1200,
      adminCut: 120,
      technicianAmount: 1080,
      status: "paid",
    },
    {
      technician: technicians[2]._id,
      booking: bookings[5]._id,
      totalAmount: 900,
      adminCut: 90,
      technicianAmount: 810,
      status: "pending",
    },
  ]);

  console.log("Earnings created");

  // ─── NOTIFICATIONS ────────────────────────────────────────
  await Notification.insertMany([
    {
      userId: customers[0]._id,
      title: "Booking Confirmed",
      message: "Your AC Repair booking has been completed successfully.",
      type: "booking_completed",
      recipient: "customer",
      read: true,
    },
    {
      userId: technicians[0]._id,
      title: "New Booking Request",
      message: "You have a new booking request for Washing Machine Repair.",
      type: "booking_request",
      recipient: "technician",
      read: false,
    },
    {
      userId: customers[1]._id,
      title: "Booking Accepted",
      message: "Your Laptop Repair booking has been accepted by Ravi Patel.",
      type: "booking_accepted",
      recipient: "customer",
      read: false,
    },
    {
      userId: technicians[1]._id,
      title: "Payment Processed",
      message: "Payment of ₹1080 has been credited to your account.",
      type: "payment_processed",
      recipient: "technician",
      read: true,
    },
    {
      userId: customers[2]._id,
      title: "Booking Cancelled",
      message: "Your Washing Machine Repair booking has been cancelled.",
      type: "booking_cancelled",
      recipient: "customer",
      read: false,
    },
  ]);

  console.log("Notifications created");

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 Login Credentials (Password: Test@1234):");
  console.log("👑 Admin    : admin@fixhub.com");
  console.log("👤 Customer1: rahul@gmail.com");
  console.log("👤 Customer2: priya@gmail.com");
  console.log("👤 Customer3: amit@gmail.com");
  console.log("🔧 Tech1    : suresh@fixhub.com");
  console.log("🔧 Tech2    : ravi@fixhub.com");
  console.log("🔧 Tech3    : mohan@fixhub.com");

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
