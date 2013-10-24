
	  function handleFileSelect(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();
	
	    var files = evt.dataTransfer.files; // FileList object.
	
	    // files is a FileList of File objects. List some properties.
	    var output = [];
	    for (var i = 0, f; f = files[i]; i++) {
			  loadFile(f);
				      /*output.push('<li><strong>', 	escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	                  f.size, ' bytes, last modified: ',
	                  f.albumartist? f.albumartist.toLocaleDateString() : 'n/a',
	                  '</li>');*/
	    }
	    //document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	    function loadFile(file) {
      var url = file.urn || file.name,
        reader = new FileReader();

      reader.onload = function(event) {
        ID3.loadTags(url, function() {
          showTags(url);
        }, {
          tags: ["title","artist","picture"],
          //dataReader: FileAPIReader(file)
        });
      };
      reader.readAsArrayBuffer(file);
    }

    /**
     * Generic function to get the tags after they have been loaded.
     */
    function showTags(url) {
      var tags = ID3.getAllTags(url);
      console.log(tags);
      document.getElementById('title').innerHTML = tags.title;
      document.getElementById('artist').innerHTML = tags.artist;
      var image = tags.picture;
      if (image) {
        //Caution: old browsers (IE) don't implement Base64
        //see N. Zakas for fallback:
        //https://github.com/nzakas/computer-science-in-javascript/tree/master/encodings/base64
        var base64 = "data:" + image.format + ";base64," + Base64.encodeBytes(image.data);
        document.getElementById('picture').setAttribute('src',base64);
      } else {
        document.getElementById('picture').style.display = "none";
      }
    }

	  }
	
	  function handleDragOver(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = 'copy'; // Curseur
	  }
	
	  // Setup the dnd listeners.
	  var dropZone = document.getElementById('dropbox');
	  dropZone.addEventListener('dragover', handleDragOver, false);
	  dropZone.addEventListener('drop', handleFileSelect, false);