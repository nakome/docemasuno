export default function installDemo(Db) {
    // Divide los datos en grupos de 5 y envíalos
    for (let i = 0; i < dataToSend.length; i += 5) {
        const groupOfData = dataToSend.slice(i, i + 5);
        Db.putMany(groupOfData)
            .then(() => {
                console.log('Datos enviados con éxito');
            })
            .catch((error) => {
                console.error('Error al enviar datos:', error);
            });
    }
}