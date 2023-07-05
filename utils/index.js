import moment from "moment/moment.js";

export default {
  ifequal(a, b, options) {
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  getNameFirstChar(firstname, lastname) {
    return firstname.charAt(0) + lastname.charAt(0);
  },

  createDate(date) {
    return moment(date).format("DD MMM, YYYY");
  },

  updateDate(date) {
    return moment(date).fromNow();
  },
};
