const UltraPortable = require('../models/ultraPortable');
const Business = require('../models/business');
const Gaming = require('../models/gaming');
const TdModeling = require('../models/tdModeling');

const categoryMap = { UltraPortable, Business, Gaming, '3D-Modeling': TdModeling };

module.exports = categoryMap;
