#!/usr/bin/env node

//bring up your db, models
const fs = require('fs');
const {db, Order, Product, Review, Region, User, Category, Order_Product} = require ('../server/db');


// import data
//const categories = JSON.parse(fs.readFileSync('data/categories.json','utf8'));
const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
//const regions = JSON.parse(fs.readFileSync('data/regions.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

//console.log(regions[0], 'REGION');
const seed = async () => {
    await db.sync({force: true})
    //create models

    //categories
    const painting = await Category.create({name: 'paintings'});
    const mask = await Category.create({name: 'masks'});
    const statue = await Category.create({name: 'statues'});

    //users
    const allUsers = await Promise.all(users.map(user =>(User.create(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        isAdmin: user.isAdmin,
        status: user.status
      }
    ))));
    console.log(allUsers[1].id, 'HOHOHOHOOH')
   // regions
      const far = await Region.create({
        name : "Far North",
        capital: "Maroua",
        num_Of_Boroughs: 47,
        area: 34363,
        description: "The Far North Region, also known as the Extreme North Region (from French: Région de l'Extrême-Nord), is the northernmost constituent province of the Republic of Cameroon. It borders the North Region to the south, Chad to the east, and Nigeria to the west. The capital is Maroua. The province is one of Cameroon's most culturally diverse. Over 50 different ethnic groups populate the area, including the Shuwa Arabs, Fulani, and Kapsiki. Most inhabitants speak the Fulani language Fulfulde, Chadian Arabic, and French.",
        latitude: 11.0,
        longitude: 14.5
      });

      const north = await Region.create({
        name: "North",
        capital: "Garoua",
        num_Of_Boroughs:21,
        area:66090,
        description: "The North Region (French: Région du Nord) makes up 66,090 km² of the northern half of The Republic of Cameroon. Neighbouring territories include the Far North Region to the north, the Adamawa Region to the south, Nigeria to the west, Chad to the east, and Central African Republic to the southeast. The city of Garoua is both the political and industrial capital. Garoua is Cameroon's third largest port, despite the fact that the Bénoué River upon which it relies is only navigable for short periods of the year. Major ethnic groups include the Fula or Fulani (Fula: Fulɓe; French: Peul), who are Islamic pastoralists, and numerous Muslim and animist speakers of Adamawa, Chadic, and Nilo-Saharan languages. French is the language of formal education, and Fulfulde, the language of the Fulbe, is widespread as a lingua franca.",
        latitude : 8.5,
        longitude: 14.0
      })

      const adam = await Region.create({
        name: "Adamawa",
        capital: "Ngaoundere",
        num_Of_Boroughs: 21,
        area: 63701,
        description: "The Adamawa Region (French: Région de l'Adamaoua) is a constituent region of the Republic of Cameroon. It borders the Centre and East regions to the south, the Northwest and West regions to the southwest, Nigeria to the west, the Central African Republic (CAR) to the east, and the North Region to the north. This mountainous area forms the barrier between Cameroon's forested south and savanna north. At almost 64,000 km² in land area, the Adamawa is the third largest of Cameroon's ten regions. The land is rugged and sparsely populated, however, as most is devoted to the rearing of cattle. The Muslim Fulbe (Fulani) form the major ethnic group, though Tikar, Gbaya, and other peoples are present in lesser numbers.",
        latitude: 7.33,
        longitude: 13.5
      })

      const east = await Region.create({
        name: "East",
        capital: "Bertoua",
        num_Of_Boroughs: 32,
        area: 109002,
        description: "The East Region (French: Région de l'Est) occupies the southeastern portion of the Republic of Cameroon. It is bordered to the east by the Central African Republic, to the south by Congo, to the north by the Adamawa Region, and to the west by the Centre and South Regions. With 109,002 km² of territory, it is the largest region in the nation as well as the most sparsely populated. Historically, the peoples of the East have been settled in Cameroonian territory for longer than any other of the country's many ethnic groups, the first inhabitants being the Baka (or Babinga) pygmies. The East Region has very little industry, its main commerce consisting of logging, timber, and mining. Instead, the bulk of its inhabitants are subsistence farmers. The region is thus of little political import and is often ignored by Cameroonian politicians. This coupled with the low level of development in the province have led to its being dubbed 'the forgotten province'.",
        latitude: 4,
        longitude: 14
      })

      const centre = await Region.create({
        name: "Centre",
        capital: "Yaounde",
        num_Of_Boroughs: 70,
        area: 68953,
        description: "The Centre Region (French: Région du Centre) occupies 69,000 km² of the central plains of the Republic of Cameroon. It is bordered to the north by the Adamawa Region, to the south by the South Region, to the east by the East Region, and to the West by the Littoral and West Regions. It is the second largest (after East Region) of Cameroon's regions in land area. Major ethnic groups include the Bassa, Ewondo, and Vute. Yaoundé, capital of Cameroon, is at the heart of the Centre, drawing people from the rest of the country to live and work there. The Centre's towns are also important industrial centres, especially for timber. Agriculture is another important economic factor, especially with regard to the province's most important cash crop, cocoa. Outside of the capital and the plantation zones, most inhabitants are sustenance farmers.",
        latitude: 4.75,
        longitude: 12
      })

      const south = await Region.create({
        name: "South",
        capital: "Ebolowa",
        num_Of_Boroughs: 29,
        area: 47191,
        description: "The South Region (French: Région du Sud) is located in the southwestern and south-central portion of the Republic of Cameroon. It is bordered to the east by the East Region, to the north by the Centre Region, to the northwest by the Littoral Region, to the west by the Gulf of Guinea (part of the Atlantic Ocean), and to the south by the countries of Equatorial Guinea, Gabon, and Congo. The South occupies 47,720 km2 of territory, making it the fourth largest region in the nation. The major ethnic groups are the various Beti-Pahuin peoples, such as the Ewondo, Fang, and Bulu. The South Region has a fair amount of industry, its main commerce consisting of logging, timber, mining, and offshore oil drilling. Commercial agriculture is also important in the South, the major cash crops being cocoa and rubber. Cattle rearing and fishing are significant economic components, as well. Much of the population is made up of subsistence farmers.",
        latitude: 2.5,
        longitude: 11.75
      })

      const litt = await Region.create({
        name: "Littoral",
        capital: "Douala",
        num_Of_Boroughs: 35,
        area: 20248,
        description: "The Littoral Region (French: Région du Littoral) is a region of Cameroon. Its capital is Douala. As of 2004, its population was 3,174,437.[2] Its name is due to the region being largely littoral, and associated with the sea coast. The Douala Edéa Wildlife Reserve is in the region.",
        latitude: 4,
        longitude: 10
      })

      const west = await Region.create({
        name: "West",
        capital: "Bafoussam",
        num_Of_Boroughs: 40,
        area: 13892,
        description: "The West Region (French: Région de l'Ouest) is 14,000 km² of territory located in the central-western portion of the Republic of Cameroon. It borders the Northwest Region to the northwest, the Adamawa Region to the northeast, the Centre Region to the southeast, the Littoral Region to the southwest, and the Southwest Region to the west. The West Region is the smallest of Cameroon's ten regions in area, yet it has the highest population density. As home to the enterprising Bamum and Bamileke kingdoms, the West is an economic bright spot and one of Cameroon's more developed regions. This progressive development is tempered by the strong traditional culture that persists among the Bamileke and the province's other major ethnic group, the Bamum (sometimes Bamoum, Bamun, Bamoun).",
        latitude: 5.5,
        longitude: 10.5
      })

      const nw = await Region.create({
        name: "Northwest",
        capital: "Bamenda",
        num_Of_Boroughs: 34,
        area: 17300,
        description: "The Northwest Region, or North-West Region (French: Région du Nord-Ouest) is one of ten regions in Cameroon. Its regional capitol is Bamenda. The Northwest Region is part of the Southern Cameroons, found in the western highlands of Cameroon. It is bordered to the southwest by the Southwest Region, to the south by the West Region, to the east by the Adamawa Region, and to the north by the Federal Republic of Nigeria. Various Ambazonian nationalist and separatist factions regard the region as being distinct as a polity from Cameroon.In 1919, the Northwest Region became solely administered by the British Empire.[3] In 1961, the region joined the Cameroon. Separatists from the Ambazonia administration regard the both the Nord-Ouest (Northwest) and Sud-Ouest (Southwest) regions as being constituent components of their envisaged breakaway state",
        latitude: 6.33,
        longitude: 10.5
      })

      const sw = await Region.create({
        name: "Southwest",
        capital: "Buea",
        num_Of_Boroughs: 31,
        area: 25410,
        description: "The Southwest Region or South-West Region (French: Région du Sud-Ouest) is a region in Cameroon. Its capital is Buea.[2] As of 2015, its population was 1,553,320. Along with the Northwest Region, it is one of the two anglophone (English-speaking) regions of Cameroon. Various Ambazonian nationalist and separatist factions regard the Sud-Ouest region as being distinct as a polity from Cameroon.",
        latitude: 4.16,
        longitude: 9.23
      })

   // products
   const categories = {
      'paintings': painting,
      'masks': mask,
      'statues': statue
    }
     
    const regions = { 
      'Far North': far,
      'North': north,
      'Adamawa': adam,
      'East': east,
      'Centre': centre,
      'South': south,
      'Littoral' : litt,
      'West' : west,
      'Northwest': nw,
      'Southwest': sw
    }

   await Promise.all(products.map(product =>(Product.create(
     {
       name: product.name,
       description: product.description,
       imageUrl: product.imageUrl,
       price: product.price,
       regionId: regions[product.region].id,
       categoryId: categories[product.category].id
     }
   ))));
   
   // Order
   await Order.create({
     number_products: 2,
     total : 86.76 ,
     userId: allUsers[1].id
   });

   //Review
   const review1 = await Review.create({
    title:"Beautiful",
    description:"It's beautifully painted and you can see the craftsmanship that went into it. We look forward to enjoying this piece for many many years.",
    rating: 4,
    userId: allUsers[1].id,
    productId: 2
   });

   //Order_Product
   await Order_Product.create({
    orderId: 1,
    productId: 2
  });

    db.close()
    console.log(`
    Seeding successful!
    `)
}

seed().catch(err => {
    db.close()
    console.log(`
      Error seeding:
      ${err.message}
      ${err.stack}
    `)
})