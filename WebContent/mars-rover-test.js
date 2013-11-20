//YUI Library used for unit testing.
YUI().use('test', 'yui-testresult-parser', 'test-console', function(Y){
	
	var getStartCoordHelper = function(X, Y, bearing){
		return {
			gridX : 5,
			gridY : 5,
			startCoord : {
				X : X,
				Y : Y,
				bearing : bearing
			}
		}
	};
	
	
	var roverTestCase = new Y.Test.Case({
		name : 'Rover Test Case',
		
	
		testInputParser : function(){
			var testInput = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
			
			var parsedInput = roverModule.parseInput(testInput);
			
			Y.Assert.areEqual(parsedInput.gridX, 5, "GridX of 5 was expected");
			Y.Assert.areEqual(parsedInput.gridY, 5, "GridY of 5 was expected");
			Y.Assert.areEqual(parsedInput.rovers.length, 2, "2 Rovers was expected");
			
			Y.Assert.areEqual(parsedInput.rovers[0].startCoord.X, 1, "Start X Coordinate of 1 was expected for Rover 1");
			Y.Assert.areEqual(parsedInput.rovers[0].startCoord.Y, 2, "Start Y Coordinate of 2 was expected for Rover 1");
			Y.Assert.areEqual(parsedInput.rovers[0].startCoord.bearing, 'N', "Bearing of N was expected for Rover 1");
			
			
			Y.Assert.areEqual(parsedInput.rovers[1].startCoord.X, 3, "Start X Coordinate of 3 was expected for Rover 2");
			Y.Assert.areEqual(parsedInput.rovers[1].startCoord.Y, 3, "Start Y Coordinate of 3 was expected for Rover 2");
			Y.Assert.areEqual(parsedInput.rovers[1].startCoord.bearing, 'E', "Bearing of E was expected for Rover 1");
			
			Y.Assert.areEqual(parsedInput.rovers[0].commands.length, 9, "9 command characters were expected for rover 1");
			Y.Assert.areEqual(parsedInput.rovers[1].commands.length, 10, "10 command characters were expected for rover 2");
		},
	
		testExecuteCommandCharM : function(){
			
			// Move Up
			var startCoords = getStartCoordHelper(0, 0, 'N');
			var startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 0, "Expected X Coordinate to stay at 0");
			Y.Assert.areEqual(startCoord.Y, 1, "Expected Y Coordinate to go from 0 to 1");

			// Move down
			startCoords = getStartCoordHelper(0, 1, 'S');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 0, "Expected X Coordinate to stay at 0");
			Y.Assert.areEqual(startCoord.Y, 0, "Expected Y Coordinate to go from 1 to 0");

			// Move Left
			startCoords = getStartCoordHelper(1, 0, 'W');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 0, "Expected X Coordinate to go from 1 to 0");
			Y.Assert.areEqual(startCoord.Y, 0, "Expected Y Coordinate to stay at 0");

			// Move Right
			startCoords = getStartCoordHelper(0, 0, 'E');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 1, "Expected X Coordinate to go from 0 to 1");
			Y.Assert.areEqual(startCoord.Y, 0, "Expected Y Coordinate to stay at 0");

			//Boundary cases:
			startCoords = getStartCoordHelper(0, 0, 'W');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 0, "Expected X Coordinate to stay at 0");
			Y.Assert.areEqual(startCoord.Y, 0, "Expected Y Coordinate to stay at 0");
			
			startCoords = getStartCoordHelper(0, 0, 'S');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 0, "Expected X Coordinate to stay at 0");
			Y.Assert.areEqual(startCoord.Y, 0, "Expected Y Coordinate to stay at 0");

			startCoords = getStartCoordHelper(5, 5, 'N');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 5, "Expected X Coordinate to stay at 5");
			Y.Assert.areEqual(startCoord.Y, 5, "Expected Y Coordinate to stay at 5");

			startCoords = getStartCoordHelper(5, 5, 'E');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'M', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.X, 5, "Expected X Coordinate to stay at 5");
			Y.Assert.areEqual(startCoord.Y, 5, "Expected Y Coordinate to stay at 5");

		},


		testExecuteCommandCharL : function(){
			
			var startCoords = getStartCoordHelper(0, 0, 'N');
			var startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'L', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 'w', "Expected Bearing to go from N to W");
			
			startCoords = getStartCoordHelper(0, 0, 'W');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'L', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 's', "Expected Bearing to go from W to S");

			startCoords = getStartCoordHelper(0, 0, 'S');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'L', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 'e', "Expected Bearing to go from S to E");

			startCoords = getStartCoordHelper(0, 0, 'E');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'L', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 'n', "Expected Bearing to go from E to N");

		},
		
		
		testExecuteCommandCharR : function(){
			var startCoords = getStartCoordHelper(0, 0, 'N');
			var startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'R', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 'e', "Expected Bearing to go from N to E");
			
			startCoords = getStartCoordHelper(0, 0, 'E');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'R', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 's', "Expected Bearing to go from E to S");

			startCoords = getStartCoordHelper(0, 0, 'S');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'R', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 'w', "Expected Bearing to go from S to W");

			startCoords = getStartCoordHelper(0, 0, 'W');
			startCoord = startCoords.startCoord;
			roverModule.executeCommandChar(startCoords.startCoord, 'R', startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoord.bearing, 'n', "Expected Bearing to go from W to N");
		},
		
		
		testCalculatePosition : function(){
			
			var startCoords = getStartCoordHelper(1, 2, 'N');
			var commands = ['L','M','L','M','L','M','L','M','M'];
			
			roverModule.calculatePosition(startCoords.startCoord, commands, startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(1, startCoords.startCoord.X, "X coordinate of 3 was expected");
			Y.Assert.areEqual(3, startCoords.startCoord.Y, "Y coordinate of 3 was expected");
			Y.Assert.areEqual(startCoords.startCoord.bearing, 'n', "Bearing of N was expected");
			
			startCoords = getStartCoordHelper(3, 3, 'E');
			commands = ['M','M','R','M','M','R','M','R','R','M'];
			roverModule.calculatePosition(startCoords.startCoord, commands, startCoords.gridX, startCoords.gridY);
			Y.Assert.areEqual(startCoords.startCoord.X, 5, "X coordinate of 3 was expected");
			Y.Assert.areEqual(startCoords.startCoord.Y, 1, "Y coordinate of 3 was expected");
			Y.Assert.areEqual(startCoords.startCoord.bearing, 'e', "Bearing of E was expected");
		}
		
	});
	
	
	
	
	  //initialize the console
    (new Y.Test.Console({
        newestOnTop: false
    })).render('#log');
	
	Y.Test.Runner.add(roverTestCase);
	Y.Test.Runner.subscribe(Y.Test.Runner.COMPLETE_EVENT, function(data){
		
	});
	
	Y.Test.Runner.run();
});