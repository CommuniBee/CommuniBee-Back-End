const REGIONS = ['a', 'b', 'c'];

module.exports = {
  getRegions: function getRegions() {
    // Returns a copy of the regions array
    return REGIONS.slice();
  },
};
