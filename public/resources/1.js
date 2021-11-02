var fs = require('fs'),
    path = require('path')

var listFiles = function(dir, next){
  fs.readdir(dir, function(err, nodes){
    if (err) next(err)
    next(null, nodes.filter(function(node){
      return fs.lstatSync(path.resolve(dir) + "/" + node).isFile()
    }))
  })
}

// usage: listFiles(dirName)
// example: 
listFiles('./Background Varients Finished', function(err, files){
   if (err) throw err
   console.log(files.map((file,id) => ({"id": id, "color": file, "url": '/resources/Background Varients Finished/' + file})))
	
})