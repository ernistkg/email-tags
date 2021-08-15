import {useEffect, useState} from "react";

function EmailTagInput(props) {
  const [emails, updateEmails] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);
  useEffect(() => {
    props.onUpdates(emails.filter(email => isEmailFormatValid(email)));
  }, [emails]);

  function handleKeyUp(event) {
    // handle Enter and Tab keys
    if (event.keyCode === 13 || event.keyCode === 9) {
      event.preventDefault();

      const enteredEmail = event.target.value.trim();

      addNewEmailToTheList(enteredEmail);
      event.target.value = '';
    }

    // handle Backspace key
    if (event.keyCode === 8) {
      if (isEmpty) {
        updateEmails(list => list.slice(0, -1));
      }
      setIsEmpty(event.target.value === '');
    }
  }

  function addNewEmailToTheList(email) {
    // only add email if it doesn't already exist in the list
    if (!emails.includes(email) && email) {
      updateEmails(list => [...list, email]);
    }
    document.getElementById('email-tag-input').value = '';
  }

  function handleOnInput(event) {
    if (event.target.value.trim()) {
      props.autocompleteApi(event.target.value).then(results => setAutocompleteList(results));
    } else {
      setAutocompleteList([]);
    }
  }

  function applyAutocompleteOption(value) {
    addNewEmailToTheList(value);
    setAutocompleteList([]);
    document.getElementById('email-tag-input').focus();
  }

  function removeSelectedEmail(email) {
    updateEmails(items => {
      return items.filter(item => item !== email);
    });
  }

  function isEmailFormatValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <ul className="email-list">
      {emails.map(email => {
        return  <li key={email} className="email-item">
                      <div className={isEmailFormatValid(email) ? 'email-tag' : 'email-tag invalid'}>
                        <span>{email}</span>
                        {isEmailFormatValid(email) ? '' : <img  height={20} src='/warning.gif' />}
                        <div style={{width: 20, display: 'inline-block'}}>
                          <b onClick={() => removeSelectedEmail(email)} className="remove-item">x</b>
                        </div>
                      </div>
                </li>
      })}
      <li className="email-input-container">
        <input id="email-tag-input"
               className="email-input"
               type="text"
               onInput={handleOnInput}
               onKeyUp={handleKeyUp}
               placeholder={emails.length === 0 ? 'Enter recipients...' : ''}/>
        <div id="autocomplete-dropdown">
          {autocompleteList.map(item =>
            <div key={item} className="autocomplete-option" onClick={() => applyAutocompleteOption(item)}>{item}</div>)}
        </div>
      </li>
    </ul>
  );
}

export default EmailTagInput;