import _ from "lodash";

export const paginate = (course, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return _(course).slice(startIndex).take(perPage).value();
}