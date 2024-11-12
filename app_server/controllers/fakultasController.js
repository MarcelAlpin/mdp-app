const axios = require("axios");

const index = async (req, res) => {
    try {
        // mendapatkan data fakultas dari API eksternal
        const response = await axios.get(
            "http://localhost:3000/api/fakultas"
        );

        const fakultas = response.data;

        res.render("fakultas", {
            title: "Halaman Fakultas",
            fakultas,
            layout: "main",
        });
    }catch (error)  {
        console.error(error.mesage);
        res.status(500),send("Gagal mendapatkan data fakultas dari api");
    }
};

module.exports = {index};