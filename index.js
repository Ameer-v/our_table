const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));
app.use('/menu', require('./routes/menu.route'));
app.use('/table', require('./routes/table.route'));
app.use('/reservation', require('./routes/reservation.route'));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi ke database our_table berhasil');
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`🚀 Server our_table berjalan di port ${PORT}`));
  } catch (err) {
    console.error('❌ Gagal koneksi ke database:', err);
  }
})();
