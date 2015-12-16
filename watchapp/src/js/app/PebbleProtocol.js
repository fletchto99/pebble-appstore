/*
 * The PebbleProtocol parser is taken from CloudPebble
 *
 * It is avaliable here: https://github.com/pebble/cloudpebble/blob/master/ide/static/ide/js/libpebble/libpebble.js
 */


var PebbleProtocol = module.exports;

PebbleProtocol.parser =function(){
    var mReassemblyBuffer = new Uint8Array(0);

    this.addBytes = function(bytes) {
        // Buffers cannot grow, so we have to do this:
        var newBuffer = new Uint8Array(mReassemblyBuffer.length + bytes.length);
        newBuffer.set(mReassemblyBuffer, 0);
        newBuffer.set(bytes, mReassemblyBuffer.length);
        mReassemblyBuffer = newBuffer;
    };

    this.readMessage = function() {
        if(mReassemblyBuffer.length < 4) {
            return null;
        }
        var parts = unpack("HH", mReassemblyBuffer.subarray(0, 4));
        var size = parts[0];
        var command = parts[1];
        // If we don't have enough data, try again the next time we get some.
        if(size > mReassemblyBuffer.length) {
            return null;
        }
        var message = mReassemblyBuffer.subarray(4, 4 + size);
        // Leave the remainder of the message in place for our next call.
        mReassemblyBuffer = mReassemblyBuffer.subarray(4 + size);
        return {
            command: command,
            size: size,
            message: message
        }
    }
};

var unpack = function(format, bytes) {
    var pointer = 0;
    var data = [];
    for(var i = 0; i < format.length; ++i) {
        if(pointer >= bytes.length) {
            console.error("ran out of bytes.", format, bytes);
            throw new Error("Expected more bytes");
        }
        var chr = format.charAt(i);
        switch(chr) {
            case "b":
            case "B":
                data.push(bytes[pointer++]);
                break;
            case "h":
            case "H":
                data.push((bytes[pointer] << 8) | bytes[pointer+1]);
                pointer += 2;
                break;
            case "l":
            case "L":
            case "i":
            case "I":
                data.push((bytes[pointer] << 24) | (bytes[pointer+1] << 16) | (bytes[pointer+2] << 8) | bytes[pointer+3]);
                pointer += 4;
                break;
        }
    }
    return data;
};
