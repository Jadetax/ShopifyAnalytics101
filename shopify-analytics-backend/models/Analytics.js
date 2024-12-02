const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	totalSales: { type: Number, required: true },
	totalOrders: { type: Number, required: true },
	topProducts: [{ type: String }],
});

module.exports = mongoose.model('Analytics', analyticsSchema);
