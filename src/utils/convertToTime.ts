export const formatDateToString = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return `${formattedHours}:${formattedMinutes}`;
};
