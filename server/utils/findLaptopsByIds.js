const categoryMap = require('../utils/categoryMap');

module.exports = async (ids) => {
    const lapObj = {};
    ids.forEach(bs => {
        if (!lapObj[bs.category]) lapObj[bs.category] = [];
        lapObj[bs.category].push(bs._id);
    });

    const laptops = [];
    for (const cat in lapObj) {
        const lapCat = Array.from(await categoryMap[cat].find({ _id: { $in: lapObj[cat] } }));
        lapCat.forEach(bs => {
            laptops.push(bs);
        });
    }

    return laptops;
}
