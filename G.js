var express = require('express');
var app = express();
var fs = require('fs');
app.get('/', function (req, res) {
   
    var sql = require("mssql");
    
    // config for your database
    var config = {
        user: 'sa',
        password: '123456',
        server: 'localhost', 
        database: 'Girl' 
    };
	sql.close();
	page(1);
	function page(num){
	    // connect to your database
	    sql.connect(config, function (err) {
	    
	        if (err) console.log(err);

	        // create Request object
	        var request = new sql.Request();
	           
	        // query to the database and get the records
	        var from = (num-1)*500+1;
			var to = num*500;
	        var query = `select * from Girl where id>=${from} and id <= ${to}`;

	        request.query("select count(*) as total from girl", function (err, rows) {
	            
	            if (err) console.log(err)
            	var total = rows['recordsets'][0][0]['total'];
	            console.log(total);  
	        });

	        // request.query(query, function (err, rows) {
	            
	        //     if (err) console.log(err)

	        //     var total = rows['recordsets'][0].length;
	        // 	var image = '';
	        // 	for(var i = 0; i<total;i++){
	        // 		var url = rows['recordsets'][0][i].url;
	        // 		image += `<a target="_blank" href="${url}"><img src="${url}"></a>`;
	        // 	}
	        //     // send records as a response
	        
	        // 	fs.readFile("g.html", function(err, data) {
		       //      if (err) return res.status(500).end();
		       //      // build new content
		       //      // let newContent = "<li><a href=${element}.html>${element}</a></li>";
		       //      // data = data.replace(/<!-- new elements -->/, newContent);
		       //      res.type("text/html");
		       //      res.send(data);
		       //  });
	        //     // res.send(image);
	            
	        // });
	    });
	}

    
});

app.get('/:route', function(req, res) {
    var page = req.params.route;

});
var server = app.listen(6969, function () {
    console.log('Server is running..');
});
