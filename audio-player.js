/* 
 * Med-Connect XR - MP3 Audio Engine 
 * Uses HTML5 Audio to play sound effects from the "sound effects" directory.
 */

class AudioPlayer {
    constructor() {
        // Base path to the audio files
        this.basePath = './sound effects/';
        
        // Preload sounds
        this.sounds = {
            click: new Audio(this.basePath + 'ui-click.mp3'),
            success: new Audio(this.basePath + 'success.mp3'),
            warning: new Audio(this.basePath + 'warning.mp3'),
            scanner: new Audio(this.basePath + 'scanner-loop.mp3'), // Note: this file doesn't exist
            heartbeat: new Audio(this.basePath + 'heartbeat.mp3')
        };

        // Check if files exist and handle errors
        Object.keys(this.sounds).forEach(key => {
            this.sounds[key].addEventListener('error', () => {
                console.warn(`Audio file ${key} failed to load`);
                this.sounds[key] = null; // Mark as unavailable
            });
        });

        // Configure looping sounds
        this.sounds.scanner.loop = true;
        this.sounds.heartbeat.loop = true;

        // Volumes
        this.sounds.click.volume = 0.5;
        this.sounds.scanner.volume = 0.3;
        this.sounds.success.volume = 0.8;
        this.sounds.warning.volume = 0.8;
        this.sounds.heartbeat.volume = 0.4;
    }

    _play(audioObj) {
        if (!audioObj) {
            console.warn('Audio object not available');
            return;
        }
        // Reset the audio to start if it's already playing, unless it's a looping sound
        if (!audioObj.loop) {
            audioObj.currentTime = 0;
        }
        // Promise catch to handle browser autoplay policies
        audioObj.play().catch(e => {
            console.warn('Audio play prevented by browser policy until user interaction.', e);
        });
    }

    playClick() { this._play(this.sounds.click); }
    playSuccess() { this._play(this.sounds.success); }
    playWarning() { this._play(this.sounds.warning); }
    
    startScanSound() { this._play(this.sounds.scanner); }
    stopScanSound() { 
        this.sounds.scanner.pause(); 
        this.sounds.scanner.currentTime = 0;
    }

    startHeartbeat() { this._play(this.sounds.heartbeat); }
    stopHeartbeat() {
        this.sounds.heartbeat.pause();
    }
}

// Global instance
window.audioPlayer = new AudioPlayer();

// Auto-attach sound to all buttons with class 'primary-button' or 'nav-link'
document.addEventListener('DOMContentLoaded', () => {
    // Try to attach click sounds to all standard buttons
    const buttons = document.querySelectorAll('button, .nav-link, .primary-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
             if (!btn.hasAttribute('data-no-click-sound')) {
                 window.audioPlayer.playClick();
             }
        });
    });
});
