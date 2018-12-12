const REGIONS = [
  'צפון',
  'חיפה',
  'תל אביב',
  'מרכז',
  'ירושלים',
  'דרום',
];

module.exports = {
  getRegions: function getRegions() {
    // Returns a copy of the regions array
    return REGIONS.slice();
  },
};
