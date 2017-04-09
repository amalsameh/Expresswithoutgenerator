var path=require('path');
var express=require('express');
var app=express();
var fs=require('fs');
app.set('port',process.env.PORT||4000);
app.set('env','development');
app.set('views',path.join(__dirname,'views'));
app.set('trust proxy',true);
app.enable('trust proxy');
app.enable('case senestive routing');
app.set('strict routing',true);
app.set('view cache',true);
//app.disable('etag');
app.set('view engine','ejs');
app.set('query parser','simple');
app.set('x-powered-by',false);

app.get('*',function(req,res){
var obj;
fs.readFile('inventors.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  var tablehtml="<div><table>";
  for(invent of obj)
  {
tablehtml+="<tr>"+"<td>"+invent.first+"</td>"+"<td>"+invent.last+"</td>"+"<td>"+invent.year+"</td>"+"</tr>"
  }
  tablehtml+="</table></div>";
  console.log(obj);
    res.status(200);
    res.set('Content-Type','text/html');
    res.send(tablehtml);
    res.end();
});

});
app.listen(4000,'127.0.0.1',()=>console.log('Express server started on port 4000'));