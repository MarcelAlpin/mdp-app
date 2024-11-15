// Mengimpor model Prodi untuk berinteraksi dengan koleksi prodi di MongoDB
const Prodi = require("../models/prodi");

// Mendapatkan semua data prodi
const getAllProdi = async (req, res) => {
  try {
    // Mengambil semua prodi dari database
    // const prodi = await Prodi.find();

    // Mengambil semua prodi dari database dan populate data fakultas berdasarkan fakultas_id
    const prodi = await Prodi.find().populate("fakultas_id", "nama singkatan"); // Mengambil field 'nama' dari Fakultas

    // Mengirimkan respons dengan status 200 dan data prodi
    res.status(200).json(prodi);
  } catch (err) {
    // Mengirimkan respons dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

// Mendapatkan satu prodi berdasarkan ID
const getProdiById = async (req, res) => {
  try {
    // Mencari prodi berdasarkan ID yang diberikan di parameter
    const prodi = await Prodi.findById(req.params.id);
    // Jika prodi tidak ditemukan, kirimkan respons 404
    if (!prodi) return res.status(404).json({ message: "Prodi not found" });
    // Mengirimkan respons dengan status 200 dan data prodi
    res.status(200).json(prodi);
  } catch (err) {
    // Mengirimkan respons dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

// Membuat prodi baru
const createProdi = async (req, res) => {
  // Membuat instance prodi baru dari data yang diterima
  const prodi = new Prodi({
    nama: req.body.nama,
    singkatan: req.body.singkatan,
    fakultas_id: req.body.fakultas_id,
  });

  try {
    // Menyimpan prodi baru ke database
    const newProdi = await prodi.save();
    // Mengirimkan respons dengan status 201 dan data prodi baru
    res.status(201).json(newProdi);
  } catch (err) {
    // Mengirimkan respons dengan status 400 jika ada kesalahan saat menyimpan
    res.status(400).json({ message: err.message });
  }
};

// Memperbarui data prodi
const updateProdi = async (req, res) => {
  try {
    // Mencari prodi berdasarkan ID yang diberikan di parameter
    const prodi = await Prodi.findById(req.params.id);
    // Jika prodi tidak ditemukan, kirimkan respons 404
    if (!prodi) return res.status(404).json({ message: "Prodi not found" });

    // Memperbarui nama prodi jika ada di request body
    if (req.body.nama != null) {
      prodi.nama = req.body.nama;
    }

    // Memperbarui singkatan prodi jika ada di request body
    if (req.body.singkatan != null) {
      prodi.singkatan = req.body.singkatan;
    }

    // Memperbarui fakultas_id jika ada di request body
    if (req.body.fakultas_id != null) {
      prodi.fakultas_id = req.body.fakultas_id;
    }

    // Menyimpan perubahan ke database
    const updatedProdi = await prodi.save();
    // Mengirimkan respons dengan status 200 dan data prodi yang diperbarui
    res.status(200).json(updatedProdi);
  } catch (err) {
    // Mengirimkan respons dengan status 400 jika ada kesalahan saat memperbarui
    res.status(400).json({ message: err.message });
  }
};

// Menghapus prodi berdasarkan ID
const deleteProdi = async (req, res) => {
  try {
    // Mencari prodi berdasarkan ID yang diberikan di parameter
    const prodi = await Prodi.findById(req.params.id);
    // Jika prodi tidak ditemukan, kirimkan respons 404
    if (!prodi) return res.status(404).json({ message: "Prodi not found" });

    // Menghapus prodi dari database
    await prodi.deleteOne();
    // Mengirimkan respons dengan status 200 dan pesan penghapusan
    res.status(200).json({ message: "Prodi deleted" });
  } catch (err) {
    // Mengirimkan respons dengan status 500 jika terjadi kesalahan
    res.status(500).json({ message: err.message });
  }
};

// Mengeksport fungsi-fungsi kontroler agar dapat digunakan di file lain
module.exports = {
  getAllProdi,
  createProdi,
  getProdiById,
  updateProdi,
  deleteProdi,
};
