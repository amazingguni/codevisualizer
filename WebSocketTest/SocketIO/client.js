<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost:8081');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>