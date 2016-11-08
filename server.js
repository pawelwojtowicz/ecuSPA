var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;

http.createServer(function(request, response) 
  {
    var srvHome = 'output';
    var uri = url.parse(request.url).pathname, filename = path.join(srvHome, uri);
	
    console.log("file req= " + filename );

    var contentTypesByExtension = { '.html': "text/html",
                                    '.css':  "text/css",
                                    '.js':   "text/javascript"
                                  };

    fs.exists(filename, function(exists) 
          {
            if(!exists) 
              {
                if ( filename == "output\\cgi-bin\\controller")
                {
                  console.log("parametey" + url.parse(request.url).query);
                
                  //extract the parameters of the HTTP request
                  var nameValuePairs = url.parse(request.url).query.split("&");                 
                  var parameters = new Object();
                  
                  for ( count = 0 ; count < nameValuePairs.length ; ++count )
                  {
                    var nameValuePair = nameValuePairs[count];
                    
                    if ( 2 == nameValuePair.split("=").length )
                    {
                      var paramName = nameValuePair.split("=")[0];
                      var paramValue= nameValuePair.split("=")[1];
                      
                      parameters[paramName] = paramValue;                      
                    }
                  }
                  
//-------------------------------------------------------------------------------
                  if ( parameters["command_name"] == "controller" && parameters["api_name"] == "get_process_list" )
                  {
                    var procesList = new Object();
                    
                    var procesItem = { "get_process_list": {"data": { processList: [{"processId":1, "name":"FirstProcess", "versionInfo": "12345678", "unitState":4},
                                                                                    {"processId":2, "name":"Second", "versionInfo": "12345678", "unitState":2},
                                                                                    {"processId":3, "name":"Third", "versionInfo": "12345678", "unitState":3}]} }};
                                                                                    
                                                                                    console.log (procesItem.toString());
                    
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write(JSON.stringify(procesItem));
                    response.end();

                    
                    
                  }
                  else if ( parameters["command_name"] == "getMemInfo" )
                  {
                    var memoryInformation = { "getMemInfo": {"data": { meminfo: { "MemTotal": 1024,
                                                                                  "MemFree":1234, 
                                                                                  "Buffers": 3213, 
                                                                                  "Cached":321, 
                                                                                  "SwapCached":543, 
                                                                                  "Active":4234, 
                                                                                  "Inactive": 4, 
                                                                                  "Shmem":432 }}}};
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write(JSON.stringify(memoryInformation));
                    response.end();
                  }
//-------------------------------------------------------------------------------                  
                  
                }
                else
                {
                  response.writeHead(404, {"Content-Type": "text/plain"});
                  response.write("404 Not Found\n");
                  response.end();

                }
                
                // do not go to search on the Filesystem
                return;
              }

            if (fs.statSync(filename).isDirectory()) filename += '/index.html';

            fs.readFile(filename, "binary", function(err, file) 
              {
                if(err) 
                  {        
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                  }

                var headers = {};
                var contentType = contentTypesByExtension[path.extname(filename)];
                if (contentType) headers["Content-Type"] = contentType;
                response.writeHead(200, headers);
                response.write(file, "binary");
                response.end();
              });
          });
  }).listen(parseInt(port, 10));

console.log("Local path: " + process.cwd() );
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");