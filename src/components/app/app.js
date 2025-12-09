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
        {
          name: 'Alex',
          value: 10000,
          increase: false,
          like: true,
          id: nanoid(),
        },
        {
          name: 'John',
          value: 2000,
          increase: false,
          like: false,
          id: nanoid(),
        },
        {
          name: 'Semen',
          value: 6500,
          increase: true,
          like: false,
          id: nanoid(),
        },
      ],
      term: '',
      filter: '',
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
        like: false,
        id: nanoid(),
      };
      return {
        data: [...data, newData],
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter((item) => item.like);
      case 'moreThen1000':
        return items.filter((item) => item.value > 1000);
      default:
        return items;
    }
  };

  onUpdateSearch = (term) => {
    this.setState({ term }); // term: term
  };

  onToggleFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(
      this.searchEmp(data, term),
      this.state.filter,
    );
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onToggleFilter={this.onToggleFilter} />
        </div>
        <EmployersList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployersAddForm addedItem={this.addedItem} />
      </div>
    );
  }
}

export default App;
