const TrancatedString = ({ text, strLength }) => {
    if (text.length <= strLength) {
        return text;
    }

    const trancatedString = text.substring(0, strLength) + '...';

    return trancatedString;
}

export default TrancatedString