const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;
  try {
    // Cek apakah email sudah terdaftar
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    // Jika email belum terdaftar
    user = new User({
      nama,
      email,
      password,
      role,
    });
    await user.save(); // Simpan user ke database
    //Proses token
    const payload = {
      userId: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", //Token akan kadaluarsa dalam 1 jam
    });
    res.json({ token }); //Kirim token ke client
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Cari User Berdasarkan Email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email Or Password" });
    }
    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email Or Password" });
    }
    //Proses token
    const payload = {
      userId: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", //Token akan kadaluarsa dalam 1 jam
    });
    res.json({ token }); //Kirim token ke client
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
