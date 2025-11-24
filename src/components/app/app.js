import { Component } from 'react';
import { nanoid } from 'nanoid';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Alex', value: 10000, increase: false, id: nanoid() },
        { name: 'John', value: 2000, increase: false, id: nanoid() },
        { name: 'Semen', value: 6500, increase: false, id: nanoid() },
      ],
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addedItem = (name, salary) => {
    this.setState(({ data }) => {
      const newData = {
        name: name,
        value: salary,
        increase: false,
        id: nanoid(),
      };
      return {
        data: [...data, newData],
      };
    });
  };

  render() {
    return (
      <div className="app">
        <AppInfo />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployersList data={this.state.data} onDelete={this.deleteItem} />
        <EmployersAddForm addedItem={this.addedItem} />
      </div>
    );
  }
}

export default App;
