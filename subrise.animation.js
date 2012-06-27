/*!
 * Subrise Animation Class v0.0.1 beta
 * http://subrise.com/
 *
 * Copyright 2012, Subrise Games
 *
 * The Animation class helps to create an animation from a spritesheet.
 *
 * Author: Sammy Hubner
 * Date: June 27 2012
 * Last modified: June 27 2012
 *
 * !! Currently the Animation class assumes the spritesheet has its frames
 * populated horizontally.
 *
 */
SUBRISE.Animation = function (pSrc, pFrameTime, pType, pFrameWidth, pFrameHeight) {
	var t = this,
		_src          = pSrc,
		_img,
		_frameWidth   = pFrameWidth,
		_frameHeight  = pFrameHeight,
		_type         = pType || 'loop',
		_frameTime    = pFrameTime,
		_timer        = 0,
		_currentFrame = 0,
		_totalFrames  = 0,
		_isLoaded     = false,
		_isRunning    = false,
		_isReady      = false; // true when src is loaded and all settings are set

	// Only create an image tag if a src is been given
	if (_src) {
		_img = new Image();
		_img.src = _src;

		// Set the following settings when src has loaded:
		// _frameWidth
		// _frameHeight
		// _totalFrames
		// _isLoaded
		// _isRunning
		// _isReady
		_img.addEventListener('load', function () {
			_isLoaded  = true;
			_isRunning = true;
			_isReady   = true;
			if (!_frameWidth || !_frameHeight) {
				// calculate frame dimensions if they are not set
				_frameHeight = _img.height;
				_frameWidth  = _img.height;
			}
			_totalFrames = _img.width / _frameWidth;
		}, false);
	}

	t.play = function () {
		_isRunning = true;
	};

	t.pause = function () {
		_isRunning = false;
	};

	t.goto = function (pFrame) {
		_currentFrame = pFrame || 0;
	};

	t.gotoAndPlay = function (pFrame) {
		t.goto(pFrame);
		t.play();
	};

	t.gotoAndStop = function (pFrame) {
		t.goto(pFrame);
		t.pause();
	};

	// Only make updates when Animation is ready
	// When src is loaded and settings are set
	t.update = function (elapsedTime, elapsedFrames) {
		if (!_isReady || !_isRunning) {
			return false;
		}

		_timer += elapsedTime;
		if (_timer > _frameTime) {
			_timer = 0;
			_currentFrame += 1;
			if (_currentFrame >= _totalFrames) {
				_currentFrame = 0;
			}
		}
	};

	// Only draw when Animation is ready
	// When src is loaded and settings are set
	t.draw = function (context) {
		if (!_isReady) {
			return false;
		}

		context.drawImage(_img, _currentFrame * _frameWidth, 0, _frameWidth, _frameHeight, 100, 100, _frameWidth, _frameHeight);
	};
};
