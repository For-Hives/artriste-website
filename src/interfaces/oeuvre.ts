// Exemple :
// {
//     "author": "Lucie Rousseau",
//     "collectionId": "iozqq3g6j0ezedl",
//     "collectionName": "oeuvre",
//     "created": "2023-02-12 16:55:49.373Z",
//     "date": "2022-01-01 12:00:00.000Z",
//     "description": "<p>Une peinture &agrave; l'acrylique sur toile repr&eacute;sentant des champs &agrave; l'aube avec un ciel teint&eacute; de rose et d'orange. Les couleurs douces et les nuances de lumi&egrave;re cr&eacute;ent une atmosph&egrave;re paisible et calme.</p>",
//     "id": "yx2s4pituxr5769",
//     "image": "andy_c_an_acrylic_painting_on_canvas_depicting_fields_at_dawn_41aeda38_3727_45c5_af14_0c402f8c02d7_2Oivv6wkHU.png",
//     "name": "Les Champs à l'aube",
//     "price": 10000,
//     "updated": "2023-02-12 16:55:49.373Z",
//     "expand": {}
// }
export type Oeuvre = {
    id: number;
    name: string;
    description: string;
    price: number;
    author: string;
    date: string;
    image: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
}
