const express   = require('express');

const { Canvas } = require("canvas");

const JsBarcode = require('jsbarcode');
const fs = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// // Create a new canvas
// const canvas = new Canvas();
// JsBarcode(canvas,"hello", {
//   lineColor: "#0aa",
//   width:4,
//   height:40,
//   displayValue: false
// });

// Get Data URL and save it to the DB
// app.get('/',(req,res)=>{
//      res.render('index',{data:''});
// })

app.get('/',(req,res)=>{
  const canvas = new Canvas();
  
JsBarcode(canvas, "6613ef76a891b287db2947df", {
  displayValue: true
});
//  JsBarcode(canvas,'vishal kumar sharma',{
//   lineColor: "#0aa",
//   width:4,
//   height:40,
//   displayValue: false
//   });
    canvas.toDataURL('image/png', (err, png) => {
    let newUrl = png.replace("data:image/png;base64,", "")
    console.log("=====================><===============",newUrl);
    // const base64 = fs.readFileSync("path-to-image.jpg", "base64");
    const buffer = Buffer.from(newUrl, "base64");
    fs.writeFileSync("./views/test12334.png", buffer);

    res.render('index',{data:png});
  })
})

// app.get('/',(req,res)=>{
//   canvas.toDataURL('image/png', (err, png) => {
//     console.log(png);
//     res.render('index',{data:''});
//   })
// });

app.listen(3000,console.log(`server run at 3000`));