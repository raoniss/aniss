var inputs = document.querySelector('.video');
    

    inputs.style.opacity = 0;
    inputs.addEventListener('change', updateVideoDisplay);

    function updateVideoDisplay() {
        var preview = document.querySelector('.previews');
        while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }

        var curFiles = input.files;
        if (curFiles.length === 0) {
            var para = document.createElement('p');
            para.textContent = 'No files currently selected for upload';
            preview.appendChild(para);
        } else {
            var list = document.createElement('ol');
            preview.appendChild(list);
            for (var i = 0; i < curFiles.length; i++) {
                var listItem = document.createElement('li');
                var para = document.createElement('p');
                if (validFileTypes(curFiles[i])) {
                    para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSizes(curFiles[i]
                        .size) + '.';
                    var image = document.createElement('img');
                    image.src = window.URL.createObjectURL(curFiles[i]);

                    listItem.appendChild(image);
                    listItem.appendChild(para);

                } else {
                    para.textContent = 'File name ' + curFiles[i].name +
                        ': Not a valid file type. Update your selection.';
                    listItem.appendChild(para);
                }

                list.appendChild(listItem);
            }
        }
    }
    var fileType = [
        'video/mp4',
        'video/mov',
        'video/avi',
        'video/mpeg',
        'video/3gp',
        'video/wmv',
        'video/flv'
    ]

    function validFileTypes(file) {
        for (var i = 0; i < fileType.length; i++) {
            if (file.type === fileType[i]) {
                return true;
            }
        }

        return false;
    }

    function returnFileSizes(number) {
        if (number < 1024) {
            return number + ' octets';
        } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + ' Ko';
        } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + ' Mo';
        }
    }