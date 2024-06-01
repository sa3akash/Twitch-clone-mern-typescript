const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();




nms.on('preConnect', (id, args) => {
  // console.log('preConnect', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  
  // console.log('postConnect', `id=${id} args=${JSON.stringify(args)}`);


});

nms.on('doneConnect', (id, args) => {
  // console.log('doneConnect', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  // console.log('prePublish', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  // console.log('postPublish', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  console.log(id,StreamPath, args)
  console.log('run',{id,StreamPath, args})

});

nms.on('donePublish', (id, StreamPath, args) => {
  // console.log('donePublish', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  // console.log('prePlay', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  // console.log('postPlay', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  // console.log('donePlay', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

