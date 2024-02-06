import moment from "moment"

export const calculateNoOfDays = (startDate: Date, endDate: Date) => {
    const startOfDate = moment(startDate)
    const endOfDate = moment(endDate)

    return endOfDate.diff(startOfDate, "days") + 1
}