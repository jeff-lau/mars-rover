var roverModule = {};
(function(roverModule){
	
	
	
	var calculatePosition = function (start_coord, commands, gridX, gridY){
		debugger;
		for (var i = 0; i < commands.length; i++){
			executeCommandChar(start_coord, commands[i], gridX, gridY);
		}
	};
	
	
	/**
	 * Executes a single character comand.
	 */
	var executeCommandChar = function(start_coord, command, gridX, gridY){
		var commandLowerCase = command.toLowerCase();
		switch (commandLowerCase){
			case 'm' :
				executeCommandCharM(start_coord, gridX, gridY);
				break;
			case 'l':
				executeCommandCharLR(start_coord, 'l');
				break;
			case 'r':
				executeCommandCharLR(start_coord, 'r');
				break;
			default:
				alert('Unknown command received - ' + command);
		}
	};
	
	
	/**
	 * Executes the M command based on current bearing.
	 * Will performs the bounds check to ensure rover doesn't move off chart.
	 * 
	 */
	var executeCommandCharM = function(start_coord, gridX, gridY){
		var currentBearing = start_coord.bearing.toLowerCase();
		switch (currentBearing){
			case 'n' :
				if (start_coord.Y < gridY){
					start_coord.Y++;
				}
				break;
			case 'e':
				if (start_coord.X < gridX){
					start_coord.X++;
				}
				break;
			case 's':
				if (start_coord.Y > 0){
					start_coord.Y--;
				}
				break;
			case 'w':
				if (start_coord.X > 0){
					start_coord.X--;
				}
				break;
			default:
				alert('Unknown bearng - ' + commandLowerCase);
		}
	};
	
	/**
	 * Updates 
	 * 
	 */
	var executeCommandCharLR = function(start_coord, command){
		var commandLowercase = command.toLowerCase();
		var currentBearning = start_coord.bearing.toLowerCase();
		var directions = ['n', 'e', 's', 'w'];
		if (commandLowercase === 'l'){
			directions.reverse();
		}
		var index = directions.indexOf(currentBearning) + 1;
		if (index > 3){
			index = 0;
		}
		start_coord.bearing = directions[index];
	};
	

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
		};
	};
	
	
	roverModule.parseInput = parseInput;
	roverModule.calculatePosition = calculatePosition;
	roverModule.executeCommandChar = executeCommandChar;
	
	
}(roverModule));