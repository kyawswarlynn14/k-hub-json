
import { useState } from "react";

function App() {
	const [tableData, setTableData] = useState({
		userid: [],
		username: [],
	});
	const [jsonData, setJsonData] = useState([]);
	const [isUsersTable, setIsUsersTable] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
    let inputValues;
    if(name === 'userid') {
      inputValues = value.toLowerCase().split(/\n/)
    } else {
      inputValues = value.split(/\n/);
    }

		inputValues = inputValues.map((val) => val.trim()); 

		setTableData({
			...tableData,
			[name]: inputValues,
		});
	};

	const generateRandomUsersyskey = (length) => {
		const characters = "0123456789";
		let result = "";

		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}

		return result;
	};

  function generateRandomString(length) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const year = today.getFullYear();

    return `${day}-${month}-${year}`
  }

	const generateJSONList = () => {
    setJsonData([]);

		if (tableData.userid.length !== tableData.username.length) {
			alert("Data lengths of userid and username are not the same");
			return;
		}

		const jsonList = [];
    if(isUsersTable) {
      for (let i = 0; i < tableData.userid.length; i++) {
        const primarykey = generateRandomUsersyskey(15);
        const uuid = generateRandomString(32);
        const jsonItem = {
          "userid": { "S": tableData.userid[i] },
          "primarykey": {"S": primarykey},
          "appid": {"S": "kunyek" },
          "createdby": {"S": "" },
          "createddate": {"S": getTodayDate()},
          "email": {"S": tableData.userid[i]},
          "mfa": { "S": "" },
          "mobile": { "S": ""},
          "password": { "S": "V/Cu6gXRLZ9vjYp6K7Wybw==" },
          "role": { "S": ""},
          "username": { "S": tableData.username[i] },
          "uuid": { "S": uuid}
        };

        jsonList.push(jsonItem);
      }
    } else {
      for (let i = 0; i < tableData.userid.length; i++) {
        const usersyskey = generateRandomUsersyskey(20);
        const jsonItem = {
          usersyskey: { "S": usersyskey },
          approved: { "S": "0" },
          institute: { "S": "" },
          profileimage: { "S": "" },
          r1: { "S": "" },
          r2: { "S": "" },
          r3: { "S": "" },
          r4: { "S": "" },
          r5: { "S": "" },
          sociallinks: { "L": [] },
          t1: { "S": "" },
          t2: { "S": "" },
          t3: { "S": "" },
          t4: { "S": "" },
          t5: { "S": "" },
          userid: { "S": tableData.userid[i] },
          username: { "S": tableData.username[i] },
          userrole: { "N": "0" }
        };
  
        jsonList.push(jsonItem);
      }
    }

		setJsonData(jsonList);
	};

	return (
			<div className="flex justify-between gap-2 min-h-screen bg-slate-200">
        <div className="w-1/3 p-2 space-y-2">
          <div className="space-x-2">
            <label htmlFor="isUsersTable">Is Users Table?</label>
            <input type="checkbox" name="isUsersTable" id="isUsersTable" value={isUsersTable} onChange={() => setIsUsersTable(!isUsersTable)} className="size-4" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="userid">Enter userid list</label>
            <textarea
              name="userid"
              id="userid"
              rows={12}
              value={tableData.userid}
              onChange={handleChange}
              className="w-full border border-slate-600 rounded-lg p-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username">Enter username list</label>
            <textarea
              name="username"
              id="username"
              rows={12}
              value={tableData.username}
              onChange={handleChange}
              className="w-full border border-slate-600 rounded-lg p-2 text-sm"
            />
          </div>

          <div className="w-full flex justify-center">
            <button className="bg-slate-800 rounded-lg py-2 px-4 text-white text-sm font-semibold" onClick={generateJSONList}>Generate JSON List</button>
          </div>
        </div>

				<div className="w-2/3 border-l border-slate-400 flex flex-col gap-4 p-2">
					{jsonData?.length > 0 && jsonData.map((i, index) => (
            <div key={index} className="flex gap-1">
              <p>{index + 1}</p>
              <div className="bg-white rounded-lg p-2">
                {JSON.stringify(i)}
              </div>
            </div>
          ))}
				</div>
			</div>
	);
}

export default App;
