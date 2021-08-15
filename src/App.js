import './App.css';
import EmailTagInput from "./EmailTagInput";

const dummyEmailsApi = fetch('/dummy-emails.json')
  .then(response => response.json())
  .then(data => data);

function App() {
  function getAutoCompleteOptions(email) {
    return dummyEmailsApi.then(results => results.filter(item => item.startsWith(email)));
  }

  function onUpdates(emails) {
    console.log('User entered the following emails: ', emails);
  }

  return (
    <div className="App">
      <header className="App-header">
        <EmailTagInput onUpdates={onUpdates} autocompleteApi={getAutoCompleteOptions}/>
      </header>
    </div>
  );
}

export default App;
