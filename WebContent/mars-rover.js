var roverModule = {};
(function(roverModule){
	
	
	
	var calculatePosition = function (start_coord, command){
		//alert('I m in calculate position!!')
	}

	/**
	 * Parses the input commands.
	 */
	var parseInput = function(inputStr){
		
		var inputParts = inputStr.split('\n');
		
		var gridX = inputParts[0].split(' ')[0]
		var gridY = inputParts[0].split(' ')[1]
		
		var rovers = new Array();
		for (var i = 1; i < inputParts.length; i++){
			if (i % 2 !== 0){
				var startCoordParts = inputParts[i].split(' ');
				rovers.push({
					startCoord : { X : startCoordParts[0], Y : startCoordParts[1], bearing : startCoordParts[2]}
				});
			} else {
				rovers[rovers.length - 1].commands = inputParts[i].split('');
			}
		}
		
		return {
			gridX : gridX,
			gridY : gridY,
			rovers : rovers
		}
	}
	
	
	roverModule.parseInput = parseInput;
	roverModule.calculatePosition = calculatePosition;
	
	
	
	
	
}(roverModule));