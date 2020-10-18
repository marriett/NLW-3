const { response } = require("express");

const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {

    //index: function() {}
    index(request, response) {
        const city = request.query.city
        return response.render('index')
    },

    async orphanage(request, response) {
        const id = request.query.id
        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`);
            
            const orphanage = results[0];
                        //console.log(orphanage);
                orphanage.images = orphanage.images.split(",");
                orphanage.firstImage = orphanage.images[0];

                //DESAFIO do Mayk: implementar o if com operador ternário (sintaxe: condition ? expr1 : expr2) (lógica: se a Condição for verdadeira, retorne expr1, se não retorne expr2)
                orphanage.open_on_weekends == "0" ? (orphanage.open_on_weekends = false) : (orphanage.open_on_weekends = true); 

                    /*
                    if (orphanage.open_on_weekends == "0") {
                        orphanage.open_on_weekends = false
                    } else {
                        orphanage.open_on_weekends = true
                    }
                    */

            return response.render('orphanage', {orphanage})
        } catch (error) {
            console.log(error);
            return response.send('Erro do banco de dados!')
        }

    },

    async orphanages(request, response) {
        //colocar o orphanage pelo banco
        try {
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages")
            return response.render('orphanages', {orphanages})
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }

    },

    createOrphanage(request, response) {
        return response.render('create-orphanage')
    },

    async saveOrphanage(request, response) {
        //console.log(request.body)
        const fields = request.body

        //validar se todos os campos estão preenchidos
        if(Object.values(fields).includes('')) {
            return response.send('Todos os campos devem ser preenchidos!')
        }

        try {
            //salvar um orfanato
            const db = await Database
            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                site: fields.site,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends,
            })

            //redirecionamento
            return response.redirect('/orphanages')
        } catch (error) {
            console.log(error)
            return response.send('Erro no banco de dados!')
        }

    }

}