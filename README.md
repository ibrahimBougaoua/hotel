# Simple web application using Node js & MongoDb

<h3>Installation steps : </h3>

1 -> install library node js by typing [ npm install ]

2 -> create database with mongodb by typing [ use hotel ]

3 -> Fake Data to using application by typing [ node ./seeder/seeder.js ]

<strong>Password : ddd</strong>

<h3>Mvc concept : </h3>

![stack Overflow](https://2.bp.blogspot.com/-I6bIQMAj-Nc/WWaQAbXnfJI/AAAAAAAABZg/aVDBAFcksSogYYNgWqd1GIkOZgtQuCQ7ACLcBGAs/s320/icon-aspnetmvc.png)

<h3>Database schema : </h3>

<pre> 
// Users schema
User {
        _id : ("5e946cbe64937321dc961e5e"),
        role : "adminstrator",
        Fname : "ibrahim",
        LName : "bougaoua",
        Contact : "02152145454",
        email : "adminstrator@gmail.com",
        password : "$2a$08$kmk4DRv5jcCRhNKk0OTBhuze6zKitBOSoSoFKQ/qVKinoVbXzVXkm",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:44:30.521Z")
}

// Customer schema
Customer {
        _id : ("5ea73c8ce07d3834300f810f"),
        Fname : "ibrahim",
        LName : "bougaoua",
        Contact : "02152145454",
        Email : "ibrahim@gmail.com",
        created_at : ("2020-04-27T20:11:56.035Z"),
}

// Hotel schema
Hotel {
        _id : ("5ea73cb7e07d3834300f8110"),
        NomH : "darkness mode",
        CateH : 1,
        AdrH : "El Bilage fe ramdan",
        TelH : "0522124555",
        NbChDisp : 1499,
        created_at : ("2020-04-27T20:12:39.507Z"),
}

// Room schema
Room {
        _id : ("5ea73ccee07d3834300f8111"),
        NumH : "5ea73cb7e07d3834300f8110",
        NumberPlace : "1",
        CatCh : "family",
        Disponible : "yes",
        Description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        created_at : ("2020-04-27T20:13:02.174Z"),
}

// Reservation schema
Reservation {
        _id : ("5ea73cdce07d3834300f8112"),
        NumH : "5ea73cb7e07d3834300f8110",
        NumCu : "5ea73c8ce07d3834300f810f",
        DateDebRes : "2020-04-01",
        DateFinRes : "2020-04-02",
        created_at : ("2020-04-27T20:13:16.692Z"),
}

</pre> 
