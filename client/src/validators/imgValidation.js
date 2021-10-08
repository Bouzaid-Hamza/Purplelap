const imgSigns = ['ffd8ffe0', '89504e47'];

const isImageUrl = (url) =>
    new Promise(resolve => {
        const img = new Image();

        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });

const isImageFile = (file, callback) => {
    let isValid = false;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener('load', e => {
        const buffer = Buffer.from(e.target.result);
        const hexSignature = buffer.toString('hex', 0, 4);
        if (imgSigns.includes(hexSignature)) isValid = true;
        callback(isValid)
    });
}

export { isImageUrl, isImageFile };
