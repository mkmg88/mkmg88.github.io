var Resource = {
    sounds: {},
    silent : false,
    //Sounds
    addSound: function(name, src, maxChannels, volume) {
        this.sounds[name] = [];
        this.sounds[name].index = 0;
        if (!maxChannels) {
            maxChannels = 3;
        }
        for (var i = 0; i < maxChannels; i++) {
            this.sounds[name][i] = new Audio(src);
            this.sounds[name][i].volume = volume || 1;
        }
        return this;
    },
    
    clearSounds: function() {
        delete this.sounds;
        this.sounds = {};
        return this;
    },
    
    removeSound: function(name) {
        delete this.sounds[name];
        return this;
    },
    
    playSound: function(name, loop) {
        if (this.silent) return;
        if (this.sounds[name].index >= this.sounds[name].length) {
            this.sounds[name].index = 0;    
        }
        if (loop) {
            this.sounds[name][this.sounds[name].index].addEventListener("ended", this.loopCallback, false);
        }
        this.sounds[name][this.sounds[name].index++].play();
        return this.sounds[name].index;
    },
    
    pauseChannel: function(name, index) {
        if (!this.sounds[name][index].paused) {
            this.sounds[name][index].pause();
        }
        return this;
    },
    
    pauseSound: function(name) {
        for (var i = 0; i < this.sounds[name].length; i++) {
            if (!this.sounds[name][i].paused) {
                this.sounds[name][i].pause();
            }
        }
        return this;
    },
    
    resetChannel: function(name, index) {
        this.sounds[name][index].currentTime = 0;
        this.stopLoop(name, index);
        return this;
    },
    
    resetSound: function(name) {
        for (var i = 0; i < this.sounds[name].length; i++) {
            this.sounds[name].currentTime = 0;
            this.stopLoop(name, i);
        }
        return this;
    },
    
    stopLoop: function(name, index) {
        this.sounds[name][index].removeEventListener("ended", this.loopCallback, false);    
    },
    
    loopCallback: function() {
        this.currentTime = -1;
        this.play();
    }
}