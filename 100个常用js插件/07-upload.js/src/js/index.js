class Uploader {
  constructor(options) {
    if (typeof options === 'undefined') {
      throw new TypeError('Uploader required `options`.');
    } else if (typeof options.target === 'undefined') {
      throw new TypeError('Uploader required `target` option.');
    }

    this.options = Object.assign({}, Uploader.DEFAULTS, options);

    this.fileList = [];

    if (options.target instanceof Element) {
      this.options.target = options.target;
    } else {
      this.options.target = document.querySelectorAll(options.target)[0];
    }

    if (options.fileList instanceof Element) {
      this.options.fileList = options.fileList;
    } else {
      this.options.fileList = document.querySelectorAll(options.fileList)[0];
    }

    this._xhrOnload = this._xhrOnload.bind(this);
    this._xhrOnerror = this._xhrOnerror.bind(this);
    this._xhrOnprogress = this._xhrOnprogress.bind(this);
    this._uploadSend = this._uploadSend.bind(this);
    this._init();
  }

  static get DEFAULTS() {
    return {
      paramName: 'file',
      maxFiles: 10,
      maxFilesize: 512,
      acceptedFiles: '.jpg, .jpeg, .png, .gif',
      addRemoveLinks: false,
      uploadMultiple: true,
      autoUpload: true,
      headers: null,
      addedfile: new Function(),
      removedfile: new Function(),
      start: new Function(),
      abort: new Function(),
      success: new Function(),
      error: new Function(),
      complete: new Function(),
      uploadprogress: new Function(),
      message: {
        uploadText: '将文件拖到此处，或点击上传',
        maxFilesText: '到达最多上传数目',
        maxFilesizeText: '文件过大',
        singleFileText: '只能上传单个文件',
        acceptedFilesText: '不支持该文件格式'
      },
      messageFn: function(tip) {alert(tip);}
    };
  }

  _init() {
    this._createUploader();
    this._createFileList();
    this._eventBind();
  }

  /**
  * ================================== Create Element ==================================
  */

  _createUploader() {
    this.options.target.insertAdjacentHTML(
      'beforeend',
      '<div class="uploader_container">' +
        '<div class="upload_dragger">' +
          '<span class="upload_icon"></span>' +
          '<span class="upload_text">' + this.options.message.uploadText + '</span>' +
          '<input type="file" id="file_input" class="file_input" ' + (this.options.uploadMultiple ? 'multiple' : '') + ' name="' + this.options.paramName + '">' +
        '</div>' +
      '</div>'
    );
    this.uploaderContainer = this.options.target.querySelectorAll('.uploader_container')[0];
    this.fileInput = this.options.target.querySelectorAll('#file_input')[0];
  }

  _createFileList(fileList) {
    this.options.fileList.insertAdjacentHTML(
      'beforeend',
      '<div class="fileList_container"></div>'
    );
    this.fileListContainer = this.options.fileList.querySelectorAll('.fileList_container')[0];
  }

  /**
  * ================================== Event Bind ==================================
  */

  _eventBind() {
    let self = this;
    this.uploaderContainer.addEventListener('dragenter', function(e) {
      e.preventDefault();
    }, false );
    this.uploaderContainer.addEventListener('dragleave', function(e) {
      e.preventDefault();
      self.uploaderContainer.classList.remove('dragenter');
    }, false);
    this.uploaderContainer.addEventListener( 'dragover', function(e) {
      e.preventDefault();
      self.uploaderContainer.classList.add('dragenter');
    }, false);
    this.uploaderContainer.addEventListener('drop', function(e) {
      self._eventDrop(e);
    }, false);
    this.uploaderContainer.addEventListener('click', function(e) {
      self.fileInput.click(e);
    }, false);
    this.fileInput.addEventListener('change', function(e) {
      self._eventDrop(e);
    }, false);
  }

  _eventDrop(e) {
    let self = this;
    e.preventDefault();
    this.uploaderContainer.classList.remove('dragenter');
    let fileList = e.type === 'drop' ? [].slice.call(e.dataTransfer.files) : [].slice.call(this.fileInput.files);
    let flag = true;
    if (fileList.length == 0) {return false};
    fileList.every(file => {
      if (file.type.indexOf('image') === -1 || self.options.acceptedFiles.indexOf(file.type.split('/')[1]) === -1) {
        this.options.messageFn(self.options.message.acceptedFilesText);
        flag = false;
        return false;
      }
      if (file.size > self.options.maxFilesize*1024) {
        this.options.messageFn(self.options.message.maxFilesizeText);
        flag = false;
        return false;
      }
      return true
    })
    if (this.options.uploadMultiple === false && fileList.length > 1) {
      this.options.messageFn(this.options.message.singleFileText);
      flag = false;
      return false;
    }
    if (fileList.length > this.options.maxFiles) {
      this.options.messageFn(this.options.message.maxFilesText);
      flag = false;
      return false;
    }
    if (flag) {
      if (this.options.autoUpload) {
        this.fileList = fileList;
      } else {
        this.fileList.push(...fileList);
      }
      this.options.addedfile(this.fileList);
      this._createPreview();
      this.options.autoUpload && this._uploadOpen();
    }
  }

  _createPreview(){
    let self = this;
    self.fileListContainer.innerHTML = '';
    this.fileList.forEach((file, index) => {
      file.index = index;
      let ObjectURL;
      if (window.URL.createObjectURL) {
      　ObjectURL = window.URL.createObjectURL(file);
      } else if (window.webkitURL.createObjectURL) {
      　ObjectURL = window.webkitURL.createObjectURL(file);
      }
      self.fileListContainer.insertAdjacentHTML(
        'beforeend',
        '<div class="fileItem">' +
          '<img class="imgPreview" src="' + ObjectURL +'">' +
          '<div class="imgInfo">' +
            '<p class="infoName">' + file.name +'</p>' +
          '</div>' +
          (this.options.addRemoveLinks ? '<span class="imgDel" data-index="' + index + '">×</span>' : '') +
          '<span class="imgUploaded"></span>' +
          '<span class="progressbar"></span>' +
        '</div>'
      );
    });
    this.options.addRemoveLinks && [].slice.call(self.fileListContainer.querySelectorAll('.imgDel')).forEach((item, index) => {
      item.addEventListener('click', function(e) {
        let fileItem = item.parentNode;
        fileItem.parentNode.removeChild(fileItem);
        self.options.removedfile(self.fileList[index]);
        self.fileList = self.fileList.filter(file => { return file.index != index; });
      }, false);
    })
  }

  _uploadOpen(){
    let self = this;
    this.fileList.forEach(file => {
      self._uploadSend(file)
    })
  }

  _uploadSend(file){
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open("post", this.options.url, true);
    if (!!this.options.headers) {
      for(let header in this.options.headers) {
          xhr.setRequestHeader(header, this.options.headers[header])
      }
    }
    formData.append(this.options.paramName, file, file.name);
    xhr.onloadstart = this._xhrOnloadstart.bind(this, event, file);
    xhr.onabort = this._xhrOnabort.bind(this, event, file);
    xhr.onload = this._xhrOnload.bind(this, event, file);
    xhr.onerror = this._xhrOnerror.bind(this, event, file);
    xhr.upload.index = file.index;
    xhr.upload.onprogress = this._xhrOnprogress;
    xhr.send(formData)
  }

  _xhrOnloadstart(event, file){
    this.options.start(event, file);
  }

  _xhrOnabort(event, file){
    this.options.abort(event, file);
  }

  _xhrOnload(event, file){
    let fileDom = this.fileListContainer.querySelectorAll('.fileItem')[file.index];
    fileDom.classList.add('success');
    fileDom.classList.add('complete');
    this.options.success(event, file);
    this.options.complete(event, file);
  }

  _xhrOnerror(event, file){
    let fileDom = this.fileListContainer.querySelectorAll('.fileItem')[file.index];
    fileDom.classList.add('error');
    fileDom.classList.add('complete');
    this.options.error(event, file);
    this.options.complete(event, file);
  }

  _xhrOnprogress(event){
    if (event.lengthComputable) {
      let percentComplete = (event.loaded / event.total) * 100;
      let progressbar = this.fileListContainer.querySelectorAll('.fileItem .progressbar')[event.target.index];
      progressbar.style.width = percentComplete + '%';
      this.options.uploadprogress(this.fileList[event.target.index], event.total, percentComplete)
    }
  }

  /**
  * ================================== PUBLIC METHODS ==================================
  */

  upload(){
    this._uploadOpen()
  }

}

window.Uploader = Uploader;
export default window.Uploader;
