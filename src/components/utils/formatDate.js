import moment from "jalali-moment";

const formatDate = (date) => {
    return moment(date).locale("fa").format("D MMM YYYY");
};

export default formatDate;