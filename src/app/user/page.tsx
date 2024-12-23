import React from 'react'

interface User{
    id: number;
    name: string;
    email: string;
}
const UserPages = async () => {
    const res = await fetch ('https://jsonplaceholder.typicode.com/users', { cache: 'no-store'});
    const users: User[] =await res.json();
    const items: string[] = ["Apple", "Banana", "Mango"];
  return (
    <div>
        <h1>Users</h1>
        <p>{new Date().toLocaleTimeString()}</p>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {users.map(user => <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
            </tr>)}
            </tbody>
        </table>
        <h1>Fruits</h1>
        <ul className='flex'>
            {items.map((item) =>(
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
  )
}

export default UserPages