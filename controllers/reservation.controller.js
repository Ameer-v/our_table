const { Reservation, Table, Order, Menu } = require('../models');
const { sequelize } = require('../models');

exports.addReservation = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { userID, tableID, reservationDate, pax, orders } = req.body;
    const existing = await Reservation.findOne({
      where: {
        tableID,
        reservationDate,
        status: 'booked'
      }
    });

    if (existing) {
      await t.rollback();
      return res.status(400).json({ success:false, message: 'Table already booked at this time' });
    }

    const reservation = await Reservation.create({ userID, tableID, reservationDate, pax }, { transaction: t });

    if (orders && Array.isArray(orders)) {
      const orderRows = orders.map(o => ({ reservationID: reservation.reservationID, menuID: o.menuID, quantity: o.quantity || 1 }));
      await Order.bulkCreate(orderRows, { transaction: t });
    }

    await t.commit();
    return res.status(201).json({ success:true, data: reservation, message: 'Reservation created' });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ success:false, message: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  const reservations = await Reservation.findAll({
    include: [
      { model: Table, attributes: ['tableName','capacity'] },
      { model: Order, include: [{ model: Menu, attributes: ['name','price'] }] }
    ]
  });
  res.json({ success:true, data: reservations });
};

exports.reservationsByUser = async (req, res) => {
  const userID = req.params.userID;
  const reservations = await Reservation.findAll({
    where: { userID },
    include: [
      { model: Table, attributes: ['tableName','capacity'] },
      { model: Order, include: [{ model: Menu, attributes: ['name','price'] }] }
    ]
  });
  res.json({ success:true, data: reservations });
};

exports.cancelReservation = async (req, res) => {
  const id = req.params.id;
  await Reservation.update({ status: 'cancelled' }, { where: { reservationID: id }});
  res.json({ success:true, message: 'Reservation cancelled' });
};
