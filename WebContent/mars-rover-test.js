//YUI Library used for unit testing.
YUI().use('test', 'yui-testresult-parser', 'test-console', function(Y){
	
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
		
		testCalculatePosition : function(){
			roverModule.calculatePosition();
			
			Y.Assert.areEqual(5, 6, "Five was expected.");
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