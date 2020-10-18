const Database =  require('./db.js');
const saveOrphanage = require('./saveOrphanage');

Database.then(async function(db) {
    //inserir dados na tabela
    await saveOrphanage(db, {
        lat: '-7.1090179',
        lng: '-34.8816771',
        name: "Casa Pequeno Davi",
        site: "http://www.pequenodavi.org.br/",
        about: "Há mais de três décadas, mais de 10 mil crianças, adolescentes e jovens, com faixa etária entre 06 e 24 anos, participaram das atividades promovidas pela Casa Pequeno Davi.",
        whatsapp: "83900000000",
        images: [
            "https://source.unsplash.com/random?id=1",
            "https://source.unsplash.com/random?id=2",
            "https://source.unsplash.com/random?id=3",
            "https://source.unsplash.com/random?id=4",
            "https://source.unsplash.com/random?id=5",
            "https://source.unsplash.com/random?id=6"
        ].toString(),
        instructions: ' Entre em contato com a instituição para saber como se tornar um voluntário.',
        opening_hours: ' Aberto das 07h às 18h ',
        open_on_weekends: '0'
    })

    //consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)

    //consultar somente 1 orfanato pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1" ')
    console.log(orphanage)

    //deletar dado da tabela
    //console.log(await db.run('DELETE FROM orphanages WHERE id = "4"'))

})