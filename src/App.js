import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

function App() {
  const [users, setUsers] = useState([]);
  const [createFormData, setCreateFormData] = useState({
    email: '',
    given_name: '',
    surname: '',
    city: '',
    phone_number: '',
    profile_description: '',
    password: '',
  });
  const [updateFormData, setUpdateFormData] = useState({
    user_id: 0,
    email: '',
    given_name: '',
    surname: '',
    city: '',
    phone_number: '',
    profile_description: '',
    password: '',
  });
  const [deleteUserId, setDeleteUserId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await api.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  async function handleCreate(event) {
    event.preventDefault();
    try {
      await api.post('/users/', createFormData);
      setCreateFormData({
        email: '',
        given_name: '',
        surname: '',
        city: '',
        phone_number: '',
        profile_description: '',
        password: '',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user', error);
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();
    const userId = updateFormData.user_id;
    console.log('User ID:', userId);
    try {
      await api.put(`/users/${updateFormData.user_id}`, updateFormData);
      setUpdateFormData({
        user_id: '',
        email: '',
        given_name: '',
        surname: '',
        city: '',
        phone_number: '',
        profile_description: '',
        password: '',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user', error);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    try {
      await api.delete(`/users/${deleteUserId}`);
      setDeleteUserId('');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  }

  function handleInputChange(event, formType) {
    const {name, value} = event.target;
    if (formType === 'create') {
      setCreateFormData({...createFormData, [name]: value});
    } else if (formType === 'update') {
      setUpdateFormData({...updateFormData, [name]: value});
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management App</h1>
      </header>
      {/* New user form */}
      <section>
        <h2>Create User</h2>
        <form onSubmit={handleCreate}>
          <input
            name="email"
            value={createFormData.email}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="Email"
            required
            type="email"
          />
          <input
            name="given_name"
            value={createFormData.given_name}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="Given Name"
            required
          />
          <input
            name="surname"
            value={createFormData.surname}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="Surname"
            required
          />
          <input
            name="city"
            value={createFormData.city}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="City"
            required
          />
          <input
            name="phone_number"
            value={createFormData.phone_number}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="Phone Number"
            required
          />
          <textarea
            name="profile_description"
            value={createFormData.profile_description}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="Profile Description"
          />
          <input
            name="password"
            value={createFormData.password}
            onChange={e => handleInputChange(e, 'create')}
            placeholder="Password"
            required
            type="password"
          />
          <button type="submit">Create User</button>
        </form>
      </section>

      {/* Update user form */}
      <section>
        <h2>Update User</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="number"
            name="user_id"
            value={updateFormData.user_id}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="User ID"
            required
          />
          <input
            type="email"
            name="email"
            value={updateFormData.email}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="Email"
          />
          <input
            name="given_name"
            value={updateFormData.given_name}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="Given Name"
          />
          <input
            name="surname"
            value={updateFormData.surname}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="Surname"
          />
          <input
            name="city"
            value={updateFormData.city}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="City"
          />
          <input
            name="phone_number"
            value={updateFormData.phone_number}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="Phone Number"
          />
          <textarea
            name="profile_description"
            value={updateFormData.profile_description}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="Profile Description"
          />
          <input
            type="password"
            name="password"
            value={updateFormData.password}
            onChange={e => handleInputChange(e, 'update')}
            placeholder="Password"
          />
          <button type="submit">Update User</button>
        </form>
      </section>

      {/* Delete user form */}
      <section>
        <h2>Delete User</h2>
        <form onSubmit={handleDelete}>
          <input
            name="user_id"
            value={deleteUserId}
            onChange={e => setDeleteUserId(e.target.value)}
            placeholder="User ID"
            required
          />
          <button type="submit">Delete User</button>
        </form>
      </section>

      {/* View users */}
      <section>
        <h2>View Users</h2>
        <div style={{textAlign: 'center'}}>
          <table style={{margin: 'auto', textAlign: 'left'}}>
            <thead>
              <tr>
                <th style={{padding: '8px'}}>User ID</th>
                <th style={{padding: '8px'}}>Email</th>
                <th style={{padding: '8px'}}>Given Name</th>
                <th style={{padding: '8px'}}>Surname</th>
                <th style={{padding: '8px'}}>City</th>
                <th style={{padding: '8px'}}>Phone Number</th>
                <th style={{padding: '8px'}}>Profile Description</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td style={{padding: '8px'}}>{user.user_id}</td>
                  <td style={{padding: '8px'}}>{user.email}</td>
                  <td style={{padding: '8px'}}>{user.given_name}</td>
                  <td style={{padding: '8px'}}>{user.surname}</td>
                  <td style={{padding: '8px'}}>{user.city}</td>
                  <td style={{padding: '8px'}}>{user.phone_number}</td>
                  <td style={{padding: '8px'}}>{user.profile_description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
