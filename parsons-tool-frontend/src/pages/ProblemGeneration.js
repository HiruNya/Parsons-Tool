export default function ProblemGeneration() {
  return (
    <div>
      <h1>Create a new Parsons Problem</h1>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter problem Name"
          />

          <div>
            <h2>Solution Code</h2>
            <select name="language" id="language" value="1">
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="MATLAB">MATLAB</option>
            </select>
          </div>
          <div>
            <textarea name="solution" id="" cols="30" rows="10">
              #Enter solution code here
            </textarea>
          </div>

          <div>
            <h2>Generation Settings</h2>
            <div className="flex flex-col">
              <input type="checkbox" name="Strategy1" id="Strategy1" />
              <label htmlFor="Strategy1">Strategy1</label>
              <input type="checkbox" name="Strategy2" id="Strategy2" />
              <label htmlFor="Strategy2">Strategy2</label>
              <input type="checkbox" name="Strategy3" id="Strategy3" />
              <label htmlFor="Strategy3">Strategy3</label>
              <input type="checkbox" name="Strategy4" id="Strategy4" />
              <label htmlFor="Strategy4">Strategy4</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h2>Associated Tags (comma seperated values)</h2>
          <input type="text" placeholder="e.g for loop, arrays ..." />

          <h2>Example Parsons Problem</h2>

          <p>[## would show blocks]</p>

          <div>
            <button className="px-4 py-2 mr-3 bg-green-400 text-white rounded-full hover:bg-green-500">
              Create
            </button>
            <button className="px-4 py-2 mr-3 bg-blue-400 text-white rounded-full hover:bg-blue-500">
              Randomise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
