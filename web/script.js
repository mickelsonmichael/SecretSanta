// For all you who want to read, I'll write comments

var assignments = {};

fetch("config.json")
    .then(resp => resp.json())
    .then(generateNames);

// Function which parses a list of names into a key-value pair object
// Sets the global 'assignments' object so it can be used by the getAssignedName function
function generateNames(config) {
    console.debug('Config:', config);

    var rand = new Math.seedrandom(config.seedValue);

    // Make a copy of the array to ensure we don't have duplicates
    var mapto = Array.from(config.names);

    // Store the result into an object so we can use an indexer (e.g. result['JohnSmith'] or result.JohnSmith)
    var result = {};

    for (var name of config.names) {
        var target = name;

        // Keep getting a new name until we have one that isn't the current name
        while (target === name) {
            // Get a random number in the range of our list of names
            var idx = Math.abs(rand.int32()) % mapto.length;

            target = mapto[idx];
        }

        // remove the answer from the list so we don't get duplicates
        mapto.splice(idx, 1);

        // add the result to the object
        result[name] = target;
    }

    assignments = result;
}


// Function to be called when the button is clicked
function getAssignedName() {
    var feedback = document.querySelector('#feedback');

    // Clear the feedback message
    feedback.innerText = '';

    // Get the value of the text field
    var value = document.querySelector('#whoareyou')
                        .value
                        .toLowerCase()
                        .trim();

    // Get the blank spot for our answer to be written to
    var target = document.querySelector('#answer');

    // Make sure the answer is on our object
    if (!assignments.hasOwnProperty(value)) {
        feedback.innerText = "That's not a valid name... Valid names are: " + Object.keys(assignments).join(", ");

        return;
    }

    // write the answer to the blank spot
    target.innerText = assignments[value];
}
