export default function ProblemGeneration() {
  return (
    <div>
      <h1 className="ml-3 mt-3 text-lg font-medium">
        Create a new Parsons Problem
      </h1>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full ml-5">
          <input
            className="bg-stone-200 rounded-full px-3 py-1 text-black max-w-xs my-3"
            type="text"
            name="name"
            id="name"
            placeholder="Enter problem Name"
          />

          <div className="flex flex-row w-full">
            <div>
              <div className="flex flex-row ">
                <h2 className="px-3 py-1 my-3 text-lg font-medium">
                  Solution Code
                </h2>
                <select
                  className="bg-stone-200 rounded-full px-2 py-1 text-black my-3 ml-auto"
                  name="language"
                  id="language"
                  value="1"
                >
                  <option value="python">Python</option>
                  <option value="c">C</option>
                  <option value="MATLAB">MATLAB</option>
                </select>
              </div>
              <div>
                <textarea
                  className="border-2 border-solid rounded-lg p-3"
                  name="solution"
                  id=""
                  cols="70"
                  rows="20"
                  placeholder="#Enter solution code here"
                />
              </div>

              <div>
                <h2 className="text-lg font-medium">Generation Settings</h2>
                <div className="grid grid-cols-2 gap-1 gap-x-1 w-min ml-5">
                  <input className="mt-2" type="checkbox" name="Strategy1" id="Strategy1" />
                  <label className="ml-3" htmlFor="Strategy1">Strategy1</label>
                  <input className="mt-2" type="checkbox" name="Strategy2" id="Strategy2" />
                  <label className="ml-3" htmlFor="Strategy2">Strategy2</label>
                  <input className="mt-2" type="checkbox" name="Strategy3" id="Strategy3" />
                  <label className="ml-3" htmlFor="Strategy3">Strategy3</label>
                  <input className="mt-2" type="checkbox" name="Strategy4" id="Strategy4" />
                  <label className="ml-3" htmlFor="Strategy4">Strategy4</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full ml-7 mt-4">
              <h2 className="text-lg font-medium">
                Associated Tags (comma seperated values)
              </h2>
              <input
                className="bg-stone-200 rounded-full px-3 py-1 text-black max-w-xs mt-5 mb-3"
                type="text"
                placeholder="e.g for loop, arrays ..."
              />

              <h2 className="text-lg font-medium">Example Parsons Problem</h2>

              <p className="h-3/5 bg-stone-200 w-96 rounded-lg p-3 mb-5">[## would show blocks]</p>

              <div className="ml-16">
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
      </div>
    </div>
  );
}
